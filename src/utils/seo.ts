import { PortfolioProject, ServiceItem } from '../types';

export interface DynamicMetaOptions {
  title: string;
  description: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  jsonLd?: Record<string, any>;
}

const DEFAULT_META: DynamicMetaOptions = {
  title: 'Marketing Tycoons — Digital Marketing & Web Agency',
  description: 'Elite digital marketing, custom web engineering, bespoke graphic design, brand strategy, and high-impact social media management for ambitious businesses worldwide.',
  url: 'https://marketingtycoons.tech',
  image: 'https://marketingtycoons.tech/logo.png',
  type: 'website'
};

/**
 * Update document title, OpenGraph tags, Twitter Card tags, and inject Schema.org JSON-LD dynamically.
 */
export function setDynamicMeta(options: DynamicMetaOptions) {
  const {
    title,
    description,
    url = 'https://marketingtycoons.tech',
    image = 'https://marketingtycoons.tech/logo.png',
    type = 'website',
    jsonLd
  } = options;

  // 1. Page Title
  document.title = title;

  // 2. Standard Meta Description
  updateMetaTag('name', 'description', description);

  // 3. OpenGraph Properties
  updateMetaTag('property', 'og:title', title);
  updateMetaTag('property', 'og:description', description);
  updateMetaTag('property', 'og:url', url);
  updateMetaTag('property', 'og:image', image);
  updateMetaTag('property', 'og:type', type);
  updateMetaTag('property', 'og:site_name', 'Marketing Tycoons');

  // 4. Twitter Card Properties
  updateMetaTag('name', 'twitter:title', title);
  updateMetaTag('name', 'twitter:description', description);
  updateMetaTag('name', 'twitter:image', image);
  updateMetaTag('name', 'twitter:card', 'summary_large_image');
  updateMetaTag('name', 'twitter:site', '@MarketingTycoons');

  // 5. Canonical Link
  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', url);

  // 6. JSON-LD Structured Data
  if (jsonLd) {
    let scriptEl = document.querySelector('script[data-dynamic-seo="true"]') as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.setAttribute('type', 'application/ld+json');
      scriptEl.setAttribute('data-dynamic-seo', 'true');
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(jsonLd);
  }
}

/**
 * Helper to update or create a meta element
 */
function updateMetaTag(keyType: 'name' | 'property', key: string, content: string) {
  let metaEl = document.querySelector(`meta[${keyType}="${key}"]`);
  if (!metaEl) {
    metaEl = document.createElement('meta');
    metaEl.setAttribute(keyType, key);
    document.head.appendChild(metaEl);
  }
  metaEl.setAttribute('content', content);
}

/**
 * Reset meta tags back to primary agency baseline
 */
export function resetDefaultMeta() {
  setDynamicMeta(DEFAULT_META);
  const dynamicScript = document.querySelector('script[data-dynamic-seo="true"]');
  if (dynamicScript) {
    dynamicScript.remove();
  }
}

/**
 * Generate SEO & Social Sharing metadata for a Portfolio Project
 */
export function setProjectMeta(project: PortfolioProject) {
  const projectUrl = `https://marketingtycoons.tech/#portfolio?project=${project.id}`;
  const fullTitle = `${project.title} — ${project.category} Portfolio | Marketing Tycoons`;
  const desc = project.fullDescription || project.shortDescription || `Case study for ${project.title}: delivered by Marketing Tycoons specializing in ${project.category} with measurable client growth and industry impact.`;
  const img = project.imageUrl || 'https://marketingtycoons.tech/logo.png';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    headline: project.title,
    description: desc,
    image: img,
    url: projectUrl,
    genre: project.category,
    creator: {
      '@type': 'Organization',
      name: 'Marketing Tycoons',
      url: 'https://marketingtycoons.tech'
    },
    client: project.clientName ? {
      '@type': 'Organization',
      name: project.clientName
    } : undefined,
    datePublished: project.completionDate || '2025'
  };

  setDynamicMeta({
    title: fullTitle,
    description: desc,
    url: projectUrl,
    image: img,
    type: 'article',
    jsonLd
  });
}

/**
 * Generate SEO & Social Sharing metadata for a Service Solution
 */
export function setServiceMeta(service: ServiceItem) {
  const serviceUrl = `https://marketingtycoons.tech/#services?service=${service.id}`;
  const fullTitle = `${service.title} — Digital Solutions | Marketing Tycoons`;
  const desc = service.fullDescription || service.shortDescription || `Explore ${service.title} services by Marketing Tycoons. Data-driven strategy, creative execution, and ROI optimization.`;
  const img = service.bgImageUrl || 'https://marketingtycoons.tech/logo.png';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.title,
    name: service.title,
    description: desc,
    image: img,
    url: serviceUrl,
    provider: {
      '@type': 'ProfessionalService',
      name: 'Marketing Tycoons',
      url: 'https://marketingtycoons.tech'
    },
    offers: service.startingPrice ? {
      '@type': 'Offer',
      price: service.startingPrice.replace(/[^0-9]/g, '') || '0',
      priceCurrency: 'USD',
      description: `Starting from ${service.startingPrice}`
    } : undefined
  };

  setDynamicMeta({
    title: fullTitle,
    description: desc,
    url: serviceUrl,
    image: img,
    type: 'article',
    jsonLd
  });
}
