import React, { useMemo } from 'react';
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useApp } from '../context/AppContext';
import { getMonthlyData, getCategoryData, CATEGORY_COLORS } from '../data/transactions';
import { formatCurrency } from '../utils/format';

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="custom-tooltip">
      <div style={{ fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>{label}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span style={{ color: 'var(--text-secondary)' }}>{p.name}:</span>
          <span style={{ fontWeight: 600 }}>{formatCurrency(p.value)}</span>
        </div>
      ))}
    </div>
  );
};

const PieTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="custom-tooltip">
      <div style={{ fontWeight: 600, marginBottom: 4 }}>{d.name}</div>
      <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{formatCurrency(d.value)}</div>
      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{d.payload.percent}%</div>
    </div>
  );
};

export default function Dashboard() {
  const { transactions, getSummary } = useApp();
  const summary = getSummary();
  const monthlyData = useMemo(() => getMonthlyData(transactions), [transactions]);
  const categoryData = useMemo(() => {
    const raw = getCategoryData(transactions);
    const total = raw.reduce((s, c) => s + c.value, 0);
    return raw.slice(0, 6).map(c => ({
      ...c,
      percent: ((c.value / total) * 100).toFixed(1),
    }));
  }, [transactions]);

  const savingsRate = summary.income > 0
    ? ((summary.balance / summary.income) * 100).toFixed(1)
    : 0;

  const lastTwo = monthlyData.slice(-2);
  const momExpenseChange = lastTwo.length === 2 && lastTwo[0].expenses > 0
    ? (((lastTwo[1].expenses - lastTwo[0].expenses) / lastTwo[0].expenses) * 100).toFixed(1)
    : null;

  return (
    <div className="page-body fade-in">
      <div style={{ marginBottom: 24 }}>
        <h2 className="section-title">Overview</h2>
        <p className="section-sub">Your financial summary across all time</p>
      </div>

      {/* Summary Cards */}
      <div className="summary-grid">
        <div className="summary-card balance">
          <div className="summary-icon">💰</div>
          <div className="summary-label">Net Balance</div>
          <div className="summary-value">{formatCurrency(summary.balance, true)}</div>
          <div className="summary-meta">
            <span style={{ color: parseFloat(savingsRate) >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>
              {savingsRate}%
            </span>
            <span>savings rate</span>
          </div>
        </div>

        <div className="summary-card income">
          <div className="summary-icon">↑</div>
          <div className="summary-label">Total Income</div>
          <div className="summary-value">{formatCurrency(summary.income, true)}</div>
          <div className="summary-meta">
            <span>{transactions.filter(t => t.type === 'income').length} transactions</span>
          </div>
        </div>

        <div className="summary-card expense">
          <div className="summary-icon">↓</div>
          <div className="summary-label">Total Expenses</div>
          <div className="summary-value">{formatCurrency(summary.expenses, true)}</div>
          <div className="summary-meta">
            {momExpenseChange !== null && (
              <>
                <span style={{ color: parseFloat(momExpenseChange) > 0 ? 'var(--red)' : 'var(--green)', fontWeight: 600 }}>
                  {parseFloat(momExpenseChange) > 0 ? '▲' : '▼'} {Math.abs(momExpenseChange)}%
                </span>
                <span>vs last month</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-grid">
        {/* Area Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Monthly Cash Flow</span>
            <span className="text-muted">Income vs Expenses</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }}>
                <defs>
                  <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--green)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--red)" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="var(--red)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={v => formatCurrency(v, true)} tick={{ fontSize: 11 }} width={64} />
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="income" name="Income" stroke="var(--green)" fill="url(#incomeGrad)" strokeWidth={2} dot={{ r: 3, fill: 'var(--green)' }} />
                <Area type="monotone" dataKey="expenses" name="Expenses" stroke="var(--red)" fill="url(#expGrad)" strokeWidth={2} dot={{ r: 3, fill: 'var(--red)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card">
          <div className="card-header">
            <span className="card-title">Spending by Category</span>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#888'} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', justifyContent: 'center' }}>
              {categoryData.map(cat => (
                <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--text-secondary)' }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: CATEGORY_COLORS[cat.name] || '#888', display: 'inline-block', flexShrink: 0 }} />
                  {cat.name} <span style={{ color: 'var(--text-muted)' }}>{cat.percent}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Bar Chart */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">Monthly Savings</span>
          <span className="text-muted">Net balance per month</span>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData} margin={{ top: 5, right: 5, bottom: 0, left: 0 }} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="label" tick={{ fontSize: 11 }} />
              <YAxis tickFormatter={v => formatCurrency(v, true)} tick={{ fontSize: 11 }} width={64} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="balance" name="Net Savings" radius={[4, 4, 0, 0]}>
                {monthlyData.map((entry, index) => (
                  <Cell key={index} fill={entry.balance >= 0 ? 'var(--green)' : 'var(--red)'} fillOpacity={0.8} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
