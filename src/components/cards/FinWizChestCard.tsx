'use client';

import { useEffect, useState } from 'react';

interface FinWizChestCardProps {
    name: string;
    icon: string;
    currentAmount: number;
    goalAmount: number;
    color: string;
    delay?: number;
}

export default function FinWizChestCard({
    name,
    icon,
    currentAmount,
    goalAmount,
    color,
    delay = 0,
}: FinWizChestCardProps) {
    const [animatedWidth, setAnimatedWidth] = useState(0);
    const percentage = Math.min((currentAmount / goalAmount) * 100, 100);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedWidth(percentage);
        }, delay);

        return () => clearTimeout(timer);
    }, [percentage, delay]);

    const isComplete = percentage >= 100;

    return (
        <div className="bg-surface-card rounded-2xl p-4 lg:p-5 shadow-card hover:shadow-lg transition-shadow group">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                        style={{ backgroundColor: `${color}20` }}
                    >
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-semibold text-text-primary">{name}</h3>
                        <p className="text-xs text-text-secondary">
                            {isComplete ? 'Goal reached! 🎉' : `${formatCurrency(goalAmount - currentAmount)} to go`}
                        </p>
                    </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-surface-base rounded-lg">
                    <MoreIcon className="w-4 h-4 text-text-muted" />
                </button>
            </div>

            {/* Progress Bar */}
            <div className="relative">
                <div className="h-2 bg-surface-base rounded-full overflow-hidden">
                    <div
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                            width: `${animatedWidth}%`,
                            backgroundColor: color,
                        }}
                    />
                </div>

                {/* Labels */}
                <div className="flex items-center justify-between mt-2">
                    <span className="text-sm font-medium text-text-primary">
                        {formatCurrency(currentAmount)}
                    </span>
                    <span className="text-xs text-text-muted font-medium">
                        {percentage.toFixed(0)}%
                    </span>
                    <span className="text-sm text-text-secondary">
                        {formatCurrency(goalAmount)}
                    </span>
                </div>
            </div>
        </div>
    );
}

function MoreIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <circle cx="12" cy="5" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="12" cy="19" r="2" />
        </svg>
    );
}
