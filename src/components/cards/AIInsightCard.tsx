interface AIInsightCardProps {
    title: string;
    message: string;
    type: 'warning' | 'tip' | 'success';
    icon: string;
    onDismiss?: () => void;
}

export default function AIInsightCard({
    title,
    message,
    type,
    icon,
    onDismiss,
}: AIInsightCardProps) {
    const typeStyles = {
        warning: {
            bg: 'bg-status-warning/10',
            border: 'border-status-warning/30',
            iconBg: 'bg-status-warning/20',
            title: 'text-status-warning',
        },
        tip: {
            bg: 'bg-brand-primary/10',
            border: 'border-brand-primary/30',
            iconBg: 'bg-brand-primary/20',
            title: 'text-brand-primary',
        },
        success: {
            bg: 'bg-status-success/10',
            border: 'border-status-success/30',
            iconBg: 'bg-status-success/20',
            title: 'text-status-success',
        },
    };

    const styles = typeStyles[type];

    return (
        <div className={`${styles.bg} ${styles.border} border rounded-2xl p-4 lg:p-5 relative group`}>
            {onDismiss && (
                <button
                    onClick={onDismiss}
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/50 rounded-full"
                >
                    <CloseIcon className="w-4 h-4 text-text-secondary" />
                </button>
            )}

            <div className="flex gap-4">
                <div className={`${styles.iconBg} w-10 h-10 rounded-xl flex items-center justify-center shrink-0`}>
                    <span className="text-xl">{icon}</span>
                </div>
                <div>
                    <h4 className={`font-semibold ${styles.title} mb-1`}>{title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{message}</p>
                </div>
            </div>
        </div>
    );
}

function CloseIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}
