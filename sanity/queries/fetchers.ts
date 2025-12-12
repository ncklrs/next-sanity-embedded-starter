/**
 * Sanity Query Fetcher Functions
 *
 * These functions wrap sanityFetch with predefined queries and cache tags.
 * Use these in pages/components instead of calling sanityFetch directly.
 *
 * Benefits:
 * - Single source of truth for query + tags + params
 * - Type safety with explicit return types
 * - Consistent caching behavior
 * - Reduced boilerplate in pages
 */

import { sanityFetch, client } from "../lib/client";
import {
  homepageQuery,
  pageBySlugQuery,
  allPageSlugsQuery,
  pageMetadataQuery,
} from "./pages";
import {
  siteSettingsQuery,
} from "./settings";
import {
  allPostsQuery,
  postBySlugQuery,
  allPostSlugsQuery,
} from "./posts";
import {
  engagementsForPageQuery,
  engagementsForHomepageQuery,
} from "./engagement";
import { homepageReferenceQuery } from "./settings";

// =============================================================================
// Type Definitions
// =============================================================================

// Common types (can be expanded as needed)
export interface SeoData {
  title?: string;
  description?: string;
  ogImage?: {
    asset: any;
    alt?: string;
  };
  noIndex?: boolean;
}

export interface PageData {
  _id: string;
  _type: string;
  title: string;
  slug: { current: string };
  modules?: any[];
  seo?: SeoData;
}

export interface PostData {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: {
    asset: any;
    alt?: string;
    hotspot?: any;
    crop?: any;
  };
  content?: any[];
  publishedAt?: string;
  author?: {
    _id: string;
    name: string;
    image?: any;
    bio?: any;
  };
  categories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
  seo?: SeoData;
}

export interface PostListItem {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  featuredImage?: {
    asset: any;
    alt?: string;
    hotspot?: any;
    crop?: any;
  };
  publishedAt?: string;
}

export interface SiteSettings {
  title?: string;
  description?: string;
  headerNavigation?: {
    logo?: {
      asset: any;
      alt?: string;
    };
    navLinks?: any[];
    ctaButtons?: any[];
    showCta?: boolean;
  };
  footerNavigation?: {
    description?: string;
    linkColumns?: any[];
    socialLinks?: any[];
    bottomLinks?: any[];
    copyrightText?: string;
  };
}

export interface EngagementData {
  _id: string;
  name: string;
  engagementType: 'announcementBar' | 'stickyCta' | 'exitIntentModal' | 'newsletterPopup';
  priority: number;
  // Type-specific fields (flattened by GROQ select)
  // AnnouncementBar
  message?: string;
  link?: { text?: string; url?: string };
  dismissible?: boolean;
  variant?: string;
  backgroundColor?: string;
  // StickyCta
  text?: string;
  url?: string;
  icon?: string;
  position?: string;
  showAfterScroll?: number;
  // ExitIntentModal & NewsletterPopup
  title?: string;
  image?: { asset: any; alt?: string; hotspot?: any; crop?: any };
  cta?: { text?: string; url?: string; variant?: string };
  showOnce?: boolean;
  // NewsletterPopup specific
  placeholder?: string;
  buttonText?: string;
  successMessage?: string;
  trigger?: string;
  triggerValue?: number;
}

// =============================================================================
// Page Fetchers
// =============================================================================

/**
 * Fetch the homepage (via site settings reference)
 */
export async function getHomepage(): Promise<PageData | null> {
  return sanityFetch<PageData | null>({
    query: homepageQuery,
    tags: ["pages", "site-settings"],
  });
}

/**
 * Fetch a page by its slug
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  return sanityFetch<PageData | null>({
    query: pageBySlugQuery,
    params: { slug },
    tags: ["pages", `slug:${slug}`],
  });
}

/**
 * Fetch page metadata only (for generateMetadata)
 */
export async function getPageMetadata(slug: string): Promise<Pick<PageData, '_id' | 'title' | 'seo'> | null> {
  return sanityFetch<Pick<PageData, '_id' | 'title' | 'seo'> | null>({
    query: pageMetadataQuery,
    params: { slug },
    tags: ["pages", `slug:${slug}`],
  });
}

