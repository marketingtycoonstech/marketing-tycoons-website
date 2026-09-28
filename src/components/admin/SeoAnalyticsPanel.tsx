import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Globe,
  Activity,
  Zap,
  MousePointerClick,
  Eye,
  Award,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
  Monitor,
  CheckCircle,
  Gauge,
  Calendar,
  Sparkles,
  Search,
  ExternalLink,
  ShieldCheck,
  Server
} from 'lucide-react';

// Time-series mock historical search traffic data
const DAILY_TRAFFIC_DATA = [
  { date: 'Sep 01', clicks: 840, impressions: 8200, ctr: 10.2, avgPos: 4.8 },
  { date: 'Sep 03', clicks: 920, impressions: 8900, ctr: 10.3, avgPos: 4.7 },
  { date: 'Sep 05', clicks: 1100, impressions: 10400, ctr: 10.5, avgPos: 4.5 },
  { date: 'Sep 07', clicks: 1050, impressions: 9800, ctr: 10.7, avgPos: 4.5 },
  { date: 'Sep 09', clicks: 1250, impressions: 11200, ctr: 11.1, avgPos: 4.3 },
  { date: 'Sep 11', clicks: 1320, impressions: 12100, ctr: 10.9, avgPos: 4.2 },
  { date: 'Sep 13', clicks: 1290, impressions: 11800, ctr: 10.9, avgPos: 4.3 },
  { date: 'Sep 15', clicks: 1480, impressions: 13500, ctr: 10.9, avgPos: 4.1 },
  { date: 'Sep 17', clicks: 1620, impressions: 14200, ctr: 11.4, avgPos: 3.9 },
  { date: 'Sep 19', clicks: 1540, impressions: 13900, ctr: 11.0, avgPos: 4.0 },
  { date: 'Sep 21', clicks: 1780, impressions: 15600, ctr: 11.4, avgPos: 3.8 },
  { date: 'Sep 23', clicks: 1920, impressions: 16800, ctr: 11.4, avgPos: 3.7 },
  { date: 'Sep 25', clicks: 1890, impressions: 16200, ctr: 11.6, avgPos: 3.7 },
  { date: 'Sep 27', clicks: 2150, impressions: 18400, ctr: 11.7, avgPos: 3.5 },
  { date: 'Sep 28', clicks: 2340, impressions: 19800, ctr: 11.8, avgPos: 3.4 }
];

const WEEKLY_TRAFFIC_DATA = [
  { date: 'W32 (Aug 04)', clicks: 5800, impressions: 54000, ctr: 10.7, avgPos: 4.9 },
  { date: 'W33 (Aug 11)', clicks: 6400, impressions: 59000, ctr: 10.8, avgPos: 4.7 },
  { date: 'W34 (Aug 18)', clicks: 7100, impressions: 66000, ctr: 10.7, avgPos: 4.5 },
  { date: 'W35 (Aug 25)', clicks: 7900, impressions: 72000, ctr: 10.9, avgPos: 4.3 },
  { date: 'W36 (Sep 01)', clicks: 8800, impressions: 81000, ctr: 10.8, avgPos: 4.1 },
  { date: 'W37 (Sep 08)', clicks: 9600, impressions: 87000, ctr: 11.0, avgPos: 3.9 },
  { date: 'W38 (Sep 15)', clicks: 10900, impressions: 98000, ctr: 11.1, avgPos: 3.7 },
  { date: 'W39 (Sep 22)', clicks: 12400, impressions: 109000, ctr: 11.3, avgPos: 3.5 }
];

const MONTHLY_TRAFFIC_DATA = [
  { date: 'Apr 2026', clicks: 18200, impressions: 185000, ctr: 9.8, avgPos: 5.6 },
  { date: 'May 2026', clicks: 23400, impressions: 228000, ctr: 10.2, avgPos: 5.1 },
  { date: 'Jun 2026', clicks: 28900, impressions: 271000, ctr: 10.6, avgPos: 4.6 },
  { date: 'Jul 2026', clicks: 34500, impressions: 315000, ctr: 10.9, avgPos: 4.2 },
  { date: 'Aug 2026', clicks: 41200, impressions: 374000, ctr: 11.0, avgPos: 3.9 },
  { date: 'Sep 2026', clicks: 49800, impressions: 432000, ctr: 11.5, avgPos: 3.5 }
];

