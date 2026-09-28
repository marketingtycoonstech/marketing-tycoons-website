import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle, ArrowRight, ArrowLeft, Calendar, ShieldCheck, MessageCircle, Clock, Sparkles } from 'lucide-react';

export const ConsultationModal: React.FC = () => {
  const { isConsultationModalOpen, setIsConsultationModalOpen, submitContactMessage, settings } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState('Web Development');
  const [selectedBudget, setSelectedBudget] = useState('$5,000 – $15,000');
  const [selectedTimeline, setSelectedTimeline] = useState('Within 1 Month');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isConsultationModalOpen) return null;

  const servicesList = [
    'Digital Marketing',
    'SEO Services',
    'Web Development',
    'UI/UX Design',
    'Branding',
    'Social Media Marketing',
    'E-commerce Solutions'
  ];

  const budgetsList = [
    'Under $5,000',
    '$5,000 – $15,000',
    '$15,000 – $35,000',
    '$35,000 – $100,000+'
  ];

  const timelinesList = [
    'Immediately (Urgent)',
    'Within 1 Month',
    '1 – 3 Months',
    'Planning Phase'
  ];

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim() || !email.trim()) {
      setErrorMessage('Please provide your name and work email address.');
      return;
    }

    setIsSubmitting(true);
    try {
      const fullMessage = `[CONSULTATION BOOKING]
Company: ${company || 'N/A'}
Service Required: ${selectedService}
Budget: ${selectedBudget}
Timeline: ${selectedTimeline}
Project Goals / Notes: ${notes || 'N/A'}`;

      await submitContactMessage({
        name,
        email,
        phone,
        service: selectedService,
        message: fullMessage
      });

      setIsSuccess(true);
    } catch (err: any) {
      setErrorMessage('We encountered an issue recording your request. Please try direct WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsConsultationModalOpen(false);
    setTimeout(() => {
      setStep(1);
      setIsSuccess(false);
      setErrorMessage('');
    }, 300);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFFFF] dark:bg-[#0B0F16] border border-black/10 dark:border-[#222E3F] shadow-2xl p-6 sm:p-8 text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-8 space-y-5">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-500">
              <CheckCircle className="w-9 h-9" />
            </div>
            <h3 className="font-display text-2xl font-bold text-[#111111] dark:text-white uppercase">
              Consultation Requested
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong>{name}</strong>. Our senior strategy director has received your request regarding <strong>{selectedService}</strong> and will reach out to <strong>{email}</strong> within 12 business hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi Marketing Tycoons, I just submitted a consultation request for ${selectedService} for ${company || name}.`)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Instant WhatsApp Priority Chat</span>
              </a>
              <button
                onClick={handleClose}
                className="w-full sm:w-auto px-6 py-3 rounded-full border border-black/10 dark:border-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Title & Step Bar */}
            <div className="mb-6">
              <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-1">
                Step {step} of 3 · Complimentary Strategy Session
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#111111] dark:text-white">
                Book Free Consultation
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                Zero sales fluff. 30 minutes of actionable architectural and acquisition insights with a senior lead.
              </p>
            </div>

            {/* Step 1: Select Service */}
            {step === 1 && (
              <div className="space-y-4">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block">
                  1. Which core discipline do you need to scale?
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {servicesList.map(srv => (
                    <button
                      key={srv}
                      type="button"
                      onClick={() => setSelectedService(srv)}
                      className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                        selectedService === srv
                          ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] dark:text-[#F6C453] shadow-xs'
                          : 'border-black/10 dark:border-[#222E3F] bg-[#F8F7F3] dark:bg-[#111622] text-gray-700 dark:text-gray-300 hover:border-black/20 dark:hover:border-gray-600'
                      }`}
                    >
                      {srv}
                    </button>
                  ))}
                </div>

                <div className="pt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-bold text-xs uppercase tracking-wider hover:scale-103 active:scale-97 transition-all cursor-pointer"
                  >
                    <span>Next: Budget & Scope</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Budget & Timeline */}
            {step === 2 && (
              <div className="space-y-5">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-2.5">
                    2. Estimated Project Investment:
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {budgetsList.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setSelectedBudget(b)}
                        className={`p-3 rounded-2xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                          selectedBudget === b
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] dark:text-[#F6C453]'
                            : 'border-black/10 dark:border-[#222E3F] bg-[#F8F7F3] dark:bg-[#111622] text-gray-700 dark:text-gray-300 hover:border-black/20 dark:hover:border-gray-600'
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-2.5">
                    3. Target Timeline:
                  </label>
                  <div className="grid grid-cols-2 gap-2.5">
                    {timelinesList.map(t => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setSelectedTimeline(t)}
                        className={`p-3 rounded-2xl border text-center text-xs font-semibold transition-all cursor-pointer ${
                          selectedTimeline === t
                            ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#D4AF37] dark:text-[#F6C453]'
                            : 'border-black/10 dark:border-[#222E3F] bg-[#F8F7F3] dark:bg-[#111622] text-gray-700 dark:text-gray-300 hover:border-black/20 dark:hover:border-gray-600'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-bold text-xs uppercase tracking-wider hover:scale-103 active:scale-97 transition-all cursor-pointer"
                  >
                    <span>Next: Contact Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-500 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Alexander Wright"
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-[#222E3F] bg-[#F8F7F3] dark:bg-[#111622] text-[#111111] dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="alexander@company.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-[#222E3F] bg-[#F8F7F3] dark:bg-[#111622] text-[#111111] dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-[#222E3F] bg-[#F8F7F3] dark:bg-[#111622] text-[#111111] dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder="Acme Corp"
                      className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-[#222E3F] bg-[#F8F7F3] dark:bg-[#111622] text-[#111111] dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 block mb-1">
                    Brief Project Objectives (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    placeholder="Tell us what you want to achieve, your current bottlenecks, or specific goals..."
                    className="w-full px-4 py-2 rounded-xl border border-black/10 dark:border-[#222E3F] bg-[#F8F7F3] dark:bg-[#111622] text-[#111111] dark:text-white text-xs focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-bold text-xs uppercase tracking-wider hover:scale-103 active:scale-97 disabled:opacity-50 transition-all cursor-pointer shadow-md"
                  >
                    {isSubmitting ? (
                      <span>Reserving Session...</span>
                    ) : (
                      <>
                        <span>Confirm Consultation</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* Trust Strip */}
            <div className="mt-6 pt-4 border-t border-black/10 dark:border-[#1E2530] flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>NDA & Strict Confidentiality</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Direct Executive Response</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
