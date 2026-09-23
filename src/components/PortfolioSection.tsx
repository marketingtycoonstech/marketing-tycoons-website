import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PortfolioProject } from '../types';
import { ScrollReveal } from './common/ScrollReveal';
import { CinematicVideoPlayer } from './portfolio/CinematicVideoPlayer';
import {
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  MessageCircle,
  Clock,
  ArrowRight,
  Play
} from 'lucide-react';

const AnimatedCounter: React.FC = () => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          // Start the count up to 248
          let start = 0;
          const end = 248;
          const duration = 2000; // 2 seconds
          const increment = end / (duration / 16); // ~60fps
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [hasAnimated]);

  return (
    <div 
      ref={elementRef}
      className="inline-flex items-center gap-3 px-4 sm:px-5 py-2.5 rounded-2xl bg-[#D4AF37]/5 border border-[#D4AF37]/15 dark:border-[#D4AF37]/25 shadow-xs relative overflow-hidden shrink-0"
    >
      <div className="absolute top-0 right-0 w-12 h-12 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none" />
      <div className="font-display text-2xl sm:text-3xl font-black text-[#B88932] dark:text-[#F6C453] tracking-tight">
        {count}+
      </div>
      <div className="text-[9px] font-bold uppercase tracking-[0.15em] text-gray-500 dark:text-[#9CA3AF] leading-tight text-left">
        Projects<br/>Completed
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: PortfolioProject;
  onSelect: (p: PortfolioProject) => void;
  whatsappNumber: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onSelect, whatsappNumber }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const isLive = project.status === 'Live Project';
  const cleanWhatsapp = whatsappNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent(
    `Hello Marketing Tycoons! I was viewing your portfolio project "${project.title}" (${project.category}) and I would like to discuss building a similar project.`
  )}`;

  return (
    <div
      onClick={() => onSelect(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden bg-white border border-black/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl dark:bg-black/40 dark:backdrop-blur-xl dark:border-white/10 dark:hover:border-[#D4AF37]/80 dark:hover:shadow-[0_0_35px_rgba(212,175,55,0.28)] flex flex-col justify-between cursor-pointer p-4"
    >
      {/* Cinematic Responsive Video Player Media Frame */}
      <div className="relative mb-3.5 rounded-xl overflow-hidden">
        <CinematicVideoPlayer
          videoUrl={project.videoUrl}
          posterUrl={project.imageUrl}
          title={project.title}
          category={project.category}
          browserUrl={project.browserUrl || project.projectUrl}
          isHovered={isHovered}
          isTouchDevice={isTouchDevice}
        />

        {/* Dark theme elegant dark overlay fade on hover */}
        <div className="absolute inset-0 bg-black/0 dark:group-hover:bg-black/30 transition-colors duration-500 pointer-events-none z-10" />

        {/* Status Badge */}
        <div className="absolute top-2.5 right-2.5 z-20">
          <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/85 backdrop-blur-md text-[#F6C453] border border-[#D4AF37]/50 shadow-md">
            {project.status || 'Featured'}
          </span>
        </div>
      </div>

      {/* Details Area with seamless transitions */}
      <div className="px-1 flex-1 flex flex-col justify-between transition-all duration-500">
        <div>
          <div className="flex items-center justify-between text-xs text-[#B88932] dark:text-[#D4AF37] font-semibold mb-1">
            <span className="uppercase tracking-wider text-[11px] transition-colors duration-300 dark:group-hover:text-[#F6C453]">
              {project.category}
            </span>
            <div className="flex items-center gap-2">
              {project.timeline && (
                <span className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-[#9CA3AF]">
                  <Clock className="w-2.5 h-2.5 text-[#D4AF37]" />
                  <span>{project.timeline}</span>
                </span>
              )}
            </div>
          </div>

          <h3 className="font-display font-bold text-base sm:text-lg text-[#111111] dark:text-[#FFFFFF] group-hover:text-[#B88932] dark:group-hover:text-[#F6C453] transition-colors duration-300 leading-tight">
            {project.title}
          </h3>

          <p className="text-xs text-gray-600 dark:text-[#9CA3AF] mt-1.5 line-clamp-2 font-normal leading-relaxed transition-opacity duration-300 dark:group-hover:text-white">
            {project.shortDescription}
          </p>
        </div>

        {/* Action Button & Links */}
        <div className="mt-4 pt-3 border-t border-black/5 dark:border-white/10 flex items-center justify-between gap-2">
          {/* View Project / Case Study Button with premium gold outline in dark mode */}
          <div className="flex-1">
            {project.projectUrl ? (
              <div className="flex items-center justify-between w-full gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelect(project);
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 dark:bg-gradient-to-r dark:from-[#D4AF37]/10 dark:to-[#F6C453]/10 dark:text-[#F6C453] dark:border dark:border-[#D4AF37]/30 dark:hover:from-[#D4AF37] dark:hover:to-[#F6C453] dark:hover:text-black dark:w-full text-[#B88932] hover:underline"
                >
                  View Project
                </button>
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="dark:hidden inline-flex items-center gap-1.5 text-[11px] font-bold text-[#B88932] hover:underline max-w-[120px] truncate"
                  title={`Visit ${project.projectUrl}`}
                >
                  <span className="truncate">{project.projectUrl.replace('https://', '')}</span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSelect(project);
                }}
                className="w-full text-left px-3.5 py-1.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 dark:bg-gradient-to-r dark:from-[#D4AF37]/10 dark:to-[#F6C453]/10 dark:text-[#F6C453] dark:border dark:border-[#D4AF37]/30 dark:hover:from-[#D4AF37] dark:hover:to-[#F6C453] dark:hover:text-black inline-flex items-center justify-center gap-1 text-[#B88932] hover:underline"
              >
                <span>View Project</span>
                <ArrowRight className="w-3 h-3 dark:hidden" />
              </button>
            )}
          </div>

          {/* Quick Inquire Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer"
            title="Inquire about this project"
          >
            <MessageCircle className="w-3 h-3" />
            <span className="hidden sm:inline">Get Similar</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export const PortfolioSection: React.FC = () => {
  const { portfolio, setActiveProjectModal, settings } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Websites',
    'Designs',
    'Logos',
    'Social Media'
  ];

  const filteredProjects = useMemo(() => {
    if (selectedCategory.toLowerCase() === 'all') {
      return [...portfolio].sort((a, b) => a.order - b.order);
    }
    if (selectedCategory.toLowerCase() === 'designs') {
      return portfolio.filter(p => 
        p.category.toLowerCase().includes('graphic') || 
        p.category.toLowerCase().includes('design') ||
        p.category.toLowerCase() === 'designs'
      );
    }
    if (selectedCategory.toLowerCase() === 'logos') {
      return portfolio.filter(p => 
        p.category.toLowerCase().includes('brand') || 
        p.category.toLowerCase().includes('logo') ||
        p.category.toLowerCase() === 'logos'
      );
    }
    return portfolio
      .filter(p => p.category.toLowerCase().includes(selectedCategory.toLowerCase()))
      .sort((a, b) => a.order - b.order);
  }, [portfolio, selectedCategory]);

  const cleanWhatsapp = (settings.whatsappNumber || '+923426793428').replace(/[^0-9]/g, '');

  return (
    <section
      id="portfolio"
      className="relative py-12 md:py-20 bg-[#F8F7F3] dark:bg-[#050505] text-[#111111] dark:text-[#FFFFFF] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Framed Section Box */}
        <div className="rounded-3xl p-6 sm:p-10 md:p-12 bg-white dark:bg-[#0B0F14] border border-black/10 dark:border-[#2A3441] shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          {/* Subtle Ambient Gold Glow */}
          <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/8 rounded-full blur-[140px] pointer-events-none" />

          {/* Section Heading & Interactive Quick Actions */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 relative z-10">
            <div className="text-left max-w-2xl">
              <ScrollReveal animation="fade-up" delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-[#D4AF37]/10 border border-black/10 dark:border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider text-[#B88932] dark:text-[#F6C453] mb-2.5">
                  <Play className="w-3 h-3 fill-current" />
                  <span>Cinematic Project Reels</span>
                </div>
                <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111] dark:text-[#FFFFFF]">
                  Our Portfolio
                </h2>
              </ScrollReveal>

              <ScrollReveal animation="fade-up" delay={0.2}>
                <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-[#9CA3AF] font-normal leading-relaxed">
                  Hover over any project or scroll to view cinematic motion reels, verified turnaround timelines, and case study breakdowns.
                </p>
              </ScrollReveal>
            </div>

            {/* Quick Engagement Direct Link */}
            <ScrollReveal animation="fade-up" delay={0.25}>
              <div className="flex flex-wrap items-center gap-3.5">
                <AnimatedCounter />
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 px-5 py-3 rounded-xl bg-black dark:bg-[#161D26] hover:dark:bg-[#D4AF37] hover:dark:text-[#050505] text-white text-xs font-bold uppercase tracking-wider border border-black dark:border-[#2A3441] transition-all hover:scale-105 shadow-xs"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F6C453]" />
                  <span>Request Custom Build</span>
                </a>
              </div>
            </ScrollReveal>
          </div>

          {/* Category Filter Tabs */}
          <ScrollReveal animation="fade-up" delay={0.25}>
            <div className="flex flex-wrap items-center gap-2 mb-8 relative z-10">
              {categories.map(cat => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 sm:px-5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-black text-white dark:bg-[#161D26] dark:text-[#F6C453] border border-black dark:border-[#F6C453]/60 shadow-xs'
                        : 'bg-gray-100 dark:bg-[#111820] text-gray-600 dark:text-[#9CA3AF] hover:text-black dark:hover:text-[#FFFFFF] border border-black/10 dark:border-[#2A3441]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Project Showcase Grid in 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 relative z-10">
            {filteredProjects.map((project, idx) => (
              <ScrollReveal
                key={project.id || idx}
                animation="fade-up"
                delay={0.08 * idx}
              >
                <ProjectCard
                  project={project}
                  onSelect={setActiveProjectModal}
                  whatsappNumber={settings.whatsappNumber || '+923426793428'}
                />
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom Engaging Client Links Bar */}
          <ScrollReveal animation="fade-up" delay={0.4}>
            <div className="mt-12 pt-8 border-t border-black/10 dark:border-[#2A3441] flex flex-col md:flex-row items-center justify-between gap-5 bg-black/[0.02] dark:bg-[#111820]/60 p-5 sm:p-6 rounded-2xl border border-black/5 dark:border-[#2A3441]">
              <div className="text-left space-y-1">
                <h4 className="font-display font-bold text-sm sm:text-base text-[#111111] dark:text-[#FFFFFF] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F6C453]" />
                  <span>Have a unique project in mind?</span>
                </h4>
                <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">
                  We engineer tailored architectures, high-impact branding, and full ROI-driven launch strategies.
                </p>
              </div>

              {/* Engagement CTA Links */}
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <a
                  href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent('Hello Marketing Tycoons! I would like to schedule a strategy session for my business.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp Concierge</span>
                </a>

                <a
                  href="#contact"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-[#050505] font-bold text-xs uppercase tracking-wider transition-all hover:scale-105 shadow-sm"
                >
                  <span>Start Your Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
};
