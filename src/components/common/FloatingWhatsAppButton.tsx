import React, { useState } from 'react';
import { MessageCircle, Sparkles, X, ArrowUpRight, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const FloatingWhatsAppButton: React.FC = () => {
  const { settings } = useApp();
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const rawNumber = settings.whatsappNumber || '+923426793428';
  const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
  const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(
    'Hello Marketing Tycoons! I would like to inquire about your services.'
  )}`;

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    navigator.clipboard.writeText(rawNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end group">
      {/* Interactive Expandable Tooltip / Preview Card */}
      <div
        className={`mb-3 p-4 rounded-2xl bg-[#0E141C]/95 dark:bg-[#080C10]/95 backdrop-blur-xl border border-[#D4AF37]/50 shadow-[0_15px_40px_rgba(0,0,0,0.6),0_0_25px_rgba(212,175,55,0.25)] text-left w-72 transition-all duration-300 origin-bottom-right ${
          isTooltipOpen
            ? 'opacity-100 scale-100 pointer-events-auto translate-y-0'
            : 'opacity-0 scale-90 pointer-events-none translate-y-3'
        }`}
      >
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#F6C453]">
              Official Agency Desk
            </span>
          </div>
          <button
            onClick={() => setIsTooltipOpen(false)}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close tooltip"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-xs text-gray-300 mb-3 leading-relaxed">
          Chat directly with the directors of Marketing Tycoons for quick project estimates and consultations.
        </p>

        <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-black/50 border border-white/10 mb-3">
          <span className="font-mono text-xs font-bold text-[#D4AF37]">
            {rawNumber}
          </span>
          <button
            onClick={handleCopy}
            className="px-2 py-1 rounded-md bg-[#D4AF37]/20 hover:bg-[#D4AF37]/30 text-[#F6C453] text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer inline-flex items-center gap-1"
          >
            {copied ? <Check className="w-3 h-3" /> : null}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#D4AF37] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] hover:scale-[1.02] transition-all cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-black" />
          <span>Open WhatsApp Chat</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Primary Floating WhatsApp Gold & Emerald Bubble */}
      <div className="relative flex items-center gap-2">
        {/* Hover Pill Label on Desktop */}
        <div
          onClick={() => setIsTooltipOpen(!isTooltipOpen)}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/90 dark:bg-[#0E141C]/90 backdrop-blur-md border border-[#D4AF37]/40 text-xs font-bold text-[#F6C453] shadow-lg cursor-pointer hover:border-[#D4AF37] hover:scale-105 transition-all select-none"
        >
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>WhatsApp: {rawNumber}</span>
        </div>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsTooltipOpen(true)}
          aria-label={`Chat on WhatsApp with Marketing Tycoons at ${rawNumber}`}
          className="relative w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F6C453] to-[#C99A45] p-0.5 shadow-[0_0_25px_rgba(212,175,55,0.5),0_10px_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(212,175,55,0.8),0_15px_30px_rgba(0,0,0,0.7)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center cursor-pointer group"
        >
          {/* Ambient Glow Pulse Ring */}
          <span className="absolute inset-0 rounded-full bg-[#D4AF37] opacity-40 animate-ping pointer-events-none" />

          {/* Inner Button Face */}
          <div className="w-full h-full rounded-full bg-[#0E141C] flex items-center justify-center group-hover:bg-[#0A0E14] transition-colors relative overflow-hidden">
            {/* Subtle Gold Shimmer across bubble */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <MessageCircle className="w-7 h-7 text-[#F6C453] group-hover:text-[#D4AF37] transition-transform duration-300 group-hover:scale-110" />
          </div>

          {/* Active Online Green Dot */}
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black flex items-center justify-center shadow-md">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
          </span>
        </a>
      </div>
    </div>
  );
};
