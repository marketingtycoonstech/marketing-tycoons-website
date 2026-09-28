import React from 'react';
import { ScrollReveal } from './common/ScrollReveal';
import { Compass, Layers, Terminal, Rocket, Check, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ProcessSection: React.FC = () => {
  const { setIsConsultationModalOpen } = useApp();

  const processSteps = [
    {
      step: '01',
      icon: Compass,
      title: 'Discovery & Strategic Audit',
      duration: 'Week 1',
      description:
        'We conduct an exhaustive forensic audit of your existing market position, competitor moat, conversion leakage points, unit economics, and technical code debt.',
      deliverables: [
        'Comprehensive 80-Point Digital Health Audit',
        'Competitor Gap & Commercial Intent Keyword Analysis',
        'Customer Journey & Friction Mapping'
      ]
    },
    {
      step: '02',
      icon: Layers,
      title: 'Architecture & Creative Blueprint',
      duration: 'Weeks 2 – 3',
      description:
        'We establish the foundational design system in Figma, craft responsive information architecture, write high-converting copy, and architect the backend data contracts.',
      deliverables: [
        'Atomic Design System & Component Library',
        'Interactive Clickable Figma Wireframes',
        'Technical Stack & API Integration Schematics'
      ]
    },
    {
      step: '03',
      icon: Terminal,
      title: 'High-Velocity Sprint Engineering',
      duration: 'Weeks 4 – 6',
      description:
        'Our senior engineers write clean, modular, production-grade TypeScript and React code, while our media buyers configure server-side tracking (CAPI) and ad creatives.',
      deliverables: [
        'Production-Grade Codebase with 0 CLS & <500ms Latency',
        'Cross-Browser & Multi-Device Breakpoint Validation',
        'Server-Side Conversion API (CAPI) Configuration'
      ]
    },
    {
      step: '04',
      icon: Rocket,
      title: 'Launch, Conversion Testing & Scale',
      duration: 'Continuous',
      description:
        'Following rigorous quality assurance and staging review, we launch live, initiate multivariate CRO split tests, monitor Core Web Vitals, and scale revenue channels.',
      deliverables: [
        'Zero-Downtime Production Deployment',
        'Live Executive KPI & Attribution Dashboard',
        '30-Day Zero-Defect Post-Launch Warranty'
      ]
    }
  ];

  return (
    <section
      id="process"
      className="relative py-28 md:py-36 bg-[#F8F7F3] dark:bg-[#050608] text-[#111111] dark:text-[#FFFFFF] border-t border-black/10 dark:border-[#1E2530] transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
          <div className="max-w-2xl">
            <ScrollReveal animation="fade-up">
              <div className="text-xs font-bold tracking-[0.25em] uppercase text-[#D4AF37] mb-3">
                Proven Methodology
              </div>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-[#111111] dark:text-[#FFFFFF] leading-tight">
                How We Engineer{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#C99A45]">
                  Consistent Wins
                </span>
              </h2>
            </ScrollReveal>
            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-[#9CA3AF] font-light leading-relaxed">
                A disciplined, milestone-driven delivery process engineered for velocity, predictability, and complete transparency from day one through continuous market scaling.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal animation="fade-up" delay={0.3}>
            <button
              onClick={() => setIsConsultationModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black shadow-md hover:scale-103 active:scale-97 transition-all cursor-pointer"
            >
              <span>Schedule Initial Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </ScrollReveal>
        </div>

        {/* 4 Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <ScrollReveal key={step.step} animation="fade-up" delay={0.1 * idx}>
                <div className="h-full flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#0B0F16] border border-black/10 dark:border-[#1E2530] hover:border-[#D4AF37] hover:dark:border-[#D4AF37] transition-all duration-300 relative group shadow-sm dark:shadow-none text-left">
                  
                  {/* Step Number & Duration Indicator */}
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-[#151D28] border border-black/10 dark:border-[#222E3F] flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-black font-display text-gray-300 dark:text-[#1E2838] group-hover:text-[#D4AF37] transition-colors">
                          {step.step}
                        </span>
                      </div>
                    </div>

                    <div className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] mb-1.5">
                      {step.duration}
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-gray-600 dark:text-[#9CA3AF] leading-relaxed font-light mb-6">
                      {step.description}
                    </p>
                  </div>

                  {/* Concrete Deliverables Checklist */}
                  <div className="pt-5 border-t border-black/10 dark:border-[#1A2330]">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                      Key Deliverables
                    </div>
                    <ul className="space-y-2">
                      {step.deliverables.map((deliv, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                          <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                          <span className="leading-snug">{deliv}</span>
                        </li>
                      ))}
                    </ul>
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
