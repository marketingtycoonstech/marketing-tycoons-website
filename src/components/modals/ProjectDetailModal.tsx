import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { setProjectMeta, resetDefaultMeta } from '../../utils/seo';
import {
  X,
  ExternalLink,
  Calendar,
  Sparkles,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Share2,
  Check,
  Twitter,
  Linkedin,
  Instagram,
  Github,
  Facebook,
  Youtube,
  MessageCircle,
  Copy,
  Layers,
  BarChart3,
  Code2,
  LayoutGrid,
  Users,
  Target,
  Gauge,
  Activity,
  Globe,
  Palette,
  Video,
  Zap,
  ShieldCheck,
  Clock,
  Timer
} from 'lucide-react';
import { ProjectMilestone, ProjectSocialLink } from '../../types';
import { ProjectTimeline } from '../portfolio/ProjectTimeline';

// Helper to get category-aware milestone icon
const getMilestoneIcon = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes('screen') || lower.includes('ui') || lower.includes('layout')) return LayoutGrid;
  if (lower.includes('code') || lower.includes('line') || lower.includes('dev')) return Code2;
  if (lower.includes('reach') || lower.includes('user') || lower.includes('follower') || lower.includes('impression')) return Users;
  if (lower.includes('conversion') || lower.includes('roas') || lower.includes('rate') || lower.includes('lift') || lower.includes('dropoff') || lower.includes('cpa')) return TrendingUp;
  if (lower.includes('speed') || lower.includes('latency') || lower.includes('response')) return Zap;
  if (lower.includes('score') || lower.includes('lighthouse') || lower.includes('vitals') || lower.includes('pass')) return Gauge;
  if (lower.includes('target') || lower.includes('keyword') || lower.includes('rank') || lower.includes('schema')) return Target;
  if (lower.includes('asset') || lower.includes('banner') || lower.includes('variation') || lower.includes('format') || lower.includes('guide')) return Layers;
  return BarChart3;
};

// Helper to get platform-specific social link icon & colors
const getSocialPlatformDetails = (platform: string) => {
  const lower = platform.toLowerCase();
  if (lower.includes('linkedin')) {
    return {
      icon: Linkedin,
      label: 'LinkedIn',
      hoverBg: 'hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white hover:border-blue-600',
      textColor: 'text-blue-500 dark:text-blue-400'
    };
  }
  if (lower.includes('instagram')) {
    return {
      icon: Instagram,
      label: 'Instagram',
      hoverBg: 'hover:bg-pink-600 hover:text-white dark:hover:bg-pink-600 dark:hover:text-white hover:border-pink-600',
      textColor: 'text-pink-500 dark:text-pink-400'
    };
  }
  if (lower.includes('github')) {
    return {
      icon: Github,
      label: 'GitHub',
      hoverBg: 'hover:bg-gray-900 hover:text-white dark:hover:bg-gray-800 dark:hover:text-white hover:border-gray-900',
      textColor: 'text-gray-700 dark:text-gray-300'
    };
  }
  if (lower.includes('twitter') || lower === 'x') {
    return {
      icon: Twitter,
      label: 'X / Twitter',
      hoverBg: 'hover:bg-sky-500 hover:text-white dark:hover:bg-sky-500 dark:hover:text-white hover:border-sky-500',
      textColor: 'text-sky-400'
    };
  }
  if (lower.includes('behance')) {
    return {
      icon: Palette,
      label: 'Behance',
      hoverBg: 'hover:bg-blue-500 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white hover:border-blue-500',
      textColor: 'text-blue-400'
    };
  }
  if (lower.includes('dribbble')) {
    return {
      icon: Layers,
      label: 'Dribbble',
      hoverBg: 'hover:bg-rose-500 hover:text-white dark:hover:bg-rose-500 dark:hover:text-white hover:border-rose-500',
      textColor: 'text-rose-400'
    };
  }
  if (lower.includes('facebook')) {
    return {
      icon: Facebook,
      label: 'Facebook',
      hoverBg: 'hover:bg-blue-700 hover:text-white dark:hover:bg-blue-700 dark:hover:text-white hover:border-blue-700',
      textColor: 'text-blue-500'
    };
  }
  if (lower.includes('youtube')) {
    return {
      icon: Youtube,
      label: 'YouTube',
      hoverBg: 'hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white hover:border-red-600',
      textColor: 'text-red-500'
    };
  }
  if (lower.includes('tiktok')) {
    return {
      icon: Video,
      label: 'TikTok',
      hoverBg: 'hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white hover:border-white/40',
      textColor: 'text-teal-400'
    };
  }
  return {
    icon: Globe,
    label: platform,
    hoverBg: 'hover:bg-[#D4AF37] hover:text-black dark:hover:bg-[#D4AF37] dark:hover:text-black hover:border-[#D4AF37]',
    textColor: 'text-[#D4AF37] dark:text-[#F6C453]'
  };
};

