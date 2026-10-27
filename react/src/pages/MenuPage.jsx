import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';

const MenuPage = () => {
  const { menuItems, activeCat, setActiveCat, searchQuery, addToCart } = useApp();
  const [addedIds, setAddedIds] = useState({});

  const categories = ['All', ...new Set(menuItems.map((m) => m.cat))];

  const handleAdd = (id) => {
    addToCart(id);
    setAddedIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [id]: false }));
    }, 700);
  };

  const filteredItems = menuItems.filter((m) => {
    const matchesCat = activeCat === 'All' || m.cat === activeCat;
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.trim().toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="page active">
      <div className="filter-row">
        {categories.map((c) => (
          <button
            key={c}
            className={`filter-chip ${activeCat === c ? 'active' : ''}`}
            onClick={() => setActiveCat(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filteredItems.length > 0 ? (
          filteredItems.map((it) => {
            const disabled = it.status === 'out';
            const isAdded = addedIds[it.id];
            return (
              <div key={it.id} className="menu-card">
                <div className="menu-emoji">{it.emoji}</div>
                <div className="menu-info">
                  <div className="mn">{it.name}</div>
                  <div className="mc">{it.cat}</div>
                  <div className="mrow">
                    <span className="rec-price mono">₹{it.price}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <StatusBadge status={it.status} />
                      <button
                        className={`add-btn ${isAdded ? 'added' : ''}`}
                        onClick={() => handleAdd(it.id)}
                        disabled={disabled}
                      >
                        {isAdded ? '✓' : '+'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          menuItems.length === 0 ? (
            <div className="empty-state" style={{ gridColumn: '1 / -1', padding: '48px 16px', textAlign: 'center' }}>
              <div className="em">🍽️</div>
              <div style={{ fontSize: '16px', fontWeight: 600, marginTop: '8px' }}>No menu items available</div>
              <p style={{ marginTop: '6px', color: 'var(--md-sys-color-on-surface-variant)', fontSize: '13px' }}>
                The catalog is currently empty. Click "Enter Example Data" at the top to populate random campus food items.
              </p>
            </div>
          ) : (
            <div className="empty-state" style={{ gridColumn: '1 / -1', padding: '36px 16px', textAlign: 'center' }}>
              <div className="em">🔍</div>
              No items match your search or filter.
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MenuPage;
