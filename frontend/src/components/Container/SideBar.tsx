"use client";

import { ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import MenuIcon from "../Icons/menu";
import OpenIcon from "../Icons/open";
import { useQuery } from "@tanstack/react-query";
import { getListMenu } from "@/utils/api";
import { useMenu } from "@/providers/MenuProvider";
import { usePathname } from "next/navigation";
import { textToSlug } from "@/utils/string";
import Menu from "./Menus";

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const {menus, setMenus, setTreeDetail, setTypeForm} = useMenu();

  const {isLoading, data} = useQuery({
    queryKey: ['menus'],
    queryFn: getListMenu,
    staleTime: Infinity,
    retry: false,
  });

  useEffect(() => {
    if (data && setMenus) {
      setMenus(data);
    }
  }, [data]);

  useEffect(() => {
    if (setTreeDetail && setTypeForm) {
      setTreeDetail(null);
      setTypeForm(null);
    }
  }, [menus]);

  if (isLoading) {
    return (<>Loading</>);
  }

  return (
    <div className={`flex flex-row ${isOpen ? 'overflow-hidden' : ''}`}>
      <div className={`flex ${isOpen ? 'w-sidebar' : 'w-0'}`}>
        <aside
          className={`inset-y-0 left-0 top-0 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"} h-full min-h-screen bg-blue-gray/900 text-white custom-scrollbar overflow-y-auto`}>
          <div className="flex items-center justify-between p-header-sidebar">
            <Image src="/image.png" alt="logo" width={70} height={21} />
            <button onClick={() => setIsOpen(!isOpen)}>
              <MenuIcon />
            </button>
          </div>
          <nav className="flex flex-col gap-2 p-sidebar">
            <div className="h-item"></div>
            {
              menus && menus.filter((val) => !val.parent).flatMap((val, index) => {
                const children = val.childrens?.map((child) => child.name);
                return (
                  <Menu
                    key={index}
                    open={pathname.split('/').at(1) === textToSlug(val.name)}
                    label={val.name}
                    options={children ?? []}
                  />
                );
              })
            }
          </nav>
        </aside>
      </div>
      <div className="w-full">
        <div className="flex-1 ml-0 transition-all duration-300">
          <header className={`flex items-center justify-between bg-transparent text-white p-4`}>
            <button onClick={() => setIsOpen(!isOpen)}>
              {!isOpen && <OpenIcon />}
            </button>
          </header>
        </div>
        <main className={`pl-4 transition-all duration-300 h-screen w-full`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default SidebarLayout;