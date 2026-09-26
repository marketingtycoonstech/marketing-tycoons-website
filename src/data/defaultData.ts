import {
  ServiceItem,
  PortfolioProject,
  TestimonialItem,
  UserReview,
  StatItem,
  SocialLinksConfig,
  WebsiteSettings,
  ContactMessage,
  BlogPost,
  ProductItem,
  CustomPage,
  CustomForm,
  FormSubmission,
  MediaAsset,
  NavigationMenuItem,
  CMSUser
} from '../types';

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettings = {
  companyName: 'MARKETING TYCOONS',
  tagline: 'Your Growth, Our Mission',
  domain: 'marketingtycoons.tech',
  primaryEmail: 'marketingtycoons.tech@gmail.com',
  phone: '+92 342 6793428',
  whatsappNumber: '+923426793428',
  wechatId: 'MarketingTycoonsOfficial',
  address: 'Global Headquarters • Suite 4200, Tech Financial Plaza',
  heroHeadlinePrefix: 'Your Vision.\nOur Strategy.',
  heroHeadlineHighlight: 'Digital Success.',
  heroDescription:
    'We build powerful brands, stunning designs and high-converting digital solutions to grow your business.',
  primaryCtaText: 'Get Started',
  secondaryCtaText: 'Our Services',
  footerText: 'We help ambitious companies accelerate revenue, scale market presence, and dominate their digital category through bespoke strategy and high-impact design.',
  aboutHeadline: 'We are Marketing Tycoons',
  aboutText:
    'We are Marketing Tycoons — a results-driven digital agency helping businesses build powerful brands, create stunning designs and grow online with innovative strategies. Combining data-backed analytics with world-class aesthetic craft, we turn visionary founders and global enterprises into market leaders.',
  aboutFeatures: [
    'Creative & Professional Team',
    'Customized Solutions',
    'On-Time Delivery',
    'Client-Focused Approach'
  ],
  heroImageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
  lightHeroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  darkHeroImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85',

  // Cinematic Video & Visual Settings
  heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
  lightHeroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
  darkHeroVideo: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
  heroVideoPoster: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=85',
  heroMobileVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
  heroVideoEnabled: true,
  heroVideoOverlayOpacity: 0.35,

  fullWidthVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31912-large.mp4',
  fullWidthVideoPoster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=85',
  fullWidthVideoEnabled: true,
  fullWidthHeadline: "WE DON'T JUST BUILD BRANDS. WE BUILD DIGITAL EXPERIENCES.",
  fullWidthSubheadline: 'From breakthrough web architecture to high-converting creative direction, we engineer digital authority for ambitious companies worldwide.',

  aboutVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-creative-team-working-in-modern-office-43406-large.mp4',
  aboutVideoPoster: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85',
  aboutVideoEnabled: true,

  ctaVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-lines-flowing-in-dark-background-30043-large.mp4',
  ctaVideoPoster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=85',
  ctaVideoEnabled: true,
  ctaHeadline: 'READY TO BUILD SOMETHING GREAT?',
  ctaSubheading: "Let's turn your vision into a digital experience that gets noticed, remembered and trusted."
};

export const DEFAULT_STATS: StatItem[] = [
  { id: 'stat-1', number: '100+', label: 'Happy Clients', order: 1 },
  { id: 'stat-2', number: '150+', label: 'Projects Completed', order: 2 },
  { id: 'stat-3', number: '5+', label: 'Years Experience', order: 3 },
  { id: 'stat-4', number: '98%', label: 'Client Satisfaction', order: 4 }
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Website Development',
    shortDescription: 'Modern, fast & responsive websites that convert.',
    fullDescription:
      'We engineer bespoke web applications and high-performance websites engineered for speed, search visibility, and maximum conversion rates. Built with modern architectures and pristine typography.',
    iconName: 'Code',
    enabled: true,
    order: 1,
    features: [
      'Tailored UX/UI wireframing & responsive design',
      'Ultra-fast load times and SEO-first code structure',
      'Mobile-first architecture and CMS integration',
      'E-commerce & custom web portals'
    ],
    deliverables: [
      'Production-ready web application',
      'Responsive design across all device breakpoints',
      'Full technical SEO audit & schema integration',
      'Speed optimization score 95+ on Google PageSpeed'
    ],
    startingPrice: '$1,950',
    bgImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-41486-large.mp4'
  },
  {
    id: 'srv-2',
    title: 'Graphic & Banner Design',
    shortDescription: 'Eye-catching designs that leave an impact.',
    fullDescription:
      'Compelling visual storytelling for digital banners, display advertising campaigns, print collateral, and interactive creative assets that capture attention in high-noise feeds.',
    iconName: 'Palette',
    enabled: true,
    order: 2,
    features: [
      'High-CTR digital ad sets (Meta, Google, LinkedIn)',
      'Vector display banners and promotional creative suites',
      'Marketing print assets & exhibition collateral',
      'Consistent design system fidelity'
    ],
    deliverables: [
      'Full suite of multi-ratio display graphics',
      'Editable Figma/Vector source deliverables',
      'High-resolution print and web export formats',
      'Comprehensive brand asset kit'
    ],
    startingPrice: '$750',
    bgImageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-3',
    title: 'Logo & Branding',
    shortDescription: 'Build a strong brand identity that lasts.',
    fullDescription:
      'Distinguish your business with a memorable visual identity. From custom monograms and logomarks to cohesive typography palettes, style guides, and brand strategy books.',
    iconName: 'Crown',
    enabled: true,
    order: 3,
    features: [
      'Bespoke monogram & logomark design',
      'Comprehensive brand guideline book & typography system',
      'Color science & psychology palette definition',
      'Stationery, business cards, and social media branding'
    ],
    deliverables: [
      'Vector primary, secondary, and sub-mark files',
      'Brand Style Playbook (PDF & Figma)',
      'Social media starter kit and avatar suites',
      'Full commercial copyright transfer'
    ],
    startingPrice: '$1,200',
    bgImageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-4',
    title: 'SEO',
    shortDescription: 'Rank higher, get more traffic, grow faster.',
    fullDescription:
      'Technical on-page, off-page, and content SEO architectures designed to capture buyer intent keywords, drive high-intent organic traffic, and secure authority in your niche.',
    iconName: 'TrendingUp',
    enabled: true,
    order: 4,
    features: [
      'Comprehensive keyword research & competitor gap analysis',
      'Technical site audits (Core Web Vitals, schema markup, crawlability)',
      'Content cluster strategy & high-authority link building',
      'Local SEO & Google Business Profile optimization'
    ],
    deliverables: [
      'Keyword strategy blueprint & target tracking',
      'On-page metadata and schema implementation',
      'Monthly executive ranking & analytics report',
      'Backlink acquisition roadmap'
    ],
    startingPrice: '$950 / mo',
    bgImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-5',
    title: 'Social Media Marketing',
    shortDescription: 'Engage, grow and build your audience.',
    fullDescription:
      'Omnichannel social growth strategies that turn followers into devoted brand advocates. We handle creative content production, copy, community management, and trend execution.',
    iconName: 'Share2',
    enabled: true,
    order: 5,
    features: [
      'Custom content calendar & daily publishing pipeline',
      'Short-form video concepts (Reels, TikTok, Shorts)',
      'Proactive community engagement & DM automation',
      'Influencer partnership sourcing and campaign direction'
    ],
    deliverables: [
      '30 monthly curated posts & high-production reels',
      'Engaging copywriting & verified hashtag strategies',
      'Bi-weekly performance & reach KPI dashboards',
      'Dedicated account strategist support'
    ],
    startingPrice: '$1,100 / mo',
    bgImageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-6',
    title: 'Meta Ads',
    shortDescription: 'Targeted ads for better reach and higher sales.',
    fullDescription:
      'High-return Facebook and Instagram paid ad campaigns. We combine psychological copywriting, dynamic creative testing, and meticulous pixel tracking for sustained ROAS.',
    iconName: 'Target',
    enabled: true,
    order: 6,
    features: [
      'Precision audience targeting & lookalike models',
      'Creative A/B multivariate testing (hooks, copy, angles)',
      'Advanced Conversions API (CAPI) & pixel tracking',
      'Retargeting funnels to re-engage warm prospects'
    ],
    deliverables: [
      'Full campaign architecture & setup in Ads Manager',
      'Ad creative graphics and video cutdowns',
      'Daily budget optimization and bid scaling',
      'Live ROAS & CAC attribution dashboard'
    ],
    startingPrice: '$1,450 / mo',
    bgImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
  }
];

