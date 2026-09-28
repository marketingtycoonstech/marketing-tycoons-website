import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, FileText, Shield, Cookie, RefreshCw } from 'lucide-react';
import { PrivacyPolicyModal } from './PrivacyPolicyModal';
import { WeChatCard } from '../common/WeChatCard';

export const LegalModals: React.FC = () => {
  const {
    isPrivacyModalOpen,
    isTermsModalOpen,
    setIsTermsModalOpen,
    isRefundModalOpen,
    setIsRefundModalOpen,
    isCookieModalOpen,
    setIsCookieModalOpen,
    isWeChatModalOpen,
    setIsWeChatModalOpen
  } = useApp();

  return (
    <>
      {/* 1. Privacy Policy Modal */}
      <PrivacyPolicyModal />

      {/* 2. Terms & Conditions Modal */}
      {isTermsModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsTermsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl dark:bg-[#0E121A] bg-white border dark:border-[#222E3F] border-gray-200 shadow-2xl p-6 sm:p-8 text-left"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsTermsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 border dark:border-gray-800 border-gray-300 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="relative w-11 h-11 rounded-xl bg-black border border-[#D4AF37]/60 overflow-hidden flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  International Service Agreement
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold dark:text-white text-gray-950">
                  Terms & Conditions
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm dark:text-gray-300 text-gray-600 leading-relaxed font-light">
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Last Updated: January 2026 · Governing Entity: Marketing Tycoons (International Digital Services)
              </p>
              <p>
                By commissioning digital marketing, web engineering, SEO, or branding services from Marketing Tycoons, clients agree to our standard statement of work terms, milestone delivery schedules, and international service agreements.
              </p>
              
              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">1. Scope of Work & Milestones</h4>
              <p>
                All project scopes, deliverables, sprint timelines, and payment schedules are governed by dedicated Master Service Agreements (MSA) executed prior to campaign kickoff. Work commences upon initial milestone confirmation.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">2. Full Intellectual Property Transfer</h4>
              <p>
                Upon final invoice settlement, all client deliverables (custom source code repositories, vector brand marks, digital design tokens, and advertising creatives) transfer 100% to the client under an irrevocable, perpetual commercial license.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">3. Performance & Code Warranty</h4>
              <p>
                All web development and software engineering projects include our standard 30-day post-launch warranty guaranteeing zero critical functional defects, responsive compatibility, and Core Web Vitals optimization.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">4. Confidentiality & Non-Disclosure</h4>
              <p>
                Marketing Tycoons operates under strict non-disclosure obligations regarding proprietary business data, strategic metrics, ad account information, and customer lists.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t dark:border-gray-800 border-gray-200 text-right">
              <button
                onClick={() => setIsTermsModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-bold text-xs tracking-wider uppercase cursor-pointer"
              >
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Refund Policy Modal */}
      {isRefundModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsRefundModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl dark:bg-[#0E121A] bg-white border dark:border-[#222E3F] border-gray-200 shadow-2xl p-6 sm:p-8 text-left"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsRefundModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 border dark:border-gray-800 border-gray-300 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="relative w-11 h-11 rounded-xl bg-black border border-[#D4AF37]/60 overflow-hidden flex items-center justify-center shrink-0">
                <RefreshCw className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  Transparency & Client Satisfaction
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold dark:text-white text-gray-950">
                  Refund & Cancellation Policy
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm dark:text-gray-300 text-gray-600 leading-relaxed font-light">
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Last Updated: January 2026 · Governing Entity: Marketing Tycoons
              </p>
              <p>
                At Marketing Tycoons, we operate with complete financial transparency and professional integrity. We structure all fixed-scope engagements into clearly defined milestone approvals to ensure our clients only pay for deliverables that satisfy agreed specifications.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">1. Milestone-Based Refund Eligibility</h4>
              <p>
                Before any sprint commences, clients review and approve architectural blueprints. If an initial concept or wireframe phase does not align with your vision and you choose not to proceed to the engineering phase, you may request a refund of uncommitted future milestone funds.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">2. Monthly Retainers (SEO & Paid Ads)</h4>
              <p>
                Monthly growth retainers can be cancelled with 14 business days notice prior to the start of the next billing cycle. Fees for completed sprint periods are non-refundable as engineering and media buying hours have already been allocated.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">3. Ad Spend Capital</h4>
              <p>
                Direct advertising spend paid to platform networks (Google Ads, Meta Ads Manager, LinkedIn) is disbursed directly to third-party ad platforms and cannot be refunded by Marketing Tycoons.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">4. Dispute Resolution</h4>
              <p>
                In the rare event of a specification disagreement, our Managing Director personally reviews project tickets to reach an equitable resolution, sprint revision, or prorated credit.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t dark:border-gray-800 border-gray-200 text-right">
              <button
                onClick={() => setIsRefundModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-bold text-xs tracking-wider uppercase cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Cookie Policy Modal */}
      {isCookieModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsCookieModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl dark:bg-[#0E121A] bg-white border dark:border-[#222E3F] border-gray-200 shadow-2xl p-6 sm:p-8 text-left"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsCookieModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 border dark:border-gray-800 border-gray-300 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-6">
              <div className="relative w-11 h-11 rounded-xl bg-black border border-[#D4AF37]/60 overflow-hidden flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block">
                  Data Governance & GDPR Compliance
                </span>
                <h3 className="font-display text-xl sm:text-2xl font-bold dark:text-white text-gray-950">
                  Cookie & Tracking Policy
                </h3>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm dark:text-gray-300 text-gray-600 leading-relaxed font-light">
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Last Updated: January 2026 · Governing Entity: Marketing Tycoons
              </p>
              <p>
                Marketing Tycoons utilizes cookies and local storage tokens to provide seamless web application functionality, maintain user theme preferences, and analyze anonymized site traffic under GDPR and ePrivacy regulations.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">1. Strictly Essential Cookies</h4>
              <p>
                These cookies are required for basic technical operation, security validation, session management, and ensuring that form submissions are routed securely to our cloud database.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">2. Functional & Preference Tokens</h4>
              <p>
                We store your local theme selection (Dark Mode / Light Mode) and client review state in `localStorage` so that your preference persists across page navigations.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">3. Analytics & Performance Cookies</h4>
              <p>
                We use aggregated, anonymized telemetry to track Core Web Vitals, page latency, and referral funnels. No personally identifiable medical, financial, or sensitive data is ever stored in marketing cookies.
              </p>

              <h4 className="font-bold dark:text-white text-gray-900 text-sm pt-2">4. User Cookie Controls</h4>
              <p>
                You can manage, restrict, or clear cookie tokens at any time through your browser settings without impacting your ability to browse our agency work or contact our team.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t dark:border-gray-800 border-gray-200 text-right">
              <button
                onClick={() => setIsCookieModalOpen(false)}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-bold text-xs tracking-wider uppercase cursor-pointer"
              >
                Accept & Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. WeChat Official Account Modal */}
      {isWeChatModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsWeChatModalOpen(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl dark:bg-[#121319] bg-white border dark:border-[#D4AF37]/40 border-gray-200 shadow-2xl p-5 sm:p-6 text-center"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setIsWeChatModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 border dark:border-gray-800 border-gray-300 transition-colors cursor-pointer z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

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
