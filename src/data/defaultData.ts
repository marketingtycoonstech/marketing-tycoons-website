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
  CMSUser,
  TeamMember,
  IndustryItem
} from '../types';

export const DEFAULT_WEBSITE_SETTINGS: WebsiteSettings = {
  companyName: 'MARKETING TYCOONS',
  tagline: 'Where Visionary Strategy Meets High-Impact Digital Growth',
  domain: 'marketingtycoons.org',
  primaryEmail: 'marketingtycoons.tech@gmail.com',
  phone: '+92 342 6793428',
  whatsappNumber: '+923426793428',
  wechatId: 'MarketingTycoonsOfficial',
  address: 'Global Headquarters • Suite 4200, Tech Financial Plaza',
  heroHeadlinePrefix: 'Engineering',
  heroHeadlineHighlight: 'Category-Defining Brands & Scalable Systems',
  heroDescription:
    'We partner with ambitious enterprises and emerging founders to design category-defining brands, ultra-fast web architectures, and high-converting performance marketing funnels.',
  primaryCtaText: 'Book Free Consultation',
  secondaryCtaText: 'View Our Work',
  footerText: 'Marketing Tycoons is a premier international digital agency engineering bespoke software, high-ROAS marketing funnels, and authoritative brand identities for enterprises globally.',
  aboutHeadline: 'We are Marketing Tycoons',
  aboutText:
    'We are Marketing Tycoons — an elite international digital agency helping global enterprises and ambitious startups build authoritative brands, engineer high-performing software platforms, and drive exponential revenue through data-backed marketing systems. We combine senior-level strategic execution with aesthetic mastery.',
  aboutFeatures: [
    'Senior-Level Engineering & Creative Direction',
    'Customized ROI-Driven Architecture',
    'Fixed Milestone & On-Time Delivery Guarantee',
    'Transparent Enterprise SLAs & 24/7 Support'
  ],
  heroImageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
  lightHeroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  darkHeroImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=85',

  // Cinematic Video & Visual Settings
  heroVideoUrl: '/videos/code_screen.mp4',
  lightHeroVideo: '/videos/code_screen.mp4',
  darkHeroVideo: '/videos/code_screen.mp4',
  heroVideoPoster: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=85',
  heroMobileVideoUrl: '/videos/code_screen.mp4',
  heroVideoEnabled: true,
  heroVideoOverlayOpacity: 0.35,

  fullWidthVideoUrl: '/videos/code_screen.mp4',
  fullWidthVideoPoster: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1800&q=85',
  fullWidthVideoEnabled: true,
  fullWidthHeadline: "WE DON'T JUST BUILD BRANDS. WE BUILD DIGITAL EXPERIENCES.",
  fullWidthSubheadline: 'From breakthrough web architecture to high-converting creative direction, we engineer digital authority for ambitious companies worldwide.',

  aboutVideoUrl: '/videos/creative_office.mp4',
  aboutVideoPoster: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=85',
  aboutVideoEnabled: true,

  ctaVideoUrl: '/videos/gold_abstract.mp4',
  ctaVideoPoster: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1800&q=85',
  ctaVideoEnabled: true,
  ctaHeadline: 'READY TO ACCELERATE YOUR GROWTH?',
  ctaSubheading: "Book a complimentary strategic consultation. We'll audit your current digital footprint and map out a high-converting growth architecture."
};

