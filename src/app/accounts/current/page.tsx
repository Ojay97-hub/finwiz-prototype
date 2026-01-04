'use client';

import { useState } from 'react';
import { transactions, categories, incomeVsExpenses, balanceHistory } from '@/data/mockData';
import LineChart from '@/components/charts/LineChart';

export default function CurrentAccountPage() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [activeTab, setActiveTab] = useState('current');
    const [timeFilter, setTimeFilter] = useState('Yesterday');

    const currentBalance = 2260.00;

    const filteredTransactions = activeCategory === 'all'
        ? transactions
        : transactions.filter(t =>
            t.category.toLowerCase().includes(activeCategory.replace('-', ' '))
        );

    const chartData = balanceHistory.map(item => ({
        label: item.date,
        value: item.balance,
    }));

    const summaryPills = [
        { text: '7 days to pay day left', color: '#2F04B0' },
        { text: 'Feed spend is 10% ↑ vs wk', color: '#FFB602' },
        { text: 'Sex TotalExpn for February', color: '#F2645D' },
        { text: 'Subscription cap on 28% of income', color: '#E50913' },
    ];

    return (
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-6 lg:py-10">
            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-6 mb-8">
                {/* Left Column */}
                <div>
                    {/* Current Magic Card */}
                    <div className="bg-gradient-purple-1 rounded-3xl p-6 lg:p-8 text-white relative overflow-hidden mb-6">
                        <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-lg font-medium">Current <span className="text-brand-logo">Magic</span></span>
                                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">•••• 2456</span>
                            </div>

                            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                                £{currentBalance.toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                            </h1>

                            <div className="flex flex-wrap gap-2 mb-6">
                                <button className="flex items-center gap-2 bg-status-success text-white px-4 py-2 rounded-xl text-sm font-medium">
                                    <PlusIcon className="w-4 h-4" /> Add Money
                                </button>
                                <button className="flex items-center gap-2 bg-brand-primary border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium">
                                    <SaveIcon className="w-4 h-4" /> Save Money
                                </button>
                                <button className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium">
                                    <TransferIcon className="w-4 h-4" /> Transfer
                                </button>
                                <button className="flex items-center gap-2 bg-white/10 border border-white/30 text-white px-4 py-2 rounded-xl text-sm font-medium">
                                    <SplitIcon className="w-4 h-4" /> Split
                                </button>
                            </div>

                            {/* Account Tabs */}
                            <div className="flex gap-2">
                                {['Current account', 'Savings', 'Credit Card'].map((tab, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
                                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${i === 0 ? 'bg-brand-primary text-white' : 'bg-white/10 text-white/80 hover:bg-white/20'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Spells Section */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-divider">
                        <h2 className="text-lg font-semibold text-text-primary mb-4">Recent Spells</h2>

                        {/* Filters */}
                        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-text-secondary">Filter by Category</span>
                                <div className="flex gap-2">
                                    {[
                                        { id: 'income', name: 'income', color: '#00A326' },
                                        { id: 'all', name: 'all categories', color: '#2F04B0' },
                                        { id: 'daily', name: 'daily groceries', color: '#7159B6' },
                                        { id: 'expenses', name: 'expenses', color: '#E50913' },
                                    ].map((cat) => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setActiveCategory(cat.id)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${activeCategory === cat.id
                                                    ? 'text-white'
                                                    : 'bg-surface-base text-text-secondary hover:bg-surface-card-alt'
                                                }`}
                                            style={activeCategory === cat.id ? { backgroundColor: cat.color } : undefined}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-text-secondary">Time Period</span>
                                <select
                                    value={timeFilter}
                                    onChange={(e) => setTimeFilter(e.target.value)}
                                    className="px-3 py-1.5 rounded-lg border border-surface-divider text-sm"
                                >
                                    <option>Yesterday</option>
                                    <option>Last 7 days</option>
                                    <option>Last 30 days</option>
                                </select>
                            </div>
                        </div>

                        {/* Search */}
                        <div className="flex gap-3 mb-4">
                            <div className="flex-1 relative">
                                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                                <input
                                    type="text"
                                    placeholder="search for a specific transaction..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-surface-divider text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary/20"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-surface-divider text-sm text-text-secondary hover:bg-surface-base">
                                <DownloadIcon className="w-4 h-4" /> Download State...
                            </button>
                        </div>

                        {/* Transactions Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left text-xs text-text-muted border-b border-surface-divider">
                                        <th className="pb-3 font-medium">Yesterday</th>
                                        <th className="pb-3 font-medium">type</th>
                                        <th className="pb-3 font-medium">time</th>
                                        <th className="pb-3 font-medium text-right">amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTransactions.slice(0, 7).map((t, index) => (
                                        <tr key={t.id} className="border-b border-surface-divider/50 last:border-0">
                                            <td className="py-3">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
                                                        style={{ backgroundColor: t.iconBg }}
                                                    >
                                                        {t.icon}
                                                    </div>
                                                    <span className="font-medium text-text-primary">{t.merchant}</span>
                                                </div>
                                            </td>
                                            <td className="py-3 text-sm text-text-secondary">{t.category.toLowerCase()}</td>
                                            <td className="py-3 text-sm text-text-secondary">{t.time}</td>
                                            <td className={`py-3 text-right font-semibold ${t.amount >= 0 ? 'text-status-success' : 'text-text-primary'}`}>
                                                {t.amount >= 0 ? '+' : ''}£{Math.abs(t.amount).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column - Magic Ledger */}
                <div className="space-y-6">
                    {/* FinWiz AI Insights Toggle */}
                    <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-surface-divider">
                        <span className="font-medium text-text-primary">FinWiz All Insights</span>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <span className="text-sm text-text-secondary">hide</span>
                            <div className="w-12 h-6 bg-brand-primary rounded-full relative">
                                <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                            </div>
                            <span className="text-sm text-text-secondary">Filter tip</span>
                        </label>
                    </div>

                    {/* Tips */}
                    <div className="bg-surface-card-alt rounded-xl p-4 text-sm text-text-secondary space-y-2">
                        <p>• <strong>"Bundle & Save"</strong> = Combine smaller subscriptions into a unified plan; you'll spend less overall with more control of monthly cash flow.</p>
                        <p>• <strong>"Round-Up Magic"</strong> = Turn spare change into savings invisibly: each purchase is the nearest £; could build a £200+ buffer each year.</p>
                        <p>• <strong>"Debt buffer"</strong> = Pay down the highest-interest credit first; you'll free up money faster and avoid unnecessary interest.</p>
                    </div>

                    {/* Your Magic Ledger */}
                    <div className="bg-white rounded-2xl p-5 border border-surface-divider">
                        <h3 className="font-semibold text-text-primary mb-4">Your Magic Ledger</h3>

                        <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm text-text-secondary">remaining balance</span>
                                <span className="text-xs text-status-success">+9.01% vs last month</span>
                            </div>
                            <p className="text-3xl font-bold text-text-primary mb-4">£2,260.00</p>

                            {/* Mini Chart */}
                            <div className="h-24 bg-surface-base rounded-lg overflow-hidden">
                                <LineChart data={chartData} height={96} color="#2F04B0" showArea={true} />
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-surface-base rounded-xl p-3">
                                <p className="text-xs text-text-muted mb-1">£1250.00</p>
                                <p className="text-sm font-medium text-text-primary">Free credits</p>
                            </div>
                            <div className="bg-surface-base rounded-xl p-3">
                                <p className="text-xs text-text-muted mb-1">£500</p>
                                <p className="text-sm font-medium text-text-primary">SA</p>
                                <p className="text-xs text-text-muted">Bulk Transfer</p>
                            </div>
                            <div className="bg-surface-base rounded-xl p-3">
                                <p className="text-xs text-text-muted mb-1">☆</p>
                                <p className="text-sm font-medium text-text-primary">30% Cashback</p>
                                <p className="text-xs text-text-muted">for Spending categories</p>
                            </div>
                            <div className="bg-surface-base rounded-xl p-3 bg-gradient-to-br from-status-warning/20 to-transparent">
                                <p className="text-xs text-text-muted mb-1">★</p>
                                <p className="text-sm font-medium text-status-warning">#60 Deal</p>
                                <p className="text-xs text-text-muted">of all time rank+1</p>
                            </div>
                        </div>

                        {/* Income/Expenses */}
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-status-success/10 rounded-xl p-4 border border-status-success/30">
                                <p className="text-xs text-text-secondary mb-1">Total Income</p>
                                <p className="text-xl font-bold text-status-success">+£12,500.00</p>
                                <p className="text-xs text-status-success">+5% vs last month</p>
                            </div>
                            <div className="bg-status-error/10 rounded-xl p-4 border border-status-error/30">
                                <p className="text-xs text-text-secondary mb-1">Total Expenses</p>
                                <p className="text-xl font-bold text-status-error">-£4,740.00</p>
                                <p className="text-xs text-status-success">-5% vs last month</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FinWiz Transactions Summary */}
            <section className="mb-8 relative">
                <h2 className="text-lg font-semibold text-text-primary mb-4">FinWiz Transactions Summary</h2>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {summaryPills.map((pill, i) => (
                        <div
                            key={i}
                            className="px-6 py-3 rounded-full text-white text-sm font-medium whitespace-nowrap shadow-md"
                            style={{ backgroundColor: pill.color }}
                        >
                            {pill.text}
                        </div>
                    ))}
                </div>
                {/* Floating wizard icon */}
                <div className="absolute right-0 bottom-0 w-12 h-12 bg-gradient-orange-3 rounded-full flex items-center justify-center shadow-lg transform translate-y-1/2">
                    <span className="text-2xl">🧙</span>
                </div>
            </section>
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
        </svg>
    );
}

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function DownloadIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7,10 12,15 17,10" />
            <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
    );
}
