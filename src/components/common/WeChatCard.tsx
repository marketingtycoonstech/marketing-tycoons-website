import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download, ExternalLink, Copy, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from './BrandLogo';

interface WeChatCardProps {
  onClose?: () => void;
}

export const WeChatCard: React.FC<WeChatCardProps> = ({ onClose }) => {
  const { settings } = useApp();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  // The official WeChat target URL / ID for scanning
  // WeChat scanning deep link format & standard URI
  const wechatTarget = settings.wechatId || 'MarketingTycoonsOfficial';
  const qrData = `https://u.wechat.com/m/${wechatTarget}?user=${encodeURIComponent(wechatTarget)}`;

  useEffect(() => {
    if (!canvasRef.current) return;

    // Generate high resolution QR code on canvas
    const canvas = canvasRef.current;
    QRCode.toCanvas(
      canvas,
      qrData,
      {
        width: 320,
        margin: 2,
        errorCorrectionLevel: 'H', // Highest error correction (30%) so center logo scans 100%
        color: {
          dark: '#000000',
          light: '#FFFFFF'
        }
      },
      error => {
        if (error) {
          console.error('QR code generation error:', error);
          return;
        }

        // Draw the WeChat center badge over the QR code
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const centerSize = 56;
          const x = (canvas.width - centerSize) / 2;
          const y = (canvas.height - centerSize) / 2;
          const radius = 12;

          // Draw rounded black center rectangle
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(x + radius, y);
          ctx.lineTo(x + centerSize - radius, y);
          ctx.quadraticCurveTo(x + centerSize, y, x + centerSize, y + radius);
          ctx.lineTo(x + centerSize, y + centerSize - radius);
          ctx.quadraticCurveTo(x + centerSize, y + centerSize, x + centerSize - radius, y + centerSize);
          ctx.lineTo(x + radius, y + centerSize);
          ctx.quadraticCurveTo(x, y + centerSize, x, y + centerSize - radius);
          ctx.lineTo(x, y + radius);
          ctx.quadraticCurveTo(x, y, x + radius, y);
          ctx.closePath();
          ctx.fillStyle = '#111111';
          ctx.fill();

          // Draw dual WeChat speech bubble icons
          // Big bubble
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.ellipse(x + 23, y + 25, 12, 10, 0, 0, Math.PI * 2);
          ctx.fill();

          // Big bubble pointer
          ctx.beginPath();
          ctx.moveTo(x + 15, y + 30);
          ctx.lineTo(x + 12, y + 37);
          ctx.lineTo(x + 20, y + 33);
          ctx.fill();

          // Small bubble
          ctx.beginPath();
          ctx.ellipse(x + 36, y + 33, 9, 8, 0, 0, Math.PI * 2);
          ctx.fill();

          // Small bubble pointer
          ctx.beginPath();
          ctx.moveTo(x + 40, y + 38);
          ctx.lineTo(x + 43, y + 43);
          ctx.lineTo(x + 36, y + 40);
          ctx.fill();

          // Eyes
          ctx.fillStyle = '#111111';
          ctx.beginPath();
          ctx.arc(x + 19, y + 24, 1.8, 0, Math.PI * 2);
          ctx.arc(x + 27, y + 24, 1.8, 0, Math.PI * 2);
          ctx.arc(x + 33, y + 32, 1.4, 0, Math.PI * 2);
          ctx.arc(x + 39, y + 32, 1.4, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
        }
        setQrGenerated(true);
      }
    );
  }, [qrData, wechatTarget]);

  const handleCopyId = () => {
    navigator.clipboard.writeText(wechatTarget);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement('a');
    link.download = `MarketingTycoons_WeChat_${wechatTarget}.png`;
    link.href = canvasRef.current.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Visual WeChat Card Exactly Matching Screenshot */}
      <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-2xl border border-gray-200 text-left relative overflow-hidden">
        {/* Top Header with MT Logo & Brand Name */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="w-12 h-12 rounded-xl bg-black border border-gray-800 flex items-center justify-center p-1.5 shadow-md shrink-0">
            <BrandLogo size="sm" showText={false} />
          </div>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-gray-900 leading-tight font-sans tracking-tight">
              Marketing Tycoons
            </h4>
            <p className="text-xs text-gray-500 font-medium">Pakistan</p>
          </div>
        </div>

        {/* Center QR Matrix Area */}
        <div className="relative aspect-square w-full rounded-xl bg-white flex items-center justify-center p-2 mb-4">
          <canvas
            ref={canvasRef}
            className="w-full h-full max-w-[260px] max-h-[260px] object-contain mx-auto"
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>

        {/* Bottom Tagline */}
        <p className="text-center text-xs text-gray-500 font-sans tracking-wide">
          Scan to add me as a friend.
        </p>
      </div>

      {/* Action Controls */}
      <div className="mt-4 space-y-2.5">
        {/* WeChat ID copy bar */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-gray-100 dark:bg-[#1A1D24] border border-gray-200 dark:border-gray-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-gray-500 dark:text-gray-400 font-medium">WeChat ID:</span>
            <span className="font-mono font-bold text-gray-900 dark:text-[#D4AF37]">{wechatTarget}</span>
          </div>
          <button
            onClick={handleCopyId}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#C29B27] text-black font-bold text-xs transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy ID'}</span>
          </button>
        </div>

        {/* Download & Direct App Opening Options */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-xs font-semibold text-gray-800 dark:text-gray-200 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Save HD QR</span>
          </button>

          <a
            href={`weixin://dl/chat?${wechatTarget}`}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-semibold text-emerald-600 dark:text-emerald-400 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open WeChat</span>
          </a>
        </div>
      </div>
    </div>
  );
};
