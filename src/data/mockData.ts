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
    { id: '1', name: 'New Car', icon: '🚗', currentAmount: 2000, goalAmount: 5000, color: '#E50913' },
    { id: '2', name: 'Christmas', icon: '🎄', currentAmount: 3650, goalAmount: 5000, color: '#00A326' },
    { id: '3', name: 'Holiday', icon: '☀️', currentAmount: 2000, goalAmount: 5000, color: '#FFB602' },
    { id: '4', name: 'Rainy Day', icon: '☔', currentAmount: 3650, goalAmount: 5000, color: '#7159B6' },
];

// ========== TRANSACTIONS ==========
export const transactions: Transaction[] = [
    { id: '1', merchant: 'Dlx Ltd', category: 'Salary', amount: 2650.00, date: 'Yesterday', time: '00:15am', icon: '💰', iconBg: '#120048' },
    { id: '2', merchant: 'Dlx Ltd', category: 'Salary', amount: 2650.00, date: 'Yesterday', time: '00:15am', icon: '💰', iconBg: '#120048' },
    { id: '3', merchant: 'Dlx Ltd', category: 'Salary', amount: 2650.00, date: 'Yesterday', time: '00:15am', icon: '💰', iconBg: '#120048' },
    { id: '4', merchant: 'Dlx Ltd', category: 'Salary', amount: 2650.00, date: 'Yesterday', time: '00:15am', icon: '💰', iconBg: '#120048' },
    { id: '5', merchant: 'Dlx Ltd', category: 'Salary', amount: 2650.00, date: 'Yesterday', time: '00:15am', icon: '💰', iconBg: '#120048' },
    { id: '6', merchant: 'Dlx Ltd', category: 'Salary', amount: 2650.00, date: 'Yesterday', time: '00:15am', icon: '💰', iconBg: '#120048' },
    { id: '7', merchant: 'Dlx Ltd', category: 'Salary', amount: 2650.00, date: 'Yesterday', time: '00:15am', icon: '💰', iconBg: '#120048' },
    { id: '1a', merchant: 'Spotify', category: 'Subscriptions', amount: -9.99, date: '2 Jan 2026', time: '09:15', icon: '🎵', iconBg: '#10B981' },
    { id: '2a', merchant: 'Tesco', category: 'Groceries', amount: -67.42, date: '2 Jan 2026', time: '14:30', icon: '🛒', iconBg: '#2F04B0' },
    { id: '3a', merchant: 'Netflix', category: 'Subscriptions', amount: -15.99, date: '1 Jan 2026', time: '00:01', icon: '🎬', iconBg: '#E50913' },
    { id: '4a', merchant: 'Amazon', category: 'Shopping', amount: -124.50, date: '31 Dec 2025', time: '16:45', icon: '📦', iconBg: '#FF9900' },
    { id: '5a', merchant: 'Salary Deposit', category: 'Income', amount: 4500.00, date: '28 Dec 2025', time: '00:00', icon: '💰', iconBg: '#00A326' },
    { id: '6a', merchant: 'British Gas', category: 'Bills', amount: -89.00, date: '27 Dec 2025', time: '08:00', icon: '🔥', iconBg: '#7167BF' },
    { id: '7a', merchant: 'Costa Coffee', category: 'Food & Drink', amount: -4.20, date: '26 Dec 2025', time: '11:22', icon: '☕', iconBg: '#8F6AFB' },
    { id: '8a', merchant: 'Transport for London', category: 'Transport', amount: -156.00, date: '25 Dec 2025', time: '07:00', icon: '🚇', iconBg: '#3008A3' },
    { id: '9a', merchant: 'IKEA', category: 'Shopping', amount: -215.99, date: '24 Dec 2025', time: '13:45', icon: '🛋️', iconBg: '#0D5BAB' },
    { id: '10a', merchant: 'Revolut Transfer', category: 'Transfer', amount: -500.00, date: '23 Dec 2025', time: '18:30', icon: '🔄', iconBg: '#374151' },
    // Extensive Mock Data for Prototype
    { id: '11a', merchant: 'Uber', category: 'Transport', amount: -14.50, date: '22 Dec 2025', time: '23:15', icon: '🚗', iconBg: '#000000' },
    { id: '12a', merchant: 'Sainsburys', category: 'Groceries', amount: -45.20, date: '22 Dec 2025', time: '17:30', icon: '🛒', iconBg: '#FFB602' },
    { id: '13a', merchant: 'Apple Store', category: 'Shopping', amount: -899.00, date: '21 Dec 2025', time: '12:00', icon: '📱', iconBg: '#A0A0A0' },
    { id: '14a', merchant: 'Pret A Manger', category: 'Food & Drink', amount: -8.50, date: '21 Dec 2025', time: '13:15', icon: '🥪', iconBg: '#8F0000' },
    { id: '15a', merchant: 'O2 Mobile', category: 'Bills', amount: -35.00, date: '20 Dec 2025', time: '09:00', icon: '📱', iconBg: '#0000FF' },
    { id: '16a', merchant: 'Gymshark', category: 'Shopping', amount: -65.00, date: '20 Dec 2025', time: '15:20', icon: '💪', iconBg: '#000000' },
    { id: '17a', merchant: 'Vue Cinemas', category: 'Entertainment', amount: -24.00, date: '19 Dec 2025', time: '19:45', icon: '🎬', iconBg: '#FFB602' },
    { id: '18a', merchant: 'Nando\'s', category: 'Food & Drink', amount: -45.60, date: '19 Dec 2025', time: '20:30', icon: '🍗', iconBg: '#000000' },
    { id: '19a', merchant: 'Council Tax', category: 'Bills', amount: -145.00, date: '18 Dec 2025', time: '09:00', icon: '🏛️', iconBg: '#7167BF' },
    { id: '20a', merchant: 'Water Plus', category: 'Bills', amount: -32.50, date: '18 Dec 2025', time: '09:00', icon: '💧', iconBg: '#0066FF' },
    { id: '21a', merchant: 'Thames Water', category: 'Bills', amount: -28.00, date: '18 Dec 2025', time: '09:00', icon: '💧', iconBg: '#0066FF' },
    { id: '22a', merchant: 'H&M', category: 'Shopping', amount: -54.99, date: '17 Dec 2025', time: '14:20', icon: '👗', iconBg: '#E50913' },
    { id: '23a', merchant: 'Zara', category: 'Shopping', amount: -89.90, date: '17 Dec 2025', time: '15:45', icon: '👗', iconBg: '#000000' },
    { id: '24a', merchant: 'Starbucks', category: 'Food & Drink', amount: -5.40, date: '17 Dec 2025', time: '08:30', icon: '☕', iconBg: '#00A326' },
    { id: '25a', merchant: 'Trainline', category: 'Transport', amount: -68.50, date: '16 Dec 2025', time: '10:00', icon: '🚆', iconBg: '#2F04B0' },
    { id: '26a', merchant: 'Shell Garage', category: 'Transport', amount: -45.00, date: '16 Dec 2025', time: '18:15', icon: '⛽', iconBg: '#FFB602' },
    { id: '27a', merchant: 'PureGym', category: 'Subscriptions', amount: -24.99, date: '15 Dec 2025', time: '00:00', icon: '💪', iconBg: '#000000' },
    { id: '28a', merchant: 'Adobe Creative Cloud', category: 'Subscriptions', amount: -52.00, date: '15 Dec 2025', time: '00:00', icon: '💻', iconBg: '#E50913' },
    { id: '29a', merchant: 'PlayStation Plus', category: 'Subscriptions', amount: -12.99, date: '15 Dec 2025', time: '00:00', icon: '🎮', iconBg: '#0066FF' },
    { id: '30a', merchant: 'Currys', category: 'Shopping', amount: -249.00, date: '14 Dec 2025', time: '11:00', icon: '💻', iconBg: '#2F04B0' },
    { id: '31a', merchant: 'Freelance Work', category: 'Income', amount: 850.00, date: '14 Dec 2025', time: '16:00', icon: '💰', iconBg: '#00A326' },
    { id: '32a', merchant: 'Etsy Sales', category: 'Income', amount: 125.40, date: '13 Dec 2025', time: '09:00', icon: '💰', iconBg: '#FF9900' },
    { id: '33a', merchant: 'Deliveroo', category: 'Food & Drink', amount: -28.50, date: '12 Dec 2025', time: '20:15', icon: '🍔', iconBg: '#00CCBC' },
    { id: '34a', merchant: 'Uber Eats', category: 'Food & Drink', amount: -19.20, date: '12 Dec 2025', time: '19:30', icon: '🍔', iconBg: '#00A326' },
    { id: '35a', merchant: 'Boots', category: 'Shopping', amount: -12.50, date: '11 Dec 2025', time: '13:00', icon: '💊', iconBg: '#0058A3' },
    { id: '36a', merchant: 'Superdrug', category: 'Shopping', amount: -8.99, date: '11 Dec 2025', time: '13:30', icon: '💄', iconBg: '#FF69B4' },
    { id: '37a', merchant: 'Waitrose', category: 'Groceries', amount: -94.20, date: '10 Dec 2025', time: '17:45', icon: '🛒', iconBg: '#00A326' },
    { id: '38a', merchant: 'Aldi', category: 'Groceries', amount: -42.15, date: '10 Dec 2025', time: '19:00', icon: '🛒', iconBg: '#0058A3' },
    { id: '39a', merchant: 'Sky Broadband', category: 'Bills', amount: -45.00, date: '09 Dec 2025', time: '09:00', icon: '📡', iconBg: '#0066FF' },
    { id: '40a', merchant: 'EE Mobile', category: 'Bills', amount: -22.00, date: '09 Dec 2025', time: '09:00', icon: '📱', iconBg: '#009999' },
    { id: '41a', merchant: 'ASOS', category: 'Shopping', amount: -62.00, date: '08 Dec 2025', time: '21:00', icon: '👕', iconBg: '#000000' },
    { id: '42a', merchant: 'Nike', category: 'Shopping', amount: -110.00, date: '07 Dec 2025', time: '14:00', icon: '👟', iconBg: '#000000' },
    { id: '43a', merchant: 'Adidas', category: 'Shopping', amount: -85.00, date: '07 Dec 2025', time: '15:30', icon: '👟', iconBg: '#000000' },
    { id: '44a', merchant: 'Refund', category: 'Income', amount: 54.99, date: '06 Dec 2025', time: '11:00', icon: '↩️', iconBg: '#00A326' },
    { id: '45a', merchant: 'Birthday Gift', category: 'Income', amount: 50.00, date: '05 Dec 2025', time: '09:00', icon: '🎁', iconBg: '#FFB602' },
    { id: '46a', merchant: 'Interest', category: 'Income', amount: 4.25, date: '01 Dec 2025', time: '00:00', icon: '📈', iconBg: '#00A326' },
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

// ========== ACCOUNT-SPECIFIC DATA ==========

// Current Account (Current Magic) - Daily spending focus
export const currentAccountData = {
    balance: 2260.00,
    cardNumber: '2458',
    freeToSpend: 1760.00,
    bankTransfers: 58,
    reserved: 500.00,
    topCategory: 'Groceries',
    topCategoryPercent: 32,
    upcomingBill: { name: 'Rent', amount: 850.00, dueIn: 'tomorrow' },
    totalIncome: 12500.00,
    totalExpenses: 4740.00,
    incomeChange: 12,
    expenseChange: -2,
    balanceChange: 10,
    transactions: [
        { id: 'ca1', merchant: 'Tesco Express', category: 'Groceries', amount: -45.67, date: 'Today', time: '14:32', icon: '🛒', iconBg: '#2F04B0' },
        { id: 'ca2', merchant: 'Costa Coffee', category: 'Food & Drink', amount: -4.85, date: 'Today', time: '09:15', icon: '☕', iconBg: '#8F6AFB' },
        { id: 'ca3', merchant: 'Dlx Ltd', category: 'Salary', amount: 2650.00, date: 'Yesterday', time: '00:15', icon: '💰', iconBg: '#120048' },
        { id: 'ca4', merchant: 'Transport for London', category: 'Transport', amount: -45.00, date: 'Yesterday', time: '08:30', icon: '🚇', iconBg: '#3008A3' },
        { id: 'ca5', merchant: 'Sainsburys', category: 'Groceries', amount: -89.23, date: 'Yesterday', time: '18:45', icon: '🛒', iconBg: '#FFB602' },
        { id: 'ca6', merchant: 'Shell Garage', category: 'Transport', amount: -52.00, date: '2 days ago', time: '17:20', icon: '⛽', iconBg: '#FFB602' },
        { id: 'ca7', merchant: 'Pret A Manger', category: 'Food & Drink', amount: -8.95, date: '2 days ago', time: '12:30', icon: '🥪', iconBg: '#8F0000' },
        { id: 'ca8', merchant: 'British Gas', category: 'Bills', amount: -89.00, date: '3 days ago', time: '09:00', icon: '🔥', iconBg: '#7167BF' },
        { id: 'ca9', merchant: 'Netflix', category: 'Subscriptions', amount: -15.99, date: '3 days ago', time: '00:01', icon: '🎬', iconBg: '#E50913' },
        { id: 'ca10', merchant: 'Uber', category: 'Transport', amount: -18.50, date: '4 days ago', time: '23:15', icon: '🚗', iconBg: '#000000' },
    ],
    aiTips: [
        { title: 'Bundle & Save', description: 'Combine smaller subscriptions into a unified plan; you\'ll spend less overall with more control of monthly cash flow.' },
        { title: 'Round-Up Magic', description: 'Turn spare change into savings invisibly: each purchase rounds to the nearest £; could build a £200+ buffer each year.' },
        { title: 'Debt Buffer', description: 'Pay down the highest-interest credit first; you\'ll free up money faster and avoid unnecessary interest.' },
    ],
    balanceHistory: [
        { date: 'Week 1', balance: 6000 },
        { date: 'Week 2', balance: 7200 },
        { date: 'Week 3', balance: 10500 },
        { date: 'Week 4', balance: 14000 },
    ],
};

// Savings Account (Dream Vault) - Growth and goals focus
export const savingsAccountData = {
    balance: 8350.00,
    cardNumber: '7291',
    freeToSpend: 0,
    bankTransfers: 12,
    reserved: 2000.00,
    topCategory: 'Interest Earned',
    topCategoryPercent: 45,
    upcomingBill: { name: 'Auto-save', amount: 200.00, dueIn: '3 days' },
    totalIncome: 4850.00,
    totalExpenses: 0,
    incomeChange: 8,
    expenseChange: 0,
    balanceChange: 15,
    transactions: [
        { id: 'sa1', merchant: 'Auto-Save Transfer', category: 'Transfer In', amount: 200.00, date: 'Today', time: '00:00', icon: '🔄', iconBg: '#00A326' },
        { id: 'sa2', merchant: 'Monthly Interest', category: 'Interest', amount: 28.50, date: 'Yesterday', time: '00:00', icon: '📈', iconBg: '#00A326' },
        { id: 'sa3', merchant: 'Round-Up Savings', category: 'Transfer In', amount: 12.35, date: 'Yesterday', time: '23:59', icon: '🎯', iconBg: '#FFB602' },
        { id: 'sa4', merchant: 'Goal Deposit - Holiday', category: 'Transfer In', amount: 500.00, date: '3 days ago', time: '10:00', icon: '🏖️', iconBg: '#FFB602' },
        { id: 'sa5', merchant: 'Bonus Interest', category: 'Interest', amount: 15.00, date: '5 days ago', time: '00:00', icon: '🌟', iconBg: '#00A326' },
        { id: 'sa6', merchant: 'Emergency Fund Top-Up', category: 'Transfer In', amount: 300.00, date: '1 week ago', time: '14:30', icon: '🚨', iconBg: '#F2645D' },
        { id: 'sa7', merchant: 'Weekly Round-Ups', category: 'Transfer In', amount: 8.72, date: '1 week ago', time: '23:59', icon: '🎯', iconBg: '#FFB602' },
        { id: 'sa8', merchant: 'Cashback Reward', category: 'Cashback', amount: 25.00, date: '2 weeks ago', time: '12:00', icon: '💎', iconBg: '#7159B6' },
        { id: 'sa9', merchant: 'Monthly Interest', category: 'Interest', amount: 26.80, date: '1 month ago', time: '00:00', icon: '📈', iconBg: '#00A326' },
        { id: 'sa10', merchant: 'Birthday Gift Deposit', category: 'Transfer In', amount: 100.00, date: '1 month ago', time: '16:00', icon: '🎁', iconBg: '#FFB602' },
    ],
    aiTips: [
        { title: '52-Week Challenge', description: 'Save £1 in week 1, £2 in week 2, and so on. By year-end, you\'ll have saved £1,378 effortlessly!' },
        { title: 'Interest Booster', description: 'Your savings earned £54.30 this month. Consider locking £2,000 in a fixed-rate account for 4.5% APY.' },
        { title: 'Goal Acceleration', description: 'Increase your Holiday Fund by £50/month and reach your £3,000 target 2 months earlier!' },
    ],
    balanceHistory: [
        { date: 'Week 1', balance: 7800 },
        { date: 'Week 2', balance: 8050 },
        { date: 'Week 3', balance: 8200 },
        { date: 'Week 4', balance: 8350 },
    ],
};

// Credit Card (Credit Sorcery) - Rewards and payments focus
export const creditCardData = {
    balance: -1847.32,
    cardNumber: '9834',
    creditLimit: 5000.00,
    availableCredit: 3152.68,
    minimumPayment: 45.00,
    dueDate: '15th Jan',
    cashbackEarned: 127.50,
    pointsBalance: 4850,
    // Shared properties for consistency
    freeToSpend: 3152.68, // Available credit
    bankTransfers: 24, // Transaction count
    reserved: 127.50, // Cashback earned
    topCategory: 'Shopping',
    topCategoryPercent: 52,
    upcomingBill: { name: 'Min Payment', amount: 45.00, dueIn: '10 days' },
    totalIncome: 650.00, // Payments made
    totalExpenses: 1847.32, // Total spend
    incomeChange: 12, // Payment change
    expenseChange: 5, // Spend change
    balanceChange: -8, // Debt reduced
    totalSpend: 1847.32,
    paymentsMade: 650.00,
    spendChange: 5,
    paymentChange: 12,
    transactions: [
        { id: 'cc1', merchant: 'Amazon UK', category: 'Shopping', amount: -156.99, date: 'Today', time: '16:45', icon: '📦', iconBg: '#FF9900' },
        { id: 'cc2', merchant: 'ASOS', category: 'Shopping', amount: -89.00, date: 'Today', time: '11:20', icon: '👕', iconBg: '#000000' },
        { id: 'cc3', merchant: 'Apple Services', category: 'Subscriptions', amount: -9.99, date: 'Yesterday', time: '00:01', icon: '📱', iconBg: '#A0A0A0' },
        { id: 'cc4', merchant: 'Uber Eats', category: 'Food & Drink', amount: -32.50, date: 'Yesterday', time: '20:15', icon: '🍔', iconBg: '#00A326' },
        { id: 'cc5', merchant: 'Payment - Thank You', category: 'Payment', amount: 400.00, date: '2 days ago', time: '10:00', icon: '✅', iconBg: '#00A326' },
        { id: 'cc6', merchant: 'John Lewis', category: 'Shopping', amount: -245.00, date: '3 days ago', time: '14:30', icon: '🛍️', iconBg: '#000000' },
        { id: 'cc7', merchant: 'Deliveroo', category: 'Food & Drink', amount: -28.75, date: '4 days ago', time: '19:45', icon: '🍔', iconBg: '#00CCBC' },
        { id: 'cc8', merchant: 'Booking.com', category: 'Travel', amount: -320.00, date: '5 days ago', time: '09:00', icon: '✈️', iconBg: '#003580' },
        { id: 'cc9', merchant: 'Cashback Reward', category: 'Cashback', amount: 12.50, date: '1 week ago', time: '00:00', icon: '💎', iconBg: '#7159B6' },
        { id: 'cc10', merchant: 'Payment - Thank You', category: 'Payment', amount: 250.00, date: '2 weeks ago', time: '10:00', icon: '✅', iconBg: '#00A326' },
    ],
    aiTips: [
        { title: 'Cashback Maximizer', description: 'You\'ve earned £127.50 cashback this year! Use your card for groceries to unlock 3% bonus cashback.' },
        { title: 'Statement Date Strategy', description: 'Time large purchases after your statement closes to get up to 56 days interest-free.' },
        { title: 'Points Redemption', description: 'Your 4,850 points are worth £48.50. Redeem now for travel vouchers at 1.5x value!' },
    ],
    balanceHistory: [
        { date: 'Week 1', balance: -2100 },
        { date: 'Week 2', balance: -1950 },
        { date: 'Week 3', balance: -2200 },
        { date: 'Week 4', balance: -1847 },
    ],
};

// ========== CONNECTED ACCOUNTS ==========
export const connectedAccounts = [
    { id: '1', bank: 'Amex', lastFour: '4829', balance: 2450.00, icon: '💳' },
    { id: '2', bank: 'Barclays', lastFour: '1234', balance: 5670.00, icon: '🏦' },
    { id: '3', bank: 'Halifax', lastFour: '9876', balance: 12340.00, icon: '💰' },
];

// ========== ACHIEVEMENTS ==========
export interface Achievement {
    id: string;
    title: string;
    description: string;
    reward: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    progress: number; // 0-100
    completedDate?: string;
    category: 'debt' | 'savings' | 'budgeting' | 'goals';
    icon: string;
}

export const achievements: Achievement[] = [
    {
        id: '1',
        title: '£500 Debt Destroyer',
        description: 'Pay down £500 of high-interest debt',
        reward: 'APR tips Unlocked',
        difficulty: 'Easy',
        progress: 100,
        completedDate: 'Completed 5 days ago',
        category: 'debt',
        icon: '🏆',
    },
    {
        id: '2',
        title: '5 Goals Completed',
        description: 'Complete your first 5 financial goals',
        reward: '£10 bonus',
        difficulty: 'Easy',
        progress: 100,
        completedDate: 'Completed 2 days ago',
        category: 'goals',
        icon: '🏆',
    },
    {
        id: '3',
        title: 'Subscription Slayer',
        description: 'Cancel or downgrade 2 unused subscriptions',
        reward: 'Habit streak +5',
        difficulty: 'Medium',
        progress: 40,
        category: 'budgeting',
        icon: '🏆',
    },
    {
        id: '4',
        title: 'Budget Boss',
        description: 'Set a monthly budget and stay under it',
        reward: 'Badge + streak boost',
        difficulty: 'Hard',
        progress: 60,
        category: 'budgeting',
        icon: '🏆',
    },
    {
        id: '5',
        title: 'Emergency Fund Starter',
        description: 'Save £1000 in your emergency fund',
        reward: 'Security badge',
        difficulty: 'Medium',
        progress: 75,
        category: 'savings',
        icon: '🏆',
    },
    {
        id: '6',
        title: 'Round-Up Champion',
        description: 'Save £100 using round-ups',
        reward: 'Bonus interest',
        difficulty: 'Easy',
        progress: 100,
        completedDate: 'Completed 1 week ago',
        category: 'savings',
        icon: '🏆',
    },
    {
        id: '7',
        title: 'No Spend Week',
        description: 'Complete a full week without discretionary spending',
        reward: 'Willpower badge',
        difficulty: 'Hard',
        progress: 20,
        category: 'budgeting',
        icon: '🏆',
    },
    {
        id: '8',
        title: 'Savings Streak',
        description: 'Save money for 30 consecutive days',
        reward: 'Streak master badge',
        difficulty: 'Medium',
        progress: 85,
        category: 'savings',
        icon: '🏆',
    },
];

// ========== MONEY CASTS (RECEIVED TRANSACTIONS) ==========
export interface MoneyCast {
    id: string;
    name: string;
    description: string;
    date: string;
    amount: number;
    avatar: string;
    avatarBg: string;
    time?: string;
    method?: string;
}

export const moneyCasts: MoneyCast[] = [
    { id: '1', name: 'Claire', description: 'Coffee & Lunch', date: 'today', amount: 12.50, avatar: '👩', avatarBg: '#F97171', time: '14:32', method: 'Bank transfer' },
    { id: '2', name: 'John', description: 'Dinner Split', date: 'Apr, 12', amount: 25.00, avatar: '👨', avatarBg: '#FFB602', time: '20:15', method: 'PayPal' },
    { id: '3', name: 'Mo', description: 'Movie Tickets', date: 'Apr, 24', amount: 18.00, avatar: '👨', avatarBg: '#64B5F6', time: '19:45', method: 'Bank transfer' },
    { id: '4', name: 'Lisa', description: 'Grocery Run', date: 'Mar, 1', amount: 42.30, avatar: '👩', avatarBg: '#FFB74D', time: '16:20', method: 'Monzo' },
    { id: '5', name: 'David', description: 'Birthday Gift', date: 'Feb, 28', amount: 50.00, avatar: '👨', avatarBg: '#9C27B0', time: '09:00', method: 'Bank transfer' },
    { id: '6', name: 'Emma', description: 'Concert Tickets', date: 'Feb, 15', amount: 65.00, avatar: '👩', avatarBg: '#E91E63', time: '11:30', method: 'Revolut' },
    { id: '7', name: 'Mike', description: 'Uber Split', date: 'Feb, 10', amount: 8.50, avatar: '👨', avatarBg: '#2196F3', time: '23:45', method: 'Monzo' },
    { id: '8', name: 'Sarah', description: 'Rent Share', date: 'Feb, 1', amount: 425.00, avatar: '👩', avatarBg: '#4CAF50', time: '00:01', method: 'Bank transfer' },
    { id: '9', name: 'Alex', description: 'Gaming Sub', date: 'Jan, 25', amount: 7.99, avatar: '👨', avatarBg: '#FF5722', time: '12:00', method: 'PayPal' },
    { id: '10', name: 'Nina', description: 'Gym Class', date: 'Jan, 20', amount: 15.00, avatar: '👩', avatarBg: '#795548', time: '18:00', method: 'Bank transfer' },
];

// ========== UPCOMING SUMMONS (SCHEDULED PAYMENTS) ==========
export interface UpcomingSummon {
    id: string;
    name: string;
    date: string;
    amount: number;
    icon: string;
    iconBg: string;
    category?: string;
    recurring?: boolean;
}

export const upcomingSummons: UpcomingSummon[] = [
    { id: '1', name: 'Netflix', date: 'today', amount: -15, icon: 'N', iconBg: '#E50913', category: 'Entertainment', recurring: true },
    { id: '2', name: 'Spotify', date: 'tomorrow', amount: -10, icon: '♪', iconBg: '#1DB954', category: 'Entertainment', recurring: true },
    { id: '3', name: 'Water bill', date: '3 days', amount: -70, icon: '💧', iconBg: '#0066FF', category: 'Bills', recurring: true },
    { id: '4', name: 'Pet bill', date: '5 days', amount: -100, icon: '🐾', iconBg: '#FF6B5B', category: 'Pet Care', recurring: true },
    { id: '5', name: 'Rent', date: '7 days', amount: -1200, icon: '🏠', iconBg: '#120048', category: 'Housing', recurring: true },
    { id: '6', name: 'Council Tax', date: '10 days', amount: -145, icon: '🏛️', iconBg: '#7167BF', category: 'Bills', recurring: true },
    { id: '7', name: 'Phone Bill', date: '12 days', amount: -35, icon: '📱', iconBg: '#009999', category: 'Bills', recurring: true },
    { id: '8', name: 'Gym Membership', date: '15 days', amount: -30, icon: '💪', iconBg: '#000000', category: 'Health', recurring: true },
    { id: '9', name: 'Car Insurance', date: '20 days', amount: -85, icon: '🚗', iconBg: '#E50913', category: 'Transport', recurring: true },
    { id: '10', name: 'Adobe Creative', date: '25 days', amount: -52, icon: '💻', iconBg: '#FF0000', category: 'Subscriptions', recurring: true },
];

// ========== TREASURE TRACKER (INCOME/EXPENSE CHART DATA) ==========
export interface TreasureTrackerPoint {
    week: string;
    value: number;
    month: string;
    year: number;
    type: 'income' | 'expense';
}

export const treasureTrackerData: TreasureTrackerPoint[] = [
    // ===== 2025 INCOME DATA =====
    // January 2025
    { week: 'WK1', value: 8200, month: 'Jan', year: 2025, type: 'income' },
    { week: 'WK2', value: 8800, month: 'Jan', year: 2025, type: 'income' },
    { week: 'WK3', value: 9100, month: 'Jan', year: 2025, type: 'income' },
    { week: 'WK4', value: 9500, month: 'Jan', year: 2025, type: 'income' },
    // February 2025
    { week: 'WK1', value: 8800, month: 'Feb', year: 2025, type: 'income' },
    { week: 'WK2', value: 9200, month: 'Feb', year: 2025, type: 'income' },
    { week: 'WK3', value: 9600, month: 'Feb', year: 2025, type: 'income' },
    { week: 'WK4', value: 10100, month: 'Feb', year: 2025, type: 'income' },
    // March 2025
    { week: 'WK1', value: 8500, month: 'Mar', year: 2025, type: 'income' },
    { week: 'WK2', value: 9200, month: 'Mar', year: 2025, type: 'income' },
    { week: 'WK3', value: 9800, month: 'Mar', year: 2025, type: 'income' },
    { week: 'WK4', value: 10500, month: 'Mar', year: 2025, type: 'income' },
    // April 2025
    { week: 'WK1', value: 9500, month: 'Apr', year: 2025, type: 'income' },
    { week: 'WK2', value: 10200, month: 'Apr', year: 2025, type: 'income' },
    { week: 'WK3', value: 11760, month: 'Apr', year: 2025, type: 'income' },
    { week: 'WK4', value: 12500, month: 'Apr', year: 2025, type: 'income' },
    // May 2025
    { week: 'WK1', value: 10000, month: 'May', year: 2025, type: 'income' },
    { week: 'WK2', value: 10800, month: 'May', year: 2025, type: 'income' },
    { week: 'WK3', value: 11500, month: 'May', year: 2025, type: 'income' },
    { week: 'WK4', value: 12200, month: 'May', year: 2025, type: 'income' },
    // June 2025
    { week: 'WK1', value: 10500, month: 'Jun', year: 2025, type: 'income' },
    { week: 'WK2', value: 11200, month: 'Jun', year: 2025, type: 'income' },
    { week: 'WK3', value: 11800, month: 'Jun', year: 2025, type: 'income' },
    { week: 'WK4', value: 12600, month: 'Jun', year: 2025, type: 'income' },
    // July 2025
    { week: 'WK1', value: 9800, month: 'Jul', year: 2025, type: 'income' },
    { week: 'WK2', value: 10400, month: 'Jul', year: 2025, type: 'income' },
    { week: 'WK3', value: 10900, month: 'Jul', year: 2025, type: 'income' },
    { week: 'WK4', value: 11500, month: 'Jul', year: 2025, type: 'income' },
    // August 2025
    { week: 'WK1', value: 10200, month: 'Aug', year: 2025, type: 'income' },
    { week: 'WK2', value: 10800, month: 'Aug', year: 2025, type: 'income' },
    { week: 'WK3', value: 11400, month: 'Aug', year: 2025, type: 'income' },
    { week: 'WK4', value: 12100, month: 'Aug', year: 2025, type: 'income' },
    // September 2025
    { week: 'WK1', value: 11000, month: 'Sep', year: 2025, type: 'income' },
    { week: 'WK2', value: 11600, month: 'Sep', year: 2025, type: 'income' },
    { week: 'WK3', value: 12200, month: 'Sep', year: 2025, type: 'income' },
    { week: 'WK4', value: 12900, month: 'Sep', year: 2025, type: 'income' },
    // October 2025
    { week: 'WK1', value: 10800, month: 'Oct', year: 2025, type: 'income' },
    { week: 'WK2', value: 11400, month: 'Oct', year: 2025, type: 'income' },
    { week: 'WK3', value: 12000, month: 'Oct', year: 2025, type: 'income' },
    { week: 'WK4', value: 12700, month: 'Oct', year: 2025, type: 'income' },
    // November 2025
    { week: 'WK1', value: 11500, month: 'Nov', year: 2025, type: 'income' },
    { week: 'WK2', value: 12100, month: 'Nov', year: 2025, type: 'income' },
    { week: 'WK3', value: 12800, month: 'Nov', year: 2025, type: 'income' },
    { week: 'WK4', value: 13500, month: 'Nov', year: 2025, type: 'income' },
    // December 2025
    { week: 'WK1', value: 12000, month: 'Dec', year: 2025, type: 'income' },
    { week: 'WK2', value: 12800, month: 'Dec', year: 2025, type: 'income' },
    { week: 'WK3', value: 13500, month: 'Dec', year: 2025, type: 'income' },
    { week: 'WK4', value: 14200, month: 'Dec', year: 2025, type: 'income' },

    // ===== 2025 EXPENSE DATA =====
    // January 2025
    { week: 'WK1', value: 1800, month: 'Jan', year: 2025, type: 'expense' },
    { week: 'WK2', value: 2100, month: 'Jan', year: 2025, type: 'expense' },
    { week: 'WK3', value: 1950, month: 'Jan', year: 2025, type: 'expense' },
    { week: 'WK4', value: 2300, month: 'Jan', year: 2025, type: 'expense' },
    // February 2025
    { week: 'WK1', value: 1950, month: 'Feb', year: 2025, type: 'expense' },
    { week: 'WK2', value: 2050, month: 'Feb', year: 2025, type: 'expense' },
    { week: 'WK3', value: 2200, month: 'Feb', year: 2025, type: 'expense' },
    { week: 'WK4', value: 1900, month: 'Feb', year: 2025, type: 'expense' },
    // March 2025
    { week: 'WK1', value: 2300, month: 'Mar', year: 2025, type: 'expense' },
    { week: 'WK2', value: 1980, month: 'Mar', year: 2025, type: 'expense' },
    { week: 'WK3', value: 2150, month: 'Mar', year: 2025, type: 'expense' },
    { week: 'WK4', value: 1890, month: 'Mar', year: 2025, type: 'expense' },
    // April 2025
    { week: 'WK1', value: 2100, month: 'Apr', year: 2025, type: 'expense' },
    { week: 'WK2', value: 1850, month: 'Apr', year: 2025, type: 'expense' },
    { week: 'WK3', value: 2400, month: 'Apr', year: 2025, type: 'expense' },
    { week: 'WK4', value: 1950, month: 'Apr', year: 2025, type: 'expense' },
    // May 2025
    { week: 'WK1', value: 1900, month: 'May', year: 2025, type: 'expense' },
    { week: 'WK2', value: 2200, month: 'May', year: 2025, type: 'expense' },
    { week: 'WK3', value: 1750, month: 'May', year: 2025, type: 'expense' },
    { week: 'WK4', value: 2050, month: 'May', year: 2025, type: 'expense' },
    // June 2025
    { week: 'WK1', value: 2400, month: 'Jun', year: 2025, type: 'expense' },
    { week: 'WK2', value: 2100, month: 'Jun', year: 2025, type: 'expense' },
    { week: 'WK3', value: 2550, month: 'Jun', year: 2025, type: 'expense' },
    { week: 'WK4', value: 2300, month: 'Jun', year: 2025, type: 'expense' },
    // July 2025
    { week: 'WK1', value: 2600, month: 'Jul', year: 2025, type: 'expense' },
    { week: 'WK2', value: 2800, month: 'Jul', year: 2025, type: 'expense' },
    { week: 'WK3', value: 2450, month: 'Jul', year: 2025, type: 'expense' },
    { week: 'WK4', value: 2700, month: 'Jul', year: 2025, type: 'expense' },
    // August 2025
    { week: 'WK1', value: 2200, month: 'Aug', year: 2025, type: 'expense' },
    { week: 'WK2', value: 2350, month: 'Aug', year: 2025, type: 'expense' },
    { week: 'WK3', value: 2100, month: 'Aug', year: 2025, type: 'expense' },
    { week: 'WK4', value: 2450, month: 'Aug', year: 2025, type: 'expense' },
    // September 2025
    { week: 'WK1', value: 2000, month: 'Sep', year: 2025, type: 'expense' },
    { week: 'WK2', value: 2150, month: 'Sep', year: 2025, type: 'expense' },
    { week: 'WK3', value: 2300, month: 'Sep', year: 2025, type: 'expense' },
    { week: 'WK4', value: 2050, month: 'Sep', year: 2025, type: 'expense' },
    // October 2025
    { week: 'WK1', value: 2400, month: 'Oct', year: 2025, type: 'expense' },
    { week: 'WK2', value: 2250, month: 'Oct', year: 2025, type: 'expense' },
    { week: 'WK3', value: 2600, month: 'Oct', year: 2025, type: 'expense' },
    { week: 'WK4', value: 2350, month: 'Oct', year: 2025, type: 'expense' },
    // November 2025
    { week: 'WK1', value: 2500, month: 'Nov', year: 2025, type: 'expense' },
    { week: 'WK2', value: 2700, month: 'Nov', year: 2025, type: 'expense' },
    { week: 'WK3', value: 2400, month: 'Nov', year: 2025, type: 'expense' },
    { week: 'WK4', value: 2800, month: 'Nov', year: 2025, type: 'expense' },
    // December 2025
    { week: 'WK1', value: 3000, month: 'Dec', year: 2025, type: 'expense' },
    { week: 'WK2', value: 3500, month: 'Dec', year: 2025, type: 'expense' },
    { week: 'WK3', value: 3200, month: 'Dec', year: 2025, type: 'expense' },
    { week: 'WK4', value: 3800, month: 'Dec', year: 2025, type: 'expense' },

    // ===== 2024 DATA (December only) =====
    { week: 'WK1', value: 8200, month: 'Dec', year: 2024, type: 'income' },
    { week: 'WK2', value: 8900, month: 'Dec', year: 2024, type: 'income' },
    { week: 'WK3', value: 9400, month: 'Dec', year: 2024, type: 'income' },
    { week: 'WK4', value: 10100, month: 'Dec', year: 2024, type: 'income' },
    { week: 'WK1', value: 2500, month: 'Dec', year: 2024, type: 'expense' },
    { week: 'WK2', value: 3200, month: 'Dec', year: 2024, type: 'expense' },
    { week: 'WK3', value: 2800, month: 'Dec', year: 2024, type: 'expense' },
    { week: 'WK4', value: 3500, month: 'Dec', year: 2024, type: 'expense' },
];

// Filter options for Treasure Tracker
export const treasureTrackerFilters = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    years: [2024, 2025],
    types: ['income', 'expense'] as const,
    chartTypes: ['line', 'bar'] as const,
    timeRanges: ['1 month', '3 months', '6 months', '12 months'] as const,
};

// ========== FINWIZ CHESTS (MAIN ACCOUNTS VIEW) ==========
export interface FinWizChest {
    id: string;
    name: string;
    highlight: string;
    balance: number;
    status: 'Active' | 'Growing' | 'Available' | 'Current magic';
    theme: 'purple' | 'yellow' | 'pink' | 'green';
}

export const finWizChests: FinWizChest[] = [
    { id: '1', name: 'Current', highlight: 'Magic', balance: 2300.00, status: 'Active', theme: 'purple' },
    { id: '2', name: 'Dream', highlight: 'Vault', balance: 11000.00, status: 'Growing', theme: 'yellow' },
    { id: '3', name: 'Credit', highlight: 'Sorcery', balance: -1070.00, status: 'Available', theme: 'pink' },
    { id: '4', name: 'Available', highlight: 'now', balance: 2300.00, status: 'Current magic', theme: 'green' },
];

// ========== TOTAL COINS ==========
export const totalCoins = 12230.00;

