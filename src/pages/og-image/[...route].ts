import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';
import { kindOf } from '../../lib/posts';

// Load all published content
const blogEntries = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
const radarEntries = await getCollection('radar', ({ data }) => import.meta.env.DEV || !data.draft);

// Build pages object: key = route slug, value = { title, description, kind }
// Blog posts are keyed as "blog/<id>", radar posts as "radar/<id>"
// Static pages get their own keys
const pages: Record<string, { title: string; description: string; kind: string }> = {};

for (const entry of blogEntries) {
  pages[`blog/${entry.id}`] = {
    title: entry.data.title,
    description: entry.data.description,
    kind: kindOf(entry),
  };
}

for (const entry of radarEntries) {
  pages[`radar/${entry.id}`] = {
    title: entry.data.title,
    description: entry.data.description,
    kind: 'radar',
  };
}

// Static pages
pages['index'] = {
  title: 'vevmesteren',
  description: 'What does a bank become when AI agents start acting?',
  kind: 'home',
};
pages['about'] = {
  title: 'About',
  description: 'German, Norwegian, Canadian, in that order. Father of four. Montrealer since 2001.',
  kind: 'about',
};
pages['radar'] = {
  title: 'Radar',
  description: 'Short, dated, sourced. What moved.',
  kind: 'radar',
};
pages['essays'] = {
  title: 'Essays',
  description: 'Long-form architecture and strategy. Take a coffee.',
  kind: 'essays',
};
pages['workshop'] = {
  title: 'Workshop',
  description: 'Write-ups of the things I build at night.',
  kind: 'workshop',
};
pages['blog'] = {
  title: 'Blog',
  description: 'All posts, essays and workshop write-ups.',
  kind: 'blog',
};

// Tag pages — generate one OG image per tag
const allTags = new Set<string>();
for (const entry of blogEntries) {
  for (const tag of entry.data.tags) allTags.add(tag);
}
for (const entry of radarEntries) {
  for (const tag of entry.data.tags) allTags.add(tag);
}
for (const tag of allTags) {
  const slug = tag.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
  pages[`tags-${slug}`] = {
    title: `#${tag}`,
    description: `Items tagged ${tag}.`,
    kind: 'tag',
  };
}

export const { getStaticPaths, GET } = await OGImageRoute({
  pages,
  param: 'route',
  getImageOptions: (path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[17, 17, 17]],
    padding: 80,
    border: {
      color: [200, 16, 46],
      width: 6,
      side: 'inline-start',
    },
    fonts: [
      './src/fonts/archivo-700.ttf',
      './src/fonts/archivo-400.ttf',
      './src/fonts/space-mono-700.ttf',
      './src/fonts/space-mono-400.ttf',
    ],
    font: {
      title: {
        color: [242, 242, 238],
        size: 64,
        weight: 'bold',
        lineHeight: 1.1,
        families: ['Archivo'],
      },
      description: {
        color: [210, 210, 204],
        size: 32,
        weight: 'normal',
        lineHeight: 1.35,
        families: ['Space Mono'],
      },
    },
  }),
});
