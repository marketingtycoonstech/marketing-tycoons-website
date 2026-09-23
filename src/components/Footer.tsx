import React from 'react';
import { BrandLogo } from './common/BrandLogo';
import { useApp } from '../context/AppContext';
import {
  ArrowUp,
  Shield,
  Linkedin,
  Facebook,
  Twitter,
  Youtube,
  Video,
  Phone,
  MessageCircle
} from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    settings,
    socialLinks,
    setIsPrivacyModalOpen,
    setIsTermsModalOpen
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
          <div className="text-left md:text-center space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] dark:text-[#FFFFFF]">
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

          {/* Social Media Column */}
          <div className="text-left md:text-right space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111] dark:text-[#FFFFFF]">
              Social Media
            </h4>
            <div className="flex items-center md:justify-end gap-2.5 pt-1">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {socialLinks.tiktok && (
                <a
                  href={socialLinks.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                >
                  <Video className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.x && (
                <a
                  href={socialLinks.x}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-sm"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
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

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs dark:text-[#9CA3AF] text-gray-600">
          <div>
            <span>© 2026 Marketing Tycoons. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
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
              onClick={scrollToTop}
              title="Return to Top"
              className="p-2 rounded-full dark:bg-[#111820] bg-white border dark:border-[#2A3441] border-gray-300 hover:border-[#D4AF37] dark:text-[#D1D5DB] text-gray-700 hover:text-[#F6C453] dark:hover:text-[#F6C453] transition-all ml-2 shadow-xs"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
