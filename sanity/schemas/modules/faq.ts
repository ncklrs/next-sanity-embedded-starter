import { defineField, defineType } from 'sanity';

const faqItemField = {
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'answer',
    },
  },
};

export const faqAccordion = defineType({
  name: 'faqAccordion',
  title: 'FAQ - Accordion',
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
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [faqItemField],
      validation: (Rule) => Rule.min(1).max(20),
    }),
    defineField({
      name: 'allowMultiple',
      title: 'Allow Multiple Open',
      type: 'boolean',
      description: 'Allow multiple accordion items to be open at the same time',
      initialValue: false,
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
      itemCount: 'items.length',
    },
    prepare({ heading, itemCount }) {
      return {
        title: heading || 'FAQ - Accordion',
        subtitle: `${itemCount || 0} questions`,
      };
    },
  },
});

export const faqTwoColumn = defineType({
  name: 'faqTwoColumn',
  title: 'FAQ - Two Column',
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
      name: 'leftColumn',
      title: 'Left Column FAQs',
      type: 'array',
      of: [faqItemField],
      validation: (Rule) => Rule.min(1).max(10),
    }),
    defineField({
      name: 'rightColumn',
      title: 'Right Column FAQs',
      type: 'array',
      of: [faqItemField],
      validation: (Rule) => Rule.min(1).max(10),
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
      leftCount: 'leftColumn.length',
      rightCount: 'rightColumn.length',
    },
    prepare({ heading, leftCount, rightCount }) {
      const total = (leftCount || 0) + (rightCount || 0);
      return {
        title: heading || 'FAQ - Two Column',
        subtitle: `${total} questions (${leftCount || 0} left, ${rightCount || 0} right)`,
      };
    },
  },
});

export const faqWithCategories = defineType({
  name: 'faqWithCategories',
  title: 'FAQ - With Categories',
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
      name: 'categories',
      title: 'FAQ Categories',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'items',
              title: 'FAQ Items',
              type: 'array',
              of: [faqItemField],
              validation: (Rule) => Rule.min(1).max(15),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              itemCount: 'items.length',
            },
            prepare({ title, itemCount }) {
              return {
                title: title || 'Category',
                subtitle: `${itemCount || 0} questions`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(8),
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
      categoryCount: 'categories.length',
    },
    prepare({ heading, categoryCount }) {
      return {
        title: heading || 'FAQ - With Categories',
        subtitle: `${categoryCount || 0} categories`,
      };
    },
  },
});

export const faqSimple = defineType({
  name: 'faqSimple',
  title: 'FAQ - Simple',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'items',
      title: 'FAQ Items',
      type: 'array',
      of: [faqItemField],
      validation: (Rule) => Rule.min(1).max(15),
    }),
    defineField({
      name: 'contactCta',
      title: 'Contact CTA',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'CTA Text',
          type: 'text',
          rows: 2,
          description: 'Text encouraging users to contact (e.g., "Can\'t find what you\'re looking for?")',
        }),
        defineField({
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
        }),
        defineField({
          name: 'buttonLink',
          title: 'Button Link',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https', 'mailto', 'tel'],
            }),
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
    select: {
      heading: 'heading',
      itemCount: 'items.length',
    },
    prepare({ heading, itemCount }) {
      return {
        title: heading || 'FAQ - Simple',
        subtitle: `${itemCount || 0} questions`,
      };
    },
  },
});
