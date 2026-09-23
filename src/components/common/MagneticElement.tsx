import React, { useRef, useState } from 'react';

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number; // max movement in px (default: 6)
  className?: string;
  cursorVariant?: 'button' | 'portfolio' | 'video' | 'service' | 'drag' | 'default';
  onClick?: (e: React.MouseEvent) => void;
  id?: string;
}

export const MagneticElement: React.FC<MagneticElementProps> = ({
  children,
  strength = 6,
  className = '',
  cursorVariant = 'button',
  onClick,
  id
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Check for reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!elementRef.current) return;

    const rect = elementRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    // Scale movement based on distance from center, capped by strength
    const moveX = (distanceX / (rect.width / 2)) * strength;
    const moveY = (distanceY / (rect.height / 2)) * strength;

    setPosition({ x: moveX, y: moveY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={elementRef}
      id={id}
      data-cursor={cursorVariant}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`
      }}
    >
      {children}
    </div>
  );
};
