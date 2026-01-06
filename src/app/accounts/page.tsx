'use client';

import { useState } from 'react';
import {
    totalCoins,
    finWizChests,
    achievements,
    moneyCasts,
    upcomingSummons,
    treasurePots,
    treasureTrackerData,
} from '@/data/mockData';
import {
    CreditCard,
    Target,
    PiggyBank,
    Bell,
    ChevronRight,
    Plus,
    Minus,
    X,
    Trophy,
} from 'lucide-react';
import Link from 'next/link';

export default function AccountsPage() {
    const [showTips, setShowTips] = useState(true);
    const [achievementFilter, setAchievementFilter] = useState<string>('all');

    // Achievement filter counts
    const debtCount = achievements.filter(a => a.category === 'debt').length;
    const incompleteCount = achievements.filter(a => a.progress < 100).length;
    const goalsCount = achievements.filter(a => a.category === 'goals').length;
    const allCount = achievements.length;
    const savingsCount = achievements.filter(a => a.category === 'savings').length;
    const budgetingCount = achievements.filter(a => a.category === 'budgeting').length;

    // Filter achievements
    const filteredAchievements = achievements.filter(a => {
        if (achievementFilter === 'all') return true;
        if (achievementFilter === 'incomplete') return a.progress < 100;
        if (achievementFilter === 'debt') return a.category === 'debt';
        if (achievementFilter === 'goals') return a.category === 'goals';
        if (achievementFilter === 'savings') return a.category === 'savings';
        if (achievementFilter === 'budgeting') return a.category === 'budgeting';
        return true;
    });

    // Theme colors for chests
    const chestThemes = {
        purple: {
            bg: 'bg-[#2F04B0]',
            text: 'text-white',
            highlight: 'text-[#FFD466]',
            statusBg: 'bg-[#00A326]',
            statusText: 'text-white',
        },
        yellow: {
            bg: 'bg-[#FFB602]',
            text: 'text-gray-900',
            highlight: 'text-[#7A5600]',
            statusBg: 'bg-[#00A326]',
            statusText: 'text-white',
        },
        pink: {
            bg: 'bg-[#F5B5B5]',
            text: 'text-gray-900',
            highlight: 'text-[#8B2E2E]',
            statusBg: 'bg-[#00A326]',
            statusText: 'text-white',
        },
        green: {
            bg: 'bg-white',
            text: 'text-gray-900',
            highlight: 'text-[#00A326]',
            statusBg: 'bg-[#00A326]',
            statusText: 'text-white',
            border: 'border-2 border-[#00A326]',
        },
    };

    // Difficulty badge colors
    const difficultyColors = {
        Easy: 'bg-[#00A326] text-white',
        Medium: 'bg-[#FFB602] text-gray-900',
        Hard: 'bg-[#E50913] text-white',
    };

    return (
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 lg:py-10">
            {/* ===== SECTION 1: Total Coins & AI Insights ===== */}
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mb-8">
                {/* Total Coins Card */}
                <div className="bg-[#2F04B0] rounded-[24px] p-6 lg:p-8 text-white relative overflow-hidden shadow-xl">
                    {/* Background blobs */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5C37EB] rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#443376] rounded-full blur-[80px] opacity-40 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

                    <div className="relative z-10">
                        <span className="text-xl font-medium tracking-wide">
                            Total <span className="font-semibold text-brand-dream">Coins</span>
                        </span>

                        <h1 className="text-5xl lg:text-6xl font-bold mt-4 mb-8">
                            £{totalCoins.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                        </h1>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 mb-6">
                            <button className="flex items-center gap-2 bg-[#2F04B0] border-2 border-white text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-all">
                                <CreditCard className="w-4 h-4" /> Pay
                            </button>
                            <button className="flex items-center gap-2 bg-white text-[#2F04B0] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all">
                                <Target className="w-4 h-4" /> Set goals
                            </button>
                            <button className="flex items-center gap-2 bg-[#2F04B0] border-2 border-white text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 transition-all">
                                <PiggyBank className="w-4 h-4" /> Save
                            </button>
                            <button className="flex items-center gap-2 bg-white text-[#E50913] px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-all">
                                <Bell className="w-4 h-4" /> Add alerts
                            </button>
                        </div>

                        {/* Bottom buttons */}
                        <div className="flex gap-4">
                            <button className="bg-[#120048] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[#1a0060] transition-all">
                                Show insights
                            </button>
                            <button className="bg-transparent border-2 border-[#2F04B0] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-white/10 transition-all">
                                More info
                            </button>
                        </div>
                    </div>
                </div>

                {/* AI Insights Panel */}
                <div className="flex flex-col gap-4">
                    {/* Toggle Header */}
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-surface-divider">
                        <span className="font-semibold text-text-primary">FinWiz AI insights</span>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div
                                className={`w-12 h-6 rounded-full relative transition-colors ${showTips ? 'bg-brand-primary' : 'bg-gray-300'}`}
                                onClick={() => setShowTips(!showTips)}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showTips ? 'right-1' : 'left-1'}`} />
                            </div>
                            <span className="text-sm text-text-secondary">hide FinWiz tip</span>
                        </label>
                    </div>

                    {/* Tips Content */}
                    {showTips && (
                        <div className="bg-surface-card-alt rounded-xl p-6 text-sm text-text-secondary flex-1">
                            <p className="leading-relaxed">
                                By the way... You're on track to save £340 more than last month!
                                Your coffee spending is down 23% your willpower is paying off.
                                Keep this momentum and you'll hit your £15k goal 2 months early!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* ===== SECTION 2: Your FinWiz Chests ===== */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-text-primary">Your FinWiz chests</h2>
                    <button className="text-brand-primary text-sm font-medium hover:underline">add cards</button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {finWizChests.map((chest) => {
                        const theme = chestThemes[chest.theme];
                        return (
                            <Link
                                key={chest.id}
                                href="/accounts/current"
                                className={`${theme.bg} ${theme.border || ''} rounded-[20px] p-5 relative overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer`}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <span className={`text-sm font-medium ${theme.text}`}>
                                        {chest.name} <span className={`font-semibold ${theme.highlight}`}>{chest.highlight}</span>
                                    </span>
                                    <span className={`${theme.statusBg} ${theme.statusText} text-xs font-semibold px-3 py-1 rounded-full`}>
                                        {chest.status}
                                    </span>
                                </div>

                                <p className={`text-2xl font-bold ${theme.text} mb-4`}>
                                    £{Math.abs(chest.balance).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                </p>

                                {chest.theme === 'green' ? (
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1 text-[#00A326] text-xs font-medium">
                                            <span className="w-4 h-4 bg-[#00A326] rounded-full flex items-center justify-center text-white text-[10px]">✓</span>
                                            Smart Budget Master
                                        </span>
                                        <button className="bg-[#2F04B0] text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                                            Quick transfer
                                        </button>
                                    </div>
                                ) : (
                                    <button className={`border-2 ${chest.theme === 'purple' ? 'border-white text-white' : 'border-gray-700 text-gray-700'} text-xs font-semibold px-4 py-1.5 rounded-full hover:bg-white/10 transition-all`}>
                                        View
                                    </button>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* ===== SECTION 3: Your Achievements ===== */}
            <section className="mb-10">
                <h2 className="text-xl font-bold text-text-primary mb-6">Your achievements</h2>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {[
                        { key: 'debt', label: `Debt (${debtCount})`, filled: true },
                        { key: 'incomplete', label: `Incomplete (${incompleteCount})`, filled: true },
                        { key: 'goals', label: `Goals (${goalsCount})`, filled: true },
                        { key: 'all', label: `All achievements (${allCount})`, filled: false },
                        { key: 'savings', label: `Savings (${savingsCount})`, filled: false },
                        { key: 'budgeting', label: `Budgeting (${budgetingCount})`, filled: false },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setAchievementFilter(tab.key)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${achievementFilter === tab.key
                                    ? 'bg-[#120048] text-white'
                                    : tab.filled
                                        ? 'bg-[#120048] text-white'
                                        : 'bg-white text-[#120048] border-2 border-[#120048]'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Achievement Cards */}
                <div className="grid lg:grid-cols-2 gap-4 mb-6">
                    {filteredAchievements.slice(0, 4).map((achievement) => (
                        <div
                            key={achievement.id}
                            className="bg-white rounded-[20px] p-6 border-2 border-[#00A326]/30 relative"
                        >
                            <div className="flex items-start gap-4">
                                {/* Trophy Icon */}
                                <div className="w-12 h-12 bg-[#FFB602]/20 rounded-xl flex items-center justify-center shrink-0">
                                    <Trophy className="w-6 h-6 text-[#FFB602]" />
                                </div>

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-bold text-text-primary">{achievement.title}</h3>
                                        <span className={`${difficultyColors[achievement.difficulty]} text-xs font-semibold px-3 py-1 rounded-full`}>
                                            {achievement.difficulty}
                                        </span>
                                    </div>
                                    <p className="text-sm text-text-secondary mb-3">{achievement.description}</p>

                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm">
                                            <span className="text-brand-primary font-semibold">Reward:</span>{' '}
                                            <span className="text-text-primary font-medium">{achievement.reward}</span>
                                        </span>
                                        {achievement.completedDate && (
                                            <span className="text-xs text-text-secondary">{achievement.completedDate}</span>
                                        )}
                                        {!achievement.completedDate && (
                                            <span className="text-xs text-text-secondary">{achievement.progress}% done</span>
                                        )}
                                    </div>

                                    {/* Progress Bar (for incomplete) */}
                                    {achievement.progress < 100 && (
                                        <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                                            <div
                                                className="h-full bg-[#120048] rounded-full transition-all"
                                                style={{ width: `${achievement.progress}%` }}
                                            />
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <button className="bg-[#2F04B0] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#240390] transition-all">
                                            {achievement.progress === 100 ? 'Repeat challenge' : 'Continue'}
                                        </button>
                                        <button className="bg-white text-[#2F04B0] border-2 border-[#2F04B0] px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all">
                                            View tips
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom buttons */}
                <div className="flex justify-between">
                    <button className="bg-[#2F04B0] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#240390] transition-all">
                        Set a new challenge
                    </button>
                    <button className="bg-white text-[#2F04B0] border-2 border-[#2F04B0] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all">
                        View progression
                    </button>
                </div>
            </section>

            {/* ===== SECTION 4: Treasure Tracker ===== */}
            <section className="mb-10">
                <h2 className="text-xl font-bold text-brand-primary mb-6">Treasure tracker</h2>

                <div className="grid lg:grid-cols-[300px_1fr] gap-0 rounded-[20px] overflow-hidden">
                    {/* Filter Panel */}
                    <div className="bg-[#120048] p-6">
                        <div className="bg-white rounded-lg p-3 flex items-center gap-2 mb-4">
                            <span className="text-sm text-gray-400">Filter</span>
                            <X className="w-4 h-4 text-gray-400 ml-auto" />
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {['Apr', '2025', 'income', 'line'].map((filter) => (
                                <span
                                    key={filter}
                                    className="bg-[#2F04B0] text-white px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2"
                                >
                                    {filter}
                                    <X className="w-3 h-3" />
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="bg-[#120048] p-6">
                        <h3 className="text-white font-bold text-lg mb-2">Income – Apr to May</h3>
                        <p className="text-gray-400 text-sm mb-6">A line graph showing your income trajectory from April 2025 to May 2025.</p>

                        {/* Chart */}
                        <div className="relative h-[200px]">
                            {/* Y-axis labels */}
                            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-400">
                                <span>£12,500.00</span>
                                <span>£12k</span>
                                <span>£11,500</span>
                                <span>£11k</span>
                                <span>£10,500</span>
                                <span>£10k</span>
                                <span>£9,500</span>
                            </div>

                            {/* Chart line */}
                            <svg className="absolute left-16 top-0 right-0 bottom-8" viewBox="0 0 400 160" preserveAspectRatio="none">
                                <path
                                    d="M 0 140 L 133 100 L 266 40 L 400 20"
                                    fill="none"
                                    stroke="white"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                                {/* Highlight point */}
                                <circle cx="266" cy="40" r="8" fill="white" />
                                <circle cx="266" cy="40" r="4" fill="#120048" />
                            </svg>

                            {/* Highlighted value */}
                            <div className="absolute right-[30%] top-[15%] text-white font-bold text-lg">
                                £11,760
                            </div>

                            {/* X-axis labels */}
                            <div className="absolute left-16 right-0 bottom-0 flex justify-between text-xs text-gray-400">
                                {treasureTrackerData.map((point) => (
                                    <span key={point.week}>{point.week}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 5: Recent Money Casts & Upcoming Summons ===== */}
            <section className="mb-10">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Money Casts */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-text-primary">Recent money casts</h2>
                            <button className="text-brand-primary text-sm font-medium hover:underline">view all</button>
                        </div>

                        <div className="bg-white rounded-[20px] border border-surface-divider overflow-hidden">
                            {moneyCasts.map((cast, index) => (
                                <div
                                    key={cast.id}
                                    className={`flex items-center gap-4 p-4 ${index !== moneyCasts.length - 1 ? 'border-b border-surface-divider' : ''}`}
                                >
                                    {/* Avatar */}
                                    <div className="w-10 h-10 bg-gradient-to-br from-[#F2645D] to-[#FFB602] rounded-full flex items-center justify-center text-lg">
                                        {cast.avatar}
                                    </div>

                                    {/* Name & Description */}
                                    <div className="flex-1">
                                        <span className="font-semibold text-brand-primary">{cast.name}</span>
                                        <p className="text-sm text-text-secondary">{cast.description}</p>
                                    </div>

                                    {/* Date */}
                                    <span className="text-sm text-text-secondary">{cast.date}</span>

                                    {/* Amount */}
                                    <span className="font-semibold text-[#00A326]">+£{cast.amount.toFixed(2)}</span>

                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Summons */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-text-primary">Upcoming summons</h2>
                            <button className="text-brand-primary text-sm font-medium hover:underline">view all</button>
                        </div>

                        <div className="bg-white rounded-[20px] border border-surface-divider overflow-hidden">
                            {upcomingSummons.map((summon, index) => (
                                <div
                                    key={summon.id}
                                    className={`flex items-center gap-4 p-4 ${index !== upcomingSummons.length - 1 ? 'border-b border-surface-divider' : ''}`}
                                >
                                    {/* Icon */}
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                                        style={{ backgroundColor: summon.iconBg }}
                                    >
                                        {summon.icon}
                                    </div>

                                    {/* Name */}
                                    <span className="font-semibold text-text-primary flex-1">{summon.name}</span>

                                    {/* Date */}
                                    <span className="text-sm text-text-secondary">{summon.date}</span>

                                    {/* Amount */}
                                    <span className="font-semibold text-text-primary">-£{Math.abs(summon.amount)}</span>

                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SECTION 6: Treasure Pots Progress ===== */}
            <section className="mb-10">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-text-primary">Treasure pots progress</h2>
                    <button className="text-brand-primary text-sm font-medium hover:underline">manage</button>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {treasurePots.map((pot) => {
                        const percentage = Math.round((pot.currentAmount / pot.goalAmount) * 100);
                        return (
                            <div
                                key={pot.id}
                                className="bg-white rounded-[20px] p-5 border border-surface-divider"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg"
                                            style={{ backgroundColor: `${pot.color}20` }}
                                        >
                                            {pot.icon}
                                        </div>
                                        <span className="font-semibold text-text-primary">{pot.name}</span>
                                    </div>
                                    <span
                                        className="text-xs font-semibold px-2 py-1 rounded-full"
                                        style={{
                                            backgroundColor: `${pot.color}20`,
                                            color: pot.color,
                                        }}
                                    >
                                        {percentage}% saved
                                    </span>
                                </div>

                                <p className="text-lg mb-2">
                                    <span className="font-bold" style={{ color: pot.color }}>
                                        £{pot.currentAmount.toLocaleString('en-GB')}
                                    </span>
                                    <span className="text-text-secondary">/ £{pot.goalAmount.toLocaleString('en-GB')}</span>
                                </p>

                                {/* Progress Bar */}
                                <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all"
                                        style={{
                                            width: `${percentage}%`,
                                            backgroundColor: '#120048',
                                        }}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button className="flex items-center gap-1 text-[#00A326] text-xs font-semibold border border-[#00A326] px-3 py-1.5 rounded-full hover:bg-[#00A326]/10 transition-all">
                                        <Plus className="w-3 h-3" /> add money
                                    </button>
                                    <button className="flex items-center gap-1 text-[#2F04B0] text-xs font-semibold border border-[#2F04B0] px-3 py-1.5 rounded-full hover:bg-[#2F04B0]/10 transition-all">
                                        <Minus className="w-3 h-3" /> take money
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}
