import React from 'react';
import { ScrollReveal } from './common/ScrollReveal';
import { ShieldCheck, Zap, Users, TrendingUp, Lock, CheckCircle2, Award, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const WhyChooseUsSection: React.FC = () => {
  const { setIsConsultationModalOpen } = useApp();

  const valuePillars = [
    {
      icon: Users,
      kicker: 'Senior-Only Execution',
      title: 'No Junior Handoffs. Domain Masters Only.',
      description:
        'Unlike traditional bloated agencies that pitch with senior executives and hand accounts off to junior interns, every project at Marketing Tycoons is engineered directly by seasoned leads with 7+ years of domain mastery.',
      stats: '100% Senior Led',
      subtext: 'Direct communication with dedicated leads'
    },
    {
      icon: TrendingUp,
      kicker: 'Revenue-First Architecture',
      title: 'Obsessed With Real Pipeline & EBITDA',
      description:
        'We refuse to report vanity impressions or empty click counts. We measure our agency impact through customer acquisition cost (CAC) reduction, qualified sales pipeline velocity, and sustained return on ad spend (ROAS).',
      stats: '$45M+ Pipeline Generated',
      subtext: 'Across international client portfolios'
    },
    {
      icon: Zap,
      kicker: 'Sub-Second Velocity',
      title: 'High-Performance Engineering Standards',
      description:
        'Every web architecture we construct is engineered to load under 500ms, achieve 95+ Google PageSpeed scores, and deliver frictionless user experiences that prevent bounce-offs and maximize checkout completions.',
      stats: '<420ms Average Latency',
      subtext: 'Core Web Vitals 100% pass guarantee'
    },
    {
      icon: ShieldCheck,
      kicker: 'Total Governance & IP Transfer',
      title: 'Full Intellectual Property Ownership',
      description:
        'You own 100% of your source code, design systems, ad accounts, and tracking pixels from day one. No vendor lock-in, proprietary captive hosting traps, or opaque subcontracting.',
      stats: '100% IP Assignment',
      subtext: 'Comprehensive commercial license transfer'
    }
  ];

  const standards = [
    { label: 'SLA Guarantee', value: '99.4% On-Time Delivery' },
    { label: 'Security & Privacy', value: 'SOC2 & GDPR Aligned' },
    { label: 'Client Retention', value: '98% Multi-Year Contracts' },
    { label: 'Code Warranty', value: '30-Day Zero-Defect Guarantee' }
  ];

  return (
    <section
      id="why-choose-us"
      className="relative py-28 md:py-36 bg-[#FFFFFF] dark:bg-[#07090E] text-[#111111] dark:text-[#FFFFFF] border-t border-black/10 dark:border-[#1E2530] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <ScrollReveal animation="fade-up">
            <div className="text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
              Why Global Enterprises Choose Us
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.1}>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#111111] dark:text-[#FFFFFF] leading-tight">
              A Strategic Partner Built For{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#C99A45]">
                Durable Growth
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-[#9CA3AF] font-light leading-relaxed">
              We bridge the gap between world-class aesthetic craft and quantitative revenue engineering. Here is why ambitious founders and international enterprises trust Marketing Tycoons over generic marketing agencies.
            </p>
          </ScrollReveal>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {valuePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.kicker} animation="fade-up" delay={0.1 * idx}>
                <div className="h-full flex flex-col justify-between p-6 sm:p-8 rounded-2xl bg-[#F8F7F3] dark:bg-[#0B0F16] border border-black/10 dark:border-[#1E2530] hover:border-[#D4AF37] hover:dark:border-[#D4AF37] transition-all duration-300 group shadow-sm dark:shadow-none text-left">
                  <div>
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-11 h-11 rounded-xl bg-black/5 dark:bg-[#141C26] border border-black/10 dark:border-[#222E3F] flex items-center justify-center text-[#B88932] dark:text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                        {pillar.kicker}
                      </span>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-3 group-hover:text-[#B88932] dark:group-hover:text-[#D4AF37] transition-colors">
                      {pillar.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-[#9CA3AF] leading-relaxed font-light">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-5 border-t border-black/10 dark:border-[#1A222E] flex items-center justify-between">
                    <div>
                      <div className="text-base sm:text-lg font-bold font-display text-[#111111] dark:text-white">
                        {pillar.stats}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {pillar.subtext}
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Trust Standards Strip */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-black/5 dark:bg-[#0E121A] border border-black/10 dark:border-[#222B38] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          {standards.map((std, i) => (
            <div key={std.label} className="border-l-2 border-[#D4AF37] pl-4">
              <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {std.label}
              </div>
              <div className="text-sm sm:text-base font-bold text-[#111111] dark:text-white mt-1">
                {std.value}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
