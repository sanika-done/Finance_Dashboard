import React, { useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { useApp } from '../context/AppContext';
import { getCategoryData, getMonthlyData, CATEGORY_COLORS } from '../data/transactions';
import { formatCurrency } from '../utils/format';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
          {p.name}: <strong>{formatCurrency(p.value)}</strong>
        </div>
      ))}
    </div>
  );
};

export default function Insights() {
  const { transactions } = useApp();

  const categoryData = useMemo(() => getCategoryData(transactions), [transactions]);
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);

  const totalExpenses = categoryData.reduce((s, c) => s + c.value, 0);
  const topCategory = categoryData[0];

  const avgMonthlyIncome = useMemo(() => {
    if (!monthlyData.length) return 0;
    return monthlyData.reduce((s, m) => s + m.income, 0) / monthlyData.length;
  }, [monthlyData]);

  const avgMonthlyExpense = useMemo(() => {
    if (!monthlyData.length) return 0;
    return monthlyData.reduce((s, m) => s + m.expenses, 0) / monthlyData.length;
  }, [monthlyData]);

  const bestMonth = useMemo(() => {
    return monthlyData.reduce((best, m) => (!best || m.balance > best.balance) ? m : best, null);
  }, [monthlyData]);

  const worstMonth = useMemo(() => {
    return monthlyData.reduce((worst, m) => (!worst || m.expenses > worst.expenses) ? m : worst, null);
  }, [monthlyData]);

  const lastTwo = monthlyData.slice(-2);
  const momExpenseChange = lastTwo.length === 2 && lastTwo[0].expenses > 0
    ? ((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses * 100).toFixed(1)
    : null;

  const savingsRate = avgMonthlyIncome > 0
    ? (((avgMonthlyIncome - avgMonthlyExpense) / avgMonthlyIncome) * 100).toFixed(1)
    : 0;

  const top5 = categoryData.slice(0, 5);

  return (
    <div className="page-body fade-in">
      <div style={{ marginBottom: 24 }}>
        <h2 className="section-title">Insights</h2>
        <p className="section-sub">Patterns and observations from your financial data</p>
      </div>

      {/* Insight Cards */}
      <div className="insights-grid" style={{ marginBottom: 24 }}>
        {/* Top Spending */}
        <div className="insight-card">
          <div className="insight-header">
            <div className="insight-title">Highest Spending Category</div>
            <div className="insight-icon" style={{ background: 'var(--red-light)' }}>🔥</div>
          </div>
          {topCategory ? (
            <>
              <div className="insight-value" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: CATEGORY_COLORS[topCategory.name] || '#888',
                  display: 'inline-block', flexShrink: 0
                }} />
                {topCategory.name}
              </div>
              <div className="insight-sub">
                <span style={{ color: 'var(--red)', fontWeight: 600 }}>{formatCurrency(topCategory.value)}</span>
                {' '}total · {topCategory.count} transactions ·{' '}
                <span style={{ fontWeight: 600 }}>{((topCategory.value / totalExpenses) * 100).toFixed(1)}%</span> of expenses
              </div>
            </>
          ) : <div className="insight-sub">No data</div>}
        </div>

        {/* Savings Rate */}
        <div className="insight-card">
          <div className="insight-header">
            <div className="insight-title">Avg Monthly Savings Rate</div>
            <div className="insight-icon" style={{ background: 'var(--green-light)' }}>📈</div>
          </div>
          <div className="insight-value" style={{ color: parseFloat(savingsRate) >= 20 ? 'var(--green)' : parseFloat(savingsRate) >= 0 ? 'var(--gold)' : 'var(--red)' }}>
            {savingsRate}%
          </div>
          <div className="insight-sub">
            Avg income: {formatCurrency(avgMonthlyIncome, true)} · Avg expenses: {formatCurrency(avgMonthlyExpense, true)}
          </div>
        </div>

        {/* Best Month */}
        <div className="insight-card">
          <div className="insight-header">
            <div className="insight-title">Best Savings Month</div>
            <div className="insight-icon" style={{ background: 'var(--gold-light)' }}>⭐</div>
          </div>
          {bestMonth ? (
            <>
              <div className="insight-value">{bestMonth.label}</div>
              <div className="insight-sub">
                Saved <span style={{ color: 'var(--green)', fontWeight: 600 }}>{formatCurrency(bestMonth.balance)}</span>
                {' '}· Income: {formatCurrency(bestMonth.income, true)} · Expenses: {formatCurrency(bestMonth.expenses, true)}
              </div>
            </>
          ) : <div className="insight-sub">No data</div>}
        </div>

        {/* MoM Change */}
        <div className="insight-card">
          <div className="insight-header">
            <div className="insight-title">Month-on-Month Expenses</div>
            <div className="insight-icon" style={{ background: 'var(--blue-light)' }}>↕</div>
          </div>
          {momExpenseChange !== null ? (
            <>
              <div className="insight-value" style={{ color: parseFloat(momExpenseChange) > 0 ? 'var(--red)' : 'var(--green)' }}>
                {parseFloat(momExpenseChange) > 0 ? '▲' : '▼'} {Math.abs(momExpenseChange)}%
              </div>
              <div className="insight-sub">
                {lastTwo[0].label}: {formatCurrency(lastTwo[0].expenses, true)} →{' '}
                {lastTwo[1].label}: {formatCurrency(lastTwo[1].expenses, true)}
              </div>
            </>
          ) : (
            <div className="insight-sub">Not enough monthly data</div>
          )}
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16, marginBottom: 24 }}>
        {/* Category Bar */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Expense Breakdown</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={top5} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={v => formatCurrency(v, true)} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} width={80} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" name="Spent" radius={[0, 4, 4, 0]} barSize={18}>
                  {top5.map((entry) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#888'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Progress */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Share of Expenses</span>
          </div>
          <div className="card-body">
            <div className="progress-list">
              {top5.map(cat => {
                const pct = ((cat.value / totalExpenses) * 100).toFixed(1);
                return (
                  <div key={cat.name} className="progress-item">
                    <div className="progress-item-header">
                      <span className="progress-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: CATEGORY_COLORS[cat.name] || '#888', display: 'inline-block' }} />
                        {cat.name}
                      </span>
                      <span className="progress-value">{formatCurrency(cat.value, true)} · {pct}%</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${pct}%`, background: CATEGORY_COLORS[cat.name] || '#888' }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Comparison */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Monthly Comparison</span>
          <span className="text-muted">Income vs Expenses per month</span>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barGap={2}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={v => formatCurrency(v, true)} tick={{ fontSize: 11 }} width={64} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="income" name="Income" fill="var(--green)" radius={[3, 3, 0, 0]} barSize={18} fillOpacity={0.8} />
              <Bar dataKey="expenses" name="Expenses" fill="var(--red)" radius={[3, 3, 0, 0]} barSize={18} fillOpacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
