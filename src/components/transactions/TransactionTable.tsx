import { Transaction } from '@/data/mockData';

interface TransactionRowProps {
    transaction: Transaction;
}

export function TransactionRow({ transaction }: TransactionRowProps) {
    const formatCurrency = (amount: number) => {
        const formatted = new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP',
        }).format(Math.abs(amount));

        return amount >= 0 ? `+${formatted}` : `-${formatted}`;
    };

    const isPositive = transaction.amount >= 0;

    return (
        <div className="flex items-center justify-between py-4 border-b border-surface-divider/50 last:border-0 hover:bg-surface-base/50 transition-colors px-2 -mx-2 rounded-lg">
            <div className="flex items-center gap-4">
                {/* Icon */}
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ backgroundColor: transaction.iconBg }}
                >
                    {transaction.icon}
                </div>

                {/* Details */}
                <div>
                    <p className="font-medium text-text-primary">{transaction.merchant}</p>
                    <p className="text-sm text-text-secondary">{transaction.category}</p>
                </div>
            </div>

            {/* Amount & Date */}
            <div className="text-right">
                <p className={`font-semibold ${isPositive ? 'text-status-success' : 'text-text-primary'}`}>
                    {formatCurrency(transaction.amount)}
                </p>
                <p className="text-xs text-text-muted">{transaction.date}</p>
            </div>
        </div>
    );
}

interface TransactionTableProps {
    transactions: Transaction[];
    title?: string;
    showHeader?: boolean;
}

export default function TransactionTable({
    transactions,
    title = 'Recent Transactions',
    showHeader = true,
}: TransactionTableProps) {
    return (
        <div className="bg-surface-card rounded-2xl p-5 lg:p-6 shadow-card">
            {showHeader && (
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
                    <button className="text-sm text-brand-primary font-medium hover:underline">
                        See all
                    </button>
                </div>
            )}

            <div className="divide-y divide-surface-divider/50">
                {transactions.map((transaction) => (
                    <TransactionRow key={transaction.id} transaction={transaction} />
                ))}
            </div>

            {transactions.length === 0 && (
                <div className="py-8 text-center text-text-muted">
                    No transactions found
                </div>
            )}
        </div>
    );
}
