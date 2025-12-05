import { defineField, defineType } from 'sanity';

const formFieldObject = {
  type: 'object' as const,
  fields: [
    defineField({
      name: 'name',
      title: 'Field Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Field Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Email', value: 'email' },
          { title: 'Textarea', value: 'textarea' },
          { title: 'Phone', value: 'phone' },
        ],
      },
      initialValue: 'text',
    }),
    defineField({
      name: 'required',
      title: 'Required',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'placeholder',
      title: 'Placeholder',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'type',
      required: 'required',
    },
    prepare(value: Record<string, any>) {
      const { title, subtitle, required } = value;
      return {
        title: title || 'Field',
        subtitle: `${subtitle}${required ? ' (required)' : ''}`,
      };
    },
  },
};

export const formContact = defineType({
  name: 'formContact',
  title: 'Contact Form',
  type: 'object',
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
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [formFieldObject],
    }),
    defineField({
      name: 'submitText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Message',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: 'Thank you for your message! We will get back to you soon.',
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'reference',
      to: [{ type: 'spacing' }],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'reference',
      to: [{ type: 'backgroundColor' }],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'badge',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Contact Form',
        subtitle: subtitle || 'Contact Form Module',
      };
    },
  },
});

export const formNewsletter = defineType({
  name: 'formNewsletter',
  title: 'Newsletter Form',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'placeholder',
      title: 'Email Placeholder',
      type: 'string',
      initialValue: 'Enter your email',
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Subscribe',
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
      type: 'reference',
      to: [{ type: 'spacing' }],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'reference',
      to: [{ type: 'backgroundColor' }],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare({ title }) {
      return {
        title: title || 'Newsletter Form',
        subtitle: 'Newsletter Form Module',
      };
    },
  },
});

export const formWithImage = defineType({
  name: 'formWithImage',
  title: 'Form with Image',
  type: 'object',
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
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [formFieldObject],
    }),
    defineField({
      name: 'submitText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Submit',
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'reference',
      to: [{ type: 'spacing' }],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'reference',
      to: [{ type: 'backgroundColor' }],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'badge',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Form with Image',
        subtitle: subtitle || 'Form with Image Module',
        media,
      };
    },
  },
});

export const formMultiStep = defineType({
  name: 'formMultiStep',
  title: 'Multi-Step Form',
  type: 'object',
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
      name: 'steps',
      title: 'Form Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Step Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'fields',
              title: 'Fields',
              type: 'array',
              of: [formFieldObject],
            }),
          ],
          preview: {
            select: {
              title: 'title',
              fieldCount: 'fields.length',
            },
            prepare({ title, fieldCount }) {
              return {
                title: title || 'Step',
                subtitle: `${fieldCount || 0} fields`,
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'submitText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Complete',
    }),
    defineField({
      name: 'successMessage',
      title: 'Success Message',
      type: 'string',
      initialValue: 'Thank you! Your submission has been received.',
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'reference',
      to: [{ type: 'spacing' }],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'reference',
      to: [{ type: 'backgroundColor' }],
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'badge',
      stepCount: 'steps.length',
    },
    prepare({ title, subtitle, stepCount }) {
      return {
        title: title || 'Multi-Step Form',
        subtitle: subtitle || `${stepCount || 0} steps`,
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
      type: 'reference',
      to: [{ type: 'spacing' }],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'reference',
      to: [{ type: 'backgroundColor' }],
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
