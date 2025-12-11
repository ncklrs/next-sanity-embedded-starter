import { defineField, defineType } from 'sanity';

const logoField = {
  name: 'logo',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Logo Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Link (Optional)',
      type: 'url',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https', 'mailto', 'tel'],
        }),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
};

export const logoCloudSimple = defineType({
  name: 'logoCloudSimple',
  title: 'Logo Cloud - Simple',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading text (e.g., "Trusted by industry leaders")',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [logoField],
      validation: (Rule) => Rule.min(1).max(12),
    }),
    defineField({
      name: 'style',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grayscale', value: 'grayscale' },
          { title: 'Color', value: 'color' },
          { title: 'Hover Reveal', value: 'hover-reveal' },
        ],
        layout: 'radio',
      },
      initialValue: 'grayscale',
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
    select: {
      heading: 'heading',
      logoCount: 'logos.length',
    },
    prepare({ heading, logoCount }) {
      return {
        title: heading || 'Logo Cloud - Simple',
        subtitle: `${logoCount || 0} logos`,
      };
    },
  },
});

export const logoCloudMarquee = defineType({
  name: 'logoCloudMarquee',
  title: 'Logo Cloud - Marquee',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Company Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'image',
              title: 'Logo Image',
              type: 'image',
              options: {
                hotspot: true,
              },
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(4).max(20),
    }),
    defineField({
      name: 'speed',
      title: 'Animation Speed',
      type: 'string',
      options: {
        list: [
          { title: 'Slow', value: 'slow' },
          { title: 'Medium', value: 'medium' },
          { title: 'Fast', value: 'fast' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'direction',
      title: 'Scroll Direction',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio',
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'pauseOnHover',
      title: 'Pause on Hover',
      type: 'boolean',
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
    select: {
      heading: 'heading',
      logoCount: 'logos.length',
      speed: 'speed',
    },
    prepare({ heading, logoCount, speed }) {
      return {
        title: heading || 'Logo Cloud - Marquee',
        subtitle: `${logoCount || 0} logos - ${speed || 'medium'} speed`,
      };
    },
  },
});

export const logoCloudGrid = defineType({
  name: 'logoCloudGrid',
  title: 'Logo Cloud - Grid',
  type: 'object',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge Text',
      type: 'string',
      description: 'Small label above the heading',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headingHighlight',
      title: 'Heading Highlight',
      type: 'string',
      description: 'Part of the heading to highlight with accent color',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      of: [logoField],
      validation: (Rule) => Rule.min(1).max(24),
    }),
    defineField({
      name: 'columns',
      title: 'Grid Columns',
      type: 'number',
      options: {
        list: [
          { title: '4 Columns', value: 4 },
          { title: '5 Columns', value: 5 },
          { title: '6 Columns', value: 6 },
        ],
      },
      initialValue: 4,
      validation: (Rule) => Rule.required().min(4).max(6),
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
    select: {
      heading: 'heading',
      logoCount: 'logos.length',
      columns: 'columns',
    },
    prepare({ heading, logoCount, columns }) {
      return {
        title: heading || 'Logo Cloud - Grid',
        subtitle: `${logoCount || 0} logos - ${columns || 4} columns`,
      };
    },
  },
});
