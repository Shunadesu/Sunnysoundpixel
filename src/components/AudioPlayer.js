import React, { useRef, useState, useEffect } from 'react';
import './AudioPlayer.css';
import '../styles/buttons.css';

const songs = [
  {
    title: 'Lovely Winter',
    url: require('../sound/lovelywinter.mp3'),
  },
  {
    title: 'Guitar', 
    url: require('../sound/guitar.mp3'),
  },
  {
    title: 'Sound 1',
    url: require('../sound/sound1.mp3'),
  },
  {
    title: 'Relaxing',
    url: require('../sound/relaxing.mp3'),
  },
  {
    title: 'Daylight',
    url: require('../sound/daylight.mp3'),
  }
];

function formatTime(sec) {
  if (isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

const AudioPlayer = () => {
  const audioRef = useRef(null);
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Playback failed:", error);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSongChange = (e) => {
    const index = parseInt(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentSong(index);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
    if (audioRef.current.duration > 0 && 
        audioRef.current.currentTime >= audioRef.current.duration - 0.1) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (e) => {
    const bar = e.target.getBoundingClientRect();
    const clickX = e.clientX - bar.left;
    const percent = clickX / bar.width;
    const seekTime = percent * duration;
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  return (
    <div className="audio-player">
      <div className="song-list">
        <select 
          value={currentSong}
          onChange={handleSongChange}
          className="pixel-button song-select"
        >
          {songs.map((song, idx) => (
            <option 
              key={song.title} 
              value={idx}
              style={{
                backgroundColor: '#34495e',
                color: '#fff',
                padding: '8px'
              }}
            >
              {song.title}
            </option>
          ))}
        </select>
        
        {/* {currentSong !== null && (
          <div className="song-controls">
            <div className="audio-progress-bar" onClick={handleSeek}>
              <div
                className="audio-progress-bar-fill"
                style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
              />
            </div>
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            <button className="pixel-button play-button" onClick={handlePlayPause}>
              {isPlaying ? '❚❚' : '►'}
            </button>
          </div>
        )} */}
      </div>
      <audio
        ref={audioRef}
        src={songs[currentSong].url}
        preload="auto"
        loop
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />
    </div>
  );
};

export default AudioPlayer;