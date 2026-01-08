import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

interface CustomDropdownProps {
    value: string | number;
    options: readonly (string | number)[];
    onChange: (value: any) => void;
    label?: string;
    className?: string;
}

export default function CustomDropdown({ value, options, onChange, label, className = '' }: CustomDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            {label && <span className="text-xs text-gray-400 mb-1 block">{label}</span>}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full bg-white border ${isOpen ? 'border-[#2F04B0] ring-1 ring-[#2F04B0]' : 'border-gray-200'
                    } rounded-xl px-4 py-2.5 text-sm font-medium flex items-center justify-between transition-all hover:border-[#2F04B0] shadow-sm`}
            >
                <span className="text-[#120048]">{value}</span>
                <ChevronDown
                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#2F04B0]' : ''}`}
                />
            </button>

            {isOpen && (
                <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-[300px] overflow-y-auto py-1 animate-in fade-in zoom-in-95 duration-100">
                    {options.map((option) => {
                        const isSelected = option === value;
                        return (
                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setIsOpen(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between
                  ${isSelected
                                        ? 'bg-[#1877F2] text-white' // Using a bright blue similar to the image
                                        : 'text-[#120048] hover:bg-gray-50'
                                    }
                `}
                            >
                                {option}
                                {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
