import { defineField, defineType } from "sanity";

export const formSubmission = defineType({
  name: "formSubmission",
  title: "Form Submission",
  type: "document",
  fields: [
    defineField({
      name: "formId",
      title: "Form ID",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "formName",
      title: "Form Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "formType",
      title: "Form Type",
      type: "string",
      options: {
        list: [
          { title: "Dynamic Form", value: "dynamic" },
          { title: "Static Form", value: "static" },
          { title: "Newsletter", value: "newsletter" },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: "data",
      title: "Form Data",
      type: "object",
      description: "Flexible storage for all form fields",
      fields: [
        // Common fields (shown in Studio)
        { name: "name", type: "string", title: "Name" },
        { name: "email", type: "string", title: "Email" },
        { name: "phone", type: "string", title: "Phone" },
        { name: "company", type: "string", title: "Company" },
        { name: "message", type: "text", title: "Message" },
        { name: "subject", type: "string", title: "Subject" },
      ],
      readOnly: true,
    }),
    // Flexible JSON storage for dynamic form fields
    defineField({
      name: "rawData",
      title: "All Form Data (JSON)",
      type: "text",
      description: "Complete JSON of all submitted fields",
      readOnly: true,
    }),
    defineField({
      name: "metadata",
      title: "Metadata",
      type: "object",
      fields: [
        { name: "userAgent", type: "string", title: "User Agent" },
        { name: "referrer", type: "string", title: "Referrer" },
        { name: "ipHash", type: "string", title: "IP Hash" },
      ],
      readOnly: true,
    }),
    defineField({
      name: "actionResults",
      title: "Action Results",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "action", type: "string", title: "Action Type" },
            { name: "success", type: "boolean", title: "Success" },
            { name: "error", type: "string", title: "Error Message" },
            { name: "timestamp", type: "datetime", title: "Timestamp" },
          ],
          preview: {
            select: {
              action: "action",
              success: "success",
              error: "error",
            },
            prepare({ action, success, error }) {
              return {
                title: `${success ? "✅" : "❌"} ${action}`,
                subtitle: error || (success ? "Completed" : "Failed"),
              };
            },
          },
        },
      ],
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Replied", value: "replied" },
          { title: "Archived", value: "archived" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "notes",
      title: "Internal Notes",
      type: "text",
      description: "Notes for internal use",
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "By Form",
      name: "formNameAsc",
      by: [
        { field: "formName", direction: "asc" },
        { field: "submittedAt", direction: "desc" },
      ],
    },
  ],
  preview: {
    select: {
      email: "data.email",
      name: "data.name",
      formName: "formName",
      status: "status",
      date: "submittedAt",
    },
    prepare({ email, name, formName, status, date }) {
      const statusEmoji =
        {
          new: "🔵",
          read: "👁️",
          replied: "✅",
          archived: "📁",
        }[status as string] || "⚪";

      return {
        title: `${statusEmoji} ${name || email || "No contact info"}`,
        subtitle: `${formName || "Form"} • ${date ? new Date(date).toLocaleDateString() : ""}`,
      };
    },
  },
});
