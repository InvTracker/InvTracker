import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import StatusBadge from '../components/common/StatusBadge';

export const FOR_YOU_ITEMS = [
  {
    id: 'foryou-1',
    name: 'Smoky Paneer Tikka Roll',
    emoji: 'lunch_dining',
    price: 135,
    cat: 'Wraps & Rolls',
    status: 'available',
    recReason: '98% Match - Frequently paired with Cold Coffee'
  },
  {
    id: 'foryou-2',
    name: 'Spicy Schezwan Hakka Noodles',
    emoji: 'ramen_dining',
    price: 110,
    cat: 'Asian Wok',
    status: 'available',
    recReason: 'Evening Pick - Wok-tossed fresh on order'
  },
  {
    id: 'foryou-3',
    name: 'Crispy Chicken Tenders & Fries',
    emoji: 'fastfood',
    price: 160,
    cat: 'Snacks & Combos',
    status: 'available',
    recReason: '#1 Campus Combo - High Reorder Velocity'
  },
  {
    id: 'foryou-4',
    name: 'Royal North Indian Thali',
    emoji: 'dinner_dining',
    price: 195,
    cat: 'Full Meals',
    status: 'available',
    recReason: 'Complete Lunch - Balanced nutrition & fresh phulkas'
  },
  {
    id: 'foryou-5',
    name: 'Truffle Mushroom Melt Panini',
    emoji: 'bakery_dining',
    price: 125,
    cat: 'Artisan Cafe',
    status: 'available',
    recReason: 'Gourmet Pick - 3-Cheese blend on sourdough'
  },
  {
    id: 'foryou-6',
    name: 'Steamed Chicken Dimsums (6 pcs)',
    emoji: 'takeout_dining',
    price: 120,
    cat: 'Street Bites',
    status: 'available',
    recReason: 'Quick Grab - Steaming hot in 5 mins'
  },
  {
    id: 'foryou-7',
    name: 'Biscoff Caramel Frappe',
    emoji: 'local_cafe',
    price: 95,
    cat: 'Beverages',
    status: 'available',
    recReason: 'local_cafe Energy Boost - Real Lotus Biscoff & espresso'
  },
  {
    id: 'foryou-8',
    name: 'Berry Burst Belgian Waffle',
    emoji: 'cake',
    price: 85,
    cat: 'Desserts',
    status: 'available',
    recReason: 'Dessert Pairing - Made fresh on Belgian iron'
  }
];

const ForYouPage = () => {
  const { addToCart } = useApp();
  const [addedIds, setAddedIds] = useState({});

  const handleAdd = (id) => {
    addToCart(id);
    setAddedIds((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [id]: false }));
    }, 700);
  };

  return (
    <div className="page active">
      <div className="section-head" style={{ marginTop: 0 }}>
        <div>
          <div className="section-title">Chef Recommendations &amp; Curated Combos - For You</div>
          <div style={{ fontSize: '12.5px', color: 'var(--md-sys-color-on-surface-variant)', marginTop: '4px' }}>
            Personalized meal pairings, combos, and chef specials crafted uniquely for you
          </div>
        </div>
      </div>

      <div className="menu-grid">
        {FOR_YOU_ITEMS.map((it) => {
          const disabled = it.status === 'out';
          const isAdded = addedIds[it.id];
          return (
            <div key={it.id} className="menu-card">
              <div className="menu-emoji"><span className="material-symbols-outlined">{it.emoji}</span></div>
              <div className="menu-info">
                <div className="mn">{it.name}</div>
                {it.recReason && <div className="rec-pill-badge">{it.recReason}</div>}
                <div className="mc">{it.cat}</div>
                <div className="mrow">
                  <span className="rec-price mono">Rs {it.price}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <StatusBadge status={it.status} />
                    <button
                      className={`add-btn ${isAdded ? 'added' : ''}`}
                      onClick={() => handleAdd(it.id)}
                      disabled={disabled}
                    >
                      {isAdded ? 'Added' : '+'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForYouPage;
