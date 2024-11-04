interface InputProps {
    disabled?: boolean;
    label: string;
    full?: boolean;
    placeholder: string;
    onChange: (value: string) => void;
    value: string;
}

const Input = ({
    disabled,
    label,
    full,
    placeholder,
    value,
    onChange
}: InputProps) => {
    return (
        <div className={`mb-4 ${full ? 'w-full' : 'w-64'}`}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                disabled={disabled}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={`px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${full ? 'w-full' : 'w-64'} ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-white text-blue-gray/900'}`}
            />
        </div>
    )
}

export default Input;