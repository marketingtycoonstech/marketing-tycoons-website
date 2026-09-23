import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DynamicIcon } from '../common/DynamicIcon';
import { setServiceMeta, resetDefaultMeta } from '../../utils/seo';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Share2,
  Check,
  Twitter,
  Linkedin,
  Facebook,
  MessageCircle,
  Copy
} from 'lucide-react';

export const ServiceDetailModal: React.FC = () => {
  const { activeServiceModal, setActiveServiceModal } = useApp();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (activeServiceModal) {
      setServiceMeta(activeServiceModal);
    } else {
      resetDefaultMeta();
    }
    return () => {
      resetDefaultMeta();
    };
  }, [activeServiceModal]);

  if (!activeServiceModal) return null;

  const currentUrl = `https://marketingtycoons.tech/#services?service=${activeServiceModal.id}`;
  const shareText = `Discover ${activeServiceModal.title} solutions engineered by Marketing Tycoons!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}&via=MktgTycoons`,
      '_blank'
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank'
    );
  };

  const shareToWhatsApp = () => {
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`,
      '_blank'
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 dark:bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setActiveServiceModal(null)}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#F8F7F3] dark:bg-[#0B0D0F] border border-black/10 dark:border-white/10 shadow-2xl p-6 sm:p-8 text-left text-[#111111] dark:text-[#F5F2EA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setActiveServiceModal(null)}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-[#B88932] hover:text-white dark:hover:bg-[#C79A45] dark:hover:text-black border border-black/10 dark:border-white/10 text-gray-700 dark:text-gray-300 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6 pr-10">
          <div className="w-14 h-14 rounded-2xl bg-[#B88932]/10 dark:bg-[#C79A45]/20 border border-[#B88932]/30 dark:border-[#C79A45]/40 flex items-center justify-center text-[#B88932] dark:text-[#E0B866]">
            <DynamicIcon name={activeServiceModal.iconName} className="w-7 h-7" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest text-[#B88932] dark:text-[#E0B866] font-bold">
              Specialized Service
            </span>
            <h3 className="font-display text-2xl font-extrabold text-[#111111] dark:text-white">
              {activeServiceModal.title}
            </h3>
          </div>
        </div>

        {/* Full Description */}
        <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed mb-6 font-normal">
          {activeServiceModal.fullDescription || activeServiceModal.shortDescription}
        </p>

        {/* Social Share Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#FFFFFF] dark:bg-[#111417] border border-black/10 dark:border-white/10 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-300">
            <Share2 className="w-3.5 h-3.5 text-[#B88932] dark:text-[#C79A45]" />
            <span>Share Service:</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={shareToTwitter}
              title="Share on X"
              className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-[#B88932] hover:text-white dark:hover:bg-[#C79A45] dark:hover:text-black transition-colors"
            >
              <Twitter className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={shareToLinkedIn}
              title="Share on LinkedIn"
              className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-[#B88932] hover:text-white dark:hover:bg-[#C79A45] dark:hover:text-black transition-colors"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={shareToFacebook}
              title="Share on Facebook"
              className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-[#B88932] hover:text-white dark:hover:bg-[#C79A45] dark:hover:text-black transition-colors"
            >
              <Facebook className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={shareToWhatsApp}
              title="Share on WhatsApp"
              className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-[#B88932] hover:text-white dark:hover:bg-[#C79A45] dark:hover:text-black transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleCopyLink}
              title="Copy Link"
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-[#B88932] hover:text-white dark:hover:bg-[#C79A45] dark:hover:text-black transition-colors text-xs font-semibold"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Key Features */}
        {activeServiceModal.features && activeServiceModal.features.length > 0 && (
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
              Core Scope & Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activeServiceModal.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFFFFF] dark:bg-[#111417] border border-black/10 dark:border-white/10"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#B88932] dark:text-[#E0B866] shrink-0 mt-0.5" />
                  <span className="text-xs text-gray-800 dark:text-gray-200 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables */}
        {activeServiceModal.deliverables && activeServiceModal.deliverables.length > 0 && (
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-3">
              Expected Deliverables
            </h4>
            <div className="space-y-2">
              {activeServiceModal.deliverables.map((del, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B88932] dark:bg-[#C79A45]" />
                  <span>{del}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-gray-500 dark:text-gray-400">Estimated Investment</span>
            <div className="text-lg font-display font-extrabold text-[#111111] dark:text-white">
              {activeServiceModal.startingPrice ? `Starting at ${activeServiceModal.startingPrice}` : 'Custom Scope'}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setActiveServiceModal(null)}
              className="w-1/2 sm:w-auto px-5 py-3 rounded-xl border border-black/20 dark:border-white/20 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white text-xs font-semibold cursor-pointer"
            >
              Close
            </button>
            <a
              href="#contact"
              onClick={() => setActiveServiceModal(null)}
              className="w-1/2 sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#B88932] via-[#C79A45] to-[#8A641F] dark:from-[#C79A45] dark:via-[#E0B866] dark:to-[#8A641F] text-white dark:text-black font-extrabold text-xs tracking-wider uppercase hover:shadow-lg transition-all"
            >
              <span>Book Service</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
