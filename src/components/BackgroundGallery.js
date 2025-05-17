import React from 'react';
import './BackgroundGallery.css';
import '../styles/buttons.css';

const BackgroundGallery = ({ backgrounds, currentBackground, onSelect, onClose }) => {
  return (
    <div className="gallery-overlay">
      <div className="gallery-modal">
        <div className="gallery-header">
          <h2>Background Gallery</h2>
          <button onClick={onClose} className="pixel-button close-button">
            ✕
          </button>
        </div>
        <div className="gallery-grid">
          {backgrounds.map((bg) => (
            <div
              key={bg.id}
              className={`gallery-item ${currentBackground.id === bg.id ? 'active' : ''}`}
              onClick={() => onSelect(bg)}
            >
              <div
                className="gallery-preview"
                style={{ backgroundImage: `url(${bg.url})` }}
              />
              <span className="gallery-label">Background {bg.id}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BackgroundGallery; 