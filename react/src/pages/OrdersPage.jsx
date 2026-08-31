import React from 'react';
import { useApp } from '../context/AppContext';

const OrdersPage = () => {
  const { orders, switchPage } = useApp();

  return (
    <div className="page active">
      <div className="panel">
        <div className="panel-title">Order History & Active Tokens</div>
        <div className="panel-sub">Track active orders or review previous meal receipts</div>

        <div className="stub-list">
          {orders.map((o) => (
            <div key={o.id} className="stub-list-item">
              <div className="stub-icon">{o.icon}</div>
              <div className="stub-info">
                <div className="t">{o.title}</div>
                <div className="s">{o.when}</div>
              </div>
              <div>
                <div className="stub-amt mono">₹{o.amt}</div>
                <div className={`stub-status ${o.status === 'Delivered' ? 'done' : 'progress'}`}>
                  {o.status}
                </div>
              </div>
              <div className="stub-actions">
                <button className="mini-btn" onClick={() => switchPage('home')}>
                  Track
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
