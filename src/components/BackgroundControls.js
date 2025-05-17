import React from 'react';
import './BackgroundControls.css';
import '../styles/buttons.css';

const BackgroundControls = ({
  onColorChange,
  onToggleImage,
  onNextBackground,
  onPreviousBackground,
  onOpenGallery,
  currentBackground,
}) => {
  return (
    <div className="background-controls">
      {/* <input
        type="color"
        onChange={(e) => onColorChange(e.target.value)}
        title="Change background color"
        className="color-picker"
      /> */}

      {/* <button onClick={onToggleImage} className="pixel-button">
        Toggle Background
      </button> */}
      <button onClick={onOpenGallery} className="pixel-button gallery-button" title="View all backgrounds">
        Gallery
      </button>
      
      <button onClick={onPreviousBackground} className="pixel-button" title="Previous background">
        Previous
      </button>

      <button onClick={onNextBackground} className="pixel-button" title="Next background">
        Next
      </button>
    </div>
  );
};

export default BackgroundControls; 