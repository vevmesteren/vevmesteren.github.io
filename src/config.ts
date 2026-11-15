// Everything the AI features need to know about this site lives here. Change it, not the components.
export const site = {
	name: '<vevmesteren/>',
	// Plain name for <title>, OG tags, RSS — no angle brackets in metadata.
	shortName: 'vevmesteren',
	tagline: 'What does a bank become when AI agents start acting?',
	scene: 'Agentic banking, software craftsmanship, and radar findings.',
	description:
		'German, Norwegian, Canadian, in that order. Father of four. Montrealer since 2001. Technology leader at the intersection of AI strategy, agentic products, and banking architecture.',
	url: 'https://vevmesteren.com',
	repo: 'https://github.com/vevmesteren/vevmesteren.github.io',
	language: 'en',
	author: {
		name: 'Valentin Backofen',
		bio: 'German, Norwegian, Canadian, in that order. Father of four. Montrealer since 2001. I build at the intersection of AI strategy, agentic products, and banking architecture. Reading about this stuff isn\'t enough — building exposes very quickly what is real, what is promising, and what is still mostly PowerPoint.',
		// How "Ask the author" answers. Written in the first person; the model is told to answer only from the current post.
		persona:
			'You are Valentin Backofen, the author of this blog. You are a German-Canadian technology leader based in Montreal, working at the intersection of AI strategy, agentic products, and banking architecture at National Bank of Canada. Answer in the first person, plainly, in two to four sentences, using only the post provided. If the post does not cover the question, say so and suggest what you would look at instead.',
		links: {
			github: 'https://github.com/vevmesteren',
			linkedin: 'https://www.linkedin.com/in/valentinbackofen/',
		},
	},
	nav: [
		{ href: '/blog/', label: 'Blog' },
		{ href: '/about/', label: 'About' },
	],
	ai: {
		// This key is designed to be public: it ends up in the HTML like an analytics ID and can only spend this account's allowance.
		// Get a free one (1,000,000 tokens, one time, no monthly reset) at https://onetagai.com or:
		//   curl -X POST https://onetagai.com/api/signup -H "Content-Type: application/json" -d '{"email":"you@example.com"}'
		// Put the key in .env as PUBLIC_ONETAG_KEY, or paste it here.
		key: import.meta.env.PUBLIC_ONETAG_KEY || 'YOUR_ONETAG_KEY',
		site: 'https://onetagai.com',
		// Languages offered by "Translate this post". Codes are BCP 47; the label is shown to readers.
		languages: [
			{ code: 'en', label: 'English' },
			{ code: 'de', label: 'Deutsch' },
			{ code: 'fr', label: 'Français' },
			{ code: 'es', label: 'Español' },
			{ code: 'ja', label: '日本語' },
			{ code: 'pt-BR', label: 'Português' },
			{ code: 'zh-Hans', label: '中文' },
		],
	},
	postsPerPage: 10,
} as const;

export const hasKey = !/^YOUR_/.test(site.ai.key) && site.ai.key.length > 0;
