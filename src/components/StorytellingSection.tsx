import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from './common/ScrollReveal';
import { Play, Pause, Volume2, VolumeX, RefreshCw, Maximize, PlayCircle } from 'lucide-react';

export const StorytellingSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoMuted, setVideoMuted] = useState(false); // Default to unmuted so the voiceover plays
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);
  const [videoSrc, setVideoSrc] = useState('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4');
  const [isSlowConnection, setIsSlowConnection] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // High-quality online fallback URL (100% reliable Google GCS stream)
  const fallbackVideoUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
  const fallbackPosterUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85';

  // Detect connection speed and reduced motion preferences
  useEffect(() => {
    const mediaReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaReduced.matches);
    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaReduced.addEventListener('change', handleMotionChange);

    const conn = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    if (conn) {
      setIsSlowConnection(conn.saveData || ['slow-2g', '2g', '3g'].includes(conn.effectiveType));
    }

    return () => {
      mediaReduced.removeEventListener('change', handleMotionChange);
    };
  }, []);

  // Intersection Observer to pause when scrolled out of view
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (videoRef.current) {
            videoRef.current.pause();
          }
          setIsPlaying(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Sync state transitions to video element
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = videoMuted;

    if (isPlaying) {
      video.play().catch(() => {
        setIsPlaying(false);
      });
    } else {
      video.pause();
    }
  }, [isPlaying, videoMuted, videoSrc]);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setVideoCurrentTime(video.currentTime);
      setVideoDuration(video.duration);
      setVideoProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    video.currentTime = pos * video.duration;
    setVideoProgress(pos * 100);
  };

  const handleVideoError = () => {
    // If local uploaded file /marketing_tycoons_brand_film.mp4 is not yet loaded, fallback to online CDN
    if (videoSrc !== fallbackVideoUrl) {
      console.log('Local video not found, falling back to online CDN presentation video.');
      setVideoSrc(fallbackVideoUrl);
    }
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      } else if ((video as any).msRequestFullscreen) {
        (video as any).msRequestFullscreen();
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="brand-film"
      className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#050505] text-[#FFFFFF] overflow-hidden border-t border-[#222222]"
    >
      {/* Background ambient gold aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        
        {/* Immersive Section Header */}
        <div className="mb-12">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0A0A0A] border border-[#222222] text-xs font-bold text-[#D4AF37] tracking-[0.2em] uppercase mb-4">
              <span>Marketing Tycoons Showcase</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase mb-4">
              OUR STORY IN{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F6C453] to-[#D4AF37]">
                MOTION
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
              Experience the official brand video. Press play below to discover how we turn visionary ideas into powerful, high-converting digital brands.
            </p>
          </ScrollReveal>
        </div>

        {/* Minimal Immersive Fullscreen Theater Frame */}
        <ScrollReveal animation="fade-up" delay={0.4}>
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-[#222222] bg-black group shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            
            {/* Viewfinder HUD Camera Overlay */}
            <div className="absolute inset-x-5 top-5 pointer-events-none z-20 flex items-center justify-between select-none">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/85 border border-[#222222] backdrop-blur-md">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-[#D4AF37] animate-ping' : 'bg-red-600'}`} />
                <span className="text-[8px] font-mono font-bold text-white uppercase tracking-wider">
                  {isPlaying ? 'PLAYING 1080P' : 'PAUSED'}
                </span>
              </div>
              <div className="text-[8px] font-mono text-white/50 bg-black/40 px-2 py-1 rounded">
                {isPlaying ? 'REC // 00:01:24:08' : 'STBY // 00:00:00:00'}
              </div>
            </div>

            {/* Play/Pause Overlay Button */}
            {!isPlaying && (
              <button
                type="button"
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-xs transition-opacity duration-300 hover:bg-black/50 cursor-pointer"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-black translate-x-0.5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest bg-black/85 border border-[#222222] px-3 py-1 rounded-md">
                    Click to Play Film
                  </span>
                </div>
              </button>
            )}

            {/* Video Element */}
            <video
              ref={videoRef}
              src={videoSrc}
              poster={fallbackPosterUrl}
              loop
              muted={videoMuted}
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onError={handleVideoError}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            />

            {/* Cinema Bars gradient cover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none z-10" />

            {/* Control Bar Overlay */}
            <div className="absolute inset-x-4 bottom-4 z-30 flex flex-col gap-2 bg-black/85 border border-[#222222] p-3 rounded-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100">
              {/* Scrubbing Track */}
              <div 
                onClick={handleScrub}
                className="h-1.5 w-full bg-white/20 rounded-full cursor-pointer overflow-hidden relative group/scrub transition-all hover:h-2"
              >
                <div 
                  className="h-full bg-[#D4AF37] transition-all duration-100 ease-linear"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              
              {/* Controls */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setVideoMuted(!videoMuted)}
                    className="text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                    aria-label={videoMuted ? 'Unmute' : 'Mute'}
                  >
                    {videoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-[10px] font-mono text-gray-400">
                    {String(Math.floor(videoCurrentTime / 60)).padStart(2, '0')}:
                    {String(Math.floor(videoCurrentTime % 60)).padStart(2, '0')} / 
                    {String(Math.floor(videoDuration / 60) || 0).padStart(2, '0')}:
                    {String(Math.floor(videoDuration % 60) || 0).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={toggleFullScreen}
                    className="text-gray-400 hover:text-white transition-colors cursor-pointer"
                    title="Fullscreen"
                  >
                    <Maximize className="w-4 h-4" />
                  </button>
                  <span className="text-[9px] font-mono font-bold text-[#D4AF37] tracking-widest uppercase bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-1.5 py-0.5 rounded">
                    RAW 1080P
                  </span>
                </div>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
