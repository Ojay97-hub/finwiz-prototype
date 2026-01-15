                                                                                                                     'use client';

import { useState } from 'react';
import {
    transactions,
    categories,
    incomeVsExpenses,
    balanceHistory,
    currentAccountData,
    savingsAccountData,
    creditCardData
} from '@/data/mockData';
import LineChart from '@/components/charts/LineChart';
import {
    Search,
    Download,
    ChevronDown,
    Plus,
    FileText,
    ArrowRightLeft,
    Split,
    Wallet,
    Shield,
    Star,
    Calendar,
    PiggyBank
} from 'lucide-react';
import TransactionIcon from '@/components/TransactionIcon';

export default function CurrentAccountPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeTab, setActiveTab] = useState('current-account');
    const [timeFilter, setTimeFilter] = useState('Yesterday');
    const [searchTerm, setSearchTerm] = useState('');
    const [showTips, setShowTips] = useState(true);
    const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

    const timeOptions = ['Yesterday', 'Today', 'Last 7 days', 'Last 30 days', 'This month', 'Last month'];

    // Color themes for each account type
    const accountThemes: Record<string, {
        bg: string;
        blob1: string;
        blob2: string;
        title: string;
        highlight: string;
        tabBg: string;
        tabText: string;
        secondaryBtnBg: string;
        secondaryBtnText: string;
        borderColor: string;
        primaryBtnBorder: string;
        primaryBtnText: string;
        primaryBtnHover: string;
    }> = {
        'current-account': {
            bg: 'bg-[#2F04B0]',
            blob1: 'bg-[#5C37EB]',
            blob2: 'bg-[#443376]',
            title: 'Current',
            highlight: 'Magic',
            tabBg: 'bg-[#2F04B0]',
            tabText: 'text-[#2F04B0]',
            secondaryBtnBg: 'bg-[#E1DEE9]',
            secondaryBtnText: 'text-[#2F04B0]',
            borderColor: '#2F04B0',
            primaryBtnBorder: 'border-white',
            primaryBtnText: 'text-white',
            primaryBtnHover: 'hover:bg-white/10',
        },
        'savings': {
            bg: 'bg-[#FFB602]',
            blob1: 'bg-[#FFD766]',
            blob2: 'bg-[#D99A00]',
            title: 'Dream',
            highlight: 'Vault',
            tabBg: 'bg-[#D99A00]',
            tabText: 'text-[#7A5600]',
            secondaryBtnBg: 'bg-white',
            secondaryBtnText: 'text-[#5A4200]',
            borderColor: '#FFB602',
            primaryBtnBorder: 'border-[#5A4200]',
            primaryBtnText: 'text-[#5A4200]',
            primaryBtnHover: 'hover:bg-[#5A4200]/10',
        },
        'credit-card': {
            bg: 'bg-[#F5B5B5]',
            blob1: 'bg-[#FFCFCF]',
            blob2: 'bg-[#E899A0]',
            title: 'Credit',
            highlight: 'Sorcery',
            tabBg: 'bg-[#C75050]',
            tabText: 'text-[#8B2E2E]',
            secondaryBtnBg: 'bg-white',
            secondaryBtnText: 'text-[#6B1E1E]',
            borderColor: '#F5B5B5',
            primaryBtnBorder: 'border-[#6B1E1E]',
            primaryBtnText: 'text-[#6B1E1E]',
            primaryBtnHover: 'hover:bg-[#6B1E1E]/10',
        },
    };

    const currentTheme = accountThemes[activeTab] || accountThemes['current-account'];

    // Get account-specific data based on active tab
    const getAccountData = () => {
        switch (activeTab) {
            case 'savings':
                return savingsAccountData;
            case 'credit-card':
                return creditCardData;
            default:
                return currentAccountData;
        }
    };

    const accountData = getAccountData();
    const currentBalance = Math.abs(accountData.balance);

    // Use account-specific transactions
    const accountTransactions = accountData.transactions;
    const filteredTransactions = accountTransactions.filter(t => {
        // 1. Text Search (Merchant or Category)
        const matchesSearch = t.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
            t.category.toLowerCase().includes(searchTerm.toLowerCase());

        // 2. Category Filter
        let matchesCategory = true;
        if (activeCategory === 'income') {
            matchesCategory = t.amount > 0;
        } else if (activeCategory === 'expense') {
            matchesCategory = t.amount < 0;
        } else if (activeCategory !== 'all') {
            matchesCategory = t.category.toLowerCase().includes(activeCategory.replace('-', ' '));
        }

        return matchesSearch && matchesCategory;
    });

    const chartData = accountData.balanceHistory.map(item => ({
        label: item.date,
        value: item.balance,
    }));

    const summaryPills = (() => {
        switch (activeTab) {
            case 'savings':
                return [
                    { text: 'Interest earned: £54.30 this month', color: '#00A326' },
                    { text: 'Holiday fund 80% complete!', color: '#FFB602' },
                    { text: 'Round-ups saved you £12.35', color: '#7159B6' },
                    { text: 'Auto-save active: £200/month', color: '#2F04B0' },
                ];
            case 'credit-card':
                return [
                    { text: 'Cashback earned: £127.50 YTD', color: '#7159B6' },
                    { text: 'Payment due in 10 days: £45', color: '#F2645D' },
                    { text: 'Available credit: £3,152.68', color: '#00A326' },
                    { text: '4,850 points ready to redeem', color: '#FFB602' },
                ];
            default:
                return [
                    { text: '7 duplicate incomes detected', color: '#2F04B0' },
                    { text: 'Food spend up 18% this week', color: '#F2645D' },
                    { text: 'Set fuel budget for February', color: '#FFB602' },
                    { text: 'Subscriptions now 32% of expenses', color: '#E50913' },
                ];
        }
    })();

    return (
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 lg:py-10">
            {/* Top Section */}
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mb-8">
                {/* Left Column - Current Magic */}
                <div>
                    {/* Mobile-only: Account Tabs ABOVE the card - CENTERED */}
                    <div className="sm:hidden mb-4 flex justify-center">
                        <div className="bg-white rounded-full p-1 inline-flex shadow-lg">
                            {[
                                { label: 'Current account', key: 'current-account' },
                                { label: 'Savings', key: 'savings' },
                                { label: 'Credit Card', key: 'credit-card' },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === tab.key
                                        ? `${currentTheme.tabBg} text-white shadow-sm`
                                        : `${currentTheme.tabText} hover:bg-gray-50`
                                        }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Current Magic Card */}
                    <div className={`${currentTheme.bg} rounded-[24px] p-6 lg:p-8 text-white relative overflow-hidden h-auto sm:h-[360px] flex flex-col justify-between shadow-xl transition-colors duration-300`}>
                        {/* Background blobs/gradients */}
                        <div className={`absolute top-0 right-0 w-[400px] h-[400px] ${currentTheme.blob1} rounded-full blur-[100px] opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none`}></div>
                        <div className={`absolute bottom-0 left-0 w-[300px] h-[300px] ${currentTheme.blob2} rounded-full blur-[80px] opacity-40 translate-y-1/3 -translate-x-1/3 pointer-events-none`}></div>

                        <div className="relative z-10 flex flex-col h-full">
                            {/* Top section - title and card number */}
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-xl font-medium tracking-wide ${activeTab === 'current-account' ? 'text-white' : 'text-gray-800'}`}>
                                    {currentTheme.title} <span className={`font-semibold ${activeTab === 'current-account' ? 'text-brand-dream' : activeTab === 'savings' ? 'text-[#7A5600]' : 'text-[#8B2E2E]'}`}>{currentTheme.highlight}</span>
                                </span>
                                <span className={`text-sm px-4 py-1.5 rounded-full backdrop-blur-sm font-medium tracking-wider ${activeTab === 'current-account' ? 'bg-white/10 text-white' : 'bg-black/10 text-gray-800'}`}>**** {accountData.cardNumber}</span>
                            </div>

                            {/* Center section - balance */}
                            <div className="flex-1 flex items-center py-6 sm:py-0">
                                <h1 className={`text-5xl lg:text-6xl font-bold ${activeTab === 'current-account' ? 'text-white' : 'text-gray-800'}`}>
                                    £{currentBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                </h1>
                            </div>

                            {/* Desktop: Action buttons - horizontal flex wrap */}
                            <div className="hidden sm:flex flex-wrap gap-4 mb-3">
                                <button className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-[15px] text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
                                    <Plus className="w-4 h-4" /> Add Money
                                </button>
                                <button className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-[15px] text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
                                    <FileText className="w-4 h-4" /> Send Money
                                </button>
                                <button className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-[15px] text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
                                    <ArrowRightLeft className="w-4 h-4" /> Transfer
                                </button>
                                <button className="flex items-center gap-2 bg-white text-gray-900 px-5 py-2.5 rounded-[15px] text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
                                    <Split className="w-4 h-4" /> Split
                                </button>
                            </div>

                            {/* Mobile: Action buttons - 2x2 grid with original styling */}
                            <div className="sm:hidden grid grid-cols-2 gap-3">
                                <button className="flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-3 rounded-[15px] text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
                                    <Plus className="w-4 h-4" /> Add Money
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-3 rounded-[15px] text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
                                    <FileText className="w-4 h-4" /> Send Money
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-3 rounded-[15px] text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
                                    <ArrowRightLeft className="w-4 h-4" /> Transfer
                                </button>
                                <button className="flex items-center justify-center gap-2 bg-white text-gray-900 px-4 py-3 rounded-[15px] text-sm font-semibold hover:bg-gray-50 transition-all shadow-sm">
                                    <Split className="w-4 h-4" /> Split
                                </button>
                            </div>

                            {/* Account Tabs - Desktop only (hidden on mobile) */}
                            <div className="hidden sm:inline-flex bg-white rounded-full p-1 max-w-fit shadow-lg">
                                {[
                                    { label: 'Current account', key: 'current-account' },
                                    { label: 'Savings', key: 'savings' },
                                    { label: 'Credit Card', key: 'credit-card' },
                                ].map((tab) => (
                                    <button
                                        key={tab.key}
                                        onClick={() => setActiveTab(tab.key)}
                                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${activeTab === tab.key
                                            ? `${currentTheme.tabBg} text-white shadow-sm`
                                            : `${currentTheme.tabText} hover:bg-gray-50`
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Insights & Tips */}
                <div className={`flex flex-col ${showTips ? 'sm:h-[360px]' : 'h-auto'}`}>
                    {/* Toggle Header */}
                    <div className="flex items-center justify-between mb-4 px-1 shrink-0">
                        <span className="text-base sm:text-lg font-bold text-[#120048]">FinWiz All Insights</span>
                        <label className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                            <div
                                className={`w-10 h-6 rounded-full relative transition-colors ${showTips ? 'bg-[#2F04B0]' : 'bg-gray-300'}`}
                                onClick={() => setShowTips(!showTips)}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showTips ? 'right-1' : 'left-1'}`} />
                            </div>
                            <span className="text-xs sm:text-sm font-medium text-[#120048]">
                                {showTips ? 'hide FinWiz tip' : 'show FinWiz tip'}
                            </span>
                        </label>
                    </div>

                    {/* Tips Content - Only render when showTips is true */}
                    {showTips && (
                        <div className="bg-white border border-gray-100 rounded-[32px] p-4 sm:p-8 flex flex-col flex-1 shadow-sm hover:shadow-md transition-shadow min-h-0">
                            <div className="text-[#120048] text-sm sm:text-base leading-relaxed space-y-3 sm:space-y-5 h-full flex flex-col justify-center overflow-y-auto">
                                {accountData.aiTips.map((tip, index) => (
                                    <p key={index} className="text-sm sm:text-base">• <strong>"{tip.title}"</strong> = {tip.description}</p>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Section - Recent Spells & Magic Ledger */}
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6">
                {/* Left Column - Recent Spells */}
                <div>
                    {/* Recent Spells Section */}
                    <div
                        className="bg-[#FCFCFD] rounded-[20px] py-6 shadow-sm relative overflow-hidden transition-colors duration-300"
                        style={{ border: `0.5px solid ${currentTheme.borderColor}` }}
                    >
                        <div
                            className="absolute top-0 left-0 right-0 h-[3px] z-20 transition-colors duration-300"
                            style={{ backgroundColor: currentTheme.borderColor }}
                        ></div>
                        {/* Purple accent border top/left is handled by border-brand-primary/10 but Figma shows specific 3px solid on top/left? 
                            Actually Figma CSS says: border-[3px_0.5px_0px] border-[var(--buttons\/primary,#2f04b0)]
                            Let's use a refined style.
                         */}


                        {/* Filter Section - Stacks vertically on mobile */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 sm:gap-4 mb-8 relative z-10 px-6">
                            {/* Filter by Category */}
                            <div className="flex flex-col gap-3">
                                <h2 className="text-base font-semibold text-text-primary">Filter by Category</h2>
                                <div className="flex flex-wrap gap-2">
                                    <button
                                        onClick={() => setActiveCategory('all')}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === 'all'
                                            ? activeTab === 'current-account' ? 'text-white' : 'text-gray-900'
                                            : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400'
                                            }`}
                                        style={activeCategory === 'all'
                                            ? { backgroundColor: currentTheme.borderColor }
                                            : {}}
                                    >
                                        all categories
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('income')}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === 'income'
                                            ? activeTab === 'current-account' ? 'text-white' : 'text-gray-900'
                                            : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400'
                                            }`}
                                        style={activeCategory === 'income'
                                            ? { backgroundColor: currentTheme.borderColor }
                                            : {}}
                                    >
                                        income
                                    </button>
                                    <button
                                        onClick={() => setActiveCategory('expense')}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeCategory === 'expense'
                                            ? activeTab === 'current-account' ? 'text-white' : 'text-gray-900'
                                            : 'bg-white text-gray-900 border-2 border-gray-300 hover:border-gray-400'
                                            }`}
                                        style={activeCategory === 'expense'
                                            ? { backgroundColor: currentTheme.borderColor }
                                            : {}}
                                    >
                                        expense
                                    </button>
                                </div>
                            </div>
                            {/* Time Period - Below category on mobile, right-aligned on desktop */}
                            <div className="flex flex-col gap-3 sm:items-end">
                                <h2 className="text-base font-semibold text-text-primary">Time Period</h2>
                                <div className="relative">
                                    <button
                                        onClick={() => setIsTimeDropdownOpen(!isTimeDropdownOpen)}
                                        className="flex items-center gap-2 px-5 py-2 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors bg-white cursor-pointer focus:outline-none focus:border-gray-500"
                                    >
                                        {timeFilter}
                                        <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isTimeDropdownOpen ? 'rotate-180' : ''}`} />
                                    </button>
                                    {isTimeDropdownOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsTimeDropdownOpen(false)}
                                            />
                                            <div className="absolute left-0 sm:left-auto sm:right-0 top-full mt-2 bg-white rounded-2xl shadow-lg border border-gray-200 py-2 min-w-[160px] z-50 overflow-hidden">
                                                {timeOptions.map((option) => (
                                                    <button
                                                        key={option}
                                                        onClick={() => {
                                                            setTimeFilter(option);
                                                            setIsTimeDropdownOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${timeFilter === option
                                                            ? 'bg-gray-100 text-gray-900'
                                                            : 'text-gray-700 hover:bg-gray-50'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="h-px w-auto mx-6 bg-brand-primary/20 mb-6"></div>

                        {/* Search and Action - Icon next to search on mobile, separate row on desktop */}
                        <div className="flex items-center gap-3 sm:flex-row sm:justify-between mb-8 relative z-10 px-6">
                            <div className="flex-1 relative sm:max-w-md">
                                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="search for a specific transaction..."
                                    className="w-full bg-white border border-gray-300 rounded-full py-3 pl-6 pr-12 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:border-gray-500 transition-colors hover:border-gray-400"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {/* Mobile: Icon only */}
                            <button className="sm:hidden flex items-center justify-center w-11 h-11 rounded-full border border-gray-300 text-gray-700 hover:border-gray-400 transition-colors shrink-0">
                                <Download className="w-5 h-5" />
                            </button>
                            {/* Desktop: Full button */}
                            <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-300 text-gray-700 text-sm font-medium hover:border-gray-400 transition-colors">
                                Download Statement <Download className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Transactions Table - Desktop view */}
                        <div className="relative z-10 hidden sm:block">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-text-primary">
                                        <th className="pb-6 px-6 font-semibold w-[35%]">Yesterday</th>
                                        <th className="pb-6 px-6 font-semibold w-[25%]">Type</th>
                                        <th className="pb-6 px-6 font-semibold w-[20%]">Time</th>
                                        <th className="pb-6 px-6 font-semibold text-right w-[20%]">+ £18,550.00</th>
                                    </tr>
                                </thead>
                                <tbody className="space-y-4">
                                    {filteredTransactions.slice(0, 10).map((t, index) => (
                                        <tr key={t.id} className="group hover:bg-surface-base/50 transition-colors">
                                            <td className="py-4 px-6 align-middle">
                                                <div className="flex items-center gap-3">
                                                    <TransactionIcon transaction={t} className="w-10 h-10 shrink-0" />
                                                    <span className="font-semibold text-text-primary text-base">{t.merchant}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-sm text-text-primary font-medium align-middle">{t.category}</td>
                                            <td className="py-4 px-6 text-sm text-text-primary font-medium align-middle">00:15am</td>
                                            <td className="py-4 px-6 align-middle text-right">
                                                <span className={`font-semibold text-base ${t.amount >= 0 ? 'text-status-success' : 'text-text-primary'}`}>
                                                    {t.amount >= 0 ? '+' : ''} £{Math.abs(t.amount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Transactions Table - Mobile view (3 columns: Name+Type, Time, Amount) */}
                        <div className="relative z-10 sm:hidden">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-sm text-text-primary">
                                        <th className="pb-4 px-4 font-semibold">Yesterday</th>
                                        <th className="pb-4 px-2 font-semibold text-center">Time</th>
                                        <th className="pb-4 px-4 font-semibold text-right">+ £18,550.00</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.slice(0, 10).map((t, index) => (
                                        <tr key={t.id} className="group hover:bg-surface-base/50 transition-colors">
                                            <td className="py-3 px-4 align-middle">
                                                <div className="flex items-center gap-2.5">
                                                    <TransactionIcon transaction={t} className="w-9 h-9 shrink-0" />
                                                    <div className="flex flex-col min-w-0">
                                                        <span className="font-semibold text-text-primary text-sm truncate">{t.merchant}</span>
                                                        <span className="text-xs text-text-secondary font-medium">{t.category}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-3 px-2 text-xs text-text-primary font-medium align-middle text-center whitespace-nowrap">00:15am</td>
                                            <td className="py-3 px-4 align-middle text-right">
                                                <span className={`font-semibold text-sm ${t.amount >= 0 ? 'text-status-success' : 'text-text-primary'}`}>
                                                    {t.amount >= 0 ? '+' : ''}£{Math.abs(t.amount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column - Magic Ledger */}
                <div className="flex flex-col justify-between">
                    {/* Your Magic Ledger */}
                    <div
                        className="bg-[#FCFCFD] rounded-[20px] p-6 relative overflow-hidden transition-colors duration-300"
                        style={{ border: `0.5px solid ${currentTheme.borderColor}` }}
                    >
                        <div
                            className="absolute top-0 left-0 right-0 h-[3px] z-20 transition-colors duration-300"
                            style={{ backgroundColor: currentTheme.borderColor }}
                        ></div>

                        <div className="flex flex-col">
                            <div className="mb-1">
                                <h3 className="font-semibold text-lg text-gray-700">Remaining Balance</h3>
                            </div>

                            <div className="relative mb-12">
                                <div className="flex items-center justify-between mb-2">
                                    <p className="text-4xl font-bold text-text-primary">£{currentBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</p>
                                </div>
                                <p className={`text-sm font-medium mb-6 ${accountData.balanceChange >= 0 ? 'text-status-success' : 'text-status-error'}`}>{accountData.balanceChange >= 0 ? '+' : ''}{accountData.balanceChange}% vs last month</p>

                                {/* Chart Area */}
                                <div className="h-32 w-full relative">
                                    <LineChart data={chartData} height={128} color="#6B7280" showArea={false} />
                                    {/* Custom labels mimicking Figma could be added here if chart supports it, otherwise rely on LineChart */}
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 font-medium mt-2">
                                    <span>Jun 1</span>
                                    <span>Jun 30</span>
                                </div>
                            </div>

                            <div className="h-px w-full bg-gray-300 mb-8"></div>

                            {/* Grid Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Primary stat card - context-aware */}
                                <div className="border border-gray-200 rounded-[20px] p-5 flex flex-col justify-between min-h-[140px] md:col-span-2 shadow-sm bg-white">
                                    <PiggyBank className="w-8 h-8 text-gray-600 mb-4" />
                                    <div>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {activeTab === 'credit-card'
                                                ? `£${(creditCardData.availableCredit).toLocaleString('en-GB', { minimumFractionDigits: 2 })}`
                                                : activeTab === 'savings'
                                                    ? `£${accountData.totalIncome.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`
                                                    : `£${currentAccountData.freeToSpend.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`
                                            }
                                        </p>
                                        <p className="text-base text-gray-600">
                                            {activeTab === 'credit-card' ? 'Available Credit' : activeTab === 'savings' ? 'Total Deposits' : 'Free to spend'}
                                        </p>
                                    </div>
                                </div>

                                {/* Bank Transfers / Deposits */}
                                <div className="border border-gray-200 rounded-[20px] p-5 flex flex-col justify-between min-h-[130px] shadow-sm bg-white">
                                    <PiggyBank className="w-6 h-6 text-gray-600 mb-3" />
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">{accountData.bankTransfers}</p>
                                        <p className="text-sm text-gray-600">
                                            {activeTab === 'credit-card' ? 'Transactions' : activeTab === 'savings' ? 'Deposits' : 'Bank Transfers'}
                                        </p>
                                    </div>
                                </div>

                                {/* Reserved / Interest */}
                                <div className="border border-gray-200 rounded-[20px] p-5 flex flex-col justify-between min-h-[130px] shadow-sm bg-white">
                                    <Shield className="w-6 h-6 text-gray-600 mb-3" />
                                    <div>
                                        <p className="text-xl font-bold text-gray-900">
                                            {activeTab === 'credit-card'
                                                ? `£${creditCardData.cashbackEarned.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`
                                                : `£${accountData.reserved.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`
                                            }
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {activeTab === 'credit-card' ? 'Cashback Earned' : activeTab === 'savings' ? 'Goal Reserved' : 'Reserved'}
                                        </p>
                                    </div>
                                </div>

                                {/* Top Category */}
                                <div className="border border-gray-200 rounded-[20px] p-5 flex flex-col justify-between min-h-[130px] shadow-sm bg-white">
                                    <Star className="w-6 h-6 text-gray-600 mb-3" />
                                    <div>
                                        <p className="text-base font-bold text-gray-900 mb-1">{accountData.topCategoryPercent}% - {accountData.topCategory}</p>
                                        <p className="text-sm text-gray-600">
                                            {activeTab === 'credit-card' ? 'Top Spend Category' : activeTab === 'savings' ? 'Top Growth Source' : 'Top Spending category'}
                                        </p>
                                    </div>
                                </div>

                                {/* Upcoming / Due */}
                                <div className="border border-gray-200 rounded-[20px] p-5 flex flex-col justify-between min-h-[130px] shadow-sm bg-white">
                                    <Calendar className="w-6 h-6 text-gray-600 mb-3" />
                                    <div>
                                        <p className="text-base font-bold text-gray-900 mb-1">
                                            {activeTab === 'credit-card'
                                                ? `£${creditCardData.minimumPayment} min payment`
                                                : `£${accountData.upcomingBill.amount.toLocaleString('en-GB', { minimumFractionDigits: 0 })} ${accountData.upcomingBill.name}`
                                            }
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            {activeTab === 'credit-card' ? `Due ${creditCardData.dueDate}` : `Due ${accountData.upcomingBill.dueIn}`}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Stats - outside ledger container */}
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-white rounded-[20px] p-6 lg:p-8 border-[0.5px] border-status-success relative overflow-hidden min-h-[130px]">
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-status-success z-20"></div>
                            <h4 className="text-base text-text-secondary mb-2">
                                {activeTab === 'credit-card' ? 'Payments Made' : 'Total Income'}
                            </h4>
                            <p className="text-lg lg:text-xl font-bold text-text-primary mb-2">
                                +£{(activeTab === 'credit-card' ? creditCardData.paymentsMade : accountData.totalIncome).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                            </p>
                            <span className="text-base font-medium text-status-success">
                                +{activeTab === 'credit-card' ? creditCardData.paymentChange : accountData.incomeChange}% vs last month
                            </span>
                        </div>
                        <div className="bg-white rounded-[20px] p-6 lg:p-8 border-[0.5px] border-status-error relative overflow-hidden min-h-[130px]">
                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-status-error z-20"></div>
                            <h4 className="text-base text-text-secondary mb-2">
                                {activeTab === 'credit-card' ? 'Total Spend' : 'Total Expenses'}
                            </h4>
                            <p className="text-lg lg:text-xl font-bold text-text-primary mb-2">
                                -£{(activeTab === 'credit-card' ? creditCardData.totalSpend : accountData.totalExpenses).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                            </p>
                            <span className={`text-base font-medium ${accountData.expenseChange <= 0 ? 'text-status-success' : 'text-status-error'}`}>
                                {activeTab === 'credit-card'
                                    ? `+${creditCardData.spendChange}% vs last month`
                                    : `${accountData.expenseChange}% vs last month`
                                }
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FinWiz Transactions Summary */}
            <section className="mb-24 sm:mb-0 mt-[46px]">
                <h2 className="text-lg font-semibold text-text-primary mb-4">FinWiz Transactions Summary</h2>
                <div className="relative">
                    <div className="w-full bg-gradient-to-r from-[#7159B6] via-[#F2645D] to-[#FFB602] rounded-[20px] px-4 sm:px-8 py-4 flex gap-4 sm:gap-6 overflow-x-auto items-stretch min-h-[80px] justify-start no-scrollbar">
                        {summaryPills.map((pill, i) => (
                            <div key={i} className="bg-white px-6 py-4 rounded-[12px] text-[#120048] text-sm font-semibold whitespace-nowrap shadow-sm w-[274px] min-w-[274px] shrink-0 flex items-center justify-center">
                                {pill.text}
                            </div>
                        ))}
                    </div>
                    {/* Floating wizard icon */}
                    <div className="absolute -right-2 -top-5 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 ring-4 ring-white overflow-hidden">
                        <img
                            src="/wizard-logo.png"
                            alt="FinWiz"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}

// Icon Components (Deleted internal icons in favor of Lucide)

