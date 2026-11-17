import type { APIContext } from 'astro';
import { site } from '../config';
import { getAllItems } from '../lib/posts';

export async function GET(context: APIContext) {
	const items = await getAllItems();
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');
	const origin = context.site!.origin;
	const label = (t: string) => t === 'radar' ? 'Radar' : t === 'workshop' ? 'Workshop' : 'Essay';
	const lines = [
		`# ${site.shortName}`,
		'',
		`> ${site.description}`,
		'',
		`Author: ${site.author.name}. ${site.author.bio}`,
		'',
		'## Posts',
		'',
		...items.map((item) => `- [${item.entry.data.title}](${origin}${item.url}): [${label(item.type)}] ${item.entry.data.description}${item.entry.data.tags.length ? ` (${item.entry.data.tags.join(', ')})` : ''}`),
		'',
		'## Full text',
		'',
		`- [llms-full.txt](${origin}${base}/llms-full.txt): every post in one file`,
	];
	return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
