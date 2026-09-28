export type ThemeMode = 'dark' | 'light';

export interface ServiceProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

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
  // Deep service fields for international agency structure
  problemsSolved?: string[];
  approach?: string;
  benefits?: string[];
  processSteps?: ServiceProcessStep[];
  faqs?: ServiceFaq[];
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
  industry?: string;
  completionDate?: string;
  timeline?: string;
  tags: string[];
  challenges?: string;
  solution?: string;
  results?: string | string[];
  milestones?: ProjectMilestone[];
  socialLinks?: ProjectSocialLink[];
  technologies?: string[];
  browserUrl?: string;
}

export interface TeamSkill {
  name: string;
  level: number; // 0 to 100 percentage
  category?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  experience: string;
  bio: string;
  achievements: string[];
  avatarUrl: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
  skills?: TeamSkill[];
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  metrics: string;
  caseCount: string;
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
  role: 'Super Admin' | 'Editor' | 'Manager';
  lastLogin?: string;
}

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'Super Admin' | 'Editor' | 'Manager' | 'Client';
  isGoogleVerified?: boolean;
}

// ==========================================
// NEW CMS & WEBSITE MANAGEMENT SCHEMAS
// ==========================================

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  author: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  status: 'Draft' | 'Published' | 'Scheduled';
  publishedAt: string;
  metaTitle?: string;
  metaDescription?: string;
}

export interface ProductItem {
  id: string;
  title: string;
  sku: string;
  price: number;
  discountPrice?: number;
  stock: number;
  category: string;
  description: string;
  imageUrl: string;
  status: 'Live' | 'Draft';
  createdAt: string;
}

export interface CustomPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  imageUrl?: string;
  status: 'Published' | 'Draft';
  metaTitle?: string;
  metaDescription?: string;
  sectionsOrder?: string[]; // e.g. ['hero', 'ticker', 'stats', 'services', 'about', 'story', 'portfolio', 'testimonials', 'faq', 'cta', 'contact']
}

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select';
  required: boolean;
  options?: string[];
}

export interface CustomForm {
  id: string;
  title: string;
  slug: string;
  fields: FormField[];
  submissionsCount: number;
}

export interface FormSubmission {
  id: string;
  formId: string;
  formTitle: string;
  data: Record<string, string>;
  createdAt: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
  createdAt: string;
}

export interface NavigationMenuItem {
  id: string;
  label: string;
  path: string;
  order: number;
  enabled: boolean;
  isExternal: boolean;
  parentId?: string;
}

export interface CMSUser {
  id: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Editor' | 'Manager' | 'Client';
  status: 'Active' | 'Blocked';
  createdAt: string;
  lastActive: string;
}
