/**
 * Blog Post Queries
 *
 * Queries for fetching blog posts and related content.
 * Already well-structured with explicit field selection.
 */

// SEO object projection - used across post queries
const seoProjection = `seo{
  title,
  description,
  ogImage{
    asset,
    alt
  },
  noIndex
}`;

/**
 * Fetch all posts for listing page
 * Ordered by publish date, includes fields needed for cards
 */
export const allPostsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage{
    asset,
    alt,
    hotspot,
    crop
  },
  publishedAt
}`;

/**
 * Fetch paginated posts
 * @param start - Starting index (0-based)
 * @param end - Ending index
 */
export const paginatedPostsQuery = `*[_type == "post"] | order(publishedAt desc) [$start...$end] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage{
    asset,
    alt,
    hotspot,
    crop
  },
  publishedAt
}`;

/**
 * Fetch a single post by slug
 * Includes all content for full post page
 */
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  featuredImage{
    asset,
    alt,
    hotspot,
    crop
  },
  content,
  publishedAt,
  author->{
    _id,
    name,
    image{
      asset,
      alt
    },
    bio
  },
  categories[]->{
    _id,
    title,
    slug
  },
  ${seoProjection}
}`;

/**
 * Fetch all post slugs for static generation
 * Minimal query - only returns slug strings
 */
export const allPostSlugsQuery = `*[_type == "post" && defined(slug.current)][].slug.current`;

/**
 * Fetch post metadata only (for SEO/head)
 * Excludes content for faster loading
 */
export const postMetadataQuery = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  excerpt,
  featuredImage{
    asset,
    alt
  },
  publishedAt,
  ${seoProjection}
}`;

/**
 * Fetch recent posts for sidebar or related posts
 * @param limit - Number of posts to fetch (default 5)
 * @param excludeId - Post ID to exclude (current post)
 */
export const recentPostsQuery = `*[_type == "post" && _id != $excludeId] | order(publishedAt desc) [0...$limit] {
  _id,
  title,
  slug,
  excerpt,
  featuredImage{
    asset,
    alt,
    hotspot,
    crop
  },
  publishedAt
}`;

/**
 * Fetch posts by category
 */
export const postsByCategoryQuery = `*[_type == "post" && references($categoryId)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage{
    asset,
    alt,
    hotspot,
    crop
  },
  publishedAt
}`;

/**
 * Fetch all posts for sitemap
 */
export const allPostsForSitemapQuery = `*[_type == "post" && defined(slug.current)]{
  slug,
  publishedAt,
  _updatedAt
}`;

/**
 * Count total posts (for pagination)
 */
export const postCountQuery = `count(*[_type == "post"])`;

/**
 * Search posts by title or excerpt
 */
export const searchPostsQuery = `*[_type == "post" && (title match $searchTerm || excerpt match $searchTerm)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage{
    asset,
    alt,
    hotspot,
    crop
  },
  publishedAt
}`;
