import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { VideoBackground } from './common/VideoBackground';
import { GoldParticles } from './common/GoldParticles';
import { ScrollReveal } from './common/ScrollReveal';
import { ArrowUpRight, Sparkles, Play } from 'lucide-react';

export const FullWidthVideoSection: React.FC = () => {
  const { settings, setIsVideoStoryModalOpen } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const videoUrl =
    settings.fullWidthVideoUrl ||
    'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31912-large.mp4';
  const posterUrl =
    settings.fullWidthVideoPoster ||
    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=85';
  const isVideoEnabled = settings.fullWidthVideoEnabled !== false;

  const headline =
    settings.fullWidthHeadline || "WE DON'T JUST BUILD BRANDS.\nWE BUILD DIGITAL EXPERIENCES.";
  const subheadline =
    settings.fullWidthSubheadline ||
    'From breakthrough web architecture to high-converting creative direction, we engineer digital authority for ambitious companies worldwide.';

  return (
    <section
      id="cinematic-showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full min-h-[540px] sm:min-h-[660px] flex items-center justify-center overflow-hidden bg-black text-white"
    >
      {/* Top Transition Soft Gradient Blending from Previous Section */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#08090c] to-transparent z-20 pointer-events-none" />

      {/* Cinematic Looping Video Background */}
      {isVideoEnabled ? (
        <VideoBackground
          videoSrc={videoUrl}
          poster={posterUrl}
          overlay="bg-gradient-to-t from-black/90 via-black/60 to-black/85"
          speedBoost={isHovered}
          className="transition-transform duration-1000 ease-out"
        />
      ) : (
        <div className="absolute inset-0">
          <img
            src={posterUrl}
            alt="Cinematic Brand Background"
            className="w-full h-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/85" />
        </div>
      )}

      {/* Subtle Floating Gold Particle Ambience */}
      <GoldParticles density={14} className="opacity-40" />

      {/* Ambient Central Radial Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-[600px] h-[350px] bg-[#d4af37]/15 rounded-full blur-[140px]" />
      </div>

      {/* Center Content Container */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 py-20 text-center flex flex-col items-center">
        <ScrollReveal animation="fade-up" delay={0.1}>
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/70 border border-[#d4af37]/50 shadow-[0_0_20px_rgba(212,175,55,0.25)] backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
            <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">
              Cinematic Production & Digital Craft
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.2}>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] uppercase mb-6 whitespace-pre-line drop-shadow-2xl">
            {headline.split('\n').map((line, idx) => (
              <span key={idx} className="block">
                {idx === 1 ? (
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f3e5ab] to-[#d4af37]">
                    {line}
                  </span>
                ) : (
                  line
                )}
              </span>
            ))}
          </h2>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.3}>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-10">
            {subheadline}
          </p>
        </ScrollReveal>

        <ScrollReveal animation="fade-up" delay={0.4}>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#portfolio"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b38f28] text-black font-bold text-sm tracking-wider uppercase shadow-[0_0_30px_rgba(212,175,55,0.45)] hover:shadow-[0_0_45px_rgba(212,175,55,0.7)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Explore Our Work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              onClick={() => setIsVideoStoryModalOpen(true)}
              data-cursor="play"
              className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-black/60 hover:bg-white/10 text-white border border-white/20 hover:border-[#d4af37]/60 text-sm font-semibold tracking-wider transition-all duration-300 backdrop-blur-md cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#d4af37]/20 flex items-center justify-center border border-[#d4af37]/50">
                <Play className="w-3 h-3 text-[#d4af37] fill-[#d4af37] ml-0.5" />
              </div>
              <span>Watch Brand Film</span>
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Bottom Transition Soft Gradient Blending to Next Section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#08090c] to-transparent z-20 pointer-events-none" />
    </section>
  );
};
