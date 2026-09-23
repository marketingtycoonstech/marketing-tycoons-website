import React from 'react';

export interface Ripple {
  id: number;
  x: number;
  y: number;
}

interface CursorRippleProps {
  ripples: Ripple[];
}

export const CursorRipple: React.FC<CursorRippleProps> = ({ ripples }) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full border border-[#d4af37]/60 animate-ping-ripple pointer-events-none"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            boxShadow: '0 0 16px rgba(212, 175, 55, 0.4), inset 0 0 8px rgba(212, 175, 55, 0.2)'
          }}
        />
      ))}
      <style>{`
        @keyframes pingRipple {
          0% {
            width: 8px;
            height: 8px;
            opacity: 0.85;
            border-width: 1.5px;
          }
          50% {
            opacity: 0.5;
            border-width: 1px;
          }
          100% {
            width: 90px;
            height: 90px;
            opacity: 0;
            border-width: 0.5px;
          }
        }
        .animate-ping-ripple {
          animation: pingRipple 0.55s cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
