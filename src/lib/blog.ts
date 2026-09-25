import { getCollection } from 'astro:content';

/**
 * Published posts, newest first. Drafts (`draft: true`) are included while
 * running `astro dev` so they can be previewed, but excluded from builds.
 */
export async function getPublishedPosts() {
  const posts = await getCollection(
    'blog',
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
}

export function formatDate(date: Date) {
  // Frontmatter dates parse as UTC midnight; format in UTC so the
  // calendar day never shifts with the build machine's timezone.
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'long',
    timeZone: 'UTC',
  }).format(date);
}

/** URL-safe slug for a tag, e.g. "ASP.NET Core" -> "asp-net-core". */
export function tagSlug(tag: string) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Every tag in use across published posts, with how many posts use it. */
export async function getAllTags() {
  const posts = await getPublishedPosts();
  const counts = new Map<string, { tag: string; count: number }>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = tagSlug(tag);
      const existing = counts.get(slug);
      counts.set(slug, { tag, count: (existing?.count ?? 0) + 1 });
    }
  }
  return [...counts.entries()]
    .map(([slug, { tag, count }]) => ({ slug, tag, count }))
    .sort((a, b) => a.tag.localeCompare(b.tag));
}

/** Published posts tagged with the given tag slug, newest first. */
export async function getPostsByTagSlug(slug: string) {
  const posts = await getPublishedPosts();
  return posts.filter((post) =>
    post.data.tags.some((t) => tagSlug(t) === slug),
  );
}
