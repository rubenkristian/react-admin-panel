"use client";

import { useEffect, useState } from "react";
import TreeNode from "./TreeNode";
import { useMenu } from "@/providers/MenuProvider";
import { getParentMenu, Menu } from "@/utils/api";
import { TypeForm } from "@/utils/constants";
import { Button } from "../Button/Button";
import { useQuery } from "@tanstack/react-query";

const TreeView = () => {
    const {treeDetail, setTreeDetail, setSelectedParent, setTypeForm, menus} = useMenu();

    const [nodes, setNodes] = useState<Set<number>>(new Set<number>());

    function expand() {
        const allNodeIds = new Set<number>();
        const traverseNodes = (node: Menu) => {
            allNodeIds.add(node.id);
            if (node.childrens) {
                node.childrens.forEach(traverseNodes);
            }
        };

        if (treeDetail) {
            allNodeIds.add(treeDetail.id);
            treeDetail.childrens?.forEach(traverseNodes);
        }
        setNodes(allNodeIds);
    }

    function collapse() {
        setNodes(new Set());
    }

    const {isLoading, isRefetching, data, refetch} = useQuery({
        queryKey: ['tree', treeDetail?.id], 
        queryFn: () => treeDetail ? getParentMenu(treeDetail.id) : null, 
        staleTime: Infinity, 
        retry: false
    });

    useEffect(() => {
        if (data && setTreeDetail) {
            setTreeDetail(data);
        }
    }, [data]);

    useEffect(() => {
        if (setTreeDetail) {
            setTreeDetail(null);
        }
        refetch();
    }, [menus]);

    useEffect(() => {
        setNodes(new Set());
    }, [treeDetail]);

    if (isLoading || isRefetching) {
        return (
            <div>Loading...</div>
        );
    }

    if (treeDetail) {
        return (
            <div>
                <div className="flex items-center flex-1 gap-1 w-btn-tree m-btn-tree">
                    <Button
                        hSize='h-medium-button'
                        bg="bg-blue-gray/800"
                        onClick={() => {
                            expand();
                        }}>
                        Expand All
                    </Button>
                    <Button
                        hSize='h-medium-button'
                        bg="bg-blue-gray/300"
                        color="text-blue-gray/600"
                        onClick={() => {
                            collapse();
                        }}>
                        Collapse All
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <TreeNode 
                        listNodes={nodes}
                        expand={treeDetail ? nodes.has(treeDetail.id) : false}
                        menu={treeDetail}
                        onToggle={(id: number): void => {
                            setNodes(prev => {
                                const newNodes = new Set<number>(prev);
                                if (newNodes.has(id)) {
                                    newNodes.delete(id);
                                } else {
                                    newNodes.add(id);
                                }
    
                                return newNodes;
                            }); 
                        }}
                        onClickNew={(menu: Menu) => {
                            if (setSelectedParent && setTypeForm) {
                                setSelectedParent(menu);
                                setTypeForm(TypeForm.NEW_CHILD);
                            }
                        }}
                        onClickItem={(menu: Menu) => {
                            if (setSelectedParent && setTypeForm) {
                                setSelectedParent(menu);
                                setTypeForm(TypeForm.EDIT);
                            }
                        }}
                    />
                </div>
            </div>
        );
    }

    return (<></>);
}

export default TreeView;