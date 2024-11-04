import React, { useEffect, useState } from "react";

interface SelectProps<T> {
  label?: string;
  options: T[];
  showCreate?: boolean;
  selected?: T;
  RenderOptions: ({item} : {item: T}) => React.ReactNode;
  onSelect: (item: T) => void;
  onCreateClick?: () => void;
  labelSelected: (selected?: T) => string;
}

const Select = <T,>({
  label, 
  options, 
  showCreate,
  selected,
  RenderOptions, 
  onCreateClick, 
  onSelect,
  labelSelected,
}: SelectProps<T>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedLabel, setSelectedLabel] = useState<T>();

  useEffect(() => {
    if (selected) {
      setSelectedLabel(selected);
    }
  }, [selected]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div
        className="flex justify-between items-center border border-gray-300 rounded-2xl p-dropdown w-dropdown h-dropdown cursor-pointer bg-white hover:bg-gray-100"
        onClick={toggleDropdown}
      >
        <span className="text-gray-600">
        {labelSelected(selectedLabel)}
        </span>
        <span className="text-gray-600">{isOpen ? "▲" : "▼"}</span>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full max-h-96 mt-1 bg-white border p-dropdown border-gray-300 rounded-lg shadow-lg overflow-y-auto text-gray-600">
          {
            options.map((option, index) => {
              return (
                <div 
                  key={index}
                  className="cursor-pointer"
                  onClick={() => {
                    onSelect(option);
                    setSelectedLabel(option);
                    setIsOpen(false);
                  }}
                >
                  <RenderOptions item={option}/>
                </div>
              );
            })
          }
          {
            showCreate && (
              <div onClick={() => {
                if (onCreateClick) {
                  onCreateClick();
                }
              }}>
                <div className="flex items-center h-10">Create new</div>
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}

export default Select;