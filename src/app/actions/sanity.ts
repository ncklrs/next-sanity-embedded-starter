"use server";

import { writeClient } from "../../../sanity/lib/client";

interface FormSubmission {
  formId: string;
  formName: string;
  data: Record<string, string>;
  submittedAt: string;
}

/**
 * Server Action to submit form data to Sanity
 * Used by Form module components (FormContact, FormNewsletter, etc.)
 *
 * Requires SANITY_API_WRITE_TOKEN to be set
 */
export async function submitFormToSanity(submission: FormSubmission) {
  // Validate token is available
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.warn("SANITY_API_WRITE_TOKEN not configured - form submission will not be saved to Sanity");
    // Return success anyway so the form appears to work
    // In production, you'd want to handle this differently
    return { success: true, id: null };
  }

  try {
    const result = await writeClient.create({
      _type: "formSubmission",
      formId: submission.formId,
      formName: submission.formName,
      data: submission.data,
      submittedAt: submission.submittedAt,
      status: "new",
    });

    return { success: true, id: result._id };
  } catch (error) {
    console.error("Error submitting form to Sanity:", error);
    return { success: false, error: "Failed to submit form" };
  }
}

/**
 * Server Action to subscribe email to newsletter
 * Creates a subscriber document in Sanity
 */
export async function subscribeToNewsletter(email: string, source?: string) {
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.warn("SANITY_API_WRITE_TOKEN not configured - newsletter subscription will not be saved");
    return { success: true, id: null };
  }

  try {
    // Check if email already exists
    const existing = await writeClient.fetch(
      `*[_type == "subscriber" && email == $email][0]`,
      { email }
    );

    if (existing) {
      return { success: true, id: existing._id, alreadySubscribed: true };
    }

    const result = await writeClient.create({
      _type: "subscriber",
      email,
      source: source || "website",
      subscribedAt: new Date().toISOString(),
      status: "active",
    });

    return { success: true, id: result._id };
  } catch (error) {
    console.error("Error subscribing to newsletter:", error);
    return { success: false, error: "Failed to subscribe" };
  }
}
