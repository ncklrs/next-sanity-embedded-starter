import { type NextRequest, NextResponse } from "next/server";
import { submitDynamicForm } from "@/app/actions/forms";

/**
 * POST /api/forms/submit
 *
 * API endpoint for form submissions.
 * Supports both JSON and multipart/form-data.
 *
 * This endpoint is useful for:
 * - Non-JavaScript form submissions (progressive enhancement)
 * - External integrations that need to submit to forms
 * - Webhook-based form submissions
 */
export async function POST(req: NextRequest) {
  try {
    let formData: Record<string, unknown>;
    let formId: string;
    let formIdentifier: string | undefined;

    const contentType = req.headers.get("content-type") || "";

    // Handle both JSON and form-data submissions
    if (contentType.includes("application/json")) {
      const json = await req.json();
      formId = json._formId || json.formId;
      formIdentifier = json._formIdentifier || json.formIdentifier;
      formData = { ...json };
      delete formData._formId;
      delete formData.formId;
      delete formData._formIdentifier;
      delete formData.formIdentifier;
    } else if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const data = await req.formData();
      formId = data.get("_formId") as string;
      formIdentifier = data.get("_formIdentifier") as string | undefined;

      // Convert FormData to object (excluding internal fields)
      formData = {};
      for (const [key, value] of data.entries()) {
        if (!key.startsWith("_")) {
          formData[key] = value;
        }
      }
    } else {
      return NextResponse.json(
        { success: false, error: "Unsupported content type" },
        { status: 400 }
      );
    }

    if (!formId) {
      return NextResponse.json(
        { success: false, error: "Missing form ID" },
        { status: 400 }
      );
    }

    // Get metadata from request
    const userAgent = req.headers.get("user-agent") || undefined;
    const referrer = req.headers.get("referer") || undefined;

    // Submit the form
    const result = await submitDynamicForm({
      formId,
      formIdentifier,
      data: formData,
      metadata: {
        userAgent,
        referrer,
      },
    });

    // Handle redirect for non-JS form submissions
    const redirectUrl = req.nextUrl.searchParams.get("redirect");
    const errorRedirectUrl = req.nextUrl.searchParams.get("errorRedirect");

    if (redirectUrl && result.success) {
      return NextResponse.redirect(new URL(redirectUrl, req.url));
    }

    if (errorRedirectUrl && !result.success) {
      const errorUrl = new URL(errorRedirectUrl, req.url);
      if (result.error) {
        errorUrl.searchParams.set("error", result.error);
      }
      return NextResponse.redirect(errorUrl);
    }

    // Return JSON response
    if (result.success) {
      return NextResponse.json({
        success: true,
        submissionId: result.submissionId,
        actionResults: result.actionResults,
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
          errors: result.errors,
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Form submission API error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}

/**
 * OPTIONS /api/forms/submit
 *
 * Handle CORS preflight requests
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
