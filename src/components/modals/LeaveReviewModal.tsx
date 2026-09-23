import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, CheckCircle2, AlertCircle, Sparkles, Check, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { signInWithGoogle } from '../../lib/firebase';

export const LeaveReviewModal: React.FC = () => {
  const {
    isReviewModalOpen,
    setIsReviewModalOpen,
    submitReview,
    services,
    currentUser
  } = useApp();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [name, setName] = useState(currentUser?.displayName || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [serviceUsed, setServiceUsed] = useState('Website Development');
  const [reviewText, setReviewText] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(currentUser?.photoURL || '');
  const [isGoogleVerified, setIsGoogleVerified] = useState(Boolean(currentUser?.isGoogleVerified));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isReviewModalOpen) return null;

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const { user } = await signInWithGoogle();
      setName(user.displayName || 'Google Verified Client');
      setEmail(user.email || '');
      setAvatarUrl(user.photoURL || '');
      setIsGoogleVerified(true);
    } catch (err: any) {
      console.error('Google auth error:', err);
      setError('Could not complete Google authentication. You can still submit manually.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid business email.');
      return;
    }
    if (!reviewText.trim() || reviewText.trim().length < 15) {
      setError('Please write at least 15 characters describing your experience.');
      return;
    }

    try {
      await submitReview({
        name: name.trim(),
        email: email.trim(),
        rating,
        review: reviewText.trim(),
        serviceUsed,
        avatarUrl: avatarUrl.trim() || undefined,
        isGoogleVerified
      });

      setIsSubmitted(true);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.5 },
          colors: ['#d4af37', '#ffffff']
        });
      } catch {
        // ignore
      }
    } catch (err: any) {
      setError('Failed to submit review. Please try again.');
    }
  };

  const handleClose = () => {
    setIsReviewModalOpen(false);
    setIsSubmitted(false);
    if (!currentUser) {
      setName('');
      setEmail('');
      setAvatarUrl('');
      setIsGoogleVerified(false);
    }
    setReviewText('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-3xl dark:bg-[#121319] bg-white border dark:border-[#d4af37]/40 border-gray-200 shadow-2xl p-6 sm:p-8 text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 border dark:border-gray-800 border-gray-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="relative w-16 h-16 rounded-2xl bg-black border border-[#d4af37]/70 overflow-hidden flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(212,175,55,0.45)]">
              <img src="/logo.png" alt="Marketing Tycoons" className="w-full h-full object-cover" />
              <div className="absolute bottom-0 right-0 p-1 bg-[#d4af37] rounded-tl-lg text-black">
                <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
              </div>
            </div>
            <h3 className="font-display text-2xl font-bold dark:text-white text-gray-950 mb-2">
              Review Submitted!
            </h3>
            <p className="text-sm dark:text-gray-300 text-gray-600 mb-6 max-w-sm mx-auto">
              Thank you for sharing your experience with Marketing Tycoons. Your feedback has been persisted to Firestore and queued for verification.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs tracking-wider uppercase shadow-xs cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-black border border-[#d4af37]/60 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.35)]">
                <img src="/logo.png" alt="Marketing Tycoons" className="w-full h-full object-cover" />
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  Verified Feedback
                </span>
                <h3 className="font-display text-2xl font-bold dark:text-white text-gray-950">
                  Share Your Experience
                </h3>
                <p className="text-xs dark:text-gray-400 text-gray-500 mt-1">
                  Help other businesses discover the results of working with Marketing Tycoons.
                </p>
              </div>
            </div>

            {/* Google Legal Authentication Action */}
            <div className="mb-6 p-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-gray-800 border-gray-200">
              {isGoogleVerified ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={name} className="w-9 h-9 rounded-full object-cover border border-[#d4af37]" />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold text-xs">
                        {name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold dark:text-white text-gray-900">
                        <span>{name}</span>
                        <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                      </div>
                      <div className="text-[11px] text-emerald-500 font-medium">Google Verified Account</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase">
                    Authenticated
                  </span>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold dark:text-white text-gray-900">Google Verified Review</div>
                    <div className="text-[11px] dark:text-gray-400 text-gray-500">Sign in with Google to earn a verified client badge</div>
                  </div>
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={isGoogleLoading}
                    className="shrink-0 inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white hover:bg-gray-100 border border-gray-300 text-black font-semibold text-xs transition-colors shadow-xs cursor-pointer disabled:opacity-60"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z" />
                      <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
                      <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                    </svg>
                    <span>{isGoogleLoading ? 'Signing In...' : 'Verify with Google'}</span>
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Star Rating Picker */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-300 text-gray-700 mb-2">
                  Your Overall Rating <span className="text-[#d4af37]">*</span>
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => {
                    const isFilled = (hoverRating || rating) >= star;
                    return (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 focus:outline-none transition-transform hover:scale-110 cursor-pointer"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            isFilled
                              ? 'text-[#d4af37] fill-[#d4af37]'
                              : 'text-gray-400 dark:text-gray-600'
                          }`}
                        />
                      </button>
                    );
                  })}
                  <span className="ml-2 text-xs font-semibold text-[#d4af37]">
                    {rating} of 5 Stars
                  </span>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-300 text-gray-700 mb-1.5">
                    Your Name <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Jonathan Lee"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-[#090a0d] bg-gray-50 border dark:border-gray-700 border-gray-300 focus:border-[#d4af37] dark:text-white text-gray-900 text-xs outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-300 text-gray-700 mb-1.5">
                    Business Email <span className="text-[#d4af37]">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="jonathan@company.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-[#090a0d] bg-gray-50 border dark:border-gray-700 border-gray-300 focus:border-[#d4af37] dark:text-white text-gray-900 text-xs outline-none"
                  />
                </div>
              </div>

              {/* Service Used */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-300 text-gray-700 mb-1.5">
                  Service Utilized
                </label>
                <select
                  value={serviceUsed}
                  onChange={e => setServiceUsed(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-[#090a0d] bg-gray-50 border dark:border-gray-700 border-gray-300 focus:border-[#d4af37] dark:text-white text-gray-900 text-xs outline-none cursor-pointer"
                >
                  {services.map(s => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="Full Digital Suite">Full Digital Suite</option>
                </select>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-300 text-gray-700 mb-1.5">
                  Feedback & Review Details <span className="text-[#d4af37]">*</span>
                </label>
                <textarea
                  rows={4}
                  value={reviewText}
                  onChange={e => setReviewText(e.target.value)}
                  placeholder="How was the communication, creative quality, timeliness, and measurable outcome?"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl dark:bg-[#090a0d] bg-gray-50 border dark:border-gray-700 border-gray-300 focus:border-[#d4af37] dark:text-white text-gray-900 text-xs outline-none resize-none"
                />
              </div>

              {/* Optional Avatar / Photo URL */}
              {!isGoogleVerified && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-400 text-gray-600 mb-1.5">
                    Profile Photo URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={e => setAvatarUrl(e.target.value)}
                    placeholder="https://... photo link"
                    className="w-full px-3.5 py-2.5 rounded-xl dark:bg-[#090a0d] bg-gray-50 border dark:border-gray-700 border-gray-300 focus:border-[#d4af37] dark:text-white text-gray-900 text-xs outline-none"
                  />
                </div>
              )}

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl dark:bg-red-950/60 bg-red-50 border dark:border-red-800 border-red-200 dark:text-red-300 text-red-700 text-xs">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2.5 rounded-xl border dark:border-gray-700 border-gray-300 dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-white/5 text-xs font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
                >
                  Submit for Approval
                </button>
              </div>

            </form>
          </div>
        )}

      </div>
    </div>
  );
};
