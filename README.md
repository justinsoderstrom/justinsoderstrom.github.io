# justinsoderstrom.com

Personal website built with [Astro](https://astro.build), deployed to GitHub Pages by GitHub Actions on every push to `main`. Live at <https://justinsoderstrom.com>.

## Commands

| Command           | Action                                             |
| :---------------- | :------------------------------------------------- |
| `npm install`     | Install dependencies                               |
| `npm run dev`     | Dev server at `localhost:4321` (drafts visible)    |
| `npm run build`   | Production build to `./dist/` (drafts excluded)    |
| `npm run preview` | Serve the production build locally                 |
| `npm run check`   | Type-check the project                             |

## Writing a blog post

Each post is a **folder** under `src/content/blog/` — markdown plus its images:

```text
src/content/blog/
  my-first-post/          ← folder name becomes the URL: /blog/my-first-post/
    index.md              ← the post
    diagram.png           ← images live next to the post
```

`index.md` starts with frontmatter:

```markdown
---
title: 'My first post'
description: 'One or two sentences — used for SEO and the LinkedIn preview card.'
pubDate: 2026-08-01
heroImage: ./cover.png   # optional; becomes the LinkedIn/OG card image
draft: true              # optional; keeps the post out of the live site
---

Post content. Reference images relatively: ![A diagram](./diagram.png)
```

Workflow:

1. Create the folder and `index.md`, preview with `npm run dev` (drafts show with a badge).
2. Remove `draft: true` when it's ready.
3. Commit and push (or add the files directly on github.com) — the site rebuilds and deploys automatically.
4. Share on LinkedIn by pasting the post URL — the Open Graph tags render the preview card. If the card looks stale, refresh it with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

Code blocks support file-name frames and line highlighting:

````markdown
```csharp title="Program.cs" {3-4}
var builder = WebApplication.CreateBuilder(args);
```
````

## Placeholder content to replace

- `src/assets/portrait.jpg` — drop a square photo of yourself here (`.jpg`,
  `.png`, or `.webp`) and it appears on the home page as a circular avatar;
  no file means no photo
- `src/pages/index.astro` — bio (marked `EDIT ME`)
- `src/pages/resume.astro` — resume content (marked `EDIT ME`)
- `public/resume.pdf` — replace with your real resume PDF
- `src/pages/projects.astro` — project list
