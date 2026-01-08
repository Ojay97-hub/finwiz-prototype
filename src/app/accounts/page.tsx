'use client';

import { useState, useMemo } from 'react';
import {
    totalCoins,
    finWizChests,
    achievements as initialAchievements,
    moneyCasts,
    upcomingSummons,
    treasurePots as initialTreasurePots,
    treasureTrackerData,
    treasureTrackerFilters,
    Achievement,
    TreasurePot,
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
    CheckCircle,
    RotateCcw,
    Lightbulb,
    Sparkles,
    TrendingUp,
    TrendingDown,
} from 'lucide-react';
import Link from 'next/link';

// Achievement tips for each achievement
const achievementTips: Record<string, string[]> = {
    '1': [
        'Focus on debts with the highest interest rates first',
        'Set up automatic payments to avoid late fees',
        'Consider balance transfer options for lower rates',
    ],
    '2': [
        'Start with small, achievable goals to build momentum',
        'Review your goals weekly to stay on track',
        'Celebrate each milestone to stay motivated',
    ],
    '3': [
        'Review your bank statements for recurring charges',
        'Check for free alternatives to paid services',
        'Negotiate lower rates with existing providers',
    ],
    '4': [
        'Use the 50/30/20 budgeting rule as a starting point',
        'Track every expense for a month to find patterns',
        'Set budget alerts at 75% and 90% spending',
    ],
    '5': [
        'Aim to save 3-6 months of living expenses',
        'Keep emergency funds in an accessible high-yield account',
        'Automate weekly transfers to build consistency',
    ],
    '6': [
        'Enable round-ups on all your daily purchases',
        'Consider rounding up to the nearest £5 for faster savings',
        'Watch your round-up balance grow daily!',
    ],
    '7': [
        'Plan meals and batch cook at the start of the week',
        'Find free activities and entertainment options',
        'Use what you already have before buying new',
    ],
    '8': [
        'Set up automatic daily transfers, even just £1',
        'Use the money you would have spent on coffee',
        'Track your streak visually to stay motivated',
    ],
};

