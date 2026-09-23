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

    return () => {
      mediaReduced.removeEventListener('change', handleMotionChange);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Handle interactive playback speed boost if requested
  useEffect(() => {
    if (videoRef.current && videoLoaded) {
      videoRef.current.playbackRate = speedBoost ? 1.4 : 1.0;
    }
  }, [speedBoost, videoLoaded]);

  // Determine active video source
  const activeSrc = isMobile && mobileVideoSrc ? mobileVideoSrc : videoSrc;
  const canPlayVideo = Boolean(activeSrc) && !hasError && !isReducedMotion;

  return (
    <div className={`relative overflow-hidden w-full h-full select-none ${className}`}>
      {/* Fallback & Loading Poster Image - always rendered for zero layout shift */}
      <img
        src={poster}
        alt="Visual Backdrop"
        loading={priority ? 'eager' : 'lazy'}
        style={{ objectPosition }}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded && canPlayVideo ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* HTML5 Native Video Stream */}
      {canPlayVideo && activeSrc && (
        <video
          ref={videoRef}
          src={activeSrc}
          autoPlay={autoplay}
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
            videoLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Cinematic Dark & Gold Tint Overlay */}
      {overlay && <div className={`absolute inset-0 z-10 pointer-events-none ${overlay}`} />}
    </div>
  );
};
