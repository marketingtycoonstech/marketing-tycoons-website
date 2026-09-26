import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Pause, Volume2, VolumeX, Maximize, Film } from 'lucide-react';

export const VideoStoryModal: React.FC = () => {
  const { isVideoStoryModalOpen, setIsVideoStoryModalOpen } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoMuted, setVideoMuted] = useState(false); // Unmuted by default so the brand film voiceover/music plays!
  const [videoProgress, setVideoProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoCurrentTime, setVideoCurrentTime] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // High-quality corporate team showreel video URL (100% reliable Google GCS CDN stream)
  const brandFilmUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4';
  const posterUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85';

  // Synchronize playing and muted states to HTML5 video element
  useEffect(() => {
    if (!isVideoStoryModalOpen) return;

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
  }, [isPlaying, videoMuted, isVideoStoryModalOpen]);

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

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (video) {
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if ((video as any).webkitRequestFullscreen) {
        (video as any).webkitRequestFullscreen();
      }
    }
  };

  const handleClose = () => {
    setIsVideoStoryModalOpen(false);
    setIsPlaying(false);
  };

  if (!isVideoStoryModalOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300 select-none"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-3xl bg-[#080B10] border border-[#d4af37]/30 shadow-[0_0_50px_rgba(212,175,55,0.25)] overflow-hidden text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <Film className="w-5 h-5 text-[#D4AF37]" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] block">
                OFFICIAL SHOWCASE
              </span>
              <h3 className="font-display text-sm sm:text-base font-black text-white">
                Marketing Tycoons Corporate Film
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Video Frame */}
        <div className="relative aspect-video w-full bg-black group">
          
          {/* Viewfinder Overlay HUD */}
          <div className="absolute inset-x-5 top-5 pointer-events-none z-20 flex items-center justify-between select-none">
            <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/85 border border-[#222222] backdrop-blur-md">
              <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-[#D4AF37] animate-ping' : 'bg-red-600'}`} />
              <span className="text-[8px] font-mono font-bold text-white uppercase tracking-wider">
                {isPlaying ? 'PLAYING 1080P' : 'PAUSED'}
              </span>
            </div>
            <div className="text-[8px] font-mono text-white/50 bg-black/40 px-2 py-1 rounded">
              {isPlaying ? 'LIVE STREAM' : 'STANDBY'}
            </div>
          </div>

          {/* Click to Play Center Button Overlay */}
          {!isPlaying && (
            <button
              type="button"
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 z-30 flex items-center justify-center bg-black/55 backdrop-blur-xs transition-opacity duration-300 hover:bg-black/60 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center text-black shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 fill-black translate-x-0.5" />
                </div>
                <span className="text-xs font-mono font-bold text-[#D4AF37] uppercase tracking-widest bg-black/85 border border-[#222222] px-3 py-1 rounded-md">
                  Click to Start Film
                </span>
              </div>
            </button>
          )}

          {/* HTML5 Native Video Tag */}
          <video
            ref={videoRef}
            src={brandFilmUrl}
            poster={posterUrl}
            loop
            muted={videoMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsPlaying(!isPlaying)}
          />

          {/* Film Control HUD Overlay (Fades on hover) */}
          <div className="absolute inset-x-4 bottom-4 z-30 flex flex-col gap-2 bg-black/90 border border-white/10 p-3 rounded-xl backdrop-blur-md transition-all duration-300 opacity-0 group-hover:opacity-100">
            {/* Scrubber track */}
            <div 
              onClick={handleScrub}
              className="h-1.5 w-full bg-white/20 rounded-full cursor-pointer overflow-hidden relative transition-all hover:h-2"
            >
              <div 
                className="h-full bg-[#D4AF37] transition-all duration-100 ease-linear"
                style={{ width: `${videoProgress}%` }}
              />
            </div>

            {/* Sub-toggles */}
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
                </button>
                
                <button
                  type="button"
                  onClick={() => setVideoMuted(!videoMuted)}
                  className="text-white hover:text-[#D4AF37] transition-colors cursor-pointer"
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
                  className="text-gray-400 hover:text-white transition-colors cursor-pointer animate-pulse"
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

      </div>
    </div>
  );
};
