import React, { useState } from 'react';
import { ScrollReveal } from './common/ScrollReveal';
import { useApp } from '../context/AppContext';
import { Linkedin, Twitter, Github, Award, CheckCircle2, Cpu, BarChart3, Sparkles, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TeamMember, TeamSkill } from '../types';

// Default skills fallback if a team member record in database lacks the skills field
const getDefaultSkillsForRole = (role: string, name: string): TeamSkill[] => {
  const lowerRole = role.toLowerCase();
  const lowerName = name.toLowerCase();

  if (lowerRole.includes('cloud') || lowerRole.includes('web') || lowerRole.includes('architect') || lowerRole.includes('engineer')) {
    return [
      { name: 'React 19 / Next.js / TypeScript', level: 99, category: 'Frontend' },
      { name: 'Cloud Architecture (AWS / GCP)', level: 97, category: 'DevOps' },
      { name: 'Core Web Vitals (<420ms Latency)', level: 98, category: 'Performance' },
      { name: 'Headless CMS & API Contracts', level: 95, category: 'Backend' }
    ];
  }
  if (lowerRole.includes('creative') || lowerRole.includes('brand') || lowerRole.includes('design') || lowerRole.includes('ui')) {
    return [
      { name: 'Design Systems (Figma Tokens)', level: 99, category: 'Systems' },
      { name: 'UI/UX & Cognitive Conversion', level: 97, category: 'UX' },
      { name: 'Typography Science & Art Direction', level: 96, category: 'Brand' },
      { name: 'Motion Physics & Micro-Interactions', level: 93, category: 'Motion' }
    ];
  }
  if (lowerRole.includes('search') || lowerRole.includes('performance') || lowerRole.includes('ads') || lowerRole.includes('marketing')) {
    return [
      { name: 'Server-Side CAPI & Meta Ads', level: 98, category: 'Paid Media' },
      { name: 'Google Performance Max & Search', level: 96, category: 'Search' },
      { name: 'Technical SEO & JSON-LD Schemas', level: 95, category: 'SEO' },
      { name: 'Attribution Modeling & CAC Tuning', level: 94, category: 'Analytics' }
    ];
  }
  // Default founder/executive skills
  return [
    { name: 'International Brand Positioning', level: 98, category: 'Strategy' },
    { name: 'Revenue Funnel Architecture', level: 96, category: 'Growth' },
    { name: 'E-Commerce Unit Economics', level: 94, category: 'Finance' },
    { name: 'Algorithmic Media Economics', level: 92, category: 'Analytics' }
  ];
};

const getProficiencyTier = (level: number): string => {
  if (level >= 98) return 'Lead Authority';
  if (level >= 95) return 'Enterprise Master';
  if (level >= 90) return 'Senior Specialist';
  return 'Advanced Practitioner';
};

interface TeamCardProps {
  member: TeamMember;
  idx: number;
  globalViewMode: 'skills' | 'achievements';
}

