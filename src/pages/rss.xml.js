import rss from '@astrojs/rss';
import { getPublishedPosts } from '../lib/blog';

export async function GET(context) {
  const posts = await getPublishedPosts();
  return rss({
    title: 'Justin Soderstrom — Blog',
    description:
      'Writing on .NET, Azure, and software development by Justin Soderstrom.',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
  });
}
