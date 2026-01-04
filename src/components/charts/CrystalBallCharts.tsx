'use client';

import {
    PieChart, Pie, Cell,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Legend, ReferenceLine
} from 'recharts';

// --- Colors ---
const COLORS = {
    background: '#120048',
    white: '#FFFFFF',
    textMuted: 'rgba(255, 255, 255, 0.6)',
    grid: 'rgba(255, 255, 255, 0.05)', // Even more subtle grid
    donut: ['#5F81FF', '#FFD466', '#FCBFBA', '#00A326'], // Blue, Yellow, Pink, Green
    topExpenses: {
        food: '#FFD466',
        travel: '#FFFFFF',
        rent: '#E50913' // Orange/Red from image
    },
    subscriptions: {
        netflix: '#E50913',
        spotify: '#10B981',
        icloud: '#C880E6',
        gym: '#FFD466',
        phone: '#FFFFFF'
    },
    forecast: {
        solid: '#FFFFFF',
        dashed: '#FFD466',
        dotted: '#FFD466'
    },
    comparison: {
        savings: '#C880E6',
        income: '#FFFFFF',
        expenses: '#FFD466'
    }
};

// --- Shared Components ---
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm text-[#120048] px-4 py-3 rounded-xl shadow-xl text-sm border border-white/20">
                <p className="font-semibold mb-2 text-xs uppercase tracking-wider text-gray-500">{label}</p>
                <div className="space-y-1">
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.stroke || entry.fill }} />
                            <p className="font-medium">
                                <span className="text-gray-600">{entry.name}:</span> <span className="text-[#120048]">£{entry.value}</span>
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

const CustomLegend = ({ items }: { items: { label: string; color: string }[] }) => (
    <div className="flex flex-wrap gap-4 mt-4 mb-2">
        {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs font-medium text-white">{item.label}</span>
            </div>
        ))}
    </div>
);

const ChartContainer = ({ title, children, subtitle, legendItems }: { title: string, subtitle?: string, children: React.ReactNode, legendItems?: { label: string; color: string }[] }) => (
    <div className="bg-[#120048] rounded-[2rem] p-8 text-white min-h-[340px] flex flex-col shadow-xl">
        <div className="mb-2">
            <h3 className="text-xl font-bold mb-1">{title}</h3>
            {subtitle && <p className="text-sm text-white/50 leading-relaxed">{subtitle}</p>}
        </div>
        {legendItems && <CustomLegend items={legendItems} />}
        <div className="flex-1 w-full min-h-[220px] mt-4">
            {children}
        </div>
    </div>
);

