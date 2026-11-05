import React, { useEffect, useRef, useState } from 'react';
import { ArrowUp, ChevronDown, ChevronUp, FileText, Headphones, Pause, Play, RotateCcw, Volume2, VolumeX, X } from 'lucide-react';
import type { AudioGuideData } from '../../types';
import { resolveAudioUrl } from '../../utils/mediaResolver';

interface AudioPlayerProps {
  audioGuide: AudioGuideData;
  heritageName: string;
}

const SAMPLE_AUDIO_URL = '/audio/heritage-guide-sample.wav';
const SAMPLE_TRANSCRIPT = 'Xin kính chào quý khách. Chúng ta đang cùng khám phá những dấu ấn kiến trúc Việt Nam qua các câu chuyện được lưu giữ trong từng công trình. Xin mời quý khách lắng nghe, quan sát và cảm nhận vẻ đẹp của di sản. Cảm ơn quý khách đã cùng Viettoria bắt đầu hành trình này.';

const parseDuration = (value?: string) => {
  if (!value) return 0;
  const parts = value.split(':').map(Number);
  if (parts.some((part) => !Number.isFinite(part))) return 0;
  return parts.length === 3 ? parts[0] * 3600 + parts[1] * 60 + parts[2] : parts.length === 2 ? parts[0] * 60 + parts[1] : parts[0] || 0;
};

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00';
  const wholeSeconds = Math.floor(seconds);
  const hours = Math.floor(wholeSeconds / 3600);
  const minutes = Math.floor((wholeSeconds % 3600) / 60);
  const remainder = wholeSeconds % 60;
  return hours > 0
    ? `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`
    : `${minutes.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
};

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioGuide, heritageName }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [audioFallbackActive, setAudioFallbackActive] = useState(false);
  const configuredAudioUrl = resolveAudioUrl(audioGuide.audioUrl);
  const audioUrl = configuredAudioUrl && !audioFallbackActive ? configuredAudioUrl : SAMPLE_AUDIO_URL;
  const isSampleAudio = audioUrl === SAMPLE_AUDIO_URL;
  const narratorLabel = isSampleAudio ? 'Hướng dẫn viên Viettoria' : audioGuide.narrator || 'Hướng dẫn viên Viettoria';
  const titleLabel = isSampleAudio ? 'Lời dẫn trải nghiệm Viettoria' : audioGuide.title || `Lời kể về ${heritageName}`;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(() => configuredAudioUrl ? parseDuration(audioGuide.duration) : 0);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isOutOfView, setIsOutOfView] = useState(false);
  const [dismissSticky, setDismissSticky] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const hasAudio = Boolean(audioUrl);

  useEffect(() => {
    const element = containerRef.current;
    if (!element || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setIsOutOfView(!entry.isIntersecting), { threshold: 0.1 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(configuredAudioUrl ? parseDuration(audioGuide.duration) : 0);
    setAudioError(false);
    setDismissSticky(false);
    setAudioFallbackActive(false);
    if (audioRef.current) audioRef.current.pause();
  }, [configuredAudioUrl, audioGuide.duration]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !hasAudio || audioError) return;
    setDismissSticky(false);
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        if (audioUrl !== SAMPLE_AUDIO_URL) {
          setAudioFallbackActive(true);
          setAudioError(false);
          setCurrentTime(0);
        } else {
          setAudioError(true);
        }
        setIsPlaying(false);
      }
    } else {
      audio.pause();
    }
  };

  const seek = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(event.target.value);
    setCurrentTime(nextTime);
    if (audioRef.current && Number.isFinite(nextTime)) audioRef.current.currentTime = nextTime;
  };

  const handleReset = () => {
    if (!audioRef.current || !hasAudio) return;
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
  };

  const toggleMute = () => {
    if (!audioRef.current || !hasAudio) return;
    const muted = !audioRef.current.muted;
    audioRef.current.muted = muted;
    setIsMuted(muted);
  };

  const scrollToPlayer = () => containerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const stickyPlayerVisible = isPlaying && isOutOfView && !dismissSticky;
  const durationLabel = duration > 0 ? formatTime(duration) : (audioGuide.duration || '—:—');
  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <>
      <section ref={containerRef} className="overflow-hidden border border-[#B88A44]/55 bg-[#142820] text-[#FAF7F0] shadow-lg">
        {hasAudio && (
          <audio
            key={audioUrl}
            ref={audioRef}
            src={audioUrl}
            preload="metadata"
            loop
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onTimeUpdate={(event) => setCurrentTime(event.currentTarget.currentTime)}
            onLoadedMetadata={(event) => {
              const actualDuration = event.currentTarget.duration;
              if (Number.isFinite(actualDuration)) setDuration(actualDuration);
            }}
            onDurationChange={(event) => {
              const actualDuration = event.currentTarget.duration;
              if (Number.isFinite(actualDuration)) setDuration(actualDuration);
            }}
            onEnded={() => setIsPlaying(false)}
            onError={() => {
              if (audioUrl !== SAMPLE_AUDIO_URL) {
                setAudioFallbackActive(true);
                setAudioError(false);
                setIsPlaying(false);
                setCurrentTime(0);
                return;
              }
              setAudioError(true);
              setIsPlaying(false);
            }}
          />
        )}

        <div className="grid lg:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="flex flex-row items-center gap-4 border-b border-[#FAF7F0]/10 bg-[#0D1C16] px-5 py-5 lg:flex-col lg:items-start lg:justify-between lg:border-b-0 lg:border-r lg:border-[#FAF7F0]/10 lg:px-6 lg:py-7">
            <div className={`audio-guide-emblem relative flex h-[62px] w-[62px] shrink-0 items-center justify-center border border-[#B88A44]/55 bg-[#142820] text-[#D4AF67] ${isPlaying ? 'is-speaking' : ''}`} aria-hidden="true">
              <Headphones className="h-6 w-6" strokeWidth={1.5} />
              <div className="audio-guide-wave absolute -bottom-2 -right-2 flex h-7 items-center gap-[3px] border border-[#142820] bg-[#B88A44] px-1.5">
                {[0, 1, 2, 3, 4].map((bar) => <span key={bar} />)}
              </div>
            </div>
            <div className="min-w-0 lg:mt-auto">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4AF67]">Hướng dẫn viên di sản</p>
              <p className="mt-1 truncate font-serif text-base font-semibold text-[#FAF7F0]">{narratorLabel}</p>
              <p className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[#FAF7F0]/55" role="status">
                <span className={`h-1.5 w-1.5 ${isPlaying ? 'bg-[#D4AF67]' : hasAudio && !audioError ? 'bg-[#7E9A75]' : 'bg-[#9C3D28]'}`} />
                {isPlaying ? 'Đang kể chuyện' : audioError ? 'Bản thu lỗi' : hasAudio ? 'Sẵn sàng dẫn chuyện' : 'Đang chờ bản thu'}
              </p>
            </div>
          </aside>

          <div className="min-w-0 p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              <div className="min-w-0 max-w-2xl">
                <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#D4AF67] sm:text-[11px]">
                  <span className="h-px w-5 bg-[#B88A44]" />
                  Chuyện kể tại {heritageName}
                </p>
                <h3 className="mt-3 font-display text-2xl leading-tight text-[#FAF7F0] sm:text-3xl">{audioGuide.title || `Lời kể về ${heritageName}`}</h3>
                <p className="mt-2 text-xs leading-5 text-[#FAF7F0]/65">
                  Giọng đọc <span className="text-[#E3C989]">{narratorLabel}</span>
                  <span className="mx-2 text-[#B88A44]">·</span>
                  Thời lượng <span className="font-mono text-[#FAF7F0]/80">{durationLabel}</span>
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3 sm:pt-2">
                <button type="button" onClick={handleReset} disabled={!hasAudio || audioError} className="flex h-10 w-10 items-center justify-center border border-[#FAF7F0]/20 text-[#FAF7F0]/75 transition-colors hover:border-[#B88A44] hover:text-[#D4AF67] disabled:cursor-not-allowed disabled:opacity-35" title="Phát lại từ đầu" aria-label="Phát lại từ đầu">
                  <RotateCcw className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button type="button" onClick={() => void togglePlay()} disabled={!hasAudio || audioError} className="flex h-14 w-14 items-center justify-center bg-[#B88A44] text-[#142820] transition-colors hover:bg-[#D4AF67] disabled:cursor-not-allowed disabled:opacity-40" aria-label={isPlaying ? 'Tạm dừng thuyết minh' : 'Nghe thuyết minh'}>
                  {isPlaying ? <Pause className="h-6 w-6 fill-current" /> : <Play className="ml-1 h-6 w-6 fill-current" />}
                </button>
                <button type="button" onClick={toggleMute} disabled={!hasAudio || audioError} className="flex h-10 w-10 items-center justify-center border border-[#FAF7F0]/20 text-[#FAF7F0]/75 transition-colors hover:border-[#B88A44] hover:text-[#D4AF67] disabled:cursor-not-allowed disabled:opacity-35" title={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'} aria-label={isMuted ? 'Bật âm thanh' : 'Tắt tiếng'}>
                  {isMuted ? <VolumeX className="h-4 w-4" strokeWidth={1.5} /> : <Volume2 className="h-4 w-4" strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            <div className="mt-7">
              <input type="range" min={0} max={Math.max(duration, 1)} step="0.1" value={Math.min(currentTime, Math.max(duration, 1))} onChange={seek} disabled={!hasAudio || audioError || duration <= 0} style={{ background: `linear-gradient(90deg, #B88A44 ${progressPercent}%, rgba(250,247,240,0.27) ${progressPercent}%)` }} className="audio-guide-seek w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-40" aria-label="Tiến trình thuyết minh" />
              <div className="mt-2 flex justify-between font-mono text-[11px] text-[#FAF7F0]/60">
                <span>{formatTime(currentTime)}</span>
                <span>{durationLabel}</span>
              </div>
            </div>

            {!hasAudio || audioError ? (
              <p className="mt-4 border-t border-[#FAF7F0]/10 pt-3 text-xs leading-relaxed text-[#FAF7F0]/60" role="status">
                {audioError ? 'Không mở được bản thu mẫu trên thiết bị này.' : 'Không tải được audio. Đang chuyển sang bản đọc mẫu.'}
              </p>
            ) : null}

            <div className="mt-5 flex flex-col justify-between gap-3 border-t border-[#FAF7F0]/10 pt-4 sm:flex-row sm:items-center">
              <button type="button" onClick={() => setShowTranscript((shown) => !shown)} aria-expanded={showTranscript} className="inline-flex items-center gap-2 text-left font-mono text-[10px] uppercase tracking-[0.12em] text-[#D4AF67] transition-colors hover:text-[#FAF7F0] sm:text-[11px]">
                <FileText className="h-4 w-4" strokeWidth={1.5} />
                {showTranscript ? 'Thu gọn lời dẫn' : 'Đọc toàn bộ lời dẫn'}
                {showTranscript ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
              </button>
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#FAF7F0]/40">Tư liệu thuyết minh · Viettoria</span>
            </div>
          </div>
        </div>

        {showTranscript && (
          <div className="border-t border-[#B88A44]/35 bg-[#0D1C16] px-5 py-5 sm:px-8 sm:py-7 animate-fade-up">
            <div className="mx-auto max-w-4xl">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.17em] text-[#D4AF67]">Lời dẫn · {heritageName}</h4>
              {audioGuide.transcript?.trim() ? (
                <p className="mt-4 whitespace-pre-line font-serif text-sm leading-7 text-[#FAF7F0]/85 sm:text-base sm:leading-8">{isSampleAudio ? SAMPLE_TRANSCRIPT : audioGuide.transcript}</p>
              ) : (
                <p className="mt-4 text-sm text-[#FAF7F0]/55">Bản chép lời đang được cập nhật.</p>
              )}
            </div>
          </div>
        )}
      </section>

      {stickyPlayerVisible && (
        <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#B88A44]/55 bg-[#0D1C16] px-4 py-3 text-[#FAF7F0] shadow-2xl animate-fade-up" role="region" aria-label="Hướng dẫn viên audio đang phát">
          <div className="mx-auto flex max-w-7xl items-center gap-3 sm:gap-5">
            <div className="hidden h-9 w-9 shrink-0 items-center justify-center border border-[#B88A44]/50 text-[#D4AF67] sm:flex"><Headphones className="h-4 w-4" /></div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-serif text-sm font-semibold">{titleLabel}</p>
              <p className="mt-0.5 truncate font-mono text-[9px] uppercase tracking-wider text-[#D4AF67]">Đang dẫn chuyện · {heritageName}</p>
            </div>
            <span className="hidden font-mono text-[10px] text-[#FAF7F0]/65 md:block">{formatTime(currentTime)} / {durationLabel}</span>
            <button type="button" onClick={() => void togglePlay()} className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#B88A44] text-[#142820]" aria-label="Tạm dừng thuyết minh"><Pause className="h-4 w-4 fill-current" /></button>
            <button type="button" onClick={scrollToPlayer} className="hidden items-center gap-1 border border-[#FAF7F0]/20 px-2.5 py-2 font-mono text-[9px] uppercase tracking-wider text-[#FAF7F0]/75 hover:border-[#B88A44] sm:flex" title="Quay lại trình phát"><ArrowUp className="h-3 w-3" />Trình phát</button>
            <button type="button" onClick={() => setDismissSticky(true)} className="px-1.5 text-[#FAF7F0]/45 hover:text-[#FAF7F0]" aria-label="Ẩn trình phát thu gọn"><X className="h-4 w-4" strokeWidth={1.5} /></button>
          </div>
          <div className="absolute inset-x-0 top-0 h-px bg-[#FAF7F0]/10"><div className="h-full bg-[#B88A44] transition-[width]" style={{ width: `${duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0}%` }} /></div>
        </div>
      )}
    </>
  );
};

export default AudioPlayer;
