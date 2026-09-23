import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { BrandLogo } from '../common/BrandLogo';
import { DynamicIcon } from '../common/DynamicIcon';
import {
  LayoutDashboard,
  Settings,
  Briefcase,
  Layers,
  MessageSquareQuote,
  Star,
  Mail,
  Share2,
  Palette,
  BarChart3,
  User,
  LogOut,
  Plus,
  Trash2,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  ArrowUpRight,
  ExternalLink,
  Save,
  RotateCcw,
  Sparkles,
  Shield,
  Menu,
  X
} from 'lucide-react';
import {
  PortfolioProject,
  ReviewStatus,
  ServiceItem,
  TestimonialItem,
  UserReview,
  ContactMessage,
  MessageStatus
} from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    adminUser,
    adminLogout,
    setCurrentView,
    activeAdminTab,
    setActiveAdminTab,
    settings,
    updateSettings,
    stats,
    updateStat,
    socialLinks,
    updateSocialLinks,
    services,
    addService,
    updateService,
    deleteService,
    toggleServiceEnabled,
    portfolio,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectFeatured,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    reviews,
    updateReviewStatus,
    toggleReviewFeatured,
    deleteReview,
    messages,
    updateMessageStatus,
    deleteMessage,
    resetToFactoryDefaults
  } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [saveAlert, setSaveAlert] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setSaveAlert(msg);
    setTimeout(() => setSaveAlert(null), 3000);
  };

  // Metrics for overview
  const totalProjects = portfolio.length;
  const totalTestimonials = testimonials.length;
  const totalReviews = reviews.length;
  const totalMessages = messages.length;
  const pendingReviewsCount = reviews.filter(r => r.status === 'Pending').length;
  const newMessagesCount = messages.filter(m => m.status === 'New').length;

  const navItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'settings', label: 'Website Settings', icon: Settings },
    { id: 'services', label: 'Services', icon: Briefcase, badge: services.length },
    { id: 'portfolio', label: 'Portfolio', icon: Layers, badge: portfolio.length },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, badge: testimonials.length },
    { id: 'reviews', label: 'Reviews Moderation', icon: Star, alertBadge: pendingReviewsCount },
    { id: 'messages', label: 'Contact Messages', icon: Mail, alertBadge: newMessagesCount },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'theme', label: 'Theme Settings', icon: Palette },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'profile', label: 'Admin Profile & Backend', icon: User }
  ];

  // Service Edit State
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState<Partial<ServiceItem>>({});

  // Portfolio Edit State
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [projectFormData, setProjectFormData] = useState<Partial<PortfolioProject>>({});

  // Testimonial Edit State
  const [editingTestimonialId, setEditingTestimonialId] = useState<string | null>(null);
  const [testimonialFormData, setTestimonialFormData] = useState<Partial<TestimonialItem>>({});

  // Contact Message Viewer
  const [activeMessageDetail, setActiveMessageDetail] = useState<ContactMessage | null>(null);

  // Settings form local buffer
  const [localSettings, setLocalSettings] = useState(settings);

  return (
    <div className="min-h-screen bg-[#090a0d] text-gray-200 flex flex-col antialiased">
      
      {/* Top Navbar */}
      <header className="h-16 border-b border-gray-800 bg-[#0e0f14] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-lg border border-gray-700 text-gray-300 md:hidden"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <BrandLogo size="sm" onClick={() => setCurrentView('public')} />

          <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-gray-800 text-xs text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Admin Control Center</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveAlert && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-xs font-semibold animate-in fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{saveAlert}</span>
            </div>
          )}

          <button
            onClick={() => setCurrentView('public')}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-gray-700 hover:border-[#d4af37]/50 text-xs font-medium text-gray-300 hover:text-white transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Live Website</span>
          </button>

          <button
            onClick={adminLogout}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 border border-red-800/60 text-xs font-semibold text-red-200 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Sidebar Desktop / Mobile */}
        <aside
          className={`w-64 border-r border-gray-800 bg-[#0c0d12] flex flex-col justify-between shrink-0 transition-all z-30 ${
            mobileSidebarOpen
              ? 'fixed inset-y-16 left-0 shadow-2xl z-50'
              : 'hidden md:flex'
          }`}
        >
          <div className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-8rem)]">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
              Agency Management
            </div>

            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = activeAdminTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveAdminTab(item.id);
                    setMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black shadow-md font-bold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>

                  {item.alertBadge && item.alertBadge > 0 ? (
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? 'bg-black text-[#d4af37]' : 'bg-amber-500 text-black'}`}>
                      {item.alertBadge}
                    </span>
                  ) : item.badge !== undefined ? (
                    <span className={`text-[10px] ${isActive ? 'text-black/70' : 'text-gray-600'}`}>
                      {item.badge}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Sidebar Bottom User Bar */}
          <div className="p-4 border-t border-gray-800/80 bg-[#090a0d]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#d4af37]/60 bg-black flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(212,175,55,0.35)]">
                <img src="/logo.png" alt="Admin Logo" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-white truncate">
                  {adminUser?.username || 'Super Admin'}
                </div>
                <div className="text-[10px] text-gray-400 truncate">
                  marketingtycoons.tech
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-h-[calc(100vh-4rem)]">
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* 1. SECTION: DASHBOARD OVERVIEW */}
            {activeAdminTab === 'overview' && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    Executive Overview
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-400 mt-1">
                    Real-time operational metrics for Marketing Tycoons.
                  </p>
                </div>

                {/* 6 Key Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="p-4 rounded-2xl bg-[#121319] border border-gray-800">
                    <span className="text-[11px] text-gray-400 font-medium">Projects</span>
                    <div className="text-2xl font-bold text-white mt-1">{totalProjects}</div>
                    <span className="text-[10px] text-[#d4af37]">Live in portfolio</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#121319] border border-gray-800">
                    <span className="text-[11px] text-gray-400 font-medium">Services</span>
                    <div className="text-2xl font-bold text-white mt-1">{services.length}</div>
                    <span className="text-[10px] text-emerald-400">All active</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#121319] border border-gray-800">
                    <span className="text-[11px] text-gray-400 font-medium">Testimonials</span>
                    <div className="text-2xl font-bold text-white mt-1">{totalTestimonials}</div>
                    <span className="text-[10px] text-gray-400">Published</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#121319] border border-gray-800">
                    <span className="text-[11px] text-gray-400 font-medium">Total Reviews</span>
                    <div className="text-2xl font-bold text-white mt-1">{totalReviews}</div>
                    <span className="text-[10px] text-gray-400">User submissions</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#121319] border border-amber-900/40 bg-amber-950/10">
                    <span className="text-[11px] text-amber-400 font-medium">Pending Reviews</span>
                    <div className="text-2xl font-bold text-amber-300 mt-1">{pendingReviewsCount}</div>
                    <span className="text-[10px] text-amber-400">Requires review</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#121319] border border-[#d4af37]/30 bg-[#d4af37]/5">
                    <span className="text-[11px] text-[#d4af37] font-medium">Contact Messages</span>
                    <div className="text-2xl font-bold text-white mt-1">{totalMessages}</div>
                    <span className="text-[10px] text-emerald-400">{newMessagesCount} New inquiries</span>
                  </div>
                </div>

                {/* Recent Messages & Quick Review Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Recent Contact Submissions */}
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#d4af37]" />
                        <span>Recent Client Inquiries</span>
                      </h3>
                      <button
                        onClick={() => setActiveAdminTab('messages')}
                        className="text-xs text-[#d4af37] hover:underline"
                      >
                        View All ({messages.length})
                      </button>
                    </div>

                    <div className="space-y-3">
                      {messages.slice(0, 3).map(msg => (
                        <div
                          key={msg.id}
                          onClick={() => {
                            setActiveMessageDetail(msg);
                            if (msg.status === 'New') updateMessageStatus(msg.id, 'Read');
                          }}
                          className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-gray-800/80 cursor-pointer transition-colors"
                        >
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="font-bold text-white">{msg.name}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              msg.status === 'New' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-800 text-gray-400'
                            }`}>
                              {msg.status}
                            </span>
                          </div>
                          <div className="text-[11px] text-gray-400 line-clamp-1">{msg.message}</div>
                          <div className="text-[10px] text-gray-500 mt-1">{msg.service} • {new Date(msg.createdAt).toLocaleDateString()}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pending Reviews Moderation Queue */}
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white flex items-center gap-2">
                        <Star className="w-4 h-4 text-[#d4af37]" />
                        <span>Pending Reviews Queue</span>
                      </h3>
                      <button
                        onClick={() => setActiveAdminTab('reviews')}
                        className="text-xs text-[#d4af37] hover:underline"
                      >
                        Manage Reviews
                      </button>
                    </div>

                    <div className="space-y-3">
                      {reviews.filter(r => r.status === 'Pending').length === 0 ? (
                        <div className="py-8 text-center text-xs text-gray-400">
                          <CheckCircle className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                          <span>All submitted reviews have been moderated.</span>
                        </div>
                      ) : (
                        reviews
                          .filter(r => r.status === 'Pending')
                          .slice(0, 3)
                          .map(rev => (
                            <div key={rev.id} className="p-3.5 rounded-xl bg-white/5 border border-amber-900/40">
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-bold text-white">{rev.name}</span>
                                <span className="text-[#d4af37] flex items-center gap-0.5">
                                  ★ {rev.rating}/5
                                </span>
                              </div>
                              <p className="text-[11px] text-gray-300 line-clamp-2 italic mb-2">
                                "{rev.review}"
                              </p>
                              <div className="flex items-center gap-2 pt-2 border-t border-gray-800">
                                <button
                                  onClick={() => {
                                    updateReviewStatus(rev.id, 'Approved');
                                    showNotification('Review approved!');
                                  }}
                                  className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-[10px] font-semibold"
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => {
                                    updateReviewStatus(rev.id, 'Rejected');
                                    showNotification('Review rejected.');
                                  }}
                                  className="px-2.5 py-1 rounded bg-red-500/20 text-red-300 hover:bg-red-500/30 text-[10px] font-semibold"
                                >
                                  Reject
                                </button>
                              </div>
                            </div>
                          ))
                      )}
                    </div>
                  </div>
                </div>

                {/* System Reset & Factory Default Card */}
                <div className="p-5 rounded-2xl bg-white/5 border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                  <div>
                    <span className="font-bold text-white">Need to reset demo changes?</span>
                    <p className="text-gray-400">Restore all initial agency services, projects, stats, and configurations.</p>
                  </div>
                  <button
                    onClick={() => {
                      if (confirm('Reset all website data to initial defaults?')) {
                        resetToFactoryDefaults();
                        showNotification('Restored to initial agency defaults.');
                      }
                    }}
                    className="px-4 py-2 rounded-xl border border-gray-700 hover:border-red-500/50 text-gray-300 hover:text-red-400 transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
              </div>
            )}

            {/* 2. SECTION: WEBSITE SETTINGS */}
            {activeAdminTab === 'settings' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Website Settings</h2>
                    <p className="text-xs text-gray-400">Manage brand identity, contact points, and hero copywriting.</p>
                  </div>
                  <button
                    onClick={() => {
                      updateSettings(localSettings);
                      showNotification('Settings saved successfully!');
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase cursor-pointer"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Changes</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* General Brand Details */}
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Brand Details</h3>
                    
                    {/* Official Company Logo Display */}
                    <div className="p-4 rounded-xl bg-black/60 border border-gray-800 flex items-center gap-4">
                      <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#d4af37]/60 bg-black shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                        <img src="/logo.png" alt="Company Logo" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Official Brand Logo Emblem</div>
                        <p className="text-[11px] text-gray-400">Metallic MT crest with wolf and lion heads.</p>
                        <span className="text-[10px] text-[#d4af37] font-mono">/logo.png (Active)</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Company Name</label>
                      <input
                        type="text"
                        value={localSettings.companyName}
                        onChange={e => setLocalSettings({ ...localSettings, companyName: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Brand Tagline</label>
                      <input
                        type="text"
                        value={localSettings.tagline}
                        onChange={e => setLocalSettings({ ...localSettings, tagline: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Primary Email</label>
                      <input
                        type="email"
                        value={localSettings.primaryEmail}
                        onChange={e => setLocalSettings({ ...localSettings, primaryEmail: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">WhatsApp Direct Number</label>
                      <input
                        type="text"
                        value={localSettings.whatsappNumber}
                        onChange={e => setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">WeChat Official ID</label>
                      <input
                        type="text"
                        value={localSettings.wechatId}
                        onChange={e => setLocalSettings({ ...localSettings, wechatId: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Headquarters / Physical Address</label>
                      <input
                        type="text"
                        value={localSettings.address}
                        onChange={e => setLocalSettings({ ...localSettings, address: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white"
                      />
                    </div>
                  </div>

                  {/* Hero Copy & CTAs */}
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Hero Section Content</h3>
                    
                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Hero Description</label>
                      <textarea
                        rows={3}
                        value={localSettings.heroDescription}
                        onChange={e => setLocalSettings({ ...localSettings, heroDescription: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white resize-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Primary CTA Label</label>
                        <input
                          type="text"
                          value={localSettings.primaryCtaText}
                          onChange={e => setLocalSettings({ ...localSettings, primaryCtaText: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-gray-300 mb-1">Secondary CTA Label</label>
                        <input
                          type="text"
                          value={localSettings.secondaryCtaText}
                          onChange={e => setLocalSettings({ ...localSettings, secondaryCtaText: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1">Footer Mission Text</label>
                      <textarea
                        rows={3}
                        value={localSettings.footerText}
                        onChange={e => setLocalSettings({ ...localSettings, footerText: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white resize-none"
                      />
                    </div>
                  </div>

                  {/* Cinematic Video & Visual Experience Controls (Requirement 22) */}
                  <div className="md:col-span-2 p-6 rounded-2xl bg-[#121319] border border-[#d4af37]/40 space-y-6">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-800">
                      <div>
                        <h3 className="text-base font-bold text-white flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[#d4af37]" />
                          <span>Cinematic Media & Video Experience Controls</span>
                        </h3>
                        <p className="text-xs text-gray-400">Configure 4K-style video loops, posters, and toggles for high-impact visual sections.</p>
                      </div>
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/40">
                        Cosix-Grade Visuals
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Hero Video Controls */}
                      <div className="p-4 rounded-xl bg-black/60 border border-gray-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Hero Section Video</h4>
                          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                            <input
                              type="checkbox"
                              checked={localSettings.heroVideoEnabled !== false}
                              onChange={e => setLocalSettings({ ...localSettings, heroVideoEnabled: e.target.checked })}
                              className="rounded border-gray-700 text-[#d4af37] focus:ring-[#d4af37]"
                            />
                            <span>Enable Video</span>
                          </label>
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Hero Video URL (.mp4 / stream)</label>
                          <input
                            type="text"
                            value={localSettings.heroVideoUrl || ''}
                            onChange={e => setLocalSettings({ ...localSettings, heroVideoUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090a0d] border border-gray-700 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Hero Poster Image URL (pre-load fallback)</label>
                          <input
                            type="text"
                            value={localSettings.heroVideoPoster || ''}
                            onChange={e => setLocalSettings({ ...localSettings, heroVideoPoster: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090a0d] border border-gray-700 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* Full-Width Showcase Video Controls */}
                      <div className="p-4 rounded-xl bg-black/60 border border-gray-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Full-Width Showcase Section</h4>
                          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                            <input
                              type="checkbox"
                              checked={localSettings.fullWidthVideoEnabled !== false}
                              onChange={e => setLocalSettings({ ...localSettings, fullWidthVideoEnabled: e.target.checked })}
                              className="rounded border-gray-700 text-[#d4af37] focus:ring-[#d4af37]"
                            />
                            <span>Enable Video</span>
                          </label>
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Showcase Video URL</label>
                          <input
                            type="text"
                            value={localSettings.fullWidthVideoUrl || ''}
                            onChange={e => setLocalSettings({ ...localSettings, fullWidthVideoUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090a0d] border border-gray-700 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Showcase Poster Image URL</label>
                          <input
                            type="text"
                            value={localSettings.fullWidthVideoPoster || ''}
                            onChange={e => setLocalSettings({ ...localSettings, fullWidthVideoPoster: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090a0d] border border-gray-700 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* About Studio Video Controls */}
                      <div className="p-4 rounded-xl bg-black/60 border border-gray-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">About Studio Visual Panel</h4>
                          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                            <input
                              type="checkbox"
                              checked={localSettings.aboutVideoEnabled !== false}
                              onChange={e => setLocalSettings({ ...localSettings, aboutVideoEnabled: e.target.checked })}
                              className="rounded border-gray-700 text-[#d4af37] focus:ring-[#d4af37]"
                            />
                            <span>Enable Video</span>
                          </label>
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">About Studio Video URL</label>
                          <input
                            type="text"
                            value={localSettings.aboutVideoUrl || ''}
                            onChange={e => setLocalSettings({ ...localSettings, aboutVideoUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090a0d] border border-gray-700 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">About Poster Image URL</label>
                          <input
                            type="text"
                            value={localSettings.aboutVideoPoster || ''}
                            onChange={e => setLocalSettings({ ...localSettings, aboutVideoPoster: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090a0d] border border-gray-700 text-xs text-white"
                          />
                        </div>
                      </div>

                      {/* CTA Section Video Controls */}
                      <div className="p-4 rounded-xl bg-black/60 border border-gray-800 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-white">Bottom CTA Cinematic Section</h4>
                          <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-300">
                            <input
                              type="checkbox"
                              checked={localSettings.ctaVideoEnabled !== false}
                              onChange={e => setLocalSettings({ ...localSettings, ctaVideoEnabled: e.target.checked })}
                              className="rounded border-gray-700 text-[#d4af37] focus:ring-[#d4af37]"
                            />
                            <span>Enable Video</span>
                          </label>
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">CTA Video URL</label>
                          <input
                            type="text"
                            value={localSettings.ctaVideoUrl || ''}
                            onChange={e => setLocalSettings({ ...localSettings, ctaVideoUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090a0d] border border-gray-700 text-xs text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">CTA Poster Image URL</label>
                          <input
                            type="text"
                            value={localSettings.ctaVideoPoster || ''}
                            onChange={e => setLocalSettings({ ...localSettings, ctaVideoPoster: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[#090a0d] border border-gray-700 text-xs text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SECTION: SERVICES MANAGEMENT */}
            {activeAdminTab === 'services' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Services Management</h2>
                    <p className="text-xs text-gray-400">Configure titles, descriptions, icons, pricing, and active status.</p>
                  </div>
                  <button
                    onClick={() => {
                      const newTitle = prompt('Enter new service title:');
                      if (newTitle) {
                        addService({
                          title: newTitle,
                          shortDescription: 'Comprehensive tailored agency solution.',
                          fullDescription: 'Full end-to-end strategy, execution and reporting.',
                          iconName: 'Sparkles',
                          enabled: true,
                          features: ['Consultation', 'Execution', 'Analytics'],
                          deliverables: ['Production deliverables', 'Dedicated account strategist'],
                          startingPrice: '$1,000'
                        });
                        showNotification('New service added!');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {services.map(srv => (
                    <div
                      key={srv.id}
                      className="p-5 rounded-2xl bg-[#121319] border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                          <DynamicIcon name={srv.iconName} className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm font-bold text-white">{srv.title}</h4>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                              srv.enabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-800 text-gray-500'
                            }`}>
                              {srv.enabled ? 'Active' : 'Disabled'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{srv.shortDescription}</p>
                          <span className="text-[11px] text-[#d4af37] font-medium">{srv.startingPrice || 'Custom Price'}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center">
                        <button
                          onClick={() => {
                            const newPrice = prompt('Update starting price:', srv.startingPrice || '$1,000');
                            if (newPrice !== null) {
                              updateService(srv.id, { startingPrice: newPrice });
                              showNotification('Service price updated');
                            }
                          }}
                          className="px-3 py-1.5 rounded-lg border border-gray-700 text-xs text-gray-300 hover:text-white"
                        >
                          Price
                        </button>

                        <button
                          onClick={() => {
                            toggleServiceEnabled(srv.id);
                            showNotification(`Service ${srv.enabled ? 'disabled' : 'enabled'}`);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-gray-700 text-xs text-gray-300 hover:text-white"
                        >
                          {srv.enabled ? 'Disable' : 'Enable'}
                        </button>

                        <button
                          onClick={() => {
                            if (confirm(`Delete service "${srv.title}"?`)) {
                              deleteService(srv.id);
                              showNotification('Service deleted');
                            }
                          }}
                          className="p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. SECTION: PORTFOLIO MANAGEMENT */}
            {activeAdminTab === 'portfolio' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Portfolio Projects</h2>
                    <p className="text-xs text-gray-400">Add, edit, or feature projects in the public showcase grid.</p>
                  </div>
                  <button
                    onClick={() => {
                      const title = prompt('Project Title:');
                      if (title) {
                        addProject({
                          title,
                          category: 'Websites',
                          shortDescription: 'High performance enterprise solution engineered for high conversion.',
                          fullDescription: 'Custom architecture, responsive design system, and analytics integration.',
                          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1000&q=80',
                          videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
                          status: 'Live Project',
                          featured: true,
                          clientName: 'Enterprise Client',
                          completionDate: '2026',
                          tags: ['Design', 'Development'],
                          servicesProvided: ['Website Development', 'UI/UX Design', 'Responsive Development']
                        });
                        showNotification('Project added to portfolio!');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Project</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {portfolio.map(proj => (
                    <div
                      key={proj.id}
                      className="rounded-2xl bg-[#121319] border border-gray-800 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative aspect-[16/10] bg-black">
                        <img src={proj.imageUrl} alt={proj.title} className="w-full h-full object-cover" />
                        <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-[#d4af37]">
                          {proj.category}
                        </span>
                        {proj.featured && (
                          <span className="absolute top-3 right-3 px-2 py-0.5 rounded text-[10px] font-bold bg-[#d4af37] text-black">
                            Featured
                          </span>
                        )}
                      </div>

                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-white">{proj.title}</h4>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{proj.shortDescription}</p>
                        </div>

                        <div className="pt-4 mt-4 border-t border-gray-800 flex items-center justify-between">
                          <button
                            onClick={() => {
                              toggleProjectFeatured(proj.id);
                              showNotification(`Toggled featured status for ${proj.title}`);
                            }}
                            className={`text-xs px-2.5 py-1 rounded font-semibold ${
                              proj.featured ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-gray-800 text-gray-400'
                            }`}
                          >
                            {proj.featured ? '★ Featured' : '☆ Unfeatured'}
                          </button>

                          <button
                            onClick={() => {
                              if (confirm(`Delete project "${proj.title}"?`)) {
                                deleteProject(proj.id);
                                showNotification('Project removed');
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-950/40 text-red-300 hover:bg-red-900/60"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. SECTION: TESTIMONIALS MANAGEMENT */}
            {activeAdminTab === 'testimonials' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Client Testimonials</h2>
                    <p className="text-xs text-gray-400">Manage client feedback cards and spotlight quotes.</p>
                  </div>
                  <button
                    onClick={() => {
                      const name = prompt('Client Name:');
                      const company = prompt('Company Name:');
                      const review = prompt('Review quote:');
                      if (name && review) {
                        addTestimonial({
                          name,
                          company: company || 'Corporate Client',
                          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
                          rating: 5,
                          review,
                          featured: true,
                          approved: true,
                          date: 'Current'
                        });
                        showNotification('Testimonial added!');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Testimonial</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {testimonials.map(item => (
                    <div
                      key={item.id}
                      className="p-5 rounded-2xl bg-[#121319] border border-gray-800 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[#d4af37] text-xs">{'★'.repeat(item.rating)}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded ${
                            item.approved ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-800 text-gray-400'
                          }`}>
                            {item.approved ? 'Approved' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 italic mb-4 leading-relaxed">
                          "{item.review}"
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gray-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img src={item.avatarUrl} alt={item.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <div className="text-xs font-bold text-white">{item.name}</div>
                            <div className="text-[10px] text-gray-400">{item.company}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              updateTestimonial(item.id, { approved: !item.approved });
                              showNotification(`Testimonial ${item.approved ? 'hidden' : 'approved'}`);
                            }}
                            className="text-xs px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-gray-300"
                          >
                            {item.approved ? 'Hide' : 'Publish'}
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete testimonial from ${item.name}?`)) {
                                deleteTestimonial(item.id);
                                showNotification('Testimonial removed');
                              }
                            }}
                            className="p-1.5 rounded bg-red-950/40 text-red-300"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. SECTION: REVIEWS MODERATION */}
            {activeAdminTab === 'reviews' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">Public Reviews Moderation</h2>
                  <p className="text-xs text-gray-400">Only approved reviews appear publicly on the agency website.</p>
                </div>

                <div className="space-y-3">
                  {reviews.map(rev => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-[#121319] border border-gray-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-white">{rev.name}</span>
                          <span className="text-xs text-gray-400">({rev.email})</span>
                          <span className="text-xs text-[#d4af37]">{'★'.repeat(rev.rating)}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            rev.status === 'Approved'
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-800/50'
                              : rev.status === 'Rejected'
                              ? 'bg-red-500/20 text-red-300 border border-red-800/50'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-800/50'
                          }`}>
                            {rev.status}
                          </span>
                        </div>
                        <p className="text-xs text-gray-300 italic">"{rev.review}"</p>
                        <div className="text-[10px] text-gray-500">{rev.serviceUsed} • {rev.createdAt}</div>
                      </div>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {rev.status !== 'Approved' && (
                          <button
                            onClick={() => {
                              updateReviewStatus(rev.id, 'Approved');
                              showNotification('Review approved!');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/30"
                          >
                            Approve
                          </button>
                        )}
                        {rev.status !== 'Rejected' && (
                          <button
                            onClick={() => {
                              updateReviewStatus(rev.id, 'Rejected');
                              showNotification('Review rejected.');
                            }}
                            className="px-3 py-1.5 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-semibold hover:bg-amber-500/30"
                          >
                            Reject
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm('Delete review permanently?')) {
                              deleteReview(rev.id);
                              showNotification('Review deleted.');
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/40 text-red-300 hover:bg-red-900/60"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. SECTION: CONTACT MESSAGES */}
            {activeAdminTab === 'messages' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Client Inquiries & Messages</h2>
                    <p className="text-xs text-gray-400">All inquiries received via the contact form are logged securely.</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#d4af37]/15 text-[#d4af37] font-semibold border border-[#d4af37]/30">
                    {messages.length} Messages Logged
                  </span>
                </div>

                <div className="rounded-2xl bg-[#121319] border border-gray-800 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#090a0d] border-b border-gray-800 text-gray-400 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-4">Sender Name</th>
                          <th className="p-4">Email / Phone</th>
                          <th className="p-4">Service</th>
                          <th className="p-4">Date</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-800/60">
                        {messages.map(msg => (
                          <tr key={msg.id} className="hover:bg-white/5 transition-colors">
                            <td className="p-4 font-bold text-white">{msg.name}</td>
                            <td className="p-4 text-gray-300">
                              <div>{msg.email}</div>
                              <div className="text-[10px] text-gray-500">{msg.phone}</div>
                            </td>
                            <td className="p-4 text-gray-300">{msg.service}</td>
                            <td className="p-4 text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</td>
                            <td className="p-4">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                msg.status === 'New' ? 'bg-emerald-500/20 text-emerald-300' :
                                msg.status === 'Read' ? 'bg-blue-500/20 text-blue-300' :
                                msg.status === 'Replied' ? 'bg-purple-500/20 text-purple-300' :
                                'bg-gray-800 text-gray-400'
                              }`}>
                                {msg.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button
                                onClick={() => {
                                  setActiveMessageDetail(msg);
                                  if (msg.status === 'New') updateMessageStatus(msg.id, 'Read');
                                }}
                                className="px-3 py-1.5 rounded-lg bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 font-semibold"
                              >
                                Open
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Message Detail Modal */}
                {activeMessageDetail && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                    <div className="w-full max-w-lg rounded-3xl bg-[#121319] border border-[#d4af37]/40 p-6 sm:p-8 space-y-4">
                      <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                        <h3 className="font-display text-lg font-bold text-white">Inquiry Details</h3>
                        <button onClick={() => setActiveMessageDetail(null)} className="text-gray-400 hover:text-white">
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div><strong className="text-gray-400">From:</strong> <span className="text-white font-bold">{activeMessageDetail.name}</span></div>
                        <div><strong className="text-gray-400">Email:</strong> <a href={`mailto:${activeMessageDetail.email}`} className="text-[#d4af37] underline">{activeMessageDetail.email}</a></div>
                        <div><strong className="text-gray-400">Phone:</strong> <span className="text-gray-200">{activeMessageDetail.phone}</span></div>
                        <div><strong className="text-gray-400">Service:</strong> <span className="text-gray-200">{activeMessageDetail.service}</span></div>
                        <div><strong className="text-gray-400">Received:</strong> <span className="text-gray-400">{new Date(activeMessageDetail.createdAt).toLocaleString()}</span></div>
                      </div>

                      <div className="p-4 rounded-xl bg-black/50 border border-gray-800 text-xs text-gray-200 whitespace-pre-wrap leading-relaxed">
                        {activeMessageDetail.message}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                        <div className="flex items-center gap-2">
                          {(['New', 'Read', 'Replied', 'Archived'] as MessageStatus[]).map(st => (
                            <button
                              key={st}
                              onClick={() => {
                                updateMessageStatus(activeMessageDetail.id, st);
                                setActiveMessageDetail({ ...activeMessageDetail, status: st });
                                showNotification(`Status set to ${st}`);
                              }}
                              className={`px-2 py-1 rounded text-[10px] font-semibold ${
                                activeMessageDetail.status === st ? 'bg-[#d4af37] text-black font-bold' : 'bg-white/5 text-gray-400'
                              }`}
                            >
                              {st}
                            </button>
                          ))}
                        </div>

                        <a
                          href={`mailto:${activeMessageDetail.email}?subject=Regarding Your Inquiry with Marketing Tycoons`}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs"
                        >
                          Reply via Email
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 8. SECTION: SOCIAL MEDIA */}
            {activeAdminTab === 'social' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Social Media Channels</h2>
                    <p className="text-xs text-gray-400">Links left empty are automatically disabled on the public footer.</p>
                  </div>
                  <button
                    onClick={() => {
                      updateSocialLinks(socialLinks);
                      showNotification('Social links saved!');
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Links</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {(Object.keys(socialLinks) as Array<keyof typeof socialLinks>).map(key => (
                    <div key={key}>
                      <label className="block text-xs font-semibold text-gray-300 capitalize mb-1">
                        {key} URL
                      </label>
                      <input
                        type="url"
                        value={socialLinks[key]}
                        onChange={e => updateSocialLinks({ [key]: e.target.value })}
                        placeholder={`https://${key}.com/marketingtycoons`}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 9. SECTION: THEME SETTINGS */}
            {activeAdminTab === 'theme' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">Theme & Visual Styling</h2>
                  <p className="text-xs text-gray-400">Marketing Tycoons brand styling rules and color palette overview.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-5 rounded-2xl bg-[#090a0d] border border-[#d4af37]/40 space-y-2">
                    <span className="text-xs uppercase text-[#d4af37] font-bold">Metallic Gold Accent</span>
                    <div className="h-10 rounded-lg bg-gradient-to-r from-[#f7d57f] via-[#d4af37] to-[#aa820a]" />
                    <div className="text-[11px] text-gray-400 font-mono">#D4AF37 / #C5A059</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#121319] border border-gray-800 space-y-2">
                    <span className="text-xs uppercase text-gray-300 font-bold">Primary Dark Canvas</span>
                    <div className="h-10 rounded-lg bg-[#0b0c10] border border-gray-700" />
                    <div className="text-[11px] text-gray-400 font-mono">#0B0C10 / #111217</div>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#121319] border border-gray-800 space-y-2">
                    <span className="text-xs uppercase text-gray-300 font-bold">Typography System</span>
                    <div className="h-10 rounded-lg bg-black/60 flex items-center px-3 text-xs font-display font-bold text-white">
                      Syne + Plus Jakarta Sans
                    </div>
                    <div className="text-[11px] text-gray-400">High luxury editorial pairing</div>
                  </div>
                </div>
              </div>
            )}

            {/* 10. SECTION: STATISTICS */}
            {activeAdminTab === 'stats' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">Statistics Strip</h2>
                  <p className="text-xs text-gray-400">Agency marketing performance metrics displayed below the hero.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {stats.map(st => (
                    <div key={st.id} className="p-5 rounded-2xl bg-[#121319] border border-gray-800 space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Metric Value</label>
                        <input
                          type="text"
                          value={st.number}
                          onChange={e => updateStat(st.id, e.target.value, st.label)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-lg font-bold text-[#d4af37]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-400 mb-1">Label</label>
                        <input
                          type="text"
                          value={st.label}
                          onChange={e => updateStat(st.id, st.number, e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-xs text-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 11. SECTION: ADMIN PROFILE & FIREBASE BACKEND */}
            {activeAdminTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">Admin Security & Firebase Backend</h2>
                  <p className="text-xs text-gray-400">Real-time Cloud Firestore database status, Google legal authentication, and access control.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Admin Credentials & Session */}
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Active Admin Session</h3>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        Authenticated
                      </span>
                    </div>
                    <div className="text-xs text-gray-300 space-y-2">
                      <div className="flex justify-between py-1.5 border-b border-gray-800">
                        <span className="text-gray-400">Admin Identifier</span>
                        <span className="font-semibold text-white">{adminUser?.username}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-800">
                        <span className="text-gray-400">Authorized Email</span>
                        <span className="font-semibold text-[#d4af37]">{adminUser?.email}</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-800">
                        <span className="text-gray-400">Privilege Tier</span>
                        <span className="font-semibold text-white">{adminUser?.role}</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-gray-400">Session Status</span>
                        <span className="font-semibold text-white">{adminUser?.lastLogin || 'Active Live Session'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Firebase Cloud Firestore Status */}
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Firebase Firestore Engine</h3>
                      <span className="px-2.5 py-1 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-[10px] font-bold uppercase">
                        Cloud Connected
                      </span>
                    </div>
                    <div className="text-xs text-gray-300 space-y-2">
                      <div className="flex justify-between py-1.5 border-b border-gray-800">
                        <span className="text-gray-400">Project ID</span>
                        <span className="font-mono text-white text-[11px]">gen-lang-client-0582688920</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-800">
                        <span className="text-gray-400">Auth Method</span>
                        <span className="font-semibold text-white">Google OAuth (Firebase Auth)</span>
                      </div>
                      <div className="flex justify-between py-1.5 border-b border-gray-800">
                        <span className="text-gray-400">Database Sync</span>
                        <span className="text-emerald-400 font-semibold">Real-Time (onSnapshot)</span>
                      </div>
                      <div className="flex justify-between py-1.5">
                        <span className="text-gray-400">Security Rules</span>
                        <span className="text-white font-semibold">Deployed & Enforced</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Firestore Collections Overview */}
                <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">
                    Live Synced Collections
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-[#090a0d] border border-gray-800">
                      <div className="text-[10px] uppercase font-bold text-gray-500">services</div>
                      <div className="text-lg font-bold text-white mt-1">{services.length} Records</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">Auto-synced</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#090a0d] border border-gray-800">
                      <div className="text-[10px] uppercase font-bold text-gray-500">portfolio</div>
                      <div className="text-lg font-bold text-white mt-1">{portfolio.length} Projects</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">Auto-synced</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#090a0d] border border-gray-800">
                      <div className="text-[10px] uppercase font-bold text-gray-500">reviews</div>
                      <div className="text-lg font-bold text-white mt-1">{reviews.length} Reviews</div>
                      <div className="text-[10px] text-amber-400 mt-0.5">{pendingReviewsCount} Pending</div>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#090a0d] border border-gray-800">
                      <div className="text-[10px] uppercase font-bold text-gray-500">messages</div>
                      <div className="text-lg font-bold text-white mt-1">{messages.length} Leads</div>
                      <div className="text-[10px] text-sky-400 mt-0.5">{newMessagesCount} Unread</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>
    </div>
  );
};
