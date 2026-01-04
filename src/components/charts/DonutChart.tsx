'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DonutChartProps {
    data: {
        name: string;
        value: number;
        color: string;
    }[];
    title?: string;
    centerLabel?: string;
    centerValue?: string;
}

export default function DonutChart({
    data,
    title,
    centerLabel,
    centerValue,
}: DonutChartProps) {
    const total = data.reduce((sum, item) => sum + item.value, 0);

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

            <div className="relative">
                <ResponsiveContainer width="100%" height={280}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            stroke="none"
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            content={({ active, payload }) => {
                                if (active && payload && payload.length) {
                                    const item = payload[0].payload;
                                    return (
                                        <div className="bg-surface-dark text-text-inverse px-3 py-2 rounded-lg shadow-lg">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm">{formatCurrency(item.value)}</p>
                                        </div>
                                    );
                                }
                                return null;
                            }}
                        />
                    </PieChart>
                </ResponsiveContainer>

                {/* Center Label */}
                {(centerLabel || centerValue) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        {centerLabel && (
                            <span className="text-xs text-text-muted uppercase tracking-wide">{centerLabel}</span>
                        )}
                        {centerValue && (
                            <span className="text-2xl font-bold text-text-primary">{centerValue}</span>
                        )}
                    </div>
                )}
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 gap-3 mt-4">
                {data.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm text-text-secondary truncate">{item.name}</span>
                        <span className="text-sm font-medium text-text-primary ml-auto">
                            {((item.value / total) * 100).toFixed(0)}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