// Core Web Vitals RUM Latency Trend
const CWV_LATENCY_DATA = [
  { time: '00:00', lcp: 0.74, fid: 18, cls: 0.006, ttfb: 82 },
  { time: '04:00', lcp: 0.69, fid: 16, cls: 0.005, ttfb: 78 },
  { time: '08:00', lcp: 0.78, fid: 22, cls: 0.008, ttfb: 91 },
  { time: '12:00', lcp: 0.82, fid: 25, cls: 0.009, ttfb: 94 },
  { time: '16:00', lcp: 0.76, fid: 21, cls: 0.007, ttfb: 88 },
  { time: '20:00', lcp: 0.71, fid: 19, cls: 0.006, ttfb: 80 }
];

// Keyword SERP distribution
const KEYWORD_DISTRIBUTION_DATA = [
  { rankGroup: 'Top 1 - 3 (Prime)', count: 48, fill: '#D4AF37' },
  { rankGroup: 'Top 4 - 10 (Page 1)', count: 112, fill: '#F6C453' },
  { rankGroup: 'Top 11 - 20 (Page 2)', count: 64, fill: '#4ADE80' },
  { rankGroup: 'Top 21 - 50', count: 35, fill: '#38BDF8' },
  { rankGroup: 'Top 51+', count: 18, fill: '#94A3B8' }
];

// Traffic by Device
const DEVICE_SHARE_DATA = [
  { name: 'Mobile', value: 64.2, color: '#D4AF37' },
  { name: 'Desktop', value: 31.5, color: '#F6C453' },
  { name: 'Tablet', value: 4.3, color: '#38BDF8' }
];

// Top Ranking Queries
const TOP_RANKING_QUERIES = [
  { query: 'marketing tycoons', clicks: 8420, impressions: 21400, ctr: '39.3%', pos: 1.1, delta: '+0.2' },
  { query: 'international digital marketing agency', clicks: 4310, impressions: 42100, ctr: '10.2%', pos: 2.3, delta: '+1.4' },
  { query: 'high converting web architecture', clicks: 3890, impressions: 34500, ctr: '11.2%', pos: 1.8, delta: '+0.8' },
  { query: 'brand engineering pakistan', clicks: 3120, impressions: 18900, ctr: '16.5%', pos: 1.4, delta: '+0.3' },
  { query: 'enterprise performance marketing funnels', clicks: 2750, impressions: 31200, ctr: '8.8%', pos: 3.1, delta: '+2.1' },
  { query: 'bespoke software brand architects', clicks: 2180, impressions: 24800, ctr: '8.7%', pos: 2.9, delta: '+1.1' },
  { query: 'lahore digital marketing agency global', clicks: 1940, impressions: 14200, ctr: '13.6%', pos: 1.6, delta: '+0.4' }
];

// Top Landing Pages
const TOP_LANDING_PAGES = [
  { url: '/', title: 'Home • Marketing Tycoons Global', clicks: 18450, impressions: 154000, ctr: '11.9%' },
  { url: '/#services', title: 'Enterprise Digital Services', clicks: 8920, impressions: 78500, ctr: '11.3%' },
  { url: '/#portfolio', title: 'Case Studies & International Work', clicks: 7640, impressions: 69200, ctr: '11.0%' },
  { url: '/#contact', title: 'Book Free Consultation', clicks: 5890, impressions: 48300, ctr: '12.1%' },
  { url: '/#about', title: 'About Agency & Leadership', clicks: 4120, impressions: 38100, ctr: '10.8%' }
];

