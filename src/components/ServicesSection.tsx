import React from 'react';
import { useApp } from '../context/AppContext';
import { DynamicIcon } from './common/DynamicIcon';
import { ScrollReveal } from './common/ScrollReveal';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

export const ServicesSection: React.FC = () => {
  const { services, setActiveServiceModal } = useApp();

  const enabledServices = services
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  const handleCardClick = (service: ServiceItem) => {
    setActiveServiceModal(service);
  };

  return (
    <section
      id="services"
      className="relative py-12 md:py-20 bg-[#F8F7F3] dark:bg-[#050505] text-[#111111] dark:text-[#FFFFFF] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Framed Section Box matching image */}
        <div className="rounded-3xl p-6 sm:p-10 md:p-12 bg-white dark:bg-[#0B0F14] border border-black/10 dark:border-[#2A3441] shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/8 rounded-full blur-[140px] pointer-events-none" />

          {/* Section Header */}
          <div className="text-left max-w-3xl mb-10 md:mb-12 relative z-10">
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111] dark:text-[#FFFFFF]">
                Our Services
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="mt-2.5 text-sm sm:text-base text-gray-600 dark:text-[#9CA3AF] font-normal leading-relaxed">
                We offer a complete range of digital solutions to help your brand grow, get noticed and achieve real results.
              </p>
            </ScrollReveal>
          </div>

          {/* 6 Services Grid in 3x2 format */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 relative z-10">
            {enabledServices.map((service, idx) => (
              <ScrollReveal key={service.id || idx} animation="fade-up" delay={0.08 * idx}>
                <div
                  onClick={() => handleCardClick(service)}
                  className="group relative rounded-2xl p-6 sm:p-7 bg-gray-50 dark:bg-[#111820] hover:dark:bg-[#161D26] border border-black/10 dark:border-[#2A3441] hover:border-[#D4AF37] hover:dark:border-[#D4AF37] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-[0_0_25px_rgba(212,175,55,0.2)] flex flex-col justify-between cursor-pointer min-h-[220px]"
                >
                  <div>
                    {/* Top Row: Warm Gold Icon */}
                    <div className="mb-4 text-[#D4AF37] dark:text-[#F6C453]">
                      <DynamicIcon name={service.iconName} className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                    </div>

                    {/* Service Title */}
                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#111111] dark:text-[#FFFFFF] group-hover:text-[#F6C453] transition-colors mb-2">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-[#9CA3AF] leading-relaxed font-normal">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Card Footer: Learn More Link */}
                  <div className="pt-4 mt-4 border-t border-black/5 dark:border-[#2A3441] flex items-center justify-between">
                    <span className="text-xs font-bold text-[#D4AF37] dark:text-[#F6C453] group-hover:text-[#111111] dark:group-hover:text-[#FFFFFF] transition-colors flex items-center gap-1.5">
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