// --- 1. Spend by Category (Donut) ---
export const SpendByCategoryChart = () => {
    const data = [
        { name: 'Groceries', value: 31, color: '#5F81FF' }, // Blue
        { name: 'Entertainment', value: 15, color: '#FFD466' }, // Yellow
        { name: 'Utilities', value: 31, color: '#5F81FF' }, // Blue
        { name: 'Charity', value: 6, color: '#C880E6' }, // Purple
        { name: 'Friends & Family', value: 15, color: '#FCBFBA' }, // Pink
        { name: 'Fees', value: 2, color: '#00A326' }, // Green
    ];

    return (
        <ChartContainer title="Spend by category">
            <div className="flex items-center h-full gap-4">
                {/* Custom Legend */}
                <div className="w-5/12 space-y-4">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-6">
                        {data.map((item, i) => (
                            <div key={i} className="flex flex-col gap-1">
                                <span className="text-[10px] uppercase tracking-wider text-white/60">{item.name}</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold bg-white text-[#120048] px-1.5 rounded-md min-w-[32px] text-center" style={{ backgroundColor: item.color === '#FFFFFF' ? '#E2E8F0' : item.color === '#120048' ? '#FFFFFF' : '#FFFFFF', color: '#120048' }}>
                                        {item.value}%
                                    </span>
                                    <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
                                        <div className="h-full rounded-full" style={{ width: `${item.value}%`, backgroundColor: item.color }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chart */}
                <div className="w-7/12 h-[220px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={65}
                                outerRadius={85}
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </ChartContainer>
    );
};

// --- 2. Q1 Top Expenses (Multi Line) ---
export const TopExpensesChart = () => {
    const data = [
        { name: 'Jan', Food: 150, Travel: 450, Rent: 900 },
        { name: 'Feb', Food: 150, Travel: 750, Rent: 900 },
        { name: 'Mar', Food: 300, Travel: 650, Rent: 900 },
        { name: 'Apr', Food: 280, Travel: 700, Rent: 900 },
        { name: 'May', Food: 200, Travel: 550, Rent: 900 },
        { name: 'Jun', Food: 500, Travel: 450, Rent: 900 },
        { name: 'Jul', Food: 400, Travel: 420, Rent: 900 },
    ];

    const legendItems = [
        { label: 'Food', color: COLORS.topExpenses.food },
        { label: 'Rent', color: COLORS.topExpenses.rent },
        { label: 'Travel', color: COLORS.topExpenses.travel },
    ];

    return (
        <ChartContainer title="Q1 - Top expenses" legendItems={legendItems}>
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: COLORS.textMuted, fontSize: 11 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: COLORS.textMuted, fontSize: 11 }} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="Food" stroke={COLORS.topExpenses.food} strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="Travel" stroke={COLORS.topExpenses.travel} strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                    <Line type="monotone" dataKey="Rent" stroke={COLORS.topExpenses.rent} strokeWidth={3} dot={false} activeDot={{ r: 6, strokeWidth: 0 }} />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

// --- 3. Subscriptions (Horizontal Bar) ---
export const SubscriptionsChart = () => {
    const data = [
        { name: 'Netflix', value: 20, color: COLORS.subscriptions.netflix },
        { name: 'Spotify', value: 15, color: COLORS.subscriptions.spotify },
        { name: 'iCloud', value: 10, color: COLORS.subscriptions.icloud },
        { name: 'Gym', value: 80, color: COLORS.subscriptions.gym },
        { name: 'Phone', value: 55, color: COLORS.subscriptions.phone },
    ];

    return (
        <ChartContainer title="Subscriptions" subtitle="Your recurring monthly payments">
            <ResponsiveContainer width="100%" height={260}>
                <BarChart layout="vertical" data={data} barSize={32} margin={{ left: 0, right: 20, bottom: 20 }}>
                    <CartesianGrid stroke={COLORS.grid} horizontal={false} vertical={true} />
                    <XAxis type="number" hide />
                    <YAxis
                        type="category"
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        width={60}
                        tick={{ fill: 'white', fontSize: 12, fontWeight: 500 }}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-between px-[70px] text-xs text-white/40 mt-[-20px] font-mono">
                <span>£0</span><span>£20</span><span>£40</span><span>£60</span><span>£80</span><span>£100</span>
            </div>
        </ChartContainer>
    );
};

// --- 4. Spending Forecast (Line with Dashed) ---
export const SpendingForecastChart = () => {
    const data = [
        { name: 'Jan', current: 1600, projected: 1950 },
        { name: 'Feb', current: 2050, projected: 2300 },
        { name: 'Mar', current: 1850, projected: 2100 },
        { name: 'Apr', current: 2400, projected: 2600 },
        { name: 'May', current: 2000, projected: 2200 },
        { name: 'June', current: 2600, projected: 2750 },
        { name: 'July', current: null, projected: 2800 },
        { name: 'Aug', current: null, projected: 2850 },
    ];

    return (
        <ChartContainer title="Spending forecast" subtitle="Projection of expected spending based on your recent trends.">
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: COLORS.textMuted, fontSize: 11 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: COLORS.textMuted, fontSize: 11 }} />
                    <Tooltip content={<CustomTooltip />} />
                    {/* Dashed line for projection (drawn first as background) */}
                    <Line type="monotone" dataKey="projected" stroke={COLORS.forecast.dashed} strokeWidth={2} strokeDasharray="6 6" dot={{ r: 4, fill: COLORS.forecast.dashed, strokeWidth: 0 }} connectNulls activeDot={{ r: 6 }} />
                    {/* Solid line for historic data */}
                    <Line type="monotone" dataKey="current" stroke={COLORS.forecast.solid} strokeWidth={4} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

// --- 5. Savings vs Income vs Expenses (Grouped Bar) ---
export const SavingsComparisonChart = () => {
    const data = [
        { name: 'Jan', Savings: 800, Income: 3500, Expenses: 2200 },
        { name: 'Feb', Savings: 1200, Income: 3800, Expenses: 2400 },
        { name: 'Mar', Savings: 1500, Income: 4200, Expenses: 2600 },
    ];

    const legendItems = [
        { label: 'Expenses', color: COLORS.comparison.expenses },
        { label: 'Income', color: COLORS.comparison.income },
        { label: 'Savings', color: COLORS.comparison.savings },
    ];

    return (
        <ChartContainer title="Savings vs income vs expenses" subtitle="A bar graph that compares your savings vs income vs expenses to show your money" legendItems={legendItems}>
            <ResponsiveContainer width="100%" height={240}>
                <BarChart data={data} barGap={12} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid stroke={COLORS.grid} vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: COLORS.textMuted, fontSize: 11 }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: COLORS.textMuted, fontSize: 11 }} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                    <Bar dataKey="Savings" fill={COLORS.comparison.savings} radius={[4, 4, 0, 0]} maxBarSize={24} />
                    <Bar dataKey="Income" fill={COLORS.comparison.income} radius={[4, 4, 0, 0]} maxBarSize={24} />
                    <Bar dataKey="Expenses" fill={COLORS.comparison.expenses} radius={[4, 4, 0, 0]} maxBarSize={24} />
                </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};

// --- 6. Annual Expenses (Line Graph) ---
export const AnnualExpensesChart = () => {
    const data = [
        { name: 'Jan', value: 1200 },
        { name: 'Feb', value: 1900 },
        { name: 'Mar', value: 1300 },
        { name: 'Apr', value: 1950 },
        { name: 'May', value: 1600 },
        { name: 'June', value: 2400 },
        { name: 'July', value: 1800 },
        { name: 'Aug', value: 1200 },
        { name: 'Sept', value: 2000 },
        { name: 'Oct', value: 1400 },
        { name: 'Nov', value: 2100 },
        { name: 'Dec', value: 3000 },
    ];

    return (
        <ChartContainer title="Annual expenses line graph" subtitle="A line graph that shows your monthly spending over the last a year,">
            <ResponsiveContainer width="100%" height={240}>
                <LineChart data={data} margin={{ top: 20, right: 10, left: -10, bottom: 0 }}>
                    <CartesianGrid stroke={COLORS.grid} vertical={true} horizontal={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: COLORS.textMuted, fontSize: 11 }} interval={0} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: COLORS.textMuted, fontSize: 11 }} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                        type="monotone"
                        dataKey="value"
                        stroke={COLORS.white}
                        strokeWidth={3}
                        dot={false}
                        activeDot={{ r: 6, fill: COLORS.white, stroke: COLORS.background, strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
};
