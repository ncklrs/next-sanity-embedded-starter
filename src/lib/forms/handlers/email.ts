/**
 * Email Notification Handler
 *
 * Sends form submissions via email using various providers.
 * Supports: Resend, SendGrid, Mailgun
 */

import {
  replaceTemplatePlaceholders,
  buildHtmlEmailBody,
  type TemplateContext,
} from "../templateEngine";

export interface EmailNotificationAction {
  _type: "emailNotificationAction";
  _key: string;
  enabled: boolean;
  name?: string;
  provider: "resend" | "sendgrid" | "mailgun";
  to: string;
  cc?: string;
  bcc?: string;
  replyToField?: string;
  subject: string;
  bodyTemplate?: string;
  includeAllFields?: boolean;
}

interface EmailPayload {
  to: string[];
  cc?: string[];
  bcc?: string[];
  from: string;
  replyTo?: string;
  subject: string;
  html: string;
}

/**
 * Send email notification for form submission
 */
export async function handleEmailNotification(
  action: EmailNotificationAction,
  formData: Record<string, unknown>,
  formConfig: { name: string; _id: string }
): Promise<void> {
  const context: TemplateContext = {
    formData,
    formName: formConfig.name,
    formId: formConfig._id,
    timestamp: new Date().toISOString(),
  };

  // Parse recipient addresses
  const to = parseEmailList(action.to);
  const cc = action.cc ? parseEmailList(action.cc) : undefined;
  const bcc = action.bcc ? parseEmailList(action.bcc) : undefined;

  // Get reply-to from form data if specified
  const replyTo = action.replyToField
    ? (formData[action.replyToField] as string)
    : undefined;

  // Build subject with placeholder replacement
  const subject = replaceTemplatePlaceholders(action.subject, context);

  // Build HTML body
  const html = buildHtmlEmailBody(
    action.bodyTemplate,
    context,
    action.includeAllFields !== false
  );

  // Get sender email from environment
  const fromEmail =
    process.env.EMAIL_FROM ||
    process.env.RESEND_FROM ||
    "forms@yourdomain.com";

  const emailPayload: EmailPayload = {
    to,
    cc,
    bcc,
    from: fromEmail,
    replyTo,
    subject,
    html,
  };

  // Send via appropriate provider
  switch (action.provider) {
    case "resend":
      await sendViaResend(emailPayload);
      break;
    case "sendgrid":
      await sendViaSendGrid(emailPayload);
      break;
    case "mailgun":
      await sendViaMailgun(emailPayload);
      break;
    default:
      throw new Error(`Unknown email provider: ${action.provider}`);
  }
}

/**
 * Parse comma-separated email list
 */
function parseEmailList(emails: string): string[] {
  return emails
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

/**
 * Send email via Resend
 */
async function sendViaResend(payload: EmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not set");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: payload.from,
      to: payload.to,
      cc: payload.cc,
      bcc: payload.bcc,
      reply_to: payload.replyTo,
      subject: payload.subject,
      html: payload.html,
    }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Unknown error" }));
    throw new Error(`Resend API error: ${error.message || response.statusText}`);
  }
}

/**
 * Send email via SendGrid
 */
async function sendViaSendGrid(payload: EmailPayload): Promise<void> {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    throw new Error("SENDGRID_API_KEY environment variable is not set");
  }

  const personalizations: Array<{
    to: Array<{ email: string }>;
    cc?: Array<{ email: string }>;
    bcc?: Array<{ email: string }>;
  }> = [
    {
      to: payload.to.map((email) => ({ email })),
    },
  ];

  if (payload.cc) {
    personalizations[0].cc = payload.cc.map((email) => ({ email }));
  }
  if (payload.bcc) {
    personalizations[0].bcc = payload.bcc.map((email) => ({ email }));
  }

  const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations,
      from: { email: payload.from },
      reply_to: payload.replyTo ? { email: payload.replyTo } : undefined,
      subject: payload.subject,
      content: [
        {
          type: "text/html",
          value: payload.html,
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text().catch(() => "Unknown error");
    throw new Error(`SendGrid API error: ${error}`);
  }
}

/**
 * Send email via Mailgun
 */
async function sendViaMailgun(payload: EmailPayload): Promise<void> {
  const apiKey = process.env.MAILGUN_API_KEY;
  const domain = process.env.MAILGUN_DOMAIN;

  if (!apiKey || !domain) {
    throw new Error(
      "MAILGUN_API_KEY and MAILGUN_DOMAIN environment variables must be set"
    );
  }

  const formData = new FormData();
  formData.append("from", payload.from);
  formData.append("to", payload.to.join(","));
  if (payload.cc) formData.append("cc", payload.cc.join(","));
  if (payload.bcc) formData.append("bcc", payload.bcc.join(","));
  if (payload.replyTo) formData.append("h:Reply-To", payload.replyTo);
  formData.append("subject", payload.subject);
  formData.append("html", payload.html);

  const response = await fetch(
    `https://api.mailgun.net/v3/${domain}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    const error = await response.text().catch(() => "Unknown error");
    throw new Error(`Mailgun API error: ${error}`);
  }
}
