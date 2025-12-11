import { defineField, defineType } from "sanity";

/**
 * Simple Button Object Schema
 *
 * A lightweight button schema for CTAs, heroes, and other modules.
 * Uses direct URL linking (not page references) for simplicity.
 *
 * Field mapping for queries and components:
 * - text: The button label text
 * - link: The URL (internal or external)
 * - variant: Visual style (primary, secondary, outline, ghost)
 */
export const simpleButton = defineType({
  name: "simpleButton",
  title: "Button",
  type: "object",
  fields: [
    defineField({
      name: "text",
      title: "Text",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          allowRelative: true,
          scheme: ["http", "https", "mailto", "tel"],
        }),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Outline", value: "outline" },
          { title: "Ghost", value: "ghost" },
        ],
        layout: "radio",
      },
      initialValue: "primary",
    }),
  ],
  preview: {
    select: {
      title: "text",
      variant: "variant",
    },
    prepare({ title, variant }) {
      return {
        title: title || "Untitled button",
        subtitle: variant || "primary",
      };
    },
  },
});
