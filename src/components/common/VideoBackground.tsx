import React, { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  videoSrc?: string;
  poster: string;
  mobileVideoSrc?: string;
  overlay?: string;
  objectPosition?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
  speedBoost?: boolean;
  priority?: boolean;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc,
  poster,
  mobileVideoSrc,
  overlay = 'bg-black/60',
  objectPosition = 'center',
  autoplay = true,
  loop = true,
  muted = true,
  className = '',
  speedBoost = false,
  priority = false
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  useEffect(() => {
    // Detect reduced motion preference
    const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaReduced.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaReduced.addEventListener('change', handleMotionChange);

    // Detect mobile viewport
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Detect slow connection / data saver
    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (conn) {
      setIsSlowConnection(conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType));
    }

    // Detect browser tab visibility state
    const handleVisibilityChange = () => {
      setIsTabVisible(document.visibilityState === 'visible');
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      mediaReduced.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Determine active video source
  const activeSrc = isMobile && mobileVideoSrc ? mobileVideoSrc : videoSrc;
  const canPlayVideo = Boolean(activeSrc) && !hasError && !isReducedMotion && !isSlowConnection;

  // Handle smart autoplay policy (Battery saver, Tab visibility, Connection speed)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoplay) return;

    if (isTabVisible && !isSlowConnection && !isReducedMotion) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setAutoplayBlocked(false);
          })
          .catch((err) => {
            // Log block state and display static poster instead or allow manual trigger
            console.warn('Autoplay blocked by browser or low power mode is active:', err);
            setAutoplayBlocked(true);
          });
      }
    } else {
      video.pause();
    }
  }, [isTabVisible, isSlowConnection, isReducedMotion, autoplay, activeSrc]);

  // Handle interactive playback speed boost if requested
  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      videoRef.current.playbackRate = speedBoost ? 1.4 : 1.0;
    }
  }, [speedBoost, videoLoaded]);

  return (
    <div className={`relative overflow-hidden w-full h-full select-none ${className}`}>
      {/* Fallback & Loading Poster Image - always rendered for zero layout shift */}
      <img
        src={poster}
        alt="Visual Backdrop"
        loading={priority ? 'eager' : 'lazy'}
        style={{ objectPosition }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded && canPlayVideo && !autoplayBlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* HTML5 Native Video Stream */}
      {canPlayVideo && activeSrc && (
        <video
          ref={videoRef}
          src={activeSrc}
          loop={loop}
          muted={muted}
          playsInline
          poster={poster}
          preload={priority ? 'auto' : 'metadata'}
          onLoadedData={() => setVideoLoaded(true)}
          onError={() => {
            setHasError(true);
            setVideoLoaded(false);
          }}
          style={{ objectPosition }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            videoLoaded && !autoplayBlocked ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Cinematic Dark & Gold Tint Overlay */}
      {overlay && <div className={`absolute inset-0 z-10 pointer-events-none ${overlay}`} />}
    </div>
  );
};
