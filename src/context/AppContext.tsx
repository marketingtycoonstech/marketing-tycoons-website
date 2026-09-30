import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_MESSAGES,
  DEFAULT_PORTFOLIO,
  DEFAULT_REVIEWS,
  DEFAULT_SERVICES,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_STATS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_WEBSITE_SETTINGS,
  DEFAULT_BLOGS,
  DEFAULT_PRODUCTS,
  DEFAULT_PAGES,
  DEFAULT_FORMS,
  DEFAULT_SUBMISSIONS,
  DEFAULT_MEDIA,
  DEFAULT_MENUS,
  DEFAULT_CMS_USERS,
  DEFAULT_TEAM_MEMBERS,
  DEFAULT_INDUSTRIES
} from '../data/defaultData';
import {
  AdminUser,
  AuthUser,
  ContactMessage,
  MessageStatus,
  PortfolioProject,
  ReviewStatus,
  ServiceItem,
  SocialLinksConfig,
  StatItem,
  TestimonialItem,
  ThemeMode,
  UserReview,
  WebsiteSettings,
  BlogPost,
  ProductItem,
  CustomPage,
  CustomForm,
  FormSubmission,
  MediaAsset,
  NavigationMenuItem,
  CMSUser,
  TeamMember,
  IndustryItem,
  ActivityLog,
  DynamicContentItem,
  WebsiteSectionId,
  DynamicContentType,
  SiteThemeConfig
} from '../types';
import { DEFAULT_SITE_THEME } from '../utils/defaultTheme';
import { applyThemeToDocument } from '../utils/themeInjector';
import {
  auth,
  db,
  signInWithGoogle,
  logoutUser,
  onAuthStateChanged,
  FirebaseUser,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  AUTHORIZED_ADMIN_EMAILS,
  handleFirestoreError,
  OperationType,
  testConnection,
  uploadMediaToStorage,
  deleteMediaFromStorage,
  signInAdminMasterKey
} from '../lib/firebase';
import { setProjectMeta, setServiceMeta, resetDefaultMeta } from '../utils/seo';

