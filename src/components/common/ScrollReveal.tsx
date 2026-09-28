import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

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
  duration = 0.75,
  className = '',
  threshold = 0.15
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const getVariants = () => {
    switch (animation) {
      case 'fade-up':
        return {
          hidden: { opacity: 0, y: 36 },
          visible: { opacity: 1, y: 0 }
        };
      case 'fade-in':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.94, y: 20 },
          visible: { opacity: 1, scale: 1, y: 0 }
        };
      case 'slide-right':
        return {
          hidden: { opacity: 0, x: -36 },
          visible: { opacity: 1, x: 0 }
        };
      case 'slide-left':
        return {
          hidden: { opacity: 0, x: 36 },
          visible: { opacity: 1, x: 0 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 36 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  return (
    <motion.div
      variants={getVariants()}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Cinematic luxury deceleration curve
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

