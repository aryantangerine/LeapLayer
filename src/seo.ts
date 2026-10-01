import { products, productPath, pricingPlans, type Product, type Faq } from './products';

// Canonical host: https://leaplayer.co.uk, no www, no trailing slash except the homepage.
export const SITE_URL = 'https://leaplayer.co.uk';
export const OG_IMAGE = '/og-image.png';
export const absolute = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`);

const ORG_ID = `${SITE_URL}/#organization`;
const FOUNDER_ID = `${SITE_URL}/#founder`;
const LINKEDIN = 'https://www.linkedin.com/in/aryan-parekh/';

export type JsonLd = Record<string, unknown>;

export type PageMeta = {
  path: string;
  title: string;
  description: string;
  schema: JsonLd[];
};

const founder: JsonLd = {
  '@type': 'Person',
  '@id': FOUNDER_ID,
  name: 'Aryan Parekh',
  jobTitle: 'Founder',
  worksFor: { '@id': ORG_ID },
  sameAs: [LINKEDIN],
};

const organization: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: 'LeapLayer',
  legalName: 'LeapLayer Ltd',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/favicon.png`,
  image: `${SITE_URL}${OG_IMAGE}`,
  description: 'Done-for-you systems for UK local businesses: Google review automation, smart websites with lead capture, missed call text back, local SEO and a 24/7 AI receptionist.',
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  founder,
  sameAs: [LINKEDIN],
};

const website: JsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  name: 'LeapLayer',
  url: `${SITE_URL}/`,
  inLanguage: 'en-GB',
  publisher: { '@id': ORG_ID },
};

const breadcrumbs = (items: { name: string; path: string }[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: absolute(it.path),
  })),
});

const faqPage = (faqs: Faq[]): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
});

const monthlyOffer = (name: string, price: number, url: string): JsonLd => ({
  '@type': 'Offer',
  name,
  price: String(price),
  priceCurrency: 'GBP',
  url,
  priceSpecification: {
    '@type': 'UnitPriceSpecification',
    price: String(price),
    priceCurrency: 'GBP',
    unitText: 'MONTH',
  },
});

const productService = (p: Product): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${absolute(productPath(p.slug))}#service`,
  name: p.name,
  serviceType: p.name,
  description: p.metaDescription,
  url: absolute(productPath(p.slug)),
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'United Kingdom' },
  ...(p.pricing ? { offers: monthlyOffer(p.pricing.tier, p.pricing.price, `${SITE_URL}/pricing`) } : {}),
});

const sitewide = [organization, website];

export const pages: PageMeta[] = [
  {
    path: '/',
    title: 'Google Review Automation & Smart Websites | LeapLayer',
    description: 'Done-for-you systems for UK local businesses: automated Google review requests, a smart website with lead capture, missed call text back and a 24/7 AI receptionist.',
    schema: sitewide,
  },
  {
    path: '/about',
    title: 'About LeapLayer | Meet the Founder',
    description: 'LeapLayer is run by Aryan Parekh, an engineer at Jaguar Land Rover who builds done-for-you review, website and AI systems for UK local businesses.',
    schema: [
      ...sitewide,
      { '@context': 'https://schema.org', '@type': 'AboutPage', url: absolute('/about'), mainEntity: { '@id': FOUNDER_ID } },
    ],
  },
  {
    path: '/pricing',
    title: 'Pricing | No Setup Fees, No Contracts | LeapLayer',
    description: 'Simple monthly pricing for LeapLayer\'s done-for-you systems. Smart websites from £97 a month, plus review automation and AI receptionist packages. Cancel anytime.',
    schema: [
      ...sitewide,
      {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: 'LeapLayer packages',
        provider: { '@id': ORG_ID },
        areaServed: { '@type': 'Country', name: 'United Kingdom' },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'LeapLayer packages',
          itemListElement: pricingPlans.map((plan) => monthlyOffer(plan.name, plan.price, absolute('/pricing'))),
        },
      },
      breadcrumbs([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }]),
    ],
  },
  {
    path: '/book',
    title: 'Book a Free 15-Minute AI Audit | LeapLayer',
    description: 'Book a free 15-minute AI audit to see where Google reviews, a smart website and automation could bring your business more customers.',
    schema: sitewide,
  },
  ...products.map((p) => ({
    path: productPath(p.slug),
    title: p.metaTitle,
    description: p.metaDescription,
    schema: [
      ...sitewide,
      productService(p),
      breadcrumbs([
        { name: 'Home', path: '/' },
        { name: 'Products', path: '/#built-for-you' },
        { name: p.name, path: productPath(p.slug) },
      ]),
      faqPage(p.faqs),
    ],
  })),
];

const normalise = (path: string) => (path.replace(/\/+$/, '') || '/');

export const getPageMeta = (path: string) => pages.find((p) => p.path === normalise(path)) ?? pages[0];
