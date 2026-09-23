export type ThemeMode = 'dark' | 'light';

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  enabled: boolean;
  order: number;
  features: string[];
  deliverables: string[];
  startingPrice?: string;
  bgImageUrl?: string;
  videoUrl?: string;
}

export type ProjectCategory =
  | 'Websites'
  | 'E-Commerce'
  | 'Branding'
  | 'Graphic Design'
  | 'Social Media'
  | 'SEO'
  | 'Meta Ads';

export type ProjectStatus = 'Live Project' | 'Concept Project' | 'Demo Project';

export interface ProjectMilestone {
  label: string;
  value: string;
}

export interface ProjectSocialLink {
  platform: string;
  url: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: ProjectCategory;
  shortDescription: string;
  fullDescription: string;
  servicesProvided: string[];
  imageUrl: string;
  videoUrl?: string;
  projectUrl?: string;
  status: ProjectStatus;
  featured: boolean;
  order: number;
  clientName?: string;
  completionDate?: string;
  timeline?: string;
  tags: string[];
  results?: string | string[];
  milestones?: ProjectMilestone[];
  socialLinks?: ProjectSocialLink[];
  technologies?: string[];
  browserUrl?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  company: string;
  role?: string;
  avatarUrl: string;
  rating: number;
  review: string;
  featured: boolean;
  approved: boolean;
  date: string;
  projectBadge?: string;
}

export type ReviewStatus = 'Pending' | 'Approved' | 'Rejected';

export interface UserReview {
  id: string;
  name: string;
  email: string;
  rating: number;
  review: string;
  serviceUsed?: string;
  avatarUrl?: string;
  status: ReviewStatus;
  featured: boolean;
  createdAt: string;
  isGoogleVerified?: boolean;
}

export type MessageStatus = 'New' | 'Read' | 'Replied' | 'Archived';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
}

export interface StatItem {
  id: string;
  number: string;
  label: string;
  order: number;
}

export interface SocialLinksConfig {
  facebook: string;
  instagram: string;
  linkedin: string;
  tiktok: string;
  youtube: string;
  pinterest: string;
  x: string;
  whatsapp: string;
  olx: string;
  reddit: string;
}

export interface WebsiteSettings {
  companyName: string;
  tagline: string;
  domain: string;
  primaryEmail: string;
  phone: string;
  whatsappNumber: string;
  wechatId: string;
  address: string;
  heroHeadlinePrefix: string;
  heroHeadlineHighlight: string;
  heroDescription: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  footerText: string;
  aboutHeadline: string;
  aboutText: string;
  aboutFeatures: string[];
  heroImageUrl?: string;
  lightHeroImage?: string;
  darkHeroImage?: string;
  logoUrl?: string;

  // Cinematic Video & Visual Settings
  heroVideoUrl?: string;
  lightHeroVideo?: string;
  darkHeroVideo?: string;
  heroVideoPoster?: string;
  heroMobileVideoUrl?: string;
  heroVideoEnabled?: boolean;
  heroVideoOverlayOpacity?: number;

  fullWidthVideoUrl?: string;
  fullWidthVideoPoster?: string;
  fullWidthVideoEnabled?: boolean;
  fullWidthHeadline?: string;
  fullWidthSubheadline?: string;

  aboutVideoUrl?: string;
  aboutVideoPoster?: string;
  aboutVideoEnabled?: boolean;

  ctaVideoUrl?: string;
  ctaVideoPoster?: string;
  ctaVideoEnabled?: boolean;
  ctaHeadline?: string;
  ctaSubheading?: string;
}

export interface AdminUser {
  username: string;
  email: string;
  role: 'Super Admin' | 'Editor';
  lastLogin?: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'Super Admin' | 'Editor' | 'Client';
  isGoogleVerified?: boolean;
}
