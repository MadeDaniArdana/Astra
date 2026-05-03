'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAudioStore } from '@/store/useAudioStore';
import { audioSamples } from '@/data/mockData';

// Public domain / free-to-use audio samples (via Freesound & Archive.org)
const audioUrls: Record<string, string> = {
  'gamelan-01': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  'saman-01':   'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  'kolintang-01': 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
};

interface AudioPlayerProps {
  trackId?: string;
  compact?: boolean;
}

export default function AudioPlayer({ trackId, compact = false }: AudioPlayerProps) {
  const { currentTrackId, isPlaying, setTrack, togglePlay, volume, setVolume } = useAudioStore();
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const track = trackId
    ? audioSamples.find((s) => s.id === trackId)
    : audioSamples[0];

  if (!track) return null;

  const isThisTrackPlaying = currentTrackId === track.id && isPlaying;

  // Create / update audio element
  useEffect(() => {
    const url = audioUrls[track.id];
    if (!url) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(url);
      audioRef.current.preload = 'metadata';
    } else if (audioRef.current.src !== url) {
      audioRef.current.src = url;
      audioRef.current.load();
    }

    const audio = audioRef.current;
    audio.volume = muted ? 0 : volume;

    const handleTimeUpdate = () => {
      if (audio.duration) setProgress(audio.currentTime / audio.duration);
    };
    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };
    const handleEnded = () => {
      setProgress(0);
      togglePlay();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [track.id, volume, muted]);

  // Play / pause when store changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isThisTrackPlaying) {
      audio.play().catch(() => {/* autoplay blocked */});
    } else {
      audio.pause();
    }
  }, [isThisTrackPlaying]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  const handlePlay = () => {
    if (currentTrackId === track.id) {
      togglePlay();
    } else {
      // Pause previous
      if (audioRef.current) audioRef.current.pause();
      setTrack(track.id);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
    setProgress(ratio);
  };

  const formatTime = (secs: number) => {
    if (!secs || isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlay}
          className="w-9 h-9 rounded-full bg-[#D4A853] flex items-center justify-center hover:bg-[#E8C878] transition-colors flex-shrink-0"
        >
          {isThisTrackPlaying ? (
            <Pause size={14} fill="currentColor" className="text-[#0E0B08]" />
          ) : (
            <Play size={14} fill="currentColor" className="text-[#0E0B08] ml-0.5" />
          )}
        </button>
        <div className="flex items-end gap-[3px] h-8">
          {track.waveHeights.map((h, i) => (
            <div
              key={i}
              className="waveform-bar opacity-80"
              style={{
                height: `${h}px`,
                animationDelay: isThisTrackPlaying ? `${i * 0.05}s` : '0s',
                animationPlayState: isThisTrackPlaying ? 'running' : 'paused',
                opacity: isThisTrackPlaying ? 0.9 : 0.4,
              }}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-none p-5">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p
            className="text-[#D4A853] text-xs tracking-[0.15em] uppercase mb-1"
            style={{ fontFamily: "'Courier New', monospace" }}
          >
            {track.category}
          </p>
          <h4 className="text-[#F2E8D5] font-serif text-lg">{track.title}</h4>
          <p className="text-[#A08B6E] text-sm">{track.artist}</p>
        </div>
        <span
          className="text-[#A08B6E] text-xs"
          style={{ fontFamily: "'Courier New', monospace" }}
        >
          {formatTime(duration > 0 ? audioRef.current?.currentTime || 0 : 0)} / {track.duration}
        </span>
      </div>

      {/* Waveform / progress bars */}
      <div
        className="flex items-end gap-[2px] h-12 mb-2 cursor-pointer"
        onClick={handleSeek}
      >
        {track.waveHeights.map((h, i) => {
          const barProgress = i / track.waveHeights.length;
          const isPast = barProgress <= progress;
          return (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all duration-75"
              style={{
                height: `${h * 3}px`,
                maxHeight: '48px',
                background: hoveredBar === i
                  ? '#E8C878'
                  : isPast
                  ? `rgba(212,168,83, ${0.7 + (h / 14) * 0.3})`
                  : `rgba(212,168,83, 0.2)`,
                animationPlayState: isThisTrackPlaying ? 'running' : 'paused',
              }}
              onMouseEnter={() => setHoveredBar(i)}
              onMouseLeave={() => setHoveredBar(null)}
            />
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full h-0.5 bg-[rgba(212,168,83,0.15)] mb-4 cursor-pointer" onClick={handleSeek}>
        <div
          className="h-full bg-[#D4A853] transition-all duration-100"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={handlePlay}
          className="w-10 h-10 rounded-full bg-[#D4A853] flex items-center justify-center hover:bg-[#E8C878] transition-colors"
        >
          {isThisTrackPlaying ? (
            <Pause size={16} fill="currentColor" className="text-[#0E0B08]" />
          ) : (
            <Play size={16} fill="currentColor" className="text-[#0E0B08] ml-0.5" />
          )}
        </button>

        {/* Volume slider */}
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={() => setMuted(!muted)}
            className="text-[#A08B6E] hover:text-[#D4A853] transition-colors"
          >
            {muted || volume === 0 ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setMuted(false);
              setVolume(parseFloat(e.target.value));
            }}
            className="w-20 accent-[#D4A853] cursor-pointer"
            style={{ accentColor: '#D4A853' }}
          />
        </div>
      </div>
    </div>
  );
}
