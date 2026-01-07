'use client';

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

interface MonthItem {
    id: string;
    month: string;
    initial: string;
    color: string;
    spend: number;
    budget: number;
    percent: number;
    statusColor: string;
    chartColor: string;
}

const QUARTER_DATA: Record<string, MonthItem[]> = {
    'Quarter 1': [
        { id: 'jan', month: 'January 2025', initial: 'J', color: '#546FFF', spend: 1850, budget: 2100, percent: 88, statusColor: '#FFB800', chartColor: '#FFB800' },
        { id: 'feb', month: 'February 2025', initial: 'F', color: '#546FFF', spend: 1600, budget: 2100, percent: 76, statusColor: '#00A326', chartColor: '#00A326' },
        { id: 'mar', month: 'March 2025', initial: 'M', color: '#546FFF', spend: 2050, budget: 2100, percent: 97, statusColor: '#F2645D', chartColor: '#F2645D' },
    ],
    'Quarter 2': [
        { id: 'apr', month: 'April 2025', initial: 'A', color: '#546FFF', spend: 1400, budget: 2100, percent: 66, statusColor: '#00A326', chartColor: '#00A326' },
        { id: 'may', month: 'May 2025', initial: 'M', color: '#546FFF', spend: 1550, budget: 2100, percent: 73, statusColor: '#FFB800', chartColor: '#FFB800' },
        { id: 'jun', month: 'June 2025', initial: 'J', color: '#546FFF', spend: 1250, budget: 2100, percent: 59, statusColor: '#00A326', chartColor: '#00A326' },
    ],
    'Quarter 3': [
        { id: 'jul', month: 'July 2025', initial: 'J', color: '#546FFF', spend: 1980, budget: 2100, percent: 94, statusColor: '#F2645D', chartColor: '#F2645D' },
        { id: 'aug', month: 'August 2025', initial: 'A', color: '#546FFF', spend: 1750, budget: 2100, percent: 83, statusColor: '#FFB800', chartColor: '#FFB800' },
        { id: 'sep', month: 'September 2025', initial: 'S', color: '#546FFF', spend: 1120, budget: 2100, percent: 53, statusColor: '#00A326', chartColor: '#00A326' },
    ],
    'Quarter 4': [
        { id: 'oct', month: 'October 2025', initial: 'O', color: '#546FFF', spend: 1480, budget: 2100, percent: 70, statusColor: '#FFB800', chartColor: '#FFB800' },
        { id: 'nov', month: 'November 2025', initial: 'N', color: '#546FFF', spend: 1310, budget: 2100, percent: 62, statusColor: '#00A326', chartColor: '#00A326' },
        { id: 'dec', month: 'December 2025', initial: 'D', color: '#546FFF', spend: 1900, budget: 2100, percent: 90, statusColor: '#F2645D', chartColor: '#F2645D' },
    ]
};



export default function MonthlyAllowanceOverview() {
    const [quarter, setQuarter] = useState('Quarter 4');

    // Get current data based on selected quarter
    const currentData = QUARTER_DATA[quarter] || QUARTER_DATA['Quarter 4'];

    // Abbreviations for logic: Q1-Q4
    const getShortQuarter = (q: string) => `Q${q.split(' ')[1]}`;

    return (
        <section className="mb-14">
            <h2 className="text-xl font-bold text-[#120048] mb-6">{getShortQuarter(quarter)} - monthly spend vs allowances overview</h2>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
                <div>
                    <h3 className="font-bold text-[#120048] mb-3">Time Period</h3>
                    <div className="flex bg-[#F8F9FE] p-1 rounded-xl w-fit">
                        {['Quarter 1', 'Quarter 2', 'Quarter 3', 'Quarter 4'].map((q) => (
                            <button
                                key={q}
                                onClick={() => setQuarter(q)}
                                className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${quarter === q
                                    ? 'bg-[#2F04B0] text-white shadow-md'
                                    : 'text-[#4F4769] hover:bg-slate-50 hover:text-[#2F04B0]'
                                    }`}
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-[#FCFCFD] border border-surface-divider px-4 py-2 rounded-lg cursor-pointer hover:bg-slate-50">
                    <span className="font-bold text-[#120048] text-sm">2025</span>
                    <span className="h-4 w-[1px] bg-slate-200 mx-2"></span>
                    <ChevronDown size={16} className="text-[#2F04B0]" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentData.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-[24px] p-5 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow group flex justify-between"
                        style={{ borderTop: `4px solid ${item.chartColor}` }}
                    >
                        {/* Left Side: Info */}
                        <div className="flex flex-col justify-between">
                            {/* Header: Icon + Month */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-[#483D8B] flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:scale-105 transition-transform">
                                    {item.initial}
                                </div>
                                <p className="text-[#120048] font-bold text-base">{item.month}</p>
                            </div>

                            {/* Stats */}
                            <div className="mt-4">
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-xl font-bold text-[#120048]">£{item.spend.toLocaleString()}</span>
                                    <span className="text-sm font-semibold text-[#120048]/70">vs £{item.budget.toLocaleString()}</span>
                                </div>
                                <p className="text-xs text-text-muted font-medium">{item.percent}% of monthly budget spent</p>
                            </div>
                        </div>

                        {/* Right Side: Chart + Action */}
                        <div className="flex flex-col justify-between items-end gap-2">
                            {/* Circular Chart */}
                            <div className="relative w-14 h-14">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="28"
                                        cy="28"
                                        r="22"
                                        stroke={item.chartColor}
                                        strokeWidth="6"
                                        fill="none"
                                        className="opacity-20"
                                    />
                                    <circle
                                        cx="28"
                                        cy="28"
                                        r="22"
                                        stroke={item.chartColor}
                                        strokeWidth="6"
                                        fill="none"
                                        strokeDasharray={2 * Math.PI * 22}
                                        strokeDashoffset={(2 * Math.PI * 22) - ((item.percent / 100) * (2 * Math.PI * 22))}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center font-bold text-xs" style={{ color: item.chartColor }}>
                                    {item.percent}%
                                </span>
                            </div>

                            <button className="w-9 h-9 rounded-xl bg-[#F8F9FE] flex items-center justify-center text-[#2F04B0] hover:bg-[#2F04B0] hover:text-white transition-colors">
                                <Search size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
