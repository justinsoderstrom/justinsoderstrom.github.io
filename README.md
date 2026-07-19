# justinsoderstrom.com

My personal website and blog, live at <https://justinsoderstrom.com>. This is a personal project, so I'm not taking contributions — but you're welcome to look around, and this README explains how it's put together.

## Tech stack

- **[Astro](https://astro.build)** — static site generator. Every page is rendered to plain HTML at build time; there's no client-side framework and no runtime backend.
- **TypeScript** — for the small amount of build-time logic, type-checked with `astro check`.
- **Custom CSS** — one small stylesheet (`src/styles/global.css`), no Tailwind or CSS framework. It's small enough that the build inlines it, so pages have no render-blocking stylesheet request.
- **[astro-expressive-code](https://expressive-code.com)** — syntax highlighting for code blocks, with paired GitHub light/dark themes that follow the site's theme toggle.
- **[giscus](https://giscus.app)** — blog comments, stored as GitHub Discussions on this repo. No comment database and no ads; commenting uses your GitHub account.
- **[GoatCounter](https://www.goatcounter.com)** — lightweight, privacy-friendly analytics. No cookies and no personal data collected, so no consent banner needed.

Client-side JavaScript is minimal: a few inline lines for the light/dark theme toggle (including a pre-paint snippet that applies the saved theme before first render, so there's no flash of the wrong theme), the GoatCounter script, and — on blog posts with comments enabled — the giscus embed, which lazy-loads as you scroll to it.

## How it works

```text
src/
  pages/          File-based routes: home, blog, projects, resume, contact, 404, RSS
  content/blog/   Blog posts — one folder per post (index.md + its images)
  layouts/        BaseLayout: <head>, theme handling, shared page chrome
  components/     Header, Footer, and an SEO component (canonical URL, Open Graph, Twitter cards)
  lib/            Shared helpers (post filtering/sorting, date formatting)
  styles/         The single global stylesheet
```

Blog posts live in `src/content/blog/` as an Astro **content collection**: each post is a folder containing an `index.md` and any images it uses, and the folder name becomes the URL. Frontmatter (title, description, publish date, hero image, draft and comments flags) is validated against a [Zod](https://zod.dev) schema in `src/content.config.ts`, so a malformed post fails the build instead of shipping broken. Posts marked `draft: true` are visible in the dev server for previewing but excluded from production builds.

Each post gets a comment section by default, rendered by `src/components/Comments.astro`: a giscus embed backed by GitHub Discussions, so comments live alongside the code with no separate service to run. The widget follows the site's theme toggle live, and a post can opt out with `comments: false` in its frontmatter.

The build also generates an RSS feed (`/rss.xml`) and a sitemap, and every page gets canonical and Open Graph tags so links unfurl properly on LinkedIn and elsewhere.

## Deployment

Every push to `main` triggers a GitHub Actions workflow ([.github/workflows/deploy.yml](.github/workflows/deploy.yml)) that builds the site with the official Astro action and publishes the output to **GitHub Pages**. The custom domain and HTTPS are handled by Pages; there are no servers, databases, or hosting costs — the whole site is static files behind GitHub's CDN.

## Running it locally

```sh
npm install
npm run dev       # dev server at localhost:4321 (drafts visible)
npm run build     # production build to ./dist/
npm run preview   # serve the production build
npm run check     # type-check
```

Requires Node 22.12+.
