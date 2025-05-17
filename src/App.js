import React, { useState } from 'react';
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
  const [useBackgroundImage, setUseBackgroundImage] = useState(true);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const handleColorChange = (color) => {
    setBackgroundColor(color);
    setUseBackgroundImage(false);
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

  const currentBackground = backgrounds[currentBackgroundIndex];

  const backgroundStyle = useBackgroundImage ? {
    backgroundImage: `url(${currentBackground.url})`,
    backgroundSize: 'contain',
    backgroundPosition: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'transparent'
  } : {
    backgroundColor: backgroundColor,
    backgroundImage: 'none'
  };

  return (
    <div
      className={`app ${useBackgroundImage ? 'background-image' : ''}`}
      style={backgroundStyle}
    >
      <TopLeftWidgets />
      <Clock />
      <AudioPlayer />
      <BackgroundControls
        onColorChange={handleColorChange}
        onToggleImage={handleToggleImage}
        onNextBackground={handleNextBackground}
        onPreviousBackground={handlePreviousBackground}
        onOpenGallery={() => setShowGallery(true)}
        currentBackground={currentBackground}
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
  );
}

export default App;