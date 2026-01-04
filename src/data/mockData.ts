// FinWiz Mock Data Layer
// All numerical values, names, and transaction lists from the Figma designs

export interface Transaction {
    id: string;
    merchant: string;
    category: string;
    amount: number;
    date: string;
    time: string;
    icon: string;
    iconBg: string;
}

export interface TreasurePot {
    id: string;
    name: string;
    icon: string;
    currentAmount: number;
    goalAmount: number;
    color: string;
}

export interface AccountCard {
    id: string;
    name: string;
    balance: number;
    icon: string;
    type: 'checking' | 'savings' | 'credit';
}

export interface SpendingCategory {
    name: string;
    amount: number;
    percentage: number;
    color: string;
}

export interface PartnerPerk {
    id: string;
    brand: string;
    description: string;
    icon: string;
    iconBg: string;
    cashback: string;
}

// ========== ACCOUNT DATA ==========
export const totalBalance = 28350.88;

export const accountCards: AccountCard[] = [
    { id: '1', name: 'Current Account', balance: 12450.32, icon: '💳', type: 'checking' },
    { id: '2', name: 'Savings Account', balance: 8350.00, icon: '🏦', type: 'savings' },
    { id: '3', name: 'Credit Card', balance: -1200.44, icon: '💎', type: 'credit' },
];

export const quickAccessCards = [
    { id: '1', name: 'Salary', amount: 4500.00, icon: '💰', date: '28th of every month' },
    { id: '2', name: 'Current Account', balance: 12450.32, icon: '💳', lastFour: '6738' },
    { id: '3', name: 'Credit Card', balance: -1200.44, icon: '💎', limit: 5000 },
];

// ========== TREASURE POTS (FINWIZ CHESTS) ==========
export const treasurePots: TreasurePot[] = [
    { id: '1', name: 'Holiday Fund', icon: '🏖️', currentAmount: 2400, goalAmount: 3000, color: '#FFB602' },
    { id: '2', name: 'Emergency', icon: '🚨', currentAmount: 5000, goalAmount: 5000, color: '#00A326' },
    { id: '3', name: 'New Car', icon: '🚗', currentAmount: 8500, goalAmount: 15000, color: '#7159B6' },
    { id: '4', name: 'Christmas', icon: '🎄', currentAmount: 350, goalAmount: 1000, color: '#F2645D' },
];

// ========== TRANSACTIONS ==========
export const transactions: Transaction[] = [
    { id: '1', merchant: 'Spotify', category: 'Subscriptions', amount: -9.99, date: '2 Jan 2026', time: '09:15', icon: '🎵', iconBg: '#10B981' },
    { id: '2', merchant: 'Tesco', category: 'Groceries', amount: -67.42, date: '2 Jan 2026', time: '14:30', icon: '🛒', iconBg: '#2F04B0' },
    { id: '3', merchant: 'Netflix', category: 'Subscriptions', amount: -15.99, date: '1 Jan 2026', time: '00:01', icon: '🎬', iconBg: '#E50913' },
    { id: '4', merchant: 'Amazon', category: 'Shopping', amount: -124.50, date: '31 Dec 2025', time: '16:45', icon: '📦', iconBg: '#FF9900' },
    { id: '5', merchant: 'Salary Deposit', category: 'Income', amount: 4500.00, date: '28 Dec 2025', time: '00:00', icon: '💰', iconBg: '#00A326' },
    { id: '6', merchant: 'British Gas', category: 'Bills', amount: -89.00, date: '27 Dec 2025', time: '08:00', icon: '🔥', iconBg: '#7167BF' },
    { id: '7', merchant: 'Costa Coffee', category: 'Food & Drink', amount: -4.20, date: '26 Dec 2025', time: '11:22', icon: '☕', iconBg: '#8F6AFB' },
    { id: '8', merchant: 'Transport for London', category: 'Transport', amount: -156.00, date: '25 Dec 2025', time: '07:00', icon: '🚇', iconBg: '#3008A3' },
    { id: '9', merchant: 'IKEA', category: 'Shopping', amount: -215.99, date: '24 Dec 2025', time: '13:45', icon: '🛋️', iconBg: '#0D5BAB' },
    { id: '10', merchant: 'Revolut Transfer', category: 'Transfer', amount: -500.00, date: '23 Dec 2025', time: '18:30', icon: '🔄', iconBg: '#374151' },
];

