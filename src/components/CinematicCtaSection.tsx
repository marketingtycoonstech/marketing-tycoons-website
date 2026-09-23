import React from 'react';
import { useApp } from '../context/AppContext';
import { VideoBackground } from './common/VideoBackground';
import { GoldParticles } from './common/GoldParticles';
import { ScrollReveal } from './common/ScrollReveal';
import { ArrowRight, Sparkles, ShieldCheck, Mail, MessageSquare } from 'lucide-react';

export const CinematicCtaSection: React.FC = () => {
  const { settings } = useApp();

  const videoUrl =
    settings.ctaVideoUrl ||
    'https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-lines-flowing-in-dark-background-30043-large.mp4';
  const posterUrl =
    settings.ctaVideoPoster ||
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=85';
  const isVideoEnabled = settings.ctaVideoEnabled !== false;

  const headline = settings.ctaHeadline || 'READY TO BUILD\nSOMETHING GREAT?';
  const subheading =
    settings.ctaSubheading ||
    "Let's turn your vision into a digital experience that gets noticed, remembered and trusted.";

  return (
    <section
      id="cinematic-cta"
      className="relative py-28 px-4 sm:px-6 lg:px-8 bg-black text-white overflow-hidden flex items-center justify-center min-h-[580px]"
    >
      {/* Soft Gradient Transitions Top & Bottom */}
      <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-[#08090c] to-transparent z-20 pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-[#08090c] to-transparent z-20 pointer-events-none" />

      {/* Cinematic Looping Video Background */}
      {isVideoEnabled ? (
        <VideoBackground
          videoSrc={videoUrl}
          poster={posterUrl}
          overlay="bg-black/75"
          className="transition-transform duration-1000"
        />
      ) : (
        <div className="absolute inset-0">
          <img
            src={posterUrl}
            alt="CTA Cinematic Backdrop"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>
      )}

      {/* Subtle Floating Gold Particles */}
      <GoldParticles density={16} className="opacity-35" />

      {/* Center Glow Radial */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div className="w-[500px] h-[300px] bg-[#d4af37]/20 rounded-full blur-[130px]" />
      </div>

      {/* Content Container Framed with Animated Gold Accent Border */}
      <div className="relative z-30 max-w-4xl mx-auto w-full text-center">
        <div className="relative p-8 sm:p-14 rounded-3xl bg-black/70 border border-[#d4af37]/40 shadow-[0_0_50px_rgba(212,175,55,0.2)] backdrop-blur-xl overflow-hidden group">
          {/* Subtle animated border shimmer line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ffd700] to-transparent opacity-75 animate-pulse pointer-events-none" />

          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/80 border border-[#d4af37]/50 shadow-[0_0_15px_rgba(212,175,55,0.3)] mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#d4af37]">
                Ready For Market Leadership
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-6 leading-tight whitespace-pre-line drop-shadow-2xl">
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
            <p className="max-w-xl mx-auto text-base sm:text-lg text-gray-300 font-light leading-relaxed mb-10">
              {subheading}
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a
                href="#contact"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b38f28] text-black font-extrabold text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span>Start Your Project</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {settings.whatsappNumber && (
                <a
                  href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-[#d4af37]/60 text-sm font-semibold tracking-wider transition-all duration-300 backdrop-blur-md"
                >
                  <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  <span>Instant WhatsApp Desk</span>
                </a>
              )}
            </div>
          </ScrollReveal>

          {/* Trust Guarantees */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>Dedicated Senior Technical Lead</span>
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Full Commercial IP Ownership</span>
            </span>
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#d4af37]" />
              <span>24hr Inception Response</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
