// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://justinsoderstrom.com',
  integrations: [
    expressiveCode({
      themes: ['github-dark', 'github-light'],
      // Follow the site's light/dark toggle (data-theme on <html>) instead of the OS setting
      themeCssSelector: (theme) => `[data-theme='${theme.type}']`,
      useDarkModeMediaQuery: false,
      styleOverrides: {
        borderRadius: '0.5rem',
        codeFontFamily:
          "ui-monospace, 'Cascadia Code', Consolas, 'SF Mono', Menlo, monospace",
        codeFontSize: '0.875rem',
      },
    }),
    sitemap(),
  ],
});
