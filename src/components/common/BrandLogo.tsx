import React, { useState } from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  title?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showText = true,
  className = '',
  title,
  onClick
}) => {
  const [imageError, setImageError] = useState(false);

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20'
  };

  return (
    <div
      onClick={onClick}
      title={title}
      className={`inline-flex items-center gap-3 cursor-pointer select-none group ${className}`}
    >
      {/* Official 3D Metallic Lion & Monogram Emblem */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl overflow-hidden bg-black border border-[#DFAB40]/60 shadow-[0_0_15px_-2px_rgba(223,171,64,0.4)] group-hover:border-[#DFAB40] group-hover:shadow-[0_0_24px_rgba(223,171,64,0.6)] transition-all duration-300 shrink-0`}
      >
        {!imageError ? (
          <img
            src="/logo.png"
            alt="Marketing Tycoons"
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-black">
            <span className="font-display font-extrabold text-[#DFAB40] tracking-tighter text-sm">
              MT
            </span>
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col text-left">
          <span className="font-display font-black text-sm sm:text-base tracking-[0.12em] text-[#111111] dark:text-[#FFFFFF] group-hover:text-[#DFAB40] transition-colors leading-tight">
            MARKETING <span className="text-[#DFAB40]">TYCOONS</span>
          </span>
          <span className="text-[9px] uppercase tracking-[0.28em] text-gray-500 dark:text-[#A0A0A0] font-medium mt-0.5">
            Digital Agency
          </span>
        </div>
      )}
    </div>
  );
};
