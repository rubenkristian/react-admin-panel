'use client';

import { Menu } from "@/utils/api";
import PlusIcon from "../Icons/plus";

interface TreeNodeProps {
    menu: Menu | null;
    expand: boolean;
    listNodes: Set<number>;
    onToggle: (id: number) => void;
    onClickNew: (parent: Menu) => void;
    onClickItem: (item: Menu) => void;
}

const TreeNode = ({
    menu,
    expand,
    listNodes,
    onToggle,
    onClickNew,
    onClickItem,
}: TreeNodeProps) => {
    if (menu) {
        return (
            <div className="ml-6">
                <div className="flex items-center cursor-pointer space-x-2 py-1 group">
                    {menu.childrens && menu.childrens.length > 0 && (
                        <span
                            className={`transition-transform transform text-gray-500 ${
                                expand ? "rotate-90" : "rotate-0"
                            }`}
                            onClick={() => {
                                onToggle(menu.id);
                            }}
                        >
                            ▶
                        </span>
                    )}
                    
                    <span 
                        className="text-gray-800 font-medium hover:text-blue-600 transition-colors duration-200"
                        onClick={() => {
                            if (menu) {
                                onClickItem(menu);
                            }
                        }}
                    >
                        {menu && menu.name}
                    </span>
    
                    <div 
                        className="h-icon-plus w-icon-plus bg-arctic-blue/600 rounded-full hidden group-hover:flex items-center justify-center"
                        onClick={() => {
                            if (menu) {
                                onClickNew(menu);
                            }
                        }}
                    >
                        <PlusIcon/>
                    </div>
                </div>
    
                {expand && menu && menu.childrens && (
                    <div className="ml-6">
                        {menu.childrens.map((child, index) => (
                            <TreeNode
                                expand={listNodes.has(child.id)}
                                onToggle={onToggle}
                                key={index}
                                menu={child}
                                listNodes={listNodes}
                                onClickNew={onClickNew}
                                onClickItem={onClickItem}
                            />
                        ))}
                    </div>
                )}
            </div>
        );
    }

    return (<></>);
}

export default TreeNode;