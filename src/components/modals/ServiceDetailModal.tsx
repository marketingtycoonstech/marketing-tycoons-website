import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DynamicIcon } from '../common/DynamicIcon';
import { setServiceMeta, resetDefaultMeta } from '../../utils/seo';
import {
  X,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Share2,
  Check,
  Twitter,
  Linkedin,
  Facebook,
  MessageCircle,
  Copy,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  HelpCircle,
  Compass,
  Zap
} from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const { activeServiceModal, setActiveServiceModal, setIsConsultationModalOpen } = useApp();
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    if (activeServiceModal) {
      setServiceMeta(activeServiceModal);
    } else {
      resetDefaultMeta();
    }
    return () => {
      resetDefaultMeta();
    };
  }, [activeServiceModal]);

  if (!activeServiceModal) return null;

  const currentUrl = `https://marketingtycoons.org/#services?service=${activeServiceModal.id}`;
  const shareText = `Discover ${activeServiceModal.title} solutions engineered by Marketing Tycoons!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleBookConsultation = () => {
    setActiveServiceModal(null);
    setIsConsultationModalOpen(true);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setActiveServiceModal(null)}
    >
      <div
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] dark:bg-[#0B0F16] border border-black/10 dark:border-[#222E3F] shadow-2xl p-6 sm:p-10 text-left text-[#111111] dark:text-[#FFFFFF]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveServiceModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. Header & Service Overview */}
        <div className="flex items-start gap-4 mb-6 pr-8">
          <div className="w-14 h-14 rounded-2xl bg-black/5 dark:bg-[#151D28] border border-black/10 dark:border-[#222E3F] flex items-center justify-center text-[#D4AF37] shrink-0">
            <DynamicIcon name={activeServiceModal.iconName} className="w-7 h-7" />
          </div>
          <div>
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-1">
              Dedicated Service Domain · Marketing Tycoons
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#111111] dark:text-white leading-tight">
              {activeServiceModal.title}
            </h2>
          </div>
        </div>

        {/* Full Overview */}
        <div className="mb-8">
          <p className="text-sm sm:text-base text-gray-600 dark:text-[#9CA3AF] leading-relaxed font-light">
            {activeServiceModal.fullDescription || activeServiceModal.shortDescription}
          </p>
        </div>

        {/* 2. Problems We Solve */}
        {activeServiceModal.problemsSolved && activeServiceModal.problemsSolved.length > 0 && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-rose-500/5 dark:bg-rose-500/5 border border-rose-500/20">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 mb-3.5">
              <AlertCircle className="w-4 h-4" />
              <span>Critical Roadblocks We Solve</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeServiceModal.problemsSolved.map((problem, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0 mt-1.5" />
                  <span className="leading-relaxed">{problem}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. Our Strategic Approach */}
        {activeServiceModal.approach && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-[#F8F7F3] dark:bg-[#0E131C] border border-black/10 dark:border-[#1E2530]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37] mb-2.5">
              <Compass className="w-4 h-4" />
              <span>Our Strategic Approach</span>
            </div>
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-light">
              {activeServiceModal.approach}
            </p>
          </div>
        )}

        {/* 4. Concrete Benefits & ROI Multipliers */}
        {activeServiceModal.benefits && activeServiceModal.benefits.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3.5">
              Measurable Business Impact & ROI
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeServiceModal.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-[#F8F7F3] dark:bg-[#0E131C] border border-black/10 dark:border-[#1E2530]"
                >
                  <Zap className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                  <span className="text-xs font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 5. Delivery Process Sprints */}
        {activeServiceModal.processSteps && activeServiceModal.processSteps.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3.5">
              Milestone & Sprint Methodology
            </h3>
            <div className="space-y-3">
              {activeServiceModal.processSteps.map((st, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-black/5 dark:bg-[#0E131C] border border-black/10 dark:border-[#1E2530] flex items-start gap-4"
                >
                  <div className="text-base font-black font-display text-[#D4AF37] shrink-0 mt-0.5">
                    {st.step}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#111111] dark:text-white mb-1">
                      {st.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 font-light leading-relaxed">
                      {st.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Features & Deliverables Checklist */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 pt-4 border-t border-black/10 dark:border-[#1E2530]">
          {activeServiceModal.features && activeServiceModal.features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                Core Capabilities Included
              </h4>
              <ul className="space-y-2">
                {activeServiceModal.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeServiceModal.deliverables && activeServiceModal.deliverables.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                Final Tangible Deliverables
              </h4>
              <ul className="space-y-2">
                {activeServiceModal.deliverables.map((deliv, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0 mt-1.5" />
                    <span>{deliv}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 6. Service Specific FAQs */}
        {activeServiceModal.faqs && activeServiceModal.faqs.length > 0 && (
          <div className="mb-8 pt-4 border-t border-black/10 dark:border-[#1E2530]">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3.5">
              <HelpCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Frequently Asked Questions</span>
            </div>
            <div className="space-y-2.5">
              {activeServiceModal.faqs.map((faq, i) => {
                const isOpen = openFaqIndex === i;
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-black/10 dark:border-[#1E2530] bg-[#F8F7F3] dark:bg-[#0E131C] overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(i)}
                      className="w-full p-4 flex items-center justify-between text-left text-xs font-bold text-gray-900 dark:text-gray-100 hover:text-[#D4AF37] transition-colors cursor-pointer"
                    >
                      <span>{faq.question}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-[#D4AF37]" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 text-xs text-gray-600 dark:text-gray-300 font-light leading-relaxed border-t border-black/5 dark:border-white/5 pt-2">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 7. Strong Conversion CTA Bar & Price */}
        <div className="pt-6 border-t border-black/10 dark:border-[#1E2530] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400 block">
              Transparent Milestone Pricing
            </span>
            <div className="text-lg font-display font-extrabold text-[#111111] dark:text-white">
              {activeServiceModal.startingPrice ? `Starting at ${activeServiceModal.startingPrice}` : 'Bespoke Enterprise Scope'}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveServiceModal(null)}
              className="w-1/2 sm:w-auto px-5 py-3 rounded-full border border-black/15 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={handleBookConsultation}
              className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-bold text-xs uppercase tracking-wider hover:scale-103 active:scale-97 transition-all shadow-md cursor-pointer"
            >
              <span>Book Free Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
