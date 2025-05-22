import React from 'react';
import './BackgroundControls.css';

const BackgroundControls = ({
  onToggleImage,
  onNextBackground,
  onPreviousBackground,
  onOpenGallery,
  onSurroundColorChange,
  currentBackground,
  surroundColor,
  useBackgroundImage,
  palette
}) => {
  return (
    <div className="background-controls">
      <button className="pixel-button" onClick={onPreviousBackground}>
        Previous
      </button>
      <button className="pixel-button" onClick={onOpenGallery}>
        Gallery
      </button>
      <button className="pixel-button" onClick={onNextBackground}>
        Next
      </button>
      {useBackgroundImage && palette && (
        <div className="color-palette">
          {palette.map((color) => (
            <button
              key={color}
              className={`color-button ${color === surroundColor ? 'active' : ''}`}
              style={{
                backgroundColor: color,
                boxShadow: color === surroundColor ? '0 0 0 2px #fff' : 'none'
              }}
              onClick={() => onSurroundColorChange(color)}
              title="Change background color"
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Helper function to determine if a color is dark
function isColorDark(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness < 128;
}

export default BackgroundControls; 