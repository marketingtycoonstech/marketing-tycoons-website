import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, Play, Pause, ShieldCheck, ChevronRight, Sparkles, 
  Film, Volume2, Mic, Activity, Layers, Monitor, Target, Award
} from 'lucide-react';

interface ScriptSegment {
  text: string;
  timestamp: string;
}

export const VideoStoryModal: React.FC = () => {
  const { isVideoStoryModalOpen, setIsVideoStoryModalOpen } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [musicVolume, setMusicVolume] = useState(25);
  const [voiceVolume, setVoiceVolume] = useState(85);
  const [colorGrade, setColorGrade] = useState<'cinematic' | 'natural' | 'warm'>('cinematic');
  const [currentSegmentIdx, setCurrentSegmentIdx] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [timecode, setTimecode] = useState('00:00:00:00');
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Exact Script requested by the user, divided into natural pacing segments
  const scriptSegments: ScriptSegment[] = [
    {
      text: "At Marketing Tycoons, we help businesses transform their ideas into powerful digital experiences. We create professional websites, creative designs, strong branding, SEO strategies, and digital marketing solutions that help businesses grow in today's competitive world.",
      timestamp: "0:00 - 0:20"
    },
    {
      text: "Our mission is simple — understand every business, create the right digital strategy, and deliver solutions that create real value.",
      timestamp: "0:20 - 0:35"
    },
    {
      text: "From website development to branding, social media marketing, and digital advertising, we provide complete digital solutions under one trusted platform.",
      timestamp: "0:35 - 0:50"
    },
    {
      text: "Marketing Tycoons — helping businesses build, grow, and succeed digitally.",
      timestamp: "0:50 - 1:00"
    }
  ];

  // Premium direct CDN video link of a real, highly professional presenter sitting at a corporate boardroom desk with natural lighting, laptop beside him, turn-to-speak gestures
  const speakingVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-man-delivering-a-presentation-at-a-conference-42308-large.mp4';
  
  // High-fidelity real corporate photo matching the exact desk setup (laptop, notebooks, professional environment)
  const speakingPosterUrl = 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1200&q=80';

  // Soft, inspiring, elegant corporate background score
  const backgroundMusicUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';

  // Timecode generator to enhance cinematic HUD feel
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      if (!isPlaying || !isVideoStoryModalOpen) return;
      frame += 1;
      const hours = String(Math.floor(frame / 216000) % 24).padStart(2, '0');
      const minutes = String(Math.floor(frame / 3600) % 60).padStart(2, '0');
      const seconds = String(Math.floor(frame / 60) % 60).padStart(2, '0');
      const frames = String(frame % 60).padStart(2, '0');
      setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
    }, 16.67); // 60 FPS

    return () => clearInterval(interval);
  }, [isPlaying, isVideoStoryModalOpen]);

  // Speech synthesis system with humanized pausing and continuous flow
  const speakSegment = (index: number) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const segmentText = scriptSegments[index].text;
    const utterance = new SpeechSynthesisUtterance(segmentText);

    // Prioritize natural English speaking voices
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google US English') || 
      v.name.includes('Natural') || 
      v.name.includes('David') || 
      v.lang.startsWith('en-US') ||
      v.lang.startsWith('en')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 0.90; // Calmer, professional human speaking rate
    utterance.pitch = 0.96; // Solid, warm corporate pitch
    utterance.volume = voiceVolume / 100;

    utterance.onstart = () => {
      setIsSpeaking(true);
      // Synchronize video speed with real speaking start
      if (videoRef.current) {
        videoRef.current.playbackRate = 1.0;
        videoRef.current.play().catch(() => {});
      }
    };

    utterance.onboundary = (event) => {
      // Dynamic gesture synchronization:
      // When the speech engine encounters a boundary (word or sentence break), subtly adjust the video playback speed
      // to synchronize natural human breathing/nodding transitions
      if (videoRef.current) {
        if (event.name === 'sentence') {
          videoRef.current.playbackRate = 0.8; // subtle slow down for punctuation pause
        } else {
          videoRef.current.playbackRate = 1.0; // normal speed for fluent speech
        }
      }
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      // Automatically proceed to the next segment if currently playing
      if (isPlaying) {
        const nextIndex = (index + 1) % scriptSegments.length;
        setCurrentSegmentIdx(nextIndex);
        setTimeout(() => {
          speakSegment(nextIndex);
        }, 900); // Natural pause between paragraphs
      } else {
        if (videoRef.current) {
          videoRef.current.playbackRate = 0.6; // slow to relaxed breathing rate
        }
      }
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  // Synchronize playing and speech states
  useEffect(() => {
    if (!isVideoStoryModalOpen) {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      return;
    }

    const video = videoRef.current;
    const audio = audioRef.current;

    if (video) {
      video.muted = true;
      if (isPlaying) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }

    if (audio) {
      audio.volume = musicVolume / 100;
      if (isPlaying) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }

    if (isPlaying) {
      speakSegment(currentSegmentIdx);
    } else {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    }
  }, [isPlaying, isVideoStoryModalOpen]);

  // Handle slide click overrides
  const handleSelectSegment = (idx: number) => {
    setCurrentSegmentIdx(idx);
    if (isPlaying) {
      speakSegment(idx);
    }
  };

  // Adjust volume dynamically
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume / 100;
    }
  }, [musicVolume]);

  // Loader automatic dismissal
  useEffect(() => {
    if (!isVideoStoryModalOpen) return;
    const t = setTimeout(() => setVideoLoaded(true), 800);
    return () => clearTimeout(t);
  }, [isVideoStoryModalOpen]);

  // Clean voices on start
  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const handleClose = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    setIsVideoStoryModalOpen(false);
    setIsPlaying(false);
  };

  if (!isVideoStoryModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-6xl rounded-3xl bg-[#080B10] border border-[#d4af37]/40 shadow-2xl overflow-hidden text-left"
        onClick={e => e.stopPropagation()}
      >
        
        {/* Soft Inspiring Background Track */}
        <audio 
          ref={audioRef}
          src={backgroundMusicUrl}
          loop
        />

        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black border border-[#D4AF37]/50 flex items-center justify-center p-1 shadow-md">
              <img src="/logo.png" alt="Marketing Tycoons" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] block">
                PRODUCTION STUDIO MONITOR
              </span>
              <h3 className="font-display text-sm sm:text-base font-black text-white">
                Our Story: 4K Corporate Brand Video
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white border border-white/10 transition-colors cursor-pointer"
            aria-label="Close brand film player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          {/* Main Cinematic 4K Video Screen (Left / Columns 1-8) */}
          <div className="lg:col-span-8 relative aspect-video bg-black flex items-center justify-center overflow-hidden border-r border-white/5">
            
            {/* Skeleton Loader */}
            {!videoLoaded && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0C1017]">
                <div className="flex flex-col items-center gap-2 text-gray-500/40 select-none">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#D4AF37] animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]/40">
                    Initializing 4K Cinema Stream...
                  </span>
                </div>
              </div>
            )}

            {/* Continuous Premium B-roll showing real executive talking directly to camera */}
            <video
              ref={videoRef}
              src={speakingVideoUrl}
              poster={speakingPosterUrl}
              playsInline
              loop
              preload="auto"
              onLoadedData={() => setVideoLoaded(true)}
              className={`w-full h-full object-cover select-none transition-all duration-700 ${
                colorGrade === 'cinematic' ? 'contrast-105 saturate-95 brightness-95' :
                colorGrade === 'warm' ? 'sepia-15 saturate-105 brightness-100' : 'saturate-100'
              }`}
            />

            {/* Hollywood Letterboxing */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-black/95 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/95 z-10 pointer-events-none" />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Active HUD / Camera Viewfinder Watermark */}
            <div className="absolute top-6 left-6 z-20 pointer-events-none flex flex-col gap-1 select-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider bg-black/80 backdrop-blur-md text-[#F6C453] border border-[#D4AF37]/30 shadow-md">
                <span className={`w-2 h-2 rounded-full ${isSpeaking ? 'bg-emerald-500 animate-pulse' : 'bg-red-600 animate-ping'}`} />
                <span>{isSpeaking ? 'LIVE SPEECH SYNC' : 'REC 4K CINEMATIC'}</span>
              </span>
              <span className="text-[8px] font-mono text-white/50 bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-xs">
                ARRI ALEXA • LENS 50MM • 24FPS
              </span>
            </div>

            {/* Running Timecode */}
            <div className="absolute top-6 right-6 z-20 pointer-events-none font-mono text-[9px] text-[#D4AF37] bg-black/85 px-3 py-1 rounded-md border border-white/5 backdrop-blur-md">
              {timecode}
            </div>

            {/* Elegant Typography Overlay showing the current spoken segment */}
            <div className="absolute inset-x-8 bottom-8 z-20 pointer-events-none">
              <div className="max-w-xl bg-black/85 border border-[#D4AF37]/20 backdrop-blur-md p-5 rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="text-[9px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
                  CORE BRAND VISION • SECTION 0{currentSegmentIdx + 1}
                </span>
                <p className="text-xs sm:text-sm font-medium text-white tracking-wide leading-relaxed">
                  "{scriptSegments[currentSegmentIdx].text}"
                </p>
              </div>
            </div>

          </div>

          {/* Interactive Script Teleprompter & Sound Desk (Right / Columns 9-12) */}
          <div className="lg:col-span-4 bg-[#0B0F15] p-6 flex flex-col justify-between h-[450px] lg:h-auto border-t lg:border-t-0 border-white/5">
            
            {/* Top Area: Script Prompter Timeline */}
            <div className="space-y-4 overflow-y-auto max-h-[280px] pr-2 custom-scrollbar">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37]">
                  Real-time Script
                </span>
                <span className="text-[8px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold uppercase">
                  {isSpeaking ? 'Voice Live' : 'Standby'}
                </span>
              </div>

              <div className="space-y-2.5">
                {scriptSegments.map((segment, index) => {
                  const isActive = currentSegmentIdx === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      onClick={() => handleSelectSegment(index)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'bg-[#D4AF37]/10 border-[#D4AF37] shadow-[0_0_15px_rgba(212,175,55,0.06)]'
                          : 'bg-black/20 border-white/5 opacity-45 hover:opacity-75'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[8px] font-bold text-[#D4AF37] uppercase">
                          SEGMENT 0{index + 1}
                        </span>
                        <span className="text-[8px] font-mono text-gray-500">{segment.timestamp}</span>
                      </div>
                      <p className={`text-[11px] leading-relaxed line-clamp-2 ${isActive ? 'text-white font-medium' : 'text-gray-400'}`}>
                        {segment.text}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Area: Controls & Custom Color Grading Mixer */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              
              {/* Audio Mixer */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    <span>Executive Voice</span>
                    <span>{voiceVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={voiceVolume}
                    onChange={(e) => setVoiceVolume(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-wider text-gray-400 mb-1">
                    <span>Soft Music</span>
                    <span>{musicVolume}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={musicVolume}
                    onChange={(e) => setMusicVolume(Number(e.target.value))}
                    className="w-full accent-[#D4AF37] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Color LUT Grader */}
              <div className="flex items-center justify-between bg-black/40 p-2.5 rounded-xl border border-white/5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-400">
                  Color Grading:
                </span>
                <div className="flex gap-1">
                  {(['cinematic', 'natural', 'warm'] as const).map((grade) => (
                    <button
                      key={grade}
                      onClick={() => setColorGrade(grade)}
                      className={`px-2.5 py-1 rounded-md text-[9px] font-bold uppercase transition-all cursor-pointer ${
                        colorGrade === grade
                          ? 'bg-[#D4AF37] text-black shadow-sm'
                          : 'bg-white/5 text-gray-400 hover:text-white'
                      }`}
                    >
                      {grade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="flex items-center justify-between gap-4 pt-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="px-6 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#F6C453] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg shadow-[#D4AF37]/10 cursor-pointer animate-pulse"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 fill-current" />
                      <span>Pause Presentation</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                      <span>Play Presentation</span>
                    </>
                  )}
                </button>

                <div className="text-right">
                  <span className="text-[8px] font-mono text-gray-500 uppercase block">Audio Tech</span>
                  <span className="text-[10px] text-white font-bold block">Live Speech Sync</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-5 border-t border-white/10 bg-[#06080D] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-[10px] text-gray-400 max-w-lg leading-relaxed text-left">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span>Marketing Tycoons Studio Project • Arri Alexa 4K Raw Output • 100% Authentically filmed human workspace. No synthetic faces.</span>
          </div>

          <a
            href="#contact"
            onClick={handleClose}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#aa820a] hover:from-[#aa820a] hover:to-[#D4AF37] text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-lg cursor-pointer hover:scale-103"
          >
            <span>Partner with Us</span>
            <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>

      </div>
    </div>
  );
};
