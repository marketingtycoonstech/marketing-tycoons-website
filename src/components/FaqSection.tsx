import React, { useState, useId } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles, Plus, Minus, Search, CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from './common/ScrollReveal';
import { useApp } from '../context/AppContext';

export interface FaqItem {
  question: string;
  answer: string;
  category: 'SERVICES' | 'DEVELOPMENT' | 'SEO & GROWTH' | 'DESIGN & BRANDING' | 'SECURITY & LEGAL' | 'PRICING';
}

const FAQ_DATA: FaqItem[] = [
  {
    category: 'SERVICES',
    question: 'What comprehensive services does Marketing Tycoons offer?',
    answer: 'Marketing Tycoons is an elite full-service international digital agency. Our core disciplines include high-performance Web & E-Commerce Engineering (React, Next.js, Node.js, Shopify Plus), Technical SEO & Search Authority, Enterprise Brand Architecture & UI/UX Design, and Performance Multi-Channel Digital Marketing (Google Ads, Meta Ads, LinkedIn Ads, programmatic media).'
  },
  {
    category: 'DEVELOPMENT',
    question: 'How long does it take to design and deploy a custom enterprise web application?',
    answer: 'A bespoke corporate website or e-commerce solution typically launches within 2 to 4 weeks across structured agile sprints (Discovery → UI/UX System → Frontend/Backend Build → Performance QA). Complex SaaS platforms or headless architectures are scoped dynamically and delivered within 4 to 8 weeks, backed by automated test suites and complete zero-downtime deployment pipelines.'
  },
  {
    category: 'PRICING',
    question: 'What are your engagement models, pricing structures, and payment terms?',
    answer: 'We operate on transparent, milestone-gated agreements: Fixed-Scope Project Engagements (milestone release tied to verifiable deliverables) and Dedicated Monthly Retainers (for ongoing growth, continuous engineering, and full-funnel digital marketing). We require no bloated lock-ins, and all terms are protected under formal international Master Service Agreements.'
  },
  {
    category: 'SECURITY & LEGAL',
    question: 'How does your 100% intellectual property transfer and NDA policy work?',
    answer: 'Before project initiation, we execute mutual non-disclosure agreements (NDAs) to safeguard your strategic data, ad account metrics, and trade secrets. Upon final milestone settlement, 100% of all intellectual property—including custom source code repositories, Figma design systems, vector brand marks, and ad creative assets—is irrevocably transferred to your business.'
  },
  {
    category: 'SEO & GROWTH',
    question: 'Do you provide ongoing support, maintenance, and SEO optimization retainers?',
    answer: 'Yes. We offer dedicated monthly retainers encompassing enterprise hosting infrastructure, automated daily encrypted backups, uptime monitoring, security patching, and continuous search engine optimization (including technical audits, backlink profiling, and keyword intent clustering) to sustain dominant organic rankings and compounding revenue.'
  },
  {
    category: 'DESIGN & BRANDING',
    question: 'What is your creative methodology for branding and UI/UX design systems?',
    answer: 'Our design practice balances creative artistry with behavioral psychology and conversion rate optimization (CRO). We begin with customer persona research and competitive landscape mapping, iterate through low-fidelity user journey wireframes, build high-fidelity interactive prototypes in Figma, and deliver complete design token systems adhering to strict WCAG 2.1 AA accessibility standards.'
  },
  {
    category: 'DEVELOPMENT',
    question: 'How do you guarantee sub-second speeds, Core Web Vitals compliance, and security?',
    answer: 'Every platform we build undergoes rigorous performance engineering: tree-shaken JavaScript bundles, WebP/AVIF next-gen media compression, edge caching via Cloudflare/Vercel CDNs, and server-side rendering for optimal Largest Contentful Paint (LCP < 800ms). Security is reinforced with automated SSL, strict Content Security Policies (CSP), and sanitized database layers.'
  },
  {
    category: 'SERVICES',
    question: 'How do we initiate a partnership and book an executive discovery consultation?',
    answer: 'Initiating a project is straightforward. Click "Book Free Consultation" to schedule a 30-minute discovery session with our senior strategy team, or message our direct WhatsApp concierge for immediate answers. We will analyze your current digital footprint and deliver a tailored proposal with clear timelines, deliverables, and guaranteed milestones within 24 to 48 hours.'
  }
];

