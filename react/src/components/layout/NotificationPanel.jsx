import React, { useEffect, useRef } from 'react';

const NotificationPanel = ({ open, onClose }) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target) && !e.target.closest('.bell')) {
        onClose();
      }
    };
    if (open) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open, onClose]);

  return (
    <div ref={panelRef} className={`notif-panel ${open ? 'open' : ''}`}>
      <div className="notif-item">
        <div className="n-t">🔥 Chicken Biryani restocked</div>
        <div className="n-s">25 fresh portions added · Counter 2</div>
      </div>
      <div className="notif-item">
        <div className="n-t">⚠️ Pizza Slices sold out</div>
        <div className="n-s">Next batch ready around 2:30 PM</div>
      </div>
      <div className="notif-item">
        <div className="n-t">🎉 Combo Offer active</div>
        <div className="n-s">Sandwich + Cold Coffee @ ₹95 only</div>
      </div>
    </div>
  );
};

export default NotificationPanel;
