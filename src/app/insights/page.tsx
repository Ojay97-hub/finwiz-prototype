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
import ArcaneAllowances from '@/components/insights/ArcaneAllowances';
import CategorySpendComparison from '@/components/insights/CategorySpendComparison';
import MonthlyAllowanceOverview from '@/components/insights/MonthlyAllowanceOverview';
import WizardSpendingLocator from '@/components/insights/WizardSpendingLocator';

import dynamic from 'next/dynamic';



import FinWizAISummary from '@/components/insights/FinWizAISummary';

export default function InsightsPage() {

    return (
        <div className="p-8 max-w-[1400px] mx-auto min-h-screen">
            {/* Header / Top Section */}
            <TrendsHeader />



            {/* Section Controls */}
            <div className="flex items-center justify-between mb-8 mt-16">
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
            <FinWizAISummary />

            {/* Wizard Spending Locator - Redesigned */}
            <WizardSpendingLocator />

            {/* Arcane Allowances Section */}
            <ArcaneAllowances />

            {/* Monthly Comparison Spend by Category */}
            <CategorySpendComparison />

            {/* Q4 Monthly Allowance Overview */}
            <MonthlyAllowanceOverview />
        </div>
    );
}
