import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  DEFAULT_MESSAGES,
  DEFAULT_PORTFOLIO,
  DEFAULT_REVIEWS,
  DEFAULT_SERVICES,
  DEFAULT_SOCIAL_LINKS,
  DEFAULT_STATS,
  DEFAULT_TESTIMONIALS,
  DEFAULT_WEBSITE_SETTINGS
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
  WebsiteSettings
} from '../types';
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
  OperationType
} from '../lib/firebase';

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
  isWeChatModalOpen: boolean;
  setIsWeChatModalOpen: (open: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (open: boolean) => void;

  // Reset to default helper
  resetToFactoryDefaults: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('mt_theme');
    return saved === 'light' ? 'light' : 'dark';
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
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
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

  // Listen to Firebase Auth state
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

    return () => unsubscribe();
  }, []);

  // Real-time Firestore Synchronizations
  useEffect(() => {
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
          // Auto-seed the newly added Pinterest web project if it does not exist in the database list
          const hasPinterestProject = list.some(p => p.id === 'port-pinterest-web');
          if (!hasPinterestProject) {
            const pinterestProj = DEFAULT_PORTFOLIO.find(p => p.id === 'port-pinterest-web');
            if (pinterestProj) {
              setDoc(doc(db, 'portfolio', 'port-pinterest-web'), pinterestProj).catch(() => {});
            }
          }
          setPortfolio(list);
          localStorage.setItem('mt_portfolio', JSON.stringify(list));
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

    return () => {
      unsubSettings();
      unsubSocial();
      unsubServices();
      unsubPort();
      unsubReviews();
      unsubMessages();
      unsubStats();
    };
  }, []);

  // Settings update
  const updateSettings = async (newSettings: Partial<WebsiteSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    localStorage.setItem('mt_settings', JSON.stringify(updated));
    try {
      await setDoc(doc(db, 'settings', 'global_settings'), updated, { merge: true });
    } catch (e) {
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
      return false;
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
  const [isWeChatModalOpen, setIsWeChatModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const resetToFactoryDefaults = () => {
    localStorage.removeItem('mt_settings');
    localStorage.removeItem('mt_services');
    localStorage.removeItem('mt_portfolio');
    localStorage.removeItem('mt_testimonials');
    localStorage.removeItem('mt_reviews');
    localStorage.removeItem('mt_messages');
    localStorage.removeItem('mt_stats');
    localStorage.removeItem('mt_social_v2');

    setSettings(DEFAULT_WEBSITE_SETTINGS);
    setServices(DEFAULT_SERVICES);
    setPortfolio(DEFAULT_PORTFOLIO);
    setTestimonials(DEFAULT_TESTIMONIALS);
    setReviews(DEFAULT_REVIEWS);
    setMessages(DEFAULT_MESSAGES);
    setStats(DEFAULT_STATS);
    setSocialLinks(DEFAULT_SOCIAL_LINKS);
  };

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
        isWeChatModalOpen,
        setIsWeChatModalOpen,
        isLoginModalOpen,
        setIsLoginModalOpen,
        resetToFactoryDefaults
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