export const DEFAULT_PORTFOLIO: PortfolioProject[] = [
  {
    id: 'port-brand-film',
    title: 'Marketing Tycoons Official Brand Film',
    category: 'Branding',
    shortDescription: 'Our official corporate brand video showcasing how we turn visionary ideas into powerful, high-converting digital brands.',
    fullDescription: 'The official corporate presentation video for Marketing Tycoons. Presenters outline our results-oriented web engineering, professional branding, semantic search optimization, and client scaling strategies.',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=85',
    videoUrl: '/marketing_tycoons_brand_film.mp4',
    projectUrl: 'https://marketingtycoons.tech',
    status: 'Live Project',
    featured: true,
    order: 0,
    clientName: 'Marketing Tycoons Studios',
    completionDate: 'Q3 2026',
    timeline: '1.5 Months',
    browserUrl: 'https://marketingtycoons.tech',
    tags: ['Video Production', 'Brand Storytelling', 'Creative Direction'],
    results: '4.2M+ Views Across Channels, 150+ Direct Inbound Inquiries',
    milestones: [
      { label: 'Views', value: '4.2M+' },
      { label: 'Inbound Leads', value: '150+' },
      { label: 'Engagement Rate', value: '12.4%' },
      { label: 'Production Quality', value: '4K Raw' }
    ],
    socialLinks: [
      { platform: 'YouTube', url: 'https://www.youtube.com/@MarketingTycoons' },
      { platform: 'Instagram', url: 'https://instagram.com/marketingtycoons.tech' }
    ],
    servicesProvided: ['Video Production', 'Creative Direction', 'Brand Strategy'],
    technologies: ['Arri Alexa 4K', 'Figma Storyboarding', 'Premiere Pro', 'After Effects']
  },
  {
    id: 'port-1',
    title: 'Aura Maison Luxury Flagship',
    category: 'E-Commerce',
    shortDescription: 'Headless luxury e-commerce experience with sub-second product filtering and checkout.',
    fullDescription:
      'A responsive e-commerce experience designed for a modern luxury retail brand. Engineered with seamless micro-interactions, responsive mobile grid layouts, real-time inventory synchronization, and Stripe checkout integration.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-41486-large.mp4',
    projectUrl: 'https://auramaison.vercel.app',
    status: 'Live Project',
    featured: true,
    order: 1,
    clientName: 'Aura Maison Paris',
    completionDate: 'Q1 2026',
    timeline: '3 Months',
    browserUrl: 'https://auramaison.com',
    tags: ['E-Commerce', 'Next.js', 'Stripe', 'Tailwind CSS', 'High Conversion'],
    results: '+164% Conversion Lift, 3.8x Speed Increase',
    milestones: [
      { label: 'Screens Designed', value: '42' },
      { label: 'Lines of Code', value: '18.4K' },
      { label: 'Checkout Latency', value: '420ms' },
      { label: 'Conversion Lift', value: '+164%' }
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/aura-maison' },
      { platform: 'Instagram', url: 'https://instagram.com/auramaison.paris' },
      { platform: 'GitHub', url: 'https://github.com/marketingtycoons/auramaison-ecommerce' },
      { platform: 'Behance', url: 'https://behance.net/gallery/auramaison-luxury' }
    ],
    servicesProvided: ['Website Development', 'UI/UX Design', 'Responsive Development'],
    technologies: ['React 19', 'Next.js', 'Tailwind CSS', 'Stripe API', 'Framer Motion']
  },
  {
    id: 'port-2',
    title: 'Sterling & Co. Institutional Portal',
    category: 'Websites',
    shortDescription: 'High-performance corporate platform with bilingual localization and encrypted client room.',
    fullDescription:
      'Enterprise web architecture built for an international advisory firm. Features real browser navigation, responsive desktop and mobile breakpoints, secure contact gateways, and technical SEO hierarchy.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
    projectUrl: 'https://sterling-advisory.vercel.app',
    status: 'Live Project',
    featured: true,
    order: 2,
    clientName: 'Sterling & Co. Advisory',
    completionDate: 'Q4 2025',
    timeline: '2.5 Months',
    browserUrl: 'https://sterlingadvisory.com',
    tags: ['Web Development', 'Corporate Architecture', 'Security', 'Fast Load'],
    results: '99.99% Uptime, 240+ Qualified Monthly Inquiries',
    milestones: [
      { label: 'Screens Designed', value: '36' },
      { label: 'Lines of Code', value: '24.5K' },
      { label: 'Lighthouse Score', value: '99/100' },
      { label: 'Server Response', value: '180ms' }
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/sterling-co-advisory' },
      { platform: 'Twitter', url: 'https://x.com/SterlingAdvisory' },
      { platform: 'GitHub', url: 'https://github.com/marketingtycoons/sterling-portal' }
    ],
    servicesProvided: ['Website Development', 'UI/UX Design', 'CMS Architecture', 'Responsive Development'],
    technologies: ['TypeScript', 'Tailwind CSS', 'Next.js', 'Cloudflare CDN']
  },
  {
    id: 'port-3',
    title: 'Apex Capital Brand Identity & System',
    category: 'Branding',
    shortDescription: 'Bespoke monogram, metallic brand bible, and corporate identity system.',
    fullDescription:
      'Comprehensive brand identity system engineered for a global investment group. Includes custom typography, monogram vectors, metallic gold foil print specifications, business stationery, and brand guidelines.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-gold-lines-flowing-in-dark-background-30043-large.mp4',
    projectUrl: 'https://apexcapital.global',
    status: 'Live Project',
    featured: true,
    order: 3,
    clientName: 'Apex Capital Global',
    completionDate: 'Q4 2025',
    timeline: '6 Weeks',
    browserUrl: 'https://apexcapital.global',
    tags: ['Branding', 'Monogram Design', 'Brand Bible', 'Gold Foil'],
    results: 'Comprehensive Brand Guide & Multi-Channel Asset Kit',
    milestones: [
      { label: 'Brand Assets', value: '48+' },
      { label: 'Color Variations', value: '12 Sets' },
      { label: 'Brand Guide Pages', value: '64 Pgs' },
      { label: 'Vector Formats', value: '16 Types' }
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/apex-capital-global' },
      { platform: 'Behance', url: 'https://behance.net/gallery/apex-capital-branding' },
      { platform: 'Dribbble', url: 'https://dribbble.com/shots/apex-capital-identity' }
    ],
    servicesProvided: ['Brand Identity & Strategy', 'Logo Development', 'Typography System', 'Brand Guidelines'],
    technologies: ['Adobe Illustrator', 'Figma', 'Pantone Metallic System']
  },
  {
    id: 'port-4',
    title: 'CyberSummit Multi-Screen Banner Suite',
    category: 'Graphic Design',
    shortDescription: '36 dynamic digital banner formats and high-CTR advertising collateral.',
    fullDescription:
      'High-impact vector graphic design and multi-ratio promotional banners for an international tech exhibition. Created digital out-of-home displays, social ad banners, and print exhibition collateral.',
    imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-creative-team-working-in-modern-office-43406-large.mp4',
    projectUrl: 'https://cybersummit.tech',
    status: 'Live Project',
    featured: false,
    order: 4,
    clientName: 'CyberSummit Tech Global',
    completionDate: 'Q3 2025',
    timeline: '4 Weeks',
    browserUrl: 'https://cybersummit.tech',
    tags: ['Graphic Design', 'Display Banners', 'Ad Creatives', 'Print Collateral'],
    results: 'Multi-Ratio Asset Delivery Across 36 Formats',
    milestones: [
      { label: 'Banners Produced', value: '36' },
      { label: 'Display Renders', value: '120+' },
      { label: 'Click-Through Rate', value: '4.8%' },
      { label: 'Format Ratios', value: '9 Formats' }
    ],
    socialLinks: [
      { platform: 'Twitter', url: 'https://x.com/CyberSummitTech' },
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/cybersummit-global' },
      { platform: 'Behance', url: 'https://behance.net/gallery/cybersummit-banners' }
    ],
    servicesProvided: ['Graphic Design', 'Banner Design', 'Advertising Creatives', 'Figma Production'],
    technologies: ['Figma', 'Photoshop', 'Vector Illustrator', 'HTML5 Display']
  },
  {
    id: 'port-5',
    title: 'Glow Organics Viral Social Campaign',
    category: 'Social Media',
    shortDescription: 'Omnichannel social media creatives, Instagram reels, and brand storytelling.',
    fullDescription:
      'Strategic social media campaign design featuring carousel layouts, short-form motion reels, story templates, and high-engagement brand consistency across Instagram and TikTok.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31912-large.mp4',
    projectUrl: 'https://gloworganics.co',
    status: 'Live Project',
    featured: true,
    order: 5,
    clientName: 'Glow Organics Clean Beauty',
    completionDate: 'Q1 2026',
    timeline: 'Ongoing / 4 Months',
    browserUrl: 'https://gloworganics.co',
    tags: ['Social Media', 'Reels Design', 'Content Strategy', 'Brand Consistency'],
    results: '30+ Custom Monthly Creatives & Cohesive Social Brand Grid',
    milestones: [
      { label: 'Campaign Reach', value: '2.4M+' },
      { label: 'Reels Produced', value: '24' },
      { label: 'Engagement Lift', value: '+320%' },
      { label: 'Follower Growth', value: '+85K' }
    ],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/gloworganics.co' },
      { platform: 'TikTok', url: 'https://tiktok.com/@gloworganics' },
      { platform: 'Facebook', url: 'https://facebook.com/gloworganics.official' },
      { platform: 'YouTube', url: 'https://youtube.com/@gloworganics' }
    ],
    servicesProvided: ['Social Media Management', 'Creative Content Production', 'Motion Design', 'Community Strategy'],
    technologies: ['After Effects', 'Figma Social Kit', 'CapCut Studio']
  },
  {
    id: 'port-6',
    title: 'BioHealth Diagnostic SEO Architecture',
    category: 'SEO',
    shortDescription: 'Technical site audit, schema markup engineering, and search intent keyword clusters.',
    fullDescription:
      'Complete SEO process deployment: in-depth technical site crawl, Core Web Vitals optimization, on-page schema JSON-LD structuring, and high-authority search content architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-charts-and-data-31912-large.mp4',
    projectUrl: 'https://biohealthlabs.io',
    status: 'Live Project',
    featured: false,
    order: 6,
    clientName: 'BioHealth Research',
    completionDate: 'Q2 2025',
    timeline: '8 Weeks',
    browserUrl: 'https://biohealthlabs.io',
    tags: ['Technical SEO', 'Keyword Strategy', 'Core Web Vitals', 'Structured Data'],
    results: 'Full Technical SEO Blueprint & Keyword Cluster Map',
    milestones: [
      { label: 'Keywords Ranked', value: '1,450+' },
      { label: 'Organic Traffic Lift', value: '+280%' },
      { label: 'Schema Endpoints', value: '48' },
      { label: 'Core Web Vitals', value: '100% Pass' }
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/biohealth-research' },
      { platform: 'Twitter', url: 'https://x.com/BioHealthLabs' }
    ],
    servicesProvided: ['Technical SEO Audit', 'On-Page Optimization', 'Schema Markup JSON-LD', 'Keyword Research'],
    technologies: ['Google Search Console', 'Ahrefs', 'Schema.org', 'Lighthouse']
  },
  {
    id: 'port-7',
    title: 'Zenith Velocity Meta Ads Growth Funnel',
    category: 'Meta Ads',
    shortDescription: 'Audience testing matrices, dynamic creative variations, and conversion API tracking.',
    fullDescription:
      'High-converting Facebook and Instagram ad campaign setup. Includes modular hook testing, high-CTR static and motion ad creatives, copy angles, and retargeting funnel structuring.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
    projectUrl: 'https://zenithvelocity.agency',
    status: 'Live Project',
    featured: true,
    order: 7,
    clientName: 'Zenith Performance Media',
    completionDate: 'Q1 2026',
    timeline: '6 Weeks',
    browserUrl: 'https://zenithvelocity.agency',
    tags: ['Meta Ads', 'Paid Social', 'ROAS Optimization', 'Creative Testing'],
    results: 'Full-Funnel Campaign Architecture with 12 Creative Variations',
    milestones: [
      { label: 'Campaign Reach', value: '4.2M' },
      { label: 'Ad Variations', value: '18 Sets' },
      { label: 'Return on Ad Spend', value: '5.6x' },
      { label: 'CPA Reduction', value: '-42%' }
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com/company/zenith-velocity' },
      { platform: 'Facebook', url: 'https://facebook.com/zenithvelocity.agency' },
      { platform: 'Instagram', url: 'https://instagram.com/zenithvelocity' }
    ],
    servicesProvided: ['Meta Ads Management', 'Ad Creative Design', 'Copywriting', 'Pixel & CAPI Setup'],
    technologies: ['Meta Ads Manager', 'Conversions API', 'Figma Ad Suites']
  },
  {
    id: 'port-8',
    title: 'Artisan Roast Specialty E-Commerce',
    category: 'E-Commerce',
    shortDescription: 'Custom subscription bean builder, responsive checkout, and sensory storytelling.',
    fullDescription:
      'Modern direct-to-consumer e-commerce storefront for specialty coffee roasters. Features custom grind selection, subscription cadence logic, and responsive shopping cart UX.',
    imageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-41486-large.mp4',
    projectUrl: 'https://artisanroast.store',
    status: 'Live Project',
    featured: false,
    order: 8,
    clientName: 'Artisan Roast Labs',
    completionDate: 'Q3 2025',
    timeline: '2 Months',
    browserUrl: 'https://artisanroast.store',
    tags: ['E-Commerce', 'Subscription Builder', 'UI/UX', 'Responsive Design'],
    results: 'Interactive Subscription Builder Prototype & Responsive Flow',
    milestones: [
      { label: 'Screens Designed', value: '28' },
      { label: 'Lines of Code', value: '14.2K' },
      { label: 'Conversion Rate', value: '4.9%' },
      { label: 'Cart Dropoff', value: '-34%' }
    ],
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/artisanroast.store' },
      { platform: 'TikTok', url: 'https://tiktok.com/@artisanroast' },
      { platform: 'GitHub', url: 'https://github.com/marketingtycoons/artisan-roast-store' }
    ],
    servicesProvided: ['E-Commerce Architecture', 'UI/UX Design', 'Responsive Development'],
    technologies: ['React', 'Tailwind CSS', 'Shopify Storefront API']
  },
  {
    id: 'port-9',
    title: 'Takween Digital UK',
    category: 'Websites',
    shortDescription: 'Enterprise software development agency platform with immersive digital interaction, fluent UI, and high-performance server architectures.',
    fullDescription:
      'A bespoke, premium engineering agency portal built to show premium UK-based custom software architectures, cloud services, and interactive components with smooth typography and layout fluidity.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-code-screen-close-up-1728-large.mp4',
    projectUrl: 'https://takweendigital.co.uk',
    status: 'Live Project',
    featured: true,
    order: 9,
    clientName: 'Takween Digital Solutions UK',
    completionDate: 'Q2 2026',
    timeline: '4 Weeks',
    browserUrl: 'https://takweendigital.co.uk',
    tags: ['Web Development', 'Custom Software', 'Cloud Architecture', 'UK Premium'],
    results: '+280% organic engagement, 120ms load latency',
    milestones: [
      { label: 'Uptime Rate', value: '99.99%' },
      { label: 'Client Retention', value: '100%' },
      { label: 'Core Web Vitals', value: '100/100' },
      { label: 'Conversion Rate', value: '6.4%' }
    ],
    socialLinks: [],
    servicesProvided: ['Website Development', 'Full-Stack Software Architecture', 'Cloud Hosting Management'],
    technologies: ['React 19', 'Next.js', 'Tailwind CSS', 'AWS Serverless']
  },
  {
    id: 'port-10',
    title: 'Undercover Jobs Portal',
    category: 'Websites',
    shortDescription: 'Modern corporate recruitment application featuring fast career searches, encrypted applications, and real-time candidate pipelines.',
    fullDescription:
      'A tailored, premium job portal designed for secure, premium recruiting processes and seamless candidate tracking with clean user dashboard experiences and mobile responsiveness.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-41486-large.mp4',
    projectUrl: 'https://undercoverjobs.co.uk',
    status: 'Live Project',
    featured: true,
    order: 10,
    clientName: 'Undercover Recruiting Inc.',
    completionDate: 'Q2 2026',
    timeline: '3 Weeks',
    browserUrl: 'https://undercoverjobs.co.uk',
    tags: ['Job Board', 'Dashboard Design', 'User Auth', 'Candidate Flow'],
    results: '14,000+ monthly applications processed, 99.8% form completion',
    milestones: [
      { label: 'Active Jobs Listed', value: '1.2K' },
      { label: 'Candidate Accounts', value: '45K+' },
      { label: 'Interview Match Rate', value: '72%' },
      { label: 'Submission Latency', value: '150ms' }
    ],
    socialLinks: [],
    servicesProvided: ['Website Development', 'Custom DB Engineering', 'Recruitment Workflow UX'],
    technologies: ['React 19', 'Express API', 'Tailwind CSS', 'PostgreSQL']
  },
  {
    id: 'port-11',
    title: 'Users Properties Real Estate',
    category: 'Websites',
    shortDescription: 'Elite real estate property search portal with intuitive map filters, high-resolution media galleries, and lead generation systems.',
    fullDescription:
      'A pristine premium real estate application built to show property catalogs, filter specifications, fast image load pipelines, and robust lead capture systems.',
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-41486-large.mp4',
    projectUrl: 'https://usersproperties.com',
    status: 'Live Project',
    featured: true,
    order: 11,
    clientName: 'Users Properties Real Estate Group',
    completionDate: 'Q1 2026',
    timeline: '5 Weeks',
    browserUrl: 'https://usersproperties.com',
    tags: ['Real Estate', 'Advanced Search', 'Map Integration', 'Lead Gen'],
    results: '3.4x rise in qualified home buyer leads, instant search caching',
    milestones: [
      { label: 'Active Listings', value: '8.4K' },
      { label: 'Lead Conversion', value: '+340%' },
      { label: 'Image Load Speed', value: '250ms' },
      { label: 'User Rating', value: '4.9/5' }
    ],
    socialLinks: [],
    servicesProvided: ['Website Development', 'Map Filter Engineering', 'Responsive UI/UX Catalog'],
    technologies: ['React 19', 'Tailwind CSS', 'MapBox API', 'Node.js']
  },
  {
    id: 'port-12',
    title: 'Lawyers Public Services',
    category: 'Websites',
    shortDescription: 'Professional appointment booking portal and client onboarding application built for premier legal consulting practices.',
    fullDescription:
      'A premium and highly trustworthy web platform for booking corporate and public legal consultations, uploading case documentation, and coordinating calendars with elite legal experts.',
    imageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-creative-team-working-in-modern-office-43406-large.mp4',
    projectUrl: 'https://lawyerspublicservices.com',
    status: 'Live Project',
    featured: true,
    order: 12,
    clientName: 'Lawyers Public Advisory Council',
    completionDate: 'Q2 2026',
    timeline: '4 Weeks',
    browserUrl: 'https://lawyerspublicservices.com',
    tags: ['Legal Consulting', 'Appointment Booking', 'Secure Documents', 'Trustworthy Layout'],
    results: '+180% faster onboarding, fully compliant client data storage',
    milestones: [
      { label: 'Cases Resolved', value: '2.5K+' },
      { label: 'Booking Automation', value: '100%' },
      { label: 'Form Secure Score', value: 'A+' },
      { label: 'Average Client Rating', value: '5.0/5' }
    ],
    socialLinks: [],
    servicesProvided: ['Website Development', 'Secure Form Architecture', 'Appointment Automation'],
    technologies: ['TypeScript', 'React 19', 'Tailwind CSS', 'Calendar Sync API']
  },
  {
    id: 'port-13',
    title: 'Takween Therapy UK',
    category: 'Websites',
    shortDescription: 'Bespoke healthcare appointment and virtual therapy application featuring private consultation portals and clean visual flows.',
    fullDescription:
      'A high-fidelity mental wellness and appointment application built for a top UK therapy provider. Secure booking dashboards and therapeutic visual schemes optimized for comfort and trust.',
    imageUrl: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-41486-large.mp4',
    projectUrl: 'https://takweentherapy.co.uk',
    status: 'Live Project',
    featured: true,
    order: 13,
    clientName: 'Takween Therapy Clinic Group',
    completionDate: 'Q2 2026',
    timeline: '4 Weeks',
    browserUrl: 'https://takweentherapy.co.uk',
    tags: ['Mental Health', 'Patient Onboarding', 'Bespoke Scheduling', 'UK Medical'],
    results: 'Zero-friction patient registration, +190% bookings increase',
    milestones: [
      { label: 'Registered Therapists', value: '64' },
      { label: 'Virtual Sessions Run', value: '12K+' },
      { label: 'HIPAA/GDPR Compliant', value: 'Yes' },
      { label: 'Patient Rating', value: '4.95/5' }
    ],
    socialLinks: [],
    servicesProvided: ['Website Development', 'Patient Booking Flow', 'Visual Styling Strategy'],
    technologies: ['React 19', 'Next.js', 'Tailwind CSS', 'Stripe Payments']
  },
  {
    id: 'port-14',
    title: 'Bookish PK Bookstore',
    category: 'E-Commerce',
    shortDescription: 'Modern aesthetic book discovery web application and e-commerce layout with advanced filter options.',
    fullDescription:
      'A dynamic literature shopping and discovery experience tailored for book enthusiasts, featuring responsive list grids, categorization metrics, and high-CTR product templates.',
    imageUrl: 'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-41486-large.mp4',
    projectUrl: 'https://bookish.pk',
    status: 'Live Project',
    featured: true,
    order: 14,
    clientName: 'Bookish Pakistan Publisher House',
    completionDate: 'Q2 2026',
    timeline: '3 Weeks',
    browserUrl: 'https://bookish.pk',
    tags: ['E-Commerce Bookstore', 'Product Catalog', 'Figma Wireframing', 'Responsive Development'],
    results: '+215% increase in books ordered, 320ms catalog response times',
    milestones: [
      { label: 'Books Cataloged', value: '18K+' },
      { label: 'Subscribers List', value: '8.2K' },
      { label: 'Cart Checkout time', value: '380ms' },
      { label: 'Mobile Performance', value: '98%' }
    ],
    socialLinks: [],
    servicesProvided: ['Website Development', 'Catalog UX Optimization', 'Banner Graphics'],
    technologies: ['React 19', 'Tailwind CSS', 'Redux Store', 'Algolia Search']
  },
  {
    id: 'port-15',
    title: 'Farooq Kitab Ghar',
    category: 'E-Commerce',
    shortDescription: 'Premium cultural literature store and digital catalog architecture preserving regional literature with online shopping.',
    fullDescription:
      'A bespoke visual catalog platform and online store designed to support search capabilities, historical and cultural literature collections, and fast delivery order processing.',
    imageUrl: 'https://images.unsplash.com/photo-1513001900722-370f803f498d?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-41486-large.mp4',
    projectUrl: 'https://farooqkitabghar.com',
    status: 'Live Project',
    featured: true,
    order: 15,
    clientName: 'Farooq Book Emporium',
    completionDate: 'Q2 2026',
    timeline: '3 Weeks',
    browserUrl: 'https://farooqkitabghar.com',
    tags: ['Online Bookstore', 'Catalog Navigation', 'Cultural Archive', 'Fast Delivery Order'],
    results: '+175% rise in regional deliveries, smooth interactive indexing',
    milestones: [
      { label: 'Regional Reach', value: 'Nationwide' },
      { label: 'Daily Shipments', value: '250+' },
      { label: 'Catalog Search time', value: '120ms' },
      { label: 'Order Complete rate', value: '99.2%' }
    ],
    socialLinks: [],
    servicesProvided: ['Website Development', 'Brand Strategy', 'E-Commerce Integration'],
    technologies: ['React 19', 'Tailwind CSS', 'Context API', 'WhatsApp Order Integration']
  },
  {
    id: 'port-16',
    title: 'Little Kids Store',
    category: 'E-Commerce',
    shortDescription: 'Vibrant e-commerce storefront for premium children apparel with interactive visual categories and micro-animations.',
    fullDescription:
      'A beautiful, colorful, yet enterprise-grade kids apparel shopping platform featuring visual category bubbles, product grids, custom size guides, and high-conversion checkouts.',
    imageUrl: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-41486-large.mp4',
    projectUrl: 'https://littlekidsstore.pk',
    status: 'Live Project',
    featured: true,
    order: 16,
    clientName: 'Little Kids Brand Co.',
    completionDate: 'Q1 2026',
    timeline: '3.5 Weeks',
    browserUrl: 'https://littlekidsstore.pk',
    tags: ['Kids E-Commerce', 'Interactive UX', 'Size Selector', 'High CTR'],
    results: '+260% user checkout conversions, lovely child-friendly visual system',
    milestones: [
      { label: 'Monthly Orders', value: '3.4K+' },
      { label: 'Size Guide Hits', value: '12K+' },
      { label: 'Checkout Success', value: '99.5%' },
      { label: 'Lighthouse SEO', value: '100/100' }
    ],
    socialLinks: [],
    servicesProvided: ['Website Development', 'Children Theme Branding', 'High CTR Layouts'],
    technologies: ['React 19', 'Tailwind CSS', 'Redux Toolkit', 'Stripe Payments']
  }
];

