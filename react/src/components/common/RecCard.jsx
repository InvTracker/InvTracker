import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const RecCard = ({ item }) => {
  const { addToCart } = useApp();
  const [added, setAdded] = useState(false);
  const disabled = item.status === 'out';

  const handleAdd = () => {
    addToCart(item.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 700);
  };

  const tagText =
    item.status === 'low'
      ? `Only ${item.stock} left today`
      : item.status === 'out'
      ? 'Currently out of stock'
      : 'Pairs with your usual';

  return (
    <div className="rec-card">
      <div className="rec-img">{item.emoji}</div>
      <div className="rec-body">
        <div className="rec-name">{item.name}</div>
        <div className="rec-tag">{tagText}</div>
        <div className="rec-row">
          <span className="rec-price mono">₹{item.price}</span>
          <button
            className={`add-btn ${added ? 'added' : ''}`}
            onClick={handleAdd}
            disabled={disabled}
          >
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecCard;
