'use client';

import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface BarChartProps {
    data: {
        label: string;
        value: number;
        color?: string;
    }[];
    title?: string;
    color?: string;
    height?: number;
    horizontal?: boolean;
}

export default function BarChart({
    data,
    title,
    color = '#2F04B0',
    height = 200,
}: BarChartProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="bg-surface-card rounded-2xl p-5 lg:p-6 shadow-card">
            {title && (
                <h3 className="text-lg font-semibold text-text-primary mb-4">{title}</h3>
            )}

            <ResponsiveContainer width="100%" height={height}>
                <RechartsBarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E3E6E9" vertical={false} />
                    <XAxis
                        dataKey="label"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#BDC2CA', fontSize: 12 }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#BDC2CA', fontSize: 12 }}
                        tickFormatter={(value) => `£${(value / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                        content={({ active, payload, label }) => {
                            if (active && payload && payload.length) {
                                return (
                                    <div className="bg-surface-dark text-text-inverse px-3 py-2 rounded-lg shadow-lg">
                                        <p className="text-xs text-text-muted">{label}</p>
                                        <p className="font-semibold">{formatCurrency(payload[0].value as number)}</p>
                                    </div>
                                );
                            }
                            return null;
                        }}
                        cursor={{ fill: 'rgba(47, 4, 176, 0.1)' }}
                    />
                    <Bar
                        dataKey="value"
                        radius={[6, 6, 0, 0]}
                        maxBarSize={40}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || color} />
                        ))}
                    </Bar>
                </RechartsBarChart>
            </ResponsiveContainer>
        </div>
    );
}

// Income vs Expenses comparison chart
interface IncomeExpenseChartProps {
    income: number;
    expenses: number;
    incomeChange?: number;
    expensesChange?: number;
}

export function IncomeExpenseChart({
    income,
    expenses,
    incomeChange,
    expensesChange,
}: IncomeExpenseChartProps) {
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="bg-surface-card rounded-2xl p-5 lg:p-6 shadow-card">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Income vs Expenses</h3>

            <div className="grid grid-cols-2 gap-6">
                {/* Income */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-status-success" />
                        <span className="text-sm text-text-secondary">Income</span>
                    </div>
                    <p className="text-2xl font-bold text-status-success">{formatCurrency(income)}</p>
                    {incomeChange !== undefined && (
                        <p className={`text-sm ${incomeChange >= 0 ? 'text-status-success' : 'text-status-error'}`}>
                            {incomeChange >= 0 ? '↑' : '↓'} {Math.abs(incomeChange)}% vs last month
                        </p>
                    )}
                </div>

                {/* Expenses */}
                <div className="space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-status-error" />
                        <span className="text-sm text-text-secondary">Expenses</span>
                    </div>
                    <p className="text-2xl font-bold text-text-primary">{formatCurrency(expenses)}</p>
                    {expensesChange !== undefined && (
                        <p className={`text-sm ${expensesChange <= 0 ? 'text-status-success' : 'text-status-error'}`}>
                            {expensesChange <= 0 ? '↓' : '↑'} {Math.abs(expensesChange)}% vs last month
                        </p>
                    )}
                </div>
            </div>

            {/* Visual Bar Comparison */}
            <div className="mt-6 space-y-3">
                <div className="space-y-1">
                    <div className="h-3 bg-surface-base rounded-full overflow-hidden">
                        <div
                            className="h-full bg-status-success rounded-full transition-all duration-500"
                            style={{ width: `${(income / (income + expenses)) * 100}%` }}
                        />
                    </div>
                </div>
                <div className="space-y-1">
                    <div className="h-3 bg-surface-base rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-red-2 rounded-full transition-all duration-500"
                            style={{ width: `${(expenses / (income + expenses)) * 100}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
