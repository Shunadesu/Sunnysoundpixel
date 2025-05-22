import React, { useState, useEffect } from 'react';
import { usePalette } from 'color-thief-react';
import './App.css';
import AudioPlayer from './components/AudioPlayer';
import Clock from './components/Clock';
import BackgroundControls from './components/BackgroundControls';
import BackgroundGallery from './components/BackgroundGallery';
import TopLeftWidgets from './components/TopLeftWidgets';

// Import background images
import background1 from './img/background-1.gif';
import background2 from './img/background-2.gif';
import background3 from './img/background-3.gif';
import background4 from './img/background-4.gif';
import background5 from './img/background-5.gif';
import background6 from './img/background-6.gif';

const backgrounds = [
  { id: 1, url: background1, type: 'gif' },
  { id: 2, url: background2, type: 'gif' },
  { id: 3, url: background3, type: 'gif' },
  { id: 4, url: background4, type: 'gif' },
  { id: 5, url: background5, type: 'gif' },
  { id: 6, url: background6, type: 'gif' },
];

function App() {
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [surroundColor, setSurroundColor] = useState('#000000');
  const [useBackgroundImage, setUseBackgroundImage] = useState(true);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(null);

  const currentBackground = backgrounds[currentBackgroundIndex];
  
  // Get dominant color from current background image
  const { data: palette } = usePalette(currentBackground.url, 5, 'hex', {
    crossOrigin: 'anonymous',
    quality: 10,
  });

  // Update surround color when palette or background changes
  useEffect(() => {
    if (palette && palette.length > 0) {
      setSurroundColor(palette[0]);
    }
  }, [palette, currentBackgroundIndex]);

  const handleModeChange = (mode) => {
    setCurrentTheme(mode.theme);
    if (mode.theme.background) {
      setSurroundColor(mode.theme.background);
    }
  };

  const handleToggleImage = () => {
    setUseBackgroundImage(!useBackgroundImage);
    if (!useBackgroundImage) {
      setCurrentBackgroundIndex(0);
    }
  };

  const handleNextBackground = () => {
    if (useBackgroundImage) {
      setCurrentBackgroundIndex((prev) => (prev + 1) % backgrounds.length);
    }
  };

  const handlePreviousBackground = () => {
    if (useBackgroundImage) {
      setCurrentBackgroundIndex((prev) => (prev - 1 + backgrounds.length) % backgrounds.length);
    }
  };

  const handleSelectBackground = (background) => {
    const index = backgrounds.findIndex(bg => bg.id === background.id);
    setCurrentBackgroundIndex(index);
    setUseBackgroundImage(true);
    setShowGallery(false);
  };

  const handleSurroundColorChange = (newColor) => {
    setSurroundColor(newColor);
  };

  const backgroundStyle = useBackgroundImage ? {
    backgroundImage: `url(${currentBackground.url})`,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: surroundColor,
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    filter: currentTheme?.filter || 'none',
  } : {
    backgroundColor: backgroundColor,
    backgroundImage: 'none',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
  };

  return (
    <>
      {currentTheme?.overlay && (
        <div
          className="theme-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: currentTheme.overlay,
            pointerEvents: 'none',
            zIndex: 1
          }}
        />
      )}
      <div
        className={`app ${useBackgroundImage ? 'background-image' : ''}`}
        style={backgroundStyle}
      >
        <TopLeftWidgets onModeChange={handleModeChange} />
        <Clock />
        <AudioPlayer />
        <BackgroundControls
          onToggleImage={handleToggleImage}
          onNextBackground={handleNextBackground}
          onPreviousBackground={handlePreviousBackground}
          onOpenGallery={() => setShowGallery(true)}
          onSurroundColorChange={handleSurroundColorChange}
          currentBackground={currentBackground}
          surroundColor={surroundColor}
          useBackgroundImage={useBackgroundImage}
          palette={palette}
        />
        {showGallery && (
          <BackgroundGallery
            backgrounds={backgrounds}
            currentBackground={currentBackground}
            onSelect={handleSelectBackground}
            onClose={() => setShowGallery(false)}
          />
        )}
      </div>
    </>
  );
}

export default App; 