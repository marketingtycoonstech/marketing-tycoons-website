import React, { useEffect, useRef, useState } from 'react';
import { GlassCursor, CursorVariant } from './GlassCursor';
import { CursorTrail, TrailPoint } from './CursorTrail';
import { CursorRipple, Ripple } from './CursorRipple';

export interface CustomCursorProps {
  variant?: CursorVariant;
  label?: string;
}

export const CustomCursor: React.FC<CustomCursorProps> = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<CursorVariant>('default');
  const [customLabel, setCustomLabel] = useState<string | undefined>(undefined);
  const [isClicking, setIsClicking] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [trailPoints, setTrailPoints] = useState<TrailPoint[]>([]);

  // Coordinates with lerp physics
  const mousePos = useRef({ x: -100, y: -100 });
  const cursorPos = useRef({ x: -100, y: -100 });
  const [renderPos, setRenderPos] = useState({ x: -100, y: -100 });
  const historyRef = useRef<{ x: number; y: number; time: number }[]>([]);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check fine pointer media query and reduced motion
    const pointerQuery = window.matchMedia('(pointer: fine) and (min-width: 1024px)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (!pointerQuery.matches || motionQuery.matches) {
      setIsEnabled(false);
      return;
    }
    setIsEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Detect cursor variant from hovered element tree
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      const cursorAttr = cursorTarget?.getAttribute('data-cursor') as CursorVariant | null;
      const labelAttr = cursorTarget?.getAttribute('data-cursor-label');

      if (cursorAttr) {
        setVariant(cursorAttr);
        setCustomLabel(labelAttr || undefined);
      } else if (target.closest('button, a, input, select, textarea, [role="button"], .interactive-cta')) {
        setVariant('button');
        setCustomLabel(undefined);
      } else {
        setVariant('default');
        setCustomLabel(undefined);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY
      };
      setRipples((prev) => [...prev.slice(-4), newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 60FPS Lerp + Trail Animation Loop
    let lastTime = performance.now();
    const animate = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // Smooth Lerp with gentle inertia (speed factor 0.18)
      const lerpFactor = 0.22;
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * lerpFactor;
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * lerpFactor;

      setRenderPos({ x: cursorPos.current.x, y: cursorPos.current.y });

      // Track trail history
      const now = performance.now();
      historyRef.current.push({
        x: cursorPos.current.x,
        y: cursorPos.current.y,
        time: now
      });

      // Keep recent 250ms history
      historyRef.current = historyRef.current.filter((item) => now - item.time < 350);

      // Calculate speed and generate trail points
      const history = historyRef.current;
      if (history.length >= 3) {
        const points: TrailPoint[] = [];
        const step = Math.max(1, Math.floor(history.length / 6));
        for (let i = 0; i < history.length; i += step) {
          const pt = history[i];
          const ageRatio = (now - pt.time) / 350; // 0 (new) to 1 (old)
          points.push({
            x: pt.x,
            y: pt.y,
            opacity: 1 - ageRatio,
            scale: Math.max(0.3, 1 - ageRatio * 0.7)
          });
        }
        setTrailPoints(points);
      } else {
        setTrailPoints([]);
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isVisible]);

  if (!isEnabled || !isVisible) return null;

  return (
    <>
      {/* Light Gold Trail */}
      <CursorTrail points={trailPoints} />

      {/* Click Ripple Wave */}
      <CursorRipple ripples={ripples} />

      {/* Main Luxury Glass Cursor */}
      <GlassCursor
        x={renderPos.x}
        y={renderPos.y}
        variant={variant}
        customLabel={customLabel}
        isClicking={isClicking}
      />
    </>
  );
};
