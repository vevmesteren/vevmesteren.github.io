import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../config';
import { getAllItems } from '../lib/posts';

export async function GET(context: APIContext) {
	const items = await getAllItems();
	return rss({
		title: site.shortName,
		description: site.description,
		site: context.site!,
		items: items.map((item) => ({
			title: item.entry.data.title,
			description: item.entry.data.description,
			pubDate: item.date,
			link: item.url,
			categories: [item.type, ...item.entry.data.tags],
		})),
	});
}
