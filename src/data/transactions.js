export const CATEGORIES = [
  'Housing', 'Food & Dining', 'Transport', 'Healthcare',
  'Entertainment', 'Shopping', 'Utilities', 'Education',
  'Travel', 'Investments', 'Salary', 'Freelance', 'Other'
];

export const CATEGORY_COLORS = {
  'Housing': '#e67e5a',
  'Food & Dining': '#f5a623',
  'Transport': '#4a9eff',
  'Healthcare': '#7ed321',
  'Entertainment': '#bd10e0',
  'Shopping': '#ff6b9d',
  'Utilities': '#50e3c2',
  'Education': '#b8e986',
  'Travel': '#9b59b6',
  'Investments': '#2ecc71',
  'Salary': '#27ae60',
  'Freelance': '#16a085',
  'Other': '#95a5a6',
};

export const generateTransactions = () => {
  const transactions = [
    // January
    { id: 1, date: '2024-01-03', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
    { id: 2, date: '2024-01-04', description: 'Rent Payment', amount: 22000, category: 'Housing', type: 'expense' },
    { id: 3, date: '2024-01-06', description: 'Swiggy Order', amount: 650, category: 'Food & Dining', type: 'expense' },
    { id: 4, date: '2024-01-08', description: 'Freelance Project A', amount: 15000, category: 'Freelance', type: 'income' },
    { id: 5, date: '2024-01-10', description: 'Electricity Bill', amount: 2100, category: 'Utilities', type: 'expense' },
    { id: 6, date: '2024-01-12', description: 'Uber Rides', amount: 850, category: 'Transport', type: 'expense' },
    { id: 7, date: '2024-01-14', description: 'Zepto Groceries', amount: 3200, category: 'Food & Dining', type: 'expense' },
    { id: 8, date: '2024-01-15', description: 'Netflix Subscription', amount: 649, category: 'Entertainment', type: 'expense' },
    { id: 9, date: '2024-01-18', description: 'Amazon Shopping', amount: 4800, category: 'Shopping', type: 'expense' },
    { id: 10, date: '2024-01-20', description: 'Doctor Visit', amount: 800, category: 'Healthcare', type: 'expense' },
    { id: 11, date: '2024-01-22', description: 'SIP Investment', amount: 10000, category: 'Investments', type: 'expense' },
    { id: 12, date: '2024-01-25', description: 'Internet Bill', amount: 999, category: 'Utilities', type: 'expense' },
    { id: 13, date: '2024-01-28', description: 'Online Course', amount: 2500, category: 'Education', type: 'expense' },

    // February
    { id: 14, date: '2024-02-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
    { id: 15, date: '2024-02-02', description: 'Rent Payment', amount: 22000, category: 'Housing', type: 'expense' },
    { id: 16, date: '2024-02-05', description: 'Zomato Orders', amount: 1200, category: 'Food & Dining', type: 'expense' },
    { id: 17, date: '2024-02-07', description: 'Freelance Project B', amount: 20000, category: 'Freelance', type: 'income' },
    { id: 18, date: '2024-02-10', description: 'Metro Card Recharge', amount: 500, category: 'Transport', type: 'expense' },
    { id: 19, date: '2024-02-12', description: 'Valentine Dinner', amount: 3500, category: 'Food & Dining', type: 'expense' },
    { id: 20, date: '2024-02-14', description: 'Gift Shopping', amount: 5200, category: 'Shopping', type: 'expense' },
    { id: 21, date: '2024-02-16', description: 'Electricity Bill', amount: 1950, category: 'Utilities', type: 'expense' },
    { id: 22, date: '2024-02-18', description: 'Spotify Premium', amount: 119, category: 'Entertainment', type: 'expense' },
    { id: 23, date: '2024-02-22', description: 'SIP Investment', amount: 10000, category: 'Investments', type: 'expense' },
    { id: 24, date: '2024-02-25', description: 'Pharmacy', amount: 450, category: 'Healthcare', type: 'expense' },
    { id: 25, date: '2024-02-28', description: 'Internet Bill', amount: 999, category: 'Utilities', type: 'expense' },

    // March
    { id: 26, date: '2024-03-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
    { id: 27, date: '2024-03-03', description: 'Rent Payment', amount: 22000, category: 'Housing', type: 'expense' },
    { id: 28, date: '2024-03-05', description: 'Holi Celebrations', amount: 2000, category: 'Entertainment', type: 'expense' },
    { id: 29, date: '2024-03-07', description: 'Freelance Project C', amount: 18000, category: 'Freelance', type: 'income' },
    { id: 30, date: '2024-03-09', description: 'Grocery Shopping', amount: 2800, category: 'Food & Dining', type: 'expense' },
    { id: 31, date: '2024-03-12', description: 'Car Fuel', amount: 3000, category: 'Transport', type: 'expense' },
    { id: 32, date: '2024-03-15', description: 'Clothing Purchase', amount: 8500, category: 'Shopping', type: 'expense' },
    { id: 33, date: '2024-03-17', description: 'Electricity Bill', amount: 2300, category: 'Utilities', type: 'expense' },
    { id: 34, date: '2024-03-19', description: 'Movie Tickets', amount: 900, category: 'Entertainment', type: 'expense' },
    { id: 35, date: '2024-03-22', description: 'SIP Investment', amount: 10000, category: 'Investments', type: 'expense' },
    { id: 36, date: '2024-03-24', description: 'Dentist Appointment', amount: 1500, category: 'Healthcare', type: 'expense' },
    { id: 37, date: '2024-03-27', description: 'Book Purchase', amount: 800, category: 'Education', type: 'expense' },
    { id: 38, date: '2024-03-29', description: 'Internet Bill', amount: 999, category: 'Utilities', type: 'expense' },
    { id: 39, date: '2024-03-31', description: 'Bonus Payout', amount: 25000, category: 'Salary', type: 'income' },

    // April
    { id: 40, date: '2024-04-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
    { id: 41, date: '2024-04-02', description: 'Rent Payment', amount: 22000, category: 'Housing', type: 'expense' },
    { id: 42, date: '2024-04-05', description: 'Zomato Orders', amount: 1800, category: 'Food & Dining', type: 'expense' },
    { id: 43, date: '2024-04-08', description: 'Travel to Goa', amount: 18000, category: 'Travel', type: 'expense' },
    { id: 44, date: '2024-04-10', description: 'Car Maintenance', amount: 5000, category: 'Transport', type: 'expense' },
    { id: 45, date: '2024-04-12', description: 'Amazon Prime', amount: 1499, category: 'Entertainment', type: 'expense' },
    { id: 46, date: '2024-04-15', description: 'Freelance Project D', amount: 22000, category: 'Freelance', type: 'income' },
    { id: 47, date: '2024-04-17', description: 'Electricity Bill', amount: 2500, category: 'Utilities', type: 'expense' },
    { id: 48, date: '2024-04-20', description: 'Gym Membership', amount: 2500, category: 'Healthcare', type: 'expense' },
    { id: 49, date: '2024-04-22', description: 'SIP Investment', amount: 10000, category: 'Investments', type: 'expense' },
    { id: 50, date: '2024-04-25', description: 'Grocery Shopping', amount: 3400, category: 'Food & Dining', type: 'expense' },
    { id: 51, date: '2024-04-28', description: 'Internet Bill', amount: 999, category: 'Utilities', type: 'expense' },

    // May
    { id: 52, date: '2024-05-01', description: 'Monthly Salary', amount: 85000, category: 'Salary', type: 'income' },
    { id: 53, date: '2024-05-03', description: 'Rent Payment', amount: 22000, category: 'Housing', type: 'expense' },
    { id: 54, date: '2024-05-05', description: 'Swiggy Orders', amount: 2200, category: 'Food & Dining', type: 'expense' },
    { id: 55, date: '2024-05-08', description: 'Freelance Project E', amount: 16000, category: 'Freelance', type: 'income' },
    { id: 56, date: '2024-05-10', description: 'Book Bundle', amount: 1200, category: 'Education', type: 'expense' },
    { id: 57, date: '2024-05-12', description: 'Metro Card', amount: 500, category: 'Transport', type: 'expense' },
    { id: 58, date: '2024-05-15', description: 'Electronics Purchase', amount: 15000, category: 'Shopping', type: 'expense' },
    { id: 59, date: '2024-05-18', description: 'Electricity Bill', amount: 2200, category: 'Utilities', type: 'expense' },
    { id: 60, date: '2024-05-20', description: 'Concert Tickets', amount: 3000, category: 'Entertainment', type: 'expense' },
    { id: 61, date: '2024-05-22', description: 'SIP Investment', amount: 10000, category: 'Investments', type: 'expense' },
    { id: 62, date: '2024-05-25', description: 'Health Checkup', amount: 2500, category: 'Healthcare', type: 'expense' },
    { id: 63, date: '2024-05-28', description: 'Internet Bill', amount: 999, category: 'Utilities', type: 'expense' },

    // June
    { id: 64, date: '2024-06-01', description: 'Monthly Salary', amount: 90000, category: 'Salary', type: 'income' },
    { id: 65, date: '2024-06-02', description: 'Rent Payment', amount: 22000, category: 'Housing', type: 'expense' },
    { id: 66, date: '2024-06-05', description: 'Monsoon Shopping', amount: 6000, category: 'Shopping', type: 'expense' },
    { id: 67, date: '2024-06-07', description: 'Freelance Project F', amount: 25000, category: 'Freelance', type: 'income' },
    { id: 68, date: '2024-06-10', description: 'Restaurant Dinner', amount: 2800, category: 'Food & Dining', type: 'expense' },
    { id: 69, date: '2024-06-12', description: 'Cab Expenses', amount: 1200, category: 'Transport', type: 'expense' },
    { id: 70, date: '2024-06-15', description: 'Electricity Bill', amount: 1800, category: 'Utilities', type: 'expense' },
    { id: 71, date: '2024-06-18', description: 'OTT Subscriptions', amount: 1200, category: 'Entertainment', type: 'expense' },
    { id: 72, date: '2024-06-20', description: 'Grocery Shopping', amount: 3100, category: 'Food & Dining', type: 'expense' },
    { id: 73, date: '2024-06-22', description: 'SIP Investment', amount: 15000, category: 'Investments', type: 'expense' },
    { id: 74, date: '2024-06-25', description: 'Pharmacy', amount: 600, category: 'Healthcare', type: 'expense' },
    { id: 75, date: '2024-06-28', description: 'Internet Bill', amount: 999, category: 'Utilities', type: 'expense' },
  ];

  return transactions.map((t, i) => ({ ...t, id: i + 1 }));
};

export const transactions = generateTransactions();

export const getMonthlyData = (txns) => {
  const months = {};
  txns.forEach(t => {
    const date = new Date(t.date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const label = date.toLocaleString('default', { month: 'short', year: '2-digit' });
    if (!months[key]) months[key] = { key, label, income: 0, expenses: 0 };
    if (t.type === 'income') months[key].income += t.amount;
    else months[key].expenses += t.amount;
  });
  return Object.values(months).sort((a, b) => a.key.localeCompare(b.key)).map(m => ({
    ...m,
    balance: m.income - m.expenses,
    savings: Math.max(0, m.income - m.expenses),
  }));
};

export const getCategoryData = (txns) => {
  const cats = {};
  txns.filter(t => t.type === 'expense').forEach(t => {
    if (!cats[t.category]) cats[t.category] = { name: t.category, value: 0, count: 0 };
    cats[t.category].value += t.amount;
    cats[t.category].count += 1;
  });
  return Object.values(cats).sort((a, b) => b.value - a.value);
};