export const SeoAnalyticsPanel: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [activeMetric, setActiveMetric] = useState<'both' | 'clicks' | 'impressions'>('both');
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // Active dataset based on time range filter
  const currentChartData = useMemo(() => {
    if (timeRange === 'weekly') return WEEKLY_TRAFFIC_DATA;
    if (timeRange === 'monthly') return MONTHLY_TRAFFIC_DATA;
    return DAILY_TRAFFIC_DATA;
  }, [timeRange]);

  const handleRunAuditScan = () => {
    setIsScanning(true);
    setScanMessage('Connecting to Google Search Console API & Lighthouse Server...');
    setTimeout(() => {
      setScanMessage('Crawling 24 indexed routes & verifying Core Web Vitals...');
    }, 900);
    setTimeout(() => {
      setScanMessage('All SEO audits synced! 100% Core Web Vitals Passed (Sub-500ms).');
      setIsScanning(false);
      setTimeout(() => setScanMessage(null), 3500);
    }, 1800);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Header & Audit Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-gray-800">
        <div>
          <div className="inline-flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#D4AF37]">
              Real-Time Search & Performance Analytics
            </span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            SEO & Site Performance Dashboard
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mt-0.5">
            Monitor real-time Google search traffic trends, organic click-through rates, SERP keyword rankings, and live Core Web Vitals diagnostics.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleRunAuditScan}
            disabled={isScanning}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F6C453] text-black font-bold text-xs uppercase tracking-wider shadow-md hover:scale-103 active:scale-97 disabled:opacity-50 transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Auditing Live...' : 'Refresh SEO Audit'}</span>
          </button>
        </div>
      </div>

      {/* Audit Feedback Toast */}
      {scanMessage && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2.5 animate-in slide-in-from-top-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{scanMessage}</span>
        </div>
      )}

      {/* Primary KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Organic Clicks */}
        <div className="p-5 rounded-2xl bg-[#111820] border border-[#2A3441] shadow-lg relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#D4AF37]/15 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Organic Clicks</span>
            <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37]">
              <MousePointerClick className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-display">49,820</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24.8%
            </span>
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">vs. previous 30 days period</span>
        </div>

        {/* KPI 2: Total Search Impressions */}
        <div className="p-5 rounded-2xl bg-[#111820] border border-[#2A3441] shadow-lg relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#F6C453]/15 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Impressions</span>
            <div className="w-8 h-8 rounded-lg bg-[#F6C453]/10 flex items-center justify-center text-[#F6C453]">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-display">432,100</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" /> +19.4%
            </span>
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">across Google & Global SERPs</span>
        </div>

        {/* KPI 3: Average CTR */}
        <div className="p-5 rounded-2xl bg-[#111820] border border-[#2A3441] shadow-lg relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/15 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Avg. Click-Through</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-display">11.52%</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" /> +1.2%
            </span>
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">Top 5% agency industry benchmark</span>
        </div>

        {/* KPI 4: Average SERP Position */}
        <div className="p-5 rounded-2xl bg-[#111820] border border-[#2A3441] shadow-lg relative overflow-hidden group hover:border-[#D4AF37]/50 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-500/15 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Avg. Ranking Position</span>
            <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-black text-white font-display">#3.5</span>
            <span className="inline-flex items-center text-xs font-bold text-emerald-400">
              <ArrowUpRight className="w-3.5 h-3.5" /> +0.9 pos
            </span>
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">across 277 monitored target terms</span>
        </div>

      </div>

      {/* MAIN CHART SECTION: Visual Search Traffic Trends using Recharts */}
      <div className="p-6 rounded-2xl bg-[#111820] border border-[#2A3441] shadow-xl space-y-4">
        
        {/* Chart Header & Interactive Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-gray-800">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white font-display">
                Search Traffic & Impression Velocity
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#D4AF37]/20 text-[#F6C453] uppercase">
                Recharts Live
              </span>
            </div>
            <p className="text-xs text-gray-400">
              Interactive visualization of clicks vs. total visibility impressions over time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Metric Toggle */}
            <div className="flex items-center rounded-lg bg-black/40 border border-gray-800 p-0.5 text-[11px] font-semibold">
              <button
                onClick={() => setActiveMetric('both')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeMetric === 'both' ? 'bg-[#D4AF37] text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                All Metrics
              </button>
              <button
                onClick={() => setActiveMetric('clicks')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeMetric === 'clicks' ? 'bg-[#D4AF37] text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Clicks Only
              </button>
              <button
                onClick={() => setActiveMetric('impressions')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeMetric === 'impressions' ? 'bg-[#D4AF37] text-black font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Impressions
              </button>
            </div>

            {/* Timeframe Selector */}
            <div className="flex items-center rounded-lg bg-black/40 border border-gray-800 p-0.5 text-[11px] font-semibold">
              <button
                onClick={() => setTimeRange('daily')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  timeRange === 'daily' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Daily
              </button>
              <button
                onClick={() => setTimeRange('weekly')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  timeRange === 'weekly' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => setTimeRange('monthly')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  timeRange === 'monthly' ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
        </div>

        {/* Recharts AreaChart */}
        <div className="w-full h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                {/* Gold Gradient for Clicks */}
                <linearGradient id="goldClicksGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0.0} />
                </linearGradient>
                {/* Cyan/Sky Gradient for Impressions */}
                <linearGradient id="skyImpressionsGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#38BDF8" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#222733" vertical={false} />
              
              <XAxis
                dataKey="date"
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#2A3441' }}
              />

              <YAxis
                stroke="#6B7280"
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: '#2A3441' }}
                tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: '#0B0F14',
                  borderColor: '#D4AF37',
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.8)',
                  fontSize: '12px',
                  color: '#FFFFFF'
                }}
                labelStyle={{ color: '#F6C453', fontWeight: 'bold', marginBottom: '4px' }}
                formatter={(value: any, name: any) => [
                  Number(value).toLocaleString(),
                  name === 'clicks' ? 'Organic Clicks' : 'Search Impressions'
                ]}
              />

              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => (
                  <span className="text-xs font-semibold text-gray-300 capitalize">
                    {value === 'clicks' ? 'Organic Clicks (Gold)' : 'Search Impressions (Sky)'}
                  </span>
                )}
              />

              {(activeMetric === 'both' || activeMetric === 'impressions') && (
                <Area
                  type="monotone"
                  dataKey="impressions"
                  stroke="#38BDF8"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#skyImpressionsGradient)"
                  activeDot={{ r: 6, fill: '#38BDF8', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              )}

              {(activeMetric === 'both' || activeMetric === 'clicks') && (
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#D4AF37"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#goldClicksGradient)"
                  activeDot={{ r: 7, fill: '#D4AF37', stroke: '#FFFFFF', strokeWidth: 2 }}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>

      </div>

      {/* SECONDARY VISUALIZATIONS ROW: Keyword SERP Distribution & Device Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Keyword SERP Distribution BarChart (Columns 1-7) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111820] border border-[#2A3441] shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div>
              <h3 className="text-base font-bold text-white font-display">Keyword SERP Position Distribution</h3>
              <p className="text-xs text-gray-400">Total 277 monitored commercial & brand search terms</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
              160 in Top 10
            </span>
          </div>

          <div className="w-full h-64 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={KEYWORD_DISTRIBUTION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222733" vertical={false} />
                <XAxis
                  dataKey="rankGroup"
                  stroke="#6B7280"
                  fontSize={10}
                  tickLine={false}
                  axisLine={{ stroke: '#2A3441' }}
                />
                <YAxis
                  stroke="#6B7280"
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: '#2A3441' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B0F14',
                    borderColor: '#2A3441',
                    borderRadius: '10px',
                    fontSize: '12px'
                  }}
                  formatter={(val) => [`${val} Keywords`, 'Count']}
                />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {KEYWORD_DISTRIBUTION_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Device & Channel Traffic PieChart (Columns 8-12) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111820] border border-[#2A3441] shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div>
              <h3 className="text-base font-bold text-white font-display">Device Traffic Share</h3>
              <p className="text-xs text-gray-400">Organic user search distribution</p>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <Smartphone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <Monitor className="w-3.5 h-3.5 text-[#F6C453]" />
            </div>
          </div>

          <div className="w-full h-48 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={DEVICE_SHARE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DEVICE_SHARE_DATA.map((entry, index) => (
                    <Cell key={`cell-donut-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B0F14',
                    borderColor: '#D4AF37',
                    borderRadius: '10px',
                    fontSize: '12px'
                  }}
                  formatter={(val) => [`${val}%`, 'Traffic Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-800 text-center">
            {DEVICE_SHARE_DATA.map((item) => (
              <div key={item.name} className="p-2 rounded-xl bg-black/40 border border-gray-800/80">
                <span className="text-[10px] text-gray-400 uppercase font-semibold block">{item.name}</span>
                <span className="text-sm font-bold text-white font-display">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* CORE WEB VITALS & REAL USER PERFORMANCE MONITORING (RUM) */}
      <div className="p-6 rounded-2xl bg-[#111820] border border-[#2A3441] shadow-xl space-y-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-display">Core Web Vitals & Site Speed Engine</h3>
              <p className="text-xs text-gray-400">Real-time Chrome UX Report (CrUX) and server performance metrics</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-extrabold text-xs">
              Lighthouse Score: 99/100
            </span>
          </div>
        </div>

        {/* 4 Core Web Vitals Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Metric: LCP */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300">LCP (Largest Contentful)</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Good
              </span>
            </div>
            <div className="text-2xl font-black text-white font-display">0.72s</div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '28%' }} />
            </div>
            <span className="text-[10px] text-gray-400 block">Threshold: &lt; 2.5s</span>
          </div>

          {/* Metric: INP / FID */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300">INP (Interaction Next Paint)</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Good
              </span>
            </div>
            <div className="text-2xl font-black text-white font-display">21ms</div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '15%' }} />
            </div>
            <span className="text-[10px] text-gray-400 block">Threshold: &lt; 200ms</span>
          </div>

          {/* Metric: CLS */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300">CLS (Cumulative Layout)</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Good
              </span>
            </div>
            <div className="text-2xl font-black text-white font-display">0.006</div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '8%' }} />
            </div>
            <span className="text-[10px] text-gray-400 block">Threshold: &lt; 0.1</span>
          </div>

          {/* Metric: TTFB */}
          <div className="p-4 rounded-xl bg-black/40 border border-emerald-500/30 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-300">TTFB (Time to First Byte)</span>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                Sub-100ms
              </span>
            </div>
            <div className="text-2xl font-black text-white font-display">84ms</div>
            <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '20%' }} />
            </div>
            <span className="text-[10px] text-gray-400 block">Global Edge CDN Cached</span>
          </div>

        </div>

        {/* Real User Latency Over 24h (LineChart) */}
        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-wider">
              24-Hour Latency & TTFB Stability Trend
            </span>
            <span className="text-[11px] text-gray-500">Global response time avg: 84ms</span>
          </div>

          <div className="w-full h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={CWV_LATENCY_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#222733" vertical={false} />
                <XAxis dataKey="time" stroke="#6B7280" fontSize={11} tickLine={false} />
                <YAxis stroke="#6B7280" fontSize={11} tickLine={false} unit="ms" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0B0F14',
                    borderColor: '#2A3441',
                    borderRadius: '10px',
                    fontSize: '12px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="ttfb"
                  name="TTFB (ms)"
                  stroke="#4ADE80"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#4ADE80' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* TOP SEARCH QUERIES & TOP INDEXED PAGES TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Top Search Queries Table (Columns 1-7) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#111820] border border-[#2A3441] shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-base font-bold text-white font-display">Top Organic Search Queries</h3>
            </div>
            <span className="text-xs text-gray-400">Past 30 Days</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-wider text-[10px]">
                  <th className="pb-2.5 font-bold">Search Query</th>
                  <th className="pb-2.5 font-bold text-right">Clicks</th>
                  <th className="pb-2.5 font-bold text-right">Impressions</th>
                  <th className="pb-2.5 font-bold text-right">CTR</th>
                  <th className="pb-2.5 font-bold text-right">Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {TOP_RANKING_QUERIES.map((row) => (
                  <tr key={row.query} className="hover:bg-white/5 transition-colors">
                    <td className="py-2.5 font-semibold text-white max-w-[200px] truncate">
                      {row.query}
                    </td>
                    <td className="py-2.5 text-right font-mono font-bold text-[#D4AF37]">
                      {row.clicks.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right font-mono text-gray-400">
                      {row.impressions.toLocaleString()}
                    </td>
                    <td className="py-2.5 text-right font-mono text-emerald-400">
                      {row.ctr}
                    </td>
                    <td className="py-2.5 text-right font-mono">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-black/60 border border-gray-800 font-bold text-white">
                        #{row.pos}
                        <span className="text-[10px] text-emerald-400">{row.delta}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Indexed Pages (Columns 8-12) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#111820] border border-[#2A3441] shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#D4AF37]" />
              <h3 className="text-base font-bold text-white font-display">Top Indexed URLs</h3>
            </div>
            <span className="text-xs text-gray-400">SERP Traffic</span>
          </div>

          <div className="space-y-3">
            {TOP_LANDING_PAGES.map((page) => (
              <div
                key={page.url}
                className="p-3 rounded-xl bg-black/40 border border-gray-800 hover:border-[#D4AF37]/40 transition-colors flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">{page.title}</span>
                  <span className="text-[10px] font-mono text-gray-400 block truncate">{page.url}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-[#D4AF37] block">
                    {page.clicks.toLocaleString()} clicks
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 block">
                    CTR {page.ctr}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Sitemap Status */}
          <div className="pt-2 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>XML Sitemap 100% Valid</span>
            </div>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline"
            >
              <span>View sitemap.xml</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
};
