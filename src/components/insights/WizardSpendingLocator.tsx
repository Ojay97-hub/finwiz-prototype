'use client';

import { useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
    spendingLocations,
    spendingLocatorCategories,
    timePeriodOptions,
    spendingInsightsTemplates,
    SpendingLocation,
} from '@/data/mockData';

const SpendingMap = dynamic(() => import('@/components/insights/SpendingMap'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-slate-100 animate-pulse rounded-[2rem] flex items-center justify-center">
            <span className="text-slate-400">Loading Map...</span>
        </div>
    ),
});

type CategoryType = SpendingLocation['category'];

export default function WizardSpendingLocator() {
    // State for selected categories (multiple selection)
    const [selectedCategories, setSelectedCategories] = useState<Set<CategoryType>>(
        new Set(['Food & Drink'])
    );

    // State for selected time period
    const [selectedTimePeriod, setSelectedTimePeriod] = useState('30days');

    // Toggle category selection
    const toggleCategory = useCallback((category: CategoryType) => {
        setSelectedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(category)) {
                // Don't allow deselecting if it's the last one
                if (newSet.size > 1) {
                    newSet.delete(category);
                }
            } else {
                newSet.add(category);
            }
            return newSet;
        });
    }, []);

    // Select all categories
    const selectAllCategories = useCallback(() => {
        const allCategories = spendingLocatorCategories.map(c => c.name as CategoryType);
        setSelectedCategories(new Set(allCategories));
    }, []);

    // Check if all categories are selected
    const allSelected = selectedCategories.size === spendingLocatorCategories.length;

    // Get current time period days
    const currentTimePeriodDays = useMemo(() => {
        const period = timePeriodOptions.find(p => p.id === selectedTimePeriod);
        return period ? period.days : 30;
    }, [selectedTimePeriod]);

    // Filter spending locations based on selected categories and time period
    const filteredLocations = useMemo(() => {
        const now = new Date();
        const cutoffDate = new Date(now.getTime() - currentTimePeriodDays * 24 * 60 * 60 * 1000);

        return spendingLocations.filter(location => {
            const categoryMatch = selectedCategories.has(location.category);
            const dateMatch = location.date >= cutoffDate;
            return categoryMatch && dateMatch;
        });
    }, [selectedCategories, currentTimePeriodDays]);

    // Generate markers data for the map
    const markersData = useMemo(() => {
        // Aggregate by unique locations
        const locationMap = new Map<string, {
            id: string;
            pos: [number, number];
            icon: string;
            color: string;
            totalAmount: number;
            merchantName: string;
            category: CategoryType;
        }>();

        filteredLocations.forEach(loc => {
            const key = `${loc.lat}-${loc.lng}-${loc.merchantName}`;
            if (locationMap.has(key)) {
                const existing = locationMap.get(key)!;
                existing.totalAmount += loc.amount;
            } else {
                const categoryInfo = spendingLocatorCategories.find(c => c.name === loc.category);
                locationMap.set(key, {
                    id: loc.id,
                    pos: [loc.lat, loc.lng],
                    icon: loc.icon,
                    color: categoryInfo?.color || '#2F04B0',
                    totalAmount: loc.amount,
                    merchantName: loc.merchantName,
                    category: loc.category,
                });
            }
        });

        return Array.from(locationMap.values());
    }, [filteredLocations]);

    // Calculate top spending locations for the table
    const topLocations = useMemo(() => {
        // Group by merchant and area
        const merchantMap = new Map<string, {
            merchantName: string;
            areaName: string;
            totalAmount: number;
            category: CategoryType;
        }>();

        filteredLocations.forEach(loc => {
            const key = `${loc.merchantName}-${loc.areaName}`;
            if (merchantMap.has(key)) {
                const existing = merchantMap.get(key)!;
                existing.totalAmount += loc.amount;
            } else {
                merchantMap.set(key, {
                    merchantName: loc.merchantName,
                    areaName: loc.areaName,
                    totalAmount: loc.amount,
                    category: loc.category,
                });
            }
        });

        // Sort by total amount (show all, no limit)
        return Array.from(merchantMap.values())
            .sort((a, b) => b.totalAmount - a.totalAmount);
    }, [filteredLocations]);

    // Generate AI insight based on filtered data
    const aiInsight = useMemo(() => {
        if (filteredLocations.length === 0) {
            return {
                insight: "No spending data found for the selected filters.",
                tip: "Try expanding your time range or selecting more categories to see your spending patterns."
            };
        }

        // Find top area and merchant
        const areaSpending = new Map<string, number>();
        const merchantSpending = new Map<string, number>();
        const categorySpending = new Map<CategoryType, number>();

        filteredLocations.forEach(loc => {
            areaSpending.set(loc.areaName, (areaSpending.get(loc.areaName) || 0) + loc.amount);
            merchantSpending.set(loc.merchantName, (merchantSpending.get(loc.merchantName) || 0) + loc.amount);
            categorySpending.set(loc.category, (categorySpending.get(loc.category) || 0) + loc.amount);
        });

        const topArea = Array.from(areaSpending.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || 'various areas';
        const topMerchant = Array.from(merchantSpending.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || 'various merchants';
        const topCategory = Array.from(categorySpending.entries()).sort((a, b) => b[1] - a[1])[0]?.[0] || 'various categories';

        // Get template based on selected categories
        let template;
        if (selectedCategories.size === 1) {
            const category = Array.from(selectedCategories)[0];
            template = spendingInsightsTemplates[category] || spendingInsightsTemplates['all'];
        } else {
            template = spendingInsightsTemplates['all'];
        }

        // Replace placeholders
        let insight = template.insight
            .replace('{topArea}', topArea)
            .replace('{topMerchant}', topMerchant)
            .replace('{topCategory}', topCategory);

        return {
            insight,
            tip: template.tip
        };
    }, [filteredLocations, selectedCategories]);

    // Calculate total spending for current filter
    const totalSpending = useMemo(() => {
        return filteredLocations.reduce((sum, loc) => sum + loc.amount, 0);
    }, [filteredLocations]);

    return (
        <section className="mb-14">
            <h2 className="text-2xl font-bold text-[#2F04B0] mb-6 text-center">Wizard Spending Locator</h2>
            <div className="bg-white rounded-[2rem] p-8 border border-[#2F04B0]/40 min-h-[600px] flex flex-col shadow-sm">
                {/* 1. Header Filters */}
                <div className="flex flex-col lg:flex-row gap-6 justify-between items-start lg:items-center mb-6">
                    <div className="flex flex-col gap-3 w-full lg:w-auto">
                        <h3 className="font-bold text-text-primary text-lg">Filter by Category</h3>
                        <div className="flex flex-wrap gap-2">
                            {spendingLocatorCategories.map((category) => {
                                const isActive = selectedCategories.has(category.name as CategoryType);
                                return (
                                    <button
                                        key={category.id}
                                        onClick={() => toggleCategory(category.name as CategoryType)}
                                        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all border ${isActive
                                            ? 'bg-[#2F04B0] text-white border-[#2F04B0] shadow-md'
                                            : 'bg-white text-[#2F04B0] border-[#2F04B0] hover:bg-[#2F04B0]/5'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                );
                            })}
                            <button
                                onClick={selectAllCategories}
                                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${allSelected
                                    ? 'text-[#2F04B0]/50'
                                    : 'text-[#2F04B0] hover:bg-[#2F04B0]/5'
                                    }`}
                                disabled={allSelected}
                            >
                                Select all
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 w-full lg:w-auto">
                        <h3 className="font-bold text-text-primary text-lg lg:text-right">Time Period</h3>
                        <div className="flex bg-white rounded-xl border border-slate-200 overflow-hidden w-fit">
                            {timePeriodOptions.map((period) => (
                                <button
                                    key={period.id}
                                    onClick={() => setSelectedTimePeriod(period.id)}
                                    className={`px-4 py-2.5 text-xs font-semibold transition-all border-r border-slate-200 last:border-r-0 ${selectedTimePeriod === period.id
                                        ? 'bg-[#2F04B0] text-white'
                                        : 'bg-white text-text-muted hover:text-text-primary hover:bg-slate-50'
                                        }`}
                                >
                                    {period.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Spending Summary Badge */}
                <div className="mb-4 flex items-center gap-3">
                    <span className="text-sm text-text-muted">
                        Showing <strong className="text-[#2F04B0]">{filteredLocations.length}</strong> transactions
                    </span>
                    <span className="text-sm font-semibold text-[#120048] bg-slate-100 px-3 py-1 rounded-full">
                        Total: £{totalSpending.toFixed(2)}
                    </span>
                </div>

                {/* 2. Map Area */}
                <div className="flex-1 w-full relative min-h-[400px] mb-8 rounded-xl overflow-hidden border border-[#2F04B0]/20 shadow-inner">
                    <SpendingMap markers={markersData} />
                </div>

                {/* 3. Footer / Insights - Detached Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* FinWiz AI Insights Card */}
                    <div className="bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-[#120048] italic">FinWiz AI insights</h3>
                        </div>
                        <p className="text-text-secondary leading-relaxed mb-4 text-sm lg:text-base">
                            {aiInsight.insight}
                        </p>
                        <p className="text-text-secondary leading-relaxed text-sm lg:text-base opacity-80">
                            💡 {aiInsight.tip}
                        </p>
                    </div>

                    {/* Top Locations Card */}
                    <div className="lg:col-span-2 bg-white rounded-xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                        <div
                            className="overflow-x-auto max-h-[280px] overflow-y-auto subtle-scroll"
                            style={{
                                scrollbarWidth: 'thin',
                                scrollbarColor: 'rgba(47, 4, 176, 0.15) transparent'
                            }}
                        >
                            {topLocations.length > 0 ? (
                                <table className="w-full text-left border-collapse">
                                    <thead className="sticky top-0 bg-white">
                                        <tr className="border-b border-slate-200">
                                            <th className="py-3 text-base font-bold text-[#120048]">Location</th>
                                            <th className="py-3 text-base font-bold text-[#120048]">Store</th>
                                            <th className="py-3 text-base font-bold text-[#120048]">Type</th>
                                            <th className="py-3 text-base font-bold text-[#120048] text-right">Spend pcm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topLocations.map((item, i) => (
                                            <tr
                                                key={i}
                                                className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group cursor-default"
                                            >
                                                <td className="py-3 pl-2 text-sm text-[#120048] font-semibold">
                                                    {item.merchantName}
                                                </td>
                                                <td className="py-3 text-sm text-[#120048] font-semibold group-hover:text-[#2F04B0] transition-colors">
                                                    {item.areaName}
                                                </td>
                                                <td className="py-3">
                                                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#2F04B0]/10 text-[#2F04B0]">
                                                        {item.category}
                                                    </span>
                                                </td>
                                                <td className="py-3 text-right pr-2">
                                                    <span className="font-bold text-[#120048] text-sm bg-slate-100 px-3 py-1 rounded-full group-hover:bg-[#2F04B0] group-hover:text-white transition-colors">
                                                        £{Math.round(item.totalAmount)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="py-8 text-center text-text-muted">
                                    <p className="text-lg mb-2">No spending data found</p>
                                    <p className="text-sm opacity-70">Try adjusting your filters to see spending locations</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
