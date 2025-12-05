/**
 * Page Queries
 *
 * Queries for fetching page documents with their modules.
 * Uses explicit module projections to avoid over-querying.
 */

import { moduleProjection } from "./modules";

// SEO object projection - used across page queries
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
 * Fetch a single page by slug with all modules
 * @param slug - The page slug (e.g., "about", "contact")
 */
export const pageBySlugQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  _type,
  title,
  slug,
  modules[]${moduleProjection},
  ${seoProjection}
}`;

/**
 * Fetch the homepage via site settings reference
 * Returns the full page document with modules
 */
export const homepageQuery = `*[_type == "siteSettings"][0]{
  homepage->{
    _id,
    _type,
    title,
    slug,
    modules[]${moduleProjection},
    ${seoProjection}
  }
}.homepage`;

/**
 * Fetch all page slugs for static generation
 * Minimal query - only returns slug strings
 */
export const allPageSlugsQuery = `*[_type == "page" && defined(slug.current)][].slug.current`;

/**
 * Fetch page metadata only (for SEO/head)
 * Excludes modules for faster loading when only meta is needed
 */
export const pageMetadataQuery = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  ${seoProjection}
}`;

/**
 * Fetch multiple pages by slugs
 * Useful for navigation or sitemap generation
 */
export const pagesBySlugArrayQuery = `*[_type == "page" && slug.current in $slugs]{
  _id,
  title,
  slug,
  ${seoProjection}
}`;

/**
 * Fetch all pages for sitemap
 * Returns only fields needed for sitemap.xml
 */
export const allPagesForSitemapQuery = `*[_type == "page" && defined(slug.current)]{
  slug,
  _updatedAt
}`;
