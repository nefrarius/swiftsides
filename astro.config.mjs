import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://swiftsite.es',
  integrations: [tailwind()],
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
