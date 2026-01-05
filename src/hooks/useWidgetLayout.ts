'use client';

import { useState, useEffect, useCallback } from 'react';

export type ChartType = 'donut' | 'line' | 'bar' | 'horizontal-bar';

export interface Widget {
    id: string;
    name: string;
    visible: boolean;
    order: number;
    icon: string;
    chartType: ChartType;
}

export type LayoutMode = '2-col' | '3-col' | '1-col';
export type ChartTypeFilter = 'all' | ChartType;

interface WidgetLayoutState {
    widgets: Widget[];
    layoutMode: LayoutMode;
    chartTypeFilter: ChartTypeFilter;
}

const DEFAULT_WIDGETS: Widget[] = [
    { id: 'spend-by-category', name: 'Spend by Category', visible: true, order: 0, icon: '🍩', chartType: 'donut' },
    { id: 'top-expenses', name: 'Q1 - Top Expenses', visible: true, order: 1, icon: '📈', chartType: 'line' },
    { id: 'subscriptions', name: 'Subscriptions', visible: true, order: 2, icon: '📊', chartType: 'horizontal-bar' },
    { id: 'spending-forecast', name: 'Spending Forecast', visible: true, order: 3, icon: '🔮', chartType: 'line' },
    { id: 'savings-comparison', name: 'Savings vs Income vs Expenses', visible: true, order: 4, icon: '💰', chartType: 'bar' },
    { id: 'annual-expenses', name: 'Annual Expenses Line Graph', visible: true, order: 5, icon: '📉', chartType: 'line' },
];

export const CHART_TYPE_OPTIONS: { value: ChartTypeFilter; label: string; icon: string }[] = [
    { value: 'all', label: 'All cards', icon: '📊' },
    { value: 'donut', label: 'Donut Charts', icon: '🍩' },
    { value: 'line', label: 'Line Graphs', icon: '📈' },
    { value: 'bar', label: 'Bar Charts', icon: '📊' },
    { value: 'horizontal-bar', label: 'Horizontal Bars', icon: '📉' },
];

const DEFAULT_LAYOUT_MODE: LayoutMode = '2-col';
const DEFAULT_CHART_TYPE_FILTER: ChartTypeFilter = 'all';
const STORAGE_KEY = 'finwiz-widget-layout';

export function useWidgetLayout() {
    const [widgets, setWidgets] = useState<Widget[]>(DEFAULT_WIDGETS);
    const [layoutMode, setLayoutModeState] = useState<LayoutMode>(DEFAULT_LAYOUT_MODE);
    const [chartTypeFilter, setChartTypeFilterState] = useState<ChartTypeFilter>(DEFAULT_CHART_TYPE_FILTER);
    const [isInitialized, setIsInitialized] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                const parsed: WidgetLayoutState = JSON.parse(saved);
                // Merge saved widgets with default to include new chartType field
                const mergedWidgets = DEFAULT_WIDGETS.map(defaultWidget => {
                    const savedWidget = parsed.widgets.find(w => w.id === defaultWidget.id);
                    return savedWidget ? { ...defaultWidget, ...savedWidget, chartType: defaultWidget.chartType } : defaultWidget;
                });
                setWidgets(mergedWidgets);
                setLayoutModeState(parsed.layoutMode);
                setChartTypeFilterState(parsed.chartTypeFilter || DEFAULT_CHART_TYPE_FILTER);
            }
        } catch (e) {
            console.error('Failed to load widget layout from localStorage:', e);
        }
        setIsInitialized(true);
    }, []);

    // Save to localStorage when state changes
    useEffect(() => {
        if (isInitialized) {
            try {
                const state: WidgetLayoutState = { widgets, layoutMode, chartTypeFilter };
                localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
            } catch (e) {
                console.error('Failed to save widget layout to localStorage:', e);
            }
        }
    }, [widgets, layoutMode, chartTypeFilter, isInitialized]);

    const toggleWidgetVisibility = useCallback((id: string) => {
        setWidgets(prev =>
            prev.map(widget =>
                widget.id === id
                    ? { ...widget, visible: !widget.visible }
                    : widget
            )
        );
    }, []);

    const reorderWidgets = useCallback((startIndex: number, endIndex: number) => {
        setWidgets(prev => {
            const result = [...prev];
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);
            // Update order property
            return result.map((widget, index) => ({ ...widget, order: index }));
        });
    }, []);

    const setLayoutMode = useCallback((mode: LayoutMode) => {
        setLayoutModeState(mode);
    }, []);

    const setChartTypeFilter = useCallback((filter: ChartTypeFilter) => {
        setChartTypeFilterState(filter);
    }, []);

    const resetToDefault = useCallback(() => {
        setWidgets(DEFAULT_WIDGETS);
        setLayoutModeState(DEFAULT_LAYOUT_MODE);
        setChartTypeFilterState(DEFAULT_CHART_TYPE_FILTER);
    }, []);

    const getVisibleWidgets = useCallback(() => {
        return widgets
            .filter(w => w.visible)
            .filter(w => chartTypeFilter === 'all' || w.chartType === chartTypeFilter)
            .sort((a, b) => a.order - b.order);
    }, [widgets, chartTypeFilter]);

    const getGridClasses = useCallback(() => {
        switch (layoutMode) {
            case '1-col':
                return 'grid-cols-1';
            case '3-col':
                return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
            case '2-col':
            default:
                return 'grid-cols-1 md:grid-cols-2';
        }
    }, [layoutMode]);

    const getFilteredCount = useCallback(() => {
        const visibleCount = widgets.filter(w => w.visible).length;
        const filteredCount = getVisibleWidgets().length;
        return { visibleCount, filteredCount };
    }, [widgets, getVisibleWidgets]);

    return {
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
    };
}
