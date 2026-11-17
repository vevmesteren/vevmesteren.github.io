import type { APIContext } from 'astro';
import { site } from '../config';
import { getAllItems } from '../lib/posts';

export async function GET(context: APIContext) {
	const items = await getAllItems();
	const origin = context.site!.origin;
	const parts = [`# ${site.shortName}\n\n${site.description}\n`];
	for (const item of items) {
		const label = item.type === 'radar' ? 'Radar' : item.type === 'workshop' ? 'Workshop' : 'Essay';
		parts.push(`\n---\n\n# [${label}] ${item.entry.data.title}\n\nURL: ${origin}${item.url}\nDate: ${item.date.toISOString().slice(0, 10)}\n\n${item.entry.body || ''}\n`);
	}
	return new Response(parts.join(''), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
