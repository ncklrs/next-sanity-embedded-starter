import { defineField, defineType } from "sanity";

const spacingOptions = [
  { title: "None", value: "none" },
  { title: "Small", value: "sm" },
  { title: "Medium", value: "md" },
  { title: "Large", value: "lg" },
  { title: "Extra Large", value: "xl" },
];

export const spacing = defineType({
  name: "spacing",
  title: "Spacing",
  type: "object",
  fields: [
    defineField({
      name: "top",
      title: "Top Padding",
      type: "string",
      options: {
        list: spacingOptions,
        layout: "radio",
      },
      initialValue: "md",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bottom",
      title: "Bottom Padding",
      type: "string",
      options: {
        list: spacingOptions,
        layout: "radio",
      },
      initialValue: "md",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      top: "top",
      bottom: "bottom",
    },
    prepare({ top, bottom }) {
      return {
        title: "Spacing",
        subtitle: `Top: ${top} • Bottom: ${bottom}`,
      };
    },
  },
});
