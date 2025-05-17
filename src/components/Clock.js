import React, { useState, useEffect } from 'react';
import './Clock.css';
import '../styles/buttons.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [is24Hour, setIs24Hour] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const hours = is24Hour ? time.getHours() : time.getHours() % 12 || 12;
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    const ampm = is24Hour ? '' : (time.getHours() >= 12 ? ' PM' : ' AM');
    return `${hours}:${minutes}:${seconds}${ampm}`;
  };

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return time.toLocaleDateString(undefined, options);
  };

  return (
    <div className="clock-container">
      <div className="clock-display">
        <div className="time">{formatTime()}</div>
        <div className="date">{formatDate()}</div>
      </div>
      <button 
        className="pixel-button format-button"
        onClick={() => setIs24Hour(!is24Hour)}
        title={is24Hour ? "Switch to 12-hour format" : "Switch to 24-hour format"}
      >
        {is24Hour ? "12H" : "24H"}
      </button>
    </div>
  );
};

export default Clock; 