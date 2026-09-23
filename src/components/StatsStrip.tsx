import React, { useEffect, useRef, useState } from 'react';
import { useApp } from '../context/AppContext';

interface AnimatedCounterProps {
  valueString: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ valueString }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);

  const match = valueString.match(/^(\d+)(.*)$/);
  const targetNumber = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : valueString;

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplayValue(targetNumber);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          observer.disconnect();

          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * targetNumber);
            setDisplayValue(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayValue(targetNumber);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.25 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, targetNumber]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {hasAnimated ? displayValue : 0}
      {suffix}
    </span>
  );
};

export const StatsStrip: React.FC = () => {
  const { stats } = useApp();

  return (
    <section
      id="stats-strip"
      className="relative z-20 py-10 border-y border-black/10 dark:border-[#2A3441] bg-[#FFFFFF] dark:bg-[#0B0F14] text-[#111111] dark:text-[#D1D5DB] transition-colors duration-300 shadow-sm dark:shadow-2xl"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-y-0 md:divide-x divide-black/10 dark:divide-[#2A3441]">
          {stats.map((stat, idx) => (
            <div
              key={stat.id || idx}
              className="flex flex-col items-center justify-center text-center px-4 py-2 group cursor-default"
            >
              <div className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold text-[#B88932] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-[#F6C453] dark:to-[#D4AF37] tracking-tight group-hover:scale-105 transition-transform duration-300">
                <AnimatedCounter valueString={stat.number} />
              </div>
              <span className="mt-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-600 dark:text-[#9CA3AF] group-hover:text-[#B88932] dark:group-hover:text-[#F6C453] transition-colors">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
