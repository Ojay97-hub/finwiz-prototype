'use client';

import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface LineChartProps {
    data: {
        label: string;
        value: number;
    }[];
    title?: string;
    color?: string;
    showArea?: boolean;
    height?: number;
}

export default function LineChart({
    data,
    title,
    color = '#2F04B0',
    showArea = true,
    height = 200,
}: LineChartProps) {
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
                {showArea ? (
                    <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                                <stop offset="95%" stopColor={color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
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
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorValue)"
                        />
                    </AreaChart>
                ) : (
                    <RechartsLineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={color}
                            strokeWidth={2}
                            dot={{ fill: color, strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: color }}
                        />
                    </RechartsLineChart>
                )}
            </ResponsiveContainer>
        </div>
    );
}
