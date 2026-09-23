import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-in' | 'scale' | 'slide-right' | 'slide-left';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.7,
  className = '',
  threshold = 0.15
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If reduced motion is requested, show immediately without transition
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once
        }
      },
      { threshold }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getAnimationStyles = () => {
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          return 'opacity-0 translate-y-8';
        case 'fade-in':
          return 'opacity-0';
        case 'scale':
          return 'opacity-0 scale-95';
        case 'slide-right':
          return 'opacity-0 -translate-x-8';
        case 'slide-left':
          return 'opacity-0 translate-x-8';
        default:
          return 'opacity-0 translate-y-8';
      }
    }
    return 'opacity-100 translate-y-0 translate-x-0 scale-100';
  };

  return (
    <div
      ref={elementRef}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`
      }}
      className={`transition-all ease-out will-change-[transform,opacity] ${getAnimationStyles()} ${className}`}
    >
      {children}
    </div>
  );
};
