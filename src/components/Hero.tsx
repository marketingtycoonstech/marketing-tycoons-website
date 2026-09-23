import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext';
import { Play } from 'lucide-react';
import { MagneticElement } from './common/MagneticElement';
import cinematicLion from '../assets/images/cinematic_majestic_lion_1790104362025.jpg';

export const Hero: React.FC = () => {
  const { settings, setIsVideoStoryModalOpen, theme } = useApp();

  const isDark = theme === 'dark';

  return (
    <section
      id="home"
      className="relative min-h-[95vh] flex flex-col justify-between pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden transition-colors duration-500 bg-[#F8F7F3] dark:bg-[#050505] text-[#111111] dark:text-[#FFFFFF]"
    >
      {/* Background Ambience & Flowing Gold Curves */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {isDark ? (
          <>
            {/* Deep Black #050505 Base with Ambient Gold Spotlights */}
            <div className="absolute top-1/3 right-[8%] -translate-y-1/2 w-[650px] md:w-[850px] h-[650px] md:h-[850px] rounded-full bg-radial from-[#D4AF37]/15 via-[#8A5D18]/08 to-transparent blur-[140px]" />
            <div className="absolute top-1/4 right-[28%] w-[420px] h-[420px] rounded-full bg-radial from-[#F6C453]/12 via-[#D4AF37]/06 to-transparent blur-[110px]" />
            <div className="absolute -bottom-24 left-[-10%] w-[550px] h-[550px] rounded-full bg-radial from-[#D4AF37]/06 to-transparent blur-[140px]" />

            {/* Elegant Thin Flowing Gold Curves */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 900"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="gold-curve-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(212,175,55,0)" />
                  <stop offset="25%" stopColor="rgba(212,175,55,0.15)" />
                  <stop offset="50%" stopColor="rgba(212,175,55,0.25)" />
                  <stop offset="75%" stopColor="rgba(246,196,83,0.20)" />
                  <stop offset="100%" stopColor="rgba(212,175,55,0)" />
                </linearGradient>
                <linearGradient id="gold-curve-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="rgba(212,175,55,0)" />
                  <stop offset="35%" stopColor="rgba(246,196,83,0.20)" />
                  <stop offset="70%" stopColor="rgba(212,175,55,0.22)" />
                  <stop offset="100%" stopColor="rgba(138,93,24,0)" />
                </linearGradient>
                <filter id="subtle-curve-glow" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="2" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
                d="M 620,40 C 840,160 1080,40 1360,260 C 1480,360 1420,620 1200,720 C 960,820 680,770 480,880"
                stroke="rgba(212,175,55,0.20)"
                strokeWidth="1.2"
                filter="url(#subtle-curve-glow)"
              />

              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.5, delay: 0.25, ease: "easeInOut" }}
                d="M 500,110 C 760,210 1000,170 1240,340 C 1400,460 1350,680 1080,770 C 890,830 690,810 380,900"
                stroke="rgba(212,175,55,0.20)"
                strokeWidth="0.9"
                strokeDasharray="5 7"
              />

              <motion.path
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2.8, delay: 0.5, ease: "easeInOut" }}
                d="M 760,10 C 1000,110 1220,200 1380,420 C 1460,560 1360,740 1130,810"
                stroke="url(#gold-curve-gradient-1)"
                strokeWidth="0.75"
              />
            </svg>
          </>
        ) : (
          <>
            <div className="absolute -top-32 -right-32 w-96 md:w-[600px] h-96 md:h-[600px] rounded-full bg-[#DFAB40]/08 blur-[120px]" />
            <div className="absolute -bottom-32 -left-32 w-80 md:w-[500px] h-80 md:h-[500px] rounded-full bg-[#F3F1EB] blur-[90px]" />
          </>
        )}
      </div>

      {/* Main Hero Container */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-6 md:space-y-7 z-20">
            
            {/* Main Hero Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-extrabold tracking-tight leading-[1.08] uppercase"
            >
              <span className="block text-[#111111] dark:text-[#FFFFFF] dark:[text-shadow:0_0_28px_rgba(212,175,55,0.30),0_2px_10px_rgba(0,0,0,0.85)]">
                Your Vision
              </span>
              <span className="block text-[#111111] dark:text-[#FFFFFF] mt-1.5 dark:[text-shadow:0_0_28px_rgba(212,175,55,0.30),0_2px_10px_rgba(0,0,0,0.85)]">
                Our Strategy
              </span>
              <span className="block mt-1.5 text-transparent bg-clip-text bg-gradient-to-r from-[#F6C453] via-[#D4AF37] to-[#C99A45] drop-shadow-[0_0_35px_rgba(212,175,55,0.45)] [filter:drop-shadow(0_0_25px_rgba(212,175,55,0.35))]">
                Digital Success
              </span>
            </motion.h1>

            {/* Subtitle Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
              className="text-base sm:text-lg text-gray-600 dark:text-[#D1D5DB] max-w-xl font-normal leading-relaxed"
            >
              We build powerful brands, stunning designs and high-converting digital solutions to grow your business.
            </motion.p>

            {/* Action Buttons Row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              {/* Primary CTA: Button gradient #D4AF37 -> #F6C453 */}
              <MagneticElement strength={6} cursorVariant="button">
                <a
                  id="hero-primary-cta"
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm tracking-wide transition-all duration-300 bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-[#050505] shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.55)] hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>{settings.primaryCtaText || 'Get Started'}</span>
                </a>
              </MagneticElement>

              {/* Secondary CTA: Dark Translucent Rounded-Full Pill */}
              <MagneticElement strength={4} cursorVariant="button">
                <a
                  id="hero-secondary-cta"
                  href="#services"
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 border border-black/20 dark:border-[#2A3441] bg-white/80 dark:bg-[#111820]/80 text-[#111111] dark:text-[#D1D5DB] hover:border-[#D4AF37] hover:text-[#F6C453] hover:bg-white dark:hover:bg-[#161D26] active:scale-95 cursor-pointer backdrop-blur-md"
                >
                  <span>{settings.secondaryCtaText || 'Our Services'}</span>
                </a>
              </MagneticElement>

              {/* Mobile Watch Story Button */}
              <button
                onClick={() => setIsVideoStoryModalOpen(true)}
                className="inline-flex lg:hidden items-center gap-2.5 text-xs font-semibold text-gray-700 dark:text-[#F6C453] py-2 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
                  <Play className="w-3.5 h-3.5 fill-[#D4AF37] ml-0.5" />
                </div>
                <span>Watch Our Story</span>
              </button>
            </motion.div>

          </div>

          {/* Right Column: Lion Visual */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0 flex items-center justify-center lg:justify-end min-h-[360px] sm:min-h-[440px] lg:min-h-[520px]">
            <AnimatePresence mode="wait">
              {isDark ? (
                <motion.div
                  key="dark-lion-cinematic"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="relative w-full max-w-[540px] aspect-[16/11] sm:aspect-[16/10] flex items-center justify-center select-none"
                >
                  {/* Rim Glow Behind Lion */}
                  <div className="absolute inset-0 bg-radial from-[#D4AF37]/22 via-[#8A5D18]/12 to-transparent blur-[85px] pointer-events-none" />
                  <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-radial from-[#F6C453]/22 to-transparent blur-[60px] pointer-events-none" />
                  <div className="absolute bottom-1/4 right-1/3 w-60 h-60 bg-radial from-[#D4AF37]/18 to-transparent blur-[70px] pointer-events-none" />

                  {/* Lion Image Container fading seamlessly into #050505 */}
                  <div className="relative w-full h-full overflow-hidden flex items-center justify-center rounded-2xl">
                    <img
                      src={cinematicLion}
                      alt="Marketing Tycoons Lion Symbol"
                      className="w-full h-full object-cover object-center scale-105"
                    />

                    {/* Multi-stage Gradient Edge Masking for 100% Seamless Integration into #050505 */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505]/60 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-transparent to-[#050505] pointer-events-none" />
                    <div className="absolute inset-0 bg-radial from-transparent via-transparent to-[#050505]/75 pointer-events-none" />
                  </div>

                  {/* "Watch Our Story" Action Component */}
                  <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 hidden sm:flex items-center gap-3">
                    <MagneticElement strength={6} cursorVariant="video">
                      <button
                        id="hero-watch-story-btn"
                        onClick={() => setIsVideoStoryModalOpen(true)}
                        className="inline-flex items-center gap-3 py-2 px-3 rounded-full hover:bg-black/40 backdrop-blur-sm transition-all group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-full border-2 border-[#D4AF37] bg-[#D4AF37]/15 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                        <span className="text-sm font-bold text-white group-hover:text-[#F6C453] transition-colors tracking-wide">
                          Watch Our Story
                        </span>
                      </button>
                    </MagneticElement>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="light-monogram"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.55 }}
                  className="relative w-full max-w-[500px] aspect-[4/3] rounded-3xl p-8 bg-white border border-black/10 shadow-xl flex flex-col items-center justify-center text-center"
                >
                  <div className="w-28 h-28 rounded-2xl overflow-hidden bg-black border-2 border-[#DFAB40] shadow-xl mb-4">
                    <img src="/logo.png" alt="Marketing Tycoons" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-display text-2xl font-extrabold text-[#111111] uppercase tracking-wide">
                    Marketing Tycoons
                  </h3>
                  <p className="text-xs text-[#DFAB40] font-bold uppercase tracking-[0.25em] mt-1">
                    Elite Brand Architecture
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>

    </section>
  );
};
