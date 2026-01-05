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
