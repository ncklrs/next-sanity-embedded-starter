import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Sanity document types and their cache tags
const TAG_MAP: Record<string, string[]> = {
  page: ["pages"],
  post: ["posts"],
  siteSettings: ["site-settings", "pages"], // Site settings affect all pages
};

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the webhook payload
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      _id: string;
      slug?: { current: string };
    }>(req, process.env.SANITY_WEBHOOK_SECRET);

    // Verify webhook signature in production
    if (process.env.NODE_ENV === "production" && !isValidSignature) {
      return NextResponse.json(
        { message: "Invalid signature", revalidated: false },
        { status: 401 }
      );
    }

    if (!body?._type) {
      return NextResponse.json(
        { message: "No document type provided", revalidated: false },
        { status: 400 }
      );
    }

    // Get the tags to revalidate based on document type
    const tagsToRevalidate = TAG_MAP[body._type] || [];

    // If it's a specific page/post, also revalidate by slug
    if (body.slug?.current) {
      tagsToRevalidate.push(`slug:${body.slug.current}`);
    }

    // Also add the document ID as a tag for granular invalidation
    if (body._id) {
      tagsToRevalidate.push(`id:${body._id}`);
    }

    // Revalidate all relevant tags
    // Next.js 16 requires a cache profile as second argument
    for (const tag of tagsToRevalidate) {
      revalidateTag(tag, { expire: 0 });
    }

    return NextResponse.json({
      revalidated: true,
      tags: tagsToRevalidate,
      now: Date.now(),
    });
  } catch (err) {
    console.error("Revalidation error:", err);
    return NextResponse.json(
      { message: "Error revalidating", revalidated: false },
      { status: 500 }
    );
  }
}