export const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'John Smith',
    company: 'Smith & Partners Holdings',
    role: 'Managing Director',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review:
      'Great service and professional team. The website and branding work exceeded our expectations.',
    featured: true,
    approved: true,
    date: 'February 2026',
    projectBadge: 'Web & Brand Identity'
  },
  {
    id: 'test-2',
    name: 'Sarah Khan',
    company: 'Velvet Horizon Media',
    role: 'Head of Growth',
    avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review:
      'Excellent service, professional team and great communication throughout the project.',
    featured: true,
    approved: true,
    date: 'January 2026',
    projectBadge: 'Meta Ads & Social Strategy'
  },
  {
    id: 'test-3',
    name: 'Marcus Vance',
    company: 'Apex Financial Group',
    role: 'Chief Executive Officer',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review:
      'Marketing Tycoons brought institutional prestige to our digital presence. Within 60 days of launching the redesigned portal, qualified investor inquiries jumped by 140%. Truly top tier.',
    featured: true,
    approved: true,
    date: 'December 2025',
    projectBadge: 'Enterprise Rebrand'
  },
  {
    id: 'test-4',
    name: 'Elena Rostova',
    company: 'Lumiere Living Concepts',
    role: 'Founder & Creative Director',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 5,
    review:
      'Their design sensitivity and execution speed are unmatched. They translated our complex vision into a seamless, high-converting digital storefront.',
    featured: false,
    approved: true,
    date: 'November 2025',
    projectBadge: 'E-Commerce Website'
  }
];

