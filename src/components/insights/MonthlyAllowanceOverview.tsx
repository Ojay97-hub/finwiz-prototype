'use client';

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';

const MONTH_DATA = [
    {
        id: 'sep',
        month: 'September 2025',
        initial: 'S',
        color: '#6366F1', // Indigo for S
        spend: 1120,
        budget: 2100,
        percent: 53,
        statusColor: '#00A326', // Green
        chartColor: '#00A326'
    },
    {
        id: 'oct',
        month: 'October 2025',
        initial: 'O',
        color: '#6366F1', // Indigo for O
        spend: 1480,
        budget: 2100,
        percent: 70,
        statusColor: '#FFB800', // Yellow/Orange
        chartColor: '#FFB800'
    },
    {
        id: 'nov',
        month: 'November 2025',
        initial: 'N',
        color: '#6366F1',
        spend: 1310,
        budget: 2100,
        percent: 62,
        statusColor: '#00A326', // Green
        chartColor: '#00A326'
    },
    {
        id: 'dec',
        month: 'December 2025',
        initial: 'D',
        color: '#6366F1',
        spend: 1900,
        budget: 2100,
        percent: 90,
        statusColor: '#F2645D', // Red
        chartColor: '#F2645D'
    }
];

export default function MonthlyAllowanceOverview() {
    const [quarter, setQuarter] = useState('Quarter 4');

    return (
        <section className="mb-14">
            <h2 className="text-xl font-bold text-[#120048] mb-6">Q4 - monthly spend vs allowances overview</h2>

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
                                        : 'text-[#4F4769] hover:bg-indigo-50 hover:text-[#2F04B0]'
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

            <div className="grid md:grid-cols-2 gap-6">
                {MONTH_DATA.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-[2rem] p-6 border border-[#2F04B0] border-opacity-60 flex items-center justify-between hover:shadow-lg transition-shadow group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-[#6366F1] flex items-center justify-center text-white font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
                                {item.initial}
                            </div>
                            <div>
                                <p className="text-text-muted text-xs font-semibold mb-1">{item.month}</p>
                                <div className="flex items-baseline gap-1 mb-1">
                                    <span className="text-xl font-bold text-[#120048]">£{item.spend.toLocaleString()}</span>
                                    <span className="text-sm font-semibold text-[#120048]">vs £{item.budget.toLocaleString()}</span>
                                </div>
                                <p className="text-[10px] text-text-muted font-medium">{item.percent}% of monthly budget spent</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            {/* Circular Chart */}
                            <div className="relative w-16 h-16">
                                <svg className="w-full h-full transform -rotate-90">
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="26"
                                        stroke={item.chartColor}
                                        strokeWidth="8"
                                        fill="none"
                                        className="opacity-20"
                                    />
                                    <circle
                                        cx="32"
                                        cy="32"
                                        r="26"
                                        stroke={item.chartColor}
                                        strokeWidth="8"
                                        fill="none"
                                        strokeDasharray={2 * Math.PI * 26}
                                        strokeDashoffset={(2 * Math.PI * 26) - ((item.percent / 100) * (2 * Math.PI * 26))}
                                        strokeLinecap="round"
                                    />
                                </svg>
                                <span className="absolute inset-0 flex items-center justify-center font-bold text-[10px]" style={{ color: item.chartColor }}>
                                    {item.percent}%
                                </span>
                            </div>

                            <button className="w-10 h-10 rounded-full bg-[#F5F7FA] flex items-center justify-center text-[#2F04B0] hover:bg-[#2F04B0] hover:text-white transition-colors">
                                <Search size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
