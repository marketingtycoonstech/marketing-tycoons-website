import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageCircle, Sparkles, Plus, Minus } from 'lucide-react';
import { ScrollReveal } from './common/ScrollReveal';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'SERVICES',
      question: 'What comprehensive services does Marketing Tycoons offer?',
      answer: 'Marketing Tycoons is a premier full-service digital agency. We specialize in high-performance Web Development (React, Next.js, Node.js), complete Graphic Design & Branding (logos, corporate identity, social media kits), Enterprise Search Engine Optimization (SEO), and ROI-driven Digital Marketing Campaigns.'
    },
    {
      category: 'DEVELOPMENT',
      question: 'How long does it take to deploy a custom, high-end website?',
      answer: 'A standard custom corporate website or e-commerce solution typically takes between 2 to 4 weeks from strategy and wireframing to full launch. More complex enterprise web applications or bespoke software systems are scoped dynamically and usually delivered within 4 to 8 weeks, including complete testing and SEO deployment.'
    },
    {
      category: 'SEO & GROWTH',
      question: 'Do you provide ongoing support, maintenance, and SEO optimization?',
      answer: 'Yes. We offer fully-managed monthly retainer packages that include high-availability secure hosting, daily backups, structural maintenance, performance optimization, and continuous SEO updates to guarantee top Google rankings and consistent organic growth.'
    },
    {
      category: 'DESIGN & CREATIVE',
      question: 'What is your creative process for brand identity and graphic design?',
      answer: 'Our design process is deeply collaborative and strategic. We begin with a comprehensive brand analysis, followed by concept moodboards, high-fidelity draft options, and interactive revisions. Upon final approval, you receive a complete brand guidelines manual and production-ready vector assets.'
    },
    {
      category: 'SECURITY',
      question: 'How do you guarantee the speed and security of your digital assets?',
      answer: 'Every website we engineer is optimized for sub-second loading speeds using modern CDN networks, lazy loading, optimized code compiling, and image compression. Security is paramount; we deploy advanced SSL certificates, strict CORS headers, DDoS mitigation layers, and secure database parameters by default.'
    },
    {
      category: 'CONSULTATION',
      question: 'How can we initiate a partnership and begin a custom project?',
      answer: 'Getting started is seamless. You can book an instant discovery call via our Contact Form or click our WhatsApp Concierge button to discuss your business objectives. Our consulting team will craft a detailed technical proposal, budget timeline, and design scope tailored specifically to your needs.'
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative py-16 md:py-24 bg-[#F8F7F3] dark:bg-[#050505] text-[#111111] dark:text-[#FFFFFF] transition-colors duration-500 overflow-hidden"
    >
      {/* Subtle background luxury element */}
      <div className="absolute top-1/2 left-5 w-80 h-80 bg-[#D4AF37]/5 dark:bg-[#D4AF37]/8 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <ScrollReveal animation="fade-up" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/5 dark:bg-[#D4AF37]/10 border border-black/10 dark:border-[#D4AF37]/30 text-xs font-bold uppercase tracking-wider text-[#B88932] dark:text-[#F6C453] mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Have Questions?</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111] dark:text-[#FFFFFF]">
              Frequently Asked Questions
            </h2>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={0.2}>
            <p className="mt-2.5 text-xs sm:text-sm text-gray-600 dark:text-[#9CA3AF] font-normal max-w-md mx-auto leading-relaxed">
              Find transparent answers about our premium workflow, project turnaround schedules, and digital agency capabilities.
            </p>
          </ScrollReveal>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <ScrollReveal
                key={index}
                animation="fade-up"
                delay={0.05 * index}
              >
                <div
                  className={`rounded-2xl transition-all duration-300 border overflow-hidden cursor-pointer ${
                    isOpen
                      ? 'bg-white border-[#B88932]/40 shadow-md dark:bg-[#0B0F14]/90 dark:border-[#D4AF37]/50 dark:shadow-[0_4px_25px_rgba(212,175,55,0.08)]'
                      : 'bg-white/80 border-black/5 hover:border-black/10 dark:bg-[#0B0F14]/40 dark:border-white/5 dark:hover:border-white/10'
                  }`}
                  onClick={() => handleToggle(index)}
                >
                  {/* Header / Question row */}
                  <div className="p-5 sm:p-6 flex items-center justify-between gap-4 select-none">
                    <div className="flex-1 text-left">
                      <span className="text-[9px] font-mono font-bold tracking-widest text-[#B88932] dark:text-[#D4AF37] block mb-1">
                        {faq.category}
                      </span>
                      <h4 className="font-display font-bold text-sm sm:text-base text-[#111111] dark:text-[#FFFFFF] group-hover:text-[#B88932] dark:group-hover:text-[#F6C453] transition-colors leading-snug">
                        {faq.question}
                      </h4>
                    </div>

                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                      isOpen
                        ? 'bg-black border-black text-white dark:bg-[#D4AF37] dark:border-[#D4AF37] dark:text-black'
                        : 'bg-black/5 border-black/5 text-gray-600 dark:bg-white/5 dark:border-white/5 dark:text-gray-400'
                    }`}>
                      <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </div>
                  </div>

                  {/* Accordion Body / Expandable Area */}
                  <div
                    className="transition-all duration-300 ease-in-out"
                    style={{
                      maxHeight: isOpen ? '250px' : '0px',
                      opacity: isOpen ? 1 : 0
                    }}
                  >
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-gray-600 dark:text-[#9CA3AF] leading-relaxed border-t border-black/[0.03] dark:border-white/[0.03] pt-4">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Dynamic Consultation Bottom Callout */}
        <ScrollReveal animation="fade-up" delay={0.4}>
          <div className="mt-12 text-center bg-white/[0.02] dark:bg-[#111820]/40 p-6 rounded-2xl border border-black/5 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-left">
              <h5 className="font-display font-bold text-xs sm:text-sm text-[#111111] dark:text-[#FFFFFF]">
                Still have unanswered inquiries?
              </h5>
              <p className="text-[11px] text-gray-500 dark:text-[#9CA3AF] mt-0.5">
                Our support desk is active 24/7. Connect directly via WhatsApp for lightning fast feedback.
              </p>
            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4.5 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-extrabold text-xs uppercase tracking-wider hover:scale-103 transition-transform"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask Our Tycoons</span>
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