// Compute visual progress percentage & tag for metric visual meter
const getMetricProgress = (label: string, value: string): { percent: number; tag: string } => {
  const lower = label.toLowerCase();
  const valLower = value.toLowerCase();

  if (valLower.includes('99') || valLower.includes('100%')) return { percent: 98, tag: 'Peak Score' };
  if (lower.includes('reach') || valLower.includes('m')) return { percent: 94, tag: 'High Reach' };
  if (lower.includes('screen') || lower.includes('banner') || lower.includes('asset')) return { percent: 90, tag: 'Production Spec' };
  if (lower.includes('code') || valLower.includes('k')) return { percent: 88, tag: 'Modular Code' };
  if (lower.includes('roas') || lower.includes('conversion') || valLower.includes('x') || valLower.includes('%')) return { percent: 95, tag: 'High ROI' };
  if (lower.includes('latency') || lower.includes('speed') || lower.includes('response')) return { percent: 96, tag: 'Ultra Fast' };
  if (lower.includes('keyword') || lower.includes('vitals')) return { percent: 92, tag: 'Rank #1 Focus' };
  return { percent: 88, tag: 'Audited' };
};

// Fallback milestone generator if custom project didn't explicitly specify milestones
const getDynamicMilestones = (project: { category: string; milestones?: ProjectMilestone[] }): ProjectMilestone[] => {
  if (project.milestones && project.milestones.length > 0) {
    return project.milestones;
  }

  switch (project.category) {
    case 'Websites':
      return [
        { label: 'Screens Designed', value: '36' },
        { label: 'Lines of Code', value: '24.5K' },
        { label: 'Lighthouse Score', value: '99/100' },
        { label: 'Server Response', value: '180ms' }
      ];
    case 'E-Commerce':
      return [
        { label: 'Screens Designed', value: '42' },
        { label: 'Lines of Code', value: '18.4K' },
        { label: 'Checkout Latency', value: '420ms' },
        { label: 'Conversion Lift', value: '+164%' }
      ];
    case 'Branding':
      return [
        { label: 'Brand Assets', value: '48+' },
        { label: 'Color Variations', value: '12 Sets' },
        { label: 'Brand Guide Pages', value: '64 Pgs' },
        { label: 'Vector Formats', value: '16 Types' }
      ];
    case 'Graphic Design':
      return [
        { label: 'Banners Produced', value: '36' },
        { label: 'Display Renders', value: '120+' },
        { label: 'Click-Through Rate', value: '4.8%' },
        { label: 'Format Ratios', value: '9 Formats' }
      ];
    case 'Social Media':
      return [
        { label: 'Campaign Reach', value: '2.4M+' },
        { label: 'Reels Produced', value: '24' },
        { label: 'Engagement Lift', value: '+320%' },
        { label: 'Follower Growth', value: '+85K' }
      ];
    case 'SEO':
      return [
        { label: 'Keywords Ranked', value: '1,450+' },
        { label: 'Organic Traffic Lift', value: '+280%' },
        { label: 'Schema Endpoints', value: '48' },
        { label: 'Core Web Vitals', value: '100% Pass' }
      ];
    case 'Meta Ads':
      return [
        { label: 'Campaign Reach', value: '4.2M' },
        { label: 'Ad Variations', value: '18 Sets' },
        { label: 'Return on Ad Spend', value: '5.6x' },
        { label: 'CPA Reduction', value: '-42%' }
      ];
    default:
      return [
        { label: 'Screens Designed', value: '28' },
        { label: 'Lines of Code', value: '16.4K' },
        { label: 'Milestone Execution', value: 'On-Time' },
        { label: 'Quality Audit', value: '100%' }
      ];
  }
};