export const DEFAULT_REVIEWS: UserReview[] = [
  {
    id: 'rev-1',
    name: 'David Sterling',
    email: 'd.sterling@example.com',
    rating: 5,
    review:
      'Working with Marketing Tycoons was one of our best decisions this year. The gold standard in design and responsive development!',
    serviceUsed: 'Website Development',
    status: 'Approved',
    featured: true,
    createdAt: '2026-02-14',
    isGoogleVerified: true
  },
  {
    id: 'rev-2',
    name: 'Amara Chen',
    email: 'amara.chen@techventures.io',
    rating: 5,
    review:
      'Superb Meta Ads management. Our cost per acquisition dropped 38% in the first 45 days.',
    serviceUsed: 'Meta Ads',
    status: 'Approved',
    featured: true,
    createdAt: '2026-02-28',
    isGoogleVerified: true
  },
  {
    id: 'rev-3',
    name: 'Liam O’Connor',
    email: 'liam@dublindigital.ie',
    rating: 5,
    review:
      'The branding team gave us an unmistakable market edge. Fast turnaround and crisp communication.',
    serviceUsed: 'Logo & Branding',
    status: 'Approved',
    featured: false,
    createdAt: '2026-03-05',
    isGoogleVerified: false
  },
  {
    id: 'rev-4',
    name: 'Sophia Laurent',
    email: 'sophia@luxurystyles.fr',
    rating: 4,
    review:
      'Remarkable attention to detail on our banners and social media campaign. Excited for phase two!',
    serviceUsed: 'Graphic & Banner Design',
    status: 'Pending',
    featured: false,
    createdAt: '2026-03-18',
    isGoogleVerified: false
  }
];