export const DEFAULT_STATS: StatItem[] = [
  { id: 'stat-1', number: '150+', label: 'Global Clients', order: 1 },
  { id: 'stat-2', number: '$45M+', label: 'Client Revenue Generated', order: 2 },
  { id: 'stat-3', number: '6+', label: 'Years Experience', order: 3 },
  { id: 'stat-4', number: '99.4%', label: 'Client Retention & Satisfaction', order: 4 }
];

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'srv-digital-marketing',
    title: 'Digital Marketing',
    shortDescription: 'Multi-channel acquisition strategies that scale revenue predictably.',
    fullDescription:
      'Full-funnel digital marketing engineered for international scale. We orchestrate omni-channel acquisition architectures across search, paid social, programmatic media, and automated conversion pipelines to lower customer acquisition costs and drive sustainable enterprise revenue.',
    iconName: 'Megaphone',
    enabled: true,
    order: 1,
    features: [
      'Full-funnel acquisition & retargeting architecture',
      'Multi-channel attribution & conversion rate optimization (CRO)',
      'Data-driven media buying across Google, Meta, and LinkedIn',
      'Predictive customer lifetime value (LTV) modeling'
    ],
    deliverables: [
      'Comprehensive Growth Architecture Blueprint',
      'Live Multi-Touch Attribution & ROAS Dashboard',
      'Iterative Creative Testing & Ad Asset Matrix',
      'Weekly Executive Performance & Pipeline Reports'
    ],
    startingPrice: '$2,450 / mo',
    bgImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    problemsSolved: [
      'Unpredictable pipeline and fluctuating inbound lead flow',
      'High Customer Acquisition Costs (CAC) eroding margin',
      'Disjointed messaging across fragmented marketing channels',
      'Inability to measure true ROAS due to broken pixel/CAPI tracking'
    ],
    approach:
      'We treat digital marketing as a quantitative science. Every campaign is built upon rigorous market segmentation, unit-economics modeling, dynamic creative experimentation, and continuous conversion rate engineering.',
    benefits: [
      'Average +240% increase in qualified inbound opportunity volume',
      '35% to 50% decrease in customer acquisition costs (CAC)',
      '100% transparent live attribution reporting without vanity metrics',
      'Direct alignment between marketing spend and bottom-line enterprise EBITDA'
    ],
    processSteps: [
      { step: '01', title: 'Auditing & Unit Economics', description: 'Deep-dive analysis of your historical conversion data, buyer personas, and unit economics.' },
      { step: '02', title: 'Full-Funnel Architecture', description: 'Structuring multi-channel paid touchpoints, dynamic hooks, and conversion routing.' },
      { step: '03', title: 'Controlled Media Deployment', description: 'Launching systematic multivariate testing matrices to identify high-converting creative angles.' },
      { step: '04', title: 'Aggressive Scaling & CRO', description: 'Doubling down on winning segments while continuously optimizing landing page conversions.' }
    ],
    faqs: [
      {
        question: 'How quickly can we expect to see tangible pipeline results?',
        answer: 'Initial optimization and conversion tracking calibration occur in weeks 1-2. Significant pipeline acceleration and positive ROAS typically materialize within 30 to 45 days of consistent creative testing.'
      },
      {
        question: 'What ad platforms do you specialize in?',
        answer: 'We deploy enterprise-grade campaigns across Meta Ads (Facebook & Instagram), Google Search, Performance Max, YouTube, and LinkedIn Ads, tailored to whether your model is B2B or B2C.'
      },
      {
        question: 'Who owns the ad accounts and creative assets?',
        answer: 'You retain 100% ownership of all advertising accounts, tracking pixels, and custom-created design assets. We never hold your business accounts hostage.'
      }
    ]
  },
  {
    id: 'srv-seo',
    title: 'SEO Services',
    shortDescription: 'Technical search engineering & authoritative ranking that captures buyer intent.',
    fullDescription:
      'Enterprise search engine optimization engineered for maximum commercial intent. We combine surgical technical audits, Core Web Vitals optimization, semantic entity clustering, high-authority backlink acquisition, and programmatic SEO to establish durable market leadership in Google organic results.',
    iconName: 'TrendingUp',
    enabled: true,
    order: 2,
    features: [
      'Forensic technical SEO (Crawlability, Core Web Vitals, Schema.org)',
      'High-intent commercial keyword mapping & topical clustering',
      'Authoritative tier-1 editorial link acquisition & digital PR',
      'AI search engine optimization (GEO / Search Generative Experience)'
    ],
    deliverables: [
      'Comprehensive 80-Point Technical SEO Audit & Code Fixes',
      'Commercial Keyword Strategy & Competitor Moat Analysis',
      'Schema.org JSON-LD Structured Data Implementation',
      'Monthly Executive Organic Revenue & Keyword Tracking Dashboard'
    ],
    startingPrice: '$1,850 / mo',
    bgImageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    problemsSolved: [
      'Stagnant organic rankings while competitors capture high-intent search volume',
      'Algorithmic penalties or loss of traffic from technical crawling errors',
      'Wasted investment on generic blog posts that generate zero paying clients',
      'Lack of visibility in next-generation AI search engines and answer boxes'
    ],
    approach:
      'We do not engage in superficial keyword stuffing or low-grade guest posts. We engineer authoritative search footprints that search engines perceive as definitive industry resources through technical precision, structured data, and high-value digital PR.',
    benefits: [
      'Predictable, high-intent organic traffic that converts without ad spend',
      'Top 3 search positioning for high-margin commercial intent terms',
      'Perpetual compounding ROI that grows in equity month after month',
      'Resilience against major Google core algorithmic updates'
    ],
    processSteps: [
      { step: '01', title: 'Technical Architecture Audit', description: 'Resolving crawl budget waste, indexation bottlenecks, and schema markup deficits.' },
      { step: '02', title: 'Topical Authority Blueprint', description: 'Mapping semantic content clusters that establish undeniable subject-matter authority.' },
      { step: '03', title: 'On-Page Optimization', description: 'Rewriting key conversion pages, title tags, internal linking, and content hierarchy.' },
      { step: '04', title: 'High-Tier Link Acquisition', description: 'Securing contextual placements on authoritative publications and industry journals.' }
    ],
    faqs: [
      {
        question: 'How long does it take for SEO efforts to reflect in Google rankings?',
        answer: 'Technical fixes often produce ranking improvements within 3 to 6 weeks. Competitive head-terms and domain authority growth generally compound significantly over 3 to 6 months.'
      },
      {
        question: 'Do you follow Google Search Essentials guidelines?',
        answer: 'Yes, 100%. We employ strictly white-hat, guidelines-compliant search engineering methods focused on user intent, high page speed, and authentic editorial value.'
      }
    ]
  },
  {
    id: 'srv-web-dev',
    title: 'Web Development',
    shortDescription: 'Sub-second web architectures & custom platforms built to convert.',
    fullDescription:
      'Bespoke web applications, corporate digital headquarters, and high-performance web platforms engineered with modern TypeScript, React, and serverless infrastructures. Designed with sub-second page latency, WCAG AA accessibility, and rock-solid conversion paths.',
    iconName: 'Code',
    enabled: true,
    order: 3,
    features: [
      'Custom React 19, Next.js, and TypeScript architectures',
      'Sub-second Core Web Vitals (95+ score on Google PageSpeed)',
      'Responsive design across mobile, tablet, and ultra-wide screens',
      'Secure Headless CMS integration & custom API architectures'
    ],
    deliverables: [
      'Production-Ready Source Code with Full Commercial Ownership',
      'Responsive Web Platform with Zero Layout Shift (CLS < 0.05)',
      'Complete Technical SEO & Schema Markup Integration',
      '30-Day Post-Launch Code Warranty & Cloud Deployment'
    ],
    startingPrice: '$2,950',
    bgImageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    problemsSolved: [
      'Slow, bloated legacy websites shedding 40%+ of mobile visitors',
      'Clunky user journeys causing visitor dropoff before inquiry or checkout',
      'Rigid templates that fail to convey international brand legitimacy',
      'Security vulnerabilities and high maintenance overhead'
    ],
    approach:
      'We write clean, modular, production-grade code designed from the ground up for conversion psychology, instant load times, and fluid responsiveness. No bloated page builders or generic WordPress themes.',
    benefits: [
      'Sub-second page loading speeds that directly boost conversion rates by 20%+',
      '100% bespoke design crafted to position you as the definitive market leader',
      'Clean maintainable codebase that scales gracefully with your business',
      'Flawless cross-browser compatibility and mobile responsiveness'
    ],
    processSteps: [
      { step: '01', title: 'Architecture & Wireframing', description: 'Information architecture, user flow mapping, and low-fidelity structural blueprints.' },
      { step: '02', title: 'High-Fidelity Prototyping', description: 'Crafting pixel-perfect design systems, micro-interactions, and responsive views.' },
      { step: '03', title: 'TypeScript/React Engineering', description: 'Clean modular code development with rigorous accessibility and speed optimization.' },
      { step: '04', title: 'Deployment & Quality Assurance', description: 'Cross-browser stress-testing, Core Web Vitals validation, and staging migration.' }
    ],
    faqs: [
      {
        question: 'Do we own the full source code after launch?',
        answer: 'Yes, 100%. Upon final project delivery, all code repositories, assets, and design files are transferred to your organization with full commercial rights.'
      },
      {
        question: 'What tech stack do you recommend?',
        answer: 'We build primarily with modern TypeScript, React, Next.js, and Tailwind CSS, backed by robust serverless databases like Google Cloud SQL and Firebase.'
      }
    ]
  },
  {
    id: 'srv-ui-ux',
    title: 'UI/UX Design',
    shortDescription: 'User experiences that turn complex journeys into effortless conversions.',
    fullDescription:
      'Conversion-focused UI/UX design for web platforms, SaaS dashboards, and digital products. We blend cognitive psychology, typographic hierarchy, and intuitive interaction design to build interfaces that feel effortless to navigate and drive high retention.',
    iconName: 'Layout',
    enabled: true,
    order: 4,
    features: [
      'Comprehensive user research & friction-point mapping',
      'Atomic Design Systems in Figma with complete component tokens',
      'High-fidelity interactive prototypes & micro-interactions',
      'Conversion Rate Optimization (CRO) UX audits & checkout flows'
    ],
    deliverables: [
      'Complete Figma Design System with Light/Dark Theme Specs',
      'Interactive Clickable Prototypes for Stakeholder Review',
      'Developer-Ready Design Specs & Asset Exports',
      'User Journey & Friction Analysis Documentation'
    ],
    startingPrice: '$1,950',
    bgImageUrl: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=800&q=80',
    problemsSolved: [
      'High bounce rates due to confusing user flows and visual clutter',
      'Inconsistent visual branding between marketing site and product platform',
      'Expensive developer rework caused by designing directly in code without prototypes',
      'Friction points at critical conversion milestones (forms, signup, checkout)'
    ],
    approach:
      'We combine aesthetic luxury with conversion science. By adhering to the Universal Design Constitution—zero-pill discipline, optical rhythm, and strict typographic hierarchy—we make complex interfaces clear, credible, and intuitive.',
    benefits: [
      'Measurable reduction in user dropoff across critical funnel stages',
      'Elevated visual prestige that immediately wins enterprise client trust',
      'Accelerated engineering velocity through standardized Figma design systems',
      'Complete WCAG AA accessibility compliance'
    ],
    processSteps: [
      { step: '01', title: 'Discovery & User Mapping', description: 'Deconstructing core user tasks, personas, and existing usability roadblocks.' },
      { step: '02', title: 'Wireframes & Information Hierarchy', description: 'Rapid structural exploration to validate information architecture and navigation.' },
      { step: '03', title: 'High-Fidelity Visual Craft', description: 'Polishing typography, color science, iconography, and spatial math in Figma.' },
      { step: '04', title: 'Design System & Handoff', description: 'Organizing tokens, interactive states, and specs for clean developer implementation.' }
    ],
    faqs: [
      {
        question: 'Do you deliver fully organized Figma files?',
        answer: 'Yes. Every project includes structured components, auto-layout frames, semantic variable tokens, and organized light/dark variants ready for engineering.'
      },
      {
        question: 'Can you redesign our existing software platform or app?',
        answer: 'Absolutely. We regularly audit existing platforms, preserve core business logic, and overhaul the user experience to maximize engagement and clarity.'
      }
    ]
  },
  {
    id: 'srv-branding',
    title: 'Branding',
    shortDescription: 'Memorable brand identities that command premium pricing and category leadership.',
    fullDescription:
      'Comprehensive brand architecture for companies looking to establish undeniable market authority. We create timeless brand identities—from monograms and bespoke typography to messaging frameworks, verbal identity playbooks, and complete visual guidelines.',
    iconName: 'Crown',
    enabled: true,
    order: 5,
    features: [
      'Bespoke monogram, wordmark, and emblem design',
      'Comprehensive Brand Identity Guidelines & typography systems',
      'Strategic brand positioning, voice, and narrative frameworks',
      'Collateral design (Stationery, pitch decks, social media toolkits)'
    ],
    deliverables: [
      'Complete Vector Logomark Suite (SVG, EPS, PNG, PDF)',
      '60+ Page Brand Bible & Visual Identity Guidelines',
      'Typography Hierarchy & Color Psychology Specifications',
      'Full Commercial Copyright & Intellectual Property Transfer'
    ],
    startingPrice: '$1,650',
    bgImageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    problemsSolved: [
      'Amateurish branding that fails to convey corporate legitimacy to enterprise clients',
      'Inconsistent visual presentation across digital, pitch, and print touchpoints',
      'Difficulty justifying premium pricing in competitive vendor bids',
      'Brand messaging that blends into the background of competitors'
    ],
    approach:
      'A great brand is not just a logo; it is a strategic asset that commands respect. We distill your core competitive differentiation into an iconic, cohesive visual language that inspires immediate trust.',
    benefits: [
      'Direct pricing power—charge 3x to 5x higher rates with premium positioning',
      'Instant credibility with international investors, partners, and enterprise buyers',
      'Total visual consistency across every marketing and sales channel',
      'Future-proof design that stands the test of time without looking dated'
    ],
    processSteps: [
      { step: '01', title: 'Brand Strategy & Archetype', description: 'Defining your brand essence, market positioning, target audience, and verbal tone.' },
      { step: '02', title: 'Concept Exploration', description: 'Developing 3 distinct creative directions with moodboards, monograms, and typography.' },
      { step: '03', title: 'Identity Refinement', description: 'Refining the chosen identity across all digital, print, and architectural applications.' },
      { step: '04', title: 'Brand Bible Publication', description: 'Delivering the comprehensive guideline book with vector assets and usage rules.' }
    ],
    faqs: [
      {
        question: 'Do we receive full copyright ownership of the brand identity?',
        answer: 'Yes. All created logos, mark files, color formulations, and graphic assets are 100% assigned to your company upon final delivery.'
      },
      {
        question: 'How many design concepts do you present?',
        answer: 'We present 3 thoroughly developed, strategically distinct brand directions, followed by collaborative revision rounds on the selected direction.'
      }
    ]
  },
  {
    id: 'srv-social-media',
    title: 'Social Media Marketing',
    shortDescription: 'High-impact organic social strategies that build engaged communities.',
    fullDescription:
      'Omnichannel social growth strategies that turn passive audiences into loyal brand advocates. We handle high-production short-form video, thought leadership content for executives, community management, and trend-driven distribution across LinkedIn, X/Twitter, Instagram, and YouTube.',
    iconName: 'Share2',
    enabled: true,
    order: 6,
    features: [
      'Omnichannel content strategy & editorial publishing schedule',
      'High-CTR short-form video creation (Reels, Shorts, TikTok)',
      'Executive thought leadership & personal branding for founders',
      'Community management, outbound engagement, and DM funnels'
    ],
    deliverables: [
      '30 Monthly High-Production Posts & Custom Visual Creatives',
      'Bi-Weekly Strategic Content Calendar for Client Review',
      'Dedicated Community Strategist & Engagement Management',
      'Monthly Audience Reach, Engagement, and Growth Analytics'
    ],
    startingPrice: '$1,350 / mo',
    bgImageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    problemsSolved: [
      'Inconsistent posting schedules that kill algorithmic reach',
      'Generic social content that generates zero inquiries or pipeline',
      'Internal team lack of time to produce high-production video assets',
      'Disconnect between executive personal brands and corporate goals'
    ],
    approach:
      'We focus on high-signal content: hook-driven storytelling, proprietary industry data, visual breakdowns, and authentic brand viewpoints that earn attention and respect.',
    benefits: [
      'Compounding inbound inbound referral network through established authority',
      'Consistent daily brand presence across your primary industry channels',
      'Direct conversation pipeline with decision-makers via social DMs',
      'Higher client closing rates due to social proof and active social credibility'
    ],
    processSteps: [
      { step: '01', title: 'Content Pillar Blueprint', description: 'Defining high-engagement themes, target audience pains, and format distribution.' },
      { step: '02', title: 'Creative Production Pipeline', description: 'Scripting, graphic design, and video editing for a full month of content in advance.' },
      { step: '03', title: 'Publishing & Engagement', description: 'Scheduled deployment at peak engagement hours with active comment management.' },
      { step: '04', title: 'Performance Retrospective', description: 'Reviewing metrics to identify high-performing content formats and double down.' }
    ],
    faqs: [
      {
        question: 'Do we have to review and approve posts before they go live?',
        answer: 'Yes. All posts, captions, and creative assets are uploaded to a collaborative review dashboard for your approval before publication.'
      },
      {
        question: 'Do you manage founder profiles on LinkedIn and X?',
        answer: 'Yes, we specialize in ghostwriting executive thought leadership content that establishes founders as respected voices in their market.'
      }
    ]
  },
  {
    id: 'srv-ecommerce',
    title: 'E-commerce Solutions',
    shortDescription: 'High-converting online stores engineered for maximum average order value and scale.',
    fullDescription:
      'Full-stack e-commerce platforms engineered for maximum conversion velocity and seamless checkout. From custom headless Shopify and WooCommerce implementations to custom subscription builders, inventory synchronization, and post-purchase upsell funnels.',
    iconName: 'ShoppingBag',
    enabled: true,
    order: 7,
    features: [
      'Headless Shopify & custom React storefront engineering',
      'Sub-500ms catalog search & dynamic product filtering',
      'Custom subscription builders and recurring revenue architectures',
      'One-click checkout optimization & dynamic upsell funnels'
    ],
    deliverables: [
      'Turnkey E-commerce Storefront with Stripe/Shopify Pay Integration',
      'Mobile-Optimized Shopping Cart with Abandonment Mitigation',
      'ERP/Inventory & Logistics API Integration',
      'Core Web Vitals Speed Score 90+ on Product Pages'
    ],
    startingPrice: '$3,450',
    bgImageUrl: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    problemsSolved: [
      'High shopping cart abandonment rates caused by slow or friction-heavy checkouts',
      'Slow mobile load speeds costing 30%+ of potential retail sales',
      'Inability to implement complex recurring subscriptions or bundle builders',
      'Disorganized inventory tracking across multiple sales channels'
    ],
    approach:
      'We treat every millimeter of the e-commerce journey as a conversion lever: instant product filtration, sensory photography presentation, friction-free checkout, and strategic post-purchase upsells that maximize average order value (AOV).',
    benefits: [
      'Measurable 25% to 45% uplift in overall store checkout conversion rates',
      'Higher Average Order Value (AOV) through intelligent bundling and upsells',
      'Instantaneous page-to-page navigation that keeps customers shopping longer',
      'Seamless multi-currency and international tax compliance configuration'
    ],
    processSteps: [
      { step: '01', title: 'Catalog & Funnel Architecture', description: 'Mapping customer buying journeys, product taxonomy, and subscription models.' },
      { step: '02', title: 'High-Converting UI/UX Design', description: 'Designing high-impact product detail pages, instant cart drawers, and mobile flows.' },
      { step: '03', title: 'Storefront Engineering', description: 'Building the fast storefront with custom APIs, checkout gateways, and CRM hooks.' },
      { step: '04', title: 'Checkout Testing & Launch', description: 'Simulating transaction loads, testing fraud rules, and launching live tracking.' }
    ],
    faqs: [
      {
        question: 'Which e-commerce platforms do you build on?',
        answer: 'We build primarily on Shopify (standard and headless via Shopify Storefront API), custom React/Next.js e-commerce platforms, and advanced WooCommerce architectures.'
      },
      {
        question: 'Can you migrate our products and customer data from our old store?',
        answer: 'Yes. We handle end-to-end data migration including customer accounts, order history, catalog taxonomies, and 301 SEO redirect maps to protect your search rankings.'
      }
    ]
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
    industry: 'Luxury Retail & E-Commerce',
    shortDescription: 'Headless luxury e-commerce experience with sub-second product filtering and checkout.',
    fullDescription:
      'A responsive e-commerce experience designed for a modern luxury retail brand. Engineered with seamless micro-interactions, responsive mobile grid layouts, real-time inventory synchronization, and Stripe checkout integration.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    projectUrl: 'https://auramaison.vercel.app',
    status: 'Live Project',
    featured: true,
    order: 1,
    clientName: 'Aura Maison Paris',
    completionDate: 'Q1 2026',
    timeline: '3 Months',
    browserUrl: 'https://auramaison.com',
    tags: ['E-Commerce', 'Next.js', 'Stripe', 'Tailwind CSS', 'High Conversion'],
    challenges: 'A sluggish legacy Shopify store suffered from 4.8s mobile load times, high bounce rates, and 68% cart abandonment during checkout.',
    solution: 'Re-engineered the platform as a headless React 19 architecture with sub-500ms client-side product filtering, predictive search, and one-click Stripe payment flows.',
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
    industry: 'Financial Advisory & Wealth Management',
    shortDescription: 'High-performance corporate platform with bilingual localization and encrypted client room.',
    fullDescription:
      'Enterprise web architecture built for an international advisory firm. Features real browser navigation, responsive desktop and mobile breakpoints, secure contact gateways, and technical SEO hierarchy.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    projectUrl: 'https://sterling-advisory.vercel.app',
    status: 'Live Project',
    featured: true,
    order: 2,
    clientName: 'Sterling & Co. Advisory',
    completionDate: 'Q4 2025',
    timeline: '2.5 Months',
    browserUrl: 'https://sterlingadvisory.com',
    tags: ['Web Development', 'Corporate Architecture', 'Security', 'Fast Load'],
    challenges: 'An outdated corporate website lacked mobile responsiveness, international credibility, and secure client onboarding gateways.',
    solution: 'Designed and engineered an institutional-grade corporate platform with bilingual English/Arabic localization, sub-second responses, and SOC2-aligned contact forms.',
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
    industry: 'Private Equity & Venture Capital',
    shortDescription: 'Bespoke monogram, metallic brand bible, and corporate identity system.',
    fullDescription:
      'Comprehensive brand identity system engineered for a global investment group. Includes custom typography, monogram vectors, metallic gold foil print specifications, business stationery, and brand guidelines.',
    imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    projectUrl: 'https://apexcapital.global',
    status: 'Live Project',
    featured: true,
    order: 3,
    clientName: 'Apex Capital Global',
    completionDate: 'Q4 2025',
    timeline: '6 Weeks',
    browserUrl: 'https://apexcapital.global',
    tags: ['Branding', 'Monogram Design', 'Brand Bible', 'Gold Foil'],
    challenges: 'The firm possessed an outdated, generic visual identity that failed to inspire confidence among sovereign wealth funds and institutional LP investors.',
    solution: 'Designed an authoritative visual identity system featuring a bespoke geometric monogram, luxury typography pairing, metallic color standards, and institutional pitch decks.',
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
    industry: 'Enterprise Technology & Cybersecurity',
    shortDescription: '36 dynamic digital banner formats and high-CTR advertising collateral.',
    fullDescription:
      'High-impact vector graphic design and multi-ratio promotional banners for an international tech exhibition. Created digital out-of-home displays, social ad banners, and print exhibition collateral.',
    imageUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=85',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    projectUrl: 'https://cybersummit.tech',
    status: 'Live Project',
    featured: false,
    order: 4,
    clientName: 'CyberSummit Tech Global',
    completionDate: 'Q3 2025',
    timeline: '4 Weeks',
    browserUrl: 'https://cybersummit.tech',
    tags: ['Graphic Design', 'Display Banners', 'Ad Creatives', 'Print Collateral'],
    challenges: 'Campaign assets were required across 36 digital and print aspect ratios within tight conference ticketing launch deadlines.',
    solution: 'Engineered a modular Figma vector component system allowing rapid programmatic rendering of 120+ ad variants with 100% brand consistency.',
    results: 'Multi-Ratio Asset Delivery Across 36 Formats, 4.8% CTR',
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
    industry: 'Consumer Goods & Clean Cosmetics',
    shortDescription: 'Omnichannel social media creatives, Instagram reels, and brand storytelling.',
    fullDescription:
      'Strategic social media campaign design featuring carousel layouts, short-form motion reels, story templates, and high-engagement brand consistency across Instagram and TikTok.',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=85',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    projectUrl: 'https://gloworganics.co',
    status: 'Live Project',
    featured: true,
    order: 5,
    clientName: 'Glow Organics Clean Beauty',
    completionDate: 'Q1 2026',
    timeline: 'Ongoing / 4 Months',
    browserUrl: 'https://gloworganics.co',
    tags: ['Social Media', 'Reels Design', 'Content Strategy', 'Brand Consistency'],
    challenges: 'Inconsistent visual presentation across social platforms resulted in stagnant engagement and lack of social proof for new product drops.',
    solution: 'Implemented a 30-post monthly production pipeline combining educational carousel graphics, aesthetic lifestyle photography, and punchy hook-driven motion reels.',
    results: '30+ Custom Monthly Creatives & +320% Engagement Lift',
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
    industry: 'Healthcare, Biotech & Diagnostics',
    shortDescription: 'Technical site audit, schema markup engineering, and search intent keyword clusters.',
    fullDescription:
      'Complete SEO process deployment: in-depth technical site crawl, Core Web Vitals optimization, on-page schema JSON-LD structuring, and high-authority search content architecture.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    projectUrl: 'https://biohealthlabs.io',
    status: 'Live Project',
    featured: false,
    order: 6,
    clientName: 'BioHealth Research',
    completionDate: 'Q2 2025',
    timeline: '8 Weeks',
    browserUrl: 'https://biohealthlabs.io',
    tags: ['Technical SEO', 'Keyword Strategy', 'Core Web Vitals', 'Structured Data'],
    challenges: 'The diagnostic provider was invisible for commercial medical testing search queries due to severe indexation issues and missing structured metadata.',
    solution: 'Executed an 80-point technical SEO overhaul, implemented MedicalWebPage schema markup, and built 12 topical medical content clusters.',
    results: '+280% Organic Traffic Lift, 1,450+ Keywords Ranked',
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
    industry: 'Performance Gear & D2C Apparel',
    shortDescription: 'Audience testing matrices, dynamic creative variations, and conversion API tracking.',
    fullDescription:
      'High-converting Facebook and Instagram ad campaign setup. Includes modular hook testing, high-CTR static and motion ad creatives, copy angles, and retargeting funnel structuring.',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85',
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
    projectUrl: 'https://zenithvelocity.agency',
    status: 'Live Project',
    featured: true,
    order: 7,
    clientName: 'Zenith Performance Media',
    completionDate: 'Q1 2026',
    timeline: '6 Weeks',
    browserUrl: 'https://zenithvelocity.agency',
    tags: ['Meta Ads', 'Paid Social', 'ROAS Optimization', 'Creative Testing'],
    challenges: 'Struggled with an unsustainable 1.4x ROAS, high customer acquisition costs, and poor attribution after iOS tracking changes.',
    solution: 'Architected a multi-angle creative testing system with 18 video cutdowns, Meta Conversions API (CAPI) server-side integration, and dynamic retargeting.',
    results: '5.6x ROAS, -42% CPA Reduction across 4.2M Reach',
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
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
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
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
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
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
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
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
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
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
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
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
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
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
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
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
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
    videoUrl: '/videos/marketing_tycoons_brand_film.mp4',
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
    email: 'farooq.editor@marketingtycoons.org',
    role: 'Editor',
    status: 'Active',
    createdAt: '2026-03-12T11:45:00Z',
    lastActive: '2026-09-24T18:12:00Z'
  },
  {
    id: 'user-3',
    name: 'Sarah Jenkins (Manager)',
    email: 'sarah.manager@marketingtycoons.org',
    role: 'Manager',
    status: 'Active',
    createdAt: '2026-05-20T09:30:00Z',
    lastActive: '2026-09-25T01:15:00Z'
  }
];

