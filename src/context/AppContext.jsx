import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { transactions as initialTransactions } from '../data/transactions';

const AppContext = createContext();

const STORAGE_KEY = 'finium_transactions';
const ROLE_KEY = 'finium_role';
const THEME_KEY = 'finium_theme';

export const AppProvider = ({ children }) => {
  const [role, setRole] = useState(() => localStorage.getItem(ROLE_KEY) || 'viewer');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem(THEME_KEY) === 'dark');
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialTransactions;
  });
  const [activeTab, setActiveTab] = useState('dashboard');

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    sortBy: 'date-desc',
    month: 'all',
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem(ROLE_KEY, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(THEME_KEY, darkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, []);

  const addTransaction = useCallback((tx) => {
    const newTx = { ...tx, id: Date.now(), amount: parseFloat(tx.amount) };
    setTransactions(prev => [newTx, ...prev]);
  }, []);

  const editTransaction = useCallback((id, updates) => {
    setTransactions(prev => prev.map(tx =>
      tx.id === id ? { ...tx, ...updates, amount: parseFloat(updates.amount) } : tx
    ));
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  }, []);

  const getFilteredTransactions = useCallback(() => {
    let result = [...transactions];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(tx =>
        tx.description.toLowerCase().includes(q) ||
        tx.category.toLowerCase().includes(q)
      );
    }
    if (filters.type !== 'all') result = result.filter(tx => tx.type === filters.type);
    if (filters.category !== 'all') result = result.filter(tx => tx.category === filters.category);
    if (filters.month !== 'all') result = result.filter(tx => tx.date.startsWith(filters.month));

    switch (filters.sortBy) {
      case 'date-desc': result.sort((a, b) => new Date(b.date) - new Date(a.date)); break;
      case 'date-asc': result.sort((a, b) => new Date(a.date) - new Date(b.date)); break;
      case 'amount-desc': result.sort((a, b) => b.amount - a.amount); break;
      case 'amount-asc': result.sort((a, b) => a.amount - b.amount); break;
    }

    return result;
  }, [transactions, filters]);

  const getSummary = useCallback(() => {
    const income = transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
    return { income, expenses, balance: income - expenses };
  }, [transactions]);

  return (
    <AppContext.Provider value={{
      role, setRole,
      darkMode, setDarkMode,
      transactions, setTransactions,
      addTransaction, editTransaction, deleteTransaction,
      filters, setFilters,
      getFilteredTransactions,
      getSummary,
      activeTab, setActiveTab,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
