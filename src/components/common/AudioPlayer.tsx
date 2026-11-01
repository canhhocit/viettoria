import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, FileText, ChevronDown, ChevronUp, Headphones, RotateCcw } from 'lucide-react';
import type { AudioGuideData } from '../../types';

interface AudioPlayerProps {
  audioGuide: AudioGuideData;
  heritageName: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioGuide, heritageName }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(275); // 04:35 default if metadata not loaded
  const [isMuted, setIsMuted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {
        // Handle playback limitation gracefully
        setIsPlaying(true);
      });
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current && !isNaN(audioRef.current.duration)) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleReset = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setCurrentTime(0);
    }
  };

  // Simulating time progress if dummy audio file doesn't stream
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying && (!audioRef.current || audioRef.current.paused)) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  return (
    <div className="bg-forest text-paper border border-brass/40 shadow-xl overflow-hidden corner-frame">
      <audio
        ref={audioRef}
        src={audioGuide.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      {/* Main Player Bar */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Identity & Title */}
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-brass text-[11px] font-mono tracking-widest uppercase">
              <Headphones className="w-3.5 h-3.5" />
              <span>Chuyên Mục Thuyết Minh Di Sản Độc Quyền</span>
            </div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-paper tracking-wide">
              {audioGuide.title}
            </h3>
            <p className="text-xs text-paper/70 font-light">
              Lời dẫn: <span className="text-brass-light font-medium">{audioGuide.narrator || 'Ban Cố Vấn Nghiên Cứu Lịch Sử'}</span> • Thời lượng chuẩn: <span className="font-mono">{audioGuide.duration}</span>
            </p>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleReset}
              className="p-2 border border-paper/20 hover:border-brass text-paper/80 hover:text-brass transition-colors"
              title="Phát lại từ đầu"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-14 h-14 flex items-center justify-center bg-brass text-forest hover:bg-brass-light transition-colors shadow-lg group focus:outline-none"
              aria-label={isPlaying ? 'Tạm dừng thuyết minh' : 'Nghe thuyết minh di sản'}
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className="p-2 border border-paper/20 hover:border-brass text-paper/80 hover:text-brass transition-colors"
              title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Scrubber Progress Bar */}
        <div className="mt-6 space-y-2">
          <input
            type="range"
            min="0"
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-paper/20 accent-brass cursor-pointer"
            aria-label="Tiến trình âm thanh"
          />
          <div className="flex justify-between items-center text-[11px] font-mono text-paper/60">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Toggle Transcript Button */}
        <div className="mt-6 pt-4 border-t border-paper/10 flex items-center justify-between">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brass hover:text-brass-light transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>{showTranscript ? 'Thu Gọn Bản Lời Thoại' : 'Xem Trọn Vẹn Bản Lời Thoại Thuyết Minh'}</span>
            {showTranscript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
          <span className="text-[10px] font-mono text-paper/40 uppercase hidden sm:inline">
            Tư liệu nghiên cứu lịch sử thẩm định
          </span>
        </div>
      </div>

      {/* Expandable Transcript Drawer */}
      {showTranscript && (
        <div className="bg-forest-dark border-t border-brass/30 p-6 sm:p-8 animate-fadeIn">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-paper/10">
              <h4 className="font-serif text-sm font-bold text-brass uppercase tracking-widest">
                Văn Bản Gốc — {heritageName}
              </h4>
              <span className="text-[10px] font-mono text-paper/50 uppercase">Ngữ liệu thuyết minh</span>
            </div>
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-paper/85 leading-relaxed font-light whitespace-pre-line max-h-96 overflow-y-auto pr-3">
              {audioGuide.transcript}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;
