import { defineField, defineType } from 'sanity';

export const formContact = defineType({
  name: 'formContact',
  title: 'Contact Form',
  type: 'object',
  description: 'Contact form that references a reusable Form document',
  fields: [
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form' }],
      description: 'Select a form configuration to use',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading Override',
      type: 'string',
      description: 'Leave empty to use the form name',
    }),
    defineField({
      name: 'headingHighlight',
      title: 'Heading Highlight',
      type: 'string',
      description: 'Text to highlight in the heading',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
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
      formName: 'form.name',
      badge: 'badge',
    },
    prepare({ heading, formName, badge }) {
      return {
        title: heading || formName || 'Contact Form',
        subtitle: badge || `Form: ${formName || 'Not selected'}`,
        media: () => '📝',
      };
    },
  },
});

export const formNewsletter = defineType({
  name: 'formNewsletter',
  title: 'Newsletter Form',
  type: 'object',
  description: 'Newsletter form that references a reusable Form document',
  fields: [
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form' }],
      description: 'Select a form configuration to use',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heading',
      title: 'Heading Override',
      type: 'string',
      description: 'Leave empty to use the form name',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'note',
      title: 'Note',
      type: 'string',
      description: 'Small text below the form (e.g., privacy policy)',
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
      formName: 'form.name',
    },
    prepare({ heading, formName }) {
      return {
        title: heading || formName || 'Newsletter Form',
        subtitle: `Form: ${formName || 'Not selected'}`,
        media: () => '📧',
      };
    },
  },
});

export const formWithImage = defineType({
  name: 'formWithImage',
  title: 'Form with Image',
  type: 'object',
  description: 'Form with image that references a reusable Form document',
  fields: [
    defineField({
      name: 'form',
      title: 'Form',
      type: 'reference',
      to: [{ type: 'form' }],
      description: 'Select a form configuration to use',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading Override',
      type: 'string',
      description: 'Leave empty to use the form name',
    }),
    defineField({
      name: 'headingHighlight',
      title: 'Heading Highlight',
      type: 'string',
      description: 'Text to highlight in the heading',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
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
      name: 'imagePosition',
      title: 'Image Position',
      type: 'string',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Right', value: 'right' },
        ],
      },
      initialValue: 'right',
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
      formName: 'form.name',
      badge: 'badge',
      media: 'image',
    },
    prepare({ heading, formName, badge, media }) {
      return {
        title: heading || formName || 'Form with Image',
        subtitle: badge || `Form: ${formName || 'Not selected'}`,
        media,
      };
    },
  },
});

export const formMultiStep = defineType({
  name: 'formMultiStep',
  title: 'Multi-Step Form',
  type: 'object',
  description: 'Multi-step form with multiple steps and fields',
  fields: [
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'steps',
      title: 'Form Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Step Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'fields',
              title: 'Fields',
              type: 'array',
              of: [{ type: 'formField' }],
              validation: (Rule) => Rule.required().min(1),
            },
          ],
          preview: {
            select: {
              title: 'title',
              fieldCount: 'fields',
            },
            prepare({ title, fieldCount }) {
              const count = Array.isArray(fieldCount) ? fieldCount.length : 0;
              return {
                title: title || 'Untitled Step',
                subtitle: `${count} field${count !== 1 ? 's' : ''}`,
              };
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'submitText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Submit',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'text',
      rows: 2,
      initialValue: 'Thank you! Your submission has been received.',
    }),
    defineField({
      name: 'showProgressBar',
      title: 'Show Progress Bar',
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
      badge: 'badge',
      steps: 'steps',
    },
    prepare({ heading, badge, steps }) {
      const stepCount = Array.isArray(steps) ? steps.length : 0;
      return {
        title: heading || 'Multi-Step Form',
        subtitle: badge || `${stepCount} step${stepCount !== 1 ? 's' : ''}`,
        media: () => '📋',
      };
    },
  },
});

// Dynamic Form - References a reusable Form document with full action configuration
export const formDynamic = defineType({
  name: 'formDynamic',
  title: 'Dynamic Form',
  type: 'object',
  description: 'A form that references a reusable Form document with configurable actions',
  fields: [
    defineField({
      name: 'form',
      title: 'Form Configuration',
      type: 'reference',
      to: [{ type: 'form' }],
      description: 'Select a form configuration to render',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'Optional badge text above the form',
    }),
    defineField({
      name: 'heading',
      title: 'Heading Override',
      type: 'string',
      description: 'Leave empty to use the form name',
    }),
    defineField({
      name: 'headingHighlight',
      title: 'Heading Highlight',
      type: 'string',
      description: 'Text to highlight in the heading',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Centered', value: 'centered' },
          { title: 'Side by Side', value: 'split' },
        ],
        layout: 'radio',
      },
      initialValue: 'default',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'Small (480px)', value: 'sm' },
          { title: 'Medium (640px)', value: 'md' },
          { title: 'Large (768px)', value: 'lg' },
          { title: 'Full Width', value: 'full' },
        ],
      },
      initialValue: 'md',
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
      formName: 'form.name',
      badge: 'badge',
    },
    prepare({ heading, formName, badge }) {
      return {
        title: heading || formName || 'Dynamic Form',
        subtitle: badge || `Form: ${formName || 'Not selected'}`,
        media: () => '📝',
      };
    },
  },
});
