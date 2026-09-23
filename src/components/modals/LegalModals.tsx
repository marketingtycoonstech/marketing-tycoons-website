import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, FileText, QrCode } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { WeChatCard } from '../common/WeChatCard';

export const LegalModals: React.FC = () => {
  const {
    isPrivacyModalOpen,
    isTermsModalOpen,
    setIsTermsModalOpen,
    isWeChatModalOpen,
    setIsWeChatModalOpen
  } = useApp();

  return (
    <>
      {/* Privacy Policy Modal (Firestore Connected for Google Legal Compliance) */}
      <PrivacyPolicyModal />

      {/* Terms & Conditions Modal */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl dark:bg-[#121319] bg-white border dark:border-[#d4af37]/40 border-gray-200 shadow-2xl p-6 sm:p-8 text-left"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsTermsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 border dark:border-gray-800 border-gray-300 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="relative w-11 h-11 rounded-xl bg-black border border-[#d4af37]/60 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(212,175,55,0.35)]">
                <img src="/logo.png" alt="Marketing Tycoons" className="w-full h-full object-cover" />
                <div className="absolute -bottom-0.5 -right-0.5 p-0.5 bg-[#d4af37] rounded-full text-black">
                  <FileText className="w-3 h-3 stroke-[2.5]" />
                </div>
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold block">
                  Marketing Tycoons Service Agreement
                </span>
                <h3 className="font-display text-xl font-bold dark:text-white text-gray-950">
                  Terms & Conditions
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm dark:text-gray-300 text-gray-600 leading-relaxed">
              <p>
                <strong>Last Updated: January 2026</strong>
              </p>
              <p>
                By commissioning digital marketing, website development, SEO, or branding services from Marketing Tycoons, clients agree to our standard statement of work terms and delivery schedules.
              </p>
              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">1. Scope of Work</h4>
              <p>
                All project scopes, deliverables, milestones, and payment schedules are governed by dedicated Master Service Agreements (MSA) executed prior to campaign kickoff.
              </p>
              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">2. Intellectual Property</h4>
              <p>
                Upon final invoice settlement, all client deliverables (custom source code, logos, visual assets, and marketing creatives) transfer 100% to the client under irrevocable commercial license.
              </p>
              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">3. Warranties</h4>
              <p>
                All web development projects include our 30-day post-launch warranty guaranteeing zero critical defects and full Core Web Vitals optimization.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t dark:border-gray-800 border-gray-200 text-right">
              <button
                onClick={() => setIsTermsModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs tracking-wider uppercase cursor-pointer"
              >
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* WeChat Official Account & Dynamic Scannable QR Modal */}
      {isWeChatModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsWeChatModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl dark:bg-[#121319] bg-white border dark:border-[#d4af37]/40 border-gray-200 shadow-2xl p-5 sm:p-6 text-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsWeChatModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 border dark:border-gray-800 border-gray-300 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Scannable WeChat Card Component */}
            <WeChatCard onClose={() => setIsWeChatModalOpen(false)} />

            <button
              onClick={() => setIsWeChatModalOpen(false)}
              className="w-full mt-3 py-2.5 rounded-xl border dark:border-gray-700 border-gray-300 dark:bg-white/10 bg-gray-100 dark:hover:bg-white/20 hover:bg-gray-200 dark:text-white text-gray-800 text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