const TeamMemberCard: React.FC<TeamCardProps> = ({ member, idx, globalViewMode }) => {
  const [localTab, setLocalTab] = useState<'skills' | 'achievements' | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  // Allow card to follow global toggle unless user has specifically interacted with this card
  const activeTab = localTab ?? globalViewMode;

  const skills: TeamSkill[] = member.skills && member.skills.length > 0
    ? member.skills
    : getDefaultSkillsForRole(member.role, member.name);

  return (
    <div className="h-full flex flex-col justify-between rounded-2xl sm:rounded-3xl bg-[#F8F7F3] dark:bg-[#0B0F16] border border-black/10 dark:border-[#1E2530] overflow-hidden group hover:border-[#D4AF37] hover:dark:border-[#D4AF37] transition-all duration-300 shadow-sm dark:shadow-none text-left">
      
      {/* Photo & Social Media Header */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-black/10 dark:bg-black/40">
        <img
          src={member.avatarUrl}
          alt={member.name}
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
        
        {/* Experience Tag & Social Links inside Photo Footer */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-[#D4AF37]/30 text-[11px] font-semibold text-[#F6C453] tracking-wide">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>{member.experience}</span>
          </div>

          <div className="flex items-center gap-1.5">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-black text-white transition-colors border border-white/10"
                aria-label={`${member.name} LinkedIn`}
              >
                <Linkedin className="w-3.5 h-3.5" />
              </a>
            )}
            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-black text-white transition-colors border border-white/10"
                aria-label={`${member.name} Twitter`}
              >
                <Twitter className="w-3.5 h-3.5" />
              </a>
            )}
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-full bg-black/60 hover:bg-[#D4AF37] hover:text-black text-white transition-colors border border-white/10"
                aria-label={`${member.name} GitHub`}
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        
        {/* Name, Role & Bio */}
        <div>
          <div className="flex items-center justify-between gap-2 mb-1">
            <h3 className="font-display text-lg sm:text-xl font-bold text-[#111111] dark:text-[#FFFFFF] group-hover:text-[#B88932] dark:group-hover:text-[#D4AF37] transition-colors">
              {member.name}
            </h3>
          </div>

          <div className="text-xs font-semibold text-[#B88932] dark:text-[#D4AF37] mb-2.5">
            {member.role}
          </div>

          <p className="text-xs text-gray-600 dark:text-[#9CA3AF] leading-relaxed font-light mb-4 line-clamp-3">
            {member.bio}
          </p>
        </div>

        {/* Interactive Segmented Switcher: Proficiencies vs Achievements */}
        <div className="pt-4 border-t border-black/10 dark:border-[#1E2530]">
          
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/5 dark:bg-[#121924] border border-black/5 dark:border-[#222E3F] mb-4">
            <button
              onClick={() => setLocalTab('skills')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                activeTab === 'skills'
                  ? 'bg-white dark:bg-[#D4AF37] text-black shadow-xs font-extrabold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>Skills ({skills.length})</span>
            </button>

            <button
              onClick={() => setLocalTab('achievements')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                activeTab === 'achievements'
                  ? 'bg-white dark:bg-[#D4AF37] text-black shadow-xs font-extrabold'
                  : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
              }`}
            >
              <Award className="w-3 h-3" />
              <span>Track Record</span>
            </button>
          </div>

          {/* Dynamic Content Switching */}
          <AnimatePresence mode="wait">
            {activeTab === 'skills' ? (
              /* ============================================================ */
              /* 1. Animated Interactive Technical Progress Bars              */
              /* ============================================================ */
              <motion.div
                key="skills-pane"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-3"
              >
                {skills.map((skill, sIdx) => {
                  const isHovered = hoveredSkill === skill.name;
                  const tier = getProficiencyTier(skill.level);

                  return (
                    <div
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="group/skill cursor-default"
                    >
                      {/* Skill Header: Label & Percent */}
                      <div className="flex items-center justify-between text-[11px] mb-1">
                        <span className="font-medium text-gray-800 dark:text-gray-200 group-hover/skill:text-[#B88932] dark:group-hover/skill:text-[#F6C453] transition-colors truncate max-w-[190px]">
                          {skill.name}
                        </span>
                        
                        <div className="flex items-center gap-1.5 shrink-0">
                          {isHovered && (
                            <span className="text-[9px] font-mono text-gray-400 dark:text-gray-500 uppercase tracking-wider hidden sm:inline">
                              {tier}
                            </span>
                          )}
                          <span className="font-mono font-bold text-xs text-[#B88932] dark:text-[#D4AF37]">
                            {skill.level}%
                          </span>
                        </div>
                      </div>

                      {/* Progress Bar Track with Smooth Spring Fill */}
                      <div className="relative h-2 w-full rounded-full bg-black/10 dark:bg-[#161F2C] overflow-hidden border border-black/5 dark:border-[#222E3F]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true, amount: 0.15 }}
                          transition={{
                            duration: 0.9,
                            delay: 0.08 * sIdx,
                            ease: [0.16, 1, 0.3, 1]
                          }}
                          className={`h-full rounded-full relative transition-all duration-300 ${
                            isHovered
                              ? 'bg-gradient-to-r from-[#D4AF37] via-[#FFF4B8] to-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.7)]'
                              : 'bg-gradient-to-r from-[#B88932] via-[#F6C453] to-[#D4AF37]'
                          }`}
                        >
                          {/* Shimmer line */}
                          <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse pointer-events-none" />
                        </motion.div>
                      </div>
                    </div>
                  );
                })}

                <div className="pt-2 flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400 font-mono">
                  <span className="inline-flex items-center gap-1">
                    <Zap className="w-3 h-3 text-[#D4AF37]" />
                    <span>Verified Production Lead</span>
                  </span>
                  <span>Benchmark: &gt;90%</span>
                </div>
              </motion.div>
            ) : (
              /* ============================================================ */
              /* 2. Track Record / Achievements List                          */
              /* ============================================================ */
              <motion.div
                key="achievements-pane"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-2.5 min-h-[160px]"
              >
                {member.achievements.map((ach, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span className="leading-snug font-light">{ach}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>

    </div>
  );
};

export const TeamSection: React.FC = () => {
  const { teamMembers } = useApp();
  const [globalViewMode, setGlobalViewMode] = useState<'skills' | 'achievements'>('skills');

  return (
    <section
      id="team"
      className="relative py-20 sm:py-28 lg:py-36 bg-[#FFFFFF] dark:bg-[#07090E] text-[#111111] dark:text-[#FFFFFF] border-t border-black/10 dark:border-[#1E2530] transition-colors duration-300 overflow-hidden"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl h-96 bg-radial from-[#D4AF37]/5 dark:from-[#D4AF37]/8 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 sm:mb-16 text-left">
          <div className="max-w-3xl">
            <ScrollReveal animation="fade-up">
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] uppercase text-[#B88932] dark:text-[#D4AF37] mb-3">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Leadership &amp; Technical Mastery</span>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.1}>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#111111] dark:text-[#FFFFFF] leading-tight">
                Crafted By Proven{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#C99A45]">
                  Domain Masters.
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal animation="fade-up" delay={0.2}>
              <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-[#9CA3AF] font-light leading-relaxed">
                We refuse to delegate your brand and digital architecture to junior interns. Every campaign, codebase, and design system is engineered directly by seasoned leads with deep domain mastery.
              </p>
            </ScrollReveal>
          </div>

          {/* Global View Toggle: Proficiencies vs Achievements */}
          <ScrollReveal animation="fade-up" delay={0.3}>
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/5 dark:bg-[#111822] border border-black/10 dark:border-[#222E3F] shrink-0 self-start md:self-end">
              <button
                onClick={() => setGlobalViewMode('skills')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  globalViewMode === 'skills'
                    ? 'bg-black text-white dark:bg-[#D4AF37] dark:text-black shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <Cpu className="w-3.5 h-3.5" />
                <span>Show Technical Skills</span>
              </button>

              <button
                onClick={() => setGlobalViewMode('achievements')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  globalViewMode === 'achievements'
                    ? 'bg-black text-white dark:bg-[#D4AF37] dark:text-black shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Show Track Record</span>
              </button>
            </div>
          </ScrollReveal>
        </div>

        {/* Team Grid with Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, idx) => (
            <ScrollReveal key={member.id} animation="fade-up" delay={0.1 * idx}>
              <TeamMemberCard
                member={member}
                idx={idx}
                globalViewMode={globalViewMode}
              />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
};
