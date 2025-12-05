import { defineField, defineType } from "sanity";

export const form = defineType({
  name: "form",
  title: "Form",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Form Name",
      type: "string",
      description: "Internal name for this form (shown in Sanity Studio)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "identifier",
      title: "Identifier",
      type: "slug",
      description: "Unique identifier for referencing this form",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      description: "Optional description (for internal reference)",
    }),
    // Form Fields
    defineField({
      name: "fields",
      title: "Form Fields",
      type: "array",
      of: [{ type: "formField" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    // Form Actions
    defineField({
      name: "actions",
      title: "Form Actions",
      type: "array",
      description: "Actions to execute when form is submitted",
      of: [
        { type: "discordWebhookAction" },
        { type: "genericWebhookAction" },
        { type: "emailNotificationAction" },
        { type: "sanityStorageAction" },
      ],
    }),
    // Form Settings
    defineField({
      name: "settings",
      title: "Form Settings",
      type: "object",
      options: {
        collapsible: true,
        collapsed: false,
      },
      fields: [
        {
          name: "submitButtonText",
          title: "Submit Button Text",
          type: "string",
          initialValue: "Submit",
        },
        {
          name: "submitButtonLoadingText",
          title: "Submit Button Loading Text",
          type: "string",
          initialValue: "Submitting...",
        },
        {
          name: "successTitle",
          title: "Success Title",
          type: "string",
          initialValue: "Thank you!",
        },
        {
          name: "successMessage",
          title: "Success Message",
          type: "text",
          rows: 2,
          initialValue:
            "Your submission has been received. We'll get back to you soon.",
        },
        {
          name: "errorMessage",
          title: "Error Message",
          type: "text",
          rows: 2,
          initialValue:
            "Something went wrong. Please try again or contact us directly.",
        },
        {
          name: "enableSpamProtection",
          title: "Enable Spam Protection",
          type: "boolean",
          description: "Add honeypot field to prevent spam",
          initialValue: true,
        },
      ],
    }),
  ],
  orderings: [
    {
      title: "Name",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Recently Updated",
      name: "updatedAtDesc",
      by: [{ field: "_updatedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      name: "name",
      identifier: "identifier.current",
      fieldCount: "fields",
      actionCount: "actions",
    },
    prepare({ name, identifier, fieldCount, actionCount }) {
      const fields = Array.isArray(fieldCount) ? fieldCount.length : 0;
      const actions = Array.isArray(actionCount) ? actionCount.length : 0;
      return {
        title: name || "Untitled Form",
        subtitle: `/${identifier || "..."} • ${fields} field${fields !== 1 ? "s" : ""} • ${actions} action${actions !== 1 ? "s" : ""}`,
        media: () => "📝",
      };
    },
  },
});
