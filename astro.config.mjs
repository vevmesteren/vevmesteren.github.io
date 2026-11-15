// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import pagefind from 'astro-pagefind';
import mermaid from 'astro-mermaid';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	site: 'https://vevmesteren.com',
	base: '/',
	trailingSlash: 'always',
	integrations: [mdx(), sitemap(), pagefind(), mermaid()],
	markdown: { shikiConfig: { themes: { light: 'github-light', dark: 'github-dark' } } },
	vite: { plugins: [tailwindcss()] },
});
