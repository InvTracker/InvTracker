import React from 'react';
import { useApp } from '../context/AppContext';
import RecCard from '../components/common/RecCard';

const ForYouPage = () => {
  const { menuItems } = useApp();
  const availableItems = menuItems.filter((m) => m.status !== 'out');

  return (
    <div className="page active">
      <div className="section-head" style={{ marginTop: 0 }}>
        <div className="section-title">Personalised "For You" Recommendations</div>
      </div>

      <div className="rec-grid">
        {availableItems.length === 0 ? (
          <div className="empty-state" style={{ gridColumn: '1 / -1', padding: '40px 16px', textAlign: 'center' }}>
            <div className="em">✨</div>
            <div style={{ fontSize: '15px', fontWeight: 600 }}>No personalized picks available yet</div>
            <p style={{ marginTop: '6px', color: 'var(--md-sys-color-on-surface-variant)', fontSize: '13px' }}>
              Click "Enter Example Data" at the top to generate a sample menu.
            </p>
          </div>
        ) : (
          availableItems.map((item) => (
            <RecCard key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default ForYouPage;