export const DEFAULT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Harrison Vance',
    email: 'hvance@vanceholdings.com',
    phone: '+1 (555) 349-1122',
    service: 'Website Development',
    message:
      'We are looking to rebuild our flagship enterprise platform and establish a modern brand identity. Would love to review timeline and proposal next week.',
    status: 'New',
    createdAt: '2026-03-21T09:30:00.000Z'
  },
  {
    id: 'msg-2',
    name: 'Claire Dupont',
    email: 'cdupont@aurabelle.fr',
    phone: '+33 6 12 34 56 78',
    service: 'Meta Ads',
    message:
      'Interested in scaling our European e-commerce ad spend. Currently doing $40k/month and aiming for $120k with improved ROAS.',
    status: 'Read',
    createdAt: '2026-03-20T14:15:00.000Z'
  },
  {
    id: 'msg-3',
    name: 'Tariq Al-Mansoor',
    email: 'tariq@gulfventures.ae',
    phone: '+971 50 123 4567',
    service: 'Logo & Branding',
    message:
      'Requesting full brand guidelines and corporate stationery package for a new fintech spin-off.',
    status: 'Replied',
    createdAt: '2026-03-18T11:00:00.000Z'
  }
];

export const DEFAULT_SOCIAL_LINKS: SocialLinksConfig = {
  tiktok: 'https://www.tiktok.com/@marketingtycoons.tech?is_from_webapp=1&sender_device=pc',
  facebook: 'https://www.facebook.com/profile.php?id=61594461547054',
  linkedin: 'https://www.linkedin.com/in/marketing-tycoons-914604439/',
  x: 'https://x.com/MktgTycoons',
  youtube: 'https://www.youtube.com/@MarketingTycoons',
  pinterest: 'https://www.pinterest.com/marketingtycoons/',
  olx: 'https://www.olx.com.pk/profile/5d6cb54e-ab25-4c0a-972f-005757d5464f',
  reddit: 'https://www.reddit.com/user/marketingtycoons',
  instagram: 'https://instagram.com/marketingtycoons.tech',
  whatsapp: 'https://wa.me/923426793428'
};

