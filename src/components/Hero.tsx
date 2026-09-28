import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Play, Share2, Check, Maximize2, X, Download } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setIsVideoStoryModalOpen, setIsConsultationModalOpen, theme, settings } = useApp();
  const [copied, setCopied] = useState(false);
  const [showFullLogoModal, setShowFullLogoModal] = useState(false);

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
        {isDark ? (
          <>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-radial from-[#D4AF37]/8 to-transparent blur-[130px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] rounded-full bg-radial from-[#F6C453]/6 to-transparent blur-[120px]" />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-radial from-amber-200/20 to-transparent blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/3 w-[450px] h-[450px] rounded-full bg-radial from-[#DFAB40]/10 to-transparent blur-[100px]" />
          </>
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 py-6 sm:py-10 lg:py-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
          {/* Left Column: Unified Value Proposition (Columns 1-7) */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-6 lg:space-y-8">
            
            {/* Category Subtitle & Live Global Status */}
            <div className="inline-flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-300 font-medium">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AF37] opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D4AF37]" />
              </span>
              <span className="font-bold uppercase tracking-[0.2em] text-[11px] text-gray-800 dark:text-gray-200">
                Global Full-Funnel Agency
              </span>
              <span className="text-gray-400 dark:text-gray-600" aria-hidden="true">·</span>
              <span className="text-gray-500 dark:text-gray-400 font-mono text-[11px] hidden sm:inline">
                US · UK · UAE · PK
              </span>
            </div>

            {/* Main Dynamic Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black tracking-[-0.03em] leading-[1.05] uppercase text-[#111111] dark:text-[#FFFFFF]">
              Engineering <br className="hidden sm:inline" />
              Category-Defining Brands &amp; <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#C99A45] drop-shadow-[0_0_35px_rgba(212,175,55,0.35)]">
                Scalable Systems.
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-[#C5CAD4] max-w-xl font-light leading-relaxed">
              We partner with ambitious enterprises and emerging founders to design category-defining brands, ultra-fast web architectures, and high-converting performance marketing funnels that accelerate global market presence.
            </p>

            {/* Integrated Actions & Share Row */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              
              {/* Primary CTA Button: Book Free Consultation */}
              <button
                id="hero-primary-cta"
                onClick={() => setIsConsultationModalOpen(true)}
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-[#000000] shadow-lg hover:scale-103 active:scale-97 cursor-pointer hover:shadow-[0_0_25px_rgba(212,175,55,0.4)]"
              >
                <span>Book Free Consultation</span>
              </button>

              {/* Secondary CTA: View Our Work */}
              <a
                id="hero-secondary-cta"
                href="#portfolio"
                className="inline-flex items-center justify-center px-7 py-4 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 border border-black/15 dark:border-[#2A3441] bg-white/70 dark:bg-[#111820]/80 backdrop-blur-md text-[#111111] dark:text-[#D1D5DB] hover:border-[#D4AF37] hover:text-[#F6C453] active:scale-97 cursor-pointer"
              >
                <span>View Our Work</span>
              </a>

              {/* Unified Share Button Option */}
              <button
                onClick={handleShare}
                className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-full border border-black/10 dark:border-[#2A3441] bg-black/5 dark:bg-[#161D26]/70 backdrop-blur-md text-[#111111] dark:text-[#D1D5DB] hover:text-[#D4AF37] transition-all text-xs font-bold uppercase tracking-wider cursor-pointer"
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

            {/* Trust Indicators below CTA */}
            <div className="pt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400 font-light">
              <span>Verified Google &amp; Meta Partners</span>
              <span aria-hidden="true">·</span>
              <span>Sub-500ms Core Web Vitals</span>
              <span aria-hidden="true">·</span>
              <span>Zero Outsourcing Guarantee</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset (Columns 8-12)
              Seamlessly integrated brand showcase without claustrophobic slide frames
          */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex items-center justify-center">
            
            {/* LIGHT MODE: Clean, transparent display without background or border */}
            {!isDark ? (
              <div className="relative w-full max-w-[460px] aspect-square flex flex-col items-center justify-center p-4 sm:p-6 group select-none">
                
                {/* Subtle golden ambient glow */}
                <div className="absolute inset-0 rounded-full bg-radial from-[#D4AF37]/15 via-[#F6C453]/5 to-transparent blur-3xl pointer-events-none" />

                {/* Top Status Indicator */}
                <div className="w-full flex justify-between items-center z-10 mb-2">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-[#D4AF37]/40 backdrop-blur-md shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                    <span className="text-[10px] font-extrabold text-[#111111] tracking-wider uppercase">
                      Official Brand Emblem
                    </span>
                  </div>

                  <button
                    onClick={() => setShowFullLogoModal(true)}
                    className="p-1.5 rounded-full bg-white/80 border border-[#D4AF37]/30 hover:border-[#D4AF37] text-gray-700 hover:text-[#D4AF37] transition-all cursor-pointer shadow-sm"
                    title="Inspect Full Resolution"
                    aria-label="Inspect Full Resolution"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Full Size Logo - Pristine Display with No Background or Border */}
                <div 
                  onClick={() => setShowFullLogoModal(true)}
                  className="relative w-full flex-1 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform duration-700"
                >
                  <img
                    src={settings.heroImageUrlLight || "/logo.png"}
                    alt="Marketing Tycoons Full Size Logo"
                    className="w-full h-full max-h-[350px] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Bottom Action HUD */}
                <div className="w-full flex items-center justify-between z-10 pt-2 border-t border-[#D4AF37]/20 mt-2">
                  <button
                    onClick={() => setIsVideoStoryModalOpen(true)}
                    className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-black/90 hover:bg-black text-white border border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all cursor-pointer shadow-sm text-xs font-bold uppercase tracking-wider"
                  >
                    <div className="w-5 h-5 rounded-full bg-[#D4AF37] text-black flex items-center justify-center">
                      <Play className="w-3 h-3 fill-black ml-0.5" />
                    </div>
                    <span>Watch Story</span>
                  </button>

                  <span className="text-[10px] text-gray-500 font-mono tracking-widest uppercase font-semibold">
                    MT.STUDIO // 2026
                  </span>
                </div>

              </div>
            ) : (
              /* DARK MODE: Seamless Brand Showcase without background or borders */
              <div className="relative w-full max-w-[460px] aspect-square flex flex-col items-center justify-center p-4 sm:p-6 group select-none">
                
                {/* Seamless Lion Emblem blended naturally with the pitch black canvas */}
                <div 
                  onClick={() => setShowFullLogoModal(true)}
                  className="relative w-full flex-1 flex items-center justify-center cursor-pointer group-hover:scale-105 transition-transform duration-700"
                >
                  <img
                    src={settings.heroImageUrlDark || "/logo.png"}
                    alt="Marketing Tycoons Emblem"
                    className="w-full h-full max-h-[350px] object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Full-Screen High-Resolution Logo Modal */}
      {showFullLogoModal && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowFullLogoModal(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-[#FFFFFF] dark:bg-[#0A0A0A] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(212,175,55,0.4)] text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-[#2A3441]">
              <div className="text-left">
                <h3 className="font-display font-black text-lg text-[#111111] dark:text-[#FFFFFF] uppercase tracking-wide">
                  Marketing Tycoons
                </h3>
                <span className="text-xs text-[#D4AF37] font-semibold uppercase tracking-widest">
                  Official Full Resolution Emblem
                </span>
              </div>
              <button
                onClick={() => setShowFullLogoModal(false)}
                className="p-2 rounded-full border border-black/10 dark:border-[#2A3441] hover:bg-black/5 dark:hover:bg-white/10 text-gray-600 dark:text-gray-300 transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High Definition Full Size Logo Display */}
            <div className="py-6 flex items-center justify-center">
              <div className="relative w-72 sm:w-84 aspect-square flex items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-[#111820] to-[#000000] border border-[#D4AF37]/50 shadow-2xl">
                <img
                  src="/logo.png"
                  alt="Marketing Tycoons Full Size Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_25px_rgba(212,175,55,0.5)]"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-black/10 dark:border-[#2A3441]">
              <span className="text-xs text-gray-500 font-mono">
                1024 × 1024 PX // MASTER ASSET
              </span>

              <a
                href="/logo.png"
                download="marketing_tycoons_logo.png"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-bold text-xs uppercase tracking-wider shadow-sm hover:scale-103 transition-transform cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Asset</span>
              </a>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
