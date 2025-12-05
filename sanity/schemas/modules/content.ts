import { defineArrayMember, defineField, defineType } from 'sanity';

export const richTextBlock = defineType({
  name: 'richTextBlock',
  title: 'Rich Text Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional section title',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Underline', value: 'underline' },
              { title: 'Strike', value: 'strike-through' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        allowRelative: true,
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'openInNewTab',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'left',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'Narrow', value: 'narrow' },
          { title: 'Medium', value: 'medium' },
          { title: 'Wide', value: 'wide' },
          { title: 'Full', value: 'full' },
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
      title: 'title',
      content: 'content',
    },
    prepare({ title, content }) {
      const block = content?.find((block: any) => block._type === 'block');
      const preview = block?.children
        ?.map((child: any) => child.text)
        .join('') || '';

      return {
        title: title || 'Rich Text Block',
        subtitle: preview.substring(0, 60) + (preview.length > 60 ? '...' : ''),
      };
    },
  },
});

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'Name of the person being quoted',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'Title or role of the person',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      description: 'Optional avatar or photo',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'Large', value: 'large' },
          { title: 'With Image', value: 'with-image' },
        ],
      },
      initialValue: 'simple',
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
      quote: 'quote',
      attribution: 'attribution',
      media: 'image',
    },
    prepare({ quote, attribution, media }) {
      return {
        title: quote ? `"${quote.substring(0, 60)}${quote.length > 60 ? '...' : ''}"` : 'Quote',
        subtitle: attribution ? `— ${attribution}` : 'No attribution',
        media,
      };
    },
  },
});

export const statsCounter = defineType({
  name: 'statsCounter',
  title: 'Stats Counter',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Optional section title',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle or description',
    }),
    defineField({
      name: 'stats',
      title: 'Stats',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'The number or text to display',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Description of the stat',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'prefix',
              title: 'Prefix',
              type: 'string',
              description: 'Optional prefix (e.g., "$")',
            }),
            defineField({
              name: 'suffix',
              title: 'Suffix',
              type: 'string',
              description: 'Optional suffix (e.g., "+", "%")',
            }),
          ],
          preview: {
            select: {
              value: 'value',
              label: 'label',
              prefix: 'prefix',
              suffix: 'suffix',
            },
            prepare({ value, label, prefix, suffix }) {
              const displayValue = `${prefix || ''}${value}${suffix || ''}`;
              return {
                title: displayValue,
                subtitle: label,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
          { title: '4 Columns', value: 4 },
        ],
      },
      initialValue: 3,
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'Cards', value: 'cards' },
          { title: 'Inline', value: 'inline' },
        ],
      },
      initialValue: 'simple',
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
      title: 'title',
      stats: 'stats',
    },
    prepare({ title, stats }) {
      const count = stats?.length || 0;
      return {
        title: title || 'Stats Counter',
        subtitle: `${count} stat${count !== 1 ? 's' : ''}`,
      };
    },
  },
});

export const comparisonTable = defineType({
  name: 'comparisonTable',
  title: 'Comparison Table',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Column Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'highlighted',
              title: 'Highlighted',
              type: 'boolean',
              description: 'Mark this column as recommended or featured',
              initialValue: false,
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'Optional price to display',
            }),
            defineField({
              name: 'buttonText',
              title: 'Button Text',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'buttonLink',
              title: 'Button Link',
              type: 'url',
              description: 'URL for the button',
              validation: (Rule) =>
                Rule.uri({
                  allowRelative: true,
                  scheme: ['http', 'https', 'mailto', 'tel'],
                }),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              highlighted: 'highlighted',
              price: 'price',
            },
            prepare({ title, highlighted, price }) {
              return {
                title: title || 'Column',
                subtitle: highlighted
                  ? `Highlighted${price ? ` - ${price}` : ''}`
                  : price || '',
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: 'rows',
      title: 'Rows',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'tooltip',
              title: 'Tooltip',
              type: 'string',
              description: 'Optional tooltip to explain the feature',
            }),
            defineField({
              name: 'values',
              title: 'Values',
              type: 'array',
              description: 'One value per column - use "true"/"false" for checkmarks or any text',
              of: [{ type: 'string' }],
              validation: (Rule) => Rule.required().min(1),
            }),
          ],
          preview: {
            select: {
              feature: 'feature',
              values: 'values',
            },
            prepare({ feature, values }) {
              const count = values?.length || 0;
              return {
                title: feature || 'Feature',
                subtitle: `${count} value${count !== 1 ? 's' : ''}`,
              };
            },
          },
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
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
      title: 'title',
      columns: 'columns',
      rows: 'rows',
    },
    prepare({ title, columns, rows }) {
      const colCount = columns?.length || 0;
      const rowCount = rows?.length || 0;
      return {
        title: title || 'Comparison Table',
        subtitle: `${colCount} columns × ${rowCount} rows`,
      };
    },
  },
});

export const contentSchemas = [richTextBlock, quote, statsCounter, comparisonTable];
