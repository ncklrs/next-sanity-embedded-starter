import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      description: "Used for SEO and social sharing",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      description: "Upload a square image (recommended 32x32 or larger)",
    }),
    defineField({
      name: "ogImage",
      title: "Default Social Share Image",
      type: "image",
      description: "Default image for social media sharing (recommended 1200x630)",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
              options: {
                list: [
                  { title: "Twitter/X", value: "twitter" },
                  { title: "Facebook", value: "facebook" },
                  { title: "Instagram", value: "instagram" },
                  { title: "LinkedIn", value: "linkedin" },
                  { title: "YouTube", value: "youtube" },
                  { title: "GitHub", value: "github" },
                ],
              },
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
          preview: {
            select: {
              title: "platform",
              subtitle: "url",
            },
          },
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text",
      type: "string",
      description: "Copyright or other footer text",
    }),
    defineField({
      name: "homepage",
      title: "Homepage",
      type: "reference",
      to: [{ type: "page" }],
      description: "Select the page to display as the homepage",
    }),
    defineField({
      name: "mainNavigation",
      title: "Main Navigation",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            },
            {
              name: "linkType",
              title: "Link Type",
              type: "string",
              options: {
                list: [
                  { title: "Internal Page", value: "internal" },
                  { title: "External URL", value: "external" },
                  { title: "Anchor Link", value: "anchor" },
                ],
              },
              initialValue: "internal",
            },
            {
              name: "internalLink",
              title: "Internal Page",
              type: "reference",
              to: [{ type: "page" }],
              hidden: ({ parent }) => parent?.linkType !== "internal",
            },
            {
              name: "externalUrl",
              title: "External URL",
              type: "url",
              hidden: ({ parent }) => parent?.linkType !== "external",
            },
            {
              name: "anchor",
              title: "Anchor",
              type: "string",
              description: "e.g., #features, #pricing",
              hidden: ({ parent }) => parent?.linkType !== "anchor",
            },
          ],
          preview: {
            select: {
              title: "label",
              linkType: "linkType",
            },
            prepare({ title, linkType }) {
              return {
                title,
                subtitle: linkType,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
