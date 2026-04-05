import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/transactions';

const EMPTY = {
  description: '',
  amount: '',
  category: 'Food & Dining',
  type: 'expense',
  date: new Date().toISOString().split('T')[0],
};

export default function TransactionModal({ onClose, onSave, initial = null }) {
  const [form, setForm] = useState(initial ? {
    description: initial.description,
    amount: initial.amount,
    category: initial.category,
    type: initial.type,
    date: initial.date,
  } : EMPTY);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const errs = {};
    if (!form.description.trim()) errs.description = 'Required';
    if (!form.amount || isNaN(form.amount) || parseFloat(form.amount) <= 0) errs.amount = 'Enter valid amount';
    if (!form.date) errs.date = 'Required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onSave(form);
  };

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <div className="modal-header">
          <h2 className="modal-title">{initial ? 'Edit Transaction' : 'New Transaction'}</h2>
          <button className="btn btn-icon" onClick={onClose}>✕</button>
        </div>

        <form className="modal-body" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Description</label>
            <input
              className="input"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="e.g., Monthly Salary"
              autoFocus
            />
            {errors.description && <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.description}</div>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Amount (₹)</label>
              <input
                className="input"
                name="amount"
                type="number"
                min="0"
                step="0.01"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
              />
              {errors.amount && <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.amount}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Date</label>
              <input
                className="input"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
              />
              {errors.date && <div style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.date}</div>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="select" name="type" value={form.type} onChange={handleChange}>
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="select" name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              {initial ? 'Save Changes' : '+ Add Transaction'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
