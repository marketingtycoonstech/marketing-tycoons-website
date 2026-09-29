import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { PortfolioProject } from '../types';
import { ScrollReveal } from './common/ScrollReveal';
import { CinematicVideoPlayer } from './portfolio/CinematicVideoPlayer';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectCardProps {
  project: PortfolioProject;
  index: number;
  onSelect: (p: PortfolioProject) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 42, scale: 0.96 },
  visible: (idx: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      delay: (idx % 3) * 0.1,
      ease: [0.16, 1, 0.3, 1] as const
    }
  })
};

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const highlightStat = useMemo(() => {
    if (!project.results) return null;
    const resultsStr = Array.isArray(project.results) ? project.results[0] : project.results;
    const parts = resultsStr.split(',');
    return parts[0].trim();
  }, [project.results]);

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      onClick={() => onSelect(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        scale: 1.025,
        y: -5,
        borderColor: 'rgba(212, 175, 55, 0.8)',
        boxShadow: '0 16px 36px -6px rgba(212, 175, 55, 0.25), 0 0 20px rgba(212, 175, 55, 0.15)'
      }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="group relative flex flex-col justify-between bg-white dark:bg-[#0A0A0A] border border-black/10 dark:border-[#222222] rounded-2xl p-4 cursor-pointer transition-colors duration-200"
    >
      {/* Visual Preview Frame */}
      <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 bg-black">
        <CinematicVideoPlayer
          videoUrl={project.videoUrl}
          posterUrl={project.imageUrl}
          title={project.title}
          category={project.category}
          browserUrl={project.browserUrl || project.projectUrl}
          isHovered={isHovered}
          isTouchDevice={false}
        />
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 pointer-events-none" />
      </div>

      {/* Metadata & Title Content */}
      <div className="space-y-2">
        {/* Clean Unboxed Metadata with Typographic Dot Separator (Anti-Pill discipline) */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-[#D4AF37] uppercase">
          <span>{project.category}</span>
          {project.timeline && (
            <>
              <span className="text-gray-400 dark:text-[#222222]">•</span>
              <span className="text-gray-500 dark:text-gray-400 font-medium font-mono">{project.timeline}</span>
            </>
          )}
        </div>

        <h3 className="font-display text-lg font-bold text-[#111111] dark:text-[#FFFFFF] transition-colors group-hover:text-[#D4AF37]">
          {project.title}
        </h3>

        {/* Small animated stats row highlighting project results & timeline */}
        <motion.div 
          initial={{ opacity: 0.9, y: 0 }}
          whileHover={{ y: -1 }}
          className="flex flex-wrap items-center gap-1.5 pt-0.5"
        >
          {highlightStat && (
            <motion.span
              whileHover={{ scale: 1.03, backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
              className="inline-flex items-center gap-1 text-[9px] font-bold bg-[#D4AF37]/10 dark:bg-[#D4AF37]/5 border border-[#D4AF37]/25 text-[#D4AF37] px-2 py-0.5 rounded font-mono uppercase tracking-wider transition-all duration-200"
            >
              <span>📈 {highlightStat}</span>
            </motion.span>
          )}
          {project.timeline && (
            <motion.span 
              whileHover={{ scale: 1.03 }}
              className="inline-flex items-center gap-1 text-[9px] font-semibold bg-gray-100 dark:bg-[#111111] border border-black/5 dark:border-[#222222] text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded font-mono transition-all duration-200"
            >
              <span>⏱️ {project.timeline}</span>
            </motion.span>
          )}
        </motion.div>

        <p className="text-xs text-gray-600 dark:text-[#D1D5DB] leading-relaxed font-light line-clamp-2">
          {project.shortDescription}
        </p>
      </div>

      {/* View Action - Premium luxury arrow link */}
      <div className="mt-5 pt-3 border-t border-black/5 dark:border-[#222222] flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#111111] dark:text-[#D1D5DB] group-hover:text-[#D4AF37] transition-all">
        <span>View Project Case Study</span>
        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </motion.div>
  );
};

export const PortfolioSection: React.FC = () => {
  const { portfolio, setActiveProjectModal } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Curation categories matching the user request and agency taxonomy
  const categories = [
    'All',
    'Web',
    'Branding',
    'Design',
    'SEO',
    'Marketing'
  ];

  const filteredProjects = useMemo(() => {
    const selected = selectedCategory.toLowerCase();
    
    if (selected === 'all') {
      return [...portfolio].sort((a, b) => a.order - b.order);
    }
    
    return portfolio
      .filter(p => {
        const cat = p.category.toLowerCase();
        if (selected === 'web') {
          return cat.includes('web') || cat.includes('e-commerce') || cat.includes('ecommerce');
        }
        if (selected === 'branding') {
          return cat.includes('brand') || cat.includes('logo') || cat.includes('branding');
        }
        if (selected === 'design') {
          return cat.includes('design') || cat.includes('graphic');
        }
        if (selected === 'seo') {
          return cat.includes('seo');
        }
        if (selected === 'marketing') {
          return cat.includes('social') || cat.includes('marketing') || cat.includes('ads') || cat.includes('meta');
        }
        return cat.includes(selected);
      })
      .sort((a, b) => a.order - b.order);
  }, [portfolio, selectedCategory]);

  return (
    <section
      id="portfolio"
      className="relative py-24 bg-[#F8F7F3] dark:bg-[#050505] text-[#111111] dark:text-[#FFFFFF] transition-colors border-t border-black/10 dark:border-[#222222]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Editorial Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left max-w-2xl">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 dark:bg-[#0A0A0A] border border-black/10 dark:border-[#222222] text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] mb-3">
                <span>Featured Creations</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black tracking-tight text-[#111111] dark:text-[#FFFFFF] uppercase">
                PORTFOLIO SHOWCASE
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-[#D1D5DB] font-light leading-relaxed">
                Explore a selected curation of high-performing platforms and high-fidelity branding solutions built for our global partners.
              </p>
            </ScrollReveal>
          </div>

          {/* Interactive filter control tabs (Segmented pill backgrounds complying with anti-pill static rule) */}
          <ScrollReveal animation="fade-up" delay={0.25}>
            <div className="flex flex-wrap items-center gap-1.5 bg-black/5 dark:bg-[#0A0A0A] p-1.5 rounded-full border border-black/10 dark:border-[#222222]">
              {categories.map(cat => {
                const isActive = selectedCategory.toLowerCase() === cat.toLowerCase();
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#111111] text-white dark:bg-[#D4AF37] dark:text-black shadow-sm'
                        : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Dynamic Project Grid with layout transition animation to prevent pops */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || `project-${idx}`}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard
                  project={project}
                  index={idx}
                  onSelect={setActiveProjectModal}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Minimal High-End CTA Link */}
        <ScrollReveal animation="fade-up" delay={0.3}>
          <div className="mt-16 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 text-xs font-black uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#F6C453] transition-colors cursor-pointer group"
            >
              <span>Build a high-converting platform with us</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