/**
 * Fetch all page slugs for static generation
 * Uses client.fetch directly (no caching needed for build-time)
 */
export async function getAllPageSlugs(): Promise<string[]> {
  return client.fetch<string[]>(allPageSlugsQuery);
}

// =============================================================================
// Site Settings Fetchers
// =============================================================================

/**
 * Fetch complete site settings
 */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  return sanityFetch<SiteSettings | null>({
    query: siteSettingsQuery,
    tags: ["site-settings"],
  });
}

// =============================================================================
// Blog Post Fetchers
// =============================================================================

/**
 * Fetch all posts for listing page
 */
export async function getAllPosts(): Promise<PostListItem[]> {
  return sanityFetch<PostListItem[]>({
    query: allPostsQuery,
    tags: ["posts"],
  });
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<PostData | null> {
  return sanityFetch<PostData | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: ["posts", `slug:${slug}`],
  });
}

/**
 * Fetch all post slugs for static generation
 * Uses client.fetch directly (no caching needed for build-time)
 */
export async function getAllPostSlugs(): Promise<string[]> {
  return client.fetch<string[]>(allPostSlugsQuery);
}

// =============================================================================
// Combined Fetchers (for pages needing multiple resources)
// =============================================================================

/**
 * Fetch homepage data and site settings in parallel
 * Returns undefined instead of null to match component prop types
 */
export async function getHomepageWithSettings(): Promise<{
  page: PageData | undefined;
  settings: SiteSettings | undefined;
}> {
  const [page, settings] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
  ]);
  return { page: page ?? undefined, settings: settings ?? undefined };
}

/**
 * Fetch page data and site settings in parallel
 * Returns undefined instead of null to match component prop types
 */
export async function getPageWithSettings(slug: string): Promise<{
  page: PageData | undefined;
  settings: SiteSettings | undefined;
}> {
  const [page, settings] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
  ]);
  return { page: page ?? undefined, settings: settings ?? undefined };
}

// =============================================================================
// Engagement Fetchers
// =============================================================================

/**
 * Fetch engagements for a specific page by slug
 */
export async function getEngagementsForPage(pageSlug: string): Promise<EngagementData[]> {
  return sanityFetch<EngagementData[]>({
    query: engagementsForPageQuery,
    params: { pageSlug },
    tags: ["engagement", `page-engagement:${pageSlug}`],
  });
}

/**
 * Fetch engagements for homepage
 * First gets the homepage ID, then fetches engagements targeting it
 */
export async function getEngagementsForHomepage(): Promise<EngagementData[]> {
  // Get homepage ID for include/exclude targeting
  const homepageRef = await sanityFetch<{ homepageId?: string } | null>({
    query: homepageReferenceQuery,
    tags: ["site-settings"],
  });

  return sanityFetch<EngagementData[]>({
    query: engagementsForHomepageQuery,
    params: { homepageId: homepageRef?.homepageId || null },
    tags: ["engagement", "homepage-engagement"],
  });
}

// =============================================================================
// Combined Fetchers with Engagement
// =============================================================================

/**
 * Fetch homepage data, site settings, and engagements in parallel
 */
export async function getHomepageWithSettingsAndEngagement(): Promise<{
  page: PageData | undefined;
  settings: SiteSettings | undefined;
  engagements: EngagementData[];
}> {
  const [page, settings, engagements] = await Promise.all([
    getHomepage(),
    getSiteSettings(),
    getEngagementsForHomepage(),
  ]);
  return {
    page: page ?? undefined,
    settings: settings ?? undefined,
    engagements: engagements ?? [],
  };
}

/**
 * Fetch page data, site settings, and engagements in parallel
 */
export async function getPageWithSettingsAndEngagement(slug: string): Promise<{
  page: PageData | undefined;
  settings: SiteSettings | undefined;
  engagements: EngagementData[];
}> {
  const [page, settings, engagements] = await Promise.all([
    getPageBySlug(slug),
    getSiteSettings(),
    getEngagementsForPage(slug),
  ]);
  return {
    page: page ?? undefined,
    settings: settings ?? undefined,
    engagements: engagements ?? [],
  };
}
