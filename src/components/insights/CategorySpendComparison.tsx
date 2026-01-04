import { useState } from 'react';
import { SlidersHorizontal, Info, AlertCircle, MapPin, Search, ChevronDown } from 'lucide-react';
import { ShoppingBag, Coffee, Beer, UtensilsCrossed, Stethoscope, Plane, Bus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
    { id: 1, name: 'Groceries', spend: 310, budget: 500, variance: -4, status: 'good', icon: ShoppingBag, color: '#00A326', bg: '#EFFCF5', percent: 62, type: 'necessity' },
    { id: 2, name: 'Bills', spend: 750, budget: 800, variance: -2, status: 'good', icon: AlertCircle, color: '#443376', bg: '#F5F3FF', percent: 94, type: 'necessity' },
    { id: 3, name: 'Eating Out', spend: 100, budget: 180, variance: +45, status: 'warning', icon: UtensilsCrossed, color: '#FFB800', bg: '#FFFBEB', percent: 56, type: 'discretionary' },
    { id: 4, name: 'Medical', spend: 50, budget: 80, variance: +45, status: 'warning', icon: Stethoscope, color: '#2F04B0', bg: '#EEF2FF', percent: 63, type: 'necessity' },
    { id: 5, name: 'Transport', spend: 156, budget: 220, variance: +8, status: 'warning', icon: Bus, color: '#2F04B0', bg: '#EEF2FF', percent: 71, type: 'necessity' },
    { id: 6, name: 'Shopping', spend: 234, budget: 300, variance: +23, status: 'warning', icon: ShoppingBag, color: '#8F6AFB', bg: '#F3E8FF', percent: 78, type: 'discretionary' },
    { id: 7, name: 'Pet Care', spend: 70, budget: 120, variance: +23, status: 'warning', icon: AlertCircle, color: '#00A326', bg: '#EFFCF5', percent: 58, type: 'discretionary' },
    { id: 8, name: 'Subscribing', spend: 60, budget: 65, variance: +23, status: 'warning', icon: AlertCircle, color: '#2F04B0', bg: '#EEF2FF', percent: 92, type: 'discretionary' },
];

