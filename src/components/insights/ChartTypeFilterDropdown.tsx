'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { ChartTypeFilter, CHART_TYPE_OPTIONS } from '@/hooks/useWidgetLayout';

interface ChartTypeFilterDropdownProps {
    value: ChartTypeFilter;
    onChange: (value: ChartTypeFilter) => void;
    filteredCount: number;
    totalCount: number;
}

export default function ChartTypeFilterDropdown({
    value,
    onChange,
    filteredCount,
    totalCount,
}: ChartTypeFilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = CHART_TYPE_OPTIONS.find(opt => opt.value === value) || CHART_TYPE_OPTIONS[0];

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (optionValue: ChartTypeFilter) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={dropdownRef}>
            {/* Trigger Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`flex items-center gap-3 px-5 py-2.5 rounded-full border text-sm font-semibold transition-all bg-white ${isOpen
                        ? 'border-[#2F04B0] ring-2 ring-[#2F04B0]/20 shadow-lg'
                        : 'border-[#5F81FF] hover:border-[#2F04B0] hover:shadow-md'
                    }`}
            >
                <span className="text-base">{selectedOption.icon}</span>
                <span className="text-[#5F81FF]">
                    {value === 'all' ? 'Showing data from all cards' : `Showing ${selectedOption.label}`}
                </span>
                {value === 'all' ? (
                    <span className="bg-[#E6F4EA] text-[#1E8E3E] rounded-full px-1.5 py-0.5 text-[10px] font-bold">
                        ✔
                    </span>
                ) : (
                    <span className="bg-[#EEF2FF] text-[#2F04B0] rounded-full px-2 py-0.5 text-[10px] font-bold">
                        {filteredCount}/{totalCount}
                    </span>
                )}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4 text-[#5F81FF]" />
                </motion.div>
            </motion.button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                Filter by chart type
                            </span>
                        </div>

                        {/* Options */}
                        <div className="p-2">
                            {CHART_TYPE_OPTIONS.map((option, index) => (
                                <motion.button
                                    key={option.value}
                                    onClick={() => handleSelect(option.value)}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.03 }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${value === option.value
                                            ? 'bg-gradient-to-r from-[#2F04B0]/10 to-[#5F81FF]/10 text-[#2F04B0]'
                                            : 'hover:bg-slate-50 text-slate-700'
                                        }`}
                                >
                                    <span className="text-lg">{option.icon}</span>
                                    <span className="flex-1 font-medium">{option.label}</span>
                                    {value === option.value && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="w-5 h-5 rounded-full bg-[#2F04B0] flex items-center justify-center"
                                        >
                                            <Check className="w-3 h-3 text-white" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Footer hint */}
                        <div className="px-4 py-3 border-t border-slate-100 bg-slate-50/50">
                            <p className="text-[11px] text-slate-400 text-center">
                                Select a chart type to filter the dashboard
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
