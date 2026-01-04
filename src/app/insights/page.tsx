'use client';

import { useState } from 'react';
import {
    SpendByCategoryChart,
    TopExpensesChart,
    SubscriptionsChart,
    SpendingForecastChart,
    SavingsComparisonChart,
    AnnualExpensesChart
} from '@/components/charts/CrystalBallCharts';
import TrendsHeader from '@/components/insights/TrendsHeader';

export default function InsightsPage() {
    const summaryColors = [
        { bg: '#2F04B0', text: 'You spent a lot on takeaway and restaurants this month. Perhaps cooking at home more often would...' },
        { bg: '#FFB602', text: 'Great job! Your savings increased by 15% compared to last month!' },
        { bg: '#F2645D', text: 'Your subscriptions total £89/month. Consider reviewing unused services.' },
        { bg: '#00A326', text: 'Energy bills are 20% lower than the UK average for similar households.' },
    ];

    return (
        <div className="p-8 max-w-[1400px] mx-auto min-h-screen">
            {/* Header / Top Section */}
            <TrendsHeader />

            {/* Section Controls */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex-1 h-[2px] bg-indigo-50 mr-8"></div>
                <h2 className="text-2xl font-bold text-[#120048] whitespace-nowrap">Crystal Ball Insights</h2>
                <div className="flex-1 h-[2px] bg-indigo-50 ml-8"></div>
            </div>

            <div className="flex justify-between items-center mb-10">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5F81FF] text-[#5F81FF] text-sm font-semibold hover:bg-indigo-50 transition-colors bg-white">
                    Showing data from all cards
                    <span className="bg-[#E6F4EA] text-[#1E8E3E] rounded-full p-0.5 text-[10px]">✔</span>
                </button>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5F81FF] text-[#5F81FF] text-sm font-semibold hover:bg-indigo-50 transition-colors bg-white">
                    <span className="text-lg">⊞</span> Widget Layout
                </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <SpendByCategoryChart />
                <TopExpensesChart />
                <SubscriptionsChart />
                <SpendingForecastChart />
                <SavingsComparisonChart />
                <AnnualExpensesChart />
            </div>

            {/* FinWiz AI Summary */}
            <section className="mb-14 relative">
                <h2 className="text-xl font-bold text-text-primary mb-6">FinWiz AI Summary</h2>
                <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
                    {summaryColors.map((item, i) => (
                        <div
                            key={i}
                            className="min-w-[300px] px-6 py-5 rounded-[1.5rem] text-white text-sm font-medium shadow-lg hover:shadow-xl transition-shadow flex-shrink-0 leading-relaxed"
                            style={{ backgroundColor: item.bg }}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>
                <div className="absolute right-0 bottom-4 w-14 h-14 bg-gradient-to-br from-[#FFD466] to-[#FF9F43] rounded-full flex items-center justify-center shadow-lg transform translate-x-1/4 hover:scale-110 transition-transform cursor-pointer z-10 border-4 border-white">
                    <span className="text-2xl">🧙</span>
                </div>
            </section>

            {/* Wizard Spending Locator */}
            <section className="mb-14">
                <h2 className="text-xl font-bold text-text-primary mb-6">Wizard Spending Locator</h2>
                <div className="bg-white rounded-[2rem] p-8 border border-surface-divider shadow-sm">
                    <div className="grid lg:grid-cols-[1fr_320px] gap-8">
                        {/* Map Mock */}
                        <div className="relative aspect-[16/9] bg-[#F8FAFC] rounded-3xl overflow-hidden border border-surface-divider group">
                            <div className="absolute inset-0">
                                {/* Stylized map grid */}
                                <svg className="w-full h-full" width="100%" height="100%">
                                    <defs>
                                        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                                            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                </svg>

                                {/* Street lines mock */}
                                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 800 450" preserveAspectRatio="none">
                                    <path d="M-50,200 C150,200 250,150 400,250 S650,350 850,300" stroke="#CBD5E1" strokeWidth="8" fill="none" />
                                    <path d="M200,-50 C200,100 250,300 150,500" stroke="#CBD5E1" strokeWidth="8" fill="none" />
                                    <path d="M600,-50 C600,100 550,250 650,500" stroke="#CBD5E1" strokeWidth="8" fill="none" />
                                </svg>

                                {/* Spending markers */}
                                {[
                                    { x: '30%', y: '25%', val: '£45', bg: 'bg-[#E50913]', delay: '0' },
                                    { x: '55%', y: '45%', val: '£120', bg: 'bg-[#FF9F43]', delay: '100' },
                                    { x: '70%', y: '20%', val: '£15', bg: 'bg-[#5F81FF]', delay: '200' },
                                    { x: '20%', y: '65%', val: '£30', bg: 'bg-[#00A326]', delay: '300' }
                                ].map((marker, i) => (
                                    <div
                                        key={i}
                                        className={`absolute w-12 h-12 ${marker.bg} text-white rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer border-[3px] border-white z-10 hover:z-20`}
                                        style={{ left: marker.x, top: marker.y, animationDelay: `${marker.delay}ms` }}
                                    >
                                        <span className="font-bold text-xs">{marker.val}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Map Controls */}
                            <div className="absolute top-6 left-6 flex gap-3">
                                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-sm font-semibold text-text-primary shadow-sm border border-white/50">
                                    1 Location
                                </div>
                            </div>
                            <div className="absolute top-6 right-6 flex gap-3">
                                <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-xl text-sm font-semibold text-text-secondary cursor-pointer hover:bg-white transition-colors shadow-sm border border-white/50 flex items-center gap-2">
                                    Time Range <span className="text-[10px]">▼</span>
                                </div>
                            </div>
                        </div>

                        {/* Location Stats */}
                        <div className="flex flex-col h-full">
                            <div className="relative mb-6">
                                <input
                                    type="text"
                                    placeholder="Find a shop..."
                                    className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-surface-divider text-sm bg-surface-base focus:bg-white focus:ring-2 focus:ring-brand-primary/20 transition-all outline-none"
                                />
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-lg">🔍</span>
                            </div>

                            <div className="space-y-3 flex-1 overflow-y-auto pr-2">
                                {[
                                    { name: 'Tesco Express', distance: '0.3mi', spent: '£156.42', icon: '🛒', color: 'bg-blue-100 text-blue-600' },
                                    { name: 'Costa Coffee', distance: '0.5mi', spent: '£89.20', icon: '☕', color: 'bg-red-100 text-red-600' },
                                    { name: 'Amazon Locker', distance: '0.7mi', spent: '£245.99', icon: '📦', color: 'bg-orange-100 text-orange-600' },
                                    { name: 'Shell Station', distance: '1.2mi', spent: '£45.00', icon: '⛽', color: 'bg-yellow-100 text-yellow-600' },
                                    { name: 'Uber pool', distance: '2.5mi', spent: '£12.50', icon: '🚗', color: 'bg-gray-100 text-gray-600' },
                                ].map((loc, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-surface-divider hover:border-brand-primary/30 hover:shadow-md transition-all cursor-pointer group">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl ${loc.color} flex items-center justify-center text-xl`}>
                                                {loc.icon}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-text-primary text-sm mb-0.5">{loc.name}</p>
                                                <p className="text-xs text-text-muted font-medium">{loc.distance} away</p>
                                            </div>
                                        </div>
                                        <span className="font-bold text-text-primary text-sm">{loc.spent}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Merchant Stores Menu */}
            <section className="mb-14">
                <h2 className="text-xl font-bold text-text-primary mb-6">Merchant stores menu</h2>
                <div className="flex gap-5 overflow-x-auto pb-6 scrollbar-hide">
                    {[
                        { name: 'Carrefour', icon: '🛒', color: '#2F04B0' },
                        { name: 'Apple Store', price: '£249', icon: '🍎', color: '#1A1A1A' },
                        { name: 'Nike', price: '£120', icon: '✓', color: '#F2645D' },
                        { name: 'IKEA', price: '£350', icon: '🛋️', color: '#0D5BAB' },
                        { name: 'Zara', price: '£85', icon: '👗', color: '#E0B564' },
                    ].map((store, i) => (
                        <div
                            key={i}
                            className="min-w-[200px] h-[180px] rounded-[1.75rem] p-6 text-white flex flex-col justify-between shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                            style={{ backgroundColor: store.color }}
                        >
                            <span className="text-3xl bg-white/20 w-14 h-14 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner">
                                {store.icon}
                            </span>
                            <div>
                                <p className="font-bold text-xl leading-tight mb-1">{store.name}</p>
                                {store.price && <p className="text-white/80 text-sm font-medium">{store.price} spent</p>}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Monthly Subscription Billing */}
            <section className="mb-10">
                <h2 className="text-xl font-bold text-text-primary mb-6">Monthly Subscription Billing</h2>
                <div className="bg-white rounded-[2rem] p-8 border border-surface-divider shadow-sm">
                    <div className="grid md:grid-cols-3 gap-5">
                        {[
                            { name: 'Netflix', amount: 15.99, status: 'Active', color: '#E50913' },
                            { name: 'Spotify', amount: 9.99, status: 'Active', color: '#10B981' },
                            { name: 'Disney+', amount: 7.99, status: 'Paused', color: '#2F04B0' },
                            { name: 'Adobe', amount: 49.99, status: 'Active', color: '#FF0000' },
                            { name: 'Prime', amount: 8.99, status: 'Active', color: '#00A8E1' },
                            { name: 'Gym', amount: 45.00, status: 'Active', color: '#E0B564' },
                        ].map((sub, i) => (
                            <div key={i} className="flex items-center justify-between p-5 border border-surface-divider rounded-2xl hover:shadow-lg hover:border-brand-primary/20 transition-all cursor-pointer bg-white group">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-sm group-hover:scale-105 transition-transform"
                                        style={{ backgroundColor: sub.color }}
                                    >
                                        {sub.name[0]}
                                    </div>
                                    <div>
                                        <p className="font-bold text-text-primary text-sm mb-0.5">{sub.name}</p>
                                        <p className="text-xs text-text-muted font-medium">£{sub.amount}/mo</p>
                                    </div>
                                </div>
                                <span className={`text-[10px] px-3 py-1.5 rounded-full font-bold uppercase tracking-wide ${sub.status === 'Active' ? 'bg-[#E6F4EA] text-[#1E8E3E]' : 'bg-surface-base text-text-secondary'
                                    }`}>
                                    {sub.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
