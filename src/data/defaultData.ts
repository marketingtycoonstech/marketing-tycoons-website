import {
  ServiceItem,
  PortfolioProject,
  TestimonialItem,
  UserReview,
  StatItem,
  SocialLinksConfig,
  WebsiteSettings,
  ContactMessage
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
    id: 'port-pinterest-web',
    title: 'Lux Vista Ultra-Responsive Platform',
    category: 'Websites',
    shortDescription: 'High-end corporate platform with elite kinetic typography, fluent video backgrounds, and pristine interface flow.',
    fullDescription:
      'A luxury, high-performance web development project built to replicate aesthetic layouts, interactive content cards, and seamless motion. Specially integrated with the official Pinterest showcase clip for direct client preview.',
    imageUrl: 'https://images.unsplash.com/photo-1541462608143-67571c6738dd?auto=format&fit=crop&w=1200&q=85',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-working-on-a-computer-41486-large.mp4',
    projectUrl: 'https://pin.it/44UzVxedy',
    status: 'Live Project',
    featured: true,
    order: 0,
    clientName: 'Marketing Tycoons Concept Lab',
    completionDate: 'Q3 2026',
    timeline: '3 Weeks',
    browserUrl: 'https://pin.it/44UzVxedy',
    tags: ['Web Development', 'React 19', 'Luxury Aesthetic', 'Kinetic Motion'],
    results: 'Pinterest Creative Showcase Integrated Natively',
    milestones: [
      { label: 'Interactive Waves', value: 'Active' },
      { label: 'Pinterest Rating', value: '5.0/5.0' },
      { label: 'Load Latency', value: '280ms' },
      { label: 'Responsive Breaks', value: 'All BREAKS' }
    ],
    socialLinks: [
      { platform: 'LinkedIn', url: 'https://linkedin.com' },
      { platform: 'GitHub', url: 'https://github.com' }
    ],
    servicesProvided: ['Website Development', 'UI/UX Design', 'Custom Kinetic Motion', 'Interactive Layouts'],
    technologies: ['React 19', 'Tailwind CSS', 'Framer Motion', 'Pinterest Embed API']
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
