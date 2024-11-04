"use client";

import { Menu } from "@/utils/api";
import Select from "./Select";
import { useMenu } from "@/providers/MenuProvider";
import { TypeForm } from "@/utils/constants";
import { useEffect } from "react";

const SelectView = () => {
    const {parents, treeDetail, setTreeDetail, setTypeForm} = useMenu();
    
    useEffect(() => {
      if (treeDetail && setTreeDetail && setTypeForm) {
        setTreeDetail(treeDetail);
        setTypeForm(null);
      }
    }, [treeDetail]);

    return (
      <Select<Menu>
        options={parents}
        RenderOptions={function ({ item }: { item: Menu; }): React.ReactNode {
          return (
            <div className="flex items-center h-10">{item.name}</div>
          );
        }}
        onSelect={function (item: Menu): void {
          if (setTreeDetail && setTypeForm) {
            setTreeDetail(item);
            setTypeForm(null);
          }
        }}
        onCreateClick={function (): void {
          if (setTypeForm) {
            setTypeForm(TypeForm.NEW);
          }
        }}
        showCreate
        labelSelected={function (selected?: Menu | undefined): string {
          return selected?.name ?? "Select Menu";
        }} 
      />
    );
}

export default SelectView;