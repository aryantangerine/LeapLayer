// Runs after `vite build` and `vite build --ssr`. Renders every route to static HTML with its own
// head tags and structured data, then writes sitemap.xml, robots.txt, llms.txt and llms-full.txt.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.cwd();
const dist = path.join(root, 'dist');
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const server = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href);
const { render, pages, SITE_URL, OG_IMAGE, absolute, products, productPath, pricingPlans } = server;

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// JSON-LD lives inside <script>; escaping "<" stops any "</script>" sequence from closing it early.
const jsonLd = (g) => `<script type="application/ld+json">${JSON.stringify(g).replace(/</g, '\\u003c')}</script>`;

const headFor = (meta) => {
  const url = absolute(meta.path);
  const image = `${SITE_URL}${OG_IMAGE}`;
  return [
    `<title>${escapeAttr(meta.title)}</title>`,
    `<meta name="description" content="${escapeAttr(meta.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta name="robots" content="index, follow, max-image-preview:large" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="en_GB" />`,
    `<meta property="og:site_name" content="LeapLayer" />`,
    `<meta property="og:title" content="${escapeAttr(meta.title)}" />`,
    `<meta property="og:description" content="${escapeAttr(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    ...meta.schema.map(jsonLd),
  ].join('\n    ');
};

const seoBlock = /<!--seo-start[\s\S]*?<!--seo-end-->/;
if (!seoBlock.test(template) || !template.includes('<div id="root"></div>')) {
  throw new Error('prerender: index.html is missing the seo markers or the empty #root');
}

const outFile = (routePath) => (routePath === '/' ? path.join(dist, 'index.html') : path.join(dist, `${routePath.slice(1)}.html`));

for (const meta of pages) {
  const appHtml = render(meta.path);
  const html = template
    .replace(seoBlock, headFor(meta))
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
  const file = outFile(meta.path);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, html);
  console.log(`prerendered ${meta.path} -> ${path.relative(root, file)}`);
}

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const priority = (p) => (p === '/' ? '1.0' : p.startsWith('/products/') ? '0.9' : '0.7');
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${absolute(p.path)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${priority(p.path)}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

// robots.txt: everything is public; AI crawlers are named explicitly so the intent is clear.
const robots = `User-agent: *
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

// llms.txt (https://llmstxt.org): a short map of the site for AI agents, plus a full-text companion.
const pricingLine = pricingPlans
  .map((plan) => `${plan.name} £${plan.price} per month (${[plan.inheritsLabel ? `everything in ${plan.inheritsLabel}` : null, ...plan.features].filter(Boolean).join(', ')})`)
  .join('; ');

const llms = `# LeapLayer

> LeapLayer builds done-for-you systems that help UK local businesses get more Google reviews, more enquiries and more customers: Google review automation, smart websites with lead capture, missed call text back, local SEO, a 24/7 AI receptionist and lead tracking.

LeapLayer Ltd is a UK company founded by Aryan Parekh, an engineer at Jaguar Land Rover. Packages have no setup fees and no contracts, can be cancelled at any time, and come with a 30 day money back guarantee. New clients start with a free 15-minute AI audit.

## Products

${products.map((p) => `- [${p.name}](${absolute(productPath(p.slug))}): ${p.metaDescription}`).join('\n')}

## Pricing

- [Pricing](${absolute('/pricing')}): ${pricingLine}.

## Company

- [About LeapLayer](${absolute('/about')}): About the founder, Aryan Parekh.
- [Book a free 15-minute AI audit](${absolute('/book')}): See where reviews, a smart website and automation could bring a business more customers.

## Optional

- [Full text of every page](${SITE_URL}/llms-full.txt)
`;
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

const productText = (p) => `## ${p.name}

URL: ${absolute(productPath(p.slug))}

# ${p.h1}

${p.lead}

${p.intro.join('\n\n')}

### How it works

${p.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.text}`).join('\n')}

### What's included

${p.included.map((i) => `- ${i}`).join('\n')}

### Who it's for

${p.whoFor.map((w) => `- ${w}`).join('\n')}

### FAQs

${p.faqs.map((f) => `**${f.q}**\n${f.a}`).join('\n\n')}
${p.standalonePrice ? `\nPrice: £${p.standalonePrice} per month on its own${p.pricing ? `, or included in the ${p.pricing.tier} at £${p.pricing.price} per month` : ''}.\n` : p.pricing ? `\nPrice: included in the ${p.pricing.tier}, £${p.pricing.price} per month.\n` : ''}`;

const llmsFull = `# LeapLayer: full site content

> ${llms.split('\n').find((l) => l.startsWith('> ')).slice(2)}

${products.map(productText).join('\n---\n\n')}
---

## Pricing

URL: ${absolute('/pricing')}

No setup fees. No contracts. Cancel anytime. 30 day money back guarantee.

${pricingPlans.map((plan) => `### ${plan.name}: £${plan.price} per month${plan.wasPrice ? ` (setup normally £${plan.wasPrice.toLocaleString('en-GB')}, now £0)` : ''}

${[plan.intro, plan.inheritsLabel ? `Everything in ${plan.inheritsLabel}.` : null].filter(Boolean).join(' ')}
${plan.features.map((f) => `- ${f}`).join('\n')}`).join('\n\n')}
`;
fs.writeFileSync(path.join(dist, 'llms-full.txt'), llmsFull);

console.log(`wrote sitemap.xml (${pages.length} urls), robots.txt, llms.txt, llms-full.txt`);
