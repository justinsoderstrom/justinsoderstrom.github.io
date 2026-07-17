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
