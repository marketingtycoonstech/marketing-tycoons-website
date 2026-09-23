import React, { useState, useEffect } from 'react';
import { Sparkles, Calculator, Check, ArrowRight, Star, AlertCircle } from 'lucide-react';

interface CalculatorService {
  id: string;
  name: string;
  minPrice: number;
  maxPrice: number;
  badge: string;
}

interface ProjectBudgetCalculatorProps {
  onApplyBudget?: (details: string) => void;
}

export const ProjectBudgetCalculator: React.FC<ProjectBudgetCalculatorProps> = ({ onApplyBudget }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(['web_dev']);
  const [timeline, setTimeline] = useState<'standard' | 'expedited'>('standard');
  const [copied, setCopied] = useState(false);

  const servicesList: CalculatorService[] = [
    { id: 'web_dev', name: 'Web Development', minPrice: 1500, maxPrice: 3000, badge: 'React / Next.js' },
    { id: 'seo', name: 'SEO Optimization', minPrice: 800, maxPrice: 1500, badge: 'Google Rankings' },
    { id: 'branding', name: 'Branding & Design', minPrice: 600, maxPrice: 1200, badge: 'Logos & Guidelines' },
    { id: 'meta_ads', name: 'Meta & Digital Ads', minPrice: 1000, maxPrice: 2500, badge: 'High ROI Campaigns' },
    { id: 'social', name: 'Social Media Mgmt', minPrice: 700, maxPrice: 1400, badge: 'Organic Growth' }
  ];

  const handleToggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id)
        ? prev.length > 1
          ? prev.filter((s) => s !== id)
          : prev // Keep at least one selected
        : [...prev, id]
    );
  };

  // Calculate totals
  const baseMin = selectedServices.reduce((acc, id) => {
    const s = servicesList.find((x) => x.id === id);
    return acc + (s ? s.minPrice : 0);
  }, 0);

  const baseMax = selectedServices.reduce((acc, id) => {
    const s = servicesList.find((x) => x.id === id);
    return acc + (s ? s.maxPrice : 0);
  }, 0);

  const multiplier = timeline === 'expedited' ? 1.25 : 1.0;
  const finalMin = Math.round(baseMin * multiplier);
  const finalMax = Math.round(baseMax * multiplier);

  // Generate output string for applying
  const getSelectedServicesText = () => {
    const names = selectedServices.map((id) => servicesList.find((x) => x.id === id)?.name || '');
    return `Selected Services: ${names.join(', ')} | Speed: ${timeline === 'expedited' ? 'Expedited (+25%)' : 'Standard'} | Estimated Range: $${finalMin.toLocaleString()} - $${finalMax.toLocaleString()}`;
  };

  const handleApply = () => {
    if (onApplyBudget) {
      onApplyBudget(getSelectedServicesText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-[#0E0E12] border border-black/10 dark:border-[rgba(223,171,64,0.22)] shadow-xl relative overflow-hidden text-left">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#DFAB40]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4 relative z-10">
        <div className="w-8 h-8 rounded-lg bg-[#DFAB40]/10 border border-[#DFAB40]/25 flex items-center justify-center text-[#DFAB40]">
          <Calculator className="w-4 h-4" />
        </div>
        <div>
          <h4 className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-[#111111] dark:text-[#FFFFFF]">
            Project Budget Calculator
          </h4>
          <span className="text-[10px] text-gray-500 dark:text-[#A0A0A0] font-medium block mt-0.5">
            Select desired services to calculate investment estimation
          </span>
        </div>
      </div>

      {/* Services Checkbox Grid */}
      <div className="space-y-2 mb-5 relative z-10">
        {servicesList.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          return (
            <button
              key={service.id}
              type="button"
              onClick={() => handleToggleService(service.id)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border text-left transition-all cursor-pointer ${
                isSelected
                  ? 'bg-[#DFAB40]/10 border-[#DFAB40] text-black dark:text-white'
                  : 'bg-gray-50/50 dark:bg-black/20 border-black/5 dark:border-white/5 text-gray-500 hover:bg-black/5'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-all ${
                  isSelected ? 'bg-black dark:bg-[#DFAB40] border-transparent text-white dark:text-black' : 'border-gray-300 dark:border-gray-700'
                }`}>
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div>
                  <span className={`text-xs font-bold block ${isSelected ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-400'}`}>
                    {service.name}
                  </span>
                  <span className="text-[9px] text-gray-400 dark:text-gray-500 block">
                    {service.badge}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-[#B88932] dark:text-[#F6C453]">
                  ${service.minPrice} - ${service.maxPrice}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Timeline Modifier Switch */}
      <div className="p-3 bg-gray-50 dark:bg-black/10 rounded-xl border border-black/5 dark:border-white/5 mb-5 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-gray-700 dark:text-[#D4D0C5] block">
            Execution Urgency
          </span>
          <span className="text-[9px] text-gray-400 dark:text-gray-500 block">
            Standard delivery vs Express timeline
          </span>
        </div>
        <div className="flex gap-1.5 bg-black/5 dark:bg-white/5 p-1 rounded-lg">
          <button
            type="button"
            onClick={() => setTimeline('standard')}
            className={`px-3 py-1 text-[10px] font-bold rounded-md uppercase transition-all cursor-pointer ${
              timeline === 'standard' ? 'bg-white dark:bg-[#0E0E12] text-black dark:text-[#F6C453] shadow-xs' : 'text-gray-500'
            }`}
          >
            Standard
          </button>
          <button
            type="button"
            onClick={() => setTimeline('expedited')}
            className={`px-3 py-1 text-[10px] font-bold rounded-md uppercase transition-all cursor-pointer ${
              timeline === 'expedited' ? 'bg-white dark:bg-[#0E0E12] text-black dark:text-[#F6C453] shadow-xs' : 'text-gray-500'
            }`}
          >
            Expedited
          </button>
        </div>
      </div>

      {/* Calculated Results Area */}
      <div className="p-4 bg-gray-100 dark:bg-black/30 border border-black/5 dark:border-white/5 rounded-xl text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#DFAB40] uppercase block mb-1">
          ESTIMATED VALUE RANGE
        </span>
        <div className="font-display text-2xl sm:text-3xl font-black text-[#B88932] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-white dark:via-[#F6C453] dark:to-[#DFAB40] tracking-tight">
          ${finalMin.toLocaleString()} - ${finalMax.toLocaleString()}
        </div>
        <span className="text-[9px] text-gray-400 dark:text-gray-500 block mt-1.5">
          *Monthly support retainers priced separately. Subject to final scoping call.
        </span>

        {onApplyBudget && (
          <button
            type="button"
            onClick={handleApply}
            className={`w-full mt-3 py-2 px-4 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
              copied
                ? 'bg-emerald-500 text-white'
                : 'bg-black text-white dark:bg-white/10 dark:text-[#F6C453] dark:hover:bg-white/15 hover:scale-[1.01]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Applied to Message!</span>
              </>
            ) : (
              <>
                <span>Apply to My Message</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
