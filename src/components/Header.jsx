import React from 'react';
import { useApp } from '../context/AppContext';

const PAGE_TITLES = {
  dashboard: 'Dashboard',
  transactions: 'Transactions',
  insights: 'Insights',
};

export default function Header({ onMenuToggle }) {
  const { role, setRole, darkMode, setDarkMode } = useApp();
  const { activeTab } = useApp();

  return (
    <header className="page-header">
      <div className="header-left">
        <button className="mobile-menu-btn" onClick={onMenuToggle} aria-label="Toggle menu">
          ☰
        </button>
        <h1 className="page-title">{PAGE_TITLES[activeTab]}</h1>
      </div>

      <div className="header-right">
        {/* Dark Mode Toggle */}
        <button
          className="btn btn-ghost"
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Light mode' : 'Dark mode'}
          style={{ padding: '7px 10px', fontSize: 16 }}
        >
          {darkMode ? '☀' : '◑'}
        </button>

        {/* Role Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>Role:</span>
          <select
            className="select"
            value={role}
            onChange={e => setRole(e.target.value)}
            style={{ width: 'auto', padding: '6px 28px 6px 10px', fontSize: 13 }}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
          <span className={`role-badge ${role}`}>{role}</span>
        </div>
      </div>
    </header>
  );
}
