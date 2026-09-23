import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mail,
  PhoneCall,
  Phone,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  QrCode,
  Video,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Pin,
  ShoppingBag,
  Flame,
  ArrowUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ProjectBudgetCalculator } from './portfolio/ProjectBudgetCalculator';
import { ProjectDiscoveryForm } from './portfolio/ProjectDiscoveryForm';

export const ContactSection: React.FC = () => {
  const { settings, services, socialLinks, submitContactMessage, setIsWeChatModalOpen } = useApp();

  const [activeFormTab, setActiveFormTab] = useState<'quick' | 'discovery'>('quick');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Website Development',
    message: '',
    honeypot: ''
  });

  const handleApplyBudget = (details: string) => {
    setFormData(prev => ({
      ...prev,
      message: prev.message 
        ? `${prev.message}\n\n[Budget Calculator Estimation]\n${details}`
        : `[Budget Calculator Estimation]\n${details}\n\nHello Marketing Tycoons, I've calculated my estimated range. Let's schedule a discovery call!`
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.honeypot) {
      console.warn('Bot submission blocked.');
      return;
    }

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setErrorMessage('Please provide a message with at least 10 characters.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    submitContactMessage({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: formData.service,
      message: formData.message.trim()
    }).then(ok => {
      setIsSubmitting(false);

      if (ok) {
        setSubmitSuccess(true);
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F0C96F', '#DFAB40', '#FFFFFF', '#C99A45']
          });
        } catch {
          // ignore if canvas blocked
        }

        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Website Development',
          message: '',
          honeypot: ''
        });
      } else {
        setErrorMessage('Failed to send message. Please check the fields and try again.');
      }
    }).catch(() => {
      setIsSubmitting(false);
      setErrorMessage('Failed to send message. Please try again later.');
    });
  };

  return (
    <section
      id="contact"
      className="relative py-24 md:py-32 bg-[#F8F7F3] dark:bg-[#010103] text-[#111111] dark:text-[#FFFFFF] transition-colors duration-500 overflow-hidden"
    >
      {/* Background Ambience */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#DFAB40]/5 dark:bg-[#DFAB40]/8 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/10 dark:border-[rgba(223,171,64,0.35)] bg-white dark:bg-[#0E0E12] text-xs font-semibold uppercase tracking-widest text-[#DFAB40] mb-4 shadow-xs dark:shadow-[0_0_15px_rgba(223,171,64,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Initiate Collaboration</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] dark:text-[#FFFFFF] uppercase dark:[text-shadow:0_0_28px_rgba(223,171,64,0.30)]">
            Contact Us
          </h2>

          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-[#A0A0A0] font-normal leading-relaxed">
            Have a project in mind or need strategic assistance? We would love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Direct Channels & Information */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-3.5 mb-3">
                <div className="w-11 h-11 rounded-xl bg-black border border-[#DFAB40] overflow-hidden flex items-center justify-center shrink-0 shadow-md">
                  <img src="/logo.png" alt="Marketing Tycoons" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-[#DFAB40] font-semibold block">
                    Marketing Tycoons Direct Desk
                  </span>
                  <h3 className="font-display text-2xl font-bold text-[#111111] dark:text-[#FFFFFF]">
                    Let's Build Something Exceptional
                  </h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-[#A0A0A0] leading-relaxed">
                Whether you require high-performing web engineering, branding overhaul, or targeted ROI marketing campaigns, our directors respond within 24 business hours.
              </p>
            </div>

            {/* Interactive Lead-Qualifying Budget Calculator Component */}
            <ProjectBudgetCalculator onApplyBudget={handleApplyBudget} />

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              
              {/* Primary Email */}
              <a
                href={`mailto:${settings.primaryEmail}`}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0E0E12] border border-black/10 dark:border-[rgba(223,171,64,0.22)] hover:border-[#DFAB40] transition-all group shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-[#DFAB40]/10 border border-[#DFAB40]/30 flex items-center justify-center text-[#DFAB40] group-hover:scale-110 transition-transform shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-[#A0A0A0] font-medium">Direct Inquiries</span>
                  <div className="text-sm sm:text-base font-bold text-[#111111] dark:text-[#FFFFFF] group-hover:text-[#DFAB40] transition-colors break-all">
                    {settings.primaryEmail}
                  </div>
                  <span className="text-[11px] text-gray-400 dark:text-[#A0A0A0]">24/7 Monitored inbox</span>
                </div>
              </a>

              {/* Direct Phone Call */}
              <a
                href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0E0E12] border border-black/10 dark:border-[rgba(223,171,64,0.22)] hover:border-[#DFAB40] transition-all group shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-[#DFAB40]/10 border border-[#DFAB40]/30 flex items-center justify-center text-[#DFAB40] group-hover:scale-110 transition-transform shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-[#A0A0A0] font-medium">Official Call Desk</span>
                  <div className="text-sm sm:text-base font-bold text-[#111111] dark:text-[#FFFFFF] group-hover:text-[#DFAB40] transition-colors">
                    {settings.phone}
                  </div>
                  <span className="text-[11px] text-gray-400 dark:text-[#A0A0A0]">Direct voice & consultation line</span>
                </div>
              </a>

              {/* WhatsApp Business */}
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0E0E12] border border-black/10 dark:border-[rgba(223,171,64,0.22)] hover:border-[#DFAB40] transition-all group shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-[#A0A0A0] font-medium">Official WhatsApp Desk</span>
                  <div className="text-sm sm:text-base font-bold text-[#111111] dark:text-[#FFFFFF] group-hover:text-[#DFAB40] transition-colors">
                    {settings.whatsappNumber}
                  </div>
                  <span className="text-[11px] text-gray-400 dark:text-[#A0A0A0]">Direct message & project concierge</span>
                </div>
              </a>

              {/* WeChat Account */}
              <div
                onClick={() => setIsWeChatModalOpen(true)}
                className="flex items-start gap-4 p-5 rounded-2xl bg-white dark:bg-[#0E0E12] border border-black/10 dark:border-[rgba(223,171,64,0.22)] hover:border-[#DFAB40] transition-all group cursor-pointer shadow-xs"
              >
                <div className="w-12 h-12 rounded-xl bg-[#DFAB40]/10 border border-[#DFAB40]/30 flex items-center justify-center text-[#DFAB40] group-hover:scale-110 transition-transform shrink-0">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-[#A0A0A0] font-medium">WeChat Official Account</span>
                    <span className="text-[10px] text-[#DFAB40] bg-[#DFAB40]/10 px-2.5 py-0.5 rounded-full font-semibold">Click for QR</span>
                  </div>
                  <div className="text-sm sm:text-base font-bold text-[#111111] dark:text-[#FFFFFF] group-hover:text-[#DFAB40] transition-colors">
                    ID: {settings.wechatId}
                  </div>
                  <span className="text-[11px] text-gray-400 dark:text-[#A0A0A0]">Instant scan & agency concierge</span>
                </div>
              </div>

              {/* Prominent Gold-Themed Contact Us on WhatsApp Banner Button */}
              <a
                href={`https://wa.me/${(settings.whatsappNumber || '+923426793428').replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hello Marketing Tycoons! I would like to initiate a new project with your agency.')}`}
                target="_blank"
                rel="noreferrer"
                className="relative flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#D4AF37] text-black font-extrabold shadow-[0_0_25px_rgba(212,175,55,0.35)] hover:shadow-[0_0_35px_rgba(212,175,55,0.65)] hover:scale-[1.02] active:scale-[0.99] transition-all duration-300 group overflow-hidden border border-[#D4AF37] cursor-pointer"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none" />
                <div className="flex items-center gap-3.5 relative z-10">
                  <div className="w-11 h-11 rounded-xl bg-black text-[#F6C453] flex items-center justify-center shadow-md shrink-0 group-hover:rotate-6 transition-transform">
                    <MessageSquare className="w-5 h-5 fill-[#F6C453]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-black/75 block">
                      Instant Direct Inquiry
                    </span>
                    <span className="text-sm sm:text-base font-black tracking-tight text-black block">
                      Contact Us on WhatsApp
                    </span>
                    <span className="block text-xs font-mono font-bold text-black/90">
                      {settings.whatsappNumber || '+923426793428'}
                    </span>
                  </div>
                </div>
                <div className="relative z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/10 flex items-center justify-center text-black group-hover:bg-black group-hover:text-[#F6C453] transition-colors shrink-0">
                  <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </a>

            </div>

            {/* Headquarters Card */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E0E12] border border-black/10 dark:border-[rgba(223,171,64,0.22)] shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-[#A0A0A0] mb-1">
                Global Operations
              </h4>
              <p className="text-sm text-gray-800 dark:text-[#FFFFFF]">
                {settings.address}
              </p>
            </div>

            {/* Official Social Media Channels */}
            <div className="p-5 rounded-2xl bg-white dark:bg-[#0E0E12] border border-black/10 dark:border-[rgba(223,171,64,0.22)] shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#DFAB40]">
                  Official Social Networks
                </h4>
                <span className="text-[10px] text-gray-400 dark:text-[#A0A0A0]">Verified Handles</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {socialLinks.tiktok && (
                  <a
                    href={socialLinks.tiktok}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#121216] hover:bg-[#DFAB40]/10 border border-black/10 dark:border-[rgba(223,171,64,0.20)] hover:border-[#DFAB40] text-gray-700 dark:text-[#D4D0C5] hover:text-[#DFAB40] transition-all group"
                  >
                    <Video className="w-3.5 h-3.5 text-[#DFAB40]" />
                    <span className="truncate font-medium">TikTok</span>
                    <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                {socialLinks.facebook && (
                  <a
                    href={socialLinks.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#121216] hover:bg-[#DFAB40]/10 border border-black/10 dark:border-[rgba(223,171,64,0.20)] hover:border-[#DFAB40] text-gray-700 dark:text-[#D4D0C5] hover:text-[#DFAB40] transition-all group"
                  >
                    <Facebook className="w-3.5 h-3.5 text-[#DFAB40]" />
                    <span className="truncate font-medium">Facebook</span>
                    <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                {socialLinks.linkedin && (
                  <a
                    href={socialLinks.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#121216] hover:bg-[#DFAB40]/10 border border-black/10 dark:border-[rgba(223,171,64,0.20)] hover:border-[#DFAB40] text-gray-700 dark:text-[#D4D0C5] hover:text-[#DFAB40] transition-all group"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#DFAB40]" />
                    <span className="truncate font-medium">LinkedIn</span>
                    <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                {socialLinks.x && (
                  <a
                    href={socialLinks.x}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#121216] hover:bg-[#DFAB40]/10 border border-black/10 dark:border-[rgba(223,171,64,0.20)] hover:border-[#DFAB40] text-gray-700 dark:text-[#D4D0C5] hover:text-[#DFAB40] transition-all group"
                  >
                    <Twitter className="w-3.5 h-3.5 text-[#DFAB40]" />
                    <span className="truncate font-medium">X / Twitter</span>
                    <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                {socialLinks.youtube && (
                  <a
                    href={socialLinks.youtube}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#121216] hover:bg-[#DFAB40]/10 border border-black/10 dark:border-[rgba(223,171,64,0.20)] hover:border-[#DFAB40] text-gray-700 dark:text-[#D4D0C5] hover:text-[#DFAB40] transition-all group"
                  >
                    <Youtube className="w-3.5 h-3.5 text-[#DFAB40]" />
                    <span className="truncate font-medium">YouTube</span>
                    <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                {socialLinks.pinterest && (
                  <a
                    href={socialLinks.pinterest}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#121216] hover:bg-[#DFAB40]/10 border border-black/10 dark:border-[rgba(223,171,64,0.20)] hover:border-[#DFAB40] text-gray-700 dark:text-[#D4D0C5] hover:text-[#DFAB40] transition-all group"
                  >
                    <Pin className="w-3.5 h-3.5 text-[#DFAB40]" />
                    <span className="truncate font-medium">Pinterest</span>
                    <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                {socialLinks.olx && (
                  <a
                    href={socialLinks.olx}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#121216] hover:bg-[#DFAB40]/10 border border-black/10 dark:border-[rgba(223,171,64,0.20)] hover:border-[#DFAB40] text-gray-700 dark:text-[#D4D0C5] hover:text-[#DFAB40] transition-all group"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#DFAB40]" />
                    <span className="truncate font-medium">OLX Store</span>
                    <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}

                {socialLinks.reddit && (
                  <a
                    href={socialLinks.reddit}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 p-2 rounded-xl bg-gray-50 dark:bg-[#121216] hover:bg-[#DFAB40]/10 border border-black/10 dark:border-[rgba(223,171,64,0.20)] hover:border-[#DFAB40] text-gray-700 dark:text-[#D4D0C5] hover:text-[#DFAB40] transition-all group"
                  >
                    <Flame className="w-3.5 h-3.5 text-[#DFAB40]" />
                    <span className="truncate font-medium">Reddit</span>
                    <ArrowUpRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Discovery Forms */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Form Selection Tabs */}
            <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/5 dark:border-white/5">
              <button
                type="button"
                onClick={() => setActiveFormTab('quick')}
                className={`flex-1 py-3 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer ${
                  activeFormTab === 'quick'
                    ? 'bg-white dark:bg-[#0E0E12] text-[#B88932] dark:text-[#F6C453] border border-black/5 dark:border-[rgba(223,171,64,0.22)] shadow-md'
                    : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'
                }`}
              >
                Quick Message
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('discovery')}
                className={`flex-1 py-3 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeFormTab === 'discovery'
                    ? 'bg-white dark:bg-[#0E0E12] text-[#B88932] dark:text-[#F6C453] border border-black/5 dark:border-[rgba(223,171,64,0.22)] shadow-md'
                    : 'text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Project Discovery Brief</span>
              </button>
            </div>

            {activeFormTab === 'discovery' ? (
              <ProjectDiscoveryForm />
            ) : (
              <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#0E0E12] border border-black/10 dark:border-[rgba(223,171,64,0.22)] shadow-2xl relative">
                
                <div className="absolute top-0 left-8 right-8 h-[1.5px] bg-gradient-to-r from-transparent via-[#DFAB40]/60 to-transparent" />

                <h3 className="font-display text-2xl font-bold text-[#111111] dark:text-[#FFFFFF] mb-2">
                  Send Us a Message
                </h3>
                <p className="text-xs text-gray-500 dark:text-[#A0A0A0] mb-8">
                  Fill in the details below and we will contact you with a bespoke project roadmap.
                </p>

                {submitSuccess ? (
                <div className="p-6 rounded-2xl bg-[#DFAB40]/10 border border-[#DFAB40]/40 text-center animate-in fade-in zoom-in-95">
                  <div className="relative w-14 h-14 rounded-2xl bg-black border border-[#DFAB40] overflow-hidden flex items-center justify-center mx-auto mb-3 shadow-md">
                    <img src="/logo.png" alt="Marketing Tycoons" className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 right-0 p-1 bg-[#DFAB40] rounded-tl-lg text-black">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <h4 className="font-display text-lg font-bold text-[#111111] dark:text-[#FFFFFF]">
                    Message Successfully Sent!
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-[#D4D0C5] mt-1 max-w-md mx-auto">
                    Thank you for reaching out to Marketing Tycoons. A senior strategist has received your inquiry and will respond shortly.
                  </p>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-5 px-6 py-2.5 rounded-full bg-[#DFAB40]/20 hover:bg-[#DFAB40]/30 text-xs font-semibold text-[#DFAB40] transition-colors cursor-pointer"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                        Full Name <span className="text-[#DFAB40]">*</span>
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Alexander Sterling"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121216] border border-black/15 dark:border-[rgba(223,171,64,0.25)] focus:border-[#DFAB40] focus:ring-1 focus:ring-[#DFAB40] text-[#111111] dark:text-[#FFFFFF] text-sm outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-xs"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                        Email Address <span className="text-[#DFAB40]">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="alex@company.com"
                        required
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121216] border border-black/15 dark:border-[rgba(223,171,64,0.25)] focus:border-[#DFAB40] focus:ring-1 focus:ring-[#DFAB40] text-[#111111] dark:text-[#FFFFFF] text-sm outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-xs"
                      />
                    </div>
                  </div>

                  {/* Phone & Service Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                        Phone Number
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 342 6793428 / Your Phone"
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121216] border border-black/15 dark:border-[rgba(223,171,64,0.25)] focus:border-[#DFAB40] focus:ring-1 focus:ring-[#DFAB40] text-[#111111] dark:text-[#FFFFFF] text-sm outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-xs"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-service" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                        Required Service
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121216] border border-black/15 dark:border-[rgba(223,171,64,0.25)] focus:border-[#DFAB40] focus:ring-1 focus:ring-[#DFAB40] text-[#111111] dark:text-[#FFFFFF] text-sm outline-none transition-all cursor-pointer shadow-xs"
                      >
                        {services.map(s => (
                          <option key={s.id} value={s.title} className="bg-white dark:bg-[#0E0E12] text-[#111111] dark:text-[#FFFFFF]">
                            {s.title}
                          </option>
                        ))}
                        <option value="Full Comprehensive Suite" className="bg-white dark:bg-[#0E0E12] text-[#111111] dark:text-[#FFFFFF]">Full Comprehensive Suite</option>
                        <option value="Consultation / Other" className="bg-white dark:bg-[#0E0E12] text-[#111111] dark:text-[#FFFFFF]">Consultation / Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                      Project Details & Objectives <span className="text-[#DFAB40]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your brand goals, target timeline, and specific deliverables..."
                      required
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-[#121216] border border-black/15 dark:border-[rgba(223,171,64,0.25)] focus:border-[#DFAB40] focus:ring-1 focus:ring-[#DFAB40] text-[#111111] dark:text-[#FFFFFF] text-sm outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 resize-none shadow-xs"
                    />
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-300 text-xs animate-shake">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Submit Button: Rounded-Full Pill with Golden Glow */}
                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#111111] text-[#F8F7F3] dark:bg-gradient-to-r dark:from-[#F0C96F] dark:via-[#DFAB40] dark:to-[#C99A45] dark:text-[#0A0A0C] font-extrabold text-sm tracking-wider uppercase hover:shadow-xl dark:shadow-[0_0_25px_rgba(223,171,64,0.4)] transition-all duration-300 hover:scale-[1.01] active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer flex items-center justify-center gap-2 shadow-md"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting Securely...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-gray-400 dark:text-[#A0A0A0] pt-2">
                    🔒 Strict NDA standard. We never share your contact information or campaign data.
                  </p>

                </form>
              )}

            </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