export default function CategorySpendComparison() {
    const [filter, setFilter] = useState('all');
    const [mode, setMode] = useState('percent'); // 'percent' or 'value'
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const filteredCategories = categories.filter(cat => {
        if (filter === 'all') return true;
        if (filter === 'necessities') return cat.type === 'necessity';
        if (filter === 'discretionary') return cat.type === 'discretionary';
        if (filter === 'near_limit') return cat.percent > 90;
        return true;
    });

    const totalSpend = filteredCategories.reduce((acc, cat) => acc + cat.spend, 0);

    return (
        <section className="mb-14">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-6">
                <div>
                    <h2 className="text-xl font-bold text-[#120048] mb-2">Monthly comparison spend by category</h2>
                    <h3 className="font-bold text-[#120048] mb-3">Filters</h3>
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === 'all' ? 'bg-[#2F04B0] text-white shadow-md' : 'bg-white text-[#4F4769] border border-surface-divider hover:bg-slate-50'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('necessities')}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === 'necessities' ? 'bg-[#2F04B0] text-white shadow-md' : 'bg-[#EEF2FF] text-[#2F04B0] hover:bg-indigo-100'}`}
                        >
                            Necessities
                        </button>
                        <button
                            onClick={() => setFilter('discretionary')}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === 'discretionary' ? 'bg-[#2F04B0] text-white shadow-md' : 'bg-[#FCFCFD] border border-surface-divider text-text-secondary hover:bg-slate-50'}`}
                        >
                            Discretionary
                        </button>
                        <button
                            onClick={() => setFilter('near_limit')}
                            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${filter === 'near_limit' ? 'bg-[#2F04B0] text-white shadow-md' : 'bg-[#EEF2FF] text-[#2F04B0] hover:bg-indigo-100'}`}
                        >
                            Near limit/ Over ({categories.filter(c => c.percent > 90).length})
                        </button>
                    </div>
                </div>

                <div className="flex gap-8 items-end">
                    <div>
                        <h3 className="font-bold text-[#120048] mb-3">Mode</h3>
                        <div className="flex bg-[#F5F7FA] p-1 rounded-lg">
                            <button
                                onClick={() => setMode('percent')}
                                className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${mode === 'percent' ? 'bg-[#2F04B0] text-white shadow-sm' : 'text-[#4F4769] hover:text-[#2F04B0]'}`}
                            >
                                % vs last month
                            </button>
                            <button
                                onClick={() => setMode('value')}
                                className={`px-4 py-2 rounded-md text-xs font-semibold transition-all ${mode === 'value' ? 'bg-[#2F04B0] text-white shadow-sm' : 'text-[#4F4769] hover:text-[#2F04B0]'}`}
                            >
                                £ change
                            </button>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-[#120048] mb-3">Timeframe</h3>
                        <button className="px-4 py-2 bg-white border border-surface-divider text-[#2F04B0] rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-slate-50">
                            This month <ChevronDown size={16} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-4 gap-x-5 justify-items-start">
                <AnimatePresence mode="popLayout">
                    {filteredCategories.map((cat) => (
                        <motion.div
                            layout
                            onClick={() => setSelectedId(selectedId === cat.id ? null : cat.id)}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                borderColor: selectedId === cat.id ? '#2F04B0' : cat.color // Animate border color
                            }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            key={cat.id}
                            className={`bg-white rounded-[20px] relative flex flex-col justify-between overflow-hidden hover:shadow-lg transition-all cursor-pointer ${selectedId === cat.id ? 'ring-2 ring-offset-2 ring-[#2F04B0]' : ''}`}
                            style={{
                                width: '100%',
                                height: '160px',
                                padding: '12px 16px',
                                borderTop: `4px solid ${cat.color}`,
                                borderRight: `0.5px solid ${cat.color}`,
                                borderBottom: `0.5px solid ${cat.color}`,
                                borderLeft: `0.5px solid ${cat.color}`,
                            }}
                        >
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white`} style={{ backgroundColor: cat.color }}>
                                        <cat.icon size={20} />
                                    </div>
                                    <span className="font-bold text-[#120048] text-base">{cat.name}</span>
                                </div>
                                <span className={`text-xs font-bold px-3 py-1 rounded-full text-white`} style={{ backgroundColor: cat.percent > 90 ? '#443376' : cat.name === 'Eating Out' ? '#FFB800' : cat.percent < 70 ? '#00A326' : '#8F6AFB' }}>
                                    {cat.percent}% of budget
                                </span>
                            </div>

                            <div className="flex items-baseline justify-between mt-2">
                                <div>
                                    <span className="text-[26px] font-bold text-[#120048] block leading-none mb-1">£{cat.spend}</span>
                                    <span className={`text-xs font-medium ${cat.variance < 0 ? 'text-[#00A326]' : 'text-[#F2645D]'}`}>
                                        {cat.variance > 0 ? '+' : ''}{cat.variance}% vs last month
                                    </span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-[#4F4769] mt-auto pt-3 border-t border-dashed border-slate-100">
                                <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#2F04B0]">
                                    <MapPin size={14} />
                                    <span className="text-[11px] font-medium">see on map</span>
                                </div>
                                <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#2F04B0]">
                                    <SlidersHorizontal size={14} />
                                    <span className="text-[11px] font-medium">alerts</span>
                                </div>
                                <div className="flex items-center gap-1.5 cursor-pointer hover:text-[#2F04B0]">
                                    <Info size={14} />
                                    <span className="text-[11px] font-medium">tips</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 border-t border-slate-100 pt-6">
                <div className="flex flex-wrap gap-6 items-center text-xs text-[#4F4769] font-medium">
                    <span className="font-bold text-[#120048]">Total across categories: <span className="text-[#120048]">£{totalSpend.toLocaleString()}</span></span>
                    <span>Mode: <span className="font-bold text-[#120048]">{mode === 'percent' ? '% vs last month' : '£ change'}</span></span>
                    <span>Timeframe: <span className="font-bold text-[#120048]">This month</span></span>
                    <span>Filter: <span className="font-bold text-[#120048]">{filter}</span></span>
                </div>

                <div className="flex gap-3">
                    <button
                        disabled={!selectedId}
                        className={`border border-[#2F04B0] text-[#2F04B0] text-sm font-bold px-6 py-2.5 rounded-lg transition-all shadow-sm ${!selectedId ? 'opacity-50 cursor-not-allowed bg-slate-50' : 'bg-white hover:bg-indigo-50'}`}
                    >
                        Set budget
                    </button>
                    <button
                        disabled={!selectedId}
                        className={`text-white text-sm font-bold px-6 py-2.5 rounded-lg transition-all shadow-md ${!selectedId ? 'bg-slate-300 cursor-not-allowed' : 'bg-[#2F04B0] hover:bg-[#250390] hover:shadow-lg'}`}
                    >
                        View details
                    </button>
                </div>
            </div>
        </section>
    );
}

