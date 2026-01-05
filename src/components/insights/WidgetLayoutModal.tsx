'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { X, GripVertical, LayoutGrid, Grid3X3, LayoutList, RotateCcw, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Widget, LayoutMode } from '@/hooks/useWidgetLayout';

interface WidgetLayoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    widgets: Widget[];
    layoutMode: LayoutMode;
    onToggleVisibility: (id: string) => void;
    onReorder: (startIndex: number, endIndex: number) => void;
    onSetLayoutMode: (mode: LayoutMode) => void;
    onReset: () => void;
}

const layoutPresets = [
    { mode: '2-col' as LayoutMode, label: '2 Columns', icon: LayoutGrid, description: 'Balanced view' },
    { mode: '3-col' as LayoutMode, label: '3 Columns', icon: Grid3X3, description: 'Compact view' },
    { mode: '1-col' as LayoutMode, label: '1 Column', icon: LayoutList, description: 'Full width' },
];

export default function WidgetLayoutModal({
    isOpen,
    onClose,
    widgets,
    layoutMode,
    onToggleVisibility,
    onReorder,
    onSetLayoutMode,
    onReset,
}: WidgetLayoutModalProps) {
    const [localWidgets, setLocalWidgets] = useState<Widget[]>(widgets);

    // Sync local state with props
    useEffect(() => {
        setLocalWidgets(widgets);
    }, [widgets]);

    const handleReorder = (newOrder: Widget[]) => {
        setLocalWidgets(newOrder);
        // Find what changed and call onReorder
        const oldIndices = widgets.map(w => w.id);
        const newIndices = newOrder.map(w => w.id);

        // Find the moved item
        for (let i = 0; i < newIndices.length; i++) {
            if (oldIndices[i] !== newIndices[i]) {
                const movedId = newIndices[i];
                const originalIndex = oldIndices.indexOf(movedId);
                onReorder(originalIndex, i);
                break;
            }
        }
    };

    const visibleCount = localWidgets.filter(w => w.visible).length;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-2xl max-h-[85vh] overflow-hidden bg-gradient-to-br from-[#1a0b4b] to-[#120048] rounded-3xl shadow-2xl z-50 border border-white/10"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5F81FF] to-[#2F04B0] flex items-center justify-center">
                                    <Sparkles className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Widget Layout</h2>
                                    <p className="text-sm text-white/50">Customize your dashboard view</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
                            >
                                <X className="w-5 h-5 text-white/60 group-hover:text-white transition-colors" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="px-8 py-6 overflow-y-auto max-h-[calc(85vh-180px)]">
                            {/* Layout Presets */}
                            <div className="mb-8">
                                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Layout Style</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    {layoutPresets.map((preset) => (
                                        <motion.button
                                            key={preset.mode}
                                            onClick={() => onSetLayoutMode(preset.mode)}
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className={`relative p-4 rounded-2xl border-2 transition-all ${layoutMode === preset.mode
                                                    ? 'bg-gradient-to-br from-[#5F81FF]/20 to-[#2F04B0]/20 border-[#5F81FF] shadow-lg shadow-[#5F81FF]/20'
                                                    : 'bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10'
                                                }`}
                                        >
                                            <preset.icon className={`w-8 h-8 mx-auto mb-2 ${layoutMode === preset.mode ? 'text-[#5F81FF]' : 'text-white/60'
                                                }`} />
                                            <span className={`block text-sm font-semibold ${layoutMode === preset.mode ? 'text-white' : 'text-white/70'
                                                }`}>{preset.label}</span>
                                            <span className="block text-xs text-white/40 mt-1">{preset.description}</span>

                                            {layoutMode === preset.mode && (
                                                <motion.div
                                                    layoutId="activePreset"
                                                    className="absolute inset-0 rounded-2xl border-2 border-[#5F81FF]"
                                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                                />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>

                            {/* Widgets List */}
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Widgets</h3>
                                    <span className="text-xs text-white/40 bg-white/5 px-3 py-1 rounded-full">
                                        {visibleCount} of {localWidgets.length} visible
                                    </span>
                                </div>

                                <Reorder.Group
                                    axis="y"
                                    values={localWidgets}
                                    onReorder={handleReorder}
                                    className="space-y-3"
                                >
                                    {localWidgets.map((widget, index) => (
                                        <Reorder.Item
                                            key={widget.id}
                                            value={widget}
                                            className="cursor-grab active:cursor-grabbing"
                                        >
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                                className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${widget.visible
                                                        ? 'bg-white/5 border-white/10 hover:bg-white/10'
                                                        : 'bg-white/[0.02] border-white/5 opacity-60'
                                                    }`}
                                            >
                                                {/* Drag Handle */}
                                                <div className="text-white/30 hover:text-white/50 transition-colors">
                                                    <GripVertical className="w-5 h-5" />
                                                </div>

                                                {/* Widget Icon */}
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${widget.visible
                                                        ? 'bg-gradient-to-br from-[#5F81FF]/30 to-[#2F04B0]/30'
                                                        : 'bg-white/5'
                                                    }`}>
                                                    {widget.icon}
                                                </div>

                                                {/* Widget Name */}
                                                <span className={`flex-1 font-medium ${widget.visible ? 'text-white' : 'text-white/40'
                                                    }`}>
                                                    {widget.name}
                                                </span>

                                                {/* Visibility Toggle */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onToggleVisibility(widget.id);
                                                    }}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${widget.visible
                                                            ? 'bg-[#5F81FF]/20 text-[#5F81FF] hover:bg-[#5F81FF]/30'
                                                            : 'bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/50'
                                                        }`}
                                                >
                                                    {widget.visible ? (
                                                        <Eye className="w-5 h-5" />
                                                    ) : (
                                                        <EyeOff className="w-5 h-5" />
                                                    )}
                                                </button>
                                            </motion.div>
                                        </Reorder.Item>
                                    ))}
                                </Reorder.Group>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-5 border-t border-white/10 flex items-center justify-between bg-black/20">
                            <button
                                onClick={onReset}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all text-sm font-medium"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset to Default
                            </button>

                            <button
                                onClick={onClose}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#5F81FF] to-[#2F04B0] text-white font-semibold text-sm shadow-lg shadow-[#5F81FF]/30 hover:shadow-xl hover:shadow-[#5F81FF]/40 transition-all hover:scale-105"
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
