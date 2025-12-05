import { createClient, type QueryParams } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
export const apiVersion = "2024-01-01";

// Default revalidation time in seconds (1 hour)
// This is the fallback when on-demand revalidation doesn't trigger
export const defaultRevalidate = 3600;

/**
 * Public client - uses CDN for fast reads of published content
 * No token needed - can only read published documents
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

/**
 * Server-side client with read token - bypasses CDN for fresh data
 * Used for: preview mode, fetching drafts, real-time updates
 * Requires: SANITY_API_READ_TOKEN
 */
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
});

/**
 * Write client - for mutations (create/update/delete)
 * Used for: form submissions, user-generated content
 * Requires: SANITY_API_WRITE_TOKEN
 * IMPORTANT: Only use server-side (API routes, Server Actions)
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_WRITE_TOKEN,
});

/**
 * Get appropriate client based on preview mode
 */
export function getClient(preview = false) {
  return preview ? previewClient : client;
}

/**
 * Fetch data from Sanity with automatic cache tagging
 *
 * Uses Next.js fetch caching with revalidation tags for on-demand invalidation.
 * Tags can be invalidated via the /api/revalidate webhook endpoint.
 *
 * @param query - GROQ query string
 * @param params - Query parameters
 * @param tags - Cache tags for granular invalidation
 * @param revalidate - Optional custom revalidation time in seconds
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = defaultRevalidate,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number | false;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: {
      revalidate,
      tags,
    },
  });
}

/**
 * Fetch without caching - for draft/preview mode or real-time data
 */
export async function sanityFetchNoCache<T>({
  query,
  params = {},
}: {
  query: string;
  params?: QueryParams;
}): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: 0 },
  });
}
