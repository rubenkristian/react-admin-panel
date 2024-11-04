import SubMenuIcon from "../Icons/submenu";

interface SubItemProps {
    label: string;
    selected: boolean;
    onClick?: () => void;
}

const SubItem = ({
    label,
    selected,
    onClick
}: SubItemProps) => {
    return (
        <div className={`w-item h-item ${selected ? 'bg-lime-green/400 rounded-2xl' : ''} flex p-item gap-item cursor-pointer`}
            onClick={onClick}
        >
            <div className="flex items-center">
                <SubMenuIcon color={selected ? '#101828' : '#667085'}/>
            </div>
            <div className={`${selected ? 'text-blue-gray/900' : 'text-blue-gray/500'} `}>
                {label}
            </div>
        </div>
    )
}

export default SubItem;