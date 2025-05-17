import React, { useState } from 'react';
import './TopLeftWidgets.css';
import '../styles/buttons.css';

const MODES = [
  { label: 'Chill Mode', icon: '🎧' },
  { label: 'Night Mode', icon: '🌙' },
  { label: 'Lo-fi Mode', icon: '🎵' },
];

const EVENTS = [
  { date: '2025-05-20', name: 'Release v2.0' },
  { date: '2025-06-01', name: 'Summer Chill Event' },
];

const TopLeftWidgets = () => {
  const [modeIndex, setModeIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);

  // Weather mock data
  const weather = {
    icon: '⛅',
    temp: '30°C',
    city: 'HCM City',
  };

  // Get next event
  const today = new Date();
  const nextEvent = EVENTS.find(e => new Date(e.date) >= today);

  return (
    <div className="top-left-widgets">
      {/* Mode/Status */}
      <div className="widget mode-widget">
        <span className="mode-icon">{MODES[modeIndex].icon}</span>
        <span className="mode-label">{MODES[modeIndex].label}</span>
        <button
          className="pixel-button mode-switch"
          title="Switch mode"
          onClick={() => setModeIndex((modeIndex + 1) % MODES.length)}
        >
          ⇄
        </button>
      </div>

      {/* Settings Button */}
      {/* <button
        className="pixel-button settings-btn"
        title="Settings"
        onClick={() => setShowSettings(!showSettings)}
      >
        ⚙️
      </button>
      {showSettings && (
        <div className="widget settings-menu">
          <div className="settings-title">Settings</div>
          <div className="settings-item">(Coming soon...)</div>
        </div>
      )} */}

      {/* Weather Widget */}
      <div className="widget weather-widget">
        <span className="weather-icon">{weather.icon}</span>
        <span className="weather-temp">{weather.temp}</span>
        <span className="weather-city">{weather.city}</span>
      </div>

      {/* Event Widget */}
      {/* <div className="widget event-widget">
        <span className="event-title">Next Event:</span>
        {nextEvent ? (
          <span className="event-detail">{nextEvent.name} ({nextEvent.date})</span>
        ) : (
          <span className="event-detail">No upcoming events</span>
        )}
      </div> */}
    </div>
  );
};

export default TopLeftWidgets; 