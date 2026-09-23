import React from 'react';
import { useApp } from '../context/AppContext';
import { VideoBackground } from './common/VideoBackground';
import { ScrollReveal } from './common/ScrollReveal';
import { Check, ArrowRight, Award, Users } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { settings } = useApp();

  const aboutVideo =
    settings.aboutVideoUrl ||
    'https://assets.mixkit.co/videos/preview/mixkit-creative-team-working-in-modern-office-43406-large.mp4';
  const aboutPoster =
    settings.aboutVideoPoster ||
    'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85';
  const isVideoEnabled = settings.aboutVideoEnabled !== false;

  return (
    <section
      id="about"
      className="relative py-28 md:py-36 bg-[#F8F7F3] dark:bg-[#0B0F14] text-[#111111] dark:text-[#FFFFFF] transition-colors duration-500 overflow-hidden"
    >
      {/* Background Accent */}
      <div className="absolute right-0 bottom-0 w-[500px] h-[500px] bg-[#D4AF37]/5 dark:bg-[#D4AF37]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Large Cinematic Visual Panel */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                
                {/* Main Video/Visual Frame with Gold Accent Border */}
                <div className="relative rounded-3xl overflow-hidden border border-black/10 dark:border-[rgba(212,175,55,0.25)] shadow-xl dark:shadow-[0_25px_60px_rgba(0,0,0,0.95)] group h-[440px] sm:h-[500px] bg-black">
                  {isVideoEnabled ? (
                    <VideoBackground
                      videoSrc={aboutVideo}
                      poster={aboutPoster}
                      overlay="bg-gradient-to-t from-black/90 via-black/30 to-black/60"
                      className="group-hover:scale-105 transition-transform duration-1000 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0">
                      <img
                        src={aboutPoster}
                        alt="Creative Studio Workspace"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/60" />
                    </div>
                  )}

                  {/* Caption HUD Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 z-20">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md border border-[#D4AF37]/40 text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-2">
                      <Award className="w-3.5 h-3.5 text-[#F6C453]" />
                      <span>Premier Agency Standards</span>
                    </div>
                    <h4 className="text-xl font-display font-bold text-white leading-snug">
                      Where Creative Craft Meets Relentless Technical Execution
                    </h4>
                  </div>
                </div>

                {/* Floating Stat Card Badge */}
                <div className="absolute -bottom-6 -right-4 sm:-right-6 z-30 bg-white/95 dark:bg-[#111820]/95 border border-black/10 dark:border-[#2A3441] rounded-2xl p-4 shadow-xl dark:shadow-2xl backdrop-blur-xl flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F6C453] to-[#D4AF37] flex items-center justify-center text-[#050505] font-extrabold shadow-md">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xl font-display font-black text-[#111111] dark:text-[#FFFFFF]">Top 1%</div>
                    <div className="text-xs text-gray-500 dark:text-[#9CA3AF] font-medium">Global Digital Talent</div>
                  </div>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Copy & Checklist */}
          <div className="lg:col-span-6 space-y-8 order-1 lg:order-2 text-left">
            <ScrollReveal animation="fade-up" delay={0.15}>
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-[rgba(212,175,55,0.25)] bg-gray-100 dark:bg-[#111820] text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37] shadow-xs dark:shadow-[0_0_15px_rgba(212,175,55,0.15)]">
                <div className="w-4 h-4 rounded-full overflow-hidden bg-black border border-[#D4AF37] shrink-0">
                  <img src="/logo.png" alt="Marketing Tycoons" className="w-full h-full object-cover" />
                </div>
                <span>{settings.aboutHeadline || 'Who We Are'}</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.25}>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111111] dark:text-[#FFFFFF] uppercase leading-tight dark:[text-shadow:0_0_28px_rgba(212,175,55,0.30)]">
                Architects Of{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6C453] via-[#D4AF37] to-[#C99A45] drop-shadow-[0_0_25px_rgba(212,175,55,0.45)]">
                  Digital Influence
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.35}>
              <p className="text-base sm:text-lg text-gray-600 dark:text-[#D1D5DB] font-normal leading-relaxed">
                {settings.aboutText}
              </p>
            </ScrollReveal>

            {/* Feature Checkpoints */}
            <ScrollReveal animation="fade-up" delay={0.45}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                {settings.aboutFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 dark:bg-[#111820] border border-black/10 dark:border-[#2A3441] hover:dark:border-[#D4AF37] transition-colors">
                    <div className="w-6 h-6 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37] flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-[#F6C453] stroke-[3]" />
                    </div>
                    <span className="text-sm font-semibold text-gray-800 dark:text-[#FFFFFF]">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* CTAs */}
            <ScrollReveal animation="fade-up" delay={0.55}>
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <a
                  id="about-learn-more-cta"
                  href="#services"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#111111] text-[#F8F7F3] dark:bg-gradient-to-r dark:from-[#D4AF37] dark:to-[#F6C453] dark:text-[#050505] font-bold text-xs tracking-wider uppercase shadow-md dark:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Our Services</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border border-black/15 dark:border-[#2A3441] text-[#111111] dark:text-[#D1D5DB] bg-white/80 dark:bg-[#111820] hover:border-[#D4AF37] hover:text-[#F6C453] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Start Conversation</span>
                </a>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </div>
    </section>
  );
};