export const DEFAULT_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Future of AI in Digital Marketing 2026',
    slug: 'future-of-ai-digital-marketing-2026',
    category: 'Digital Marketing',
    tags: ['AI', 'SEO', 'Automation'],
    author: 'Farooq Ahmad',
    excerpt: 'How machine learning algorithms are completely revolutionizing advertising bids, kinetic copywriting and search indexing.',
    content: '<p>Artificial intelligence is no longer just a futuristic concept in digital marketing; it is the core engine behind high-performing campaigns. In 2026, real-time multivariate testing, predictive bidding, and automated kinetic copywriting have become the baseline for modern advertising.</p><h4>Why Static Campaigns are Dead</h4><p>With search engines adopting AI-driven indexing at scale, keyword stuffing is completely obsolete. Modern SEO relies on semantic intent and high-fidelity structured content. Companies that continue using legacy marketing flows will inevitably see their acquisition costs skyrocket.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
    status: 'Published',
    publishedAt: '2026-09-01T10:00:00Z',
    metaTitle: 'The Future of AI in Digital Marketing 2026 | Marketing Tycoons',
    metaDescription: 'Discover how AI algorithms are revolutionizing search engine rankings, kinetic copywriting and advertising bids in 2026.'
  },
  {
    id: 'blog-2',
    title: 'Maximizing Meta Ads ROAS with Conversions API (CAPI)',
    slug: 'maximizing-meta-ads-roas-capi',
    category: 'Paid Advertising',
    tags: ['Meta Ads', 'CAPI', 'Retargeting'],
    author: 'Sarah Jenkins',
    excerpt: 'Step-by-step technical guide to bypass browser cookie blocks and restore precise server-side attribution for Shopify and custom apps.',
    content: '<p>With web browsers phasing out third-party cookies, tracking ad performance has become extremely difficult. Fortunately, the Meta Conversions API (CAPI) provides a robust server-to-server connection that preserves your tracking fidelity.</p><h4>Setting up Server-Side Events</h4><p>To implement CAPI correctly, you must deduplicate your browser-side Pixel events with server-side payloads. This is accomplished by forwarding identical Event ID attributes from both the browser and your Express backend, allowing Meta to unify the tracking node.</p>',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    status: 'Published',
    publishedAt: '2026-09-15T14:30:00Z',
    metaTitle: 'Guide to Meta Ads Conversions API (CAPI) | Marketing Tycoons',
    metaDescription: 'Technical guide to setting up server-to-server tracking via Meta CAPI for improved attribution and campaign scaling.'
  }
];

