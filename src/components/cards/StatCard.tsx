interface StatCardProps {
    title: string;
    balance: number;
    subtitle?: string;
    variant?: 'primary' | 'secondary' | 'gradient';
    actions?: {
        label: string;
        icon?: React.ReactNode;
        onClick?: () => void;
    }[];
    alert?: {
        message: string;
        type: 'warning' | 'error' | 'info';
    };
}

export default function StatCard({
    title,
    balance,
    subtitle,
    variant = 'primary',
    actions,
    alert,
}: StatCardProps) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        }).format(amount);
    };

    const variants = {
        primary: 'bg-brand-secondary',
        secondary: 'bg-surface-card',
        gradient: 'bg-gradient-purple-1',
    };

    const textColors = {
        primary: 'text-text-inverse',
        secondary: 'text-text-primary',
        gradient: 'text-text-inverse',
    };

    return (
        <div className={`${variants[variant]} rounded-2xl p-6 lg:p-8 shadow-card relative overflow-hidden`}>
            {/* Background decoration */}
            <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full blur-xl" />

            <div className="relative z-10 flex flex-col gap-6 lg:gap-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className={`text-lg font-medium ${textColors[variant]}`}>
                            {title.split(' ')[0]} <span className="font-normal opacity-80">{title.split(' ').slice(1).join(' ')}</span>
                        </span>
                    </div>

                    {alert && (
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${alert.type === 'warning' ? 'bg-status-warning/20 text-status-warning' :
                                alert.type === 'error' ? 'bg-status-error/20 text-status-error' :
                                    'bg-brand-primary/20 text-brand-primary'
                            }`}>
                            <AlertIcon className="w-4 h-4" />
                            <span className="text-sm font-medium">{alert.message}</span>
                        </div>
                    )}
                </div>

                {/* Balance */}
                <div>
                    <p className={`text-4xl lg:text-6xl font-bold tracking-tight ${textColors[variant]}`}>
                        {formatCurrency(balance)}
                    </p>
                    {subtitle && (
                        <p className={`mt-2 text-sm ${variant === 'secondary' ? 'text-text-secondary' : 'text-text-muted'}`}>
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Actions */}
                {actions && actions.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                        {actions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.onClick}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${index === 0
                                        ? 'bg-brand-primary text-white hover:bg-brand-primary/90 shadow-lg shadow-brand-primary/30'
                                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/20'
                                    }`}
                            >
                                {action.icon}
                                {action.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function AlertIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
    );
}
