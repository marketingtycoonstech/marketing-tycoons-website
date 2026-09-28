import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Globe2, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface ClientCompany {
  id: string;
  name: string;
  category: string;
  location: string;
  impactMetric: string;
  // Distinctive SVG logo mark + typographic wordmark
  renderLogo: (colorClass: string) => React.ReactNode;
}

const CLIENT_COMPANIES: ClientCompany[] = [
  {
    id: 'apex-capital',
    name: 'APEX CAPITAL',
    category: 'Venture & Private Equity',
    location: 'New York / London',
    impactMetric: '+340% Deal Velocity',
    renderLogo: (colorClass) => (
      <svg className={`h-8 w-auto max-w-[170px] ${colorClass}`} viewBox="0 0 210 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Geometric Delta Monogram */}
        <polygon points="12,4 28,36 4,36" fill="none" stroke="currentColor" strokeWidth="3" />
        <polygon points="12,14 22,34 10,34" fill="currentColor" />
        {/* Wordmark */}
        <text x="38" y="27" fontFamily="Manrope, system-ui, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.18em">
          APEX
        </text>
        <text x="104" y="27" fontFamily="Manrope, system-ui, sans-serif" fontSize="15" fontWeight="400" letterSpacing="0.28em" opacity="0.85">
          CAPITAL
        </text>
      </svg>
    )
  },
  {
    id: 'zenith-media',
    name: 'ZENITH MEDIA',
    category: 'Performance Advertising & Tech',
    location: 'Dubai / Singapore',
    impactMetric: '4.8x Meta Ads ROAS',
    renderLogo: (colorClass) => (
      <svg className={`h-8 w-auto max-w-[175px] ${colorClass}`} viewBox="0 0 215 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Dynamic Faceted Z Mark */}
        <path d="M4 8 H26 L10 28 H30" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="28" cy="8" r="2.5" fill="currentColor" />
        {/* Wordmark */}
        <text x="40" y="27" fontFamily="Manrope, system-ui, sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.22em">
          ZENITH
        </text>
        <text x="135" y="27" fontFamily="Manrope, system-ui, sans-serif" fontSize="13" fontWeight="500" letterSpacing="0.2em" opacity="0.8">
          MEDIA
        </text>
      </svg>
    )
  },
  {
    id: 'aura-maison',
    name: 'AURA MAISON',
    category: 'Haute Couture & E-Commerce',
    location: 'Paris, France',
    impactMetric: '2.1M Global Shoppers',
    renderLogo: (colorClass) => (
      <svg className={`h-8 w-auto max-w-[175px] ${colorClass}`} viewBox="0 0 215 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Elegant Serif Monogram Crest */}
        <circle cx="16" cy="20" r="14" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path d="M11 27 L16 11 L21 27 M13 22 H19" fill="none" stroke="currentColor" strokeWidth="1.75" />
        {/* Wordmark */}
        <text x="40" y="26" fontFamily="Georgia, serif" fontSize="17" fontWeight="600" letterSpacing="0.24em">
          AURA
        </text>
        <text x="110" y="26" fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="400" letterSpacing="0.32em" opacity="0.8">
          MAISON
        </text>
      </svg>
    )
  },
  {
    id: 'sterling-co',
    name: 'STERLING & CO.',
    category: 'Legal & Strategic Advisory',
    location: 'Zurich / London',
    impactMetric: 'Tier-1 Rebrand',
    renderLogo: (colorClass) => (
      <svg className={`h-8 w-auto max-w-[185px] ${colorClass}`} viewBox="0 0 220 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Architectural Pillars / Column Icon */}
        <path d="M6 10 H24 M8 10 V30 M15 10 V30 M22 10 V30 M6 30 H24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        {/* Wordmark */}
        <text x="36" y="26" fontFamily="Manrope, system-ui, sans-serif" fontSize="16" fontWeight="800" letterSpacing="0.22em">
          STERLING
        </text>
        <text x="144" y="26" fontFamily="Georgia, serif" fontSize="14" fontStyle="italic" opacity="0.85">
          & Co.
        </text>
      </svg>
    )
  },
  {
    id: 'cybersummit',
    name: 'CYBERSUMMIT',
    category: 'Enterprise Cloud & Cybersecurity',
    location: 'San Francisco, USA',
    impactMetric: '14,000+ Attendees',
    renderLogo: (colorClass) => (
      <svg className={`h-8 w-auto max-w-[190px] ${colorClass}`} viewBox="0 0 230 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Hexagonal Node Shield */}
        <polygon points="16,6 26,12 26,26 16,32 6,26 6,12" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="16" cy="19" r="3" fill="currentColor" />
        {/* Wordmark */}
        <text x="36" y="26" fontFamily="Manrope, system-ui, sans-serif" fontSize="17" fontWeight="900" letterSpacing="0.2em">
          CYBER
        </text>
        <text x="115" y="26" fontFamily="Manrope, system-ui, sans-serif" fontSize="17" fontWeight="400" letterSpacing="0.14em" opacity="0.85">
          SUMMIT
        </text>
      </svg>
    )
  },
  {
    id: 'takween-digital',
    name: 'TAKWEEN DIGITAL',
    category: 'Full-Stack Software Platforms',
    location: 'London / Lahore',
    impactMetric: 'Sub-Second React Stack',
    renderLogo: (colorClass) => (
      <svg className={`h-8 w-auto max-w-[195px] ${colorClass}`} viewBox="0 0 235 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Infinite Wave Loop Mark */}
        <path d="M6 22 C6 14, 15 14, 18 20 C21 26, 30 26, 30 18" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        {/* Wordmark */}
        <text x="40" y="27" fontFamily="Manrope, system-ui, sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.16em">
          TAKWEEN
        </text>
        <text x="148" y="27" fontFamily="Manrope, system-ui, sans-serif" fontSize="12" fontWeight="600" letterSpacing="0.25em" opacity="0.8">
          UK
        </text>
      </svg>
    )
  },
  {
    id: 'glow-organics',
    name: 'GLOW ORGANICS',
    category: 'Clean Beauty & D2C Growth',
    location: 'Melbourne, Australia',
    impactMetric: '+185% Shopify AOV',
    renderLogo: (colorClass) => (
      <svg className={`h-8 w-auto max-w-[185px] ${colorClass}`} viewBox="0 0 220 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Botanical Leaf Silhouette */}
        <path d="M16 6 C10 12, 6 22, 16 32 C26 22, 22 12, 16 6 Z" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <path d="M16 12 V28" stroke="currentColor" strokeWidth="1.5" />
        {/* Wordmark */}
        <text x="36" y="26" fontFamily="Manrope, system-ui, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.18em">
          GLOW
        </text>
        <text x="105" y="26" fontFamily="Manrope, system-ui, sans-serif" fontSize="14" fontWeight="400" letterSpacing="0.24em" opacity="0.8">
          ORGANICS
        </text>
      </svg>
    )
  },
  {
    id: 'vance-global',
    name: 'VANCE GLOBAL',
    category: 'Supply Chain & Infrastructure',
    location: 'Dubai / Singapore',
    impactMetric: '$42M Pipeline Scaled',
    renderLogo: (colorClass) => (
      <svg className={`h-8 w-auto max-w-[180px] ${colorClass}`} viewBox="0 0 215 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Industrial Chevron Mark */}
        <path d="M5 8 L16 30 L27 8 M11 8 L16 20 L21 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {/* Wordmark */}
        <text x="38" y="27" fontFamily="Manrope, system-ui, sans-serif" fontSize="18" fontWeight="900" letterSpacing="0.18em">
          VANCE
        </text>
        <text x="118" y="27" fontFamily="Manrope, system-ui, sans-serif" fontSize="13" fontWeight="500" letterSpacing="0.25em" opacity="0.8">
          GLOBAL
        </text>
      </svg>
    )
  },
  {
    id: 'biohealth-labs',
    name: 'BIOHEALTH LABS',
    category: 'Biotech & Health Sciences',
    location: 'Boston, USA',
    impactMetric: 'Institutional Trust',
    renderLogo: (colorClass) => (
      <svg className={`h-8 w-auto max-w-[190px] ${colorClass}`} viewBox="0 0 225 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Genetic Helix Nodes */}
        <circle cx="8" cy="12" r="3" fill="currentColor" />
        <circle cx="22" cy="12" r="3" fill="currentColor" />
        <circle cx="15" cy="20" r="3.5" fill="currentColor" />
        <circle cx="8" cy="28" r="3" fill="currentColor" />
        <circle cx="22" cy="28" r="3" fill="currentColor" />
        <path d="M8 12 L22 28 M22 12 L8 28" stroke="currentColor" strokeWidth="1.5" />
        {/* Wordmark */}
        <text x="36" y="27" fontFamily="Manrope, system-ui, sans-serif" fontSize="17" fontWeight="800" letterSpacing="0.16em">
          BIOHEALTH
        </text>
      </svg>
    )
  },
  {
    id: 'farooq-publishers',
    name: 'FAROOQ & SONS',
    category: 'Heritage Publishing & Retail',
    location: 'Lahore, Pakistan',
    impactMetric: '100k+ Readers Reached',
    renderLogo: (colorClass) => (
      <svg className={`h-8 w-auto max-w-[185px] ${colorClass}`} viewBox="0 0 220 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Diamond Arch Bookmark Stamp */}
        <polygon points="15,6 27,20 15,34 3,20" fill="none" stroke="currentColor" strokeWidth="2.5" />
        <circle cx="15" cy="20" r="2.5" fill="currentColor" />
        {/* Wordmark */}
        <text x="36" y="26" fontFamily="Georgia, serif" fontSize="16" fontWeight="700" letterSpacing="0.18em">
          FAROOQ
        </text>
        <text x="126" y="26" fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="600" letterSpacing="0.22em" opacity="0.8">
          & SONS
        </text>
      </svg>
    )
  }
];

