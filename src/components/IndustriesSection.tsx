import React from 'react';
import { ScrollReveal } from './common/ScrollReveal';
import { useApp } from '../context/AppContext';
import { Shield, ShoppingBag, Code, Activity, Building, Crown, ArrowUpRight } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Shield,
  ShoppingBag,
  Code,
  Activity,
  Building,
  Crown
};

export const IndustriesSection: React.FC = () => {
  const { industries, setIsConsultationModalOpen } = useApp();

  return (
    <section
      id="industries"
      className="relative py-28 md:py-36 bg-[#F8F7F3] dark:bg-[#050608] text-[#111111] dark:text-[#FFFFFF] border-t border-black/10 dark:border-[#1E2530] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div className="max-w-2xl">
            <ScrollReveal animation="fade-up">
              <div className="text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
                Industry Specialization
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#111111] dark:text-[#FFFFFF] leading-tight">
                Tailored Solutions For{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#C99A45]">
                  High-Stakes Sectors
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-[#9CA3AF] font-light leading-relaxed">
                We engineer domain-native digital strategies backed by deep compliance, regulatory understanding, and conversion mechanics tailored to each specific vertical.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <button
              onClick={() => setIsConsultationModalOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] hover:text-[#F6C453] transition-colors group cursor-pointer"
            >
              <span>Explore Industry Blueprints</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </ScrollReveal>
        </div>

        {/* 6 Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {industries.map((ind, idx) => {
            const IconComponent = iconMap[ind.iconName] || Shield;
            return (
              <ScrollReveal key={ind.id} animation="fade-up" delay={0.08 * idx}>
                <div className="h-full flex flex-col justify-between p-8 rounded-3xl bg-white dark:bg-[#0B0F16] border border-black/10 dark:border-[#1E2530] hover:border-[#D4AF37]/50 transition-all duration-300 group shadow-sm dark:shadow-none text-left">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-[#151D28] border border-black/10 dark:border-[#222E3F] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                        {ind.caseCount}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {ind.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-[#9CA3AF] leading-relaxed font-light mb-6">
                      {ind.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-black/10 dark:border-[#1A2330] flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      {ind.metrics}
                    </span>
                    <button
                      onClick={() => setIsConsultationModalOpen(true)}
                      className="p-1 text-gray-400 group-hover:text-[#D4AF37] transition-colors cursor-pointer"
                      aria-label={`Inquire about ${ind.name}`}
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
