import React from 'react';
import { ShieldCheck, Star, Activity, Award, Briefcase, Compass, Globe, Sparkles } from 'lucide-react';

export const ClientTicker: React.FC = () => {
  // 8 Premium grayscale logo badges representing major industries
  const partnerLogos = [
    { 
      name: 'Apex Financial', 
      industry: 'FINANCE & VENTURES',
      icon: <Briefcase className="w-5 h-5" />,
      tag: 'APEX' 
    },
    { 
      name: 'Velvet Horizon', 
      industry: 'MEDIA & ENTERTAINMENT',
      icon: <Compass className="w-5 h-5" />,
      tag: 'VELVET' 
    },
    { 
      name: 'Smith & Partners', 
      industry: 'LEGAL & ADVISORY',
      icon: <ShieldCheck className="w-5 h-5" />,
      tag: 'SMITH' 
    },
    { 
      name: 'Lumiere Living', 
      industry: 'LUXURY & REAL ESTATE',
      icon: <Award className="w-5 h-5" />,
      tag: 'LUMIERE' 
    },
    { 
      name: 'Vance Holdings', 
      industry: 'GLOBAL LOGISTICS',
      icon: <Globe className="w-5 h-5" />,
      tag: 'VANCE' 
    },
    { 
      name: 'Zenith Velocity', 
      industry: 'SAAS & ENTERPRISE TECH',
      icon: <Activity className="w-5 h-5" />,
      tag: 'ZENITH' 
    },
    { 
      name: 'Aurabelle France', 
      industry: 'BEAUTY & E-COMMERCE',
      icon: <Star className="w-5 h-5" />,
      tag: 'AURA' 
    },
    { 
      name: 'Artisan roast', 
      industry: 'PREMIUM CONSUMER BRANDS',
      icon: <Sparkles className="w-5 h-5" />,
      tag: 'ARTISAN' 
    }
  ];

  return (
    <section 
      id="brand-trust-section" 
      className="relative py-12 bg-white dark:bg-[#070A0F] border-y border-black/5 dark:border-white/5 overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B88932] dark:text-[#D4AF37] block mb-2">
            GLOBAL REPUTATION
          </span>
          <h3 className="font-display text-lg sm:text-2xl font-black text-[#111111] dark:text-[#FFFFFF] tracking-tight">
            Trusted by Industry Leaders
          </h3>
          <p className="text-xs text-gray-500 dark:text-[#9CA3AF] mt-1.5 max-w-md mx-auto">
            Powering digital scale, visual excellence, and secure search dominance for premier companies worldwide.
          </p>
        </div>

        {/* Grayscale Subtle Grid of Company Logo Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
          {partnerLogos.map((logo) => (
            <div
              key={logo.name}
              className="group relative flex flex-col items-center justify-center p-5 sm:p-6 rounded-2xl bg-gray-50/70 dark:bg-black/20 border border-black/[0.04] dark:border-white/[0.04] hover:bg-white dark:hover:bg-black/40 hover:border-[#D4AF37]/50 dark:hover:border-[#D4AF37]/50 hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(212,175,55,0.12)] transition-all duration-300"
            >
              {/* Logo Emblem - Grayscale by default, color transition on hover */}
              <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0C1017] border border-black/10 dark:border-white/10 flex items-center justify-center text-gray-400 dark:text-gray-500 group-hover:text-[#B88932] dark:group-hover:text-[#F6C453] group-hover:border-[#D4AF37]/50 transition-all duration-300 shadow-sm">
                {logo.icon}
              </div>

              {/* Text Info */}
              <div className="text-center mt-3.5">
                <span className="font-display font-black text-xs sm:text-sm tracking-[0.14em] text-gray-500 dark:text-gray-400 group-hover:text-[#111111] dark:group-hover:text-[#FFFFFF] transition-colors duration-300 uppercase block">
                  {logo.name}
                </span>
                <span className="text-[8px] font-mono font-bold tracking-widest text-gray-400 dark:text-gray-600 group-hover:text-[#B88932] dark:group-hover:text-[#D4AF37]/70 transition-colors duration-300 block mt-1">
                  {logo.industry}
                </span>
              </div>

              {/* Top Accent Gold Pin Line */}
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/0 to-transparent group-hover:via-[#D4AF37] transition-all duration-500" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
