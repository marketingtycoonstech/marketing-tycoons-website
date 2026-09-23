import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, CheckCircle2, Video, Facebook, Linkedin, Twitter, Youtube, Send } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';
import confetti from 'canvas-confetti';

export const TestimonialsSection: React.FC = () => {
  const {
    testimonials,
    reviews,
    submitReview,
    currentUser,
    socialLinks
  } = useApp();

  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [projectLink, setProjectLink] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const approvedTestimonials = testimonials.filter(t => t.approved);

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      await signInWithGoogle();
    } catch (err: any) {
      console.error('Google auth error:', err);
      setError('Could not complete Google authentication.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim() || reviewText.trim().length < 10) {
      setError('Please write at least 10 characters describing your feedback.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      await submitReview({
        name: currentUser?.displayName || 'Verified Client',
        email: currentUser?.email || 'client@feedback.com',
        rating,
        review: reviewText.trim(),
        serviceUsed: 'Digital Marketing & Development',
        avatarUrl: currentUser?.photoURL || undefined,
        isGoogleVerified: Boolean(currentUser?.isGoogleVerified || currentUser?.email)
      });

      setSubmitSuccess(true);
      setReviewText('');
      setProjectLink('');
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#D4AF37', '#F6C453', '#FFFFFF']
        });
      } catch {
        // ignore
      }
    } catch (err) {
      setError('Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="testimonials"
      className="relative py-12 md:py-20 bg-[#F8F7F3] dark:bg-[#050505] text-[#111111] dark:text-[#FFFFFF] transition-colors duration-500 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Framed Section Box matching image */}
        <div className="rounded-3xl p-6 sm:p-10 md:p-12 bg-white dark:bg-[#0B0F14] border border-black/10 dark:border-[#2A3441] shadow-xl dark:shadow-[0_10px_40px_rgba(0,0,0,0.8)] relative overflow-hidden">
          
          {/* Section Header */}
          <div className="text-left mb-10">
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight text-[#111111] dark:text-[#FFFFFF]">
              Client Feedback - Add Review (Google Auth)
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left Column: Google Auth + Channels */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Google Sign-in Button */}
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  disabled={isGoogleLoading}
                  className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-white dark:bg-white text-gray-800 font-bold text-xs tracking-wider shadow-md hover:bg-gray-50 active:scale-95 transition-all cursor-pointer border border-gray-300"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                    />
                  </svg>
                  <span>{currentUser ? `Signed in as ${currentUser.displayName || currentUser.email}` : 'Continue with Google'}</span>
                </button>

                <p className="text-xs text-gray-500 dark:text-[#9CA3AF] leading-relaxed">
                  Sign in with your Google account to verify and submit your feedback. Your Google account will be used to verify your identity and display your profile (name & photo) with your review.
                </p>
              </div>

              {/* Social Media Follow Icons */}
              <div className="pt-4 border-t border-black/5 dark:border-[#2A3441]">
                <span className="text-xs uppercase font-bold text-gray-400 dark:text-[#9CA3AF] tracking-wider block mb-3">
                  Follow Us
                </span>
                <div className="flex items-center gap-2">
                  {socialLinks.facebook && (
                    <a
                      href={socialLinks.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Facebook className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.tiktok && (
                    <a
                      href={socialLinks.tiktok}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Video className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a
                      href={socialLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-blue-700 flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.x && (
                    <a
                      href={socialLinks.x}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-black border border-white/20 flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {socialLinks.youtube && (
                    <a
                      href={socialLinks.youtube}
                      target="_blank"
                      rel="noreferrer"
                      className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Feedback Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl p-6 sm:p-7 bg-gray-50 dark:bg-[#111820] border border-black/10 dark:border-[#2A3441]">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#FFFFFF] mb-4">
                  Feedback Form
                </h3>

                {submitSuccess ? (
                  <div className="p-6 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-center">
                    <CheckCircle2 className="w-10 h-10 text-[#F6C453] mx-auto mb-2" />
                    <h4 className="font-bold text-sm text-[#111111] dark:text-[#FFFFFF]">
                      Thank you for your feedback!
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-[#9CA3AF] mt-1">
                      Your review has been successfully submitted and recorded.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSubmitSuccess(false)}
                      className="mt-3 text-xs font-bold text-[#F6C453] hover:underline"
                    >
                      Submit another review
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    {/* Rating Stars */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-[#9CA3AF] mb-1.5">
                        Rating
                      </label>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none cursor-pointer transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-5 h-5 ${
                                (hoverRating || rating) >= star
                                  ? 'text-[#F6C453] fill-[#F6C453]'
                                  : 'text-gray-300 dark:text-gray-700'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Your Feedback Textarea */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-[#9CA3AF] mb-1.5">
                        Your Feedback
                      </label>
                      <textarea
                        rows={3}
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        placeholder="Share your experience..."
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#050505] border border-black/10 dark:border-[#2A3441] focus:border-[#D4AF37] text-sm text-[#111111] dark:text-[#FFFFFF] outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none"
                      />
                    </div>

                    {/* Add Photos */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-[#9CA3AF] mb-1.5">
                        Add Photos (multiple)
                      </label>
                      <input
                        type="file"
                        multiple
                        className="w-full text-xs text-gray-500 dark:text-gray-400 file:mr-3 file:py-1.5 file:px-3.5 file:rounded-lg file:border file:border-black/10 dark:file:border-[#2A3441] file:text-xs file:font-semibold file:bg-gray-100 dark:file:bg-[#161D26] file:text-gray-700 dark:file:text-[#D1D5DB] hover:file:bg-gray-200 cursor-pointer"
                      />
                    </div>

                    {/* Work / Project Link */}
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 dark:text-[#9CA3AF] mb-1.5">
                        Work / Project Link (optional)
                      </label>
                      <input
                        type="url"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                        placeholder="https://example.com"
                        className="w-full px-3.5 py-2 rounded-xl bg-white dark:bg-[#050505] border border-black/10 dark:border-[#2A3441] focus:border-[#D4AF37] text-xs text-[#111111] dark:text-[#FFFFFF] outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600"
                      />
                    </div>

                    {error && (
                      <p className="text-xs text-red-400">{error}</p>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-[#050505] font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Feedback</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Testimonial Quote Cards Below */}
          {approvedTestimonials.length > 0 && (
            <div className="mt-12 pt-10 border-t border-black/5 dark:border-[#2A3441] grid grid-cols-1 md:grid-cols-2 gap-6">
              {approvedTestimonials.slice(0, 2).map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-2xl bg-gray-50 dark:bg-[#111820] border border-black/10 dark:border-[#2A3441] flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center gap-1 text-[#F6C453] mb-3">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 dark:text-[#D1D5DB] italic leading-relaxed mb-4">
                      "{item.review}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 flex items-center justify-center font-bold text-xs text-[#F6C453]">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-[#111111] dark:text-[#FFFFFF]">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-gray-500 dark:text-[#9CA3AF]">
                        {item.role ? `${item.role}, ` : ''}{item.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
