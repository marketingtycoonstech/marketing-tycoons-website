import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ClientTicker } from './components/ClientTicker';
import { StatsStrip } from './components/StatsStrip';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { StorytellingSection } from './components/StorytellingSection';
import { PortfolioSection } from './components/PortfolioSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { CinematicCtaSection } from './components/CinematicCtaSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { GlobalReach } from './components/GlobalReach';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { ProcessSection } from './components/ProcessSection';
import { TeamSection } from './components/TeamSection';
import { IndustriesSection } from './components/IndustriesSection';

// Cinematic Experience Enhancements
import { ScrollProgress } from './components/common/ScrollProgress';
import { PageLoader } from './components/common/PageLoader';
import { CustomCursor } from './components/common/CustomCursor';
import { FloatingWhatsAppButton } from './components/common/FloatingWhatsAppButton';

// Modals
import { ServiceDetailModal } from './components/modals/ServiceDetailModal';
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { LeaveReviewModal } from './components/modals/LeaveReviewModal';
import { GoogleOAuthModal } from './components/modals/GoogleOAuthModal';
import { VideoStoryModal } from './components/modals/VideoStoryModal';
import { AdminLoginModal } from './components/modals/AdminLoginModal';
import { LegalModals } from './components/modals/LegalModals';
import { ConsultationModal } from './components/modals/ConsultationModal';

// Admin View
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainAppContent: React.FC = () => {
  const { currentView, setCurrentView, isAdminLoggedIn, setIsLoginModalOpen, pages } = useApp();

  const homePage = pages.find(p => p.id === 'page-home');
  const sectionsOrder = homePage?.sectionsOrder || [
    'hero',
    'ticker',
    'services',
    'whyChooseUs',
    'process',
    'portfolio',
    'testimonials',
    'team',
    'industries',
    'faq',
    'contact'
  ];

  // Listen to browser path or hash changes (e.g. /admin or #admin) and keyboard stealth shortcut
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin') {
        if (isAdminLoggedIn) {
          setCurrentView('admin');
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Stealth admin shortcut: Ctrl+Shift+A or Cmd+Shift+A
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setCurrentView(currentView === 'admin' ? 'public' : 'admin');
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAdminLoggedIn, setCurrentView, setIsLoginModalOpen]);

  // If in Admin Mode & Logged in, show Admin Dashboard
  if (currentView === 'admin' && isAdminLoggedIn) {
    return <AdminDashboard />;
  }

  // Otherwise show Public Website
  return (
    <div className="min-h-screen bg-[#F8F7F3] text-[#111111] dark:bg-[#050505] dark:text-[#D1D5DB] antialiased selection:bg-[#B88932] selection:text-white dark:selection:bg-[#D4AF37] dark:selection:text-black transition-colors duration-300">
      {/* 1. Subtle Gold Scroll Progress Bar */}
      <ScrollProgress />

      {/* 2. Initial Page Entrance Loader */}
      <PageLoader />

      {/* 3. Luxury Desktop Custom Glass Cursor System with Trail & Ripples */}
      <CustomCursor />

      {/* Primary Fixed Navigation with Metallic MT Logo */}
      <Navbar />

      <main id="main-content" className="relative">
        {sectionsOrder.map((sectionId) => {
          switch (sectionId) {
            case 'hero':
              return <Hero key="hero" />;
            case 'ticker':
              return <ClientTicker key="ticker" />;
            case 'stats':
              return <StatsStrip key="stats" />;
            case 'services':
              return <ServicesSection key="services" />;
            case 'whyChooseUs':
              return <WhyChooseUsSection key="whyChooseUs" />;
            case 'process':
              return <ProcessSection key="process" />;
            case 'about':
              return <AboutSection key="about" />;
            case 'story':
              return <StorytellingSection key="story" />;
            case 'portfolio':
              return <PortfolioSection key="portfolio" />;
            case 'testimonials':
              return <TestimonialsSection key="testimonials" />;
            case 'team':
              return <TeamSection key="team" />;
            case 'industries':
              return <IndustriesSection key="industries" />;
            case 'reach':
              return <GlobalReach key="globalReach" />;
            case 'faq':
              return <FaqSection key="faq" />;
            case 'cta':
              return <CinematicCtaSection key="cta" />;
            case 'contact':
              return <ContactSection key="contact" />;
            default:
              return null;
          }
        })}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Access Bubble */}
      <FloatingWhatsAppButton />

      {/* Modals & Overlays */}
      <ServiceDetailModal />
      <ProjectDetailModal />
      <LeaveReviewModal />
      <GoogleOAuthModal />
      <VideoStoryModal />
      <AdminLoginModal />
      <LegalModals />
      <ConsultationModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