export const ProjectDetailModal: React.FC = () => {
  const { activeProjectModal, setActiveProjectModal } = useApp();
  const [copied, setCopied] = useState(false);
  const [mediaLoaded, setMediaLoaded] = useState(false);

  useEffect(() => {
    setMediaLoaded(false);
  }, [activeProjectModal?.id]);

  useEffect(() => {
    if (activeProjectModal) {
      setProjectMeta(activeProjectModal);
    } else {
      resetDefaultMeta();
    }
    return () => {
      resetDefaultMeta();
    };
  }, [activeProjectModal]);

  if (!activeProjectModal) return null;

  const isLive = activeProjectModal.status === 'Live Project';
  const isConcept = activeProjectModal.status === 'Concept Project';

  const currentUrl = `https://marketingtycoons.tech/#portfolio?project=${activeProjectModal.id}`;
  const shareText = `Check out ${activeProjectModal.title} by Marketing Tycoons: ${activeProjectModal.category} project showcase!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}&via=MktgTycoons`,
      '_blank'
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`,
      '_blank'
    );
  };

  const milestones = getDynamicMilestones(activeProjectModal);
  const socialLinks: ProjectSocialLink[] = activeProjectModal.socialLinks || [];
  const projectTimeline = activeProjectModal.timeline || '6-8 Weeks';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-300"
      onClick={() => setActiveProjectModal(null)}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#F8F7F3] dark:bg-[#0B0F14] border border-black/10 dark:border-[#2A3441] shadow-[0_25px_80px_rgba(0,0,0,0.8)] p-6 sm:p-10 text-[#111111] dark:text-[#FFFFFF] text-left animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header with Close Button */}
        <div className="flex items-center justify-between pb-6 border-b border-black/10 dark:border-[#2A3441] mb-6">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-widest uppercase bg-black/5 dark:bg-[#D4AF37]/15 text-[#B88932] dark:text-[#F6C453] border border-black/10 dark:border-[#D4AF37]/40">
              {activeProjectModal.category}
            </span>

            {/* Status Pill */}
            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                isLive
                  ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                  : isConcept
                  ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30'
                  : 'bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-[#2A3441]'
              }`}
            >
              {activeProjectModal.status}
            </span>

            {activeProjectModal.clientName && (
              <span className="text-xs text-gray-600 dark:text-[#9CA3AF] font-medium hidden md:inline-block">
                Client: <strong className="text-gray-900 dark:text-white">{activeProjectModal.clientName}</strong>
              </span>
            )}
          </div>

          <button
            onClick={() => setActiveProjectModal(null)}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-black/5 dark:bg-[#111820] hover:bg-[#D4AF37] hover:text-black dark:hover:bg-[#D4AF37] dark:hover:text-black border border-black/10 dark:border-[#2A3441] text-gray-700 dark:text-gray-300 transition-all duration-200 cursor-pointer"
          >
            <span className="text-xs font-bold uppercase tracking-wider">Close</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media Showcase: Video Player or Hero Visual (16:10 / 16:9 Frame) */}
        <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[#090D12] dark:bg-[#070A0E] mb-8 border border-black/10 dark:border-[#2A3441] shadow-2xl">
          {/* Skeleton Placeholder Shimmer */}
          {!mediaLoaded && (
            <div className="absolute inset-0 z-0 flex flex-col items-center justify-center bg-[#0C1017] dark:bg-[#080B0F]">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/[0.04] dark:via-[#D4AF37]/10 to-transparent" />
              <div className="flex flex-col items-center gap-2 text-gray-500/40 select-none">
                <div className="w-12 h-12 rounded-2xl bg-black/30 dark:bg-white/5 border border-white/5 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#D4AF37]/50 animate-pulse" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]/40">
                  Loading Showcase...
                </span>
              </div>
            </div>
          )}

          {/* Browser Chrome Bar for Websites / E-Commerce */}
          {(activeProjectModal.category === 'Websites' || activeProjectModal.category === 'E-Commerce') && (
            <div className="absolute top-0 inset-x-0 z-20 h-7 bg-black/90 backdrop-blur-md border-b border-white/10 px-4 flex items-center justify-between pointer-events-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="text-[10px] font-mono text-gray-300 truncate max-w-[280px]">
                {activeProjectModal.browserUrl || (isLive ? activeProjectModal.projectUrl : 'https://marketingtycoons.tech')}
              </div>
              <div className="w-6" />
            </div>
          )}

          {activeProjectModal.videoUrl ? (
            <div className="relative w-full h-full pt-0">
              <video
                src={activeProjectModal.videoUrl}
                poster={activeProjectModal.imageUrl}
                controls
                playsInline
                autoPlay
                onLoadedData={() => setMediaLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-700 ${
                  mediaLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-md'
                }`}
              />
            </div>
          ) : (
            <img
              src={activeProjectModal.imageUrl}
              alt={activeProjectModal.title}
              onLoad={() => setMediaLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-700 ${
                mediaLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-md scale-105'
              }`}
            />
          )}
        </div>

        {/* Project Title & Live Link Area */}
        <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
          <div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#111111] dark:text-[#FFFFFF] uppercase tracking-tight">
              {activeProjectModal.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-[#9CA3AF] mt-1.5">
              {activeProjectModal.completionDate && (
                <p className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Delivered: <strong>{activeProjectModal.completionDate}</strong></span>
                </p>
              )}
              {activeProjectModal.timeline && (
                <p className="flex items-center gap-1.5 text-[#B88932] dark:text-[#F6C453] font-semibold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timeline: {activeProjectModal.timeline}</span>
                </p>
              )}
            </div>
          </div>

          {/* Genuine Project Link or Concept Project Indicator */}
          {isLive && activeProjectModal.projectUrl ? (
            <a
              href={activeProjectModal.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-black text-white dark:bg-gradient-to-r dark:from-[#D4AF37] dark:to-[#F6C453] dark:text-[#050505] text-xs font-extrabold uppercase tracking-wider hover:opacity-90 transition-all duration-200 shadow-md cursor-pointer"
            >
              <span>Visit Live Website</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black/5 dark:bg-[#111820] border border-black/10 dark:border-[#2A3441] text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{activeProjectModal.status}</span>
            </div>
          )}
        </div>

        {/* Social Share & Link Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#111820] border border-black/10 dark:border-[#2A3441] mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-[#D1D5DB]">
            <Share2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Share Case Study:</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={shareToTwitter}
              title="Share on X / Twitter"
              className="p-2 rounded-lg bg-black/5 dark:bg-[#161D26] hover:bg-[#D4AF37] hover:text-black dark:hover:bg-[#D4AF37] dark:hover:text-black transition-colors cursor-pointer"
            >
              <Twitter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={shareToLinkedIn}
              title="Share on LinkedIn"
              className="p-2 rounded-lg bg-black/5 dark:bg-[#161D26] hover:bg-[#D4AF37] hover:text-black dark:hover:bg-[#D4AF37] dark:hover:text-black transition-colors cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={shareToFacebook}
              title="Share on Facebook"
              className="p-2 rounded-lg bg-black/5 dark:bg-[#161D26] hover:bg-[#D4AF37] hover:text-black dark:hover:bg-[#D4AF37] dark:hover:text-black transition-colors cursor-pointer"
            >
              <Facebook className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={shareToWhatsApp}
              title="Share on WhatsApp"
              className="p-2 rounded-lg bg-black/5 dark:bg-[#161D26] hover:bg-[#D4AF37] hover:text-black dark:hover:bg-[#D4AF37] dark:hover:text-black transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyLink}
              title="Copy Direct Link"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-[#161D26] hover:bg-[#D4AF37] hover:text-black dark:hover:bg-[#D4AF37] dark:hover:text-black transition-colors text-xs font-semibold cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
            </button>
          </div>
        </div>

        {/* Project Description */}
        <div className="space-y-4 mb-8">
          <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#9CA3AF]">
            Project Overview & Strategy
          </h4>
          <p className="text-base text-gray-700 dark:text-[#D1D5DB] font-normal leading-relaxed">
            {activeProjectModal.fullDescription || activeProjectModal.shortDescription}
          </p>
        </div>

        {/* Interactive Visual Estimated Project Timeline Component */}
        <div className="mb-8">
          <ProjectTimeline />
        </div>

        {/* Enhanced Premium Milestone Metrics Grid Layout with Dedicated Timeline Placement */}
        <div className="mb-8 p-6 sm:p-7 rounded-2xl bg-white dark:bg-[#111820] border border-black/10 dark:border-[#2A3441] shadow-xs relative overflow-hidden">
          {/* Subtle Ambient Background Aura */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header with Turnaround Timeline Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#F6C453]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#111111] dark:text-[#FFFFFF]">
                  Quantitative Milestones & Technical Scope
                </h3>
                <p className="text-[11px] text-gray-500 dark:text-[#9CA3AF] font-medium">
                  Verified deliverables, performance indicators, and execution schedule
                </p>
              </div>
            </div>

            {/* Timeline & Audit Indicators */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] text-[#B88932] dark:text-[#F6C453] font-bold uppercase tracking-wider bg-[#D4AF37]/10 dark:bg-[#D4AF37]/15 px-3 py-1.5 rounded-xl border border-[#D4AF37]/30 shadow-xs">
                <Clock className="w-3.5 h-3.5" />
                <span>Timeline: {projectTimeline}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] text-gray-600 dark:text-[#9CA3AF] font-bold uppercase tracking-wider bg-black/5 dark:bg-[#161D26] px-2.5 py-1.5 rounded-xl border border-black/5 dark:border-[#2A3441]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>Audited Scope</span>
              </span>
            </div>
          </div>

          {/* Premium Metric Grid Layout (4 Milestones Grid) */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 ${milestones.length >= 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'} gap-3.5 sm:gap-4 relative z-10`}>
            {milestones.map((m, idx) => {
              const IconComp = getMilestoneIcon(m.label);
              const { percent, tag } = getMetricProgress(m.label, m.value);

              return (
                <div
                  key={idx}
                  className="group relative p-4 sm:p-5 rounded-xl bg-gray-50 dark:bg-[#161D26] hover:dark:bg-[#1a232f] border border-black/5 dark:border-[#2A3441] hover:border-[#D4AF37]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md hover:-translate-y-0.5"
                >
                  {/* Card Header: Icon + Pill Badge */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/25 flex items-center justify-center text-[#F6C453] group-hover:scale-105 group-hover:bg-[#D4AF37]/20 transition-all">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#D4AF37]/10 text-[#B88932] dark:text-[#F6C453] border border-[#D4AF37]/20">
                      {tag}
                    </span>
                  </div>

                  {/* Quantitative Metric Value */}
                  <div className="mb-3">
                    <div className="font-display text-2xl sm:text-3xl font-black text-[#B88932] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-[#FFFFFF] dark:via-[#F6C453] dark:to-[#D4AF37] tracking-tight">
                      {m.value}
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-[#D1D5DB] mt-1 line-clamp-1">
                      {m.label}
                    </div>
                  </div>

                  {/* Visual Progress Meter with Gold Gradient */}
                  <div className="w-full pt-1.5 border-t border-black/5 dark:border-[#2A3441]/60">
                    <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#D4AF37] rounded-full transition-all duration-700 ease-out group-hover:brightness-110"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[9px] text-gray-400 dark:text-[#9CA3AF] font-mono mt-1">
                      <span>Baseline</span>
                      <span className="text-[#B88932] dark:text-[#F6C453] font-semibold">Exceeded</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Turnaround & Delivery Timeline Footer Banner */}
          <div className="mt-4 p-3.5 rounded-xl bg-gray-50 dark:bg-[#161D26]/70 border border-black/5 dark:border-[#2A3441] flex flex-wrap items-center justify-between gap-3 text-xs relative z-10">
            <div className="flex items-center gap-2 text-gray-700 dark:text-[#D1D5DB]">
              <Timer className="w-4 h-4 text-[#D4AF37] dark:text-[#F6C453]" />
              <span>Project Delivery Cycle: <strong>{projectTimeline}</strong></span>
              <span className="text-gray-400 hidden sm:inline">•</span>
              <span className="text-gray-500 dark:text-[#9CA3AF] hidden sm:inline">Agile sprints with weekly review milestones</span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
              Delivered On Schedule
            </span>
          </div>
        </div>

        {/* Two-Column Grid: Services Provided & Metric Results / Process */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Services Provided Column with Dedicated Vertical Social Link Section */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111820] border border-black/10 dark:border-[#2A3441] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] dark:text-[#F6C453] mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>Services & Deliverables Provided</span>
              </div>
              
              {activeProjectModal.servicesProvided && activeProjectModal.servicesProvided.length > 0 ? (
                <div className="space-y-2.5">
                  {activeProjectModal.servicesProvided.map((service, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-800 dark:text-[#D1D5DB]">
                      <CheckCircle2 className="w-4 h-4 text-[#F6C453] shrink-0" />
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 dark:text-[#9CA3AF]">
                  Full-scope digital delivery including UI/UX design, engineering, and quality assurance.
                </p>
              )}
            </div>

            {/* Dedicated Project Social Links Section Aligned Vertically Beneath Services List */}
            {socialLinks.length > 0 && (
              <div className="mt-6 pt-5 border-t border-black/10 dark:border-[#2A3441]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D1D5DB]">
                    <Globe className="w-3.5 h-3.5 text-[#D4AF37] dark:text-[#F6C453]" />
                    <span>Project Social Channels</span>
                  </div>
                  <span className="text-[10px] text-gray-400 dark:text-[#9CA3AF] uppercase font-mono">
                    {socialLinks.length} Channels
                  </span>
                </div>

                {/* Professional Small Circular Icon Buttons */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {socialLinks.map((item, idx) => {
                    const details = getSocialPlatformDetails(item.platform);
                    const IconComponent = details.icon;

                    return (
                      <a
                        key={idx}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group relative w-9 h-9 rounded-full bg-gray-50 dark:bg-[#161D26] hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] border border-black/10 dark:border-[#2A3441] hover:border-[#D4AF37] dark:hover:border-[#D4AF37] flex items-center justify-center text-gray-700 dark:text-[#D1D5DB] hover:text-black dark:hover:text-black transition-all duration-200 hover:scale-110 shadow-xs cursor-pointer ${details.hoverBg}`}
                        title={`${item.platform}: ${item.url}`}
                      >
                        <IconComponent className={`w-4 h-4 transition-transform group-hover:scale-110 ${details.textColor} group-hover:text-inherit`} />
                        
                        {/* Clean Hover Tooltip */}
                        <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-black/95 border border-[#D4AF37]/40 text-[10px] font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30 shadow-md">
                          {item.platform}
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Results or Process Highlights */}
          {activeProjectModal.results && (
            <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#111820] border border-black/10 dark:border-[#2A3441]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] dark:text-[#F6C453] mb-4">
                <TrendingUp className="w-4 h-4" />
                <span>{isLive ? 'Measurable Impact' : 'Project Scope & Milestones'}</span>
              </div>
              <div className="space-y-2.5">
                {(Array.isArray(activeProjectModal.results)
                  ? activeProjectModal.results
                  : activeProjectModal.results.split(', ')
                ).map((result, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-800 dark:text-[#D1D5DB]">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>{result}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Technologies Applied */}
        {activeProjectModal.technologies && activeProjectModal.technologies.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#9CA3AF] mb-3 flex items-center gap-2">
              <Cpu className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Technology & Production Stack</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {activeProjectModal.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/5 dark:bg-[#161D26] text-gray-800 dark:text-[#D1D5DB] border border-black/10 dark:border-[#2A3441]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTAs */}
        <div className="pt-6 border-t border-black/10 dark:border-[#2A3441] flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => setActiveProjectModal(null)}
            className="px-6 py-3 rounded-xl border border-black/20 dark:border-[#2A3441] text-gray-700 dark:text-[#D1D5DB] hover:text-black dark:hover:text-white text-xs font-semibold uppercase tracking-wider cursor-pointer"
          >
            Close Presentation
          </button>

          <a
            href="#contact"
            onClick={() => setActiveProjectModal(null)}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-[#050505] font-extrabold text-xs tracking-wider uppercase hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Commission Similar Project</span>
          </a>
        </div>
      </div>
    </div>
  );
};
