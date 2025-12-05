import { defineField, defineType } from "sanity";

export const formField = defineType({
  name: "formField",
  title: "Form Field",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Field Name",
      type: "string",
      description: "Unique identifier for this field (used in form data)",
      validation: (Rule) =>
        Rule.required().regex(/^[a-zA-Z][a-zA-Z0-9_]*$/, {
          name: "valid identifier",
          invert: false,
        }),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "type",
      title: "Field Type",
      type: "string",
      options: {
        list: [
          { title: "Text", value: "text" },
          { title: "Email", value: "email" },
          { title: "Textarea", value: "textarea" },
          { title: "Select", value: "select" },
          { title: "Checkbox", value: "checkbox" },
          { title: "Radio", value: "radio" },
          { title: "Number", value: "number" },
          { title: "Phone", value: "phone" },
          { title: "Date", value: "date" },
          { title: "File", value: "file" },
        ],
        layout: "dropdown",
      },
      initialValue: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder",
      type: "string",
    }),
    defineField({
      name: "helpText",
      title: "Help Text",
      type: "string",
      description: "Additional guidance shown below the field",
    }),
    defineField({
      name: "required",
      title: "Required",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "defaultValue",
      title: "Default Value",
      type: "string",
    }),
    defineField({
      name: "width",
      title: "Field Width",
      type: "string",
      options: {
        list: [
          { title: "Full Width", value: "full" },
          { title: "Half Width", value: "half" },
        ],
        layout: "radio",
      },
      initialValue: "full",
    }),
    // Select/Radio options
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
          preview: {
            select: { label: "label", value: "value" },
            prepare({ label, value }) {
              return { title: label || value };
            },
          },
        },
      ],
      hidden: ({ parent }) =>
        !["select", "radio"].includes(parent?.type as string),
    }),
    // Textarea rows
    defineField({
      name: "rows",
      title: "Rows",
      type: "number",
      initialValue: 4,
      hidden: ({ parent }) => parent?.type !== "textarea",
    }),
    // File field options
    defineField({
      name: "accept",
      title: "Accepted File Types",
      type: "string",
      description: "e.g., image/*, .pdf, .doc",
      hidden: ({ parent }) => parent?.type !== "file",
    }),
    defineField({
      name: "multiple",
      title: "Allow Multiple Files",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.type !== "file",
    }),
    // Validation options
    defineField({
      name: "validation",
      title: "Validation Rules",
      type: "object",
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        {
          name: "pattern",
          type: "string",
          title: "Regex Pattern",
          description: "Custom validation pattern (e.g., ^[0-9]{5}$ for ZIP)",
        },
        {
          name: "patternMessage",
          type: "string",
          title: "Pattern Error Message",
          description: "Message shown when pattern validation fails",
        },
        {
          name: "minLength",
          type: "number",
          title: "Minimum Length",
        },
        {
          name: "maxLength",
          type: "number",
          title: "Maximum Length",
        },
        {
          name: "min",
          type: "number",
          title: "Minimum Value",
          description: "For number and date fields",
        },
        {
          name: "max",
          type: "number",
          title: "Maximum Value",
          description: "For number and date fields",
        },
      ],
    }),
  ],
  preview: {
    select: {
      label: "label",
      type: "type",
      required: "required",
    },
    prepare({ label, type, required }) {
      const typeIcons: Record<string, string> = {
        text: "📝",
        email: "📧",
        textarea: "📄",
        select: "📋",
        checkbox: "☑️",
        radio: "🔘",
        number: "🔢",
        phone: "📱",
        date: "📅",
        file: "📎",
      };
      const icon = typeIcons[type as string] || "📝";
      return {
        title: `${icon} ${label || "Untitled field"}${required ? " *" : ""}`,
        subtitle: type,
      };
    },
  },
});
