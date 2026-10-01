// Build-time entry used by scripts/prerender.mjs to render each route to static HTML.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';

export { pages, SITE_URL, OG_IMAGE, absolute } from './seo';
export { products, productPath, pricingPlans } from './products';

export function render(path: string) {
  return renderToString(
    <StrictMode>
      <App initialPath={path} />
    </StrictMode>,
  );
}
