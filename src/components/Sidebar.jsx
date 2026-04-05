import React from 'react';
import { useApp } from '../context/AppContext';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '⬡' },
  { id: 'transactions', label: 'Transactions', icon: '⇄' },
  { id: 'insights', label: 'Insights', icon: '◎' },
];

export default function Sidebar({ open, onClose }) {
  const { activeTab, setActiveTab } = useApp();

  const handleNav = (id) => {
    setActiveTab(id);
    onClose?.();
  };

  return (
    <>
      <div className={`sidebar-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="sidebar-logo">
            <div className="sidebar-logo-dot" />
            Finium
          </div>
          <div className="sidebar-tagline">Personal Finance</div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-label">Menu</div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="text-muted" style={{ fontSize: 11, textAlign: 'center' }}>
            Finium v1.0 · 2024
          </div>
        </div>
      </aside>
    </>
  );
}
