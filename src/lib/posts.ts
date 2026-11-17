import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;
export type RadarPost = CollectionEntry<'radar'>;

export type Item =
	| { type: 'essay' | 'workshop'; entry: BlogPost; slug: string; url: string; date: Date }
	| { type: 'radar'; entry: RadarPost; slug: string; url: string; date: Date };

// Back-compat: blog posts only, sorted newest first.
const freshness = (p: BlogPost | RadarPost) => (p.data.updated ?? p.data.date).valueOf();
export async function getPosts(): Promise<BlogPost[]> {
	const all = await getCollection('blog', ({ data }) => import.meta.env.DEV || !data.draft);
	return all.sort((a, b) => freshness(b) - freshness(a) || b.id.localeCompare(a.id));
}

export function kindOf(post: BlogPost): 'essay' | 'workshop' {
	if (post.data.kind) return post.data.kind;
	const t = post.data.tags || [];
	return t.includes('remarkable') || t.includes('python') ? 'workshop' : 'essay';
}

export async function getEssays(): Promise<BlogPost[]> {
	return (await getPosts()).filter((p) => kindOf(p) === 'essay');
}

export async function getWorkshop(): Promise<BlogPost[]> {
	return (await getPosts()).filter((p) => kindOf(p) === 'workshop');
}

export async function getRadar(): Promise<RadarPost[]> {
	const all = await getCollection('radar', ({ data }) => import.meta.env.DEV || !data.draft);
	return all.sort((a, b) => freshness(b) - freshness(a) || b.id.localeCompare(a.id));
}

// Everything published, blog + radar, newest first, as a uniform list.
export async function getAllItems(): Promise<Item[]> {
	const blog = await getPosts();
	const radar = await getRadar();
	const items: Item[] = [
		...blog.map((entry) => ({
			type: kindOf(entry),
			entry,
			slug: entry.id,
			url: `/blog/${entry.id}/`,
			date: entry.data.date,
		})),
		...radar.map((entry) => ({
			type: 'radar' as const,
			entry,
			slug: entry.id,
			url: `/radar/${entry.id}/`,
			date: entry.data.date,
		})),
	];
	return items.sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

export function readingTime(body: string | undefined): number {
	const words = (body || '').replace(/[`*_#>\[\]()!-]/g, ' ').split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 220));
}

export function tagSlug(tag: string): string {
	return tag.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '');
}

// DD.MM.YYYY (full), per design.
export function formatDate(d: Date): string {
	const dd = String(d.getDate()).padStart(2, '0');
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const yy = d.getFullYear();
	return `${dd}.${mm}.${yy}`;
}

// DD.MM (short, for lists).
export function formatDateShort(d: Date): string {
	const dd = String(d.getDate()).padStart(2, '0');
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	return `${dd}.${mm}`;
}
