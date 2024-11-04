"use client";

import { useQuery } from "@tanstack/react-query";
import FolderStaticIcon from "../Icons/folderstatic";
import MenuCenterIcon from "../Icons/menucenter";
import { getDetailByUrl } from "@/utils/api";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMenu } from "@/providers/MenuProvider";

const Breadcrumb = () => {
    const pathname = usePathname();
    const {treeDetail, setTreeDetail, setTypeForm} = useMenu();

    const {isLoading, data, refetch} = useQuery({
        queryKey: ['breadcrumb'], 
        queryFn: () => getDetailByUrl(pathname.split('/').at(-1) ?? ''), 
        staleTime: Infinity, 
        retry: false
    });

    useEffect(() => {
        refetch();
        if (treeDetail && setTreeDetail && setTypeForm) {
          setTreeDetail(null);
          setTypeForm(null);
        }
    }, [pathname, treeDetail]);
    
    if (isLoading) {
        return (
            <span>
                Loading...
            </span>
        )
    }

    return (
        <>
            <div className="flex items-center md:h-desktop-menu-path h-mobile-menu-path">
                <div className="flex gap-2 items-center text-sm">
                    <FolderStaticIcon/>
                    <span>/</span>
                    <span className="text-blue-gray/900">{data?.name ?? 'Loading...'}</span>
                </div>
            </div>
            <div className="items-center h-desktop-menu-path md:flex hidden gap-4">
                <div className="flex h-path">
                    <div className="flex items-center justify-center gap-5 h-path w-path bg-arctic-blue/600 rounded-full">
                        <MenuCenterIcon/>
                    </div>
                </div>
                <div className="text-3xl text-blue-gray/900">{data?.name ?? 'Loading...'}</div>
            </div>
        </>
    );
}

export default Breadcrumb;