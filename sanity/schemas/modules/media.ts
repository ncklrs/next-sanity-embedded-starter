import { defineField, defineType } from 'sanity';

export const videoEmbed = defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'YouTube, Vimeo, or direct video file URL',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'posterImage',
      title: 'Poster Image',
      type: 'image',
      description: 'Thumbnail image shown before video plays',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'loop',
      title: 'Loop',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '1:1', value: '1:1' },
          { title: '9:16', value: '9:16' },
        ],
      },
      initialValue: '16:9',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Inline', value: 'inline' },
          { title: 'Full Width', value: 'fullwidth' },
          { title: 'Lightbox', value: 'lightbox' },
        ],
      },
      initialValue: 'inline',
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
      subtitle: 'videoUrl',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Video Embed',
        subtitle: subtitle || 'Video Embed Module',
      };
    },
  },
});

export const beforeAfter = defineType({
  name: 'beforeAfter',
  title: 'Before/After Comparison',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'beforeImage',
      title: 'Before Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'beforeLabel',
      title: 'Before Label',
      type: 'string',
      initialValue: 'Before',
    }),
    defineField({
      name: 'afterImage',
      title: 'After Image',
      type: 'image',
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'afterLabel',
      title: 'After Label',
      type: 'string',
      initialValue: 'After',
    }),
    defineField({
      name: 'orientation',
      title: 'Orientation',
      type: 'string',
      options: {
        list: [
          { title: 'Horizontal', value: 'horizontal' },
          { title: 'Vertical', value: 'vertical' },
        ],
      },
      initialValue: 'horizontal',
    }),
    defineField({
      name: 'initialPosition',
      title: 'Initial Position',
      type: 'number',
      description: 'Starting position of the slider (0-100)',
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 50,
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
      media: 'beforeImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Before/After Comparison',
        subtitle: 'Before/After Module',
        media,
      };
    },
  },
});

export const codeBlock = defineType({
  name: 'codeBlock',
  title: 'Code Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'Python', value: 'python' },
          { title: 'Bash', value: 'bash' },
          { title: 'JSON', value: 'json' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'JSX', value: 'jsx' },
          { title: 'TSX', value: 'tsx' },
          { title: 'Go', value: 'go' },
          { title: 'Rust', value: 'rust' },
          { title: 'SQL', value: 'sql' },
        ],
      },
      initialValue: 'javascript',
    }),
    defineField({
      name: 'filename',
      title: 'Filename',
      type: 'string',
      description: 'Optional filename to display in the header',
    }),
    defineField({
      name: 'showLineNumbers',
      title: 'Show Line Numbers',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'highlightLines',
      title: 'Highlight Lines',
      type: 'string',
      description: 'Lines to highlight (e.g., "1,3-5,10")',
    }),
    defineField({
      name: 'variant',
      title: 'Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'With Tabs', value: 'with-tabs' },
          { title: 'Terminal', value: 'terminal' },
        ],
      },
      initialValue: 'default',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'language',
      filename: 'filename',
    },
    prepare({ title, subtitle, filename }) {
      return {
        title: title || filename || 'Code Block',
        subtitle: subtitle ? `${subtitle} code` : 'Code Block Module',
      };
    },
  },
});

export const embedBlock = defineType({
  name: 'embedBlock',
  title: 'Embed Block',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'embedCode',
      title: 'Embed Code',
      type: 'text',
      description: 'Raw HTML or iframe code to embed',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Alternative to embed code - URL to embed as iframe',
    }),
    defineField({
      name: 'aspectRatio',
      title: 'Aspect Ratio',
      type: 'string',
      options: {
        list: [
          { title: '16:9', value: '16:9' },
          { title: '4:3', value: '4:3' },
          { title: '1:1', value: '1:1' },
          { title: 'Auto', value: 'auto' },
        ],
      },
      initialValue: '16:9',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Max Width',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
          { title: 'Full', value: 'full' },
        ],
      },
      initialValue: 'medium',
    }),
    defineField({
      name: 'sandboxed',
      title: 'Sandboxed',
      type: 'boolean',
      description: 'Apply iframe sandbox attribute for security',
      initialValue: true,
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
    },
    prepare({ title }) {
      return {
        title: title || 'Embed Block',
        subtitle: 'Custom Embed Module',
      };
    },
  },
});

export const mediaSchemas = [videoEmbed, beforeAfter, codeBlock, embedBlock];
