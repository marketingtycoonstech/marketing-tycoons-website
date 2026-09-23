import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Lock, ShieldCheck, AlertCircle, Sparkles } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    setIsLoginModalOpen,
    adminLogin,
    loginWithGoogle,
    setCurrentView
  } = useApp();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      const success = adminLogin(username, password);
      setIsLoading(false);

      if (success) {
        setIsLoginModalOpen(false);
        setCurrentView('admin');
        setPassword('');
        setUsername('');
      } else {
        setError('Access denied. Invalid administrator credentials or unauthorized account.');
      }
    }, 400);
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    setError('');
    try {
      const success = await loginWithGoogle();
      if (success) {
        setIsLoginModalOpen(false);
        setCurrentView('admin');
      } else {
        setError('Google sign-in completed, but this Google Account is not registered as an authorized Marketing Tycoons administrator.');
      }
    } catch (err: any) {
      setError(err?.message || 'Google authorization could not be completed.');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md rounded-3xl dark:bg-[#121319] bg-white border dark:border-[#d4af37]/40 border-gray-200 shadow-2xl p-6 sm:p-8 text-left"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 border dark:border-gray-800 border-gray-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3.5 mb-6">
          <div className="relative w-12 h-12 rounded-2xl bg-black border border-[#d4af37]/60 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.35)]">
            <img src="/logo.png" alt="Marketing Tycoons" className="w-full h-full object-cover" />
            <div className="absolute -bottom-1 -right-1 p-1 bg-[#d4af37] rounded-full text-black">
              <Lock className="w-3 h-3 stroke-[2.5]" />
            </div>
          </div>
          <div>
            <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold block">
              Restricted Area
            </span>
            <h3 className="font-display text-xl font-bold dark:text-white text-gray-950">
              Admin Portal Authorization
            </h3>
          </div>
        </div>

        {/* 1. Google Legal Auth One-Click Sign In */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="w-full py-3 px-4 rounded-2xl bg-white hover:bg-gray-100 text-gray-900 font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-3 border border-gray-200 cursor-pointer disabled:opacity-70"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z" />
              <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5.1 3.7-8.9z" />
              <path fill="#FBBC05" d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z" />
              <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z" />
            </svg>
            <span>{isGoogleLoading ? 'Authenticating with Google...' : 'Sign In with Authorized Google Account'}</span>
          </button>

          <div className="relative flex items-center justify-center my-3">
            <div className="border-t dark:border-gray-800 border-gray-200 w-full" />
            <span className="bg-white dark:bg-[#121319] px-3 text-[10px] uppercase font-bold tracking-wider text-gray-500 relative">
              Or Master Key Access
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-300 text-gray-700 mb-1.5">
                Admin Identifier
              </label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl dark:bg-[#090a0d] bg-gray-50 border dark:border-gray-700 border-gray-300 focus:border-[#d4af37] dark:text-white text-gray-900 text-xs outline-none"
                placeholder="Administrator ID"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider dark:text-gray-300 text-gray-700 mb-1.5">
                Master Security Key
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl dark:bg-[#090a0d] bg-gray-50 border dark:border-gray-700 border-gray-300 focus:border-[#d4af37] dark:text-white text-gray-900 text-xs outline-none"
                placeholder="••••••••••••"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 rounded-xl dark:bg-red-950/60 bg-red-50 border dark:border-red-800 border-red-200 dark:text-red-300 text-red-700 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsLoginModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border dark:border-gray-700 border-gray-300 dark:text-gray-300 text-gray-700 hover:bg-gray-100 dark:hover:bg-white/5 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all cursor-pointer flex items-center gap-2"
              >
                {isLoading ? 'Verifying Key...' : 'Authorize Access'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