export const DEFAULT_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Ayaan Khan',
    role: 'Founder & Managing Director',
    experience: '8+ Years Scaling Digital Ventures',
    bio: 'Pioneering growth architect specializing in international expansion, corporate brand positioning, and cross-border client scaling.',
    achievements: [
      'Scaled 120+ international client accounts across US, UK & Middle East',
      'Engineered $45M+ in verified client pipeline and ecommerce revenue',
      'Keynote speaker on digital brand equity and algorithmic SEO'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=85',
    linkedin: 'https://linkedin.com/company/marketingtycoons',
    twitter: 'https://x.com/marketingtycoons',
    skills: [
      { name: 'International Brand Positioning', level: 98, category: 'Strategy' },
      { name: 'Revenue Funnel Architecture', level: 96, category: 'Growth' },
      { name: 'E-Commerce Unit Economics', level: 94, category: 'Finance' },
      { name: 'Algorithmic Media Economics', level: 92, category: 'Analytics' }
    ]
  },
  {
    id: 'team-2',
    name: 'Marcus Vance',
    role: 'Head of Web & Cloud Architecture',
    experience: '10+ Years Full-Stack Engineering',
    bio: 'Ex-Fintech software architect with expertise in high-concurrency cloud systems, sub-second React platforms, and enterprise security compliance.',
    achievements: [
      'Architected platforms sustaining 2M+ monthly active transactions',
      'Achieved 100/100 Core Web Vitals on 45+ enterprise portals',
      'AWS & Google Cloud Certified Solutions Architect Professional'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=85',
    linkedin: 'https://linkedin.com/company/marketingtycoons',
    github: 'https://github.com/marketingtycoons',
    skills: [
      { name: 'React 19 / Next.js / TypeScript', level: 99, category: 'Frontend' },
      { name: 'Cloud Architecture (AWS / GCP)', level: 97, category: 'DevOps' },
      { name: 'Core Web Vitals (<420ms Latency)', level: 98, category: 'Performance' },
      { name: 'Headless CMS & API Contracts', level: 95, category: 'Backend' }
    ]
  },
  {
    id: 'team-3',
    name: 'Elena Rostova',
    role: 'Creative Director & Brand Strategist',
    experience: '7+ Years Luxury Brand Design',
    bio: 'Award-winning UI/UX designer and typographer crafting iconic visual identities and digital flagship experiences for luxury and tech innovators.',
    achievements: [
      'Awwwards & FWA featured digital design system architect',
      'Led rebranding initiatives for 8 international corporate conglomerates',
      'Pioneer of zero-friction checkout and sensory ecommerce UX'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=85',
    linkedin: 'https://linkedin.com/company/marketingtycoons',
    twitter: 'https://x.com/marketingtycoons',
    skills: [
      { name: 'Design Systems (Figma Tokens)', level: 99, category: 'Systems' },
      { name: 'UI/UX & Cognitive Conversion', level: 97, category: 'UX' },
      { name: 'Typography Science & Art Direction', level: 96, category: 'Brand' },
      { name: 'Motion Physics & Micro-Interactions', level: 93, category: 'Motion' }
    ]
  },
  {
    id: 'team-4',
    name: 'Hamza Malik',
    role: 'Head of Search & Performance Marketing',
    experience: '8+ Years Algorithmic Growth',
    bio: 'Quantitative media buyer and technical search engine specialist managing seven-figure advertising budgets with rigorous ROAS attribution.',
    achievements: [
      'Managed $12M+ in high-performing paid media across Meta and Google',
      'Consistently generated 4.8x+ average ROAS on D2C scaling campaigns',
      'Meta Certified Media Buying Professional & Google Search Master'
    ],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=85',
    linkedin: 'https://linkedin.com/company/marketingtycoons',
    twitter: 'https://x.com/marketingtycoons',
    skills: [
      { name: 'Server-Side CAPI & Meta Ads', level: 98, category: 'Paid Media' },
      { name: 'Google Performance Max & Search', level: 96, category: 'Search' },
      { name: 'Technical SEO & JSON-LD Schemas', level: 95, category: 'SEO' },
      { name: 'Attribution Modeling & CAC Tuning', level: 94, category: 'Analytics' }
    ]
  }
];

export const DEFAULT_INDUSTRIES: IndustryItem[] = [
  {
    id: 'ind-fintech',
    name: 'Fintech & Financial Services',
    description: 'High-security, compliant portals and trust-centered digital customer acquisition funnels.',
    iconName: 'Shield',
    metrics: '99.99% Uptime · SOC2 Standard',
    caseCount: '24+ Portals Launched'
  },
  {
    id: 'ind-ecommerce',
    name: 'High-Growth E-Commerce & D2C',
    description: 'Headless storefronts, custom subscription builders, and frictionless one-click checkouts.',
    iconName: 'ShoppingBag',
    metrics: '+164% Conversion Lift',
    caseCount: '38+ Storefronts'
  },
  {
    id: 'ind-saas',
    name: 'B2B SaaS & Enterprise Tech',
    description: 'Product-led growth architecture, interactive feature sandboxes, and pipeline generation.',
    iconName: 'Code',
    metrics: '3.4x Demo Request Rate',
    caseCount: '31+ SaaS Brands'
  },
  {
    id: 'ind-health',
    name: 'Healthcare, Biotech & Wellness',
    description: 'Patient acquisition, HIPAA-conscious digital infrastructures, and authoritative medical branding.',
    iconName: 'Activity',
    metrics: '100% Privacy Compliant',
    caseCount: '19+ Projects'
  },
  {
    id: 'ind-realestate',
    name: 'Real Estate & Spatial Architecture',
    description: 'High-resolution property showcases, investor pitch suites, and interactive lead capture.',
    iconName: 'Building',
    metrics: 'Sub-400ms High-Res Media',
    caseCount: '22+ Developments'
  },
  {
    id: 'ind-luxury',
    name: 'Luxury & Lifestyle Brands',
    description: 'Sensory visual storytelling, restrained minimalist typography, and high-touch VIP journeys.',
    iconName: 'Crown',
    metrics: 'Premium Category Moat',
    caseCount: '27+ Brand Bibles'
  }
];

