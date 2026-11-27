import source from "./posts/product-led-growth-mobile-apps.md?raw";
import { parsePost, type Post } from "./parse";

const posts = [parsePost(source)].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export function allPosts(): Post[] {
  return posts;
}

export function postBySlug(slug: string | undefined): Post | undefined {
  return posts.find((post) => post.slug === slug);
}
