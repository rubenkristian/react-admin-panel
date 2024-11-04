"use client";

import { Menu } from '@/utils/api';
import { createContext, useContext, useState } from 'react';
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import { TypeForm } from '@/utils/constants';

interface MenuContextType {
    menus: Menu[];
    parents: Menu[];
    selectedParent?: Menu;
    treeDetail: Menu | null;
    typeForm?: TypeForm | null;
    setMenus?: (menus: Menu[]) => void;
    setSelectedParent?: (menu: Menu) => void;
    setTreeDetail?: (menu: Menu | null) => void;
    setTypeForm?: (typeForm: TypeForm | null) => void;
}

const MenuContext = createContext<MenuContextType>({
    menus: [],
    parents: [],
    treeDetail: null,
});

export function MenuProvider({ children }: React.PropsWithChildren) {
    const [menus, setMenus] = useState<Menu[]>([]);
    const [parents, setParents] = useState<Menu[]>([]);
    const [selectedParent, setSelectedParent] = useState<Menu>();
    const [treeDetail, setTreeDetail] = useState<Menu|null>(null);
    const [typeForm, setTypeForm] = useState<TypeForm | null>();
  
    return (
        <ReactQueryProvider>
            <MenuContext.Provider value={{
                menus: menus,
                parents: parents,
                selectedParent: selectedParent,
                treeDetail: treeDetail,
                typeForm: typeForm,
                setMenus: (menus: Menu[]) => {
                    const menusfilter: Menu[] = [];
                    const parentsFilter: Menu[] = [];
                    for (const menu of menus) {
                        parentsFilter.push(menu);
                        for (const child of menu.childrens ?? []) {
                            menusfilter.push(child);
                        }
                    }
                    setParents(parentsFilter);
                    setMenus(menusfilter);
                },
                setSelectedParent: (menu: Menu) => {
                    setSelectedParent(menu);
                },
                setTreeDetail: (menu: Menu | null) => {
                    setTreeDetail(menu);
                },
                setTypeForm(typeForm) {
                    setTypeForm(typeForm);
                },
            }}>
                {children}
            </MenuContext.Provider>
        </ReactQueryProvider>
    );
}

export const useMenu = () => {
    const context = useContext(MenuContext);
    
    if (context === undefined) {
        throw new Error('useMenu must be used within a MenuProvider');
    }
    return context;

}
  
export default MenuProvider;