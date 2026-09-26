import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Play, Share2, Check, Copy } from 'lucide-react';
import pakistaniFounderOffice from '../assets/images/pakistani_founder_office_1790191431500.jpg';

export const Hero: React.FC = () => {
  const { settings, setIsVideoStoryModalOpen, theme } = useApp();
  const [copied, setCopied] = useState(false);

  const isDark = theme === 'dark';

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-[#F8F7F3] dark:bg-[#000000] text-[#111111] dark:text-[#FFFFFF]"
    >
      {/* Background Ambience & Glows - Minimal & Premium */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {isDark && (
          <>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-radial from-[#D4AF37]/5 to-transparent blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-radial from-[#F6C453]/4 to-transparent blur-[100px]" />
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        {/* Single Premium Unified Hero Card Container */}
        <div className="relative w-full overflow-hidden bg-[#FFFFFF] dark:bg-[#0A0A0A] border border-black/10 dark:border-[#222222] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl dark:shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Unified Value Proposition (Columns 1-7) */}
            <div className="lg:col-span-7 flex flex-col text-left space-y-6 lg:space-y-8">
              
              {/* Category Subtitle */}
              <div className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
                  Premier Solutions & Visual Authority
                </span>
              </div>

              {/* Main Dynamic Headline */}
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-black tracking-tight leading-[1.1] uppercase text-[#111111] dark:text-[#FFFFFF]">
                Your Vision. <br className="hidden sm:block" />
                Our Strategy. <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#C99A45]">
                  Digital Success.
                </span>
              </h1>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-[#D1D5DB] max-w-xl font-light leading-relaxed">
                Marketing Tycoons helps businesses transform ideas into powerful digital experiences. We build authoritative brands, custom software architectures, and high-converting performance marketing systems.
              </p>

              {/* Integrated Actions & Share Row */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                
                {/* Primary Get Started Button */}
                <a
                  id="hero-primary-cta"
                  href="#contact"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-[#000000] shadow-lg hover:scale-103 active:scale-97 cursor-pointer"
                >
                  <span>{settings.primaryCtaText || 'Get Started'}</span>
                </a>

                {/* Secondary Explore Services Button */}
                <a
                  id="hero-secondary-cta"
                  href="#services"
                  className="inline-flex items-center justify-center px-7 py-3 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-black/15 dark:border-[#222222] bg-[#F8F7F3] dark:bg-[#050505] text-[#111111] dark:text-[#D1D5DB] hover:border-[#D4AF37] hover:text-[#F6C453] active:scale-97 cursor-pointer"
                >
                  <span>Our Services</span>
                </a>

                {/* Unified Share Button Option */}
                <button
                  onClick={handleShare}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-transparent hover:border-black/10 dark:hover:border-[#222222] bg-black/5 dark:bg-[#111111]/40 text-[#111111] dark:text-[#D1D5DB] hover:text-[#D4AF37] transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share Agency</span>
                    </>
                  )}
                </button>

              </div>

            </div>

            {/* Right Column: Premium Interactive Pakistani Founder Portrait (Columns 8-12) */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0 flex items-center justify-center">
              
              {/* Image Frame with Double Minimal Border */}
              <div className="relative w-full max-w-[460px] aspect-[4/3] sm:aspect-[1.3] overflow-hidden rounded-2xl border border-black/10 dark:border-[#222222] bg-black group shadow-xl">
                
                {/* Real-Human Pakistani Founder Image */}
                <img
                  src={pakistaniFounderOffice}
                  alt="Marketing Tycoons Founder at Modern Lahore Office"
                  className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-103"
                  referrerPolicy="no-referrer"
                />

                {/* Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                {/* Floating "Watch Our Story" Action HUD */}
                <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6">
                  
                  {/* Status Indicator */}
                  <div className="flex justify-start">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/75 border border-[#222222] backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-ping" />
                      <span className="text-[9px] font-bold text-[#FFFFFF] tracking-wider uppercase">
                        Founder's Desk
                      </span>
                    </div>
                  </div>

                  {/* Play Action Trigger */}
                  <div className="flex justify-between items-end">
                    <button
                      onClick={() => setIsVideoStoryModalOpen(true)}
                      className="inline-flex items-center gap-2.5 py-2 px-3 rounded-full bg-black/70 hover:bg-black/90 border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all group cursor-pointer"
                    >
                      <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#000000] flex items-center justify-center transition-transform group-hover:scale-105">
                        <Play className="w-4.5 h-4.5 fill-[#000000] ml-0.5" />
                      </div>
                      <span className="text-xs font-bold text-white tracking-wider uppercase">
                        Watch Story
                      </span>
                    </button>
                    
                    <span className="text-[9px] text-[#D1D5DB] font-mono tracking-widest hidden sm:block">
                      MT.STUDIO // 2026
                    </span>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
