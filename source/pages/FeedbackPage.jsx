import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

const FeedbackPage = () => {
  const { addToast } = useApp();
  const [stars, setStars] = useState(0);
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!stars) {
      addToast('Pick a star rating first');
      return;
    }
    addToast('Thanks — feedback submitted!');
    setStars(0);
    setText('');
  };

  return (
    <div className="page active">
      <div className="panel" style={{ maxWidth: '600px' }}>
        <div className="panel-title">Order & Canteen Feedback</div>
        <div className="panel-sub">Let cafeteria staff know about food quality & service speed</div>

        <div className="stars">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              className={`star ${val <= stars ? 'on' : ''}`}
              onClick={() => setStars(val)}
            >
              ★
            </button>
          ))}
        </div>

        <div className="field">
          <label>Comments & Suggestions</label>
          <textarea
            placeholder="Tell us what you loved or what needs improvement..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button className="fb-btn" style={{ marginTop: '12px' }} onClick={handleSubmit}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage;
