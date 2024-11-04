import FolderIcon from "../Icons/folder";

interface ItemProps {
    label: string;
    active: boolean;
    onClick?: () => void;
}

const Item = ({
    label,
    active,
    onClick
}: ItemProps) => {
    return (
        <div className="w-item h-item flex p-item gap-item cursor-pointer" onClick={onClick}>
            <div className="flex items-center">
                <FolderIcon active={active}/>
            </div>
            <div className={active ? 'text-white' : 'text-blue-gray/500'}>
                {label}
            </div>
        </div>
    )
}

export default Item;