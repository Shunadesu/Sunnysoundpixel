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
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const handleSongChange = (index) => {
    setCurrentSong(index);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    setCurrentTime(0);
    setIsPlaying(true);
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
      <div className="audio-progress-bar-container">
        <span className="audio-time audio-time-current">{formatTime(currentTime)}</span>
        <div className="audio-progress-bar" onClick={handleSeek}>
          <div
            className="audio-progress-bar-fill"
            style={{ width: duration ? `${(currentTime / duration) * 100}%` : '0%' }}
          />
        </div>
        <span className="audio-time audio-time-duration">{formatTime(duration)}</span>
      </div>
      <audio
        ref={audioRef}
        src={songs[currentSong].url}
        autoPlay
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className="audio-controls">
        <button className="pixel-button play-button" onClick={handlePlayPause}>
          {isPlaying ? '❚❚' : '►'}
        </button>
        {songs.map((song, idx) => (
          <button
            key={song.title}
            className={`pixel-button song-button${currentSong === idx ? ' active' : ''}`}
            onClick={() => handleSongChange(idx)}
          >
            {song.title}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AudioPlayer;