// ========== CATEGORIES FOR FILTERING ==========
export const categories = [
    { id: 'all', name: 'All', color: '#2F04B0' },
    { id: 'income', name: 'Income', color: '#00A326' },
    { id: 'shopping', name: 'Shopping', color: '#8F6AFB' },
    { id: 'bills', name: 'Bills', color: '#7167BF' },
    { id: 'subscriptions', name: 'Subscriptions', color: '#E50913' },
    { id: 'transport', name: 'Transport', color: '#3008A3' },
    { id: 'groceries', name: 'Groceries', color: '#2F04B0' },
    { id: 'food-drink', name: 'Food & Drink', color: '#FFB602' },
];

// ========== SPENDING INSIGHTS ==========
export const spendingByCategory: SpendingCategory[] = [
    { name: 'Shopping', amount: 340.49, percentage: 28, color: '#8F6AFB' },
    { name: 'Bills', amount: 245.00, percentage: 20, color: '#7167BF' },
    { name: 'Transport', amount: 156.00, percentage: 13, color: '#3008A3' },
    { name: 'Groceries', amount: 134.84, percentage: 11, color: '#2F04B0' },
    { name: 'Subscriptions', amount: 75.97, percentage: 6, color: '#E50913' },
    { name: 'Food & Drink', amount: 89.40, percentage: 7, color: '#FFB602' },
    { name: 'Other', amount: 180.30, percentage: 15, color: '#BDC2CA' },
];

export const monthlySpending = [
    { month: 'Jul', amount: 1850 },
    { month: 'Aug', amount: 2100 },
    { month: 'Sep', amount: 1950 },
    { month: 'Oct', amount: 2250 },
    { month: 'Nov', amount: 2400 },
    { month: 'Dec', amount: 1222 },
];

export const incomeVsExpenses = {
    income: 12500.00,
    expenses: 8250.00,
    incomeChange: 12,
    expensesChange: -5,
};

// ========== BALANCE HISTORY ==========
export const balanceHistory = [
    { date: 'Week 1', balance: 10500 },
    { date: 'Week 2', balance: 11200 },
    { date: 'Week 3', balance: 10800 },
    { date: 'Week 4', balance: 12450 },
];

// ========== PARTNER PERKS ==========
export const partnerPerks: PartnerPerk[] = [
    { id: '1', brand: 'Round-Ups', description: 'Auto-save spare change', icon: 'RU', iconBg: '#2F04B0', cashback: 'Active' },
    { id: '2', brand: 'Amazon', description: '2% cashback on all purchases', icon: '📦', iconBg: '#FF9900', cashback: '2%' },
    { id: '3', brand: 'IKEA', description: '5% cashback on furniture', icon: '🛋️', iconBg: '#0D5BAB', cashback: '5%' },
    { id: '4', brand: 'Paramount+', description: '1 month free trial', icon: '🎬', iconBg: '#0066FF', cashback: 'Free' },
];

// ========== AI INSIGHTS ==========
export const aiInsights = [
    {
        id: '1',
        title: 'Spending Alert',
        message: "You've spent 15% more on subscriptions this month. Consider reviewing your active subscriptions.",
        type: 'warning',
        icon: '⚠️',
    },
    {
        id: '2',
        title: 'Savings Opportunity',
        message: 'Based on your spending patterns, you could save an extra £150/month by switching energy providers.',
        type: 'tip',
        icon: '💡',
    },
    {
        id: '3',
        title: 'Goal Progress',
        message: "Great job! You're on track to reach your Holiday Fund goal by March.",
        type: 'success',
        icon: '🎉',
    },
];

// ========== CONNECTED ACCOUNTS ==========
export const connectedAccounts = [
    { id: '1', bank: 'Amex', lastFour: '4829', balance: 2450.00, icon: '💳' },
    { id: '2', bank: 'Barclays', lastFour: '1234', balance: 5670.00, icon: '🏦' },
    { id: '3', bank: 'Halifax', lastFour: '9876', balance: 12340.00, icon: '💰' },
];
