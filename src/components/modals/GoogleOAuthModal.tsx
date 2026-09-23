import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { signInWithGoogle } from '../../lib/firebase';

export const GoogleOAuthModal: React.FC = () => {
  const {
    isGoogleOAuthModalOpen,
    setIsGoogleOAuthModalOpen,
    currentUser,
    setIsReviewModalOpen
  } = useApp();

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  if (!isGoogleOAuthModalOpen) return null;

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setAuthError('');
    try {
      await signInWithGoogle();
      // Open review modal after authenticating
      setIsGoogleOAuthModalOpen(false);
      setIsReviewModalOpen(true);
    } catch (err: any) {
      setAuthError(err?.message || 'Google authorization could not be completed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg rounded-3xl dark:bg-[#121319] bg-white border dark:border-[#d4af37]/40 border-gray-200 shadow-2xl p-6 sm:p-8 text-left"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setIsGoogleOAuthModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 border dark:border-gray-800 border-gray-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white border border-gray-200 flex items-center justify-center shadow-xs">
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z" />
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
            </svg>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#d4af37] font-semibold">
              Google Legal Authentication
            </span>
            <h3 className="font-display text-xl font-bold dark:text-white text-gray-950">
              Verified Client Identity
            </h3>
          </div>
        </div>

        <div className="space-y-4 text-xs dark:text-gray-300 text-gray-600 leading-relaxed mb-6">
          <p>
            Authenticate your account with official Google OAuth to post verified reviews, access exclusive client project tracking, and validate enterprise inquiries.
          </p>

          {currentUser ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img src={currentUser.photoURL} alt={currentUser.displayName || ''} className="w-10 h-10 rounded-full border border-[#d4af37]" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center font-bold text-sm">
                    {currentUser.displayName?.charAt(0) || 'U'}
                  </div>
                )}
                <div>
                  <div className="font-bold dark:text-white text-gray-900 flex items-center gap-1.5">
                    <span>{currentUser.displayName}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-[11px] text-gray-400">{currentUser.email}</div>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-black text-[10px] font-bold uppercase">
                Active
              </span>
            </div>
          ) : (
            <div className="p-4 rounded-2xl dark:bg-white/5 bg-gray-50 border dark:border-gray-800 border-gray-200 space-y-3">
              <div className="flex items-start gap-2.5 text-xs dark:text-gray-300 text-gray-700">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>
                  Connect with your corporate or personal Google Account for instant cryptographic verification on all agency interactions.
                </span>
              </div>

              <button
                type="button"
                onClick={handleGoogleAuth}
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-100 text-gray-900 font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 border border-gray-300 cursor-pointer disabled:opacity-70"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
                  <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z" />
                  <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
                  <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
                </svg>
                <span>{isLoading ? 'Authorizing with Google...' : 'Authenticate with Google'}</span>
              </button>
            </div>
          )}

          {authError && (
            <div className="flex items-start gap-2 p-3 rounded-xl dark:bg-red-950/60 bg-red-50 border dark:border-red-800 border-red-200 dark:text-red-300 text-red-700 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-4 border-t dark:border-gray-800 border-gray-200">
          <button
            onClick={() => setIsGoogleOAuthModalOpen(false)}
            className="px-4 py-2.5 rounded-xl border dark:border-gray-700 border-gray-300 dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-white/5 text-xs font-semibold cursor-pointer"
          >
            Close
          </button>

          {currentUser && (
            <button
              onClick={() => {
                setIsGoogleOAuthModalOpen(false);
                setIsReviewModalOpen(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs tracking-wider uppercase cursor-pointer"
            >
              Write Review
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
