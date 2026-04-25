import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://swiftsite.es',
  integrations: [tailwind()],
  output: 'static',
  security: {
    checkOrigin: true,
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
