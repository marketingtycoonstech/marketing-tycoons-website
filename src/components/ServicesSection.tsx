import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { DynamicIcon } from './common/DynamicIcon';
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, Layers } from 'lucide-react';
import { ServiceItem } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

export const ServicesSection: React.FC = () => {
  const { services, setActiveServiceModal } = useApp();
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const enabledServices = useMemo(() => {
    return services
      .filter((s) => s.enabled)
      .sort((a, b) => a.order - b.order);
  }, [services]);

  const categories = ['All', 'Web & Tech', 'Performance Ads', 'Brand & Design', 'SEO & Organic'];

  const filteredServices = useMemo(() => {
    if (activeFilter === 'All') return enabledServices;

    const lower = activeFilter.toLowerCase();
    return enabledServices.filter((s) => {
      const title = s.title.toLowerCase();
      const desc = s.shortDescription.toLowerCase();
      const combined = `${title} ${desc}`;

      if (lower.includes('web')) {
        return combined.includes('web') || combined.includes('software') || combined.includes('react') || combined.includes('ecommerce') || combined.includes('code');
      }
      if (lower.includes('ads') || lower.includes('performance')) {
        return combined.includes('ad') || combined.includes('meta') || combined.includes('marketing') || combined.includes('ppc') || combined.includes('roas') || combined.includes('growth');
      }
      if (lower.includes('brand') || lower.includes('design')) {
        return combined.includes('brand') || combined.includes('design') || combined.includes('ui') || combined.includes('ux') || combined.includes('identity');
      }
      if (lower.includes('seo') || lower.includes('organic')) {
        return combined.includes('seo') || combined.includes('organic') || combined.includes('search') || combined.includes('audit');
      }
      return true;
    });
  }, [enabledServices, activeFilter]);

  const handleCardClick = (service: ServiceItem) => {
    setActiveServiceModal(service);
  };

  return (
    <section
      id="services"
      className="relative py-20 sm:py-28 lg:py-36 bg-[#F8F7F3] dark:bg-[#050505] text-[#111111] dark:text-[#FFFFFF] transition-colors duration-500 overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-[#D4AF37]/5 dark:from-[#D4AF37]/8 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header: Authentic High-End Editorial Typography */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#B88932] dark:text-[#D4AF37] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Full-Stack Agency Capabilities</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111] dark:text-[#FFFFFF] leading-[1.1]">
              Architecting Unfair{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#C99A45]">
                Competitive Moats.
              </span>
            </h2>

            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-[#9CA3AF] font-light leading-relaxed">
              We deploy battle-tested digital infrastructure engineered for measurable revenue scale: sub-second web platforms, high-ROAS ad architectures, and category-defining brand identities.
            </p>
          </div>

          {/* Interactive Filter Pills/Segmented Bar for Web Interactivity */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-[#111820] border border-black/10 dark:border-[#222E3F] overflow-x-auto max-w-full scrollbar-none shrink-0 self-start md:self-end">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white dark:bg-[#D4AF37] dark:text-black shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modern Bento-Style Web Services Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, idx) => (
              <motion.div
                key={service.id || idx}
                layout
                initial={{ opacity: 0, y: 28, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleCardClick(service)}
                className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-white dark:bg-[#0B0F16] border border-black/10 dark:border-[#1E2530] hover:border-[#D4AF37] hover:dark:border-[#D4AF37] hover:shadow-xl dark:hover:shadow-[0_10px_35px_rgba(212,175,55,0.18)] transition-all duration-300 cursor-pointer text-left"
              >
                {/* Ambient Top Glow Line on Hover */}
                <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div>
                  {/* Top Meta Row */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-[#141C26] border border-black/10 dark:border-[#222E3F] flex items-center justify-center text-[#B88932] dark:text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
                      <DynamicIcon name={service.iconName} className="w-6 h-6" />
                    </div>

                    <span className="font-mono text-xs font-semibold text-gray-400 dark:text-gray-500 group-hover:text-[#B88932] dark:group-hover:text-[#D4AF37] transition-colors">
                      0{idx + 1}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="font-display text-xl font-bold text-[#111111] dark:text-[#FFFFFF] group-hover:text-[#B88932] dark:group-hover:text-[#F6C453] transition-colors mb-3">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="text-sm text-gray-600 dark:text-[#9CA3AF] leading-relaxed font-light mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                {/* Bottom Action Row */}
                <div className="pt-5 border-t border-black/5 dark:border-[#1A222E] flex items-center justify-between mt-auto">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 group-hover:text-[#B88932] dark:group-hover:text-[#F6C453] transition-colors flex items-center gap-1.5">
                    <span>Explore Scope &amp; Deliverables</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>

                  <div className="w-7 h-7 rounded-full bg-black/5 dark:bg-[#151D28] flex items-center justify-center text-gray-400 group-hover:text-white group-hover:bg-[#D4AF37] transition-all">
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Global Bottom Guarantee / Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-white dark:bg-[#0B0F16] border border-black/10 dark:border-[#1E2530] flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#F6C453] flex items-center justify-center text-black font-extrabold shrink-0 shadow-md">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold font-display text-[#111111] dark:text-white">
                Custom Enterprise Engagement Models
              </div>
              <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Monthly retained engineering sprints, performance equity partnerships, or fixed-scope turnkeys.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black hover:bg-[#D4AF37] hover:dark:bg-[#D4AF37] transition-colors"
            >
              Request Custom Proposal
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
