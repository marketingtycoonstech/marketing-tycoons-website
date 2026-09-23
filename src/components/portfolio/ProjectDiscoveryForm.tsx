import React, { useState } from 'react';
import { db, handleFirestoreError, OperationType, serverTimestamp } from '../../lib/firebase';
import { doc, setDoc, collection } from 'firebase/firestore';
import { 
  Sparkles, Check, ArrowRight, ArrowLeft, Target, 
  Settings, UserCheck, HelpCircle, FileText, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const ProjectDiscoveryForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const [formData, setFormData] = useState({
    service: 'Web Development',
    timeline: 'Standard (4-6 Weeks)',
    audience: 'B2B Corporates',
    audienceDesc: '',
    competitors: '',
    features: [] as string[],
    name: '',
    email: '',
    phone: '',
    vision: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const services = [
    'Web Development',
    'SEO Optimization',
    'Branding & Creative Design',
    'Meta & Digital Ads',
    'Social Media Management'
  ];

  const timelines = [
    'Standard (4-6 Weeks)',
    'Expedited (2-3 Weeks)',
    'Enterprise (8+ Weeks)',
    'Flexible / Long-Term'
  ];

  const niches = [
    'B2B Corporates',
    'B2C E-Commerce',
    'D2C Lifestyle Brand',
    'Tech Startups',
    'Local Small Businesses',
    'Global Enterprise'
  ];

  const specialFeatures = [
    'Custom Animations & Micro-interactions',
    'Full E-Commerce Integration & Checkout',
    'Custom CRM & Leads Syncing',
    'Sub-Second CDN Speed Caching',
    'Client Admin Dashboard & CMS',
    'Multilingual & Multi-currency support'
  ];

  const handleNext = () => {
    // Basic validations
    if (currentStep === 1 && !formData.service) {
      setError('Please select a service.');
      return;
    }
    if (currentStep === 4) {
      if (!formData.name.trim()) {
        setError('Please enter your full name.');
        return;
      }
      if (!formData.email.trim() || !formData.email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      handleSubmit();
      return;
    }
    setError('');
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const handleBack = () => {
    setError('');
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleToggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    const newDiscoveryRef = doc(collection(db, 'discoveries'));
    const payload = {
      id: newDiscoveryRef.id,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      service: formData.service,
      timeline: formData.timeline,
      audience: formData.audience,
      audienceDesc: formData.audienceDesc.trim(),
      features: formData.features,
      competitors: formData.competitors.trim(),
      vision: formData.vision.trim(),
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(newDiscoveryRef, payload);
      setIsSuccess(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#D4AF37', '#F6C453', '#FFFFFF', '#B88932']
        });
      } catch {
        // Safe check
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `discoveries/${newDiscoveryRef.id}`);
      setError('Failed to transmit your requirement portfolio. Please verify your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      service: 'Web Development',
      timeline: 'Standard (4-6 Weeks)',
      audience: 'B2B Corporates',
      audienceDesc: '',
      competitors: '',
      features: [],
      name: '',
      email: '',
      phone: '',
      vision: '',
    });
    setCurrentStep(1);
    setIsSuccess(false);
    setError('');
  };

  return (
    <div className="rounded-3xl p-8 sm:p-10 bg-white dark:bg-[#0E0E12] border border-black/10 dark:border-[rgba(223,171,64,0.22)] shadow-2xl relative text-left overflow-hidden">
      
      {/* Visual Header Shimmer Line */}
      <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#DFAB40]/60 to-transparent" />

      {/* Progress Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#DFAB40] block">
            INTERACTIVE BRIEF BUILDER
          </span>
          <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#111111] dark:text-[#FFFFFF] uppercase">
            Project Discovery Desk
          </h3>
        </div>
        <div className="flex items-center gap-1.5 bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-xl border border-black/5 dark:border-white/5">
          <span className="text-xs font-mono font-bold text-[#B88932] dark:text-[#F6C453]">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
      </div>

      {/* Progress Bar with Luxury Gold Shimmer */}
      <div className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-full mb-8 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#D4AF37] via-[#F6C453] to-[#D4AF37] rounded-full transition-all duration-300"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>

      {isSuccess ? (
        <div className="text-center py-8 animate-in fade-in zoom-in-95">
          <div className="w-14 h-14 rounded-2xl bg-[#DFAB40]/10 border border-[#DFAB40]/40 flex items-center justify-center mx-auto mb-4 text-[#F6C453] shadow-md">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h4 className="font-display text-xl font-bold text-[#111111] dark:text-[#FFFFFF] uppercase tracking-wide">
            Discovery Brief Transmitted!
          </h4>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-[#9CA3AF] mt-2 max-w-md mx-auto leading-relaxed">
            Your technical requirement dossier has been compiled and securely synchronized with Marketing Tycoons core. A senior strategist will review it within 12 business hours.
          </p>
          <button
            onClick={handleReset}
            className="mt-6 px-6 py-2.5 rounded-full bg-[#DFAB40]/20 hover:bg-[#DFAB40]/30 text-xs font-semibold text-[#DFAB40] transition-colors cursor-pointer"
          >
            Draft Another Project Brief
          </button>
        </div>
      ) : (
        <div className="space-y-6">

          {/* STEP 1: Project Scope & Core Service */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2.5">
                  1. Choose Your Core Service Focus
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {services.map((item) => {
                    const isSelected = formData.service === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, service: item }))}
                        className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#DFAB40]/10 border-[#DFAB40] text-black dark:text-[#F6C453]'
                            : 'bg-gray-50 dark:bg-black/15 border-black/5 dark:border-white/5 text-gray-600 hover:bg-black/5'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2.5">
                  2. Choose Delivery Timeline Expectation
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {timelines.map((item) => {
                    const isSelected = formData.timeline === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, timeline: item }))}
                        className={`p-3 rounded-xl border text-[11px] font-semibold text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#DFAB40]/10 border-[#DFAB40] text-black dark:text-[#F6C453]'
                            : 'bg-gray-50 dark:bg-black/15 border-black/5 dark:border-white/5 text-gray-600 hover:bg-black/5'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Target Audience & Market Niche */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2.5">
                  3. Select Market Segment / Business Niche
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {niches.map((item) => {
                    const isSelected = formData.audience === item;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, audience: item }))}
                        className={`p-3.5 rounded-xl border text-xs font-semibold text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#DFAB40]/10 border-[#DFAB40] text-black dark:text-[#F6C453]'
                            : 'bg-gray-50 dark:bg-black/15 border-black/5 dark:border-white/5 text-gray-600 hover:bg-black/5'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="audience-desc" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                  4. Define Your Ideal Target Customer (Optional)
                </label>
                <input
                  id="audience-desc"
                  type="text"
                  value={formData.audienceDesc}
                  onChange={(e) => setFormData(prev => ({ ...prev, audienceDesc: e.target.value }))}
                  placeholder="e.g. Gen-Z online shoppers looking for luxury lifestyle items..."
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-black/15 border border-black/15 dark:border-[rgba(223,171,64,0.25)] text-sm text-[#111111] dark:text-[#FFFFFF] outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600"
                />
              </div>
            </div>
          )}

          {/* STEP 3: Technical & Special Requirements */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2.5">
                  5. Choose Desired Premium Special Features
                </label>
                <div className="space-y-2">
                  {specialFeatures.map((feature) => {
                    const isChecked = formData.features.includes(feature);
                    return (
                      <button
                        key={feature}
                        type="button"
                        onClick={() => handleToggleFeature(feature)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#DFAB40]/10 border-[#DFAB40] text-black dark:text-white'
                            : 'bg-gray-50 dark:bg-black/15 border-black/5 dark:border-white/5 text-gray-600'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                          isChecked ? 'bg-[#DFAB40] border-transparent text-black' : 'border-gray-400'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span>{feature}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label htmlFor="competitors-input" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                  6. Competitor Brands You Admire (Optional)
                </label>
                <input
                  id="competitors-input"
                  type="text"
                  value={formData.competitors}
                  onChange={(e) => setFormData(prev => ({ ...prev, competitors: e.target.value }))}
                  placeholder="e.g. Apple, Stripe, Nike (Separated by commas)"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-black/15 border border-black/15 dark:border-[rgba(223,171,64,0.25)] text-sm text-[#111111] dark:text-[#FFFFFF] outline-none transition-all placeholder:text-gray-400"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Verification & Contacts */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="disc-name" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                    Full Name <span className="text-[#DFAB40]">*</span>
                  </label>
                  <input
                    id="disc-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Alexander Sterling"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-black/15 border border-black/15 dark:border-[rgba(223,171,64,0.25)] text-sm text-[#111111] dark:text-[#FFFFFF] outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="disc-email" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                    Email Address <span className="text-[#DFAB40]">*</span>
                  </label>
                  <input
                    id="disc-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="alex@brand.com"
                    required
                    className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-black/15 border border-black/15 dark:border-[rgba(223,171,64,0.25)] text-sm text-[#111111] dark:text-[#FFFFFF] outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="disc-phone" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                  Phone / WhatsApp Number
                </label>
                <input
                  id="disc-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+92 342 6793428"
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-black/15 border border-black/15 dark:border-[rgba(223,171,64,0.25)] text-sm text-[#111111] dark:text-[#FFFFFF] outline-none"
                />
              </div>

              <div>
                <label htmlFor="disc-vision" className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-[#D4D0C5] mb-2">
                  7. Core Brand Vision & Key Objectives
                </label>
                <textarea
                  id="disc-vision"
                  value={formData.vision}
                  onChange={(e) => setFormData(prev => ({ ...prev, vision: e.target.value }))}
                  rows={3}
                  placeholder="Tell us what you want to achieve, key deadlines, or branding priorities..."
                  className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-black/15 border border-black/15 dark:border-[rgba(223,171,64,0.25)] text-sm text-[#111111] dark:text-[#FFFFFF] outline-none resize-none"
                />
              </div>
            </div>
          )}

          {error && (
            <p className="text-xs font-semibold text-red-500 bg-red-50 dark:bg-red-950/20 p-2.5 rounded-lg border border-red-200 dark:border-red-900 animate-shake">
              {error}
            </p>
          )}

          {/* Step Navigation Controls */}
          <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className="px-5 py-2.5 rounded-full border border-black/15 dark:border-white/10 text-xs font-bold text-gray-500 dark:text-gray-300 disabled:opacity-40 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-full bg-[#111111] text-white dark:bg-gradient-to-r dark:from-[#DFAB40] dark:to-[#C99A45] dark:text-black text-xs font-extrabold uppercase tracking-widest transition-all hover:scale-103 cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Transmitting Brief...</span>
                </>
              ) : (
                <>
                  <span>{currentStep === totalSteps ? 'Launch Brief' : 'Continue'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>

        </div>
      )}

    </div>
  );
};
