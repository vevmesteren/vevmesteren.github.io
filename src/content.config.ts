import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';
import * as yaml from 'js-yaml';

const aiFlags = z
	.object({
		tldr: z.boolean().default(true),
		askAuthor: z.boolean().default(true),
		translate: z.boolean().default(true),
		quiz: z.boolean().default(false),
		readNext: z.boolean().default(true),
	})
	.default({ tldr: true, askAuthor: true, translate: true, quiz: false, readNext: true });

const blog = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().max(200),
			date: z.coerce.date(),
			updated: z.coerce.date().optional(),
			tags: z.array(z.string()).default([]),
			cover: image().optional(),
			coverAlt: z.string().optional(),
			draft: z.boolean().default(false),
			kind: z.enum(['essay', 'workshop']).optional(),
			ai: aiFlags,
			takeaways: z.array(z.string()).optional(),
		}),
});

const radar = defineCollection({
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/radar' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string().max(200),
			date: z.coerce.date(),
			updated: z.coerce.date().optional(),
			domain: z.string(),
			tags: z.array(z.string()).default([]),
			hero: image().optional(),
			heroAlt: z.string().optional(),
			sources: z.array(z.string().url()).min(1),
			draft: z.boolean().default(false),
			ai: aiFlags,
			takeaways: z.array(z.string()).optional(),
		}),
});

const builds = defineCollection({
	loader: file('./src/data/builds.yaml', {
		parser: (text) => {
			const items = (yaml.load(text) as any[]) || [];
			return items.map((item, i) => ({
				id: String(i).padStart(3, '0') + '-' + (item.name || `build-${i}`).toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
				order: i,
				...item,
			}));
		},
	}),
	schema: z.object({
		name: z.string(),
		url: z.string().url().optional(),
		summary: z.string(),
		stack: z.string(),
		stars: z.number().optional(),
		status: z.enum(['open-source', 'private']),
		statusLabel: z.string().optional(),
		post: z.string().optional(),
		mono: z.boolean().default(true),
		order: z.number(),
	}),
});

export const collections = { blog, radar, builds };
