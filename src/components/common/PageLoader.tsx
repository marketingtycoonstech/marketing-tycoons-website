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
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#060709] transition-opacity duration-1000 ease-in-out select-none ${
        isDone ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Brand Monogram - Minimal Pulse */}
      <div className="relative">
        <div className="w-20 h-20 flex items-center justify-center animate-pulse">
           <img
            src="/logo.png"
            alt="Marketing Tycoons"
            className="w-16 h-16 object-contain"
          />
        </div>
      </div>
      
      {/* Subtle Brand Text */}
      <h2 className="font-display text-sm font-light tracking-[0.4em] text-gray-500 uppercase mt-6 animate-pulse">
        Marketing Tycoons
      </h2>
    </div>
  );
};
