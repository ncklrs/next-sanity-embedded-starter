/**
 * Discord Webhook Handler
 *
 * Sends form submissions to a Discord channel via webhook.
 */

import {
  replaceTemplatePlaceholders,
  type TemplateContext,
} from "../templateEngine";

export interface DiscordWebhookAction {
  _type: "discordWebhookAction";
  _key: string;
  enabled: boolean;
  name?: string;
  webhookUrl: string;
  messageTemplate: string;
  username?: string;
  avatarUrl?: string;
  useEmbed?: boolean;
  embedColor?: string;
}

export interface DiscordWebhookPayload {
  content?: string;
  username?: string;
  avatar_url?: string;
  embeds?: Array<{
    title?: string;
    description?: string;
    color?: number;
    fields: Array<{
      name: string;
      value: string;
      inline?: boolean;
    }>;
    timestamp?: string;
    footer?: {
      text: string;
    };
  }>;
}

/**
 * Send form submission to Discord webhook
 */
export async function handleDiscordWebhook(
  action: DiscordWebhookAction,
  formData: Record<string, unknown>,
  formConfig: { name: string; _id: string }
): Promise<void> {
  const context: TemplateContext = {
    formData,
    formName: formConfig.name,
    formId: formConfig._id,
    timestamp: new Date().toISOString(),
  };

  // Build the message content
  const message = replaceTemplatePlaceholders(action.messageTemplate, context);

  // Build the payload
  const payload: DiscordWebhookPayload = {
    username: action.username || "Form Submission Bot",
    avatar_url: action.avatarUrl,
  };

  if (action.useEmbed) {
    // Build rich embed
    const embedColor = action.embedColor
      ? parseInt(action.embedColor.replace("#", ""), 16)
      : 0x5865f2; // Discord blurple

    // Convert form data to embed fields
    const fields = Object.entries(formData)
      .filter(([key]) => !key.startsWith("_"))
      .map(([key, value]) => ({
        name: formatFieldName(key),
        value: truncateValue(String(value || "-")),
        inline: String(value || "").length < 50,
      }));

    payload.embeds = [
      {
        title: `New ${formConfig.name} Submission`,
        description: message,
        color: embedColor,
        fields,
        timestamp: new Date().toISOString(),
        footer: {
          text: "Form Submission",
        },
      },
    ];
  } else {
    // Plain text message
    payload.content = message;
  }

  // Send to Discord
  const response = await fetch(action.webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "Unknown error");
    throw new Error(
      `Discord webhook failed: ${response.status} ${response.statusText} - ${errorText}`
    );
  }
}

/**
 * Format field name for display
 */
function formatFieldName(name: string): string {
  return name
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/^\s/, "")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Truncate long values for Discord embed fields (max 1024 chars)
 */
function truncateValue(value: string, maxLength: number = 1024): string {
  if (value.length <= maxLength) return value;
  return value.substring(0, maxLength - 3) + "...";
}
