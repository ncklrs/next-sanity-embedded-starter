/**
 * Engagement Queries
 *
 * Queries for fetching engagement documents with page targeting.
 * Supports priority ordering and schedule-based filtering.
 */

// Image projection for modal/popup images
const imageProjection = `{
  asset,
  alt,
  hotspot,
  crop
}`;

/**
 * Base filter for active engagements
 * Checks: enabled, schedule start/end dates
 */
const activeEngagementFilter = `
  _type == "engagement" &&
  enabled == true &&
  (
    !defined(schedule.startDate) ||
    dateTime(schedule.startDate) <= dateTime(now())
  ) &&
  (
    !defined(schedule.endDate) ||
    dateTime(schedule.endDate) >= dateTime(now())
  )
`;

/**
 * Projection for engagement fields based on type
 * Uses GROQ's select() to flatten type-specific fields
 */
const engagementProjection = `{
  _id,
  name,
  engagementType,
  priority,

  // Flatten type-specific fields based on engagementType
  ...select(
    engagementType == "announcementBar" => {
      "message": announcementMessage,
      "link": announcementLink,
      "dismissible": announcementDismissible,
      "variant": announcementVariant,
      "backgroundColor": announcementBackgroundColor
    },
    engagementType == "stickyCta" => {
      "text": stickyText,
      "url": stickyUrl,
      "icon": stickyIcon,
      "position": stickyPosition,
      "showAfterScroll": stickyShowAfterScroll,
      "variant": stickyVariant,
      "dismissible": stickyDismissible
    },
    engagementType == "exitIntentModal" => {
      "title": exitTitle,
      "message": exitMessage,
      "image": exitImage${imageProjection},
      "cta": exitCta,
      "showOnce": exitShowOnce,
      "variant": exitVariant
    },
    engagementType == "newsletterPopup" => {
      "title": newsletterTitle,
      "message": newsletterMessage,
      "image": newsletterImage${imageProjection},
      "placeholder": newsletterPlaceholder,
      "buttonText": newsletterButtonText,
      "successMessage": newsletterSuccessMessage,
      "trigger": newsletterTrigger,
      "triggerValue": newsletterTriggerValue,
      "showOnce": newsletterShowOnce
    }
  )
}`;

/**
 * Fetch all active engagements (no page filtering)
 * Ordered by priority (highest first)
 */
export const allActiveEngagementsQuery = `*[${activeEngagementFilter}] | order(priority desc) ${engagementProjection}`;

/**
 * Fetch engagements for a specific page by slug
 * Handles include/exclude/all targeting modes
 *
 * @param $pageSlug - The page slug to filter by
 */
export const engagementsForPageQuery = `*[
  ${activeEngagementFilter} &&
  (
    // All pages mode
    targetingMode == "all" ||
    // Include mode - page slug must be in includePages
    (targetingMode == "include" && $pageSlug in includePages[]->slug.current) ||
    // Exclude mode - page slug must NOT be in excludePages
    (targetingMode == "exclude" && !($pageSlug in excludePages[]->slug.current))
  )
] | order(priority desc) ${engagementProjection}`;

/**
 * Fetch engagements for homepage
 * Homepage has no slug, so we need special handling:
 * - "all" mode: include
 * - "include" mode: check if homepage reference exists in includePages
 * - "exclude" mode: check homepage not in excludePages
 *
 * @param $homepageId - The homepage document ID (optional)
 */
export const engagementsForHomepageQuery = `*[
  ${activeEngagementFilter} &&
  (
    // All pages mode
    targetingMode == "all" ||
    // Include mode - homepage must be in includePages (by ID)
    (targetingMode == "include" && defined($homepageId) && $homepageId in includePages[]._ref) ||
    // Exclude mode - homepage must NOT be in excludePages (by ID)
    (targetingMode == "exclude" && (!defined($homepageId) || !($homepageId in excludePages[]._ref)))
  )
] | order(priority desc) ${engagementProjection}`;

/**
 * Fetch engagements for blog pages (listing and posts)
 * Handles blog-specific targeting:
 * - "include": Always show on blog
 * - "exclude": Never show on blog
 * - "default" or undefined: Show if targetingMode is "all"
 */
export const engagementsForBlogQuery = `*[
  ${activeEngagementFilter} &&
  (
    // Explicit blog include
    blogTargeting == "include" ||
    // Default behavior: show on blog if targeting all pages (and not explicitly excluded)
    (
      (!defined(blogTargeting) || blogTargeting == "default") &&
      targetingMode == "all"
    )
  ) &&
  // Never show if explicitly excluded
  blogTargeting != "exclude"
] | order(priority desc) ${engagementProjection}`;

/**
 * Fetch a single engagement by ID
 * Useful for preview/editing
 */
export const engagementByIdQuery = `*[_type == "engagement" && _id == $id][0] ${engagementProjection}`;
