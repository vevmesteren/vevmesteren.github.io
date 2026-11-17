# AGENTS.md

Astro 7 blog with AI features that run in the reader's browser through OneTag AI (public key, no backend). Read https://onetagai.com/llms.txt for the API.

## Theme: Vevmester (Option C)

Scandinavian editorial. Paper `#F7F7F5`, ink `#111111`, one red accent `#C8102E`. Archivo (variable wdth + wght) for display, Space Mono for metadata and the `<vevmesteren/>` wordmark. Square corners, no shadows, no rounded cards. 2px rules for major divisions, 1px rules for sub-divisions, 1px hairlines between list items. 12-col grid, 24px gutters, 1360px container.

Fonts self-hosted: `@fontsource-variable/archivo/wdth.css`, `@fontsource/space-mono`. No Google Fonts at runtime.

## Content collections (`src/content.config.ts`)

- `blog`: `src/content/blog/*.{md,mdx}`. Fields: `title`, `description`, `date`, `updated?`, `tags`, `cover?`, `coverAlt?`, `draft`, `kind?` (`essay` | `workshop`), `ai`, `takeaways?`.
- `radar`: `src/content/radar/*.md`. Fields: `title`, `description` (≤200), `date`, `updated?`, `domain`, `tags`, `hero?`, `heroAlt?`, `sources` (min 1 URL), `draft`, `ai`, `takeaways?`.
- `builds`: data loaded from `src/data/builds.yaml`. Fields: `name`, `url?`, `summary`, `stack`, `stars?`, `status` (`open-source` | `private`), `statusLabel?`, `post?` (blog slug for write-up link), `mono` (default true).

Helpers in `src/lib/posts.ts`: `getPosts`, `getEssays`, `getWorkshop`, `getRadar`, `getAllItems` (blog + radar merged, newest first), `kindOf`, `formatDate` (DD.MM.YYYY), `formatDateShort` (DD.MM), `readingTime`, `tagSlug`.

## Routes

- `/` — Masthead, Timeline, FeaturedPost, SectionIndex, BuildsTable, ReaderFit.
- `/blog/` — all posts. `/blog/[slug]/` — individual post with PostLayout.
- `/essays/`, `/workshop/` — filtered blog lists by `kind`.
- `/radar/`, `/radar/[slug]/` — radar list + post.
- `/tags/[tag]/` — items (blog + radar) tagged.
- `/about/`, `/404/`, `rss.xml`, `llms.txt`, `llms-full.txt` (radar included in feeds).
- `trailingSlash: 'always'`. Existing blog URLs preserved.

## Components (`src/components/`)

Each AI feature is still one component with a custom element and one `ask()` call from `src/scripts/ai.ts`. The theme restyles their markup; it does not change logic.

- Theme: `Masthead`, `Timeline`, `FeaturedPost`, `SectionIndex`, `BuildsTable`, `PostHeader`, `PostLayout`, `RadarLayout`, `PostList`.
- AI: `AskBlog`, `ReaderFit`, `PostTools` (TL;DR, Translate, Ask the author, Plain English, Share), `ReadNext`, `Quiz`, `CodeExplain`, `ExplainSelection`.

New features copy an existing AI component. Always handle the no-key case with `errorText({ code: 'no_key' })`.

## Styles

Tokens at the top of `src/styles/global.css`, mapped to Tailwind via `@theme` (utilities like `bg-paper`, `text-ink`, `text-accent`, `font-mono`). Keep the stylesheet small. Dark mode is proposed but undesigned — the tokens are present; the toggle is off until the dark palette is reviewed.

## Commands

- `npm run dev` — dev server (shows drafts).
- `npm run build` — build + Pagefind index.
- `npm run check` — Astro type check.
- `npm run ai:meta -- --dry` — fill missing `takeaways` on posts.
- `npm run ai:alt -- --dry` — fill missing image alt text.

## OneTag key

The key is `PUBLIC_ONETAG_KEY` in `.env` (public by design). Without it, `src/scripts/onetag.ts` uses a shared demo key on localhost only; deployed site needs its own. Get one: ask the user for an email, then `curl -X POST https://onetagai.com/api/signup -H "Content-Type: application/json" -d '{"email":"THE_EMAIL"}'`.

Do not add other providers' API keys to the page. Do not add build steps that need secrets beyond `PUBLIC_ONETAG_KEY`.
