import React from 'react';
import { BrandLogo } from './common/BrandLogo';
import { useApp } from '../context/AppContext';
import { NewsletterSection } from './NewsletterSection';
import {
  ArrowUp,
  Shield,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Video,
  Phone,
  MessageCircle,
  Pin,
  ShoppingBag,
  Flame,
  CheckCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    settings,
    socialLinks,
    services,
    setActiveServiceModal,
    setIsPrivacyModalOpen,
    setIsTermsModalOpen,
    setIsRefundModalOpen,
    setIsCookieModalOpen
  } = useApp();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Portfolio', href: '#portfolio' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <footer id="main-site-footer" className="relative dark:bg-[#030303] bg-gray-100 dark:text-[#9CA3AF] text-gray-600 border-t dark:border-[#2A3441] border-gray-200 pt-16 pb-12 overflow-hidden transition-colors duration-300">
      
      {/* Flowing Gold Wave Beam at the top of the footer */}
      <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none overflow-hidden opacity-60">
        <svg
          className="w-full h-full"
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,40 C320,80 720,0 1440,50"
            stroke="url(#footer-gold-gradient)"
            strokeWidth="2.5"
            fill="none"
          />
          <path
            d="M0,55 C400,10 900,75 1440,25"
            stroke="url(#footer-gold-gradient)"
            strokeWidth="1.2"
            strokeDasharray="4 6"
            fill="none"
          />
          <defs>
            <linearGradient id="footer-gold-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="30%" stopColor="#D4AF37" />
              <stop offset="60%" stopColor="#F6C453" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b dark:border-[#2A3441] border-gray-200 items-start">
          
          {/* Brand Column */}
          <div className="space-y-3">
            <BrandLogo size="lg" />
            <p className="text-xs font-semibold text-gray-400 dark:text-[#9CA3AF] tracking-wide">
              Your Growth, Our Mission
            </p>
            <div className="pt-2 flex flex-col space-y-1.5 text-xs text-gray-500 dark:text-[#9CA3AF]">
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="inline-flex items-center gap-2 hover:text-[#D4AF37] dark:hover:text-[#F6C453] transition-colors"
                title="Call Official Line"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="font-semibold text-gray-700 dark:text-gray-200">{settings.phone}</span>
              </a>
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 hover:text-emerald-500 transition-colors"
                title="Direct WhatsApp"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                <span className="font-semibold text-gray-700 dark:text-gray-200">WhatsApp: {settings.whatsappNumber}</span>
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="text-left md:text-center space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] dark:text-[#FFFFFF] mb-3">
                Quick Links
              </h4>
              <div className="flex flex-col space-y-2 text-xs">
                {navLinks.map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-gray-500 dark:text-[#9CA3AF] hover:text-[#D4AF37] dark:hover:text-[#F6C453] transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Shifted Official Social Networks Block */}
            <div className="pt-4 border-t dark:border-[#2A3441] border-gray-200">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] dark:text-[#F6C453] block mb-3 text-center">
                Official Channels
              </span>
              <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-[240px] mx-auto">
                {socialLinks.tiktok && (
                  <a
                    href={socialLinks.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-white hover:text-[#D4AF37] dark:hover:text-[#F6C453] hover:scale-110 transition-all shadow-md hover:border-[#D4AF37]"
                    title="TikTok"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.52-4.06-1.39v7.73c0 1.27-.33 2.58-1.04 3.62-.71 1.04-1.78 1.83-2.98 2.16-1.2.33-2.5.21-3.64-.34-1.14-.55-2.06-1.51-2.58-2.67-.52-1.16-.58-2.5-.18-3.69.4-1.19 1.25-2.19 2.37-2.8 1.12-.61 2.44-.73 3.65-.34V8.34c-2.07-.31-4.22-.05-6.12.78-1.9 1.17-3.34 3.09-3.99 5.25-.65 2.16-.44 4.56.59 6.58 1.03 2.02 2.87 3.59 5.08 4.27 2.21.68 4.66.44 6.7-.68 2.04-1.12 3.48-3.15 3.93-5.46.12-.6.18-1.21.18-1.82V.02h-3.91z"/>
                    </svg>
                  </a>
                )}
                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-all shadow-md"
                    title="Facebook"
                  >
                    <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
                    </svg>
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white hover:scale-110 transition-all shadow-md"
                    title="LinkedIn"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
                {socialLinks.x && (
                  <a
                    href={socialLinks.x}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-black border border-white/10 flex items-center justify-center text-white hover:text-[#D4AF37] dark:hover:text-[#F6C453] hover:scale-110 transition-all shadow-md hover:border-[#D4AF37]"
                    title="X (Twitter)"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                )}
                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-all shadow-md"
                    title="YouTube"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.513 3.545 12 3.545 12 3.545s-7.513 0-9.388.51a3.001 3.001 0 0 0-2.11 2.108C0 8.037 0 12 0 12s0 3.963.502 5.837a3.003 3.003 0 0 0 2.11 2.108c1.875.51 9.388.51 9.388.51s7.513 0 9.388-.51a3.001 3.001 0 0 0 2.11-2.108c.502-1.874.502-5.837.502-5.837s0-3.963-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
                {socialLinks.pinterest && (
                  <a
                    href={socialLinks.pinterest}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-red-700 flex items-center justify-center text-white hover:scale-110 transition-all shadow-md"
                    title="Pinterest"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.947-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C23.97 5.39 18.592.02 11.995.02z"/>
                    </svg>
                  </a>
                )}
                {socialLinks.olx && (
                  <a
                    href={socialLinks.olx}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white hover:scale-110 transition-all shadow-md"
                    title="OLX"
                  >
                    <svg className="w-4.5 h-4.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="6" cy="12" r="3" />
                      <path d="M11 9v6h3" />
                      <path d="M16 9l4 6M20 9l-4 6" />
                    </svg>
                  </a>
                )}
                {socialLinks.reddit && (
                  <a
                    href={socialLinks.reddit}
                    target="_blank"
                    rel="noreferrer"
                    className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white hover:scale-110 transition-all shadow-md"
                    title="Reddit"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M24 11.5c0-1.65-1.35-3-3-3-.96 0-1.86.48-2.42 1.24-1.64-1-3.85-1.64-6.29-1.72l1.41-4.53 3.98.85c-.04.24.04.48.21.66.18.18.42.25.66.21.73-.13 1.39.38 1.52 1.12.13.73-.38 1.39-1.12 1.52-.73.13-1.39-.38-1.52-1.12-.04-.24-.01-.49.09-.72l-4.21-.9c-.1-.02-.2-.01-.28.05-.08.06-.13.15-.14.25l-1.54 4.93c-2.49.07-4.73.7-6.39 1.71-.56-.75-1.45-1.22-2.4-1.22-1.65 0-3 1.35-3 3 0 1.12.63 2.1 1.56 2.62-.04.29-.06.59-.06.88 0 3.86 5.01 7 11.19 7 6.18 0 11.19-3.14 11.19-7 0-.29-.02-.59-.06-.88.94-.52 1.57-1.5 1.57-2.62zm-16.5 1c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm8.38 5.65c-.86.86-2.44.93-3.38.93-.94 0-2.52-.07-3.38-.93-.1-.1-.1-.26 0-.36.09-.09.25-.09.35 0 .67.67 1.99.76 3.03.76 1.04 0 2.36-.09 3.03-.76.1-.1.26-.1.35 0 .09.09.09.26 0 .36zm-.38-3.65c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Verification & Trust Column */}
          <div className="text-left md:text-right space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] dark:text-[#FFFFFF]">
              Agency Credentials
            </h4>
            <div className="flex flex-col gap-2 md:items-end text-xs text-gray-500 dark:text-[#9CA3AF]">
              <div className="inline-flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-md border border-emerald-500/20">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] font-bold tracking-wider">SECURE LATENCY CRITICAL</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-[#D4AF37]/10 dark:bg-[#D4AF37]/5 text-[#D4AF37] px-2.5 py-1 rounded-md border border-[#D4AF37]/20">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] font-bold tracking-wider">META BUSINESS PARTNER</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-500/10 dark:bg-blue-500/5 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md border border-blue-500/20">
                <CheckCircle className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] font-bold tracking-wider">GOOGLE CLOUD PARTNER</span>
              </div>
            </div>
          </div>

        </div>

        {/* Prominent Gold-Themed Contact Us on WhatsApp Banner */}
        <div className="my-8 p-5 sm:p-6 rounded-2xl bg-[#090D12] dark:bg-[#070A0E] border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-5 shadow-xl">
          <div className="flex items-center gap-3.5 text-left w-full md:w-auto">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F6C453] p-0.5 shadow-[0_0_15px_rgba(212,175,55,0.35)] shrink-0">
              <div className="w-full h-full rounded-[10px] bg-black flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-[#F6C453]" />
              </div>
            </div>
            <div>
              <h4 className="font-display font-extrabold text-sm sm:text-base text-white">
                Direct WhatsApp Priority Concierge
              </h4>
              <p className="text-xs text-gray-400">
                Connect directly with our agency leadership for rapid quotes & scoping.
              </p>
            </div>
          </div>

          <a
            href={`https://wa.me/${(settings.whatsappNumber || '+923426793428').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Marketing Tycoons! I would like to inquire about your services.')}`}
            target="_blank"
            rel="noreferrer"
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.7)] hover:scale-105 transition-all shrink-0 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-black" />
            <span>Contact Us on WhatsApp: {settings.whatsappNumber || '+923426793428'}</span>
          </a>
        </div>

        {/* High-Conversion Executive Newsletter Section */}
        <NewsletterSection />

        {/* Bottom Bar: Copyright & 4 Policies */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs dark:text-[#9CA3AF] text-gray-600">
          <div>
            <span>© 2026 Marketing Tycoons. All rights reserved. Registered International Digital Agency.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-5">
            <button
              onClick={() => setIsPrivacyModalOpen(true)}
              className="inline-flex items-center gap-1 hover:text-[#F6C453] transition-colors cursor-pointer"
            >
              <Shield className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Privacy Policy</span>
            </button>
            <button
              onClick={() => setIsTermsModalOpen(true)}
              className="hover:text-[#F6C453] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => setIsRefundModalOpen(true)}
              className="hover:text-[#F6C453] transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <button
              onClick={() => setIsCookieModalOpen(true)}
              className="hover:text-[#F6C453] transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
            <button
              onClick={scrollToTop}
              title="Return to Top"
              className="p-2 rounded-full dark:bg-[#111820] bg-white border dark:border-[#2A3441] border-gray-300 hover:border-[#D4AF37] dark:text-[#D1D5DB] text-gray-700 hover:text-[#F6C453] dark:hover:text-[#F6C453] transition-all ml-1 shadow-xs cursor-pointer"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
