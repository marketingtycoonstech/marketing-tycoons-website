import React, { useState } from 'react';
import { Globe, MapPin, Sparkles, Users, TrendingUp, DollarSign } from 'lucide-react';

interface ClientHub {
  id: string;
  city: string;
  country: string;
  lat: number; // percentage coordinate on SVG
  lng: number; // percentage coordinate on SVG
  clientName: string;
  project: string;
  metric: string;
  metricLabel: string;
  details: string;
}

const CLIENT_HUBS: ClientHub[] = [
  {
    id: 'hub-1',
    city: 'New York',
    country: 'United States',
    lat: 38,
    lng: 25,
    clientName: 'Aura Maison Retail',
    project: 'E-Commerce Scaling',
    metric: '4.8x',
    metricLabel: 'Ad ROAS Growth',
    details: 'Complete headless transition with high-fidelity social ad deployment across the US market.'
  },
  {
    id: 'hub-2',
    city: 'London',
    country: 'United Kingdom',
    lat: 28,
    lng: 48,
    clientName: 'Takween Digital UK',
    project: 'Bespoke Brand System',
    metric: '+180%',
    metricLabel: 'Organic Traffic Boost',
    details: 'Integrated Technical SEO structuring and semantic search optimization targeting high-intent keywords.'
  },
  {
    id: 'hub-3',
    city: 'Dubai',
    country: 'United Arab Emirates',
    lat: 48,
    lng: 63,
    clientName: 'Gulf Luxury Properties',
    project: 'Lead Gen Engine',
    metric: '12K+',
    metricLabel: 'Qualified Leads',
    details: 'Targeted paid advertising and CRM funnel automation with localized Arabic copy vectors.'
  },
  {
    id: 'hub-4',
    city: 'Karachi',
    country: 'Pakistan',
    lat: 46,
    lng: 70,
    clientName: 'Farooq Kitab Ghar',
    project: 'E-Commerce Platform',
    metric: '+320%',
    metricLabel: 'Sales Increase',
    details: 'Launch of high-speed catalog storefront with robust offline-first and cache-friendly checkout flow.'
  },
  {
    id: 'hub-5',
    city: 'Singapore',
    country: 'Singapore',
    lat: 58,
    lng: 78,
    clientName: 'Apex Capital Partners',
    project: 'Corporate Platform',
    metric: '380ms',
    metricLabel: 'Load Latency',
    details: 'Fintech grade landing architecture optimized for extreme mobile responsiveness and conversion analytics.'
  },
  {
    id: 'hub-6',
    city: 'Sydney',
    country: 'Australia',
    lat: 80,
    lng: 90,
    clientName: 'Elysian Wellness',
    project: 'Meta Campaign Strategy',
    metric: '5.2x',
    metricLabel: 'Investment Return',
    details: 'Multivariate content testing and pixel tracking setup bypassing browser cookies using server-side Conversions API.'
  }
];