export const DEFAULT_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    title: 'Kinetic SEO Campaign Starter Pack',
    sku: 'SEO-KINETIC-START',
    price: 999,
    discountPrice: 799,
    stock: 50,
    category: 'SEO Packages',
    description: 'Comprehensive, high-performance SEO service including complete schema layout, site structure tuning, and 12 curated authority backlinks.',
    imageUrl: 'https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=800&q=80',
    status: 'Live',
    createdAt: '2026-08-10T12:00:00Z'
  },
  {
    id: 'prod-2',
    title: 'Elite Brand Design & Identity Kit',
    sku: 'BRAND-ELITE-KIT',
    price: 2499,
    stock: 15,
    category: 'Design Systems',
    description: 'Bespoke corporate identity development, custom SVG assets, brand guideline manuals, and fully optimized marketing material mockups.',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-26c113006238?auto=format&fit=crop&w=800&q=80',
    status: 'Live',
    createdAt: '2026-08-20T08:00:00Z'
  }
];

export const DEFAULT_PAGES: CustomPage[] = [
  {
    id: 'page-home',
    title: 'Homepage',
    slug: 'index',
    content: 'Full website landing page containing cinematic hero, brand ticker, stats overview, services section, about us storytelling, landmark portfolio, client testimonials, and interactive contact desk.',
    status: 'Published',
    sectionsOrder: ['hero', 'ticker', 'stats', 'services', 'about', 'story', 'portfolio', 'testimonials', 'reach', 'faq', 'cta', 'contact']
  },
  {
    id: 'page-about',
    title: 'About Our Mission',
    slug: 'about-agency',
    content: '<h3>Who We Are</h3><p>We are a highly specialized creative collective dedicated to designing landmark web platforms, scaling paid advertisements, and deploying extreme-ROI technical SEO strategies. Our headquarters is composed of senior software developers, conversion copywriters, and performance marketers.</p>',
    status: 'Published'
  }
];

