import { defineField, defineType } from "sanity";

export const imageWithAlt = defineType({
  name: "imageWithAlt",
  title: "Image with Alt Text",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description: "Important for SEO and accessibility",
      validation: (Rule) =>
        Rule.required().error("Alt text is required for accessibility"),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Optional caption displayed below the image",
    }),
  ],
  preview: {
    select: {
      media: "image",
      alt: "alt",
      caption: "caption",
    },
    prepare({ media, alt, caption }) {
      return {
        title: alt || "Untitled image",
        subtitle: caption,
        media,
      };
    },
  },
});
