import React, { useState, useEffect } from 'react';
import { BrandLogo } from './common/BrandLogo';
import { useApp } from '../context/AppContext';
import { MagneticElement } from './common/MagneticElement';
import { Sun, Moon, Menu, X, ChevronRight, Video, Facebook, Linkedin, Twitter, Youtube, Phone, MessageCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    theme,
    toggleTheme,
    currentView,
    setCurrentView,
    isAdminLoggedIn,
    setIsLoginModalOpen,
    socialLinks,
    settings
  } = useApp();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'services', 'portfolio', 'testimonials', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Services', href: '#services', id: 'services' },
    { label: 'Portfolio', href: '#portfolio', id: 'portfolio' },
    { label: 'Testimonials', href: '#testimonials', id: 'testimonials' },
    { label: 'Contact', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
    e.preventDefault();
    setActiveSection(id);
    if (currentView === 'admin') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleAdminClick = () => {
    if (isAdminLoggedIn) {
      setCurrentView(currentView === 'admin' ? 'public' : 'admin');
    } else {
      setIsLoginModalOpen(true);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FFFFFF]/95 dark:bg-[#050505]/95 backdrop-blur-md border-b border-black/10 dark:border-[#2A3441] shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.8)] py-3'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo on the left - Clicking directly opens Admin Login / Admin Portal */}
          <BrandLogo
            size="md"
            onClick={handleAdminClick}
            title={isAdminLoggedIn ? (currentView === 'admin' ? 'Exit Admin Dashboard' : 'Open Admin Dashboard') : 'Admin Portal (Click to Login)'}
          />

          {/* Center Floating Capsule Pill Navbar */}
          <div className="hidden lg:flex items-center gap-1.5 px-6 py-2 rounded-full bg-white/90 dark:bg-[#050505]/90 border border-black/10 dark:border-[#2A3441] shadow-md dark:shadow-[0_4px_25px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className={`relative px-4 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-full ${
                    isActive
                      ? 'text-[#111111] dark:text-[#F6C453]'
                      : 'text-gray-600 dark:text-[#D1D5DB] hover:text-[#111111] dark:hover:text-[#F6C453]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#F6C453] rounded-full shadow-[0_0_8px_#F6C453]" />
                  )}
                </a>
              );
            })}

            {/* In-Nav Theme Toggle Pill Switch */}
            <div className="ml-2 pl-2 border-l border-black/10 dark:border-[#2A3441]">
              <button
                id="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label="Toggle visual theme"
                title={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gray-100 dark:bg-[#111820] border border-black/10 dark:border-[#2A3441] text-[#111111] dark:text-[#F6C453] hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
              >
                {theme === 'dark' ? (
                  <Sun className="w-3.5 h-3.5 text-[#F6C453] fill-[#F6C453]/20" />
                ) : (
                  <Moon className="w-3.5 h-3.5 text-[#111111] fill-current" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Right Controls: Theme + Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-theme-toggle"
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2 rounded-full border border-black/10 dark:border-[#2A3441] text-[#111111] dark:text-[#F6C453] bg-black/5 dark:bg-[#111820]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F6C453]" /> : <Moon className="w-4 h-4 text-[#111111]" />}
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="p-2 rounded-full border border-black/10 dark:border-[#2A3441] text-[#111111] dark:text-[#D1D5DB] bg-black/5 dark:bg-[#111820]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[64px] z-40 bg-[#F8F7F3]/98 dark:bg-[#050505]/98 backdrop-blur-2xl border-b border-black/10 dark:border-[#2A3441] animate-in slide-in-from-top-4 duration-200">
          <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col justify-between h-[calc(100vh-64px)] overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.id)}
                  className="flex items-center justify-between text-lg font-bold text-[#111111] dark:text-[#D1D5DB] hover:text-[#F6C453] py-2 border-b border-black/5 dark:border-[#2A3441] transition-colors"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#F6C453]" />
                </a>
              ))}
            </nav>

            <div className="pt-6 space-y-5">
              {/* Official Social Links in Mobile Drawer */}
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-gray-500 dark:text-[#9CA3AF] mb-3">
                  Official Channels
                </div>
                <div className="flex items-center gap-2.5">
                  {socialLinks.tiktok && (
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      title="TikTok"
                      className="w-9 h-9 rounded-xl border border-black/10 dark:border-[#2A3441] flex items-center justify-center text-gray-600 dark:text-[#9CA3AF] hover:text-[#F6C453] bg-black/5 dark:bg-[#111820]"
                    >
                      <Video className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noreferrer"
                      title="Facebook"
                      className="w-9 h-9 rounded-xl border border-black/10 dark:border-[#2A3441] flex items-center justify-center text-gray-600 dark:text-[#9CA3AF] hover:text-[#F6C453] bg-black/5 dark:bg-[#111820]"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      title="LinkedIn"
                      className="w-9 h-9 rounded-xl border border-black/10 dark:border-[#2A3441] flex items-center justify-center text-gray-600 dark:text-[#9CA3AF] hover:text-[#F6C453] bg-black/5 dark:bg-[#111820]"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.x && (
                    <a
                      href={socialLinks.x}
                      target="_blank"
                      rel="noreferrer"
                      title="X / Twitter"
                      className="w-9 h-9 rounded-xl border border-black/10 dark:border-[#2A3441] flex items-center justify-center text-gray-600 dark:text-[#9CA3AF] hover:text-[#F6C453] bg-black/5 dark:bg-[#111820]"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noreferrer"
                      title="YouTube"
                      className="w-9 h-9 rounded-xl border border-black/10 dark:border-[#2A3441] flex items-center justify-center text-gray-600 dark:text-[#9CA3AF] hover:text-[#F6C453] bg-black/5 dark:bg-[#111820]"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Direct Call & WhatsApp Quick Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-black/5 dark:bg-[#111820] border border-black/10 dark:border-[#2A3441] text-xs font-bold text-gray-800 dark:text-gray-200 hover:border-[#D4AF37] transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Call: {settings.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${(settings.whatsappNumber || '+923426793428').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Marketing Tycoons! I would like to inquire about your services.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-all"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Admin Button */}
              <button
                onClick={handleAdminClick}
                className="w-full py-3 rounded-full border border-black/15 dark:border-[#2A3441] text-[#111111] dark:text-[#D1D5DB] hover:border-[#D4AF37] hover:text-[#F6C453] text-xs font-bold tracking-wider uppercase transition-colors bg-white/50 dark:bg-[#111820]"
              >
                {isAdminLoggedIn ? (currentView === 'admin' ? 'Exit Admin Dashboard' : 'Admin Portal') : 'Admin Portal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