export const DEFAULT_FORMS: CustomForm[] = [
  {
    id: 'form-contact',
    title: 'Interactive Consultation Desk',
    slug: 'consultation-desk',
    submissionsCount: 3,
    fields: [
      { id: 'f-name', label: 'Full Name', type: 'text', required: true },
      { id: 'f-email', label: 'Email Address', type: 'email', required: true },
      { id: 'f-phone', label: 'Phone / WhatsApp', type: 'phone', required: true },
      { id: 'f-service', label: 'Select Service', type: 'select', required: true, options: ['Web Development', 'Meta Ads Campaign', 'SEO Optimization', 'Corporate Branding'] },
      { id: 'f-msg', label: 'Brief Project Outline', type: 'textarea', required: true }
    ]
  }
];

export const DEFAULT_SUBMISSIONS: FormSubmission[] = [
  {
    id: 'sub-1',
    formId: 'form-contact',
    formTitle: 'Interactive Consultation Desk',
    createdAt: '2026-09-24T18:30:00Z',
    data: {
      'Full Name': 'Asif Khan',
      'Email Address': 'asif.khan@techventures.pk',
      'Phone / WhatsApp': '+92 300 1234567',
      'Select Service': 'SEO Optimization',
      'Brief Project Outline': 'We need custom organic schema structuring and high-end backlink distribution to launch our new real estate site.'
    }
  }
];

export const DEFAULT_MEDIA: MediaAsset[] = [
  {
    id: 'med-1',
    name: 'tech_office_working.jpg',
    type: 'image/jpeg',
    size: '1.4 MB',
    url: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1200&q=85',
    createdAt: '2026-08-15T15:20:00Z'
  },
  {
    id: 'med-2',
    name: 'growth_chart_analytics.jpg',
    type: 'image/jpeg',
    size: '850 KB',
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    createdAt: '2026-08-18T10:12:00Z'
  }
];

export const DEFAULT_MENUS: NavigationMenuItem[] = [
  { id: 'menu-1', label: 'Home', path: '#hero', order: 1, enabled: true, isExternal: false },
  { id: 'menu-2', label: 'Services', path: '#services', order: 2, enabled: true, isExternal: false },
  { id: 'menu-3', label: 'About Us', path: '#about', order: 3, enabled: true, isExternal: false },
  { id: 'menu-4', label: 'Our Work', path: '#portfolio', order: 4, enabled: true, isExternal: false },
  { id: 'menu-5', label: 'FAQs', path: '#faq', order: 5, enabled: true, isExternal: false },
  { id: 'menu-6', label: 'Inquire Now', path: '#contact', order: 6, enabled: true, isExternal: false }
];

export const DEFAULT_CMS_USERS: CMSUser[] = [
  {
    id: 'user-1',
    name: 'Super Admin',
    email: 'marketingtycoons.tech@gmail.com',
    role: 'Super Admin',
    status: 'Active',
    createdAt: '2026-01-10T08:00:00Z',
    lastActive: '2026-09-25T02:50:00Z'
  },
  {
    id: 'user-2',
    name: 'Farooq Ahmad (Editor)',
    email: 'farooq.editor@marketingtycoons.tech',
    role: 'Editor',
    status: 'Active',
    createdAt: '2026-03-12T11:45:00Z',
    lastActive: '2026-09-24T18:12:00Z'
  },
  {
    id: 'user-3',
    name: 'Sarah Jenkins (Manager)',
    email: 'sarah.manager@marketingtycoons.tech',
    role: 'Manager',
    status: 'Active',
    createdAt: '2026-05-20T09:30:00Z',
    lastActive: '2026-09-25T01:15:00Z'
  }
];
