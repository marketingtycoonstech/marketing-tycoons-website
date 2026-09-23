import React, { useEffect, useState } from 'react';

export const PageLoader: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if session has already completed the initial loader to keep dev navigation frictionless
    const hasLoadedBefore = sessionStorage.getItem('mt_initial_loader_shown');
    if (hasLoadedBefore) {
      setShouldRender(false);
      return;
    }

    const duration = 1000; // 1 second total target duration
    const intervalTime = 20;
    const increment = 100 / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress(prev => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem('mt_initial_loader_shown', 'true');
            setTimeout(() => setShouldRender(false), 500);
          }, 150);
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060709] text-white transition-opacity duration-500 ease-out select-none ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background ambient gold gradient glow */}
      <div className="absolute w-96 h-96 rounded-full bg-[#d4af37]/10 blur-[120px] pointer-events-none" />

      {/* Brand Monogram Crest */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-black via-[#14151a] to-black border border-[#d4af37]/60 flex items-center justify-center shadow-[0_0_30px_rgba(212,175,55,0.35)] overflow-hidden">
          <img
            src="/logo.png"
            alt="Marketing Tycoons"
            className="w-12 h-12 object-cover rounded-xl"
            onError={e => {
              // Fallback text monogram if image is delayed
              e.currentTarget.style.display = 'none';
              const fallback = e.currentTarget.parentElement?.querySelector('.loader-fallback');
              if (fallback) (fallback as HTMLElement).style.display = 'block';
            }}
          />
          <span className="loader-fallback hidden font-serif font-black text-xl tracking-wider text-[#d4af37]">
            MT
          </span>
        </div>
        <div className="absolute -inset-1 rounded-2xl border border-[#d4af37]/30 blur-xs animate-pulse pointer-events-none" />
      </div>

      {/* Brand Typography */}
      <h2 className="font-display text-lg sm:text-xl font-bold tracking-[0.25em] text-white uppercase mb-1">
        Marketing Tycoons
      </h2>
      <p className="text-[10px] tracking-[0.35em] text-[#d4af37] uppercase font-semibold mb-6">
        Premier Digital & Tech Agency
      </p>

      {/* Thin Gold Loading Track */}
      <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-[#b38f28] via-[#e5c158] to-[#ffd700] transition-all duration-75 ease-out shadow-[0_0_8px_#d4af37]"
          style={{ width: `${Math.round(progress)}%` }}
        />
      </div>

      {/* Numerical percentage indicator */}
      <span className="text-[10px] tracking-widest text-gray-500 font-mono mt-3">
        {Math.round(progress)}%
      </span>
    </div>
  );
};
