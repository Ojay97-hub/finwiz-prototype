'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const SpendingMap = dynamic(() => import('@/components/insights/SpendingMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-slate-100 animate-pulse rounded-[2rem] flex items-center justify-center">
            <span className="text-slate-400">Loading Map...</span>
        </div>
    ),
});

export default function WizardSpendingLocator() {
    return (
        <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#2F04B0] mb-6 text-center">Wizard Spending Locator</h2>
            <div className="bg-white rounded-[2rem] p-8 border border-[#2F04B0]/40 min-h-[600px] flex flex-col shadow-sm">
                {/* 1. Header Filters */}
                <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-6">
                    <div className="flex flex-col gap-3 w-full lg:w-auto">
                        <h3 className="font-bold text-text-primary text-lg">Filter by Category</h3>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { label: 'Food & Drink', active: true },
                                { label: 'Groceries', active: false },
                                { label: 'Transport', active: false },
                                { label: 'Shopping', active: false },
                                { label: 'Entertainment', active: false },
                                { label: 'Bills', active: false },
                                { label: 'Other', active: false },
                            ].map((filter, i) => (
                                <button
                                    key={i}
                                    className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${filter.active
                                        ? 'bg-[#2F04B0] text-white border-[#2F04B0] shadow-md'
                                        : 'bg-white text-[#2F04B0] border-[#2F04B0] hover:bg-[#2F04B0]/5'
                                        }`}
                                >
                                    {filter.label}
                                </button>
                            ))}
                            <button className="px-5 py-2.5 rounded-full text-sm font-semibold text-[#2F04B0] hover:bg-[#2F04B0]/5 transition-colors">
                                Select all
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full lg:w-auto">
                        <h3 className="font-bold text-text-primary text-lg lg:text-right">Time Period</h3>
                        <div className="flex bg-white rounded-xl border border-slate-200 overflow-hidden w-fit">
                            {['Last 7 days', 'Last 30 days', 'Last 90 days', 'All time'].map((period, i) => (
                                <button
                                    key={i}
                                    className={`px-4 py-2.5 text-xs font-semibold transition-all border-r border-slate-200 last:border-r-0 ${period === 'Last 30 days'
                                        ? 'bg-[#2F04B0] text-white'
                                        : 'bg-white text-text-muted hover:text-text-primary hover:bg-slate-50'
                                        }`}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. Map Area */}
                <div className="flex-1 w-full relative min-h-[400px] mb-8 rounded-xl overflow-hidden border border-[#2F04B0]/20 shadow-inner">
                    <SpendingMap />
                </div>

                {/* 3. Footer / Insights - Detached Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* FinWiz AI Insights Card */}
                    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-[#120048] italic">FinWiz AI insights</h3>
                        </div>
                        <p className="text-text-secondary leading-relaxed mb-6 text-sm lg:text-base">
                            Looks like you're spending quite a bit on lunch in Covent Garden! Try packing a homemade lunch a few times a week or exploring more affordable options nearby to cut down your food costs significantly.
                        </p>

                    </div>
                    {/* Top Locations Card */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-slate-200">
                                        <th className="py-4 text-lg font-bold text-[#120048]">Location</th>
                                        <th className="py-4 text-lg font-bold text-[#120048]">Store</th>
                                        <th className="py-4 text-lg font-bold text-[#120048] text-right">Spend pcm</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { name: 'Pret A Manger', loc: 'Covent Garden', amount: 150 },
                                        { name: 'Wagamama', loc: 'Soho', amount: 120 },
                                        { name: 'BrewDog', loc: 'Charing Cross', amount: 100 },
                                        { name: 'M&S Foodhall', loc: 'Strand', amount: 90 },
                                    ].map((item, i) => (
                                        <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group cursor-default">
                                            <td className="py-4 pl-2 text-base text-[#120048] font-semibold">{item.name}</td>
                                            <td className="py-4 text-base text-[#120048] font-semibold group-hover:text-[#2F04B0] transition-colors">{item.loc}</td>
                                            <td className="py-4 text-right pr-2">
                                                <span className="font-bold text-[#120048] text-base bg-slate-100 px-3 py-1 rounded-full group-hover:bg-[#2F04B0] group-hover:text-white transition-colors">£{item.amount}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
