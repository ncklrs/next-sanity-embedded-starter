/**
 * Subscriber Queries
 *
 * Queries for newsletter subscribers and email management.
 */

/**
 * Check if subscriber exists by email
 * Used to prevent duplicate subscriptions
 */
export const subscriberExistsQuery = `*[_type == "subscriber" && email == $email][0]{
  _id,
  email,
  status,
  subscribedAt
}`;

/**
 * Count total subscribers
 */
export const subscriberCountQuery = `count(*[_type == "subscriber" && status == "active"])`;

/**
 * Fetch all active subscribers
 * For export or email campaign integration
 */
export const activeSubscribersQuery = `*[_type == "subscriber" && status == "active"] | order(subscribedAt desc) {
  _id,
  email,
  source,
  subscribedAt
}`;

/**
 * Fetch recent subscribers
 * @param limit - Number of subscribers to fetch
 */
export const recentSubscribersQuery = `*[_type == "subscriber"] | order(subscribedAt desc) [0...$limit] {
  _id,
  email,
  source,
  status,
  subscribedAt
}`;
