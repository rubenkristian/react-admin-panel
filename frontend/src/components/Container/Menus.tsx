import { useState } from "react";
import Item from "./Item";
import SubItem from "./SubItem";
import { usePathname, useRouter } from "next/navigation";
import { textToSlug } from "@/utils/string";

interface MenuProps {
    open: boolean;
    label: string;
    options: string[];
}

const Menu = ({
    open,
    label,
    options
}: MenuProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setOpen] = useState<boolean>(open);

    if (!isOpen) {
        return (
            <Item 
                label={label} 
                active={isOpen} 
                onClick={() => {
                    setOpen(true);
                }}
            ></Item>
        );
    }

    return (
        <div className="rounded-2xl bg-blue-gray/800">
            <Item 
                label={label} 
                active={isOpen} 
                onClick={() => {
                    setOpen(false);
                }}
            ></Item>
            {
                options.map((subLabel: string, index: number) => {
                    const path = '/' + textToSlug(label) + '/' + textToSlug(subLabel);
                    return (
                        <SubItem 
                            key={index}
                            label={subLabel}
                            selected={pathname === path}
                            onClick={() => {
                                router.push(path);
                            }}
                        />
                    );
                })
            }
        </div>
    )
}

export default Menu;