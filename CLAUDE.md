## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

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

1. Create the folder and `index.md`, preview with the dev server (drafts show with a badge).
2. Remove `draft: true` when it's ready.
3. Commit and push — the site rebuilds and deploys automatically.
4. Share on LinkedIn by pasting the post URL — the Open Graph tags render the preview card. If the card looks stale, refresh it with the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/).

Code blocks support file-name frames and line highlighting:

````markdown
```csharp title="Program.cs" {3-4}
var builder = WebApplication.CreateBuilder(args);
```
````

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
