/**
 * Generic Webhook Handler
 *
 * Sends form submissions to any HTTP endpoint.
 */

import {
  replaceTemplatePlaceholders,
  parseJsonTemplate,
  type TemplateContext,
} from "../templateEngine";

export interface GenericWebhookAction {
  _type: "genericWebhookAction";
  _key: string;
  enabled: boolean;
  name?: string;
  url: string;
  method: "POST" | "PUT" | "PATCH";
  headers?: Array<{ key: string; value: string }>;
  payloadTemplate?: string;
  includeAllFields?: boolean;
}

/**
 * Send form submission to a generic webhook endpoint
 */
export async function handleGenericWebhook(
  action: GenericWebhookAction,
  formData: Record<string, unknown>,
  formConfig: { name: string; _id: string }
): Promise<void> {
  const context: TemplateContext = {
    formData,
    formName: formConfig.name,
    formId: formConfig._id,
    timestamp: new Date().toISOString(),
  };

  // Build request headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Add custom headers (with placeholder replacement)
  if (action.headers) {
    for (const header of action.headers) {
      if (header.key && header.value) {
        headers[header.key] = replaceTemplatePlaceholders(header.value, context);
      }
    }
  }

  // Build request body
  let body: Record<string, unknown>;

  if (action.payloadTemplate) {
    // Use custom JSON template
    body = parseJsonTemplate(action.payloadTemplate, context);
  } else if (action.includeAllFields !== false) {
    // Default: include all form fields
    body = {
      event: "form_submission",
      form: {
        id: formConfig._id,
        name: formConfig.name,
      },
      data: formData,
      timestamp: new Date().toISOString(),
    };
  } else {
    // Minimal payload
    body = {
      formId: formConfig._id,
      formName: formConfig.name,
      data: formData,
    };
  }

  // Send the request
  const response = await fetch(action.url, {
    method: action.method || "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `Webhook failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
}
