import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, X, Square } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';

import './MusicPlayer.css';

// Import Assets
import loserImg from '../../assets/music/loser.jpg';
import loserAudio from '../../assets/music/Loser_spotdown.org.mp3';

import draculaImg from '../../assets/music/dracula.jpg';
import draculaAudio from '../../assets/music/Dracula_spotdown.org.mp3';

import iAintWorriedImg from '../../assets/music/i-ain-t-worried.jpg';
import iAintWorriedAudio from '../../assets/music/I Ain\'t Worried_spotdown.org.mp3';

import lightItUpImg from '../../assets/music/light-it-up.jpg';
import lightItUpAudio from '../../assets/music/LIGHT IT UP_spotdown.org.mp3';

import loseMyMindImg from '../../assets/music/Lose My Mind.jpg';
import loseMyMindAudio from '../../assets/music/Lose My Mind (feat. Doja Cat) [From F1® The Movie]_spotdown.org.mp3';

import starboyImg from '../../assets/music/Starboy.jpg';
import starboyAudio from '../../assets/music/Starboy_spotdown.org.mp3';

// Format time (seconds to mm:ss)
const formatTime = (time) => {
  if (time && !isNaN(time)) {
    const minutes = Math.floor(time / 60);
    const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(time % 60);
    const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${formatMinutes}:${formatSeconds}`;
  }
  return '00:00';
};

const MusicPlayer = ({ isOpen, onClose }) => {
  const audioRef = useRef(null);
  const swiperRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(2); // Start at middle index

  // Initialize playlist once
  const playlist = useMemo(() => {
    const tracks = [
      { id: 'dracula', title: 'Dracula', artist: 'Tame Impala', cover: draculaImg, src: draculaAudio },
      { id: 'i-aint-worried', title: 'I Ain\'t Worried', artist: 'OneRepublic', cover: iAintWorriedImg, src: iAintWorriedAudio },
      { id: 'light-it-up', title: 'Light It Up', artist: 'Major Lazer', cover: lightItUpImg, src: lightItUpAudio },
      { id: 'lose-my-mind', title: 'Lose My Mind', artist: 'Doja Cat', cover: loseMyMindImg, src: loseMyMindAudio },
      { id: 'starboy', title: 'Starboy', artist: 'The Weeknd', cover: starboyImg, src: starboyAudio },
    ];
    
    // Shuffle the other tracks
    for (let i = tracks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tracks[i], tracks[j]] = [tracks[j], tracks[i]];
    }

    // Always put Loser in the middle
    const loserTrack = { id: 'loser', title: 'Loser', artist: 'Tame Impala', cover: loserImg, src: loserAudio };
    const mid = Math.floor(tracks.length / 2); // 2
    tracks.splice(mid, 0, loserTrack);
    
    return tracks;
  }, []);

  const currentTrack = playlist[activeIndex];

  // Handle Audio Events
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleEnded = () => {
    let nextIndex = activeIndex + 1;
    if (nextIndex >= playlist.length) {
      nextIndex = 0;
    }
    
    setActiveIndex(nextIndex);
    
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(nextIndex);
    }
    
    setIsPlaying(true);
  };

  const isInitialMount = useRef(true);

  // Auto-play when activeIndex changes and isPlaying is true.
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    if (isPlaying && audioRef.current) {
      const playPromise = setTimeout(() => {
        if (audioRef.current) audioRef.current.play().catch(e => console.log(e));
      }, 50);
      return () => clearTimeout(playPromise);
    }
  }, [activeIndex]);

  // Play/Pause toggle
  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  // Change track based on Swiper slide change
  const handleSlideChange = (swiper) => {
    if (swiper.realIndex !== activeIndex) {
      setActiveIndex(swiper.realIndex);
    }
  };

  // Seek bar change
  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  // Volume change
  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0) setIsMuted(false);
    if (audioRef.current) {
      audioRef.current.volume = val;
    }
  };

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  // Stop button (pause and reset to 0)
  const handleStop = () => {
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Navigation controls
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);
  // Music will continue playing in the background even if player is closed

  return (
    <>
      <audio 
        ref={audioRef}
        src={currentTrack.src}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      />
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="music-player-overlay"
            style={{ transformOrigin: 'top center', perspective: '1200px' }}
            initial={{ opacity: 0, rotateX: -90, scaleX: 0.3, y: -20 }}
            animate={{ opacity: 1, rotateX: 0, scaleX: 1, y: 0 }}
            exit={{ opacity: 0, rotateX: -90, scaleX: 0.3, y: -20 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="close-player-btn" onClick={onClose} aria-label="Close Music Player">
              <X size={18} />
            </button>

          <div className="music-carousel">
            <Swiper
              ref={swiperRef}
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={2}
              loop={false}
              initialSlide={activeIndex}
              coverflowEffect={{
                rotate: 40,
                stretch: 10,
                depth: 250,
                modifier: 1.5,
                slideShadows: true,
                scale: 0.85,
              }}
              modules={[EffectCoverflow]}
              onSlideChange={handleSlideChange}
              speed={800}
              className="mySwiper"
            >
              {playlist.map((track) => (
                <SwiperSlide key={track.id}>
                  <img src={track.cover} alt={track.title} className="slide-img" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="track-info">
            <h3 className="song-name">{currentTrack.title}</h3>
            <p className="singer-name">{currentTrack.artist}</p>
          </div>

          <div className="controls-bar">
            <div className="playback-controls">
              <button className="control-btn" onClick={handleStop} title="Stop"><Square size={18} fill="currentColor" /></button>
              
              <div className="main-controls">
                <button className="control-btn" onClick={handlePrev}><SkipBack size={20} fill="currentColor" /></button>
                <button className="control-btn play-btn" onClick={togglePlayPause}>
                  {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                </button>
                <button className="control-btn" onClick={handleNext}><SkipForward size={20} fill="currentColor" /></button>
              </div>
              
              <button className="control-btn" onClick={toggleMute} title={isMuted || volume === 0 ? "Unmute" : "Mute"}>
                {isMuted || volume === 0 ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </div>

            <div className="progress-container">
              <span>{formatTime(currentTime)}</span>
              <input 
                type="range" 
                className="progress-bar"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                style={{
                  background: `linear-gradient(to right, #10B981 ${(currentTime / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.2) ${(currentTime / (duration || 1)) * 100}%)`
                }}
              />
              <span>{formatTime(duration)}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default MusicPlayer;
