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
        {availableItems.map((item) => (
          <RecCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ForYouPage;