export const GlobalReach: React.FC = () => {
  const [activeHub, setActiveHub] = useState<ClientHub | null>(CLIENT_HUBS[1]); // Default to London

  return (
    <section id="global-reach" className="py-24 bg-[#050505] text-gray-300 relative overflow-hidden">
      {/* Background Cinematic Radial Gradients */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-amber-950/20 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-xs font-semibold uppercase tracking-wider inline-flex items-center gap-1.5 animate-pulse">
            <Globe className="w-3.5 h-3.5" />
            <span>International Influence</span>
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#aa820a] to-[#d4af37]">Global Reach</span> & Hubs
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            We partner with elite companies and visionaries across continents, deploying extreme-ROI digital storefronts and campaigns that scale globally.
          </p>
        </div>

        {/* Global Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-6 rounded-2xl bg-[#0e0f14]/80 border border-gray-800/80 hover:border-[#d4af37]/40 transition-all flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-[#d4af37] border border-amber-500/20 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">12+</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Countries Reached</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0f14]/80 border border-gray-800/80 hover:border-[#d4af37]/40 transition-all flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-[#d4af37] border border-amber-500/20 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">45M+</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Global Reach Aud.</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0f14]/80 border border-gray-800/80 hover:border-[#d4af37]/40 transition-all flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-[#d4af37] border border-amber-500/20 shrink-0">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">$1.8M</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Ad Spend Managed</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0e0f14]/80 border border-gray-800/80 hover:border-[#d4af37]/40 transition-all flex items-center gap-4">
            <div className="p-3 rounded-xl bg-amber-500/10 text-[#d4af37] border border-amber-500/20 shrink-0">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-white">4.9x</div>
              <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Average ROAS</div>
            </div>
          </div>
        </div>

        {/* Map Visualization & Detail Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stylized Vector World Map Canvas */}
          <div className="lg:col-span-8 p-6 rounded-3xl bg-[#0c0d12] border border-gray-800/80 shadow-2xl relative select-none aspect-[16/10] overflow-hidden flex flex-col justify-center">
            
            {/* World Map SVG Paths Layout */}
            <svg 
              viewBox="0 0 1000 600" 
              className="w-full h-full opacity-20 stroke-gray-700 fill-none stroke-[1.5]"
              style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
            >
              {/* North America */}
              <path d="M120,120 Q160,110 200,140 T280,130 T320,160 T250,220 T200,240 T150,260 T100,240 T80,180 Z" />
              {/* South America */}
              <path d="M240,280 Q280,290 320,320 T360,400 T300,480 T260,520 T240,480 T220,400 T210,320 Z" />
              {/* Europe */}
              <path d="M420,130 Q480,100 520,110 T560,140 T480,200 T440,180 T400,160 Z" />
              {/* Africa */}
              <path d="M410,250 Q480,240 540,280 T580,360 T520,450 T480,480 T440,420 T390,320 Z" />
              {/* Asia */}
              <path d="M530,120 Q650,80 780,100 T850,160 T820,240 T750,280 T680,260 T600,220 T540,180 Z" />
              {/* India / Pak */}
              <path d="M640,220 Q680,230 700,260 T660,300 T630,260 Z" />
              {/* Australia */}
              <path d="M800,380 Q880,390 920,430 T850,500 T780,450 Z" />
            </svg>

            {/* Glowing Connections Arc Lines */}
            {activeHub && (
              <div className="absolute inset-0 pointer-events-none">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path
                    d={`M 70 46 Q ${Math.min(70, activeHub.lng) + 15} ${Math.min(46, activeHub.lat) - 15} ${activeHub.lng} ${activeHub.lat}`}
                    fill="none"
                    stroke="url(#gold-gradient)"
                    strokeWidth="0.4"
                    strokeDasharray="4 2"
                    className="animate-dash"
                  />
                  <defs>
                    <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#d4af37" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#aa820a" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            )}

            {/* Pakistan / Karachi Central Hub Marker */}
            <div 
              className="absolute w-5 h-5 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
              style={{ top: '46%', left: '70%' }}
            >
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#d4af37]/40 animate-ping opacity-75" />
              <span className="relative rounded-full h-2.5 w-2.5 bg-[#d4af37] border border-black shadow-[0_0_15px_#d4af37]" />
            </div>

            {/* Client Hub Pins */}
            {CLIENT_HUBS.map(hub => {
              const isActive = activeHub?.id === hub.id;
              return (
                <button
                  key={hub.id}
                  onClick={() => setActiveHub(hub)}
                  className="absolute p-2 -translate-x-1/2 -translate-y-1/2 group focus:outline-none cursor-pointer"
                  style={{ top: `${hub.lat}%`, left: `${hub.lng}%` }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ripple Anim */}
                    <span className={`absolute inline-flex rounded-full bg-[#d4af37]/30 transition-all duration-300 ${
                      isActive ? 'h-8 w-8 animate-ping' : 'h-4 w-4 group-hover:h-6 group-hover:w-6'
                    }`} />
                    
                    {/* Inner core */}
                    <div className={`relative rounded-full transition-all duration-300 ${
                      isActive 
                        ? 'h-3.5 w-3.5 bg-[#d4af37] border border-black shadow-[0_0_12px_#d4af37]' 
                        : 'h-2 w-2 bg-gray-500 group-hover:bg-[#d4af37] shadow-lg'
                    }`} />

                    {/* Tooltip Hover Label */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#0e0f14] border border-gray-800 text-[10px] font-bold text-white px-2 py-1 rounded shadow-xl whitespace-nowrap z-30">
                      {hub.city}, {hub.country}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Interactive Info Panel */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* active details card */}
            {activeHub ? (
              <div className="p-6 rounded-3xl bg-[#0c0d12] border border-gray-800/80 shadow-2xl relative overflow-hidden space-y-6 animate-in fade-in duration-300">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/5 rounded-bl-full pointer-events-none" />
                
                {/* Hub name header */}
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-[#d4af37] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">{activeHub.city} Hub</h3>
                    <p className="text-xs text-gray-400">{activeHub.country}</p>
                  </div>
                </div>

                {/* Main Client Info */}
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-black/40 border border-gray-800/60">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Client Enterprise</span>
                    <div className="text-sm font-bold text-white mt-0.5">{activeHub.clientName}</div>
                    <span className="text-xs text-[#d4af37] font-semibold mt-1 inline-block">{activeHub.project}</span>
                  </div>

                  {/* Highlights Metric Card */}
                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#d4af37]/10 to-transparent border border-[#d4af37]/20 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Impact Delivered</span>
                      <span className="text-[11px] text-gray-400 font-medium">{activeHub.metricLabel}</span>
                    </div>
                    <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-[#aa820a] flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-[#d4af37] inline shrink-0" />
                      <span>{activeHub.metric}</span>
                    </div>
                  </div>

                  <p className="text-xs text-gray-400 leading-relaxed italic">
                    "{activeHub.details}"
                  </p>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center rounded-3xl bg-[#0c0d12] border border-gray-800/80 text-gray-500 text-xs">
                Select a client location on the map to inspect project statistics.
              </div>
            )}

            {/* Quick list selectors */}
            <div className="p-4 rounded-2xl bg-[#0c0d12]/50 border border-gray-800/60 space-y-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pl-2 block">Quick Navigation</span>
              <div className="grid grid-cols-2 gap-2">
                {CLIENT_HUBS.map(hub => (
                  <button
                    key={hub.id}
                    onClick={() => setActiveHub(hub)}
                    className={`px-3 py-2 rounded-xl text-left text-xs font-semibold truncate transition-all cursor-pointer ${
                      activeHub?.id === hub.id
                        ? 'bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37]'
                        : 'bg-transparent border border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {hub.city}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
