import { defineField, defineType } from 'sanity'

export const socialProofLogos = defineType({
  name: 'socialProof.logos',
  title: 'Social Proof - Logos',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g., "Trusted by leading companies"',
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
      validation: (Rule) => Rule.min(3).max(12),
    }),
    defineField({
      name: 'style',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grayscale', value: 'grayscale' },
          { title: 'Color', value: 'color' },
          { title: 'Hover Color', value: 'hover-color' },
        ],
        layout: 'radio',
      },
      initialValue: 'grayscale',
      description: 'How logos should be displayed',
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
          { title: 'Muted', value: 'muted' },
          { title: 'Accent', value: 'accent' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      logos: 'logos',
      style: 'style',
    },
    prepare({ title, logos, style }) {
      return {
        title: title || 'Social Proof - Logos',
        subtitle: `${logos?.length || 0} logos - ${style || 'grayscale'}`,
      }
    },
  },
})

export const socialProofStats = defineType({
  name: 'socialProof.stats',
  title: 'Social Proof - Stats',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'e.g., "Join thousands of satisfied customers"',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "50k+", "4.9/5", "99%"',
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule) => Rule.required(),
              description: 'e.g., "Active Users", "Rating", "Uptime"',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              description: 'Optional supporting text',
            }),
          ],
          preview: {
            select: {
              title: 'value',
              subtitle: 'label',
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(2).max(6),
    }),
    defineField({
      name: 'style',
      title: 'Display Style',
      type: 'string',
      options: {
        list: [
          { title: 'Cards', value: 'cards' },
          { title: 'Inline', value: 'inline' },
          { title: 'Minimal', value: 'minimal' },
        ],
        layout: 'radio',
      },
      initialValue: 'cards',
      description: 'How stats should be displayed',
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
          { title: 'Muted', value: 'muted' },
          { title: 'Accent', value: 'accent' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      stats: 'stats',
      style: 'style',
    },
    prepare({ title, stats, style }) {
      return {
        title: title || 'Social Proof - Stats',
        subtitle: `${stats?.length || 0} stats - ${style || 'cards'}`,
      }
    },
  },
})
