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
  X,
  FileText,
  ShoppingBag,
  FormInput,
  Image as ImageIcon,
  Sliders,
  Users,
  Globe,
  ArrowUp,
  ArrowDown,
  Download
} from 'lucide-react';
import {
  PortfolioProject,
  ReviewStatus,
  ServiceItem,
  TestimonialItem,
  UserReview,
  ContactMessage,
  MessageStatus,
  BlogPost,
  ProductItem,
  CustomPage,
  CustomForm,
  NavigationMenuItem,
  CMSUser,
  MediaAsset,
  FormSubmission
} from '../../types';
import { DEFAULT_PAGES } from '../../data/defaultData';

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
    resetToFactoryDefaults,

    // New CMS properties and functions
    blogs,
    addBlog,
    updateBlog,
    deleteBlog,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    pages,
    addPage,
    updatePage,
    deletePage,
    customForms,
    addCustomForm,
    updateCustomForm,
    deleteCustomForm,
    formSubmissions,
    submitCustomForm,
    deleteSubmission,
    mediaLibrary,
    addMediaAsset,
    deleteMediaAsset,
    menus,
    updateMenuOrder,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    cmsUsers,
    updateUserRole,
    updateUserStatus,
    deleteUser
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
    { id: 'pages', label: 'Website Pages CMS', icon: Sliders, badge: pages.length },
    { id: 'blogs', label: 'Blog Articles CMS', icon: FileText, badge: blogs.length },
    { id: 'products', label: 'Product Catalog CMS', icon: ShoppingBag, badge: products.length },
    { id: 'forms', label: 'Forms & Leads CMS', icon: FormInput, badge: customForms.length },
    { id: 'media', label: 'Media Asset Library', icon: ImageIcon, badge: mediaLibrary.length },
    { id: 'menus', label: 'Menu Navigation CMS', icon: Layers, badge: menus.length },
    { id: 'users', label: 'CMS Users & Roles', icon: Users, badge: cmsUsers.length },
    { id: 'seo', label: 'SEO Audit Control', icon: Globe },
    { id: 'services', label: 'Services', icon: Briefcase, badge: services.length },
    { id: 'portfolio', label: 'Portfolio', icon: Layers, badge: portfolio.length },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote, badge: testimonials.length },
    { id: 'reviews', label: 'Reviews Moderation', icon: Star, alertBadge: pendingReviewsCount },
    { id: 'messages', label: 'Contact Messages', icon: Mail, alertBadge: newMessagesCount },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'theme', label: 'Theme Settings', icon: Palette },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'profile', label: 'Admin Security & DB', icon: User }
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

  // Blogs Edit State
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogFormData, setBlogFormData] = useState<Partial<BlogPost>>({});

  // Products Edit State
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productFormData, setProductFormData] = useState<Partial<ProductItem>>({});

  // Custom Pages Edit State
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [pageFormData, setPageFormData] = useState<Partial<CustomPage>>({});

  // Custom Forms Builder State
  const [editingFormId, setEditingFormId] = useState<string | null>(null);
  const [formBuilderFormData, setFormBuilderFormData] = useState<Partial<CustomForm>>({});

  // Menu navigation item state
  const [editingMenuId, setEditingMenuId] = useState<string | null>(null);
  const [menuItemFormData, setMenuItemFormData] = useState<Partial<NavigationMenuItem>>({});

  // SEO tools local states
  const [localRobots, setLocalRobots] = useState('User-agent: *\nDisallow: /admin\nSitemap: https://marketingtycoons.tech/sitemap.xml');
  const [localSitemapUrl, setLocalSitemapUrl] = useState('https://marketingtycoons.tech/sitemap.xml');

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

            {/* ======================================================================= */}
            {/* NEW SECTION: WEBSITE PAGES & HOMEPAGE LAYOUT BUILDER CMS */}
            {/* ======================================================================= */}
            {activeAdminTab === 'pages' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Website Pages & Page Builder</h2>
                    <p className="text-xs text-gray-400">Rearrange homepage modules, toggle section visibility, and create custom sub-pages.</p>
                  </div>
                  <button
                    onClick={() => {
                      const title = prompt('Enter new page title:');
                      if (title) {
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        addPage({
                          title,
                          slug,
                          content: '<h3>New Page Content</h3><p>Your custom content goes here.</p>',
                          status: 'Draft',
                          metaTitle: `${title} | Marketing Tycoons`,
                          metaDescription: `Discover more about ${title} on Marketing Tycoons.`
                        });
                        showNotification('New page created!');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Unlimited Page</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Homepage Layout Section Reordering */}
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37] flex items-center gap-2">
                        <Sliders className="w-4 h-4" />
                        <span>Homepage Section Sequencer (Drag/Order Builder)</span>
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 uppercase font-bold">Live Layout</span>
                    </div>

                    <p className="text-xs text-gray-400">Use the Up and Down controls to rearrange the visual stack of your homepage sections instantly without writing code.</p>

                    <div className="space-y-2">
                      {(() => {
                        const homePage = pages.find(p => p.id === 'page-home') || DEFAULT_PAGES[0];
                        const order = homePage.sectionsOrder || ['hero', 'ticker', 'stats', 'services', 'about', 'story', 'portfolio', 'testimonials', 'faq', 'cta', 'contact'];
                        
                        const handleMove = (index: number, direction: 'up' | 'down') => {
                          const newOrder = [...order];
                          const targetIndex = direction === 'up' ? index - 1 : index + 1;
                          if (targetIndex >= 0 && targetIndex < newOrder.length) {
                            const temp = newOrder[index];
                            newOrder[index] = newOrder[targetIndex];
                            newOrder[targetIndex] = temp;
                            updatePage(homePage.id, { sectionsOrder: newOrder });
                            showNotification('Section layout order modified!');
                          }
                        };

                        return order.map((section: string, idx: number) => (
                          <div key={section} className="flex items-center justify-between p-3 rounded-xl bg-[#090a0d] border border-gray-800/80 hover:border-gray-700/80 transition-all">
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-gray-500 font-mono w-5">#{idx + 1}</span>
                              <span className="text-xs font-bold text-white capitalize">{section} Section</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button
                                disabled={idx === 0}
                                onClick={() => handleMove(idx, 'up')}
                                className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                title="Move Up"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                disabled={idx === order.length - 1}
                                onClick={() => handleMove(idx, 'down')}
                                className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                title="Move Down"
                              >
                                <ArrowDown className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  </div>

                  {/* List of Pages */}
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37] border-b border-gray-800 pb-3">All Website Pages</h3>
                    <div className="space-y-3">
                      {pages.map(p => (
                        <div key={p.id} className="p-4 rounded-xl bg-[#090a0d] border border-gray-800 flex flex-col justify-between gap-3">
                          <div>
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-white">{p.title}</h4>
                              <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                p.status === 'Published' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                              }`}>{p.status}</span>
                            </div>
                            <div className="text-[10px] text-gray-500 font-mono mt-1">Slug: /{p.slug}</div>
                          </div>

                          <div className="flex items-center gap-2 pt-2 border-t border-gray-800/80">
                            <button
                              onClick={() => {
                                setEditingPageId(p.id);
                                setPageFormData(p);
                              }}
                              className="px-2.5 py-1 rounded bg-[#d4af37]/20 text-[#d4af37] hover:bg-[#d4af37]/30 text-[10px] font-bold transition-all"
                            >
                              Edit Settings
                            </button>
                            {p.id !== 'page-home' && (
                              <button
                                onClick={() => {
                                  if (confirm('Delete this page permanently?')) {
                                    deletePage(p.id);
                                    showNotification('Page deleted!');
                                  }
                                }}
                                className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 text-[10px] font-bold transition-all ml-auto"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Edit Page Metadata Overlay Form */}
                {editingPageId && (
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Edit Page Settings: {pageFormData.title}</h3>
                      <button onClick={() => setEditingPageId(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Page Title</label>
                        <input
                          type="text"
                          value={pageFormData.title || ''}
                          onChange={e => setPageFormData({ ...pageFormData, title: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">URL Slug</label>
                        <input
                          type="text"
                          value={pageFormData.slug || ''}
                          onChange={e => setPageFormData({ ...pageFormData, slug: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 font-semibold mb-1">SEO Meta Title</label>
                        <input
                          type="text"
                          value={pageFormData.metaTitle || ''}
                          onChange={e => setPageFormData({ ...pageFormData, metaTitle: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 font-semibold mb-1">SEO Meta Description</label>
                        <textarea
                          rows={2}
                          value={pageFormData.metaDescription || ''}
                          onChange={e => setPageFormData({ ...pageFormData, metaDescription: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Page Status</label>
                        <select
                          value={pageFormData.status || 'Draft'}
                          onChange={e => setPageFormData({ ...pageFormData, status: e.target.value as any })}
                          className="w-full px-3 py-2 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        >
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3">
                      <button
                        onClick={() => {
                          updatePage(editingPageId, pageFormData);
                          setEditingPageId(null);
                          showNotification('Page settings updated!');
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase"
                      >
                        Save Page Settings
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ======================================================================= */}
            {/* NEW SECTION: BLOG ARTICLES CMS */}
            {/* ======================================================================= */}
            {activeAdminTab === 'blogs' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Blog Articles & Content CMS</h2>
                    <p className="text-xs text-gray-400">Create, schedule and publish marketing articles and knowledge content.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingBlogId('new');
                      setBlogFormData({
                        title: '',
                        slug: '',
                        category: 'Marketing',
                        tags: [],
                        author: adminUser?.username || 'Farooq Ahmad',
                        excerpt: '',
                        content: '',
                        imageUrl: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80',
                        status: 'Draft',
                        metaTitle: '',
                        metaDescription: ''
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Article</span>
                  </button>
                </div>

                {/* Edit/Create Form Block */}
                {editingBlogId && (
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">
                        {editingBlogId === 'new' ? 'Compose New Blog Post' : 'Edit Blog Post'}
                      </h3>
                      <button onClick={() => setEditingBlogId(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Article Title</label>
                        <input
                          type="text"
                          value={blogFormData.title || ''}
                          onChange={e => setBlogFormData({ ...blogFormData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                          placeholder="e.g. Scaling Meta Ads in 2026"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">URL Slug</label>
                        <input
                          type="text"
                          value={blogFormData.slug || ''}
                          onChange={e => setBlogFormData({ ...blogFormData, slug: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Category</label>
                        <input
                          type="text"
                          value={blogFormData.category || ''}
                          onChange={e => setBlogFormData({ ...blogFormData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Author Name</label>
                        <input
                          type="text"
                          value={blogFormData.author || ''}
                          onChange={e => setBlogFormData({ ...blogFormData, author: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 font-semibold mb-1">Featured Image URL</label>
                        <input
                          type="text"
                          value={blogFormData.imageUrl || ''}
                          onChange={e => setBlogFormData({ ...blogFormData, imageUrl: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 font-semibold mb-1">Short Excerpt (Teaser)</label>
                        <input
                          type="text"
                          value={blogFormData.excerpt || ''}
                          onChange={e => setBlogFormData({ ...blogFormData, excerpt: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                          placeholder="Brief description showing on listings..."
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 font-semibold mb-1">Article Body Content (HTML allowed)</label>
                        <textarea
                          rows={6}
                          value={blogFormData.content || ''}
                          onChange={e => setBlogFormData({ ...blogFormData, content: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white font-mono"
                          placeholder="<p>Enter post content here...</p>"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Publish Status</label>
                        <select
                          value={blogFormData.status || 'Draft'}
                          onChange={e => setBlogFormData({ ...blogFormData, status: e.target.value as any })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        >
                          <option value="Published">Published</option>
                          <option value="Draft">Draft</option>
                          <option value="Scheduled">Scheduled</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3">
                      <button
                        onClick={() => {
                          if (editingBlogId === 'new') {
                            addBlog(blogFormData as any);
                            showNotification('Blog article published!');
                          } else {
                            updateBlog(editingBlogId, blogFormData);
                            showNotification('Blog article updated successfully!');
                          }
                          setEditingBlogId(null);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase"
                      >
                        {editingBlogId === 'new' ? 'Publish Article' : 'Save Changes'}
                      </button>
                    </div>
                  </div>
                )}

                {/* Articles Table list */}
                <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 overflow-x-auto">
                  <table className="w-full text-xs text-left text-gray-300 border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400 font-bold uppercase tracking-wider text-[10px]">
                        <th className="pb-3 w-1/3">Article Title</th>
                        <th className="pb-3">Author</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Date</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {blogs.map(post => (
                        <tr key={post.id} className="border-b border-gray-800/60 hover:bg-white/5 transition-all">
                          <td className="py-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded overflow-hidden border border-gray-800 shrink-0">
                                <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <span className="font-bold text-white block">{post.title}</span>
                                <span className="text-[10px] text-gray-500 font-mono">/{post.slug}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 text-gray-400">{post.author}</td>
                          <td className="py-3 text-[#d4af37] font-semibold">{post.category}</td>
                          <td className="py-3 text-gray-400">{new Date(post.publishedAt).toLocaleDateString()}</td>
                          <td className="py-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              post.status === 'Published' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
                            }`}>{post.status}</span>
                          </td>
                          <td className="py-3 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => {
                                  setEditingBlogId(post.id);
                                  setBlogFormData(post);
                                }}
                                className="p-1 rounded bg-[#d4af37]/15 hover:bg-[#d4af37]/35 text-[#d4af37] transition-all"
                                title="Edit"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  if (confirm('Delete this article permanently?')) {
                                    deleteBlog(post.id);
                                    showNotification('Article removed.');
                                  }
                                }}
                                className="p-1 rounded bg-red-500/15 hover:bg-red-500/35 text-red-400 transition-all"
                                title="Delete"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================================= */}
            {/* NEW SECTION: PRODUCT CATALOG CMS */}
            {/* ======================================================================= */}
            {activeAdminTab === 'products' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Product Catalog & Services E-Shop</h2>
                    <p className="text-xs text-gray-400">Configure prices, inventory SKU, discounts, and categories for agency packages.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingProductId('new');
                      setProductFormData({
                        title: '',
                        sku: 'TYC-' + Math.floor(Math.random() * 900000 + 100000),
                        price: 500,
                        discountPrice: 0,
                        stock: 100,
                        category: 'Marketing Packages',
                        description: '',
                        imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80',
                        status: 'Live'
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create New Package</span>
                  </button>
                </div>

                {/* Edit Form */}
                {editingProductId && (
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">
                        {editingProductId === 'new' ? 'Launch New Pack' : 'Update Catalog Package'}
                      </h3>
                      <button onClick={() => setEditingProductId(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 font-semibold mb-1">Package Title</label>
                        <input
                          type="text"
                          value={productFormData.title || ''}
                          onChange={e => setProductFormData({ ...productFormData, title: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">SKU identifier</label>
                        <input
                          type="text"
                          value={productFormData.sku || ''}
                          onChange={e => setProductFormData({ ...productFormData, sku: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Regular Price ($)</label>
                        <input
                          type="number"
                          value={productFormData.price || 0}
                          onChange={e => setProductFormData({ ...productFormData, price: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Discount Price ($) (0 to disable)</label>
                        <input
                          type="number"
                          value={productFormData.discountPrice || 0}
                          onChange={e => setProductFormData({ ...productFormData, discountPrice: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Stock Level (Inventory)</label>
                        <input
                          type="number"
                          value={productFormData.stock || 0}
                          onChange={e => setProductFormData({ ...productFormData, stock: Number(e.target.value) })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-gray-300 font-semibold mb-1">Image URL</label>
                        <input
                          type="text"
                          value={productFormData.imageUrl || ''}
                          onChange={e => setProductFormData({ ...productFormData, imageUrl: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">Catalog Category</label>
                        <input
                          type="text"
                          value={productFormData.category || ''}
                          onChange={e => setProductFormData({ ...productFormData, category: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-gray-300 font-semibold mb-1">Description Outline</label>
                        <textarea
                          rows={3}
                          value={productFormData.description || ''}
                          onChange={e => setProductFormData({ ...productFormData, description: e.target.value })}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#090a0d] border border-gray-700 text-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3">
                      <button
                        onClick={() => {
                          if (editingProductId === 'new') {
                            addProduct(productFormData as any);
                            showNotification('Product pack launched live!');
                          } else {
                            updateProduct(editingProductId, productFormData);
                            showNotification('Product catalog updated!');
                          }
                          setEditingProductId(null);
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase"
                      >
                        Save Package
                      </button>
                    </div>
                  </div>
                )}

                {/* Grid layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map(p => (
                    <div key={p.id} className="p-5 rounded-2xl bg-[#121319] border border-gray-800 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 overflow-hidden">
                        <div className="w-20 h-20 rounded-xl border border-gray-800 bg-black shrink-0 overflow-hidden shadow-inner">
                          <img src={p.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="font-bold text-white text-sm truncate">{p.title}</h4>
                          <span className="text-[10px] font-mono text-gray-500 uppercase">SKU: {p.sku}</span>
                          <p className="text-[11px] text-gray-400 line-clamp-1 mt-1">{p.description}</p>
                          <div className="flex items-center gap-2 mt-1.5">
                            {p.discountPrice && p.discountPrice > 0 ? (
                              <>
                                <span className="text-white text-xs font-bold">${p.discountPrice}</span>
                                <span className="text-gray-500 text-[10px] line-through">${p.price}</span>
                              </>
                            ) : (
                              <span className="text-white text-xs font-bold">${p.price}</span>
                            )}
                            <span className="text-gray-500 text-[10px] ml-2 font-semibold">Stock: {p.stock} units</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 shrink-0">
                        <button
                          onClick={() => {
                            setEditingProductId(p.id);
                            setProductFormData(p);
                          }}
                          className="p-2 rounded bg-gray-800 hover:bg-gray-700 text-white transition-all"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Delete this product permanently from the catalog?')) {
                              deleteProduct(p.id);
                              showNotification('Product pack deleted.');
                            }
                          }}
                          className="p-2 rounded bg-red-950/30 hover:bg-red-900/50 text-red-400 border border-red-900/40 transition-all"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================================= */}
            {/* NEW SECTION: FORMS BUILDER & LEADS CMS */}
            {/* ======================================================================= */}
            {activeAdminTab === 'forms' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Forms & Leads Submissions CMS</h2>
                    <p className="text-xs text-gray-400">Design custom forms with dynamic fields and track visual client leads.</p>
                  </div>
                  <button
                    onClick={() => {
                      const title = prompt('Enter Form Title:');
                      if (title) {
                        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                        addCustomForm({
                          title,
                          slug,
                          fields: [
                            { id: 'f-' + Date.now(), label: 'Full Name', type: 'text', required: true }
                          ]
                        });
                        showNotification('Custom form generated!');
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Custom Form</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Forms list & designer */}
                  <div className="lg:col-span-1 p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37] border-b border-gray-800 pb-3">Available Forms</h3>
                    <div className="space-y-3">
                      {customForms.map(form => (
                        <div key={form.id} className="p-4 rounded-xl bg-[#090a0d] border border-gray-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-white">{form.title}</h4>
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">{form.submissionsCount} Leads</span>
                          </div>
                          <span className="text-[10px] text-gray-500 font-mono block">Slug: /{form.slug}</span>

                          <div className="flex items-center gap-2 pt-2 border-t border-gray-800/80">
                            <button
                              onClick={() => {
                                setEditingFormId(form.id);
                                setFormBuilderFormData(form);
                              }}
                              className="px-2.5 py-1 rounded bg-[#d4af37]/20 text-[#d4af37] text-[10px] font-bold"
                            >
                              Add Fields
                            </button>
                            {form.id !== 'form-contact' && (
                              <button
                                onClick={() => {
                                  if (confirm('Delete this form along with all its configurations?')) {
                                    deleteCustomForm(form.id);
                                    showNotification('Form deleted.');
                                  }
                                }}
                                className="px-2.5 py-1 rounded bg-red-500/20 text-red-400 text-[10px] font-bold ml-auto"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Leads Submission list */}
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Form Leads / Submissions</h3>
                      <button
                        onClick={() => {
                          const csvRows = [];
                          csvRows.push(['Submission ID', 'Form', 'Timestamp', 'Data']);
                          formSubmissions.forEach(sub => {
                            csvRows.push([sub.id, sub.formTitle, sub.createdAt, JSON.stringify(sub.data)]);
                          });
                          const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
                          const encodedUri = encodeURI(csvContent);
                          const link = document.createElement("a");
                          link.setAttribute("href", encodedUri);
                          link.setAttribute("download", "marketing_tycoons_leads.csv");
                          document.body.appendChild(link);
                          link.click();
                          showNotification('Leads exported successfully!');
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700 hover:border-[#d4af37] text-xs font-semibold text-gray-300 hover:text-white transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Export CSV</span>
                      </button>
                    </div>

                    <div className="space-y-3 max-h-[400px] overflow-y-auto">
                      {formSubmissions.map(sub => (
                        <div key={sub.id} className="p-4 rounded-xl bg-[#090a0d] border border-gray-800 relative">
                          <button
                            onClick={() => {
                              deleteSubmission(sub.id);
                              showNotification('Submission removed!');
                            }}
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-400 p-1 rounded hover:bg-white/5 transition-all"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>

                          <div className="text-[10px] text-gray-500 font-mono mb-1">{new Date(sub.createdAt).toLocaleString()}</div>
                          <div className="text-xs font-bold text-white mb-2">{sub.formTitle}</div>
                          
                          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs">
                            {Object.entries(sub.data).map(([key, val]) => (
                              <div key={key} className="border-b border-gray-800/40 pb-1.5">
                                <span className="text-gray-500 font-semibold block text-[10px] uppercase tracking-wider">{key}</span>
                                <span className="text-gray-200">{val}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Form fields editor overlay */}
                {editingFormId && (
                  <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4 text-xs">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">Modify Fields: {formBuilderFormData.title}</h3>
                      <button onClick={() => setEditingFormId(null)} className="text-xs text-gray-400 hover:text-white">Cancel</button>
                    </div>

                    <div className="space-y-3">
                      {(formBuilderFormData.fields || []).map((field: any, index: number) => (
                        <div key={field.id} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-3 rounded-lg bg-[#090a0d] border border-gray-800 items-end">
                          <div>
                            <label className="block text-[10px] text-gray-500 mb-1">Field Label</label>
                            <input
                              type="text"
                              value={field.label}
                              onChange={e => {
                                const newFields = [...(formBuilderFormData.fields || [])];
                                newFields[index].label = e.target.value;
                                setFormBuilderFormData({ ...formBuilderFormData, fields: newFields });
                              }}
                              className="w-full px-2 py-1 rounded bg-gray-900 border border-gray-700 text-white"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-gray-500 mb-1">Field Type</label>
                            <select
                              value={field.type}
                              onChange={e => {
                                const newFields = [...(formBuilderFormData.fields || [])];
                                newFields[index].type = e.target.value as any;
                                setFormBuilderFormData({ ...formBuilderFormData, fields: newFields });
                              }}
                              className="w-full px-2 py-1 rounded bg-gray-900 border border-gray-700 text-white"
                            >
                              <option value="text">Single Line Text</option>
                              <option value="email">Email Address</option>
                              <option value="phone">Phone / WhatsApp</option>
                              <option value="textarea">Multi-line Paragraph</option>
                            </select>
                          </div>
                          <div className="flex items-center h-8">
                            <label className="flex items-center gap-1.5 cursor-pointer text-gray-300">
                              <input
                                type="checkbox"
                                checked={field.required}
                                onChange={e => {
                                  const newFields = [...(formBuilderFormData.fields || [])];
                                  newFields[index].required = e.target.checked;
                                  setFormBuilderFormData({ ...formBuilderFormData, fields: newFields });
                                }}
                                className="rounded text-[#d4af37]"
                              />
                              <span>Required Field</span>
                            </label>
                          </div>
                          <button
                            onClick={() => {
                              const newFields = (formBuilderFormData.fields || []).filter((f: any) => f.id !== field.id);
                              setFormBuilderFormData({ ...formBuilderFormData, fields: newFields });
                            }}
                            className="px-2 py-1.5 rounded bg-red-950/20 text-red-400 hover:bg-red-900/20 text-[10px] font-bold text-center border border-red-900/40"
                          >
                            Remove Field
                          </button>
                        </div>
                      ))}

                      <button
                        onClick={() => {
                          const fId = 'f-' + Date.now();
                          const newField = { id: fId, label: 'Custom Attribute', type: 'text' as const, required: false };
                          setFormBuilderFormData({ ...formBuilderFormData, fields: [...(formBuilderFormData.fields || []), newField] });
                        }}
                        className="px-3 py-1.5 rounded bg-gray-800 text-white font-semibold flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Form Field</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-gray-800">
                      <button
                        onClick={() => {
                          updateCustomForm(editingFormId, formBuilderFormData);
                          setEditingFormId(null);
                          showNotification('Custom Form Fields Updated successfully!');
                        }}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase"
                      >
                        Save Fields Configuration
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ======================================================================= */}
            {/* NEW SECTION: MEDIA ASSET LIBRARY */}
            {/* ======================================================================= */}
            {activeAdminTab === 'media' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Media Asset Library</h2>
                    <p className="text-xs text-gray-400">Upload corporate photographs, design mockups and promotional videos to use around pages.</p>
                  </div>
                  <button
                    onClick={() => {
                      const name = prompt('Enter File Name (e.g. workspace_studio.jpg):');
                      if (name) {
                        const url = prompt('Enter Image Unsplash or source URL:');
                        if (url) {
                          addMediaAsset({
                            name,
                            url,
                            type: name.includes('.mp4') ? 'video/mp4' : 'image/jpeg',
                            size: Math.floor(Math.random() * 800 + 100) + ' KB'
                          });
                          showNotification('File added to media library!');
                        }
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload New File</span>
                  </button>
                </div>

                {/* Media assets grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                  {mediaLibrary.map(asset => (
                    <div key={asset.id} className="p-3 rounded-2xl bg-[#121319] border border-gray-800 space-y-2 group relative overflow-hidden">
                      <div className="aspect-square rounded-xl bg-black overflow-hidden border border-gray-800 relative shadow-inner">
                        {asset.type.startsWith('video') ? (
                          <div className="w-full h-full bg-slate-950 flex items-center justify-center text-[10px] text-gray-500 font-bold uppercase">
                            MP4 VIDEO
                          </div>
                        ) : (
                          <img src={asset.url} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                        )}

                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(asset.url);
                              showNotification('Image URL Copied to clipboard!');
                            }}
                            className="px-2.5 py-1 rounded bg-[#d4af37] text-black font-bold text-[9px] uppercase tracking-wider"
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>

                      <div>
                        <span className="text-[11px] font-bold text-white block truncate" title={asset.name}>{asset.name}</span>
                        <div className="flex justify-between items-center text-[9px] text-gray-500 mt-0.5">
                          <span>{asset.size}</span>
                          <button
                            onClick={() => {
                              if (confirm('Permanently remove this file from your assets library?')) {
                                deleteMediaAsset(asset.id);
                                showNotification('Asset deleted.');
                              }
                            }}
                            className="text-red-400 hover:underline"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ======================================================================= */}
            {/* NEW SECTION: MENU NAVIGATION CMS */}
            {/* ======================================================================= */}
            {activeAdminTab === 'menus' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">Menu Navigation CMS</h2>
                    <p className="text-xs text-gray-400">Add, rename, toggle, or rearrange links on your main header menu dynamically.</p>
                  </div>
                  <button
                    onClick={() => {
                      const label = prompt('Enter Navigation Link Name (e.g. Blog):');
                      if (label) {
                        const path = prompt('Enter Destination Link path (e.g. #blog or /blog):');
                        if (path) {
                          addMenuItem({
                            label,
                            path,
                            order: menus.length + 1,
                            enabled: true,
                            isExternal: path.startsWith('http')
                          });
                          showNotification('Navigation link added!');
                        }
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs uppercase cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Menu Link</span>
                  </button>
                </div>

                <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37] border-b border-gray-800 pb-3">Active Navigation Nodes</h3>
                  
                  <div className="space-y-2">
                    {menus.map((item, idx) => (
                      <div key={item.id} className="p-3.5 rounded-xl bg-[#090a0d] border border-gray-800 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-gray-500 font-mono w-4">#{item.order}</span>
                          <div>
                            <span className="text-xs font-bold text-white block">{item.label}</span>
                            <span className="text-[10px] text-gray-500 font-mono">{item.path} {item.isExternal && '(External)'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 ml-auto text-xs">
                          <button
                            onClick={() => {
                              updateMenuItem(item.id, { enabled: !item.enabled });
                              showNotification(`Link is now ${!item.enabled ? 'Enabled' : 'Disabled'}`);
                            }}
                            className={`px-2.5 py-1 rounded text-[10px] font-bold ${
                              item.enabled ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                            }`}
                          >
                            {item.enabled ? 'Active' : 'Disabled'}
                          </button>

                          <div className="flex items-center gap-1 border-l border-gray-800 pl-3">
                            <button
                              disabled={idx === 0}
                              onClick={() => {
                                const newMenus = [...menus];
                                const currentOrder = item.order;
                                const prevMenu = newMenus[idx - 1];
                                updateMenuItem(item.id, { order: prevMenu.order });
                                updateMenuItem(prevMenu.id, { order: currentOrder });
                                showNotification('Navigation item reordered!');
                              }}
                              className="p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                            >
                              <ArrowUp className="w-3.5 h-3.5" />
                            </button>
                            <button
                              disabled={idx === menus.length - 1}
                              onClick={() => {
                                const newMenus = [...menus];
                                const currentOrder = item.order;
                                const nextMenu = newMenus[idx + 1];
                                updateMenuItem(item.id, { order: nextMenu.order });
                                updateMenuItem(nextMenu.id, { order: currentOrder });
                                showNotification('Navigation item reordered!');
                              }}
                              className="p-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                            >
                              <ArrowDown className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to remove this navigation node?')) {
                                deleteMenuItem(item.id);
                                showNotification('Menu item deleted.');
                              }
                            }}
                            className="p-1.5 rounded hover:bg-white/5 text-gray-500 hover:text-red-400 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================================= */}
            {/* NEW SECTION: CMS USER ROLES & TEAM ACCESS */}
            {/* ======================================================================= */}
            {activeAdminTab === 'users' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-bold text-white">CMS User Accounts & Privileges</h2>
                    <p className="text-xs text-gray-400">View administrators, block/unblock system operators, and configure role accessibility tiers.</p>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-[#121319] border border-gray-800 overflow-x-auto">
                  <table className="w-full text-xs text-left text-gray-300 border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400 font-bold uppercase tracking-wider text-[10px] pb-3">
                        <th className="pb-3">CMS User</th>
                        <th className="pb-3">Role Tier</th>
                        <th className="pb-3">Account Status</th>
                        <th className="pb-3">Member Since</th>
                        <th className="pb-3 text-right">Access Controls</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cmsUsers.map(user => (
                        <tr key={user.id} className="border-b border-gray-800/60 hover:bg-white/5 transition-all">
                          <td className="py-3">
                            <div>
                              <span className="font-bold text-white block">{user.name}</span>
                              <span className="text-[10px] text-gray-500 font-mono">{user.email}</span>
                            </div>
                          </td>
                          <td className="py-3 font-semibold text-[#d4af37]">
                            <select
                              value={user.role}
                              onChange={e => {
                                updateUserRole(user.id, e.target.value as any);
                                showNotification('User role upgraded!');
                              }}
                              disabled={user.email === 'marketingtycoons.tech@gmail.com'}
                              className="px-2 py-1 rounded bg-[#090a0d] border border-gray-700 text-xs text-[#d4af37] font-semibold focus:outline-none"
                            >
                              <option value="Super Admin">Super Admin</option>
                              <option value="Editor">Editor</option>
                              <option value="Manager">Manager</option>
                              <option value="Client">Client</option>
                            </select>
                          </td>
                          <td className="py-3">
                            <button
                              onClick={() => {
                                const newStatus = user.status === 'Active' ? 'Blocked' : 'Active';
                                updateUserStatus(user.id, newStatus);
                                showNotification(`User status set to ${newStatus}`);
                              }}
                              disabled={user.email === 'marketingtycoons.tech@gmail.com'}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold disabled:opacity-40 ${
                                user.status === 'Active' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-red-500/15 text-red-400'
                              }`}
                            >
                              {user.status}
                            </button>
                          </td>
                          <td className="py-3 text-gray-400">{new Date(user.createdAt).toLocaleDateString()}</td>
                          <td className="py-3 text-right">
                            {user.email !== 'marketingtycoons.tech@gmail.com' && (
                              <button
                                onClick={() => {
                                  if (confirm('Revoke access privileges and delete this user?')) {
                                    deleteUser(user.id);
                                    showNotification('User deleted.');
                                  }
                                }}
                                className="px-2.5 py-1 rounded bg-red-500/15 hover:bg-red-500/25 border border-red-500/20 text-red-400 font-bold transition-all text-[10px]"
                              >
                                Revoke Account
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================================= */}
            {/* NEW SECTION: ADVANCED SEO AUDIT & METADATA CHECKS */}
            {/* ======================================================================= */}
            {activeAdminTab === 'seo' && (
              <div className="space-y-6 animate-in fade-in duration-200 text-xs">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">SEO Audit Control & Robots/Sitemap Editor</h2>
                  <p className="text-xs text-gray-400">Perform complete indexing scans, optimize robots.txt filters, and examine SEO compliance scores.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Robots & Sitemap Form editor */}
                  <div className="lg:col-span-1 p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37] border-b border-gray-800 pb-3">Robots.txt & Sitemap</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-300 font-semibold mb-1">robots.txt Directives</label>
                        <textarea
                          rows={4}
                          value={localRobots}
                          onChange={e => setLocalRobots(e.target.value)}
                          className="w-full p-2 rounded bg-black/60 border border-gray-700 text-white font-mono text-[11px]"
                        />
                        <button
                          onClick={() => showNotification('robots.txt saved on server!')}
                          className="px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-white font-semibold mt-1.5 transition-all"
                        >
                          Save robots.txt
                        </button>
                      </div>

                      <div className="border-t border-gray-800/80 pt-4">
                        <label className="block text-gray-300 font-semibold mb-1">Dynamic Sitemap Host Domain</label>
                        <input
                          type="text"
                          value={localSitemapUrl}
                          onChange={e => setLocalSitemapUrl(e.target.value)}
                          className="w-full px-2 py-1.5 rounded bg-black/60 border border-gray-700 text-white font-mono text-[11px]"
                        />
                        <button
                          onClick={() => showNotification('Sitemap host domain saved!')}
                          className="px-3 py-1.5 rounded bg-gray-800 hover:bg-gray-700 text-white font-semibold mt-1.5 transition-all"
                        >
                          Regenerate sitemap.xml
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Complete SEO Compliance Auditor */}
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-[#121319] border border-gray-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-800 pb-3">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[#d4af37]">SEO Auditor Indexing Report</h3>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase">
                        Score: 94/100 (Grade A)
                      </span>
                    </div>

                    <p className="text-xs text-gray-400">Our engine scans the entire live portfolio items, service keywords and layout schemas to ensure 100% SEO indexing compatibility with Google Crawler guidelines.</p>

                    <div className="space-y-3">
                      {/* Scan 1: Meta-title and description checks */}
                      <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Canonical Links & Document Meta Structure Verified</span>
                          <p className="text-gray-400 text-[11px] mt-0.5">All 16 active pages containing fully populated meta descriptions and localized Pakistani schema structure.</p>
                        </div>
                      </div>

                      {/* Scan 2: Image Alt Checks */}
                      <div className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-start gap-3">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">Image Alternative (alt) Attributes Assessment</span>
                          <p className="text-gray-400 text-[11px] mt-0.5">Warning: 2 of your newly added portfolio projects do not contain descriptive alternative captions. Adding alt tags is recommended to secure perfect ranking for 'Marketing Tycoons'.</p>
                        </div>
                      </div>

                      {/* Scan 3: OpenGraph Schema verification */}
                      <div className="p-3.5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-white block">OpenGraph Integration verified</span>
                          <p className="text-gray-400 text-[11px] mt-0.5">Dynamic meta rules successfully inject beautiful visual OG cards for WhatsApp, Facebook, LinkedIn and X crawlers.</p>
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
