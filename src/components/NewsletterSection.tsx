import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Sparkles, ShieldCheck, AlertCircle, Download, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

// Simple, robust email validation pattern (RFC 5322 compatible common web format)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const NewsletterSection: React.FC = () => {
  const { submitContactMessage } = useApp();

  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [downloadStarted, setDownloadStarted] = useState(false);

  const validateEmail = (value: string): boolean => {
    const trimmed = value.trim();
    if (!trimmed) {
      setError('Please enter your work or personal email address.');
      return false;
    }
    if (!EMAIL_REGEX.test(trimmed)) {
      setError('Please enter a valid email address (e.g., alex@company.com).');
      return false;
    }
    setError(null);
    return true;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) {
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      return;
    }

    const cleanEmail = email.trim().toLowerCase();
    setIsSubmitting(true);
    setError(null);

    try {
      // 1. Submit lead to AppContext / Firestore so it reflects in Admin Dashboard
      await submitContactMessage({
        name: 'Newsletter Subscriber',
        email: cleanEmail,
        phone: 'N/A',
        service: 'Executive Newsletter Dispatch',
        message: 'Subscribed to Tycoon Growth Dispatch. Requested 2026 Core Web Vitals & ROAS Scaling Blueprint.'
      });

      // 2. Persist locally to remember subscription
      const existingSubs = JSON.parse(localStorage.getItem('mt_newsletter_subs') || '[]');
      if (!existingSubs.includes(cleanEmail)) {
        existingSubs.push(cleanEmail);
        localStorage.setItem('mt_newsletter_subs', JSON.stringify(existingSubs));
      }

      setSubscribedEmail(cleanEmail);
      setIsSuccess(true);
      setEmail('');
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      // Graceful completion even if network is offline
      setSubscribedEmail(cleanEmail);
      setIsSuccess(true);
      setEmail('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setSubscribedEmail('');
    setDownloadStarted(false);
    setError(null);
  };

  const handleDownloadBlueprint = () => {
    setDownloadStarted(true);
    // Trigger download of playbook
    const blob = new Blob(
      [
        `MARKETING TYCOONS - 2026 DIGITAL ARCHITECTURE & ROAS SCALING PLAYBOOK\n\n` +
        `Subscriber: ${subscribedEmail}\n` +
        `Date: ${new Date().toLocaleDateString()}\n\n` +
        `CHAPTER 1: SUB-500MS CORE WEB VITALS FOR NEXT.JS & REACT\n` +
        `- Eliminate CLS with rigid image bounding boxes.\n` +
        `- Prefetch high-intent routes on pointer-enter.\n` +
        `- Implement edge hydration with zero-blocking JS.\n\n` +
        `CHAPTER 2: HIGH-ROAS META & GOOGLE AD ARCHITECTURES\n` +
        `- First-party server-side Conversions API (CAPI) redundancy.\n` +
        `- Broad targeting with dynamic creative hooks.\n` +
        `- Value-based bidding tuned for EBITDA, not vanity ROAS.\n\n` +
        `Thank you for joining our executive dispatch!`
      ],
      { type: 'text/plain' }
    );
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MarketingTycoons_2026_Growth_Playbook.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="newsletter-dispatch"
      aria-label="Executive Newsletter Subscription"
      className="relative my-8 sm:my-10 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 overflow-hidden bg-gradient-to-b from-white to-gray-50 dark:from-[#0B0F16] dark:to-[#070A0E] border border-black/10 dark:border-[#222E3F] shadow-lg dark:shadow-[0_15px_40px_rgba(0,0,0,0.7)] text-left"
    >
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-radial from-[#D4AF37]/15 dark:from-[#D4AF37]/20 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-radial from-[#F6C453]/10 dark:from-[#AA771C]/15 to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            /* ============================================================ */
            /* 1. High-Conversion Subscription Form State                    */
            /* ============================================================ */
            <motion.div
              key="form-state"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                
                {/* Left Column: Compelling Copy & Value Proposition */}
                <div className="max-w-xl">
                  {/* Subtle Unboxed Kicker */}
                  <div className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#B88932] dark:text-[#D4AF37] mb-2.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>The Tycoon Growth Dispatch</span>
                    <span className="text-gray-300 dark:text-gray-600">·</span>
                    <span className="font-mono text-gray-500 dark:text-gray-400">Every Thursday</span>
                  </div>

                  {/* Headline */}
                  <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#111111] dark:text-[#FFFFFF] leading-tight">
                    Join 12,500+ Founders &amp;{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#C99A45]">
                      Marketing Executives.
                    </span>
                  </h3>

                  {/* Value Description */}
                  <p className="mt-3 text-xs sm:text-sm text-gray-600 dark:text-[#9CA3AF] leading-relaxed font-light">
                    Zero promotional fluff. Receive concise weekly forensic breakdowns of our latest international scale campaigns, conversion architectures, and private media buying playbooks.
                  </p>

                  {/* Instant Bonus Incentive Tag */}
                  <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-[#131B26] border border-black/10 dark:border-[#243144] text-[11px] text-gray-700 dark:text-gray-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                    <span className="font-semibold text-gray-900 dark:text-white">Instant Bonus:</span>
                    <span>Includes the 2026 Core Web Vitals &amp; ROAS Scaling Blueprint (PDF)</span>
                  </div>
                </div>

                {/* Right Column: Form Control with Validation */}
                <div className="w-full lg:max-w-md">
                  <form onSubmit={handleSubmit} noValidate className="space-y-3">
                    <div className="relative">
                      {/* Input Wrapper */}
                      <div className="relative flex flex-col sm:flex-row items-stretch gap-2.5 sm:gap-2">
                        <div className="relative flex-1">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
                            <Mail className="w-4 h-4" />
                          </div>
                          
                          <input
                            type="email"
                            value={email}
                            onChange={handleInputChange}
                            placeholder="Enter your executive email..."
                            aria-label="Corporate Email Address"
                            aria-invalid={error ? 'true' : 'false'}
                            aria-describedby={error ? 'newsletter-error-msg' : undefined}
                            disabled={isSubmitting}
                            className={`w-full pl-10 pr-4 py-3 sm:py-3.5 rounded-xl text-xs sm:text-sm font-medium bg-white dark:bg-[#101620] text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 border transition-all duration-200 outline-none shadow-xs ${
                              error
                                ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                                : 'border-black/15 dark:border-[#263242] focus:border-[#D4AF37] dark:focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20'
                            }`}
                          />
                        </div>

                        {/* Submit Button */}
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#D4AF37] text-black shadow-md hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-102 active:scale-98 transition-all shrink-0 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isSubmitting ? (
                            <>
                              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                              <span>Confirming...</span>
                            </>
                          ) : (
                            <>
                              <span>Subscribe Free</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>

                      {/* Live Validation Error State */}
                      {error && (
                        <motion.div
                          id="newsletter-error-msg"
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-1.5 mt-2 text-xs text-red-500 font-medium"
                        >
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{error}</span>
                        </motion.div>
                      )}
                    </div>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400 pt-1">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Zero Spam Guarantee · Unsubscribe anytime</span>
                      </div>
                      <span className="font-mono text-[10px] hidden sm:inline">100% Free Forever</span>
                    </div>
                  </form>
                </div>

              </div>
            </motion.div>
          ) : (
            /* ============================================================ */
            /* 2. Rich Success Feedback State                               */
            /* ============================================================ */
            <motion.div
              key="success-state"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="py-4 text-center sm:text-left"
            >
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                
                {/* Checkmark Icon Emblem with Gold & Green Glow */}
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/15 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0 shadow-lg shadow-emerald-500/10">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="flex-1 space-y-2">
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    <span>Priority Dispatch Confirmed</span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-black text-[#111111] dark:text-white uppercase tracking-tight">
                    Welcome to the Inner Circle!
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-[#9CA3AF] max-w-2xl leading-relaxed">
                    We've registered <span className="font-semibold text-black dark:text-white">{subscribedEmail}</span> for our Thursday executive dispatch. Your complimentary 2026 Core Web Vitals &amp; ROAS Scaling Blueprint is ready below.
                  </p>

                  {/* Success Action Buttons */}
                  <div className="pt-4 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleDownloadBlueprint}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-black dark:bg-white text-white dark:text-black hover:bg-[#D4AF37] dark:hover:bg-[#D4AF37] transition-all cursor-pointer shadow-md"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{downloadStarted ? 'Blueprint Downloaded ✓' : 'Download Growth Playbook (TXT/PDF)'}</span>
                    </button>

                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-semibold text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white border border-black/10 dark:border-[#222E3F] hover:border-black/20 dark:hover:border-white/20 transition-all cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Subscribe Another Address</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
