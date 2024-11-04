"use client";

import { useEffect, useState } from "react";
import Input from "./Input";
import { useMenu } from "@/providers/MenuProvider";
import { TypeForm } from "@/utils/constants";
import { Button } from "../Button/Button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createMenu, editMenu, getListMenu, Menu, MutateMenu } from "@/utils/api";
import Select from "./Select";

const FormView = () => {
    const { typeForm, selectedParent, treeDetail, setMenus } = useMenu();
    const [menuId, setMenuId] = useState<string>("");
    const [depth, setDepth] = useState<string>("");
    const [parent, setParent] = useState<Menu>();
    const [name, setName] = useState<string>("");
    const [options, setOptions] = useState<Menu[]>([]);
    
  const {refetch, data} = useQuery({
    queryKey: ['refetch', 'menu'],
    queryFn: getListMenu,
    staleTime: Infinity,
    retry: false,
    enabled: false
  });

  useEffect(() => {
    if (data && setMenus) {
      setMenus(data);
    }
  }, [data]);

    useEffect(() => {
        if (selectedParent) {
            const {
                id,
                depth,
                name
            } = selectedParent;
            setMenuId(id.toString());
            setDepth(depth.toString());

            if (typeForm === TypeForm.EDIT) {
                setName(name);
            } else {
                setName("");
            }
        }
    }, [selectedParent, typeForm]);

    useEffect(() => {
        if (selectedParent) {
            const {
                id,
                parent_id
            } = selectedParent;

            const options: Menu[] = [];
            const traverseNodes = (node: Menu) => {
                options.push(node);
                if (node.childrens) {
                    node.childrens.forEach(traverseNodes);
                }
            };

            if (treeDetail) {
                options.push(treeDetail);
                treeDetail.childrens?.forEach(traverseNodes);
            }

            const ID = typeForm === TypeForm.NEW_CHILD ? id : parent_id;

            const selectedMenu = options.find((val: Menu) => val.id === ID);

            setParent(selectedMenu);
            setOptions(options);
        }
    }, [selectedParent, treeDetail, typeForm]);
    
    const menuMutation = useMutation({
        mutationFn: async (data: MutateMenu) => {
            if (typeForm === TypeForm.NEW || typeForm === TypeForm.NEW_CHILD) {
                return createMenu(data);
            }

            return editMenu(data);
        },
        onSuccess: () => {
            refetch();
        }
    });

    if (typeForm === TypeForm.NEW) {
        return (
            <div className="flex flex-col md:w-form-view w-full">
                <Input 
                    label="Name"
                    placeholder="Type here..."
                    onChange={(value) => setName(value)}
                    value={name}
                />
                <Button
                    bg="bg-arctic-blue/600" 
                    color="text-white" 
                    hSize="h-large-button" 
                    wSize="w-large-button" 
                    onClick={() => {
                        menuMutation.mutate({name: name});
                    }}>
                    Save
                </Button>
            </div>
        );
    }

    if (typeForm === TypeForm.EDIT) {
        return (
            <div className="flex flex-col md:w-form-view w-full">
                <Input 
                    label="Menu Id" 
                    disabled 
                    full 
                    placeholder="Type here..."
                    onChange={(value) => setMenuId(value)}
                    value={menuId}
                />
                <Input 
                    label="Depth"
                    disabled
                    placeholder="Type here..."
                    onChange={(value) => setDepth(value)}
                    value={depth}
                />
                <Select<Menu>
                    label="Parent Data"
                    options={options}
                    RenderOptions={function ({ item }: { item: Menu; }): React.ReactNode {
                        return (
                            <div className="flex items-center h-10">{item.name}</div>
                        );
                    }}
                    onSelect={function (item: Menu): void {
                        setParent(item);
                    }}
                    selected={parent}
                    labelSelected={function (selected?: Menu | undefined): string {
                        return selected?.name ?? "Select Menu";
                    }} 
                />
                <Input 
                    label="Name"
                    placeholder="Type here..."
                    onChange={(value) => setName(value)}
                    value={name}
                />
                <Button
                    bg="bg-arctic-blue/600"
                    color="text-white"
                    hSize="h-large-button"
                    wSize="w-large-button"
                    onClick={() => {
                        menuMutation.mutate({id: selectedParent?.id ?? 0, name: name, parent_id: parent?.id});
                    }}
                >
                    Save
                </Button>
            </div>
        );
    }

    if (typeForm === TypeForm.NEW_CHILD) {
        return (
            <div className="flex flex-col md:w-form-view w-full">
                <Select<Menu>
                    label="Parent Data"
                    options={options}
                    RenderOptions={function ({ item }: { item: Menu; }): React.ReactNode {
                    return (
                        <div className="flex items-center h-10">{item.name}</div>
                    );
                    } }
                    onSelect={function (item: Menu): void {
                        setParent(item);
                    }}
                    selected={parent}
                    labelSelected={function (selected?: Menu | undefined): string {
                        return selected?.name ?? "Select Menu";
                    }} 
                />
                <Input 
                    label="Name"
                    placeholder="Type here..."
                    onChange={(value) => setName(value)}
                    value={name}
                />
                <Button
                    bg="bg-arctic-blue/600"
                    color="text-white"
                    hSize="h-large-button"
                    wSize="w-large-button"
                    onClick={() => {
                        menuMutation.mutate({name: name, parent_id: parent?.id});
                    }}
                >
                    Save
                </Button>
            </div>
        );
    }

    return (
        <></>
    );
}

export default FormView;