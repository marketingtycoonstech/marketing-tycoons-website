import React, { useState } from 'react';
import { Compass, Palette, Code, Rocket, CheckCircle2, Calendar, Star, HelpCircle } from 'lucide-react';

interface TimelinePhase {
  number: number;
  name: string;
  duration: string;
  icon: React.ReactNode;
  shortDesc: string;
  details: string;
  deliverables: string[];
}

export const ProjectTimeline: React.FC = () => {
  const [activePhase, setActivePhase] = useState<number>(1);

  const phases: TimelinePhase[] = [
    {
      number: 1,
      name: 'Discovery & Strategy',
      duration: 'Week 1',
      icon: <Compass className="w-4 h-4" />,
      shortDesc: 'Market research, brand alignment, & wireframes.',
      details: 'We begin by aligning your corporate vision with market realities. Our strategy team reviews direct competitors, maps out user experience journeys, and drafts wireframe blueprints for the entire application structure.',
      deliverables: ['Competitor Benchmark Analysis', 'UX User Journey Mapping', 'High-Fidelity Wireframes', 'Technical Integration Scopes']
    },
    {
      number: 2,
      name: 'Bespoke UI/UX Design',
      duration: 'Week 2',
      icon: <Palette className="w-4 h-4" />,
      shortDesc: 'Luxury aesthetics, brand guidelines, & prototypes.',
      details: 'Our design artisans engineer premium digital layouts. We establish high-end typography scales, design polished custom elements, and create fully interactive mockups so you can experience the design before code is written.',
      deliverables: ['Custom Brand Moodboards', 'UI Typography & Palette Manual', 'Interactive Figma Prototypes', 'Responsive Layout Variations']
    },
    {
      number: 3,
      name: 'Technical Development',
      duration: 'Weeks 3-5',
      icon: <Code className="w-4 h-4" />,
      shortDesc: 'Clean source code, databases, & animations.',
      details: 'This is where performance meets reliability. We write modular, secure React/Next.js code, compile database architectures, deploy CDN pipelines, and implement smooth cinematic animations that load in milliseconds.',
      deliverables: ['Modular TypeScript Codebases', 'Full-Stack Database Setup', 'SEO Schema Structured Data', 'High-Frame-Rate CSS Animations']
    },
    {
      number: 4,
      name: 'QA, Launch & Growth',
      duration: 'Week 6',
      icon: <Rocket className="w-4 h-4" />,
      shortDesc: 'Production launch, SSL setup, & optimization.',
      details: 'We run strict security checks and speed tests. After testing, your app is launched live with secure SSL certificates, server settings optimized, and search engines notified for instantaneous indexing and ranking.',
      deliverables: ['Complete Security Audit Check', 'Sub-Second Speed Optimization', 'Server & Domain Mapping', 'Google Search Console Indexing']
    }
  ];

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#111820] border border-black/10 dark:border-[#2A3441] shadow-xs relative overflow-hidden">
      {/* Subtle Background Gold Glow */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-6 relative z-10">
        <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#F6C453]">
          <Calendar className="w-4 h-4" />
        </div>
        <div>
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#111111] dark:text-[#FFFFFF]">
            Estimated Project Timeline
          </h3>
          <p className="text-[11px] text-gray-500 dark:text-[#9CA3AF] font-medium">
            Interactive guide to our high-end 6-week client journey cycle
          </p>
        </div>
      </div>

      {/* Interactive Path Selector Row */}
      <div className="relative mb-6 pb-2 border-b border-black/5 dark:border-white/5 overflow-x-auto scrollbar-none flex items-center justify-between min-w-[500px] sm:min-w-0">
        {phases.map((phase) => {
          const isSelected = activePhase === phase.number;
          return (
            <button
              key={phase.number}
              onClick={() => setActivePhase(phase.number)}
              className="group relative flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all cursor-pointer text-left focus:outline-none"
            >
              {/* Highlight background */}
              {isSelected && (
                <div className="absolute inset-0 bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 rounded-xl border border-[#D4AF37]/40 z-0 animate-in fade-in duration-200" />
              )}

              {/* Number Circle */}
              <div className={`relative z-10 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-black text-white dark:bg-[#D4AF37] dark:text-black shadow-md'
                  : 'bg-black/5 text-gray-500 dark:bg-white/5 dark:text-gray-400 group-hover:bg-[#D4AF37]/20 group-hover:text-[#B88932] dark:group-hover:text-[#F6C453]'
              }`}>
                {phase.number}
              </div>

              <div className="relative z-10">
                <span className={`text-xs font-bold uppercase tracking-wider block leading-tight ${
                  isSelected ? 'text-black dark:text-[#F6C453]' : 'text-gray-700 dark:text-gray-400'
                }`}>
                  {phase.name}
                </span>
                <span className={`text-[9px] font-mono block mt-0.5 ${
                  isSelected ? 'text-[#B88932] dark:text-[#D4AF37]/80' : 'text-gray-400 dark:text-gray-500'
                }`}>
                  {phase.duration}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detailed Selected Phase Card (Interactive Result) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50/70 dark:bg-black/35 border border-black/[0.04] dark:border-white/5 p-5 sm:p-6 rounded-xl relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
        {/* Left: Phase Title, Icon, Duration */}
        <div className="md:col-span-1 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 pb-4 md:pb-0 md:pr-6">
          <div>
            <div className="w-10 h-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center text-[#B88932] dark:text-[#F6C453] mb-3 shadow-xs">
              {phases[activePhase - 1].icon}
            </div>
            <h4 className="font-display text-base sm:text-lg font-black text-black dark:text-white uppercase tracking-wider leading-snug">
              {phases[activePhase - 1].name}
            </h4>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[10px] font-bold uppercase tracking-wider text-[#B88932] dark:text-[#F6C453] mt-2">
              Phase Duration: {phases[activePhase - 1].duration}
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-1 text-[9px] text-gray-400 uppercase font-mono mt-4">
            <Star className="w-3 h-3 text-[#D4AF37]" />
            <span>Premium Client Experience</span>
          </div>
        </div>

        {/* Center: Detailed Narrative */}
        <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-black/5 dark:border-white/5 pb-4 md:pb-0 md:px-6 flex flex-col justify-center">
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#B88932] dark:text-[#D4AF37] uppercase block mb-1">
            PHASE BREAKDOWN
          </span>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-[#9CA3AF] leading-relaxed">
            {phases[activePhase - 1].details}
          </p>
        </div>

        {/* Right: Key Deliverables List */}
        <div className="md:col-span-1 md:pl-6 flex flex-col justify-center">
          <span className="text-[9px] font-bold tracking-[0.2em] text-[#B88932] dark:text-[#D4AF37] uppercase block mb-2">
            KEY DELIVERABLES
          </span>
          <div className="space-y-2">
            {phases[activePhase - 1].deliverables.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-gray-800 dark:text-[#D1D5DB]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
