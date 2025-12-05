import { defineField, defineType } from "sanity";

export const backgroundColor = defineType({
  name: "backgroundColor",
  title: "Background Color",
  type: "object",
  fields: [
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      options: {
        list: [
          { title: "Default (White)", value: "default" },
          { title: "Secondary (Gray)", value: "secondary" },
          { title: "Tertiary (Light)", value: "tertiary" },
          { title: "Gradient", value: "gradient" },
        ],
        layout: "radio",
      },
      initialValue: "default",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      color: "color",
    },
    prepare({ color }) {
      const colorLabels = {
        default: "Default (White)",
        secondary: "Secondary (Gray)",
        tertiary: "Tertiary (Light)",
        gradient: "Gradient",
      };
      return {
        title: "Background",
        subtitle: colorLabels[color as keyof typeof colorLabels] || color,
      };
    },
  },
});
