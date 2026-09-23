import React from 'react';

export interface TrailPoint {
  x: number;
  y: number;
  opacity: number;
  scale: number;
}

interface CursorTrailProps {
  points: TrailPoint[];
}

export const CursorTrail: React.FC<CursorTrailProps> = ({ points }) => {
  if (points.length < 2) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-49 overflow-hidden">
      {points.map((pt, index) => {
        const size = Math.max(4, 18 * pt.scale);
        return (
          <div
            key={index}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: 0,
              top: 0,
              width: `${size}px`,
              height: `${size}px`,
              transform: `translate3d(${pt.x - size / 2}px, ${pt.y - size / 2}px, 0)`,
              opacity: pt.opacity * 0.45,
              background: 'radial-gradient(circle, rgba(224, 184, 102, 0.45) 0%, rgba(199, 154, 69, 0.2) 60%, rgba(199, 154, 69, 0) 100%)',
              filter: 'blur(2px)'
            }}
          />
        );
      })}
    </div>
  );
};
