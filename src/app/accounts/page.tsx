'use client';

import { useState, useMemo } from 'react';
import {
    totalCoins,
    finWizChests,
    achievements,
    moneyCasts,
    upcomingSummons,
    treasurePots,
    treasureTrackerData,
    treasureTrackerFilters,
} from '@/data/mockData';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from 'recharts';
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
    Car,
    Trees,
    Palmtree,
    CloudRain,
    Sun,
    Umbrella,
    CirclePlus,
    CircleMinus,
} from 'lucide-react';
import Link from 'next/link';

export default function AccountsPage() {
    const [showTips, setShowTips] = useState(true);
    const [achievementFilter, setAchievementFilter] = useState<string>('all');

    // Treasure Tracker filter state
    const [trackerFilters, setTrackerFilters] = useState({
        month: 'Apr',
        year: 2025,
        type: 'income' as 'income' | 'expense',
        chartType: 'line' as 'line' | 'bar',
    });

    // Get filtered treasure tracker data
    const filteredTrackerData = useMemo(() => {
        return treasureTrackerData.filter(
            (point) =>
                point.month === trackerFilters.month &&
                point.year === trackerFilters.year &&
                point.type === trackerFilters.type
        );
    }, [trackerFilters]);

    // Remove a filter (reset to default)
    const removeFilter = (filterKey: 'month' | 'year' | 'type' | 'chartType') => {
        setTrackerFilters((prev) => ({
            ...prev,
            [filterKey]: filterKey === 'month' ? 'Apr' : filterKey === 'year' ? 2025 : filterKey === 'type' ? 'income' : 'line',
        }));
    };

    // Active filters for display as pills
    const activeFilters = [
        { key: 'month', value: trackerFilters.month },
        { key: 'year', value: trackerFilters.year.toString() },
        { key: 'type', value: trackerFilters.type },
        { key: 'chartType', value: trackerFilters.chartType },
    ];

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
    const chestThemes: Record<string, {
        bg: string;
        text: string;
        highlight: string;
        statusBg: string;
        statusText: string;
        border?: string;
        buttonBg?: string;
        buttonText?: string;
    }> = {
        purple: {
            bg: 'bg-[#3F2E7E]', // Adjusted deep purple
            text: 'text-white',
            highlight: 'font-bold text-[#FFD466]',
            statusBg: 'bg-[#0F5132]', // Dark green badge
            statusText: 'text-white',
            buttonBg: 'bg-white',
            buttonText: 'text-[#3F2E7E]'
        },
        yellow: {
            bg: 'bg-[#FFCD4B]', // Golden yellow
            text: 'text-[#2D2159]', // Dark purple-ish text
            highlight: 'font-medium',
            statusBg: 'bg-[#0F5132]',
            statusText: 'text-white',
            buttonBg: 'bg-white',
            buttonText: 'text-[#3F2E7E]'
        },
        pink: {
            bg: 'bg-[#F9BCBC]', // Pastel pink
            text: 'text-[#2D2159]',
            highlight: 'font-medium',
            statusBg: 'bg-[#0F5132]',
            statusText: 'text-white',
            buttonBg: 'bg-white',
            buttonText: 'text-[#3F2E7E]'
        },
        green: {
            bg: 'bg-white',
            text: 'text-[#120048]',
            highlight: 'font-medium',
            statusBg: 'bg-[#0F5132]',
            statusText: 'text-white',
            border: 'border border-[#1DB954]', // Green border
            buttonBg: 'bg-[#2F04B0]',
            buttonText: 'text-white'
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
            {/* ===== SECTION 1: Total Coins & AI Insights ===== */}
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 mb-10">
                {/* Total Coins Card */}
                <div className="bg-[#2F04B0] rounded-[32px] p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between min-h-[320px]">
                    {/* Background blobs */}
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5C37EB] rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#443376] rounded-full blur-[80px] opacity-40 translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div>
                            <span className="text-xl font-medium tracking-wide">
                                Total <span className="font-bold text-[#FFD466]">Coins</span>
                            </span>

                            <h1 className="text-6xl lg:text-7xl font-bold mt-6 mb-8 tracking-tight">
                                £{totalCoins.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                            </h1>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <button className="flex items-center gap-2 bg-[#4833A5] border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#5a42c0] transition-all">
                                <CreditCard className="w-4 h-4" /> Pay
                            </button>
                            <button className="flex items-center gap-2 bg-[#4833A5] border border-white/20 text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#5a42c0] transition-all">
                                <Target className="w-4 h-4" /> Set goals
                            </button>
                            <button className="flex items-center gap-2 bg-white text-[#2F04B0] px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-100 transition-all shadow-md">
                                <PiggyBank className="w-4 h-4" /> Save
                            </button>
                            <button className="flex items-center gap-2 bg-white text-[#E50913] px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-100 transition-all shadow-md">
                                <Bell className="w-4 h-4" /> Add alerts
                            </button>
                        </div>
                    </div>
                </div>

                {/* AI Insights Panel */}
                <div className="flex flex-col h-full">
                    {/* Toggle Header */}
                    <div className="flex items-center justify-between mb-4 px-1">
                        <span className="text-lg font-bold text-[#120048]">FinWiz AI insights</span>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <div
                                className={`w-10 h-6 rounded-full relative transition-colors ${showTips ? 'bg-[#2F04B0]' : 'bg-gray-300'}`}
                                onClick={() => setShowTips(!showTips)}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showTips ? 'right-1' : 'left-1'}`} />
                            </div>
                            <span className="text-sm font-medium text-[#120048]">hide FinWiz tip</span>
                        </label>
                    </div>

                    {/* Tips Content */}
                    {showTips && (
                        <div className="bg-white border border-gray-100 rounded-[32px] p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-md transition-shadow">
                            <p className="text-[#120048] text-lg leading-relaxed mb-8">
                                By the way... You're on track to save <span className="font-bold">£340</span> more than last month!
                                Your coffee spending is down <span className="font-bold">23%</span> your willpower is paying off.
                                Keep this momentum and you'll hit your <span className="font-bold">£15k goal</span> 2 months early!
                            </p>

                            {/* Insight Buttons */}
                            <div className="flex gap-4 mt-auto w-full">
                                <button className="flex-1 bg-[#2F04B0] text-white px-8 py-3 rounded-full text-sm font-bold hover:bg-[#1a0060] transition-all shadow-md">
                                    Show insights
                                </button>
                                <button className="flex-1 bg-white border-2 border-[#2F04B0] text-[#2F04B0] px-8 py-3 rounded-full text-sm font-bold hover:bg-gray-50 transition-all">
                                    More info
                                </button>
                            </div>
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                    {finWizChests.map((chest) => {
                        const theme = chestThemes[chest.theme];
                        return (
                            <Link
                                key={chest.id}
                                href="/accounts/current"
                                className={`${theme.bg} ${theme.border || ''} rounded-[20px] p-5 relative overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer flex flex-col justify-between h-full min-h-[120px]`}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-base font-medium ${theme.text}`}>
                                        {chest.name} <span className={`${theme.highlight}`}>{chest.highlight}</span>
                                    </span>
                                    <span className={`${theme.statusBg} ${theme.statusText} text-[10px] font-bold px-3 py-1 rounded-full`}>
                                        {chest.status}
                                    </span>
                                </div>

                                {chest.theme === 'green' ? (
                                    <>
                                        <p className={`text-3xl font-bold ${theme.text} py-4`}>
                                            £{Math.abs(chest.balance).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 text-[#120048] text-xs font-bold">
                                                <div className="w-5 h-5 rounded-full border border-[#00A326] flex items-center justify-center">
                                                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                                        <path d="M1 4L3.5 6.5L9 1" stroke="#00A326" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                                Smart Budget Master
                                            </div>
                                            <button className={`${theme.buttonBg} ${theme.buttonText} text-xs font-bold px-5 py-2 rounded-full`}>
                                                Quick transfer
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-end justify-between">
                                        <p className={`text-3xl font-bold ${theme.text}`}>
                                            £{Math.abs(chest.balance).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                        </p>
                                        <button className={`${theme.buttonBg} ${theme.buttonText} text-xs font-bold px-6 py-2 rounded-full hover:opacity-90 transition-opacity`}>
                                            View
                                        </button>
                                    </div>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* ===== SECTION 3: Your Achievements ===== */}
            <section className="mb-10">
                <h2 className="text-xl font-bold text-text-primary mb-6">Your achievements</h2>

                {/* Filter Tabs - First 4 filled purple #2F04B0, rest outline */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {[
                        { key: 'debt', label: `Debt (${debtCount})`, filled: true },
                        { key: 'incomplete', label: `Incomplete (${incompleteCount})`, filled: true },
                        { key: 'goals', label: `Goals (${goalsCount})`, filled: true },
                        { key: 'all', label: `All achievements (${allCount})`, filled: true },
                        { key: 'savings', label: `Savings (${savingsCount})`, filled: false },
                        { key: 'budgeting', label: `Budgeting (${budgetingCount})`, filled: false },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setAchievementFilter(tab.key)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${tab.filled
                                ? 'bg-[#2F04B0] text-white'
                                : 'bg-white text-[#2F04B0] border-2 border-[#2F04B0]'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Achievement Cards - 2x2 Grid Full Width */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {filteredAchievements.slice(0, 4).map((achievement) => {
                        const isCompleted = achievement.progress === 100;
                        return (
                            <div
                                key={achievement.id}
                                className={`rounded-[20px] p-6 relative ${isCompleted
                                    ? 'bg-[#E8F5E9] border-2 border-[#00A326]'
                                    : 'bg-white border-2 border-gray-200'
                                    }`}
                            >
                                {/* Header with Icon, Title, Description */}
                                <div className="flex items-start gap-4 mb-4">
                                    {/* Trophy Icon */}
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${isCompleted ? 'bg-[#00A326]/20' : 'bg-[#FFB602]/20'
                                        }`}>
                                        <Trophy className={`w-6 h-6 ${isCompleted ? 'text-[#00A326]' : 'text-[#FFB602]'}`} />
                                    </div>

                                    {/* Title and Description */}
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-1">
                                            <h3 className="font-bold text-text-primary">{achievement.title}</h3>
                                            <span className={`${difficultyColors[achievement.difficulty]} text-xs font-semibold px-3 py-1 rounded-full`}>
                                                {achievement.difficulty}
                                            </span>
                                        </div>
                                        <p className="text-sm text-text-secondary">{achievement.description}</p>

                                    </div>
                                </div>

                                {/* Reward Row - Full Width */}
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm">
                                        <span className="font-semibold text-[#00A326]">Reward:</span>{' '}
                                        <span className="text-text-primary font-medium">{achievement.reward}</span>
                                    </span>
                                    {achievement.completedDate && (
                                        <span className="text-sm text-text-secondary">{achievement.completedDate}</span>
                                    )}
                                    {!achievement.completedDate && (
                                        <span className="text-sm text-text-secondary">{achievement.progress}% done</span>
                                    )}
                                </div>

                                {/* Progress Bar - Full Width (for incomplete) */}
                                {!isCompleted && (
                                    <div className="w-full h-3 bg-gray-100 rounded-full mb-4 overflow-hidden">
                                        <div
                                            className="h-full bg-[#120048] rounded-full transition-all"
                                            style={{ width: `${achievement.progress}%` }}
                                        />
                                    </div>
                                )}

                                {/* Action Buttons - Full Width */}
                                <div className="flex justify-between gap-3 w-full">
                                    <button className="bg-[#2F04B0] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#240390] transition-all">
                                        {isCompleted ? 'Repeat challenge' : 'Continue'}
                                    </button>
                                    <button className="bg-white text-[#2F04B0] border-2 border-[#2F04B0] px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all">
                                        View tips
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom buttons */}
                <div className="flex justify-between gap-3 w-full">
                    <button className="bg-[#2F04B0] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#240390] transition-all">
                        Set a new challenge
                    </button>
                    <button className="bg-white text-[#2F04B0] border-2 border-[#2F04B0] px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all">
                        View progression
                    </button>
                </div>
            </section >

            {/* ===== SECTION 4: Treasure Tracker ===== */}
            < section className="mb-10" >
                <h2 className="text-xl font-bold text-[#120048] mb-6">Treasure tracker</h2>

                <div className="grid lg:grid-cols-[300px_1fr] gap-0 rounded-[20px] overflow-hidden">
                    {/* Filter Panel */}
                    <div className="bg-white p-6 border-r border-surface-divider">
                        {/* Filter Options */}
                        <div className="space-y-4">
                            {/* Month Filter */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Month</label>
                                <select
                                    value={trackerFilters.month}
                                    onChange={(e) => setTrackerFilters(prev => ({ ...prev, month: e.target.value }))}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                >
                                    {treasureTrackerFilters.months.map((month) => (
                                        <option key={month} value={month}>{month}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Year Filter */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Year</label>
                                <select
                                    value={trackerFilters.year}
                                    onChange={(e) => setTrackerFilters(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                >
                                    {treasureTrackerFilters.years.map((year) => (
                                        <option key={year} value={year}>{year}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Type Filter */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Data Type</label>
                                <div className="flex gap-2">
                                    {treasureTrackerFilters.types.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setTrackerFilters(prev => ({ ...prev, type }))}
                                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${trackerFilters.type === type
                                                ? 'bg-[#2F04B0] text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chart Type Filter */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wide mb-2 block">Chart Type</label>
                                <div className="flex gap-2">
                                    {treasureTrackerFilters.chartTypes.map((chartType) => (
                                        <button
                                            key={chartType}
                                            onClick={() => setTrackerFilters(prev => ({ ...prev, chartType }))}
                                            className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${trackerFilters.chartType === chartType
                                                ? 'bg-[#2F04B0] text-white'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chart Area */}
                    <div className="bg-[#120048] p-6 flex flex-col">
                        <h3 className="text-white font-bold text-lg mb-2">
                            {trackerFilters.type.charAt(0).toUpperCase() + trackerFilters.type.slice(1)} – {trackerFilters.month} {trackerFilters.year}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6">
                            A {trackerFilters.chartType} graph showing your {trackerFilters.type} trajectory for {trackerFilters.month} {trackerFilters.year}.
                        </p>

                        {/* Dynamic Chart */}
                        <div className="flex-1 min-h-[220px]">
                            {filteredTrackerData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    {trackerFilters.chartType === 'line' ? (
                                        <LineChart data={filteredTrackerData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                            <XAxis
                                                dataKey="week"
                                                stroke="#9CA3AF"
                                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                                axisLine={{ stroke: '#374151' }}
                                            />
                                            <YAxis
                                                stroke="#9CA3AF"
                                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                                axisLine={{ stroke: '#374151' }}
                                                tickFormatter={(value) => `£${(value / 1000).toFixed(1)}k`}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#1F2937',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: 'white'
                                                }}
                                                labelStyle={{ color: '#9CA3AF' }}
                                                formatter={(value) => value !== undefined ? [`£${value.toLocaleString()}`, trackerFilters.type] : ['', '']}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="value"
                                                stroke="white"
                                                strokeWidth={3}
                                                dot={{ fill: 'white', strokeWidth: 2, r: 4 }}
                                                activeDot={{ fill: 'white', strokeWidth: 2, r: 8, stroke: '#120048' }}
                                            />
                                        </LineChart>
                                    ) : (
                                        <BarChart data={filteredTrackerData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                            <XAxis
                                                dataKey="week"
                                                stroke="#9CA3AF"
                                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                                axisLine={{ stroke: '#374151' }}
                                            />
                                            <YAxis
                                                stroke="#9CA3AF"
                                                tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                                axisLine={{ stroke: '#374151' }}
                                                tickFormatter={(value) => `£${(value / 1000).toFixed(1)}k`}
                                            />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#1F2937',
                                                    border: 'none',
                                                    borderRadius: '8px',
                                                    color: 'white'
                                                }}
                                                labelStyle={{ color: '#9CA3AF' }}
                                                formatter={(value) => value !== undefined ? [`£${value.toLocaleString()}`, trackerFilters.type] : ['', '']}
                                            />
                                            <Bar
                                                dataKey="value"
                                                fill="white"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    )}
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <p>No data available for the selected filters. Try selecting a different month or year.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section >

            {/* ===== SECTION 5: Recent Money Casts & Upcoming Summons ===== */}
            < section className="mb-10" >
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Recent Money Casts */}
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-text-primary">Recent money casts</h2>
                            <button className="text-brand-primary text-sm font-medium hover:underline">view all</button>
                        </div>

                        <div className="bg-white rounded-[20px] border border-surface-divider overflow-hidden flex flex-col flex-1 justify-between">
                            {moneyCasts.map((cast, index) => (
                                <div
                                    key={cast.id}
                                    className={`flex items-center gap-4 px-4 h-[88px] ${index !== moneyCasts.length - 1 ? 'border-b border-surface-divider' : ''}`}
                                >
                                    {/* Avatar - with dark navy ring border like Figma */}
                                    <div className="w-11 h-11 rounded-full border-[3px] border-[#120048] flex items-center justify-center">
                                        <div
                                            className="w-full h-full rounded-full flex items-center justify-center text-lg"
                                            style={{ backgroundColor: cast.avatarBg }}
                                        >
                                            {cast.avatar}
                                        </div>
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
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-text-primary">Upcoming summons</h2>
                            <button className="text-brand-primary text-sm font-medium hover:underline">view all</button>
                        </div>

                        <div className="bg-white rounded-[20px] border border-surface-divider overflow-hidden flex flex-col flex-1 justify-between">
                            {upcomingSummons.map((summon, index) => (
                                <div
                                    key={summon.id}
                                    className={`flex items-center gap-4 px-4 h-[88px] ${index !== upcomingSummons.length - 1 ? 'border-b border-surface-divider' : ''}`}
                                >
                                    {/* Icon - Custom SVGs based on Figma */}
                                    {summon.name === 'Netflix' && (
                                        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M8 4V20H10.5L14.5 10V20H17V4H14.5L10.5 14V4H8Z" fill="#E50913" />
                                            </svg>
                                        </div>
                                    )}
                                    {summon.name === 'Spotify' && (
                                        <div className="w-10 h-10 bg-[#1DB954] rounded-xl flex items-center justify-center">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.5 16.5C16.3 16.8 15.9 16.9 15.6 16.7C13.3 15.3 10.4 15 7.1 15.7C6.7 15.8 6.4 15.5 6.3 15.2C6.2 14.8 6.5 14.5 6.8 14.4C10.5 13.6 13.7 14 16.3 15.5C16.6 15.7 16.7 16.2 16.5 16.5ZM17.7 13.8C17.4 14.2 16.9 14.3 16.5 14.1C13.9 12.5 10.1 12 6.8 12.9C6.3 13 5.9 12.8 5.7 12.3C5.6 11.8 5.8 11.4 6.3 11.2C10.1 10.2 14.4 10.8 17.4 12.6C17.8 12.9 17.9 13.4 17.7 13.8ZM17.8 11C14.7 9.2 9.4 9 6.4 10C5.8 10.2 5.2 9.8 5 9.2C4.8 8.6 5.2 8 5.8 7.8C9.3 6.7 15.2 7 18.7 9C19.2 9.3 19.4 9.9 19.1 10.4C18.8 10.9 18.3 11.1 17.8 11Z" fill="black" />
                                            </svg>
                                        </div>
                                    )}
                                    {summon.name === 'Water bill' && (
                                        <div className="w-10 h-10 bg-[#120048] rounded-xl flex items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <path d="M10 2C10 2 5 8 5 12C5 14.761 7.239 17 10 17C12.761 17 15 14.761 15 12C15 8 10 2 10 2Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                            </svg>
                                        </div>
                                    )}
                                    {summon.name === 'Pet bill' && (
                                        <div className="w-10 h-10 bg-[#2563EB] rounded-xl flex items-center justify-center">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                <circle cx="7" cy="5" r="2" fill="white" />
                                                <circle cx="13" cy="5" r="2" fill="white" />
                                                <circle cx="4" cy="10" r="2" fill="white" />
                                                <circle cx="16" cy="10" r="2" fill="white" />
                                                <path d="M10 18C12.5 18 14.5 16 14.5 13.5C14.5 11 12.5 9 10 9C7.5 9 5.5 11 5.5 13.5C5.5 16 7.5 18 10 18Z" fill="white" />
                                            </svg>
                                        </div>
                                    )}

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
            </section >

            {/* ===== SECTION 6: Treasure Pots Progress ===== */}
            < section className="mb-10" >
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-text-primary">Treasure pots progress</h2>
                    <button className="text-brand-primary text-sm font-medium hover:underline">manage</button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {treasurePots.map((pot) => {
                        const percentage = Math.round((pot.currentAmount / pot.goalAmount) * 100);

                        // Map icons based on pot name
                        let PotIcon = Trophy;
                        let iconBgColor = pot.color;

                        if (pot.name === 'New Car') PotIcon = Car;
                        else if (pot.name === 'Christmas') PotIcon = Trees;
                        else if (pot.name === 'Holiday') PotIcon = Palmtree; // Using Palmtree for Holiday
                        else if (pot.name === 'Rainy Day') PotIcon = CloudRain;

                        return (
                            <div
                                key={pot.id}
                                className="bg-white rounded-[20px] p-5 border border-surface-divider"
                            >
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm"
                                            style={{ backgroundColor: pot.color }}
                                        >
                                            <PotIcon className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="font-bold text-[#120048] text-lg">{pot.name}</span>
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

                                <p className="text-xl mb-4 mt-2">
                                    <span className="font-bold" style={{ color: pot.color }}>
                                        £{pot.currentAmount.toLocaleString('en-GB')}
                                    </span>
                                    <span className="text-gray-400 font-medium text-base"> / £{pot.goalAmount.toLocaleString('en-GB')}</span>
                                </p>

                                {/* Progress Bar */}
                                <div className="w-full h-3 bg-gray-100 rounded-full mb-6 overflow-hidden">
                                    <div
                                        className="h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${percentage}%`,
                                            backgroundColor: '#120048',
                                        }}
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-auto">
                                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-[#2F04B0] text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[#240390] transition-all">
                                        <CirclePlus className="w-4 h-4" strokeWidth={2.5} /> add money
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-1.5 bg-white text-[#2F04B0] text-sm font-bold border border-[#2F04B0] px-4 py-2 rounded-full hover:bg-gray-50 transition-all">
                                        <CircleMinus className="w-4 h-4" strokeWidth={2.5} /> take money
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section >

            {/* ===== SECTION 7: Partner Perks ===== */}
            <section className="mb-10">
                <h2 className="text-xl font-bold text-[#120048] mb-6">Partner perks</h2>

                <div className="grid lg:grid-cols-3 gap-4">
                    {/* Rounds-Ups Card */}
                    <div className="bg-surface-base rounded-[15px] border border-surface-divider p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#00A326] rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    RU
                                </div>
                                <div>
                                    <h3 className="font-semibold text-text-primary">Rounds-Ups</h3>
                                    <p className="text-xs text-text-secondary">Auto-save spare change</p>
                                </div>
                            </div>
                            <span className="px-4 py-1.5 bg-[#F5F7FA] text-[#120048] rounded-full text-sm font-bold">Available</span>
                        </div>

                        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                            Round every card purchase to the nearest pound and stash the difference towards your dream vault
                        </p>

                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-text-secondary">Estimated value this month</span>
                            <span className="text-sm font-medium text-text-primary">~£18 / mo</span>
                        </div>

                        <div className="flex gap-3 w-full">
                            <button className="flex-1 bg-[#00A326] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#00912A] transition-all">
                                Enable rounds-ups
                            </button>
                            <button className="flex-1 bg-white text-[#2F04B0] border border-[#2F04B0] px-4 py-2 rounded-full text-sm font-normal hover:bg-gray-50 transition-all">
                                Learn more
                            </button>
                        </div>
                    </div>

                    {/* Credit Insights Card */}
                    <div className="bg-surface-base rounded-[15px] border border-surface-divider p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#2F04B0] rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    CI
                                </div>
                                <div>
                                    <h3 className="font-semibold text-text-primary">Credit Insights</h3>
                                    <p className="text-xs text-text-secondary">Gentle credit coaching</p>
                                </div>
                            </div>
                            <span className="px-4 py-1.5 bg-[#F5F7FA] text-[#120048] rounded-full text-sm font-bold">Available</span>
                        </div>

                        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                            Track score trends and get tips like lowering utilisation and setting payment reminders to boost your rating.
                        </p>

                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-text-secondary">Estimated value this month</span>
                            <span className="text-sm font-medium text-[#00A326]">+£0 fees</span>
                        </div>

                        <div className="flex gap-3 w-full">
                            <button className="flex-1 bg-[#2F04B0] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#240390] transition-all">
                                Link credit report
                            </button>
                            <button className="flex-1 bg-white text-[#2F04B0] border border-[#2F04B0] px-4 py-2 rounded-full text-sm font-normal hover:bg-gray-50 transition-all">
                                Learn more
                            </button>
                        </div>
                    </div>

                    {/* Cashback Hub Card */}
                    <div className="bg-surface-base rounded-[15px] border border-surface-divider p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#7159B6] rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    CB
                                </div>
                                <div>
                                    <h3 className="font-semibold text-text-primary">Cashback Hub</h3>
                                    <p className="text-xs text-text-secondary">Personalised rewards</p>
                                </div>
                            </div>
                            <span className="px-4 py-1.5 bg-[#F5F7FA] text-[#120048] rounded-full text-sm font-bold">Available</span>
                        </div>

                        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                            Earn up to 5% back at supermarkets and streaming based on your recent categories.
                        </p>

                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-text-secondary">Estimated value this month</span>
                            <span className="text-sm font-medium text-text-primary">£8 -£22 / mo</span>
                        </div>

                        <div className="flex gap-3 w-full">
                            <button className="flex-1 bg-[#7159B6] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#5D48A0] transition-all">
                                See current offers
                            </button>
                            <button className="flex-1 bg-white text-[#2F04B0] border border-[#2F04B0] px-4 py-2 rounded-full text-sm font-normal hover:bg-gray-50 transition-all">
                                Learn more
                            </button>
                        </div>
                    </div>
                </div>
            </section >

            {/* ===== SECTION 8: FinWiz Boost Banner ===== */}
            < section className="mb-10" >
                <div className="bg-gradient-to-r from-[#7159B6] via-[#F2645D] to-[#FFB602] rounded-[15px] p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Sparkle Icon */}
                        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 3L13.5 8.5L19 10L13.5 11.5L12 17L10.5 11.5L5 10L10.5 8.5L12 3Z" fill="currentColor" />
                        </svg>

                        <p className="text-white text-base">
                            Tiny wins add up! Try rounds-ups + cashback for a passive <span className="font-bold text-[#120048]">boost</span>.
                        </p>
                    </div>

                    <button className="bg-white text-[#2F04B0] px-4 py-2 rounded-[12px] text-sm font-normal hover:bg-gray-100 transition-all whitespace-nowrap">
                        See how it works
                    </button>
                </div>
            </section >
        </div >
    );
}
