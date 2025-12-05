import { defineField, defineType } from "sanity";

// Discord Webhook Action
export const discordWebhookAction = defineType({
  name: "discordWebhookAction",
  title: "Discord Webhook",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "name",
      title: "Action Name",
      type: "string",
      description: "Friendly name for this action (for reference)",
    }),
    defineField({
      name: "webhookUrl",
      title: "Webhook URL",
      type: "url",
      description: "Discord webhook URL (from Server Settings > Integrations)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "messageTemplate",
      title: "Message Template",
      type: "text",
      description:
        "Use {{fieldName}} for placeholders. e.g., New submission from {{name}} ({{email}})",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "username",
      title: "Bot Username",
      type: "string",
      description: "Override the webhook's default username",
    }),
    defineField({
      name: "avatarUrl",
      title: "Bot Avatar URL",
      type: "url",
      description: "Override the webhook's default avatar",
    }),
    defineField({
      name: "useEmbed",
      title: "Use Rich Embed",
      type: "boolean",
      description: "Send as a rich embed with field details",
      initialValue: true,
    }),
    defineField({
      name: "embedColor",
      title: "Embed Color",
      type: "string",
      description: "Hex color for the embed (e.g., #5865F2)",
      hidden: ({ parent }) => !parent?.useEmbed,
    }),
  ],
  preview: {
    select: {
      name: "name",
      enabled: "enabled",
    },
    prepare({ name, enabled }) {
      return {
        title: `🎮 ${name || "Discord Webhook"}`,
        subtitle: enabled ? "Enabled" : "Disabled",
      };
    },
  },
});

// Generic Webhook Action
export const genericWebhookAction = defineType({
  name: "genericWebhookAction",
  title: "Generic Webhook",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "name",
      title: "Action Name",
      type: "string",
      description: "Friendly name for this action",
    }),
    defineField({
      name: "url",
      title: "Webhook URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "method",
      title: "HTTP Method",
      type: "string",
      options: {
        list: [
          { title: "POST", value: "POST" },
          { title: "PUT", value: "PUT" },
          { title: "PATCH", value: "PATCH" },
        ],
        layout: "radio",
      },
      initialValue: "POST",
    }),
    defineField({
      name: "headers",
      title: "Custom Headers",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "key", type: "string", title: "Header Name" },
            { name: "value", type: "string", title: "Header Value" },
          ],
          preview: {
            select: { key: "key", value: "value" },
            prepare({ key, value }) {
              return { title: `${key}: ${value}` };
            },
          },
        },
      ],
    }),
    defineField({
      name: "payloadTemplate",
      title: "Payload Template (JSON)",
      type: "text",
      description:
        'JSON template with {{fieldName}} placeholders. e.g., {"name": "{{name}}", "email": "{{email}}"}',
    }),
    defineField({
      name: "includeAllFields",
      title: "Include All Form Fields",
      type: "boolean",
      description: "Automatically include all form fields in the payload",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      name: "name",
      url: "url",
      enabled: "enabled",
    },
    prepare({ name, url, enabled }) {
      const domain = url ? new URL(url).hostname : "No URL";
      return {
        title: `🔗 ${name || "Webhook"}`,
        subtitle: `${enabled ? "→" : "⏸"} ${domain}`,
      };
    },
  },
});

// Email Notification Action
export const emailNotificationAction = defineType({
  name: "emailNotificationAction",
  title: "Email Notification",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "name",
      title: "Action Name",
      type: "string",
      description: "Friendly name for this action",
    }),
    defineField({
      name: "provider",
      title: "Email Provider",
      type: "string",
      options: {
        list: [
          { title: "Resend", value: "resend" },
          { title: "SendGrid", value: "sendgrid" },
          { title: "Mailgun", value: "mailgun" },
        ],
        layout: "dropdown",
      },
      initialValue: "resend",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "to",
      title: "To",
      type: "string",
      description: "Recipient email address(es), comma-separated",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cc",
      title: "CC",
      type: "string",
      description: "CC recipients, comma-separated",
    }),
    defineField({
      name: "bcc",
      title: "BCC",
      type: "string",
      description: "BCC recipients, comma-separated",
    }),
    defineField({
      name: "replyToField",
      title: "Reply-To Field",
      type: "string",
      description:
        "Form field name to use as reply-to (e.g., 'email'). Leave empty for no reply-to.",
    }),
    defineField({
      name: "subject",
      title: "Subject",
      type: "string",
      description: "Email subject line. Use {{fieldName}} for placeholders.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bodyTemplate",
      title: "Body Template (HTML)",
      type: "text",
      description:
        "HTML email body. Use {{fieldName}} for placeholders. e.g., <h2>New submission</h2><p>From: {{name}}</p>",
    }),
    defineField({
      name: "includeAllFields",
      title: "Auto-include All Fields",
      type: "boolean",
      description: "Automatically list all form fields in the email body",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      name: "name",
      to: "to",
      enabled: "enabled",
    },
    prepare({ name, to, enabled }) {
      return {
        title: `📧 ${name || "Email Notification"}`,
        subtitle: `${enabled ? "→" : "⏸"} ${to}`,
      };
    },
  },
});

// Sanity Storage Action (stores submission in Sanity)
export const sanityStorageAction = defineType({
  name: "sanityStorageAction",
  title: "Store in Sanity",
  type: "object",
  fields: [
    defineField({
      name: "enabled",
      title: "Enabled",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "name",
      title: "Action Name",
      type: "string",
      description: "Friendly name for this action",
    }),
    defineField({
      name: "formNameOverride",
      title: "Form Name Override",
      type: "string",
      description: "Override the form name stored in submissions",
    }),
  ],
  preview: {
    select: {
      name: "name",
      enabled: "enabled",
    },
    prepare({ name, enabled }) {
      return {
        title: `💾 ${name || "Store in Sanity"}`,
        subtitle: enabled ? "Enabled" : "Disabled",
      };
    },
  },
});
