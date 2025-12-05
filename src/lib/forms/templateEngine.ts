/**
 * Template Engine for Form Actions
 *
 * Replaces {{fieldName}} placeholders with actual form data values.
 * Supports special placeholders for metadata.
 */

export interface TemplateContext {
  formData: Record<string, unknown>;
  formName?: string;
  formId?: string;
  timestamp?: string;
  metadata?: {
    userAgent?: string;
    referrer?: string;
  };
}

/**
 * Replace {{placeholder}} patterns with values from context
 *
 * Special placeholders:
 * - {{_formName}} - Name of the form
 * - {{_formId}} - ID of the form
 * - {{_timestamp}} - ISO timestamp of submission
 * - {{_userAgent}} - User's browser agent
 * - {{_referrer}} - Referring page URL
 * - {{_allFields}} - Formatted list of all fields
 */
export function replaceTemplatePlaceholders(
  template: string,
  context: TemplateContext
): string {
  const { formData, formName, formId, timestamp, metadata } = context;

  // Build the complete data object including special placeholders
  const allData: Record<string, unknown> = {
    ...formData,
    _formName: formName || "Form",
    _formId: formId || "",
    _timestamp: timestamp || new Date().toISOString(),
    _userAgent: metadata?.userAgent || "",
    _referrer: metadata?.referrer || "",
    _allFields: formatAllFields(formData),
  };

  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = allData[key];
    if (value === undefined || value === null) {
      return match; // Keep original placeholder if no value
    }
    return String(value);
  });
}

/**
 * Format all fields as a readable list
 */
function formatAllFields(data: Record<string, unknown>): string {
  return Object.entries(data)
    .filter(([key]) => !key.startsWith("_")) // Skip internal fields
    .map(([key, value]) => {
      const label = formatFieldLabel(key);
      return `${label}: ${String(value || "-")}`;
    })
    .join("\n");
}

/**
 * Convert camelCase/snake_case field names to readable labels
 */
function formatFieldLabel(fieldName: string): string {
  return fieldName
    .replace(/([A-Z])/g, " $1") // camelCase to spaces
    .replace(/_/g, " ") // snake_case to spaces
    .replace(/^\s/, "") // Remove leading space
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Parse and validate a JSON template, replacing placeholders
 */
export function parseJsonTemplate(
  jsonTemplate: string,
  context: TemplateContext
): Record<string, unknown> {
  try {
    // First replace placeholders
    const processedJson = replaceTemplatePlaceholders(jsonTemplate, context);
    // Then parse as JSON
    return JSON.parse(processedJson);
  } catch {
    // If template parsing fails, return a default payload with all fields
    return {
      formName: context.formName,
      formId: context.formId,
      data: context.formData,
      timestamp: context.timestamp || new Date().toISOString(),
    };
  }
}

/**
 * Build HTML email body from form data
 */
export function buildHtmlEmailBody(
  template: string | undefined,
  context: TemplateContext,
  includeAllFields: boolean = true
): string {
  // If custom template provided, use it
  if (template) {
    return replaceTemplatePlaceholders(template, context);
  }

  // Build default HTML body
  const { formData, formName, timestamp } = context;
  const formattedDate = timestamp
    ? new Date(timestamp).toLocaleString()
    : new Date().toLocaleString();

  const fieldsHtml = Object.entries(formData)
    .filter(([key]) => !key.startsWith("_"))
    .map(([key, value]) => {
      const label = formatFieldLabel(key);
      const displayValue = String(value || "-").replace(/\n/g, "<br>");
      return `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee; font-weight: 500; color: #555;">${label}</td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #eee; color: #333;">${displayValue}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 24px; border-radius: 8px 8px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New Form Submission</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0; font-size: 14px;">${formName || "Form"} - ${formattedDate}</p>
      </div>
      <div style="background: #fff; border: 1px solid #eee; border-top: none; border-radius: 0 0 8px 8px; padding: 0;">
        <table style="width: 100%; border-collapse: collapse;">
          ${fieldsHtml}
        </table>
      </div>
      <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">
        This email was sent automatically from your website form.
      </p>
    </body>
    </html>
  `;
}
