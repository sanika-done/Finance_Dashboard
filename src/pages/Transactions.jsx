import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, CATEGORY_COLORS } from '../data/transactions';
import { formatCurrency, formatDate, getMonthOptions } from '../utils/format';
import TransactionModal from '../components/TransactionModal';

export default function Transactions() {
  const { role, transactions, filters, setFilters, addTransaction, editTransaction, deleteTransaction, getFilteredTransactions } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const isAdmin = role === 'admin';
  const filtered = getFilteredTransactions();
  const monthOptions = useMemo(() => getMonthOptions(transactions), [transactions]);

  const handleAdd = (form) => {
    addTransaction(form);
    setShowModal(false);
  };

  const handleEdit = (form) => {
    editTransaction(editTarget.id, form);
    setEditTarget(null);
  };

  const handleDelete = (id) => {
    deleteTransaction(id);
    setDeleteConfirm(null);
  };

  const exportCSV = () => {
    const headers = ['Date', 'Description', 'Category', 'Type', 'Amount'];
    const rows = filtered.map(t => [t.date, t.description, t.category, t.type, t.amount]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const totalIncome = filtered.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="page-body fade-in">
      <div style={{ marginBottom: 24, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2 className="section-title">Transactions</h2>
          <p className="section-sub">
            {filtered.length} transactions · Income: <span style={{ color: 'var(--green)', fontWeight: 600 }}>{formatCurrency(totalIncome)}</span>
            {' · '}Expenses: <span style={{ color: 'var(--red)', fontWeight: 600 }}>{formatCurrency(totalExpense)}</span>
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn btn-ghost" onClick={exportCSV}>⬇ Export CSV</button>
          {isAdmin && (
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="transactions-toolbar" style={{ background: 'var(--bg-surface)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: 16 }}>
        <div className="search-input-wrap" style={{ flex: '1 1 200px' }}>
          <span className="search-icon">⌕</span>
          <input
            className="input search-input"
            placeholder="Search transactions..."
            value={filters.search}
            onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
          />
        </div>

        <select
          className="select select-sm"
          value={filters.month}
          onChange={e => setFilters(prev => ({ ...prev, month: e.target.value }))}
        >
          <option value="all">All Months</option>
          {monthOptions.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
        </select>

        <select
          className="select select-sm"
          value={filters.type}
          onChange={e => setFilters(prev => ({ ...prev, type: e.target.value }))}
        >
          <option value="all">All Types</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          className="select select-sm"
          value={filters.category}
          onChange={e => setFilters(prev => ({ ...prev, category: e.target.value }))}
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>

        <select
          className="select select-sm"
          value={filters.sortBy}
          onChange={e => setFilters(prev => ({ ...prev, sortBy: e.target.value }))}
        >
          <option value="date-desc">Date (Newest)</option>
          <option value="date-asc">Date (Oldest)</option>
          <option value="amount-desc">Amount (High)</option>
          <option value="amount-asc">Amount (Low)</option>
        </select>

        {(filters.search || filters.type !== 'all' || filters.category !== 'all' || filters.month !== 'all') && (
          <button
            className="btn btn-ghost"
            onClick={() => setFilters({ search: '', type: 'all', category: 'all', sortBy: 'date-desc', month: 'all' })}
            style={{ whiteSpace: 'nowrap' }}
          >
            ✕ Clear
          </button>
        )}
      </div>

      {/* Table */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <div className="empty-title">No transactions found</div>
          <div className="empty-sub">Try adjusting your filters or add a new transaction.</div>
        </div>
      ) : (
        <div className="table-wrap">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Type</th>
                <th style={{ textAlign: 'right' }}>Amount</th>
                {isAdmin && <th style={{ textAlign: 'right' }}>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filtered.map(tx => (
                <tr key={tx.id}>
                  <td>
                    <span className="tx-date">{formatDate(tx.date)}</span>
                  </td>
                  <td>
                    <span className="tx-description">{tx.description}</span>
                  </td>
                  <td>
                    <span className="category-pill">
                      <span
                        className="category-dot"
                        style={{ background: CATEGORY_COLORS[tx.category] || '#888' }}
                      />
                      {tx.category}
                    </span>
                  </td>
                  <td>
                    <span className={`type-badge ${tx.type}`}>{tx.type}</span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={tx.type === 'income' ? 'amount-positive' : 'amount-negative'}>
                      {tx.type === 'income' ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                  </td>
                  {isAdmin && (
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 4, justifyContent: 'flex-end' }}>
                        <button className="btn btn-icon" onClick={() => setEditTarget(tx)} title="Edit">✎</button>
                        <button className="btn btn-icon btn-danger" onClick={() => setDeleteConfirm(tx.id)} title="Delete">🗑</button>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!isAdmin && (
        <div style={{ marginTop: 12, padding: '10px 16px', background: 'var(--blue-light)', borderRadius: 'var(--radius-sm)', fontSize: 12.5, color: 'var(--blue)' }}>
          ℹ You are in <strong>Viewer</strong> mode. Switch to <strong>Admin</strong> to add or edit transactions.
        </div>
      )}

      {/* Add Modal */}
      {showModal && <TransactionModal onClose={() => setShowModal(false)} onSave={handleAdd} />}

      {/* Edit Modal */}
      {editTarget && (
        <TransactionModal
          onClose={() => setEditTarget(null)}
          onSave={handleEdit}
          initial={editTarget}
        />
      )}

      {/* Delete Confirm */}
      {deleteConfirm && (
        <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
          <div className="modal" style={{ maxWidth: 380 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Delete Transaction</h2>
              <button className="btn btn-icon" onClick={() => setDeleteConfirm(null)}>✕</button>
            </div>
            <div className="modal-body">
              <p style={{ color: 'var(--text-secondary)', marginBottom: 20 }}>
                Are you sure you want to delete this transaction? This action cannot be undone.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button className="btn btn-ghost" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button
                  className="btn btn-primary"
                  style={{ background: 'var(--red)' }}
                  onClick={() => handleDelete(deleteConfirm)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
