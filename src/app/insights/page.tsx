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
import WidgetLayoutModal from '@/components/insights/WidgetLayoutModal';
import ChartTypeFilterDropdown from '@/components/insights/ChartTypeFilterDropdown';
import FinWizAISummary from '@/components/insights/FinWizAISummary';
import { useWidgetLayout } from '@/hooks/useWidgetLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';

// Widget component mapping
const widgetComponents: Record<string, React.ComponentType> = {
    'spend-by-category': SpendByCategoryChart,
    'top-expenses': TopExpensesChart,
    'subscriptions': SubscriptionsChart,
    'spending-forecast': SpendingForecastChart,
    'savings-comparison': SavingsComparisonChart,
    'annual-expenses': AnnualExpensesChart,
};

export default function InsightsPage() {
    const [isLayoutModalOpen, setIsLayoutModalOpen] = useState(false);
    const {
        widgets,
        layoutMode,
        chartTypeFilter,
        isInitialized,
        toggleWidgetVisibility,
        reorderWidgets,
        setLayoutMode,
        setChartTypeFilter,
        resetToDefault,
        getVisibleWidgets,
        getGridClasses,
        getFilteredCount,
    } = useWidgetLayout();

    const { visibleCount, filteredCount } = getFilteredCount();

    const visibleWidgets = getVisibleWidgets();

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
                <ChartTypeFilterDropdown
                    value={chartTypeFilter}
                    onChange={setChartTypeFilter}
                    filteredCount={filteredCount}
                    totalCount={visibleCount}
                />
                <motion.button
                    onClick={() => setIsLayoutModalOpen(true)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#5F81FF] text-[#5F81FF] text-sm font-semibold hover:bg-indigo-50 transition-colors bg-white group"
                >
                    <LayoutGrid className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    Widget Layout
                </motion.button>
            </div>

            {/* Dynamic Chart Grid */}
            {isInitialized && (
                <motion.div
                    layout
                    className={`grid ${getGridClasses()} gap-6 mb-12`}
                >
                    <AnimatePresence mode="popLayout">
                        {visibleWidgets.map((widget) => {
                            const WidgetComponent = widgetComponents[widget.id];
                            if (!WidgetComponent) return null;

                            return (
                                <motion.div
                                    key={widget.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 30,
                                        layout: { type: 'spring', stiffness: 300, damping: 30 }
                                    }}
                                >
                                    <WidgetComponent />
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>
            )}

            {/* Loading state */}
            {!isInitialized && (
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="bg-[#120048]/10 rounded-[2rem] h-[340px] animate-pulse"
                        />
                    ))}
                </div>
            )}

            {/* Empty state when all widgets hidden */}
            {isInitialized && visibleWidgets.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="py-20 text-center"
                >
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-[#120048]/10 flex items-center justify-center">
                        <LayoutGrid className="w-10 h-10 text-[#120048]/40" />
                    </div>
                    <h3 className="text-xl font-bold text-[#120048] mb-2">No widgets visible</h3>
                    <p className="text-[#4F4769] mb-6">Click "Widget Layout" to show some charts</p>
                    <button
                        onClick={() => setIsLayoutModalOpen(true)}
                        className="px-6 py-3 rounded-full bg-[#2F04B0] text-white font-semibold hover:bg-[#250390] transition-colors"
                    >
                        Configure Widgets
                    </button>
                </motion.div>
            )}

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

            {/* Widget Layout Modal */}
            <WidgetLayoutModal
                isOpen={isLayoutModalOpen}
                onClose={() => setIsLayoutModalOpen(false)}
                widgets={widgets}
                layoutMode={layoutMode}
                onToggleVisibility={toggleWidgetVisibility}
                onReorder={reorderWidgets}
                onSetLayoutMode={setLayoutMode}
                onReset={resetToDefault}
            />
        </div>
    );
}
