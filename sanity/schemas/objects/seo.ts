import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      description: "Recommended length: 50-60 characters",
      validation: (Rule) =>
        Rule.max(60).warning("Titles over 60 characters may be truncated"),
    }),
    defineField({
      name: "description",
      title: "SEO Description",
      type: "text",
      rows: 3,
      description: "Recommended length: 150-160 characters",
      validation: (Rule) =>
        Rule.max(160).warning(
          "Descriptions over 160 characters may be truncated"
        ),
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Recommended size: 1200x630px",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative text",
          description: "Important for accessibility",
        },
      ],
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Prevent search engines from indexing this page",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      media: "ogImage",
    },
    prepare({ title, description, media }) {
      return {
        title: title || "No SEO title set",
        subtitle: description || "No description set",
        media,
      };
    },
  },
});
