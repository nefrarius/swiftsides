import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://swiftsite.es',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => !page.includes('/api/'),
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date('2025-01-01'),
    }),
  ],
  output: 'hybrid',
  adapter: node({
    mode: 'standalone',
  }),
  security: {
    checkOrigin: true,
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
