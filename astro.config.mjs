// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://made-to-flourish-demo.vercel.app',
  build: { inlineStylesheets: 'always' },
  // Load the next page while the pointer is on a link, so page changes are near-instant (the header stays put).
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
});
