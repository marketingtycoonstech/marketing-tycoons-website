import React, { useState, useEffect, useRef } from 'react';
import { ScrollReveal } from './common/ScrollReveal';
import { 
  Play, Pause, ChevronRight, ShieldCheck, Sparkles, 
  Film, Volume2, Activity, Layers, Monitor, Target, Mic
} from 'lucide-react';

interface CinematicPhase {
  id: string;
  phase: string;
  title: string;
  heading: string;
  description: string;
  deliverables: string[];
  mottoText: string;
  icon: React.ElementType;
}

const CINEMATIC_PHASES: CinematicPhase[] = [
  {
    id: 'phase-strategy',
    phase: '01',
    title: 'Data Audit & Discovery',
    heading: 'Rigorous Strategy & Market Intelligence',
    description: 'Real professionals collaborating, mapping user intent, and establishing foundational brand positioning. We replace guesswork with absolute categorical clarity.',
    deliverables: ['Audit of Audience Search Intent', 'Competitor Differentiation Matrix', 'Strategic Target Personas'],
    mottoText: "Our brand discovery stage uncovers critical market opportunities, defining your custom audience search intent and positioning structure.",
    icon: Target
  },
  {
    id: 'phase-branding',
    phase: '02',
    title: 'Luxury Brand Identity',
    heading: 'High-End Aesthetics & Visual Systems',
    description: 'Designing bespoke logos, premium metallic palettes, and corporate typography systems that establish visual authority and drive customer trust.',
    deliverables: ['Custom Logo Design Systems', 'Elite Typography Pairings', 'Luxury Metallic Palettes'],
    mottoText: "We craft custom branding systems, bespoke monogram logos, and high-contrast color palettes designed to command trust.",
    icon: Layers
  },
  {
    id: 'phase-dev',
    phase: '03',
    title: 'Airtight Web Engineering',
    heading: 'Lightning-Fast Responsive Deployments',
    description: 'Our software developers engineering clean, robust React-based interfaces with sub-second page loads, automated production CI/CD, and total mobile responsiveness.',
    deliverables: ['98+ Google PageSpeed Score', 'Sub-second Server Response', 'Fluid Responsive Frameworks'],
    mottoText: "We engineer lightning-fast React platforms with clean coding structure and sub-second loading speed on all devices.",
    icon: Monitor
  },
  {
    id: 'phase-growth',
    phase: '04',
    title: 'Omnichannel Domination',
    heading: 'Targeted ROI & Growth Multiplication',
    description: 'We deploy hyper-targeted Meta Ads, semantic keyword silos, and viral social media marketing to establish authority and maximize customer acquisition.',
    deliverables: ['High-ROAS Ad Campaigns', 'First-Page Google Keywords', 'Airtight Conversion funnels'],
    mottoText: "We launch targeted advertising campaigns and organic search silos to multiply customer acquisition and scale your brand.",
    icon: Sparkles
  }
];

