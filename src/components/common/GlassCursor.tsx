import React from 'react';

export type CursorVariant = 'default' | 'button' | 'portfolio' | 'video' | 'service' | 'drag';

interface GlassCursorProps {
  x: number;
  y: number;
  variant: CursorVariant;
  customLabel?: string;
  isClicking?: boolean;
}

export const GlassCursor: React.FC<GlassCursorProps> = ({
  x,
  y,
  variant,
  customLabel,
  isClicking = false
}) => {
  // Dimensions and styling based on variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'portfolio':
        return {
          size: 'w-[72px] h-[72px] -ml-[36px] -mt-[36px]',
          rounded: 'rounded-full',
          label: customLabel || 'VIEW',
          subtleMonogram: false
        };
      case 'video':
        return {
          size: 'w-[76px] h-[76px] -ml-[38px] -mt-[38px]',
          rounded: 'rounded-full',
          label: customLabel || '▶ PLAY',
          subtleMonogram: false
        };
      case 'service':
        return {
          size: 'w-[84px] h-[46px] -ml-[42px] -mt-[23px]',
          rounded: 'rounded-full',
          label: customLabel || 'EXPLORE →',
          subtleMonogram: false
        };
      case 'drag':
        return {
          size: 'w-[88px] h-[42px] -ml-[44px] -mt-[21px]',
          rounded: 'rounded-full',
          label: customLabel || 'DRAG ↔',
          subtleMonogram: false
        };
      case 'button':
        return {
          size: 'w-[48px] h-[48px] -ml-[24px] -mt-[24px]',
          rounded: 'rounded-full',
          label: '→',
          subtleMonogram: false
        };
      case 'default':
      default:
        return {
          size: 'w-[38px] h-[38px] -ml-[19px] -mt-[19px]',
          rounded: 'rounded-full',
          label: null,
          subtleMonogram: true
        };
    }
  };

  const { size, rounded, label, subtleMonogram } = getVariantStyles();

  return (
    <div
      className={`fixed top-0 left-0 pointer-events-none z-50 transition-[width,height,margin,border-radius,transform] duration-200 ease-out flex items-center justify-center select-none will-change-transform ${size} ${rounded}`}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0) scale(${isClicking ? 0.92 : 1})`,
        // Transparent luxury glass with subtle champagne gold rim
        background:
          'radial-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(212, 175, 55, 0.05) 50%, rgba(0, 0, 0, 0.15) 100%)',
        backdropFilter: 'blur(2.5px)',
        WebkitBackdropFilter: 'blur(2.5px)',
        border: '1px solid rgba(224, 184, 102, 0.45)',
        boxShadow:
          '0 0 16px rgba(199, 154, 69, 0.18), inset 0 1px 2px rgba(255, 255, 255, 0.25), inset 0 -1px 2px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Subtle glass refraction specular arc */}
      <div
        className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-40"
        style={{
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 60%)'
        }}
      />

      {/* Very faint MT monogram inside glass in default state */}
      {subtleMonogram && (
        <span
          className="text-[9px] font-extrabold tracking-widest text-[#E0B866]/40 uppercase pointer-events-none transition-opacity duration-200"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          MT
        </span>
      )}

      {/* Interactive State Label */}
      {label && (
        <span
          className="relative z-10 text-[10px] font-bold tracking-wider text-white dark:text-[#F5F2EA] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] uppercase whitespace-nowrap px-2 text-center"
          style={{ fontFamily: 'Manrope, sans-serif' }}
        >
          {label}
        </span>
      )}
    </div>
  );
};
