import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { PortfolioProject } from '../types';
import { ScrollReveal } from './common/ScrollReveal';
import { Play, Pause, ChevronLeft, ChevronRight, ArrowUpRight, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';

export const WorkInMotionSection: React.FC = () => {
  const { portfolio, setActiveProjectModal } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Projects with video previews
  const videoProjects = portfolio.filter(p => p.videoUrl);
  const totalProjects = videoProjects.length;

  // Auto slide timer
  useEffect(() => {
    if (isPaused || totalProjects <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalProjects);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused, totalProjects]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalProjects) % totalProjects);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalProjects);
  };

  if (totalProjects === 0) return null;

  return (
    <section
      id="work-in-motion"
      className="relative py-20 md:py-28 bg-[#F8F7F3] dark:bg-[#010103] text-[#111111] dark:text-[#FFFFFF] border-b border-black/10 dark:border-[rgba(223,171,64,0.18)] transition-colors duration-500 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#DFAB40]/5 dark:bg-[#DFAB40]/8 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-[rgba(223,171,64,0.35)] bg-white dark:bg-[#0E0E12] text-xs font-bold uppercase tracking-[0.2em] text-[#DFAB40] mb-3 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Motion & Case Showcase</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight uppercase dark:[text-shadow:0_0_28px_rgba(223,171,64,0.30)]">
                Our Work In{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F0C96F] via-[#DFAB40] to-[#C99A45] drop-shadow-[0_0_25px_rgba(223,171,64,0.45)]">
                  Motion
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.25}>
              <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-[#A0A0A0]">
                Real projects. Real creative work. Real digital experiences.
              </p>
            </ScrollReveal>
          </div>

          {/* Carousel Navigation Controls */}
          <ScrollReveal animation="fade-up" delay={0.3}>
            <div className="flex items-center gap-3">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mr-2">
                <span className="text-black dark:text-[#DFAB40] font-bold">{currentIndex + 1}</span> / {totalProjects}
              </div>

              <button
                onClick={handlePrev}
                aria-label="Previous project video"
                className="w-10 h-10 rounded-full border border-black/15 dark:border-[rgba(223,171,64,0.30)] bg-white dark:bg-[#0E0E12] hover:bg-[#DFAB40] hover:text-black dark:hover:bg-[#DFAB40] dark:hover:text-black flex items-center justify-center text-gray-700 dark:text-gray-200 transition-all duration-200 cursor-pointer shadow-xs"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                aria-label="Next project video"
                className="w-10 h-10 rounded-full border border-black/15 dark:border-[rgba(223,171,64,0.30)] bg-white dark:bg-[#0E0E12] hover:bg-[#DFAB40] hover:text-black dark:hover:bg-[#DFAB40] dark:hover:text-black flex items-center justify-center text-gray-700 dark:text-gray-200 transition-all duration-200 cursor-pointer shadow-xs"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Carousel Viewport (Desktop 3, Tablet 2, Mobile 1) */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / (window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3))}%)`
            }}
          >
            {videoProjects.map((project, idx) => (
              <div
                key={project.id || idx}
                className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
              >
                <MotionCarouselCard
                  project={project}
                  onSelect={setActiveProjectModal}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {videoProjects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-gradient-to-r from-[#F0C96F] to-[#DFAB40] shadow-xs'
                  : 'w-2 bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

interface MotionCarouselCardProps {
  project: PortfolioProject;
  onSelect: (p: PortfolioProject) => void;
}

const MotionCarouselCard: React.FC<MotionCarouselCardProps> = ({ project, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for mobile auto-play when in viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const isLive = project.status === 'Live Project';

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onSelect(project)}
      className="group relative rounded-2xl overflow-hidden bg-white dark:bg-[#0E0E12] border border-black/10 dark:border-[rgba(223,171,64,0.22)] hover:border-[#DFAB40] transition-all duration-400 hover:shadow-xl dark:hover:shadow-[0_15px_40px_rgba(223,171,64,0.2)] flex flex-col cursor-pointer"
    >
      {/* 16:10 Video Media Frame */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
        {/* Browser Top Chrome Simulation for Websites / E-Commerce */}
        {(project.category === 'Websites' || project.category === 'E-Commerce') && (
          <div className="absolute top-0 inset-x-0 z-20 h-6 bg-black/80 backdrop-blur-md border-b border-white/10 px-3 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500/80" />
              <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
              <span className="w-2 h-2 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-[9px] font-mono text-gray-300 truncate max-w-[150px] opacity-80">
              {project.browserUrl || 'https://marketingtycoons.tech'}
            </div>
            <div className="w-6" />
          </div>
        )}

        {/* Video Element */}
        {project.videoUrl ? (
          <video
            ref={videoRef}
            src={project.videoUrl}
            poster={project.imageUrl}
            muted
            loop
            playsInline
            preload="metadata"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        ) : (
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
          />
        )}

        {/* Subtle Dark Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 opacity-70 group-hover:opacity-85 transition-opacity duration-300" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-md text-[10px] font-bold tracking-widest uppercase bg-black/75 backdrop-blur-md text-[#DFAB40] border border-[#DFAB40]/40">
            {project.category}
          </span>

          <span
            className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${
              isLive
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                : 'bg-black/80 text-gray-300 border border-white/20'
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Centered Hover Quick-Action Button */}
        <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[#F0C96F] to-[#DFAB40] text-black font-extrabold text-xs tracking-wider uppercase shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <span>View Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Content Footer */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-display font-bold text-base sm:text-lg text-[#111111] dark:text-white group-hover:text-[#DFAB40] transition-colors leading-snug line-clamp-1">
            {project.title}
          </h3>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
            {project.shortDescription}
          </p>
        </div>

        {/* Services Provided Tags */}
        {project.servicesProvided && project.servicesProvided.length > 0 && (
          <div className="pt-2 border-t border-black/5 dark:border-white/5">
            <div className="flex flex-wrap gap-1.5">
              {project.servicesProvided.slice(0, 2).map((srv, sIdx) => (
                <span
                  key={sIdx}
                  className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/5 dark:bg-white/5 text-gray-700 dark:text-gray-300"
                >
                  {srv}
                </span>
              ))}
              {project.servicesProvided.length > 2 && (
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium text-gray-400">
                  +{project.servicesProvided.length - 2}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="pt-2 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#DFAB40]">
          <span className="group-hover:underline">Explore Case</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};