export const StorytellingSection: React.FC = () => {
  const [activePhaseIdx, setActivePhaseIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false); // SILENT AND PAUSED BY DEFAULT on website load!
  const [isSpeaking, setIsSpeaking] = useState(false); // Speaks ONLY when they click "Start to Speak"
  const [musicPlaying, setMusicPlaying] = useState(false); // Music starts strict PAUSED by default
  const [musicVolume, setMusicVolume] = useState(30);
  const [timecode, setTimecode] = useState('00:00:00:00');
  
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const activePhase = CINEMATIC_PHASES[activePhaseIdx];

  // Authentic, ultra-realistic corporate showreel showcasing real human creative teams in motion
  const showreelVideoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-creative-team-working-in-modern-office-43406-large.mp4';
  const showreelPosterUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85';

  // Inspiring, premium corporate instrumental music track
  const backgroundMusicUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3';

  // Intersection Observer to stop all audio/speech/video when scrolling away
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // If the user scrolls completely out of the storytelling stage, kill all audio/speech/video
        if (!entry.isIntersecting) {
          if (window.speechSynthesis) {
            window.speechSynthesis.cancel();
          }
          if (audioRef.current) {
            audioRef.current.pause();
          }
          if (videoRef.current) {
            videoRef.current.pause();
          }
          setIsSpeaking(false);
          setMusicPlaying(false);
          setIsPlaying(false);
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% of the section is visible
      }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Timecode simulation for motion graphics feel
  useEffect(() => {
    let frame = 0;
    const interval = setInterval(() => {
      if (!isPlaying) return;
      frame += 1;
      const hours = String(Math.floor(frame / 216000) % 24).padStart(2, '0');
      const minutes = String(Math.floor(frame / 3600) % 60).padStart(2, '0');
      const seconds = String(Math.floor(frame / 60) % 60).padStart(2, '0');
      const frames = String(frame % 60).padStart(2, '0');
      setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
    }, 16.67); // 60 FPS

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Synchronize play state of video and music
  useEffect(() => {
    const video = videoRef.current;
    const audio = audioRef.current;

    // Video plays muted by default if they click play
    if (video) {
      video.muted = true;
      if (isPlaying) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }

    // Music plays ONLY if explicitly turned on or they click speak
    if (audio) {
      audio.volume = musicVolume / 100;
      if (musicPlaying) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, musicPlaying]);

  // Handle stage rotation (12s intervals)
  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setActivePhaseIdx((prev) => {
        const nextIdx = (prev + 1) % CINEMATIC_PHASES.length;
        if (isSpeaking) {
          speakMotto(CINEMATIC_PHASES[nextIdx].mottoText);
        }
        return nextIdx;
      });
    }, 12000);

    return () => clearInterval(timer);
  }, [isPlaying, isSpeaking]);

  // Adjust volume dynamically
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = musicVolume / 100;
    }
  }, [musicVolume]);

  // Speech synthesis engine for speaking the motto
  const speakMotto = (text: string) => {
    if (!window.speechSynthesis) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Choose high-quality natural voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Google US English') || 
      v.name.includes('David') || 
      v.lang.startsWith('en')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    utterance.rate = 0.90; // Natural slow pacing
    utterance.pitch = 0.96; // Warm executive pitch

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPlaying(true); // Sync the video playback to speaking
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const toggleSpeakingMotto = () => {
    if (isSpeaking) {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setIsSpeaking(false);
    } else {
      speakMotto(activePhase.mottoText);
    }
  };

  const selectPhase = (idx: number) => {
    setActivePhaseIdx(idx);
    setIsPlaying(false); // Pause auto-rotation on click
    if (isSpeaking) {
      speakMotto(CINEMATIC_PHASES[idx].mottoText);
    }
  };

  // Clean speech synthesis on unmount to prevent sound overlap
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="storytelling-process"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050505] text-white overflow-hidden"
    >
      {/* Background Soft Gold Ambient Spotlights */}
      <div className="absolute top-1/4 left-1/10 w-[550px] h-[550px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[550px] h-[550px] bg-[#F6C453]/4 rounded-full blur-[160px] pointer-events-none" />

      {/* Music Track - strictly paused on mount */}
      <audio 
        ref={audioRef}
        src={backgroundMusicUrl}
        loop
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-[#D4AF37]/40 shadow-[0_0_15px_rgba(212,175,55,0.25)] text-xs font-bold text-[#D4AF37] tracking-[0.2em] uppercase mb-4">
              <span>BRAND IN MOTION</span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-white uppercase mb-4 leading-tight">
              Our Vision{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F6C453] to-[#D4AF37]">
                In Live Action
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
              Experience our premium stage sequence. Select any phase below and click the speak button to hear the authentic brand motto for that stage.
            </p>
          </ScrollReveal>
        </div>

        {/* Master Cinema Display System */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-black/40 border border-[#D4AF37]/20 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          
          {/* Decorative Backlighting */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-[100px] pointer-events-none" />

          {/* Left Column: Real Widescreen Cinema Player (Columns 1-7) */}
          <div className="lg:col-span-7 relative aspect-video w-full rounded-2xl overflow-hidden border border-white/5 shadow-2xl bg-black group">
            
            {/* Viewfinder HUD Camera Overlay */}
            <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-4 sm:p-5 select-none">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/85 border border-[#D4AF37]/30 backdrop-blur-md">
                  <span className={`w-1.5 h-1.5 rounded-full ${isSpeaking ? 'bg-emerald-500' : 'bg-red-600 animate-ping'}`} />
                  <span className="text-[8px] font-mono font-bold text-[#F6C453] uppercase tracking-wider">
                    {isSpeaking ? 'SPEAKER LIVE' : 'STANDBY'}
                  </span>
                </div>
                <div className="text-[8px] font-mono text-white/50 bg-black/40 px-2 py-1 rounded">
                  {timecode}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[7px] font-mono text-white/40">REAL HUMAN COLLABORATION • STAGE 0{activePhase.phase}</span>
                <span className="text-[7px] font-mono text-white/40">ARRI ALEXA • RAW MONITORS</span>
              </div>

            </div>

            {/* Cinema Letterboxing Scope */}
            <div className="absolute top-0 left-0 right-0 h-4 bg-black/95 z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-black/95 z-10 pointer-events-none" />

            {/* Continuous Premium B-roll showcasing real creative teams in active motion */}
            <video
              ref={videoRef}
              src={showreelVideoUrl}
              poster={showreelPosterUrl}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-102"
            />

            {/* Vignette Screen shading */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

            {/* Elegant Kinetic Typography Overlay synchronized with currently active phase */}
            <div className="absolute inset-x-6 bottom-8 z-20 pointer-events-none">
              <div className="max-w-md bg-black/85 border border-[#D4AF37]/20 backdrop-blur-md px-4.5 py-3.5 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-300">
                <span className="text-[8px] font-bold tracking-[0.25em] text-[#D4AF37] uppercase block mb-1">
                  CORE PHASE VALUE • {activePhase.title}
                </span>
                <p className="text-xs sm:text-sm font-semibold text-white uppercase tracking-wider leading-relaxed">
                  {activePhase.heading}
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Details & Music Console (Columns 8-12) */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Phase Selector Tabs */}
            <div className="flex flex-wrap gap-1.5 border-b border-white/5 pb-4">
              {CINEMATIC_PHASES.map((phase, idx) => {
                const isActive = idx === activePhaseIdx;
                const Icon = phase.icon;
                return (
                  <button
                    key={phase.id}
                    onClick={() => selectPhase(idx)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      isActive
                        ? 'bg-[#D4AF37]/15 border-[#D4AF37] text-white shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                        : 'bg-white/5 border-transparent text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="relative flex items-center justify-center w-5 h-5">
                      {isActive && (
                        <svg className="absolute inset-0 w-full h-full animate-spin [animation-duration:3s]" viewBox="0 0 24 24">
                          <circle
                            className="text-[#D4AF37]/10"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            fill="transparent"
                            r="9"
                            cx="12"
                            cy="12"
                          />
                          <circle
                            className="text-[#F6C453]"
                            strokeWidth="2.5"
                            strokeDasharray="40"
                            strokeDashoffset="12"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="transparent"
                            r="9"
                            cx="12"
                            cy="12"
                          />
                        </svg>
                      )}
                      <Icon className={`w-3 h-3 relative z-10 transition-transform ${isActive ? 'text-[#F6C453] scale-105' : 'text-gray-400'}`} />
                    </div>
                    <span>0{phase.phase}</span>
                    {isActive && (
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F6C453] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#D4AF37]"></span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Stage details */}
            <div className="space-y-4 animate-in fade-in duration-300" key={activePhase.phase}>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#F6C453] text-[9px] font-bold tracking-widest uppercase">
                <span>{activePhase.title} • PHASE 0{activePhase.phase}</span>
              </div>

              <div>
                <h3 className="font-display text-lg sm:text-xl font-black text-white uppercase tracking-tight leading-tight">
                  {activePhase.heading}
                </h3>
              </div>

              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-light">
                {activePhase.description}
              </p>

              {/* Core Deliverables list */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-gray-500 block">
                  Strategic Scope & Execution:
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {activePhase.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Playback Controls & Ambient Sound Controller */}
            <div className="pt-4 border-t border-white/5 space-y-4">
              
              {/* Voice indicator waveform */}
              {isSpeaking && (
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 p-2.5 rounded-xl animate-pulse">
                  <Activity className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest">
                    Synthesizing Motto Voiceover Stream...
                  </span>
                </div>
              )}

              {/* Interactive Sound Console */}
              <div className="grid grid-cols-2 gap-4 bg-black/30 p-3 rounded-xl border border-white/5">
                <div>
                  <button
                    onClick={() => setMusicPlaying(!musicPlaying)}
                    className={`w-full px-3 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      musicPlaying 
                        ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F6C453]' 
                        : 'bg-white/5 border border-transparent text-gray-400'
                    }`}
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{musicPlaying ? 'Mute BGM' : 'Play BGM'}</span>
                  </button>
                </div>
                <div>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`w-full px-3 py-2 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      isPlaying 
                        ? 'bg-[#D4AF37]/20 border border-[#D4AF37] text-[#F6C453]' 
                        : 'bg-white/5 border border-transparent text-gray-400'
                    }`}
                  >
                    <Film className="w-3.5 h-3.5" />
                    <span>{isPlaying ? 'Pause Loop' : 'Play Loop'}</span>
                  </button>
                </div>
              </div>

              {/* Interactive Speaking Trigger */}
              <div className="flex items-center justify-between gap-4 pt-1">
                <button
                  type="button"
                  onClick={toggleSpeakingMotto}
                  className="px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-[#F6C453] text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-lg cursor-pointer"
                >
                  <Mic className="w-4 h-4 fill-current" />
                  <span>{isSpeaking ? '⏹️ Stop Speaking' : '🎙️ Start to Speak'}</span>
                </button>

                <div className="text-right">
                  <span className="text-[8px] font-mono text-gray-500 uppercase block">FORMAT</span>
                  <span className="text-[10px] text-white font-bold block">SPEAKING ON DEMAND</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
