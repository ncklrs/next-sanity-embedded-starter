/**
 * Generic Webhook Handler
 *
 * Sends form submissions to any HTTP endpoint.
 * Features timeout protection and retry with exponential backoff.
 */

import {
  replaceTemplatePlaceholders,
  parseJsonTemplate,
  type TemplateContext,
} from "../templateEngine";

// Configuration
const WEBHOOK_TIMEOUT_MS = 10000; // 10 seconds
const MAX_RETRIES = 2;
const INITIAL_RETRY_DELAY_MS = 1000;

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
 * Fetch with timeout support using AbortController
 */
async function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeoutMs: number
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Sleep for exponential backoff
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Check if error is retryable (network errors, 5xx, 429)
 */
function isRetryableError(error: unknown, response?: Response): boolean {
  // Network errors (AbortError from timeout, TypeError from network failure)
  if (error instanceof Error) {
    if (error.name === "AbortError") return true;
    if (error.name === "TypeError") return true;
  }
  // Server errors and rate limiting
  if (response) {
    return response.status >= 500 || response.status === 429;
  }
  return false;
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
    body = parseJsonTemplate(action.payloadTemplate, context);
  } else if (action.includeAllFields !== false) {
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
    body = {
      formId: formConfig._id,
      formName: formConfig.name,
      data: formData,
    };
  }

  const requestOptions: RequestInit = {
    method: action.method || "POST",
    headers,
    body: JSON.stringify(body),
  };

  // Attempt request with retries
  let lastError: Error | null = null;
  let lastResponse: Response | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      // Exponential backoff on retries
      if (attempt > 0) {
        const delay = INITIAL_RETRY_DELAY_MS * Math.pow(2, attempt - 1);
        console.log(`[Webhook] Retry ${attempt}/${MAX_RETRIES} after ${delay}ms`);
        await sleep(delay);
      }

      const response = await fetchWithTimeout(
        action.url,
        requestOptions,
        WEBHOOK_TIMEOUT_MS
      );

      if (response.ok) {
        return; // Success!
      }

      lastResponse = response;
      lastError = new Error(
        `Webhook failed: ${response.status} ${response.statusText}`
      );

      // Only retry on retryable status codes
      if (!isRetryableError(null, response)) {
        break;
      }
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Handle timeout specifically
      if (lastError.name === "AbortError") {
        lastError = new Error(`Webhook timed out after ${WEBHOOK_TIMEOUT_MS}ms`);
      }

      // Only retry on retryable errors
      if (!isRetryableError(error)) {
        break;
      }
    }
  }

  // All retries exhausted or non-retryable error
  const errorText = lastResponse
    ? await lastResponse.text().catch(() => "Unknown error")
    : "";
  throw new Error(
    lastError?.message + (errorText ? ` - ${errorText}` : "")
  );
}
