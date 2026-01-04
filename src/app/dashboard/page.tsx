'use client';

import { useState } from 'react';
import FinWizChestCard from '@/components/cards/FinWizChestCard';
import LineChart from '@/components/charts/LineChart';
import {
    treasurePots,
    transactions,
    partnerPerks,
} from '@/data/mockData';

export default function DashboardPage() {
    const [aiInsightsEnabled, setAiInsightsEnabled] = useState(true);

    const totalBalance = 12230.00;

    // Treasure tracker data
    const trackerData = [
        { label: 'Jan', value: 8000 },
        { label: 'Feb', value: 9500 },
        { label: 'Mar', value: 11000 },
        { label: 'Apr', value: 10500 },
        { label: 'May', value: 12230 },
    ];

    const achievements = [
        { id: '1', name: 'Gold Level', description: 'Reached Gold status', icon: '🏆', progress: 100, color: '#FFB602', status: 'complete' },
        { id: '2', name: '2x Streak!', description: 'Two month saving streak', icon: '🔥', progress: 100, color: '#F2645D', status: 'complete' },
        { id: '3', name: 'Super Saver', description: 'Saved 10% of income', icon: '⭐', progress: 75, color: '#00A326', status: 'in-progress' },
        { id: '4', name: 'Budget Boss', description: 'Stay under budget', icon: '👑', progress: 50, color: '#7159B6', status: 'in-progress' },
    ];

    const upcomingSummons = [
        { id: '1', name: 'Spotify', date: 'April 17', amount: 9.99, icon: '🎵' },
        { id: '2', name: 'Work Sill', date: '2 days', amount: 510, icon: '💼' },
        { id: '3', name: 'Payball', date: 'Apr 21', amount: 4.99, icon: '⚽' },
    ];

    const recentCasts = [
        { id: '1', merchant: 'Costa', amount: -64.80, type: 'food', icon: '☕' },
        { id: '2', merchant: 'John Doe Set', amount: -64.80, type: 'other', icon: '👤' },
        { id: '3', merchant: 'Amazon S3', amount: -14.50, type: 'tech', icon: '📦' },
        { id: '4', merchant: 'Uber', amount: -14.67, type: 'transport', icon: '🚗' },
    ];

    return (
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 lg:py-10">
            {/* Hero Section - Two Column */}
            <div className="grid lg:grid-cols-[1.2fr_1fr] gap-6 mb-8">
                {/* Total Coins Card */}
                <div className="bg-gradient-purple-1 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden">
                    <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-lg font-medium opacity-90">Total Coins</span>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="opacity-70">AI Insights</span>
                                <button
                                    onClick={() => setAiInsightsEnabled(!aiInsightsEnabled)}
                                    className={`w-12 h-6 rounded-full transition-colors ${aiInsightsEnabled ? 'bg-status-success' : 'bg-white/30'} relative`}
                                >
                                    <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${aiInsightsEnabled ? 'right-1' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>

                        <h1 className="text-5xl lg:text-6xl font-bold mb-8">
                            £{totalBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                        </h1>

                        <div className="flex flex-wrap gap-3 mb-6">
                            <button className="flex items-center gap-2 bg-brand-primary border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-primary/80">
                                <PlusIcon className="w-4 h-4" /> Pay
                            </button>
                            <button className="flex items-center gap-2 bg-brand-primary border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-brand-primary/80">
                                <SaveIcon className="w-4 h-4" /> Save
                            </button>
                            <button className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20">
                                <TransferIcon className="w-4 h-4" /> Transfer
                            </button>
                            <button className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-white/20">
                                <SplitIcon className="w-4 h-4" /> Split
                            </button>
                        </div>
                    </div>
                </div>

                {/* Your FinWiz Chests */}
                <div>
                    <h2 className="text-lg font-semibold text-text-primary mb-4">Your FinWiz chests</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {[
                            { name: 'Main Savings', amount: 2300, icon: '💰', color: '#2F04B0' },
                            { name: 'Emergency', amount: 11000, icon: '🚨', color: '#00A326' },
                            { name: 'Holiday', amount: 2300, icon: '✈️', color: '#FFB602' },
                            { name: 'Credit', amount: -1070, icon: '💳', color: '#E50913' },
                        ].map((chest, index) => (
                            <div key={index} className="bg-white rounded-2xl p-4 shadow-sm border border-surface-divider">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">{chest.icon}</span>
                                    <span className="text-sm text-text-secondary">{chest.name}</span>
                                </div>
                                <p className={`text-xl font-bold ${chest.amount < 0 ? 'text-status-error' : 'text-text-primary'}`}>
                                    £{Math.abs(chest.amount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                </p>
                                <div className="flex gap-1 mt-2">
                                    <button className="text-xs text-brand-primary hover:underline">withdraw</button>
                                    <span className="text-text-muted">|</span>
                                    <button className="text-xs text-brand-primary hover:underline">top up</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Your Achievements */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Your achievements</h2>
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                    {['Gold 🏆', 'Financials', 'Vitals', '2x Streak!🔥', 'Super ⭐', 'SAVER!'].map((tab, i) => (
                        <button
                            key={i}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${i === 0 ? 'bg-brand-primary text-white' : 'bg-surface-card border border-surface-divider text-text-secondary hover:bg-surface-card-alt'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                    {achievements.slice(0, 3).map((achievement) => (
                        <div key={achievement.id} className="bg-white rounded-2xl p-5 shadow-sm border border-surface-divider">
                            <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ backgroundColor: `${achievement.color}20` }}>
                                        {achievement.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-text-primary">{achievement.name}</h3>
                                        <p className="text-xs text-text-secondary">{achievement.description}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-medium px-2 py-1 rounded-full" style={{ backgroundColor: `${achievement.color}20`, color: achievement.color }}>
                                    {achievement.status === 'complete' ? 'Unlocked' : `${achievement.progress}%`}
                                </span>
                            </div>
                            <div className="h-2 bg-surface-base rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${achievement.progress}%`, backgroundColor: achievement.color }} />
                            </div>
                            <button className="text-sm text-brand-primary font-medium mt-3 hover:underline">View more</button>
                        </div>
                    ))}
                </div>
            </section>

            {/* Treasure Tracker */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Treasure tracker</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-surface-divider overflow-hidden">
                    <div className="flex gap-2 p-4 border-b border-surface-divider">
                        {['1M', '3M', '6M', '1Y', 'All'].map((period, i) => (
                            <button
                                key={i}
                                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${i === 2 ? 'bg-brand-primary text-white' : 'text-text-secondary hover:bg-surface-base'
                                    }`}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                    <div className="p-4">
                        <LineChart data={trackerData} height={200} color="#2F04B0" showArea={true} />
                    </div>
                </div>
            </section>

            {/* Recent Money Casts & Upcoming Summons */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-text-primary">Recent money casts</h2>
                        <button className="text-sm text-brand-primary font-medium hover:underline">View all</button>
                    </div>
                    <div className="space-y-3">
                        {recentCasts.map((cast) => (
                            <div key={cast.id} className="flex items-center justify-between bg-white rounded-xl p-4 border border-surface-divider">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{cast.icon}</span>
                                    <span className="font-medium text-text-primary">{cast.merchant}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-text-secondary">{cast.type}</span>
                                    <span className="font-semibold text-text-primary">£{Math.abs(cast.amount).toFixed(2)}</span>
                                    <ChevronRightIcon className="w-4 h-4 text-text-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-semibold text-text-primary">Upcoming summons</h2>
                        <button className="text-sm text-brand-primary font-medium hover:underline">View all</button>
                    </div>
                    <div className="space-y-3">
                        {upcomingSummons.map((summon) => (
                            <div key={summon.id} className="flex items-center justify-between bg-white rounded-xl p-4 border border-surface-divider">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">{summon.icon}</span>
                                    <span className="font-medium text-text-primary">{summon.name}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-sm text-text-secondary">{summon.date}</span>
                                    <span className="font-semibold text-text-primary">£{summon.amount}</span>
                                    <ChevronRightIcon className="w-4 h-4 text-text-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            {/* Treasure Pots Progress */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Treasure pots progress</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {treasurePots.map((pot, index) => (
                        <FinWizChestCard
                            key={pot.id}
                            name={pot.name}
                            icon={pot.icon}
                            currentAmount={pot.currentAmount}
                            goalAmount={pot.goalAmount}
                            color={pot.color}
                            delay={index * 100}
                        />
                    ))}
                </div>
            </section>

            {/* Partner Perks */}
            <section className="mb-8">
                <h2 className="text-lg font-semibold text-text-primary mb-4">Partner perks</h2>
                <div className="grid md:grid-cols-3 gap-4">
                    {partnerPerks.slice(0, 3).map((perk) => (
                        <div key={perk.id} className="bg-white rounded-2xl p-5 shadow-sm border border-surface-divider">
                            <div className="flex items-start gap-3 mb-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                                    style={{ backgroundColor: perk.iconBg }}
                                >
                                    {perk.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-text-primary">{perk.brand}</h3>
                                    <p className="text-sm text-text-secondary">{perk.description}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="flex-1 text-sm bg-brand-primary text-white py-2 rounded-lg font-medium hover:bg-brand-primary/90">
                                    Activate
                                </button>
                                <button className="flex-1 text-sm bg-surface-base text-text-secondary py-2 rounded-lg font-medium hover:bg-surface-card-alt">
                                    Learn more
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tip Banner */}
            <div className="bg-gradient-to-r from-brand-secondary to-brand-primary rounded-2xl p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">💡</span>
                    <p className="text-white">
                        <strong>Tip:</strong> Add all of your accounts to unlock more features and insights
                    </p>
                </div>
                <button className="bg-white text-brand-primary px-4 py-2 rounded-xl font-medium text-sm hover:bg-white/90">
                    Add accounts
                </button>
            </div>
        </div>
    );
}

// Icon Components
function PlusIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
    );
}

function SaveIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
            <polyline points="17,21 17,13 7,13 7,21" />
            <polyline points="7,3 7,8 15,8" />
        </svg>
    );
}

function TransferIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="17,1 21,5 17,9" />
            <path d="M3 11V9a4 4 0 014-4h14" />
            <polyline points="7,23 3,19 7,15" />
            <path d="M21 13v2a4 4 0 01-4 4H3" />
        </svg>
    );
}

function SplitIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
    );
}

function ChevronRightIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9,18 15,12 9,6" />
        </svg>
    );
}
