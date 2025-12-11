import { defineField, defineType } from "sanity";

export const heroDefault = defineType({
  name: "heroDefault",
  title: "Hero - Default",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
        }),
        defineField({
          name: "variant",
          title: "Variant",
          type: "string",
          options: {
            list: [
              { title: "Gradient", value: "gradient" },
              { title: "Success", value: "success" },
              { title: "New", value: "new" },
            ],
          },
          initialValue: "gradient",
        }),
      ],
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingHighlight",
      title: "Heading Highlight",
      type: "string",
      description: "The gradient text part of the heading",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "primaryButton",
      title: "Primary Button",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
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
            ],
          },
          initialValue: "primary",
        }),
      ],
    }),
    defineField({
      name: "secondaryButton",
      title: "Secondary Button",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
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
            ],
          },
          initialValue: "secondary",
        }),
      ],
    }),
    defineField({
      name: "backgroundStyle",
      title: "Background Style",
      type: "string",
      options: {
        list: [
          { title: "Default", value: "default" },
          { title: "Gradient Orbs", value: "gradient-orbs" },
          { title: "Grid", value: "grid" },
          { title: "Particles", value: "particles" },
        ],
      },
      initialValue: "default",
    }),
    defineField({
      name: "alignment",
      title: "Alignment",
      type: "string",
      options: {
        list: [
          { title: "Center", value: "center" },
          { title: "Left", value: "left" },
        ],
      },
      initialValue: "center",
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
          { title: 'Muted', value: 'muted' },
          { title: 'Accent', value: 'accent' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title || "Hero Section",
      subtitle: "Default Hero",
    }),
  },
});

export const heroCentered = defineType({
  name: "heroCentered",
  title: "Hero - Centered",
  type: "object",
  fields: [
    defineField({
      name: "badge",
      title: "Badge",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
        }),
        defineField({
          name: "variant",
          title: "Variant",
          type: "string",
          options: {
            list: [
              { title: "Gradient", value: "gradient" },
              { title: "Success", value: "success" },
              { title: "New", value: "new" },
            ],
          },
          initialValue: "gradient",
        }),
      ],
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingHighlight",
      title: "Heading Highlight",
      type: "string",
      description: "The gradient text part of the heading",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string",
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
                ],
              },
              initialValue: "primary",
            }),
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({ title: title || "Button" }),
          },
        },
      ],
    }),
    defineField({
      name: "trustedByText",
      title: "Trusted By Text",
      type: "string",
      initialValue: "Trusted by leading companies",
    }),
    defineField({
      name: "trustedByLogos",
      title: "Trusted By Logos",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "companyName",
              title: "Company Name",
              type: "string",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
          { title: 'Muted', value: 'muted' },
          { title: 'Accent', value: 'accent' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title || "Hero Section",
      subtitle: "Centered Hero",
    }),
  },
});

export const heroSplit = defineType({
  name: "heroSplit",
  title: "Hero - Split",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingHighlight",
      title: "Heading Highlight",
      type: "string",
      description: "The gradient text part of the heading",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string",
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
                ],
              },
              initialValue: "primary",
            }),
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({ title: title || "Button" }),
          },
        },
      ],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: {
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
      initialValue: "right",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon name or emoji",
            }),
            defineField({
              name: "text",
              title: "Text",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "text", subtitle: "icon" },
            prepare: ({ title, subtitle }) => ({
              title: title || "Feature",
              subtitle: subtitle,
            }),
          },
        },
      ],
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
          { title: 'Muted', value: 'muted' },
          { title: 'Accent', value: 'accent' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title || "Hero Section",
      subtitle: "Split Hero",
    }),
  },
});

export const heroVideo = defineType({
  name: "heroVideo",
  title: "Hero - Video",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingHighlight",
      title: "Heading Highlight",
      type: "string",
      description: "The gradient text part of the heading",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "url",
      description: "YouTube, Vimeo, or direct video file URL",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "videoPoster",
      title: "Video Poster",
      type: "image",
      description: "Thumbnail image shown before video loads",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "string",
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
                ],
              },
              initialValue: "primary",
            }),
          ],
          preview: {
            select: { title: "text" },
            prepare: ({ title }) => ({ title: title || "Button" }),
          },
        },
      ],
    }),
    defineField({
      name: "overlay",
      title: "Show Overlay",
      type: "boolean",
      description: "Add a dark overlay over the video for better text readability",
      initialValue: true,
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
          { title: 'Muted', value: 'muted' },
          { title: 'Accent', value: 'accent' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title || "Hero Section",
      subtitle: "Video Hero",
    }),
  },
});

export const heroMinimal = defineType({
  name: "heroMinimal",
  title: "Hero - Minimal",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "headingHighlight",
      title: "Heading Highlight",
      type: "string",
      description: "The gradient text part of the heading",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "announcement",
      title: "Announcement",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "singleButton",
      title: "Button",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "string",
        }),
        defineField({
          name: "link",
          title: "Link",
          type: "string",
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
            ],
          },
          initialValue: "primary",
        }),
      ],
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'White', value: 'white' },
          { title: 'Gray', value: 'gray' },
          { title: 'Muted', value: 'muted' },
          { title: 'Accent', value: 'accent' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }) => ({
      title: title || "Hero Section",
      subtitle: "Minimal Hero",
    }),
  },
});