export default function AccountsPage() {
    const [showTips, setShowTips] = useState(true);
    const [achievementFilter, setAchievementFilter] = useState<string>('all');

    // Achievement modal state
    const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
    const [localAchievements, setLocalAchievements] = useState<Achievement[]>(initialAchievements);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');

    // Treasure Tracker filter state
    const [trackerFilters, setTrackerFilters] = useState({
        month: 'Apr',
        year: 2025,
        type: 'income' as 'income' | 'expense',
        chartType: 'line' as 'line' | 'bar',
        timeRange: '1 month' as '1 month' | '3 months' | '6 months' | '12 months',
    });

    // Show toast notification
    const displayToast = (message: string) => {
        setToastMessage(message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    // Log progress for an achievement
    const handleLogProgress = (achievementId: string) => {
        setLocalAchievements(prev => prev.map(a => {
            if (a.id === achievementId && a.progress < 100) {
                const newProgress = Math.min(a.progress + 15, 100);
                const isNowComplete = newProgress === 100;

                if (isNowComplete) {
                    displayToast(`🎉 Congratulations! You completed "${a.title}"!`);
                } else {
                    displayToast(`✨ Progress logged! ${newProgress}% complete`);
                }

                return {
                    ...a,
                    progress: newProgress,
                    completedDate: isNowComplete ? 'Completed just now' : undefined,
                };
            }
            return a;
        }));

        // Update selected achievement if modal is open
        setSelectedAchievement(prev => {
            if (prev && prev.id === achievementId) {
                const updated = localAchievements.find(a => a.id === achievementId);
                if (updated && updated.progress < 100) {
                    const newProgress = Math.min(updated.progress + 15, 100);
                    return {
                        ...updated,
                        progress: newProgress,
                        completedDate: newProgress === 100 ? 'Completed just now' : undefined,
                    };
                }
            }
            return prev;
        });
    };

    // Restart a completed achievement
    const handleRestartChallenge = (achievementId: string) => {
        setLocalAchievements(prev => prev.map(a => {
            if (a.id === achievementId) {
                displayToast(`🔄 "${a.title}" has been restarted!`);
                return {
                    ...a,
                    progress: 0,
                    completedDate: undefined,
                };
            }
            return a;
        }));
        setSelectedAchievement(null);
    };

    // ===== TREASURE POTS STATE & HANDLERS =====
    const [localTreasurePots, setLocalTreasurePots] = useState<TreasurePot[]>(initialTreasurePots);
    const [selectedPot, setSelectedPot] = useState<TreasurePot | null>(null);
    const [potModalMode, setPotModalMode] = useState<'add' | 'take'>('add');
    const [potAmount, setPotAmount] = useState<string>('');

    // Quick amount options
    const quickAmounts = [10, 25, 50, 100, 250, 500];

    // Open pot modal
    const openPotModal = (pot: TreasurePot, mode: 'add' | 'take') => {
        setSelectedPot(pot);
        setPotModalMode(mode);
        setPotAmount('');
    };

    // Handle add money to pot
    const handleAddMoney = () => {
        const amount = parseFloat(potAmount);
        if (!selectedPot || isNaN(amount) || amount <= 0) return;

        setLocalTreasurePots(prev => prev.map(pot => {
            if (pot.id === selectedPot.id) {
                const newAmount = pot.currentAmount + amount;
                const percentage = Math.round((newAmount / pot.goalAmount) * 100);

                // Check for milestones
                const oldPercentage = Math.round((pot.currentAmount / pot.goalAmount) * 100);
                if (percentage >= 100 && oldPercentage < 100) {
                    displayToast(`🎉 Amazing! You've reached your ${pot.name} goal!`);
                } else if (percentage >= 75 && oldPercentage < 75) {
                    displayToast(`🌟 75% there! Your ${pot.name} pot is almost full!`);
                } else if (percentage >= 50 && oldPercentage < 50) {
                    displayToast(`✨ Halfway to your ${pot.name} goal!`);
                } else {
                    displayToast(`💰 £${amount.toFixed(2)} added to ${pot.name}!`);
                }

                return { ...pot, currentAmount: newAmount };
            }
            return pot;
        }));
        setSelectedPot(null);
        setPotAmount('');
    };

    // Handle take money from pot
    const handleTakeMoney = () => {
        const amount = parseFloat(potAmount);
        if (!selectedPot || isNaN(amount) || amount <= 0) return;

        if (amount > selectedPot.currentAmount) {
            displayToast(`⚠️ You only have £${selectedPot.currentAmount.toFixed(2)} in ${selectedPot.name}`);
            return;
        }

        setLocalTreasurePots(prev => prev.map(pot => {
            if (pot.id === selectedPot.id) {
                const newAmount = pot.currentAmount - amount;
                displayToast(`💸 £${amount.toFixed(2)} withdrawn from ${pot.name}`);
                return { ...pot, currentAmount: Math.max(0, newAmount) };
            }
            return pot;
        }));
        setSelectedPot(null);
        setPotAmount('');
    };

    // Calculate preview percentage for modal
    const getPreviewPercentage = () => {
        if (!selectedPot) return 0;
        const amount = parseFloat(potAmount) || 0;
        const newAmount = potModalMode === 'add'
            ? selectedPot.currentAmount + amount
            : Math.max(0, selectedPot.currentAmount - amount);
        return Math.min(100, Math.round((newAmount / selectedPot.goalAmount) * 100));
    };

    // ===== EXPANDABLE TABLES STATE =====
    const [castsExpanded, setCastsExpanded] = useState(false);
    const [summonsExpanded, setSummonsExpanded] = useState(false);
    const [selectedCast, setSelectedCast] = useState<typeof moneyCasts[0] | null>(null);
    const [selectedSummon, setSelectedSummon] = useState<typeof upcomingSummons[0] | null>(null);
    const [castSort, setCastSort] = useState<'date' | 'amount' | 'name'>('date');
    const [summonSort, setSummonSort] = useState<'date' | 'amount' | 'name'>('date');

    // Sort money casts
    const sortedCasts = useMemo(() => {
        const sorted = [...moneyCasts];
        if (castSort === 'amount') {
            sorted.sort((a, b) => b.amount - a.amount);
        } else if (castSort === 'name') {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
        return sorted;
    }, [castSort]);

    // Sort upcoming summons  
    const sortedSummons = useMemo(() => {
        const sorted = [...upcomingSummons];
        if (summonSort === 'amount') {
            sorted.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
        } else if (summonSort === 'name') {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        }
        return sorted;
    }, [summonSort]);

    // Get urgency color for summons
    const getUrgencyColor = (dateStr: string) => {
        if (dateStr === 'today') return '#E50913';
        if (dateStr === 'tomorrow' || dateStr.includes('2 days') || dateStr.includes('3 days')) return '#FFB602';
        return '#4F4769';
    };


    // Get filtered treasure tracker data
    const filteredTrackerData = useMemo(() => {
        // Helper to get month index
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return treasureTrackerData.filter((point) => {
            // Must match year and type
            if (point.year !== trackerFilters.year || point.type !== trackerFilters.type) return false;

            // Handle Month Logic based on Time Range
            const selectedMonthIndex = months.indexOf(trackerFilters.month);
            const pointMonthIndex = months.indexOf(point.month);

            if (trackerFilters.timeRange === '1 month') {
                return point.month === trackerFilters.month;
            } else if (trackerFilters.timeRange === '3 months') {
                // Show selected month and 2 next
                return pointMonthIndex >= selectedMonthIndex && pointMonthIndex < selectedMonthIndex + 3;
            } else if (trackerFilters.timeRange === '6 months') {
                // Show selected month and 5 next
                return pointMonthIndex >= selectedMonthIndex && pointMonthIndex < selectedMonthIndex + 6;
            } else if (trackerFilters.timeRange === '12 months') {
                // Show all months for the year
                return true;
            }
            return false;
        }).sort((a, b) => {
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const monthDiff = months.indexOf(a.month) - months.indexOf(b.month);
            if (monthDiff !== 0) return monthDiff;
            // Roughly sort weeks
            return a.week.localeCompare(b.week);
        }).map(p => ({
            ...p,
            xAxisLabel: trackerFilters.timeRange === '1 month' ? p.week : `${p.month} ${p.week}`
        }));
    }, [trackerFilters]);

    // Remove a filter (reset to default)
    const removeFilter = (filterKey: 'month' | 'year' | 'type' | 'chartType' | 'timeRange') => {
        setTrackerFilters((prev) => ({
            ...prev,
            [filterKey]: filterKey === 'month' ? 'Apr' : filterKey === 'year' ? 2025 : filterKey === 'type' ? 'income' : filterKey === 'timeRange' ? '1 month' : 'line',
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
    const debtCount = localAchievements.filter(a => a.category === 'debt').length;
    const incompleteCount = localAchievements.filter(a => a.progress < 100).length;
    const goalsCount = localAchievements.filter(a => a.category === 'goals').length;
    const allCount = localAchievements.length;
    const savingsCount = localAchievements.filter(a => a.category === 'savings').length;
    const budgetingCount = localAchievements.filter(a => a.category === 'budgeting').length;

    // Filter achievements
    const filteredAchievements = localAchievements.filter(a => {
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

                {/* Filter Tabs - Only active one is filled blue */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {[
                        { key: 'all', label: `All achievements (${allCount})` },
                        { key: 'incomplete', label: `Incomplete (${incompleteCount})` },
                        { key: 'goals', label: `Goals (${goalsCount})` },
                        { key: 'savings', label: `Savings (${savingsCount})` },
                        { key: 'budgeting', label: `Budgeting (${budgetingCount})` },
                        { key: 'debt', label: `Debt (${debtCount})` },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setAchievementFilter(tab.key)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${achievementFilter === tab.key
                                ? 'bg-[#2F04B0] text-white'
                                : 'bg-white text-[#2F04B0] border-2 border-[#2F04B0]'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Achievement Cards - Grid Full Width */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    {filteredAchievements.map((achievement) => {
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
                                <div className={`flex items-center justify-between ${isCompleted ? 'mb-6' : 'mb-3'}`}>
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
                                    <button
                                        onClick={() => setSelectedAchievement(achievement)}
                                        className="bg-[#2F04B0] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#240390] transition-all"
                                    >
                                        {isCompleted ? 'Repeat challenge' : 'Continue'}
                                    </button>
                                    <button
                                        onClick={() => setSelectedAchievement(achievement)}
                                        className="bg-white text-[#2F04B0] border-2 border-[#2F04B0] px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all"
                                    >
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
                    <div
                        className="bg-white p-6 flex flex-col relative z-10 border-2 border-[#2F04B0] rounded-l-[20px]"
                        style={{ boxShadow: '8px 0 20px -5px rgba(18, 0, 72, 0.3)' }}
                    >
                        {/* Summary Card at Top */}
                        <div className="bg-gradient-to-br from-[#2F04B0] to-[#120048] rounded-2xl p-5 mb-6 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                {trackerFilters.type === 'income' ? (
                                    <TrendingUp className="w-5 h-5" />
                                ) : (
                                    <TrendingDown className="w-5 h-5" />
                                )}
                                <span className="text-sm font-medium opacity-80">
                                    {trackerFilters.month} {trackerFilters.type}
                                </span>
                            </div>
                            <p className="text-2xl font-bold">
                                £{filteredTrackerData.length > 0
                                    ? filteredTrackerData.reduce((sum, d) => sum + d.value, 0).toLocaleString()
                                    : '0'}
                            </p>
                            <p className="text-xs opacity-60 mt-1">
                                Total for {filteredTrackerData.length} weeks
                            </p>
                        </div>

                        {/* Filter Options */}
                        <div className="space-y-5 flex-1">
                            {/* Time Period Group */}
                            <div className="bg-gray-50 rounded-xl p-4">
                                <label className="text-xs text-gray-500 uppercase tracking-wide mb-3 block font-semibold">
                                    📅 Time Period
                                </label>
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div>
                                        <span className="text-xs text-gray-400 mb-1 block">Month</span>
                                        <select
                                            value={trackerFilters.month}
                                            onChange={(e) => setTrackerFilters(prev => ({ ...prev, month: e.target.value }))}
                                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                        >
                                            {treasureTrackerFilters.months.map((month) => (
                                                <option key={month} value={month}>{month}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <span className="text-xs text-gray-400 mb-1 block">Year</span>
                                        <select
                                            value={trackerFilters.year}
                                            onChange={(e) => setTrackerFilters(prev => ({ ...prev, year: parseInt(e.target.value) }))}
                                            className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                        >
                                            {treasureTrackerFilters.years.map((year) => (
                                                <option key={year} value={year}>{year}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs text-gray-400 mb-1 block">Range</span>
                                    <select
                                        value={trackerFilters.timeRange}
                                        onChange={(e) => setTrackerFilters(prev => ({ ...prev, timeRange: e.target.value as any }))}
                                        className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary"
                                    >
                                        {treasureTrackerFilters.timeRanges.map((range) => (
                                            <option key={range} value={range}>{range}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Type Filter */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wide mb-3 block font-semibold">
                                    💰 Data Type
                                </label>
                                <div className="flex gap-2">
                                    {treasureTrackerFilters.types.map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setTrackerFilters(prev => ({ ...prev, type }))}
                                            className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${trackerFilters.type === type
                                                ? type === 'income'
                                                    ? 'bg-[#00A326] text-white shadow-lg shadow-[#00A326]/30'
                                                    : 'bg-[#E50913] text-white shadow-lg shadow-[#E50913]/30'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {type === 'income' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                                            {type.charAt(0).toUpperCase() + type.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Chart Type Filter */}
                            <div>
                                <label className="text-xs text-gray-500 uppercase tracking-wide mb-3 block font-semibold">
                                    📊 Chart Style
                                </label>
                                <div className="flex gap-2">
                                    {treasureTrackerFilters.chartTypes.map((chartType) => (
                                        <button
                                            key={chartType}
                                            onClick={() => setTrackerFilters(prev => ({ ...prev, chartType }))}
                                            className={`flex-1 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${trackerFilters.chartType === chartType
                                                ? 'bg-[#2F04B0] text-white shadow-lg shadow-[#2F04B0]/30'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                }`}
                                        >
                                            {chartType === 'line' ? '📈' : '📊'} {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Reset Filters */}
                        <button
                            onClick={() => setTrackerFilters({ month: 'Apr', year: 2025, type: 'income', chartType: 'line', timeRange: '1 month' })}
                            className="mt-4 text-sm text-gray-400 hover:text-[#2F04B0] transition-colors flex items-center justify-center gap-1"
                        >
                            <RotateCcw className="w-3 h-3" /> Reset filters
                        </button>
                    </div>

                    {/* Chart Area */}
                    <div className="bg-[#120048] p-6 flex flex-col">
                        <h3 className="text-white font-bold text-lg mb-2">
                            {trackerFilters.type.charAt(0).toUpperCase() + trackerFilters.type.slice(1)} – {trackerFilters.month} {trackerFilters.year}
                        </h3>
                        <p className="text-gray-400 text-base mb-6">
                            A {trackerFilters.chartType} graph showing your {trackerFilters.type} trajectory for {trackerFilters.month} {trackerFilters.year}.
                        </p>

                        {/* Dynamic Chart */}
                        <div className="flex-1 min-h-[320px]">
                            {filteredTrackerData.length > 0 ? (
                                <ResponsiveContainer width="100%" height="100%">
                                    {trackerFilters.chartType === 'line' ? (
                                        <LineChart data={filteredTrackerData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
                                            <XAxis
                                                dataKey="xAxisLabel"
                                                stroke="#9CA3AF"
                                                tick={{ fill: '#9CA3AF', fontSize: 14 }}
                                                axisLine={{ stroke: '#374151' }}
                                                interval={trackerFilters.timeRange === '1 month' ? 0 : trackerFilters.timeRange === '3 months' ? 1 : 3}
                                            />
                                            <YAxis
                                                stroke="#9CA3AF"
                                                tick={{ fill: '#9CA3AF', fontSize: 14 }}
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
                                                dataKey="xAxisLabel"
                                                stroke="#9CA3AF"
                                                tick={{ fill: '#9CA3AF', fontSize: 14 }}
                                                axisLine={{ stroke: '#374151' }}
                                                interval={trackerFilters.timeRange === '1 month' ? 0 : trackerFilters.timeRange === '3 months' ? 1 : 3}
                                            />
                                            <YAxis
                                                stroke="#9CA3AF"
                                                tick={{ fill: '#9CA3AF', fontSize: 14 }}
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
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-text-primary">Recent money casts</h2>
                            <button
                                onClick={() => setCastsExpanded(!castsExpanded)}
                                className="text-brand-primary text-sm font-medium hover:underline"
                            >
                                {castsExpanded ? 'collapse' : 'view all'}
                            </button>
                        </div>

                        {/* Sort buttons when expanded */}
                        {castsExpanded && (
                            <div className="flex gap-2 mb-3 animate-fadeIn">
                                <span className="text-xs text-gray-500 mr-2">Sort:</span>
                                {(['date', 'amount', 'name'] as const).map(sort => (
                                    <button
                                        key={sort}
                                        onClick={() => setCastSort(sort)}
                                        className={`text-xs px-3 py-1 rounded-full transition-all ${castSort === sort
                                            ? 'bg-[#2F04B0] text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {sort.charAt(0).toUpperCase() + sort.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className={`bg-white rounded-[20px] border border-surface-divider overflow-hidden transition-all duration-300 ${castsExpanded ? 'max-h-[800px]' : 'max-h-[360px]'}`}>
                            {(castsExpanded ? sortedCasts : sortedCasts.slice(0, 4)).map((cast, index, arr) => (
                                <div
                                    key={cast.id}
                                    onClick={() => setSelectedCast(cast)}
                                    className={`flex items-center gap-4 px-4 h-[88px] cursor-pointer hover:bg-gray-50 transition-colors ${index !== arr.length - 1 ? 'border-b border-surface-divider' : ''}`}
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

                        {/* Total when expanded */}
                        {castsExpanded && (
                            <div className="flex justify-between items-center mt-3 px-4 py-2 bg-[#00A326]/10 rounded-xl animate-fadeIn">
                                <span className="text-sm font-medium text-gray-600">Total received</span>
                                <span className="font-bold text-[#00A326]">+£{sortedCasts.reduce((acc, c) => acc + c.amount, 0).toFixed(2)}</span>
                            </div>
                        )}
                    </div>

                    {/* Upcoming Summons */}
                    <div className="flex flex-col">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-text-primary">Upcoming summons</h2>
                            <button
                                onClick={() => setSummonsExpanded(!summonsExpanded)}
                                className="text-brand-primary text-sm font-medium hover:underline"
                            >
                                {summonsExpanded ? 'collapse' : 'view all'}
                            </button>
                        </div>

                        {/* Sort buttons when expanded */}
                        {summonsExpanded && (
                            <div className="flex gap-2 mb-3 animate-fadeIn">
                                <span className="text-xs text-gray-500 mr-2">Sort:</span>
                                {(['date', 'amount', 'name'] as const).map(sort => (
                                    <button
                                        key={sort}
                                        onClick={() => setSummonSort(sort)}
                                        className={`text-xs px-3 py-1 rounded-full transition-all ${summonSort === sort
                                            ? 'bg-[#2F04B0] text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {sort.charAt(0).toUpperCase() + sort.slice(1)}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className={`bg-white rounded-[20px] border border-surface-divider overflow-hidden transition-all duration-300 ${summonsExpanded ? 'max-h-[800px]' : 'max-h-[360px]'}`}>
                            {(summonsExpanded ? sortedSummons : sortedSummons.slice(0, 4)).map((summon, index, arr) => (
                                <div
                                    key={summon.id}
                                    onClick={() => setSelectedSummon(summon)}
                                    className={`flex items-center gap-4 px-4 h-[88px] cursor-pointer hover:bg-gray-50 transition-colors ${index !== arr.length - 1 ? 'border-b border-surface-divider' : ''}`}
                                >
                                    {/* Icon - Dynamic based on summon */}
                                    <div
                                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-lg"
                                        style={{ backgroundColor: summon.iconBg }}
                                    >
                                        {summon.icon}
                                    </div>

                                    {/* Name & Category */}
                                    <div className="flex-1">
                                        <span className="font-semibold text-text-primary">{summon.name}</span>
                                        {summon.category && (
                                            <p className="text-xs text-text-secondary">{summon.category}</p>
                                        )}
                                    </div>

                                    {/* Date with urgency color */}
                                    <span
                                        className="text-sm font-medium px-2 py-0.5 rounded-full"
                                        style={{
                                            backgroundColor: `${getUrgencyColor(summon.date)}15`,
                                            color: getUrgencyColor(summon.date)
                                        }}
                                    >
                                        {summon.date}
                                    </span>

                                    {/* Amount */}
                                    <span className="font-semibold text-text-primary">-£{Math.abs(summon.amount)}</span>

                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </div>
                            ))}
                        </div>

                        {/* Total when expanded */}
                        {summonsExpanded && (
                            <div className="flex justify-between items-center mt-3 px-4 py-2 bg-[#E50913]/10 rounded-xl animate-fadeIn">
                                <span className="text-sm font-medium text-gray-600">Total upcoming</span>
                                <span className="font-bold text-[#E50913]">-£{sortedSummons.reduce((acc, s) => acc + Math.abs(s.amount), 0).toFixed(2)}</span>
                            </div>
                        )}
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
                    {localTreasurePots.map((pot) => {
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
                                    <button
                                        onClick={() => openPotModal(pot, 'add')}
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-[#2F04B0] text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[#240390] transition-all"
                                    >
                                        <CirclePlus className="w-4 h-4" strokeWidth={2.5} /> add money
                                    </button>
                                    <button
                                        onClick={() => openPotModal(pot, 'take')}
                                        className="flex-1 flex items-center justify-center gap-1.5 bg-white text-[#2F04B0] text-sm font-bold border border-[#2F04B0] px-4 py-2 rounded-full hover:bg-gray-50 transition-all"
                                    >
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

            {/* ===== Achievement Detail Modal ===== */}
            {selectedAchievement && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={() => setSelectedAchievement(null)}
                >
                    <div
                        className="bg-white rounded-[24px] p-8 max-w-lg w-full shadow-2xl animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-start justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${selectedAchievement.progress === 100 ? 'bg-[#00A326]/20' : 'bg-[#FFB602]/20'}`}>
                                    <Trophy className={`w-7 h-7 ${selectedAchievement.progress === 100 ? 'text-[#00A326]' : 'text-[#FFB602]'}`} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#120048]">{selectedAchievement.title}</h3>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${selectedAchievement.difficulty === 'Easy' ? 'bg-[#00A326] text-white' :
                                        selectedAchievement.difficulty === 'Medium' ? 'bg-[#FFB602] text-gray-900' :
                                            'bg-[#E50913] text-white'
                                        }`}>
                                        {selectedAchievement.difficulty}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedAchievement(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Description */}
                        <p className="text-gray-600 mb-6">{selectedAchievement.description}</p>

                        {/* Progress Section */}
                        <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-semibold text-[#120048]">Progress</span>
                                <span className={`text-lg font-bold ${selectedAchievement.progress === 100 ? 'text-[#00A326]' : 'text-[#2F04B0]'}`}>
                                    {selectedAchievement.progress}%
                                </span>
                            </div>
                            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${selectedAchievement.progress === 100 ? 'bg-[#00A326]' : 'bg-[#2F04B0]'}`}
                                    style={{ width: `${selectedAchievement.progress}%` }}
                                />
                            </div>
                            {selectedAchievement.completedDate && (
                                <p className="text-sm text-[#00A326] mt-2 flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4" /> {selectedAchievement.completedDate}
                                </p>
                            )}
                        </div>

                        {/* Reward */}
                        <div className="flex items-center gap-2 mb-6 p-4 bg-[#FFB602]/10 rounded-xl">
                            <Sparkles className="w-5 h-5 text-[#FFB602]" />
                            <span className="text-sm">
                                <span className="font-semibold text-[#00A326]">Reward:</span>{' '}
                                <span className="text-[#120048] font-medium">{selectedAchievement.reward}</span>
                            </span>
                        </div>

                        {/* Tips Section */}
                        <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Lightbulb className="w-5 h-5 text-[#FFB602]" />
                                <span className="font-semibold text-[#120048]">Tips to Complete</span>
                            </div>
                            <ul className="space-y-2">
                                {(achievementTips[selectedAchievement.id] || []).map((tip, index) => (
                                    <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                                        <span className="text-[#2F04B0] font-bold">•</span>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            {selectedAchievement.progress === 100 ? (
                                <>
                                    <button
                                        onClick={() => handleRestartChallenge(selectedAchievement.id)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#2F04B0] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#240390] transition-all"
                                    >
                                        <RotateCcw className="w-4 h-4" /> Restart Challenge
                                    </button>
                                    <button
                                        onClick={() => setSelectedAchievement(null)}
                                        className="flex-1 bg-white text-[#2F04B0] border-2 border-[#2F04B0] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all"
                                    >
                                        Close
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleLogProgress(selectedAchievement.id)}
                                        className="flex-1 flex items-center justify-center gap-2 bg-[#2F04B0] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#240390] transition-all"
                                    >
                                        <Plus className="w-4 h-4" /> Log Progress
                                    </button>
                                    <button
                                        onClick={() => setSelectedAchievement(null)}
                                        className="flex-1 bg-white text-[#2F04B0] border-2 border-[#2F04B0] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all"
                                    >
                                        Close
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* ===== Treasure Pot Modal ===== */}
            {selectedPot && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={() => setSelectedPot(null)}
                >
                    <div
                        className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                                    style={{ backgroundColor: selectedPot.color }}
                                >
                                    {selectedPot.name === 'New Car' && <Car className="w-7 h-7 text-white" />}
                                    {selectedPot.name === 'Christmas' && <Trees className="w-7 h-7 text-white" />}
                                    {selectedPot.name === 'Holiday' && <Palmtree className="w-7 h-7 text-white" />}
                                    {selectedPot.name === 'Rainy Day' && <CloudRain className="w-7 h-7 text-white" />}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#120048]">{selectedPot.name}</h3>
                                    <span className="text-sm text-gray-500">
                                        {potModalMode === 'add' ? 'Add money to your pot' : 'Withdraw from your pot'}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedPot(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Current Balance */}
                        <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-semibold text-[#120048]">Current Balance</span>
                                <span className="text-lg font-bold" style={{ color: selectedPot.color }}>
                                    £{selectedPot.currentAmount.toLocaleString('en-GB')}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                <span>Goal: £{selectedPot.goalAmount.toLocaleString('en-GB')}</span>
                                <span>{Math.round((selectedPot.currentAmount / selectedPot.goalAmount) * 100)}% saved</span>
                            </div>
                            {/* Progress Bar with Preview */}
                            <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden relative">
                                <div
                                    className="h-full rounded-full transition-all duration-300 bg-[#120048]"
                                    style={{ width: `${Math.round((selectedPot.currentAmount / selectedPot.goalAmount) * 100)}%` }}
                                />
                                {potAmount && parseFloat(potAmount) > 0 && (
                                    <div
                                        className={`absolute top-0 h-full rounded-full transition-all duration-300 ${potModalMode === 'add' ? 'bg-[#00A326]' : 'bg-[#E50913]'}`}
                                        style={{
                                            width: `${getPreviewPercentage()}%`,
                                            opacity: 0.5,
                                        }}
                                    />
                                )}
                            </div>
                            {potAmount && parseFloat(potAmount) > 0 && (
                                <p className="text-sm mt-2 text-center" style={{ color: potModalMode === 'add' ? '#00A326' : '#E50913' }}>
                                    After {potModalMode === 'add' ? 'adding' : 'withdrawing'}: {getPreviewPercentage()}% of goal
                                </p>
                            )}
                        </div>

                        {/* Amount Input */}
                        <div className="mb-6">
                            <label className="text-sm font-semibold text-[#120048] block mb-2">
                                Amount to {potModalMode === 'add' ? 'add' : 'withdraw'}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-gray-400">£</span>
                                <input
                                    type="number"
                                    value={potAmount}
                                    onChange={(e) => setPotAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full pl-10 pr-4 py-4 text-2xl font-bold text-[#120048] bg-gray-50 rounded-2xl border-2 border-gray-200 focus:border-[#2F04B0] focus:outline-none transition-colors"
                                />
                            </div>
                        </div>

                        {/* Quick Amount Buttons */}
                        <div className="mb-6">
                            <label className="text-sm font-semibold text-[#120048] block mb-2">Quick amounts</label>
                            <div className="grid grid-cols-3 gap-2">
                                {quickAmounts.map((amount) => (
                                    <button
                                        key={amount}
                                        onClick={() => setPotAmount(amount.toString())}
                                        className={`py-3 rounded-xl font-semibold text-sm transition-all ${potAmount === amount.toString()
                                            ? 'bg-[#2F04B0] text-white'
                                            : 'bg-gray-100 text-[#120048] hover:bg-gray-200'
                                            }`}
                                    >
                                        £{amount}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Warning for Take Money */}
                        {potModalMode === 'take' && parseFloat(potAmount) > selectedPot.currentAmount && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-600">
                                <span className="text-sm">⚠️ You can only withdraw up to £{selectedPot.currentAmount.toFixed(2)}</span>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                            <button
                                onClick={potModalMode === 'add' ? handleAddMoney : handleTakeMoney}
                                disabled={!potAmount || parseFloat(potAmount) <= 0 || (potModalMode === 'take' && parseFloat(potAmount) > selectedPot.currentAmount)}
                                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all ${potModalMode === 'add'
                                    ? 'bg-[#00A326] hover:bg-[#008A1F] text-white'
                                    : 'bg-[#E50913] hover:bg-[#C5080F] text-white'
                                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {potModalMode === 'add' ? (
                                    <><CirclePlus className="w-4 h-4" /> Add Money</>
                                ) : (
                                    <><CircleMinus className="w-4 h-4" /> Take Money</>
                                )}
                            </button>
                            <button
                                onClick={() => setSelectedPot(null)}
                                className="flex-1 bg-white text-[#2F04B0] border-2 border-[#2F04B0] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== Money Cast Detail Modal ===== */}
            {selectedCast && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={() => setSelectedCast(null)}
                >
                    <div
                        className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-full border-[3px] border-[#120048] flex items-center justify-center">
                                    <div
                                        className="w-full h-full rounded-full flex items-center justify-center text-2xl"
                                        style={{ backgroundColor: selectedCast.avatarBg }}
                                    >
                                        {selectedCast.avatar}
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#120048]">{selectedCast.name}</h3>
                                    <span className="text-sm text-gray-500">{selectedCast.description}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedCast(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Amount */}
                        <div className="bg-[#00A326]/10 rounded-2xl p-5 mb-6 text-center">
                            <span className="text-3xl font-bold text-[#00A326]">+£{selectedCast.amount.toFixed(2)}</span>
                            <p className="text-sm text-gray-500 mt-1">Received</p>
                        </div>

                        {/* Details */}
                        <div className="space-y-4">
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Date</span>
                                <span className="font-medium text-[#120048]">{selectedCast.date}</span>
                            </div>
                            {selectedCast.time && (
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Time</span>
                                    <span className="font-medium text-[#120048]">{selectedCast.time}</span>
                                </div>
                            )}
                            {selectedCast.method && (
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Payment method</span>
                                    <span className="font-medium text-[#120048]">{selectedCast.method}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-3">
                                <span className="text-gray-500">Transaction ID</span>
                                <span className="font-medium text-[#120048] text-sm">TXN-{selectedCast.id.padStart(6, '0')}</span>
                            </div>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedCast(null)}
                            className="w-full mt-6 bg-[#2F04B0] text-white py-3 rounded-full font-semibold hover:bg-[#240390] transition-all"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* ===== Upcoming Summon Detail Modal ===== */}
            {selectedSummon && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn"
                    onClick={() => setSelectedSummon(null)}
                >
                    <div
                        className="bg-white rounded-[24px] p-8 max-w-md w-full shadow-2xl animate-slideUp"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-4">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: selectedSummon.iconBg }}
                                >
                                    <span className="text-white">{selectedSummon.icon}</span>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#120048]">{selectedSummon.name}</h3>
                                    {selectedSummon.category && (
                                        <span className="text-sm text-gray-500">{selectedSummon.category}</span>
                                    )}
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedSummon(null)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Amount */}
                        <div className="bg-[#E50913]/10 rounded-2xl p-5 mb-6 text-center">
                            <span className="text-3xl font-bold text-[#E50913]">-£{Math.abs(selectedSummon.amount).toFixed(2)}</span>
                            <p className="text-sm text-gray-500 mt-1">Scheduled payment</p>
                        </div>

                        {/* Urgency Alert */}
                        {(selectedSummon.date === 'today' || selectedSummon.date === 'tomorrow') && (
                            <div
                                className="mb-6 p-3 rounded-xl flex items-center gap-2"
                                style={{
                                    backgroundColor: `${getUrgencyColor(selectedSummon.date)}15`,
                                    color: getUrgencyColor(selectedSummon.date)
                                }}
                            >
                                <Bell className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {selectedSummon.date === 'today' ? 'Payment due today!' : 'Payment due tomorrow'}
                                </span>
                            </div>
                        )}

                        {/* Details */}
                        <div className="space-y-4">
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Due date</span>
                                <span
                                    className="font-medium px-2 py-0.5 rounded-full"
                                    style={{
                                        backgroundColor: `${getUrgencyColor(selectedSummon.date)}15`,
                                        color: getUrgencyColor(selectedSummon.date)
                                    }}
                                >
                                    {selectedSummon.date}
                                </span>
                            </div>
                            {selectedSummon.recurring && (
                                <div className="flex justify-between py-3 border-b border-gray-100">
                                    <span className="text-gray-500">Recurring</span>
                                    <span className="font-medium text-[#00A326]">Monthly</span>
                                </div>
                            )}
                            <div className="flex justify-between py-3">
                                <span className="text-gray-500">Payment ID</span>
                                <span className="font-medium text-[#120048] text-sm">PAY-{selectedSummon.id.padStart(6, '0')}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => {
                                    displayToast(`✓ Marked ${selectedSummon.name} as paid`);
                                    setSelectedSummon(null);
                                }}
                                className="flex-1 bg-[#00A326] text-white py-3 rounded-full font-semibold hover:bg-[#008A1F] transition-all"
                            >
                                Mark as Paid
                            </button>
                            <button
                                onClick={() => setSelectedSummon(null)}
                                className="flex-1 bg-white text-[#2F04B0] border-2 border-[#2F04B0] py-3 rounded-full font-semibold hover:bg-gray-50 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ===== Toast Notification ===== */}
            {showToast && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#120048] text-white px-6 py-4 rounded-2xl shadow-2xl z-50 animate-slideUp flex items-center gap-3">
                    <span className="text-lg">{toastMessage}</span>
                </div>
            )}
        </div >
    );
}
