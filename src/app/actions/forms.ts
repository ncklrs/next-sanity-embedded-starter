"use server";

import { writeClient } from "../../../sanity/lib/client";
import {
  validateFormData,
  sanitizeFormData,
  isSpamSubmission,
  type FormField,
  type ValidationError,
} from "../../lib/forms/validation";
import {
  executeFormActions,
  isSanityStorageEnabled,
  getSanityStorageAction,
  type FormAction,
  type ActionResult,
} from "../../lib/forms/handlers";

/**
 * Types for dynamic form submission
 */
export interface DynamicFormSubmission {
  formId: string;
  formIdentifier?: string;
  data: Record<string, unknown>;
  metadata?: {
    userAgent?: string;
    referrer?: string;
  };
}

export interface FormSubmissionResult {
  success: boolean;
  submissionId?: string;
  actionResults?: ActionResult[];
  errors?: ValidationError[];
  error?: string;
}

interface FormConfig {
  _id: string;
  name: string;
  identifier: { current: string };
  fields: FormField[];
  actions: FormAction[];
  settings?: {
    enableSpamProtection?: boolean;
  };
}

/**
 * Server Action: Submit a dynamic form
 *
 * 1. Fetches form configuration from Sanity
 * 2. Validates form data server-side
 * 3. Executes all enabled actions (Discord, webhooks, email)
 * 4. Stores submission in Sanity if configured
 * 5. Returns success/failure with action results
 */
export async function submitDynamicForm(
  submission: DynamicFormSubmission
): Promise<FormSubmissionResult> {
  const timestamp = new Date().toISOString();

  // Validate write token is available
  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.warn(
      "SANITY_API_WRITE_TOKEN not configured - form submission may not work correctly"
    );
  }

  try {
    // 1. Fetch form configuration
    const formConfig = await writeClient.fetch<FormConfig | null>(
      `*[_type == "form" && _id == $formId][0]{
        _id,
        name,
        identifier,
        fields[]{
          _key,
          name,
          label,
          type,
          required,
          placeholder,
          helpText,
          options[]{label, value},
          rows,
          accept,
          multiple,
          validation
        },
        actions[]{
          _type,
          _key,
          enabled,
          name,
          ...
        },
        settings
      }`,
      { formId: submission.formId }
    );

    if (!formConfig) {
      return {
        success: false,
        error: "Form configuration not found",
      };
    }

    // 2. Check for spam (honeypot)
    if (
      formConfig.settings?.enableSpamProtection &&
      isSpamSubmission(submission.data)
    ) {
      // Return success to not reveal spam detection
      console.log("Spam submission detected and blocked");
      return {
        success: true,
        submissionId: "blocked",
      };
    }

    // 3. Sanitize form data
    const sanitizedData = sanitizeFormData(submission.data);

    // 4. Validate form data
    if (formConfig.fields && formConfig.fields.length > 0) {
      const validationErrors = validateFormData(
        formConfig.fields,
        sanitizedData
      );
      if (validationErrors.length > 0) {
        return {
          success: false,
          errors: validationErrors,
        };
      }
    }

    // 5. Execute form actions (Discord, webhooks, email)
    let actionResults: ActionResult[] = [];
    if (formConfig.actions && formConfig.actions.length > 0) {
      actionResults = await executeFormActions(
        formConfig.actions,
        sanitizedData,
        {
          _id: formConfig._id,
          name: formConfig.name,
        }
      );
    }

    // 6. Store in Sanity if configured
    let submissionId: string | undefined;
    const sanityAction = getSanityStorageAction(formConfig.actions || []);
    const shouldStore =
      isSanityStorageEnabled(formConfig.actions || []) ||
      formConfig.actions?.length === 0; // Default to storing if no actions

    if (shouldStore && process.env.SANITY_API_WRITE_TOKEN) {
      try {
        // Extract common fields for the structured data object
        const structuredData: Record<string, string> = {};
        const commonFields = [
          "name",
          "email",
          "phone",
          "company",
          "message",
          "subject",
        ];
        for (const field of commonFields) {
          if (sanitizedData[field]) {
            structuredData[field] = String(sanitizedData[field]);
          }
        }

        const result = await writeClient.create({
          _type: "formSubmission",
          formId: formConfig._id,
          formName: sanityAction?.formNameOverride || formConfig.name,
          formType: "dynamic",
          data: structuredData,
          rawData: JSON.stringify(sanitizedData),
          metadata: {
            userAgent: submission.metadata?.userAgent,
            referrer: submission.metadata?.referrer,
          },
          actionResults: actionResults.map((r) => ({
            action: r.actionType,
            success: r.success,
            error: r.error,
            timestamp,
          })),
          submittedAt: timestamp,
          status: "new",
        });

        submissionId = result._id;

        // Add Sanity storage result
        actionResults.push({
          actionType: "sanityStorageAction",
          actionName: sanityAction?.name || "Store in Sanity",
          success: true,
        });
      } catch (storageError) {
        console.error("Error storing submission in Sanity:", storageError);
        actionResults.push({
          actionType: "sanityStorageAction",
          actionName: sanityAction?.name || "Store in Sanity",
          success: false,
          error:
            storageError instanceof Error
              ? storageError.message
              : "Storage failed",
        });
      }
    }

    // 7. Return result
    const hasFailedActions = actionResults.some((r) => !r.success);
    if (hasFailedActions) {
      console.warn("Some form actions failed:", actionResults);
    }

    return {
      success: true,
      submissionId,
      actionResults,
    };
  } catch (error) {
    console.error("Error processing form submission:", error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Failed to process submission",
    };
  }
}

/**
 * Server Action: Fetch form configuration for client-side rendering
 *
 * Returns form fields and settings without sensitive action data
 */
export async function getFormConfig(formId: string) {
  try {
    const formConfig = await writeClient.fetch<{
      _id: string;
      name: string;
      identifier: { current: string };
      description?: string;
      fields: FormField[];
      settings?: {
        submitButtonText?: string;
        submitButtonLoadingText?: string;
        successTitle?: string;
        successMessage?: string;
        errorMessage?: string;
        enableSpamProtection?: boolean;
      };
    } | null>(
      `*[_type == "form" && _id == $formId][0]{
        _id,
        name,
        identifier,
        description,
        fields[]{
          _key,
          name,
          label,
          type,
          required,
          placeholder,
          helpText,
          defaultValue,
          width,
          options[]{label, value},
          rows,
          accept,
          multiple,
          validation
        },
        settings
      }`,
      { formId }
    );

    return formConfig;
  } catch (error) {
    console.error("Error fetching form config:", error);
    return null;
  }
}

/**
 * Server Action: Fetch form by identifier (slug)
 */
export async function getFormByIdentifier(identifier: string) {
  try {
    const formConfig = await writeClient.fetch<{
      _id: string;
      name: string;
      identifier: { current: string };
      fields: FormField[];
      settings?: {
        submitButtonText?: string;
        submitButtonLoadingText?: string;
        successTitle?: string;
        successMessage?: string;
        errorMessage?: string;
        enableSpamProtection?: boolean;
      };
    } | null>(
      `*[_type == "form" && identifier.current == $identifier][0]{
        _id,
        name,
        identifier,
        fields[]{
          _key,
          name,
          label,
          type,
          required,
          placeholder,
          helpText,
          defaultValue,
          width,
          options[]{label, value},
          rows,
          accept,
          multiple,
          validation
        },
        settings
      }`,
      { identifier }
    );

    return formConfig;
  } catch (error) {
    console.error("Error fetching form by identifier:", error);
    return null;
  }
}
