import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Play, Volume2, VolumeX, Sparkles, Film, Eye, Loader2, Image as ImageIcon } from 'lucide-react';

interface CinematicVideoPlayerProps {
  videoUrl?: string;
  posterUrl: string;
  title: string;
  category?: string;
  browserUrl?: string;
  isHovered: boolean;
  isTouchDevice?: boolean;
}

export const CinematicVideoPlayer: React.FC<CinematicVideoPlayerProps> = ({
  videoUrl,
  posterUrl,
  title,
  category,
  browserUrl,
  isHovered,
  isTouchDevice = false
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isVideoBuffering, setIsVideoBuffering] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isFocalInViewport, setIsFocalInViewport] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true
  );

  // Preload poster image to ensure instantaneous or smooth blurred transition
  useEffect(() => {
    const img = new Image();
    img.src = posterUrl;
    img.onload = () => setImageLoaded(true);
  }, [posterUrl]);

  // High-performance IntersectionObserver to observe viewport entry, focal presence, and departure
  useEffect(() => {
    const el = containerRef.current;
    if (!el || !videoUrl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Fully out of viewport or barely visible
          const inView = entry.isIntersecting && entry.intersectionRatio > 0.05;
          setIsInViewport(inView);

          // Focused in viewport for mobile touch devices
          const focalView = entry.isIntersecting && entry.intersectionRatio >= 0.55;
          setIsFocalInViewport(focalView);
        });
      },
      {
        threshold: [0, 0.05, 0.25, 0.55, 0.8, 1.0],
        rootMargin: '0px 0px 0px 0px'
      }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [videoUrl]);

  // Tab visibility listener to pause video when switching tabs and resume when returning
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Compute active playback condition:
  // 1. Must have a valid videoUrl
  // 2. Must be visible within viewport (not scrolled out)
  // 3. Must have browser tab actively visible
  const shouldPlay =
    Boolean(videoUrl) &&
    isInViewport &&
    isTabVisible;

  // Synchronization effect controlling video play / pause / resume
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    if (shouldPlay) {
      if (!videoLoaded) {
        setIsVideoBuffering(true);
      }
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsVideoBuffering(false);
          })
          .catch((err) => {
            // Auto-play was prevented (e.g. unmuted or power-save)
            if (err.name !== 'AbortError') {
              setIsPlaying(false);
              setIsVideoBuffering(false);
            }
          });
      }
    } else {
      if (!video.paused) {
        video.pause();
      }
      setIsPlaying(false);
      setIsVideoBuffering(false);
    }
  }, [shouldPlay, videoUrl, videoLoaded]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    setProgress((video.currentTime / video.duration) * 100);
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const newMuted = !isMuted;
    videoRef.current.muted = newMuted;
    setIsMuted(newMuted);
  };

  const isWebCategory =
    category?.toLowerCase().includes('website') ||
    category?.toLowerCase().includes('e-commerce') ||
    category?.toLowerCase().includes('portal');

  return (
    <div
      ref={containerRef}
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-[#090D12] dark:bg-[#070A0E] border border-black/15 dark:border-[#2A3441] shadow-inner group-hover:border-[#D4AF37]/50 transition-colors"
    >
      {/* Subtle Luxury Skeleton Loader Placeholder (Shown before image loads) */}
      {!imageLoaded && (
        <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#0C1017] dark:bg-[#080B0F] overflow-hidden">
          {/* Shimmer sweep animation */}
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] dark:via-[#D4AF37]/10 to-transparent" />
          
          {/* Skeleton geometry & placeholder branding */}
          <div className="flex flex-col items-center gap-2 text-gray-500/40 dark:text-gray-600/40 select-none">
            <div className="w-10 h-10 rounded-xl bg-black/20 dark:bg-white/5 border border-white/5 flex items-center justify-center">
              <Film className="w-5 h-5 text-[#D4AF37]/40 animate-pulse" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-widest text-[#D4AF37]/30">
              Loading Asset...
            </span>
          </div>

          {/* Skeleton bottom accent bar */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent animate-pulse" />
        </div>
      )}

      {/* Blurred / Progressive High-Res Thumbnail Image */}
      <img
        src={posterUrl}
        alt={title}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700 ease-out ${
          imageLoaded
            ? isPlaying
              ? 'opacity-0 scale-105 blur-0'
              : 'opacity-100 scale-100 blur-0 group-hover:scale-105'
            : 'opacity-0 scale-110 blur-lg'
        }`}
      />

      {/* HTML5 Video Element with High-Performance Cinematic Loop */}
      {videoUrl && (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          muted={isMuted}
          playsInline
          loop
          preload="metadata"
          onLoadedData={() => {
            setVideoLoaded(true);
            setIsVideoBuffering(false);
          }}
          onWaiting={() => setIsVideoBuffering(true)}
          onPlaying={() => setIsVideoBuffering(false)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setProgress(0)}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out pointer-events-none ${
            isPlaying && !isVideoBuffering ? 'opacity-100' : 'opacity-0'
          } ${isHovered ? 'scale-105' : 'scale-100'}`}
        />
      )}

      {/* Cinematic Buffering Stream Shimmer Indicator */}
      {videoUrl && isVideoBuffering && shouldPlay && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-xs pointer-events-none transition-all duration-300">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/85 border border-[#D4AF37]/50 shadow-xl">
            <Loader2 className="w-3.5 h-3.5 text-[#F6C453] animate-spin" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#F6C453]">
              Buffering Stream...
            </span>
          </div>
        </div>
      )}

      {/* Cinematic Vignette & Ambient Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

      {/* Browser Bar for Websites / E-Commerce projects */}
      {isWebCategory && (
        <div className="absolute top-0 inset-x-0 z-20 h-5 bg-black/75 backdrop-blur-md border-b border-white/10 px-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
          </div>
          {browserUrl && (
            <span className="text-[8px] font-mono text-gray-300 truncate max-w-[140px]">
              {browserUrl.replace('https://', '')}
            </span>
          )}
          <div className="w-3" />
        </div>
      )}

      {/* Live Motion Indicator Pill when Playing */}
      {videoUrl && (
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 pointer-events-none">
          {isPlaying ? (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-black/85 backdrop-blur-md text-[#F6C453] border border-[#D4AF37]/50 shadow-md animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
              <Film className="w-2.5 h-2.5" />
              <span>Motion Preview</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-semibold uppercase tracking-wider bg-black/60 backdrop-blur-md text-gray-300 border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-2.5 h-2.5 text-[#D4AF37]" />
              <span>Hover To Preview</span>
            </span>
          )}
        </div>
      )}

      {/* Interactive Sound Toggle for Active Videos */}
      {videoUrl && isPlaying && (
        <button
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video preview' : 'Mute video preview'}
          className="absolute bottom-2.5 right-2.5 z-30 p-1.5 rounded-full bg-black/80 hover:bg-[#D4AF37] text-white hover:text-black border border-white/20 hover:border-[#D4AF37] backdrop-blur-md transition-all duration-200 cursor-pointer shadow-lg"
        >
          {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
        </button>
      )}

      {/* Video Progress Bar Scrubber on Bottom Edge */}
      {videoUrl && isPlaying && (
        <div className="absolute bottom-0 inset-x-0 z-20 h-1 bg-black/60 overflow-hidden pointer-events-none">
          <div
            className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#D4AF37] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Cinematic Overlay Quick View Action on Desktop Hover */}
      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#D4AF37] text-[#050505] font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(212,175,55,0.6)] transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Explore Case Study</span>
        </span>
      </div>
    </div>
  );
};