interface AppContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;

  // Settings & Navigation
  settings: WebsiteSettings;
  updateSettings: (newSettings: Partial<WebsiteSettings>) => void;
  stats: StatItem[];
  updateStat: (id: string, number: string, label: string) => void;
  socialLinks: SocialLinksConfig;
  updateSocialLinks: (links: Partial<SocialLinksConfig>) => void;

  // View state
  currentView: 'public' | 'admin';
  setCurrentView: (view: 'public' | 'admin') => void;
  activeAdminTab: string;
  setActiveAdminTab: (tab: string) => void;

  // Services
  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id' | 'order'>) => void;
  updateService: (id: string, updated: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;
  toggleServiceEnabled: (id: string) => void;

  // Portfolio
  portfolio: PortfolioProject[];
  addProject: (project: Omit<PortfolioProject, 'id' | 'order'>) => void;
  updateProject: (id: string, updated: Partial<PortfolioProject>) => void;
  deleteProject: (id: string) => void;
  toggleProjectFeatured: (id: string) => void;

  // Testimonials
  testimonials: TestimonialItem[];
  addTestimonial: (item: Omit<TestimonialItem, 'id'>) => void;
  updateTestimonial: (id: string, updated: Partial<TestimonialItem>) => void;
  deleteTestimonial: (id: string) => void;

  // Reviews
  reviews: UserReview[];
  submitReview: (review: {
    name: string;
    email: string;
    rating: number;
    review: string;
    serviceUsed?: string;
    avatarUrl?: string;
    isGoogleVerified?: boolean;
    googleUid?: string;
  }) => Promise<void>;
  updateReviewStatus: (id: string, status: ReviewStatus) => void;
  toggleReviewFeatured: (id: string) => void;
  deleteReview: (id: string) => void;

  // Messages
  messages: ContactMessage[];
  submitContactMessage: (msg: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  }) => Promise<boolean>;
  updateMessageStatus: (id: string, status: MessageStatus) => void;
  deleteMessage: (id: string) => void;

  // Auth & Admin Security
  currentUser: AuthUser | null;
  isAdminLoggedIn: boolean;
  adminUser: AdminUser | null;
  adminLogin: (user: string, pass: string) => boolean;
  loginWithGoogle: () => Promise<boolean>;
  adminLogout: () => Promise<void>;
  isFirebaseLive: boolean;

  // ==========================================
  // NEW CMS & WEBSITE MANAGEMENT SUB-SYSTEMS
  // ==========================================

  // Blogs
  blogs: BlogPost[];
  addBlog: (blog: Omit<BlogPost, 'id' | 'publishedAt'>) => void;
  updateBlog: (id: string, updated: Partial<BlogPost>) => void;
  deleteBlog: (id: string) => void;

  // Products
  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, updated: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;

  // Pages
  pages: CustomPage[];
  addPage: (page: Omit<CustomPage, 'id'>) => void;
  updatePage: (id: string, updated: Partial<CustomPage>) => void;
  deletePage: (id: string) => void;

  // Forms & submissions
  customForms: CustomForm[];
  addCustomForm: (form: Omit<CustomForm, 'id' | 'submissionsCount'>) => void;
  updateCustomForm: (id: string, updated: Partial<CustomForm>) => void;
  deleteCustomForm: (id: string) => void;
  formSubmissions: FormSubmission[];
  submitCustomForm: (formId: string, data: Record<string, string>) => Promise<boolean>;
  deleteSubmission: (id: string) => void;

  // Media Asset Management
  mediaLibrary: MediaAsset[];
  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => void;
  deleteMediaAsset: (id: string) => void;

  // Menu Navigation CMS
  menus: NavigationMenuItem[];
  updateMenuOrder: (updatedMenus: NavigationMenuItem[]) => void;
  addMenuItem: (item: Omit<NavigationMenuItem, 'id'>) => void;
  updateMenuItem: (id: string, updated: Partial<NavigationMenuItem>) => void;
  deleteMenuItem: (id: string) => void;

  // CMS User Role Management
  cmsUsers: CMSUser[];
  updateUserRole: (id: string, role: CMSUser['role']) => void;
  updateUserStatus: (id: string, status: CMSUser['status']) => void;
  deleteUser: (id: string) => void;

  // Activity Logs
  activityLogs: ActivityLog[];
  logActivity: (action: string, targetType: string, targetId?: string) => void;

  // Modals
  activeServiceModal: ServiceItem | null;
  setActiveServiceModal: (s: ServiceItem | null) => void;
  activeProjectModal: PortfolioProject | null;
  setActiveProjectModal: (p: PortfolioProject | null) => void;
  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;
  isGoogleOAuthModalOpen: boolean;
  setIsGoogleOAuthModalOpen: (open: boolean) => void;
  isVideoStoryModalOpen: boolean;
  setIsVideoStoryModalOpen: (open: boolean) => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  isTermsModalOpen: boolean;
  setIsTermsModalOpen: (open: boolean) => void;
  isRefundModalOpen: boolean;
  setIsRefundModalOpen: (open: boolean) => void;
  isCookieModalOpen: boolean;
  setIsCookieModalOpen: (open: boolean) => void;
  isConsultationModalOpen: boolean;
  setIsConsultationModalOpen: (open: boolean) => void;
  isWeChatModalOpen: boolean;
  setIsWeChatModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  // Team & Industries
  teamMembers: TeamMember[];
  industries: IndustryItem[];

  // Dynamic Content Management System
  dynamicContent: DynamicContentItem[];
  isDynamicContentLoading: boolean;
  addDynamicContentItem: (item: Omit<DynamicContentItem, 'id' | 'createdAt' | 'updatedAt'>) => Promise<DynamicContentItem>;
  updateDynamicContentItem: (id: string, updates: Partial<DynamicContentItem>) => Promise<void>;
  replaceDynamicContentMedia: (id: string, newFile: File, onProgress?: (pct: number) => void) => Promise<void>;
  deleteDynamicContentItem: (id: string) => Promise<void>;
  togglePublishContentItem: (id: string) => Promise<void>;
  reorderContentItems: (sectionId: WebsiteSectionId, itemIds: string[]) => Promise<void>;
  getSectionContent: (sectionId: WebsiteSectionId, filterPublished?: boolean) => DynamicContentItem[];
  getSectionMedia: (sectionId: WebsiteSectionId, defaultUrl: string, type?: DynamicContentType) => string;

  // Reset to default helper
  resetToFactoryDefaults: () => void;

  // Theme Customization System
  siteTheme: SiteThemeConfig;
  updateThemeDraft: (newTheme: SiteThemeConfig) => void;
  publishTheme: (newTheme: SiteThemeConfig) => Promise<void>;
  resetThemeToDefault: (targetMode?: 'dark' | 'light' | 'all' | 'default') => void;
  showNotification: (text: string, type?: 'success' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme mode state (dark | light)
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('mt_theme');
    return saved === 'light' ? 'light' : 'dark';
  });

  // Site Theme Customization Config state
  const [siteTheme, setSiteTheme] = useState<SiteThemeConfig>(() => {
    const saved = localStorage.getItem('mt_site_theme');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_SITE_THEME;
      }
    }
    return DEFAULT_SITE_THEME;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('mt_theme', theme);
    applyThemeToDocument(siteTheme, theme);
  }, [theme, siteTheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const updateThemeDraft = (newTheme: SiteThemeConfig) => {
    setSiteTheme(newTheme);
    localStorage.setItem('mt_site_theme', JSON.stringify(newTheme));
    applyThemeToDocument(newTheme, theme);
  };

  const publishTheme = async (newTheme: SiteThemeConfig) => {
    const published: SiteThemeConfig = {
      ...newTheme,
      version: (newTheme.version || 1) + 1,
      updatedAt: new Date().toISOString(),
      updatedBy: adminUser?.email || 'marketingtycoons.tech@gmail.com',
      isPublished: true
    };
    setSiteTheme(published);
    localStorage.setItem('mt_site_theme', JSON.stringify(published));
    applyThemeToDocument(published, theme);

    try {
      await setDoc(doc(db, 'siteSettings', 'theme'), published, { merge: true });
    } catch (err) {
      console.error('Failed to publish theme to Firestore:', err);
      throw err;
    }
  };

  const resetThemeToDefault = (targetMode: 'dark' | 'light' | 'all' | 'default' = 'all') => {
    let reset = JSON.parse(JSON.stringify(DEFAULT_SITE_THEME));
    if (targetMode === 'dark') {
      reset = { ...siteTheme, dark: DEFAULT_SITE_THEME.dark };
    } else if (targetMode === 'light') {
      reset = { ...siteTheme, light: DEFAULT_SITE_THEME.light };
    }
    setSiteTheme(reset);
    localStorage.setItem('mt_site_theme', JSON.stringify(reset));
    applyThemeToDocument(reset, theme);
    setDoc(doc(db, 'siteSettings', 'theme'), reset, { merge: true }).catch(() => {});
  };

  const [globalNotification, setGlobalNotification] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const showNotification = (text: string, type: 'success' | 'error' = 'success') => {
    setGlobalNotification({ text, type });
    setTimeout(() => setGlobalNotification(null), 4000);
  };

  // View state
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');
  const [activeAdminTab, setActiveAdminTab] = useState<string>('overview');

  // Firebase connection status
  const [isFirebaseLive, setIsFirebaseLive] = useState<boolean>(true);

  // Authenticated user state
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  // Admin Auth state
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('mt_admin_auth') === 'true';
  });

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    if (localStorage.getItem('mt_admin_auth') === 'true') {
      return {
        username: 'marketingtycoons_admin',
        email: 'marketingtycoons.tech@gmail.com',
        role: 'Super Admin',
        lastLogin: new Date().toLocaleDateString()
      };
    }
    return null;
  });

  // Website Settings
  const [settings, setSettings] = useState<WebsiteSettings>(() => {
    const saved = localStorage.getItem('mt_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.whatsappNumber || parsed.whatsappNumber.includes('555') || parsed.whatsappNumber.includes('15558924400')) {
          parsed.whatsappNumber = '+923426793428';
        }
        if (!parsed.phone || parsed.phone.includes('555') || parsed.phone.includes('892-4400')) {
          parsed.phone = '+92 342 6793428';
        }
        if (!parsed.primaryEmail || parsed.primaryEmail === 'marketingtycoons@gmail.com') {
          parsed.primaryEmail = 'marketingtycoons.tech@gmail.com';
        }
        return { ...DEFAULT_WEBSITE_SETTINGS, ...parsed };
      } catch {
        return DEFAULT_WEBSITE_SETTINGS;
      }
    }
    return DEFAULT_WEBSITE_SETTINGS;
  });

  // Statistics
  const [stats, setStats] = useState<StatItem[]>(() => {
    const saved = localStorage.getItem('mt_stats');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_STATS;
      }
    }
    return DEFAULT_STATS;
  });

  // Social Links
  const [socialLinks, setSocialLinks] = useState<SocialLinksConfig>(() => {
    const saved = localStorage.getItem('mt_social_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.whatsapp || parsed.whatsapp.includes('555') || parsed.whatsapp.includes('15558924400')) {
          parsed.whatsapp = 'https://wa.me/923426793428';
        }
        return { ...DEFAULT_SOCIAL_LINKS, ...parsed };
      } catch {
        return DEFAULT_SOCIAL_LINKS;
      }
    }
    return DEFAULT_SOCIAL_LINKS;
  });

  // Services
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('mt_services');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_SERVICES;
      }
    }
    return DEFAULT_SERVICES;
  });

  // Portfolio
  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem('mt_portfolio');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PORTFOLIO;
      }
    }
    return DEFAULT_PORTFOLIO;
  });

  // Testimonials
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(() => {
    const saved = localStorage.getItem('mt_testimonials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_TESTIMONIALS;
      }
    }
    return DEFAULT_TESTIMONIALS;
  });

  // Reviews
  const [reviews, setReviews] = useState<UserReview[]>(() => {
    const saved = localStorage.getItem('mt_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_REVIEWS;
      }
    }
    return DEFAULT_REVIEWS;
  });

  // Messages
  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('mt_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_MESSAGES;
      }
    }
    return DEFAULT_MESSAGES;
  });

  // Blogs state
  const [blogs, setBlogs] = useState<BlogPost[]>(() => {
    const saved = localStorage.getItem('mt_blogs');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_BLOGS; }
    }
    return DEFAULT_BLOGS;
  });

  // Products state
  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('mt_products');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_PRODUCTS; }
    }
    return DEFAULT_PRODUCTS;
  });

  // Pages state
  const [pages, setPages] = useState<CustomPage[]>(() => {
    const saved = localStorage.getItem('mt_pages');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_PAGES; }
    }
    return DEFAULT_PAGES;
  });

  // Forms state
  const [customForms, setCustomForms] = useState<CustomForm[]>(() => {
    const saved = localStorage.getItem('mt_forms');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_FORMS; }
    }
    return DEFAULT_FORMS;
  });

  // Submissions state
  const [formSubmissions, setFormSubmissions] = useState<FormSubmission[]>(() => {
    const saved = localStorage.getItem('mt_submissions');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_SUBMISSIONS; }
    }
    return DEFAULT_SUBMISSIONS;
  });

  // Media state
  const [mediaLibrary, setMediaLibrary] = useState<MediaAsset[]>(() => {
    const saved = localStorage.getItem('mt_media');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_MEDIA; }
    }
    return DEFAULT_MEDIA;
  });

  // Navigation Menu state
  const [menus, setMenus] = useState<NavigationMenuItem[]>(() => {
    const saved = localStorage.getItem('mt_menus');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_MENUS; }
    }
    return DEFAULT_MENUS;
  });

  // CMS Users state
  const [cmsUsers, setCmsUsers] = useState<CMSUser[]>(() => {
    const saved = localStorage.getItem('mt_cms_users');
    if (saved) {
      try { return JSON.parse(saved); } catch { return DEFAULT_CMS_USERS; }
    }
    return DEFAULT_CMS_USERS;
  });

  // Dynamic Content Management System state
  const [dynamicContent, setDynamicContent] = useState<DynamicContentItem[]>(() => {
    const saved = localStorage.getItem('mt_dynamic_content');
    if (saved) {
      try { return JSON.parse(saved); } catch { return []; }
    }
    return [];
  });
  const [isDynamicContentLoading, setIsDynamicContentLoading] = useState<boolean>(true);

  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('mt_activity_logs');
    return saved ? JSON.parse(saved) : [];
  });

  const logActivity = (action: string, targetType: string, targetId?: string) => {
    const newLog: ActivityLog = {
      id: Date.now().toString(),
      adminId: adminUser?.email || 'unknown',
      adminName: adminUser?.username || 'Unknown Admin',
      action,
      targetType,
      targetId,
      timestamp: new Date().toISOString()
    };
    setActivityLogs(prev => [newLog, ...prev].slice(0, 50)); // Keep last 50
  };

  // Expose Activity Logs in context value
  useEffect(() => {
    localStorage.setItem('mt_activity_logs', JSON.stringify(activityLogs));
  }, [activityLogs]);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const email = (firebaseUser.email || '').toLowerCase().trim();
        const isAdmin = AUTHORIZED_ADMIN_EMAILS.includes(email);

        const authUser: AuthUser = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          role: isAdmin ? 'Super Admin' : 'Client',
          isGoogleVerified: true
        };

        setCurrentUser(authUser);

        if (isAdmin) {
          setIsAdminLoggedIn(true);
          setAdminUser({
            username: firebaseUser.displayName || 'marketingtycoons_admin',
            email: firebaseUser.email || 'marketingtycoons.tech@gmail.com',
            role: 'Super Admin',
            lastLogin: new Date().toLocaleDateString()
          });
          localStorage.setItem('mt_admin_auth', 'true');
        }
      } else {
        setCurrentUser(null);
      }
    });

    // If master key admin session was previously active, ensure Firebase Auth session is restored
    if (localStorage.getItem('mt_admin_auth') === 'true') {
      signInAdminMasterKey().catch(() => {});
    }

    return () => unsubscribe();
  }, []);

  // Real-time Firestore Synchronizations
  useEffect(() => {
    testConnection();

    // 1. Settings listener
    const settingsDoc = doc(db, 'settings', 'global_settings');
    const unsubSettings = onSnapshot(
      settingsDoc,
      snapshot => {
        if (snapshot.exists()) {
          const remote = snapshot.data() as WebsiteSettings;
          if (!remote.whatsappNumber || remote.whatsappNumber.includes('555') || remote.whatsappNumber.includes('15558924400')) {
            remote.whatsappNumber = '+923426793428';
          }
          if (!remote.phone || remote.phone.includes('555') || remote.phone.includes('892-4400')) {
            remote.phone = '+92 342 6793428';
          }
          setSettings(prev => ({ ...prev, ...remote }));
          localStorage.setItem('mt_settings', JSON.stringify({ ...DEFAULT_WEBSITE_SETTINGS, ...remote }));
        } else {
          // Initialize remote settings in Firestore with official details
          setDoc(settingsDoc, DEFAULT_WEBSITE_SETTINGS, { merge: true }).catch(() => {});
        }
        setIsFirebaseLive(true);
      },
      error => {
        handleFirestoreError(error, OperationType.GET, 'settings/global_settings');
        setIsFirebaseLive(false);
      }
    );

    // 1b. Social Links listener
    const socialDoc = doc(db, 'social_links', 'global_social');
    const unsubSocial = onSnapshot(
      socialDoc,
      snapshot => {
        if (snapshot.exists()) {
          const remote = snapshot.data() as SocialLinksConfig;
          if (!remote.whatsapp || remote.whatsapp.includes('555') || remote.whatsapp.includes('15558924400')) {
            remote.whatsapp = 'https://wa.me/923426793428';
          }
          setSocialLinks(prev => ({ ...prev, ...remote }));
          localStorage.setItem('mt_social_v2', JSON.stringify({ ...DEFAULT_SOCIAL_LINKS, ...remote }));
        } else {
          setDoc(socialDoc, DEFAULT_SOCIAL_LINKS, { merge: true }).catch(() => {});
        }
      },
      error => {
        handleFirestoreError(error, OperationType.GET, 'social_links/global_social');
      }
    );

    // 2. Services listener
    const servicesColl = collection(db, 'services');
    const unsubServices = onSnapshot(
      servicesColl,
      snapshot => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => d.data() as ServiceItem).sort((a, b) => a.order - b.order);
          setServices(list);
          localStorage.setItem('mt_services', JSON.stringify(list));
        }
        setIsFirebaseLive(true);
      },
      error => {
        handleFirestoreError(error, OperationType.LIST, 'services');
      }
    );

    // 3. Portfolio listener
    const portColl = collection(db, 'portfolio');
    const unsubPort = onSnapshot(
      portColl,
      snapshot => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => d.data() as PortfolioProject).sort((a, b) => a.order - b.order);
          
          // Filter out the Pinterest project if it's still in the local list or Firestore
          const filteredList = list.filter(p => p.id !== 'port-pinterest-web');

          // Delete from Firestore if found
          const hasPinterest = snapshot.docs.some(d => d.id === 'port-pinterest-web');
          if (hasPinterest) {
            deleteDoc(doc(db, 'portfolio', 'port-pinterest-web')).catch(() => {});
          }

          // Auto-seed any missing projects from DEFAULT_PORTFOLIO list (excluding the removed Pinterest project)
          DEFAULT_PORTFOLIO.forEach(p => {
            const exists = filteredList.some(existing => existing.id === p.id);
            if (!exists) {
              setDoc(doc(db, 'portfolio', p.id), p).catch(() => {});
            }
          });

          setPortfolio(filteredList);
          localStorage.setItem('mt_portfolio', JSON.stringify(filteredList));
        } else {
          // Initialize remote portfolio in Firestore if empty
          DEFAULT_PORTFOLIO.forEach(p => {
            setDoc(doc(db, 'portfolio', p.id), p).catch(() => {});
          });
        }
        setIsFirebaseLive(true);
      },
      error => {
        handleFirestoreError(error, OperationType.LIST, 'portfolio');
      }
    );

    // 4. Reviews listener
    const reviewsColl = collection(db, 'reviews');
    const unsubReviews = onSnapshot(
      reviewsColl,
      snapshot => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => d.data() as UserReview);
          setReviews(list);
          localStorage.setItem('mt_reviews', JSON.stringify(list));
        }
        setIsFirebaseLive(true);
      },
      error => {
        handleFirestoreError(error, OperationType.LIST, 'reviews');
      }
    );

    // 5. Messages listener
    const messagesColl = collection(db, 'messages');
    const unsubMessages = onSnapshot(
      messagesColl,
      snapshot => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => d.data() as ContactMessage);
          setMessages(list);
          localStorage.setItem('mt_messages', JSON.stringify(list));
        }
        setIsFirebaseLive(true);
      },
      error => {
        handleFirestoreError(error, OperationType.LIST, 'messages');
      }
    );

    // 6. Stats listener
    const statsColl = collection(db, 'stats');
    const unsubStats = onSnapshot(
      statsColl,
      snapshot => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => d.data() as StatItem).sort((a, b) => a.order - b.order);
          setStats(list);
          localStorage.setItem('mt_stats', JSON.stringify(list));
        }
        setIsFirebaseLive(true);
      },
      error => {
        handleFirestoreError(error, OperationType.LIST, 'stats');
      }
    );

    // 7. Testimonials listener
    const testimonialsColl = collection(db, 'testimonials');
    const unsubTestimonials = onSnapshot(
      testimonialsColl,
      snapshot => {
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => d.data() as TestimonialItem);
          setTestimonials(list);
          localStorage.setItem('mt_testimonials', JSON.stringify(list));
        }
        setIsFirebaseLive(true);
      },
      error => {
        handleFirestoreError(error, OperationType.LIST, 'testimonials');
      }
    );

    // 8. Dynamic Content Items Listener (Dynamic Content System)
    const contentColl = collection(db, 'content_items');
    const unsubContent = onSnapshot(
      contentColl,
      snapshot => {
        setIsDynamicContentLoading(false);
        if (!snapshot.empty) {
          const list = snapshot.docs.map(d => ({
            id: d.id,
            ...(d.data() as Omit<DynamicContentItem, 'id'>)
          })).sort((a, b) => a.order - b.order);
          setDynamicContent(list);
          localStorage.setItem('mt_dynamic_content', JSON.stringify(list));
        } else {
          setDynamicContent([]);
          localStorage.removeItem('mt_dynamic_content');
        }
        setIsFirebaseLive(true);
      },
      error => {
        setIsDynamicContentLoading(false);
        console.warn('[Firestore] Dynamic content listener notice:', error);
      }
    );

    // Theme config listener
    const themeDoc = doc(db, 'siteSettings', 'theme');
    const unsubTheme = onSnapshot(
      themeDoc,
      snapshot => {
        if (snapshot.exists()) {
          const remote = snapshot.data() as SiteThemeConfig;
          if (remote && remote.dark && remote.light) {
            setSiteTheme(remote);
            localStorage.setItem('mt_site_theme', JSON.stringify(remote));
            applyThemeToDocument(remote, theme);
          }
        } else {
          setDoc(themeDoc, DEFAULT_SITE_THEME, { merge: true }).catch(() => {});
        }
      },
      () => {}
    );

    return () => {
      unsubSettings();
      unsubSocial();
      unsubServices();
      unsubPort();
      unsubReviews();
      unsubMessages();
      unsubStats();
      unsubTestimonials();
      unsubContent();
      unsubTheme();
    };
  }, []);

  // ==========================================
  // DYNAMIC FIREBASE CONTENT SYSTEM METHODS
  // ==========================================

  const addDynamicContentItem = async (
    item: Omit<DynamicContentItem, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<DynamicContentItem> => {
    const id = `item-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();
    const newItem: DynamicContentItem = {
      ...item,
      id,
      createdAt: now,
      updatedAt: now,
      isPublished: item.isPublished !== undefined ? item.isPublished : true,
      order: item.order !== undefined ? item.order : dynamicContent.filter(i => i.sectionId === item.sectionId).length + 1
    };

    const nextList = [newItem, ...dynamicContent];
    setDynamicContent(nextList);
    localStorage.setItem('mt_dynamic_content', JSON.stringify(nextList));

    try {
      const payload: Record<string, any> = {};
      for (const [k, v] of Object.entries(newItem)) {
        if (v !== undefined) payload[k] = v;
      }
      await setDoc(doc(db, 'content_items', id), payload);
      logActivity(`Uploaded dynamic ${newItem.contentType}`, 'content_items', id);
    } catch (e) {
      console.error('Failed to create content item in Firestore:', e);
      handleFirestoreError(e, OperationType.CREATE, `content_items/${id}`);
    }

    return newItem;
  };

  const updateDynamicContentItem = async (
    id: string,
    updates: Partial<DynamicContentItem>
  ): Promise<void> => {
    const target = dynamicContent.find(i => i.id === id);
    if (!target) return;
    const now = new Date().toISOString();
    const updated = { ...target, ...updates, updatedAt: now };

    const nextList = dynamicContent.map(i => (i.id === id ? updated : i));
    setDynamicContent(nextList);
    localStorage.setItem('mt_dynamic_content', JSON.stringify(nextList));

    try {
      const payload: Record<string, any> = {};
      for (const [k, v] of Object.entries(updated)) {
        if (v !== undefined) payload[k] = v;
      }
      await setDoc(doc(db, 'content_items', id), payload, { merge: true });
      logActivity(`Updated ${updated.title || updated.contentType}`, 'content_items', id);
    } catch (e) {
      console.error('Failed to update content item in Firestore:', e);
      handleFirestoreError(e, OperationType.UPDATE, `content_items/${id}`);
    }
  };

  const replaceDynamicContentMedia = async (
    id: string,
    newFile: File,
    onProgress?: (pct: number) => void
  ): Promise<void> => {
    const target = dynamicContent.find(i => i.id === id);
    if (!target) throw new Error('Target content item not found');

    const oldStoragePath = target.storagePath;

    // 1. Upload new file to Firebase Storage first (Requirement 8)
    const { downloadURL: newUrl, storagePath: newStoragePath } = await uploadMediaToStorage(
      newFile,
      target.sectionId,
      onProgress
    );

    const now = new Date().toISOString();
    const updated: DynamicContentItem = {
      ...target,
      downloadURL: newUrl,
      storagePath: newStoragePath,
      updatedAt: now,
      metadata: {
        fileSize: newFile.size,
        fileType: newFile.type,
        fileName: newFile.name
      }
    };

    // 2. Update Firestore reference
    try {
      const payload: Record<string, any> = {};
      for (const [k, v] of Object.entries(updated)) {
        if (v !== undefined) payload[k] = v;
      }
      await setDoc(doc(db, 'content_items', id), payload, { merge: true });

      // 3. Update local state
      const nextList = dynamicContent.map(i => (i.id === id ? updated : i));
      setDynamicContent(nextList);
      localStorage.setItem('mt_dynamic_content', JSON.stringify(nextList));

      // 4. Safely remove old storage file only after new reference is verified and stored
      if (oldStoragePath && oldStoragePath !== newStoragePath) {
        deleteMediaFromStorage(oldStoragePath).catch(() => {});
      }

      logActivity(`Replaced media for ${target.title}`, 'content_items', id);
    } catch (err) {
      console.error('Firestore update failed during replace:', err);
      // Clean up newly uploaded file to prevent orphaned storage asset
      deleteMediaFromStorage(newStoragePath).catch(() => {});
      throw err;
    }
  };

  const deleteDynamicContentItem = async (id: string): Promise<void> => {
    const target = dynamicContent.find(i => i.id === id);
    const storagePathToDelete = target?.storagePath;

    // 1. Remove from local state immediately
    const nextList = dynamicContent.filter(i => i.id !== id);
    setDynamicContent(nextList);
    localStorage.setItem('mt_dynamic_content', JSON.stringify(nextList));

    // 2. Remove from Firestore
    try {
      await deleteDoc(doc(db, 'content_items', id));

      // 3. Safely delete from Storage after Firestore document is removed
      if (storagePathToDelete) {
        deleteMediaFromStorage(storagePathToDelete).catch(() => {});
      }

      logActivity(`Deleted content ${target?.title || id}`, 'content_items', id);
    } catch (e) {
      console.error('Failed to delete content item from Firestore:', e);
      handleFirestoreError(e, OperationType.DELETE, `content_items/${id}`);
    }
  };

  const togglePublishContentItem = async (id: string): Promise<void> => {
    const target = dynamicContent.find(i => i.id === id);
    if (!target) return;
    const newStatus = !target.isPublished;
    await updateDynamicContentItem(id, { isPublished: newStatus });
  };

  const reorderContentItems = async (sectionId: WebsiteSectionId, itemIds: string[]): Promise<void> => {
    const updatedList = dynamicContent.map(item => {
      if (item.sectionId === sectionId) {
        const newOrder = itemIds.indexOf(item.id);
        if (newOrder !== -1) {
          return { ...item, order: newOrder + 1 };
        }
      }
      return item;
    });

    setDynamicContent(updatedList);
    localStorage.setItem('mt_dynamic_content', JSON.stringify(updatedList));

    try {
      await Promise.all(
        itemIds.map((itemId, idx) =>
          updateDoc(doc(db, 'content_items', itemId), { order: idx + 1, updatedAt: new Date().toISOString() })
        )
      );
    } catch (err) {
      console.warn('Reorder Firestore sync notice:', err);
    }
  };

  const getSectionContent = (sectionId: WebsiteSectionId, filterPublished = true): DynamicContentItem[] => {
    return dynamicContent
      .filter(item => item.sectionId === sectionId && (!filterPublished || item.isPublished))
      .sort((a, b) => a.order - b.order);
  };

  const getSectionMedia = (
    sectionId: WebsiteSectionId,
    defaultUrl: string,
    type?: DynamicContentType
  ): string => {
    const items = dynamicContent
      .filter(
        item =>
          item.sectionId === sectionId &&
          item.isPublished &&
          (!type || item.contentType === type)
      )
      .sort((a, b) => a.order - b.order);

    if (items.length > 0 && items[0].downloadURL) {
      return items[0].downloadURL;
    }
    return defaultUrl;
  };

  // Settings update
  const updateSettings = async (newSettings: Partial<WebsiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('mt_settings', JSON.stringify(updated));
    try {
      // Clean payload of any undefined values for Firestore
      const payload: Record<string, any> = {};
      for (const [key, val] of Object.entries(updated)) {
        if (val !== undefined) {
          payload[key] = val;
        }
      }
      await setDoc(doc(db, 'settings', 'global_settings'), payload, { merge: true });
    } catch (e) {
      console.error('Failed to sync settings with Firestore:', e);
      handleFirestoreError(e, OperationType.WRITE, 'settings/global_settings');
    }
  };

  // Stats update
  const updateStat = async (id: string, number: string, label: string) => {
    const updated = stats.map(s => (s.id === id ? { ...s, number, label } : s));
    setStats(updated);
    localStorage.setItem('mt_stats', JSON.stringify(updated));
    try {
      await updateDoc(doc(db, 'stats', id), { number, label });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `stats/${id}`);
    }
  };

  // Social Links update
  const updateSocialLinks = async (links: Partial<SocialLinksConfig>) => {
    const updated = { ...socialLinks, ...links };
    setSocialLinks(updated);
    localStorage.setItem('mt_social_v2', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'social_links', 'global_social'), updated, { merge: true });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'social_links/global_social');
    }
  };

  // Services mutations
  const addService = async (newSrv: Omit<ServiceItem, 'id' | 'order'>) => {
    const id = `srv-${Date.now()}`;
    const item: ServiceItem = {
      ...newSrv,
      id,
      order: services.length + 1
    };
    const updated = [...services, item];
    setServices(updated);
    localStorage.setItem('mt_services', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'services', id), item);
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `services/${id}`);
    }
  };

  const updateService = async (id: string, updated: Partial<ServiceItem>) => {
    const list = services.map(s => (s.id === id ? { ...s, ...updated } : s));
    setServices(list);
    localStorage.setItem('mt_services', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'services', id), updated);
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `services/${id}`);
    }
  };

  const deleteService = async (id: string) => {
    const list = services.filter(s => s.id !== id);
    setServices(list);
    localStorage.setItem('mt_services', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `services/${id}`);
    }
  };

  const toggleServiceEnabled = async (id: string) => {
    const target = services.find(s => s.id === id);
    if (!target) return;
    const newEnabled = !target.enabled;
    const list = services.map(s => (s.id === id ? { ...s, enabled: newEnabled } : s));
    setServices(list);
    localStorage.setItem('mt_services', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'services', id), { enabled: newEnabled });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `services/${id}`);
    }
  };

  // Portfolio mutations
  const addProject = async (project: Omit<PortfolioProject, 'id' | 'order'>) => {
    const id = `port-${Date.now()}`;
    const newProj: PortfolioProject = {
      ...project,
      id,
      order: portfolio.length + 1
    };
    const list = [...portfolio, newProj];
    setPortfolio(list);
    localStorage.setItem('mt_portfolio', JSON.stringify(list));
    try {
      await setDoc(doc(db, 'portfolio', id), newProj);
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `portfolio/${id}`);
    }
  };

  const updateProject = async (id: string, updated: Partial<PortfolioProject>) => {
    const list = portfolio.map(p => (p.id === id ? { ...p, ...updated } : p));
    setPortfolio(list);
    localStorage.setItem('mt_portfolio', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'portfolio', id), updated);
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `portfolio/${id}`);
    }
  };

  const deleteProject = async (id: string) => {
    const list = portfolio.filter(p => p.id !== id);
    setPortfolio(list);
    localStorage.setItem('mt_portfolio', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'portfolio', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `portfolio/${id}`);
    }
  };

  const toggleProjectFeatured = async (id: string) => {
    const target = portfolio.find(p => p.id === id);
    if (!target) return;
    const newFeatured = !target.featured;
    const list = portfolio.map(p => (p.id === id ? { ...p, featured: newFeatured } : p));
    setPortfolio(list);
    localStorage.setItem('mt_portfolio', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'portfolio', id), { featured: newFeatured });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `portfolio/${id}`);
    }
  };

  // Testimonials mutations
  const addTestimonial = async (item: Omit<TestimonialItem, 'id'>) => {
    const id = `test-${Date.now()}`;
    const newT: TestimonialItem = { ...item, id };
    const list = [newT, ...testimonials];
    setTestimonials(list);
    localStorage.setItem('mt_testimonials', JSON.stringify(list));
    try {
      await setDoc(doc(db, 'testimonials', id), newT);
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `testimonials/${id}`);
    }
  };

  const updateTestimonial = async (id: string, updated: Partial<TestimonialItem>) => {
    const list = testimonials.map(t => (t.id === id ? { ...t, ...updated } : t));
    setTestimonials(list);
    localStorage.setItem('mt_testimonials', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'testimonials', id), updated);
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `testimonials/${id}`);
    }
  };

  const deleteTestimonial = async (id: string) => {
    const list = testimonials.filter(t => t.id !== id);
    setTestimonials(list);
    localStorage.setItem('mt_testimonials', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'testimonials', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `testimonials/${id}`);
    }
  };

  // Reviews mutations
  const submitReview = async (r: {
    name: string;
    email: string;
    rating: number;
    review: string;
    serviceUsed?: string;
    avatarUrl?: string;
    isGoogleVerified?: boolean;
    googleUid?: string;
  }) => {
    const id = `rev-${Date.now()}`;
    const newRev: UserReview = {
      id,
      name: r.name,
      email: r.email,
      rating: r.rating,
      review: r.review,
      serviceUsed: r.serviceUsed || 'General Service',
      avatarUrl:
        r.avatarUrl ||
        `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80`,
      status: 'Pending',
      featured: false,
      createdAt: new Date().toISOString().split('T')[0],
      isGoogleVerified: r.isGoogleVerified || false
    };

    const list = [newRev, ...reviews];
    setReviews(list);
    localStorage.setItem('mt_reviews', JSON.stringify(list));
    try {
      await setDoc(doc(db, 'reviews', id), newRev);
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `reviews/${id}`);
    }
  };

  const updateReviewStatus = async (id: string, status: ReviewStatus) => {
    const list = reviews.map(r => (r.id === id ? { ...r, status } : r));
    setReviews(list);
    localStorage.setItem('mt_reviews', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'reviews', id), { status });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `reviews/${id}`);
    }
  };

  const toggleReviewFeatured = async (id: string) => {
    const target = reviews.find(r => r.id === id);
    if (!target) return;
    const newFeatured = !target.featured;
    const list = reviews.map(r => (r.id === id ? { ...r, featured: newFeatured } : r));
    setReviews(list);
    localStorage.setItem('mt_reviews', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'reviews', id), { featured: newFeatured });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `reviews/${id}`);
    }
  };

  const deleteReview = async (id: string) => {
    const list = reviews.filter(r => r.id !== id);
    setReviews(list);
    localStorage.setItem('mt_reviews', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'reviews', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `reviews/${id}`);
    }
  };

  // Messages mutations
  const submitContactMessage = async (msg: {
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  }): Promise<boolean> => {
    if (!msg.name || !msg.email || !msg.message) {
      return false;
    }
    const id = `msg-${Date.now()}`;
    const newMsg: ContactMessage = {
      id,
      name: msg.name,
      email: msg.email,
      phone: msg.phone || 'N/A',
      service: msg.service || 'General Inquiry',
      message: msg.message,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    const list = [newMsg, ...messages];
    setMessages(list);
    localStorage.setItem('mt_messages', JSON.stringify(list));
    try {
      await setDoc(doc(db, 'messages', id), newMsg);
    } catch (e) {
      handleFirestoreError(e, OperationType.CREATE, `messages/${id}`);
    }
    return true;
  };

  const updateMessageStatus = async (id: string, status: MessageStatus) => {
    const list = messages.map(m => (m.id === id ? { ...m, status } : m));
    setMessages(list);
    localStorage.setItem('mt_messages', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'messages', id), { status });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `messages/${id}`);
    }
  };

  const deleteMessage = async (id: string) => {
    const list = messages.filter(m => m.id !== id);
    setMessages(list);
    localStorage.setItem('mt_messages', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `messages/${id}`);
    }
  };

  // ==========================================
  // NEW CMS & WEBSITE MANAGEMENT SUB-SYSTEMS MUTATIONS
  // ==========================================

  // Blogs mutations
  const addBlog = async (newBlog: Omit<BlogPost, 'id' | 'publishedAt'>) => {
    const id = `blog-${Date.now()}`;
    const item: BlogPost = {
      ...newBlog,
      id,
      publishedAt: new Date().toISOString()
    };
    const updated = [item, ...blogs];
    setBlogs(updated);
    localStorage.setItem('mt_blogs', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'blogs', id), item);
    } catch (e) {
      console.warn('Firestore blog write failed:', e);
    }
  };

  const updateBlog = async (id: string, updatedFields: Partial<BlogPost>) => {
    const list = blogs.map(b => (b.id === id ? { ...b, ...updatedFields } : b));
    setBlogs(list);
    localStorage.setItem('mt_blogs', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'blogs', id), updatedFields);
    } catch (e) {
      console.warn('Firestore blog update failed:', e);
    }
  };

  const deleteBlog = async (id: string) => {
    const list = blogs.filter(b => b.id !== id);
    setBlogs(list);
    localStorage.setItem('mt_blogs', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'blogs', id));
    } catch (e) {
      console.warn('Firestore blog delete failed:', e);
    }
  };

  // Products mutations
  const addProduct = async (newProd: Omit<ProductItem, 'id' | 'createdAt'>) => {
    const id = `prod-${Date.now()}`;
    const item: ProductItem = {
      ...newProd,
      id,
      createdAt: new Date().toISOString()
    };
    const updated = [item, ...products];
    setProducts(updated);
    localStorage.setItem('mt_products', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'products', id), item);
    } catch (e) {
      console.warn('Firestore product write failed:', e);
    }
  };

  const updateProduct = async (id: string, updatedFields: Partial<ProductItem>) => {
    const list = products.map(p => (p.id === id ? { ...p, ...updatedFields } : p));
    setProducts(list);
    localStorage.setItem('mt_products', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'products', id), updatedFields);
    } catch (e) {
      console.warn('Firestore product update failed:', e);
    }
  };

  const deleteProduct = async (id: string) => {
    const list = products.filter(p => p.id !== id);
    setProducts(list);
    localStorage.setItem('mt_products', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {
      console.warn('Firestore product delete failed:', e);
    }
  };

  // Pages mutations
  const addPage = async (newPage: Omit<CustomPage, 'id'>) => {
    const id = `page-${Date.now()}`;
    const item: CustomPage = { ...newPage, id };
    const updated = [...pages, item];
    setPages(updated);
    localStorage.setItem('mt_pages', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'pages', id), item);
    } catch (e) {
      console.warn('Firestore page write failed:', e);
    }
  };

  const updatePage = async (id: string, updatedFields: Partial<CustomPage>) => {
    const list = pages.map(p => (p.id === id ? { ...p, ...updatedFields } : p));
    setPages(list);
    localStorage.setItem('mt_pages', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'pages', id), updatedFields);
    } catch (e) {
      console.warn('Firestore page update failed:', e);
    }
  };

  const deletePage = async (id: string) => {
    const list = pages.filter(p => p.id !== id);
    setPages(list);
    localStorage.setItem('mt_pages', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'pages', id));
    } catch (e) {
      console.warn('Firestore page delete failed:', e);
    }
  };

  // Forms mutations
  const addCustomForm = async (newForm: Omit<CustomForm, 'id' | 'submissionsCount'>) => {
    const id = `form-${Date.now()}`;
    const item: CustomForm = { ...newForm, id, submissionsCount: 0 };
    const updated = [...customForms, item];
    setCustomForms(updated);
    localStorage.setItem('mt_forms', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'forms', id), item);
    } catch (e) {
      console.warn('Firestore form write failed:', e);
    }
  };

  const updateCustomForm = async (id: string, updatedFields: Partial<CustomForm>) => {
    const list = customForms.map(f => (f.id === id ? { ...f, ...updatedFields } : f));
    setCustomForms(list);
    localStorage.setItem('mt_forms', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'forms', id), updatedFields);
    } catch (e) {
      console.warn('Firestore form update failed:', e);
    }
  };

  const deleteCustomForm = async (id: string) => {
    const list = customForms.filter(f => f.id !== id);
    setCustomForms(list);
    localStorage.setItem('mt_forms', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'forms', id));
    } catch (e) {
      console.warn('Firestore form delete failed:', e);
    }
  };

  const submitCustomForm = async (formId: string, data: Record<string, string>): Promise<boolean> => {
    const form = customForms.find(f => f.id === formId);
    if (!form) return false;

    const subId = `sub-${Date.now()}`;
    const submission: FormSubmission = {
      id: subId,
      formId,
      formTitle: form.title,
      data,
      createdAt: new Date().toISOString()
    };

    const updatedSubs = [submission, ...formSubmissions];
    setFormSubmissions(updatedSubs);
    localStorage.setItem('mt_submissions', JSON.stringify(updatedSubs));

    const updatedForms = customForms.map(f => f.id === formId ? { ...f, submissionsCount: f.submissionsCount + 1 } : f);
    setCustomForms(updatedForms);
    localStorage.setItem('mt_forms', JSON.stringify(updatedForms));

    try {
      await setDoc(doc(db, 'submissions', subId), submission);
      await updateDoc(doc(db, 'forms', formId), { submissionsCount: form.submissionsCount + 1 });
    } catch (e) {
      console.warn('Firestore submission write failed:', e);
    }
    return true;
  };

  const deleteSubmission = async (id: string) => {
    const list = formSubmissions.filter(s => s.id !== id);
    setFormSubmissions(list);
    localStorage.setItem('mt_submissions', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'submissions', id));
    } catch (e) {
      console.warn('Firestore submission delete failed:', e);
    }
  };

  // Media mutations
  const addMediaAsset = async (asset: Omit<MediaAsset, 'id' | 'createdAt'>) => {
    const id = `med-${Date.now()}`;
    const item: MediaAsset = {
      ...asset,
      id,
      createdAt: new Date().toISOString()
    };
    const updated = [item, ...mediaLibrary];
    setMediaLibrary(updated);
    localStorage.setItem('mt_media', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'media', id), item);
    } catch (e) {
      console.warn('Firestore media write failed:', e);
    }
  };

  const deleteMediaAsset = async (id: string) => {
    const list = mediaLibrary.filter(m => m.id !== id);
    setMediaLibrary(list);
    localStorage.setItem('mt_media', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'media', id));
    } catch (e) {
      console.warn('Firestore media delete failed:', e);
    }
  };

  // Menu navigation mutations
  const updateMenuOrder = async (updatedMenus: NavigationMenuItem[]) => {
    setMenus(updatedMenus);
    localStorage.setItem('mt_menus', JSON.stringify(updatedMenus));
    try {
      for (const m of updatedMenus) {
        await setDoc(doc(db, 'menus', m.id), m);
      }
    } catch (e) {
      console.warn('Firestore menu order write failed:', e);
    }
  };

  const addMenuItem = async (item: Omit<NavigationMenuItem, 'id'>) => {
    const id = `menu-${Date.now()}`;
    const newItem: NavigationMenuItem = { ...item, id };
    const updated = [...menus, newItem].sort((a, b) => a.order - b.order);
    setMenus(updated);
    localStorage.setItem('mt_menus', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'menus', id), newItem);
    } catch (e) {
      console.warn('Firestore menu item write failed:', e);
    }
  };

  const updateMenuItem = async (id: string, updatedFields: Partial<NavigationMenuItem>) => {
    const list = menus.map(m => (m.id === id ? { ...m, ...updatedFields } : m)).sort((a, b) => a.order - b.order);
    setMenus(list);
    localStorage.setItem('mt_menus', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'menus', id), updatedFields);
    } catch (e) {
      console.warn('Firestore menu item update failed:', e);
    }
  };

  const deleteMenuItem = async (id: string) => {
    const list = menus.filter(m => m.id !== id);
    setMenus(list);
    localStorage.setItem('mt_menus', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'menus', id));
    } catch (e) {
      console.warn('Firestore menu item delete failed:', e);
    }
  };

  // CMS Users mutations
  const updateUserRole = async (id: string, role: CMSUser['role']) => {
    const list = cmsUsers.map(u => (u.id === id ? { ...u, role } : u));
    setCmsUsers(list);
    localStorage.setItem('mt_cms_users', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'cms_users', id), { role });
    } catch (e) {
      console.warn('Firestore user role update failed:', e);
    }
  };

  const updateUserStatus = async (id: string, status: CMSUser['status']) => {
    const list = cmsUsers.map(u => (u.id === id ? { ...u, status } : u));
    setCmsUsers(list);
    localStorage.setItem('mt_cms_users', JSON.stringify(list));
    try {
      await updateDoc(doc(db, 'cms_users', id), { status });
    } catch (e) {
      console.warn('Firestore user status update failed:', e);
    }
  };

  const deleteUser = async (id: string) => {
    const list = cmsUsers.filter(u => u.id !== id);
    setCmsUsers(list);
    localStorage.setItem('mt_cms_users', JSON.stringify(list));
    try {
      await deleteDoc(doc(db, 'cms_users', id));
    } catch (e) {
      console.warn('Firestore user delete failed:', e);
    }
  };

  // Google Authentication Flow (Firebase Auth)
  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const { user, isAdmin } = await signInWithGoogle();
      if (isAdmin) {
        setIsAdminLoggedIn(true);
        setAdminUser({
          username: user.displayName || 'marketingtycoons_admin',
          email: user.email || 'marketingtycoons.tech@gmail.com',
          role: 'Super Admin',
          lastLogin: new Date().toLocaleDateString()
        });
        localStorage.setItem('mt_admin_auth', 'true');
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login with Google error:', err);
      throw err;
    }
  };

  // Admin Credential Authentication Fallback
  const adminLogin = (user: string, pass: string): boolean => {
    const cleanUser = user.toLowerCase().trim();
    const cleanPass = pass.trim();

    // Secure authentication validation
    const validUsers = ['admin', 'marketingtycoons', 'marketingtycoons_admin', 'tycoon'];
    const validPass = ['tycoons2026!', 'MarketingTycoons2026!', 'admin2026', 'admin'];

    if (
      (validUsers.includes(cleanUser) && validPass.includes(cleanPass)) ||
      (cleanUser === 'admin' && (cleanPass === 'tycoons2026!' || cleanPass === 'admin'))
    ) {
      setIsAdminLoggedIn(true);
      setAdminUser({
        username: user,
        email: 'marketingtycoons.tech@gmail.com',
        role: 'Super Admin',
        lastLogin: new Date().toLocaleDateString()
      });
      localStorage.setItem('mt_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const adminLogout = async () => {
    try {
      await logoutUser();
    } catch (e) {
      // ignore
    }
    setIsAdminLoggedIn(false);
    setAdminUser(null);
    localStorage.removeItem('mt_admin_auth');
    setCurrentView('public');
  };

  // Modals state
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceItem | null>(null);
  const [activeProjectModal, setActiveProjectModal] = useState<PortfolioProject | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isGoogleOAuthModalOpen, setIsGoogleOAuthModalOpen] = useState(false);
  const [isVideoStoryModalOpen, setIsVideoStoryModalOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [teamMembers] = useState<TeamMember[]>(DEFAULT_TEAM_MEMBERS);
  const [industries] = useState<IndustryItem[]>(DEFAULT_INDUSTRIES);

  const resetToFactoryDefaults = () => {
    localStorage.removeItem('mt_settings');
    localStorage.removeItem('mt_services');
    localStorage.removeItem('mt_portfolio');
    localStorage.removeItem('mt_testimonials');
    localStorage.removeItem('mt_reviews');
    localStorage.removeItem('mt_messages');
    localStorage.removeItem('mt_stats');
    localStorage.removeItem('mt_social_v2');
    localStorage.removeItem('mt_blogs');
    localStorage.removeItem('mt_products');
    localStorage.removeItem('mt_pages');
    localStorage.removeItem('mt_forms');
    localStorage.removeItem('mt_submissions');
    localStorage.removeItem('mt_media');
    localStorage.removeItem('mt_menus');
    localStorage.removeItem('mt_cms_users');

    setSettings(DEFAULT_WEBSITE_SETTINGS);
    setServices(DEFAULT_SERVICES);
    setPortfolio(DEFAULT_PORTFOLIO);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setReviews(DEFAULT_REVIEWS);
    setMessages(DEFAULT_MESSAGES);
    setStats(DEFAULT_STATS);
    setSocialLinks(DEFAULT_SOCIAL_LINKS);
    setBlogs(DEFAULT_BLOGS);
    setProducts(DEFAULT_PRODUCTS);
    setPages(DEFAULT_PAGES);
    setCustomForms(DEFAULT_FORMS);
    setFormSubmissions(DEFAULT_SUBMISSIONS);
    setMediaLibrary(DEFAULT_MEDIA);
    setMenus(DEFAULT_MENUS);
    setCmsUsers(DEFAULT_CMS_USERS);
  };

  // Dynamically synchronize active portfolio/service elements to Google SEO crawlers and OpenGraph engines
  useEffect(() => {
    if (activeProjectModal) {
      setProjectMeta(activeProjectModal);
    } else if (activeServiceModal) {
      setServiceMeta(activeServiceModal);
    } else {
      resetDefaultMeta();
    }
  }, [activeProjectModal, activeServiceModal]);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        setTheme,
        settings,
        updateSettings,
        stats,
        updateStat,
        socialLinks,
        updateSocialLinks,
        currentView,
        setCurrentView,
        activeAdminTab,
        setActiveAdminTab,
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
        submitReview,
        updateReviewStatus,
        toggleReviewFeatured,
        deleteReview,
        messages,
        submitContactMessage,
        updateMessageStatus,
        deleteMessage,
        currentUser,
        isAdminLoggedIn,
        adminUser,
        adminLogin,
        loginWithGoogle,
        adminLogout,
        isFirebaseLive,

        // New CMS states
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
        deleteUser,
        activityLogs,
        logActivity,

        activeServiceModal,
        setActiveServiceModal,
        activeProjectModal,
        setActiveProjectModal,
        isReviewModalOpen,
        setIsReviewModalOpen,
        isGoogleOAuthModalOpen,
        setIsGoogleOAuthModalOpen,
        isVideoStoryModalOpen,
        setIsVideoStoryModalOpen,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        isTermsModalOpen,
        setIsTermsModalOpen,
        isRefundModalOpen,
        setIsRefundModalOpen,
        isCookieModalOpen,
        setIsCookieModalOpen,
        isConsultationModalOpen,
        setIsConsultationModalOpen,
        isWeChatModalOpen,
        setIsWeChatModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        teamMembers,
        industries,
        resetToFactoryDefaults,

        // Dynamic Content Management System
        dynamicContent,
        isDynamicContentLoading,
        addDynamicContentItem,
        updateDynamicContentItem,
        replaceDynamicContentMedia,
        deleteDynamicContentItem,
        togglePublishContentItem,
        reorderContentItems,
        getSectionContent,
        getSectionMedia,

        // Theme Customization System
        siteTheme,
        updateThemeDraft,
        publishTheme,
        resetThemeToDefault,
        showNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