export const ClientTicker: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <section
      id="brand-trust-section"
      aria-label="Companies We Have Worked With"
      className="relative py-10 sm:py-14 bg-gradient-to-b from-[#F8F7F3] via-[#FFFFFF] to-[#F8F7F3] dark:from-[#030305] dark:via-[#070709] dark:to-[#030305] border-y border-black/[0.06] dark:border-white/[0.06] overflow-hidden select-none transition-colors duration-300"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-w-4xl h-24 bg-radial from-[#D4AF37]/10 dark:from-[#D4AF37]/15 to-transparent blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Credibility Header */}
        <div className="text-center max-w-3xl mx-auto mb-7 sm:mb-9">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/[0.03] dark:bg-white/[0.05] border border-black/[0.08] dark:border-white/[0.08] mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B88932] dark:text-[#D4AF37]" />
            <span className="text-[10px] font-extrabold tracking-[0.22em] uppercase text-gray-700 dark:text-gray-300">
              PROVEN ENTERPRISE CREDIBILITY
            </span>
          </div>

          <h2 className="text-xs sm:text-sm font-bold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400">
            Trusted by Category Leaders & High-Growth Ventures Worldwide
          </h2>
        </div>

        {/* Continuous Fluid Row of Grayscale Logos with Pause-on-Hover */}
        <div className="relative w-full overflow-hidden py-3">
          
          {/* Left Edge Gradient Fade Mask */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#F8F7F3] via-[#F8F7F3]/90 to-transparent dark:from-[#030305] dark:via-[#030305]/90 dark:to-transparent z-20" />
          
          {/* Right Edge Gradient Fade Mask */}
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#F8F7F3] via-[#F8F7F3]/90 to-transparent dark:from-[#030305] dark:via-[#030305]/90 dark:to-transparent z-20" />

          {/* Marquee Track: Tripled array for 100% gapless infinite loop */}
          <div className="animate-marquee hover:[animation-play-state:paused] flex items-center gap-10 sm:gap-16 py-2 cursor-pointer">
            {[...CLIENT_COMPANIES, ...CLIENT_COMPANIES, ...CLIENT_COMPANIES].map((company, index) => {
              const uniqueKey = `${company.id}-${index}`;
              const isHovered = activeTooltip === uniqueKey;

              return (
                <div
                  key={uniqueKey}
                  onMouseEnter={() => setActiveTooltip(uniqueKey)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="group relative flex-shrink-0 flex items-center justify-center px-4 py-2 transition-all duration-300"
                >
                  {/* Grayscale Logo Element */}
                  <div className="relative filter grayscale contrast-125 dark:contrast-100 opacity-60 dark:opacity-45 group-hover:filter-none group-hover:opacity-100 group-hover:scale-108 transition-all duration-300">
                    {company.renderLogo(
                      'text-gray-700 dark:text-gray-300 group-hover:text-[#111111] dark:group-hover:text-[#FFFFFF] transition-colors duration-300'
                    )}
                  </div>

                  {/* Micro Tooltip with Credibility Metric on Hover */}
                  {isHovered && (
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap z-30 pointer-events-none animate-fadeIn">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/95 text-white dark:bg-[#111620] dark:border dark:border-[#D4AF37]/40 shadow-xl text-[10px] font-mono">
                        <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                        <span className="font-semibold text-gray-200">{company.category}</span>
                        <span className="text-[#D4AF37] font-bold">({company.impactMetric})</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Micro Credibility Badges Underneath */}
        <div className="mt-8 pt-5 border-t border-black/[0.05] dark:border-white/[0.05] flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-3.5 h-3.5 text-[#B88932] dark:text-[#D4AF37]" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">$85M+</span>
            <span className="text-gray-400 dark:text-gray-500">Capital Scaled</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Globe2 className="w-3.5 h-3.5 text-[#B88932] dark:text-[#D4AF37]" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">14+</span>
            <span className="text-gray-400 dark:text-gray-500">Global Markets (US, UK, UAE, PK)</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Award className="w-3.5 h-3.5 text-[#B88932] dark:text-[#D4AF37]" />
            <span className="font-semibold text-gray-800 dark:text-gray-200">99.4%</span>
            <span className="text-gray-400 dark:text-gray-500">Retention & Delivery Rate</span>
          </div>

          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20 hidden sm:block" />

          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#B88932] dark:text-[#D4AF37]" />
            <span className="text-gray-400 dark:text-gray-500">Zero Vanity Metrics Guarantee</span>
          </div>
        </div>

      </motion.div>
    </section>
  );
};
