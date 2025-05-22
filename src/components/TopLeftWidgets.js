import React, { useState } from 'react';
import './TopLeftWidgets.css';
import '../styles/buttons.css';

const MODES = [
  { 
    label: 'Rain Mode', 
    icon: '🌧️',
    theme: {
      background: '#3a5a78',
      overlay: 'linear-gradient(180deg, rgba(58,90,120,0.2) 0%, rgba(58,90,120,0.4) 100%)',
    }
  },
  { 
    label: 'Night Mode', 
    icon: '🌙',
    theme: {
      background: '#0a192f',
      overlay: 'radial-gradient(circle, rgba(10,25,47,0.8) 0%, rgba(10,25,47,0.95) 100%)',
    }
  },
  { 
    label: 'Lo-fi Mode', 
    icon: '🎵',
    theme: {
      background: '#e6d5ac',
      overlay: 'linear-gradient(0deg, rgba(183,156,128,0.3) 0%, rgba(183,156,128,0.1) 100%)',
    }
  },
];

const TopLeftWidgets = ({ onModeChange }) => {
  const [modeIndex, setModeIndex] = useState(0);
  const currentMode = MODES[modeIndex];

  const handleModeChange = () => {
    const newIndex = (modeIndex + 1) % MODES.length;
    setModeIndex(newIndex);
    if (onModeChange) {
      onModeChange(MODES[newIndex]);
    }
  };

  // Weather mock data
  const weather = {
    icon: '⛅',
    temp: '30°C',
    city: 'HCM City',
  };

  return (
    <>
      {currentMode.label === 'Rain Mode' && (
        <div className="rain-container" data-mode={currentMode.label}>
          {[...Array(30)].map((_, i) => (
            <div key={i} className="rain" style={{
              left: `${Math.random() * 100}%`,
              animationDuration: `${0.7 + Math.random() * 0.3}s`,
              animationDelay: `${Math.random() * 2}s`
            }} />
          ))}
        </div>
      )}

      <div className="top-left-widgets" data-mode={currentMode.label}>
        <div className="widget mode-widget">
          <span className="mode-icon">{currentMode.icon}</span>
          <span className="mode-label">{currentMode.label}</span>
          <button
            className="pixel-button mode-switch"
            title="Switch mode"
            onClick={handleModeChange}
          >
            ⇄
          </button>
        </div>

        <div className="widget weather-widget">
          <span className="weather-icon">{weather.icon}</span>
          <span className="weather-temp">{weather.temp}</span>
          <span className="weather-city">{weather.city}</span>
        </div>
      </div>
    </>
  );
};

export default TopLeftWidgets; 