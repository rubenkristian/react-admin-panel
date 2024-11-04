import { ReactNode } from "react";

interface ButtonProps {
    wSize?: 'w-small-button' | 'w-medium-button' | 'w-large-button';
    hSize?: 'h-small-button' | 'h-medium-button' | 'h-large-button';
    bg?: string;
    color?: string;
    onClick: () => void;
    children: ReactNode;
}

export const Button = ({
    wSize,
    hSize,
    bg,
    color,
    children,
    onClick
}: ButtonProps) => {
    return (
        <div
            className={`flex items-center justify-center ${hSize ?? 'flex-1'} ${wSize ?? 'flex-1'} ${bg} ${color} rounded-btn-tree cursor-pointer`}
            onClick={() => {
                onClick()
            }}
        >
            {children}
        </div>
    )
}