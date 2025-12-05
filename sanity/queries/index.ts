/**
 * Sanity GROQ Queries
 *
 * Centralized query exports organized by category.
 * All queries use explicit field projections to avoid over-querying.
 *
 * Usage:
 *   import { pageBySlugQuery, siteSettingsQuery } from '@/sanity/queries';
 *   // or import specific category
 *   import { allPostsQuery, postBySlugQuery } from '@/sanity/queries/posts';
 */

// Page queries
export {
  pageBySlugQuery,
  homepageQuery,
  allPageSlugsQuery,
  pageMetadataQuery,
  pagesBySlugArrayQuery,
  allPagesForSitemapQuery,
} from "./pages";

// Blog post queries
export {
  allPostsQuery,
  paginatedPostsQuery,
  postBySlugQuery,
  allPostSlugsQuery,
  postMetadataQuery,
  recentPostsQuery,
  postsByCategoryQuery,
  allPostsForSitemapQuery,
  postCountQuery,
  searchPostsQuery,
} from "./posts";

// Form queries
export {
  formConfigWithActionsQuery,
  formConfigByIdQuery,
  formConfigByIdentifierQuery,
  allFormIdentifiersQuery,
  allFormsSummaryQuery,
  formExistsByIdentifierQuery,
} from "./forms";

// Site settings queries
export {
  siteSettingsQuery,
  headerNavigationQuery,
  footerNavigationQuery,
  homepageReferenceQuery,
  siteMetadataQuery,
  socialLinksQuery,
} from "./settings";

// Subscriber queries
export {
  subscriberExistsQuery,
  subscriberCountQuery,
  activeSubscribersQuery,
  recentSubscribersQuery,
} from "./subscribers";

// Module projections (for custom queries)
export { moduleProjection, moduleProjections, sharedFields } from "./modules";