const CATEGORIES = ['ALL', 'SERVICES', 'DEVELOPMENT', 'SEO & GROWTH', 'DESIGN & BRANDING', 'SECURITY & LEGAL', 'PRICING'] as const;

export const FaqSection: React.FC = () => {
  const { setIsConsultationModalOpen } = useApp();
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]); // First item open by default
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const baseId = useId();

  // Filter FAQs based on active category and user search term
  const filteredFaqs = FAQ_DATA.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const isAllExpanded = filteredFaqs.length > 0 && filteredFaqs.every((_, i) => openIndexes.includes(i));

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleExpandCollapseAll = () => {
    if (isAllExpanded) {
      setOpenIndexes([]);
    } else {
      setOpenIndexes(filteredFaqs.map((_, i) => i));
    }
  };

  // Structured Data Schema for Google FAQ Rich Snippets (Schema.org / FAQPage)
  const faqSchemaData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': 'https://marketingtycoons.org/#faq-schema',
    'mainEntity': FAQ_DATA.map((item) => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };

  return (
    <section
      id="faq"
      className="relative py-20 md:py-28 bg-[#F8F7F3] dark:bg-[#050505] text-[#111111] dark:text-[#FFFFFF] transition-colors duration-500 overflow-hidden"
      aria-labelledby={`${baseId}-faq-heading`}
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      {/* 1. Embed Schema.org JSON-LD Structured Data for Google Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchemaData) }}
      />

      {/* Luxury Background Glow Elements */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#C79A45]/5 dark:bg-[#F6C453]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 dark:bg-[#D4AF37]/10 border border-black/10 dark:border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider text-[#B88932] dark:text-[#F6C453] mb-3.5 shadow-sm">
              <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Transparent Partnerships</span>
            </div>
            <h2
              id={`${baseId}-faq-heading`}
              className="font-display text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] dark:text-[#FFFFFF]"
            >
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={0.15}>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-gray-600 dark:text-[#9CA3AF] font-normal max-w-xl mx-auto leading-relaxed">
              Clear, transparent answers regarding our international engineering process, intellectual property rights, turnaround times, and growth retainers.
            </p>
          </ScrollReveal>

          {/* Interactive Controls: Search & Category Filter */}
          <ScrollReveal animation="fade-up" delay={0.2}>
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3">
              {/* Live Search Input */}
              <div className="relative w-full sm:flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Search questions (e.g. pricing, code ownership, speed)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs sm:text-sm bg-white dark:bg-[#0B0F14] border border-black/10 dark:border-white/10 text-[#111111] dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all shadow-sm"
                  aria-label="Search frequently asked questions"
                />
              </div>

              {/* Expand / Collapse All Toggle Button */}
              <button
                type="button"
                onClick={handleExpandCollapseAll}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0B0F14] hover:bg-black/5 dark:hover:bg-white/5 text-[#111111] dark:text-gray-300 text-xs font-semibold tracking-wide transition-colors cursor-pointer shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                aria-label={isAllExpanded ? 'Collapse all FAQ items' : 'Expand all FAQ items'}
              >
                {isAllExpanded ? (
                  <>
                    <Minus className="w-3.5 h-3.5 text-[#B88932] dark:text-[#D4AF37]" aria-hidden="true" />
                    <span>Collapse All</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5 text-[#B88932] dark:text-[#D4AF37]" aria-hidden="true" />
                    <span>Expand All</span>
                  </>
                )}
              </button>
            </div>

            {/* Category Filter Pills */}
            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      isActive
                        ? 'bg-black text-white dark:bg-[#D4AF37] dark:text-black shadow-sm'
                        : 'bg-black/5 dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white border border-transparent hover:border-black/10 dark:hover:border-white/10'
                    }`}
                  >
                    {cat === 'ALL' ? 'All Questions' : cat}
                  </button>
                );
              })}
            </div>
          </ScrollReveal>
        </div>

        {/* Accordion List with Accessible Semantic Structure */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-black/10 dark:border-white/10 bg-white/50 dark:bg-[#0B0F14]/50">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No matching questions found for "{searchQuery}".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="mt-3 text-xs font-bold text-[#B88932] dark:text-[#D4AF37] hover:underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="space-y-3.5" role="region" aria-label="Accordion Questions List">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndexes.includes(index);
              const questionId = `${baseId}-q-${index}`;
              const answerId = `${baseId}-a-${index}`;

              return (
                <ScrollReveal
                  key={faq.question}
                  animation="fade-up"
                  delay={0.03 * Math.min(index, 6)}
                >
                  <div
                    className={`rounded-2xl transition-all duration-300 border overflow-hidden ${
                      isOpen
                        ? 'bg-white border-[#B88932]/40 shadow-md dark:bg-[#0B0F14] dark:border-[#D4AF37]/50 dark:shadow-[0_4px_30px_rgba(212,175,55,0.07)]'
                        : 'bg-white/80 border-black/5 hover:border-black/15 dark:bg-[#0B0F14]/60 dark:border-white/5 dark:hover:border-white/15 shadow-sm'
                    }`}
                    itemScope
                    itemProp="mainEntity"
                    itemType="https://schema.org/Question"
                  >
                    {/* Semantic Accessible Heading & Accordion Trigger */}
                    <h3>
                      <button
                        type="button"
                        id={questionId}
                        aria-expanded={isOpen}
                        aria-controls={answerId}
                        onClick={() => toggleItem(index)}
                        className="w-full p-5 sm:p-6 flex items-center justify-between gap-4 text-left select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
                      >
                        <div className="flex-1 pr-2">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[9px] font-mono font-bold tracking-widest text-[#B88932] dark:text-[#D4AF37] uppercase">
                              {faq.category}
                            </span>
                          </div>
                          <span
                            className="font-display font-bold text-sm sm:text-base text-[#111111] dark:text-[#FFFFFF] hover:text-[#B88932] dark:hover:text-[#F6C453] transition-colors leading-snug block"
                            itemProp="name"
                          >
                            {faq.question}
                          </span>
                        </div>

                        {/* Animated Indicator Icon */}
                        <div
                          className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                            isOpen
                              ? 'bg-black border-black text-white dark:bg-[#D4AF37] dark:border-[#D4AF37] dark:text-black shadow-sm'
                              : 'bg-black/5 border-black/5 text-gray-600 dark:bg-white/5 dark:border-white/5 dark:text-gray-400'
                          }`}
                          aria-hidden="true"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-300 ease-out ${
                              isOpen ? 'rotate-180' : 'rotate-0'
                            }`}
                          />
                        </div>
                      </button>
                    </h3>

                    {/* Smooth GPU-accelerated Accordion Body via CSS Grid Row Interpolation */}
                    <div
                      id={answerId}
                      role="region"
                      aria-labelledby={questionId}
                      className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                      }`}
                      itemScope
                      itemProp="acceptedAnswer"
                      itemType="https://schema.org/Answer"
                    >
                      <div className="overflow-hidden">
                        <div
                          className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 dark:text-[#9CA3AF] leading-relaxed border-t border-black/[0.04] dark:border-white/[0.06] pt-4"
                          itemProp="text"
                        >
                          {faq.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        )}

        {/* Dynamic Consultation Bottom Callout */}
        <ScrollReveal animation="fade-up" delay={0.3}>
          <div className="mt-12 sm:mt-16 bg-white dark:bg-[#0B0F14] p-6 sm:p-8 rounded-3xl border border-black/10 dark:border-white/10 shadow-lg dark:shadow-[0_4px_35px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#B88932] dark:text-[#D4AF37] font-bold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                <span>Rapid Response Guaranteed</span>
              </div>
              <h4 className="font-display font-bold text-base sm:text-lg text-[#111111] dark:text-[#FFFFFF]">
                Need tailored advice for your enterprise?
              </h4>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-[#9CA3AF] mt-1 max-w-lg leading-relaxed">
                Our senior strategists review technical specifications and provide actionable milestones within 24 hours.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setIsConsultationModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-extrabold text-xs uppercase tracking-wider shadow-md hover:scale-103 active:scale-97 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black dark:focus-visible:ring-white"
              >
                <Sparkles className="w-3.5 h-3.5 text-black" aria-hidden="true" />
                <span>Book Free Consultation</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-4.5 py-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-[#111111] dark:text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Contact Desk</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
