import { defineField, defineType } from 'sanity';

export const blogFeaturedPost = defineType({
  name: 'blogFeaturedPost',
  title: 'Blog Featured Post',
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
      name: 'featuredPost',
      title: 'Featured Post',
      type: 'reference',
      to: [{ type: 'post' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'showExcerpt',
      title: 'Show Excerpt',
      type: 'boolean',
      initialValue: true,
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
      postTitle: 'featuredPost.title',
    },
    prepare({ title, subtitle, postTitle }) {
      return {
        title: title || 'Featured Post',
        subtitle: postTitle || subtitle || 'Blog Featured Post Module',
      };
    },
  },
});

export const blogGrid = defineType({
  name: 'blogGrid',
  title: 'Blog Grid',
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
      name: 'postSelection',
      title: 'Post Selection',
      type: 'string',
      options: {
        list: [
          { title: 'Latest Posts', value: 'latest' },
          { title: 'Specific Posts', value: 'specific' },
        ],
      },
      initialValue: 'latest',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      hidden: ({ parent }) => parent?.postSelection !== 'specific',
    }),
    defineField({
      name: 'postsToShow',
      title: 'Number of Posts to Show',
      type: 'number',
      initialValue: 6,
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
    defineField({
      name: 'showExcerpt',
      title: 'Show Excerpt',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          { title: '2 Columns', value: 2 },
          { title: '3 Columns', value: 3 },
        ],
      },
      initialValue: 3,
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
      postsToShow: 'postsToShow',
    },
    prepare({ title, subtitle, postsToShow }) {
      return {
        title: title || 'Blog Grid',
        subtitle: subtitle || `Showing ${postsToShow || 6} posts`,
      };
    },
  },
});

export const blogList = defineType({
  name: 'blogList',
  title: 'Blog List',
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
      name: 'postSelection',
      title: 'Post Selection',
      type: 'string',
      options: {
        list: [
          { title: 'Latest Posts', value: 'latest' },
          { title: 'Specific Posts', value: 'specific' },
        ],
      },
      initialValue: 'latest',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      hidden: ({ parent }) => parent?.postSelection !== 'specific',
    }),
    defineField({
      name: 'postsToShow',
      title: 'Number of Posts to Show',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(20),
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
      postsToShow: 'postsToShow',
    },
    prepare({ title, subtitle, postsToShow }) {
      return {
        title: title || 'Blog List',
        subtitle: subtitle || `Showing ${postsToShow || 5} posts`,
      };
    },
  },
});

export const blogCarousel = defineType({
  name: 'blogCarousel',
  title: 'Blog Carousel',
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
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'postSelection',
      title: 'Post Selection',
      type: 'string',
      options: {
        list: [
          { title: 'Latest Posts', value: 'latest' },
          { title: 'Specific Posts', value: 'specific' },
        ],
      },
      initialValue: 'latest',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      hidden: ({ parent }) => parent?.postSelection !== 'specific',
    }),
    defineField({
      name: 'postsToShow',
      title: 'Number of Posts to Show',
      type: 'number',
      initialValue: 8,
      validation: (Rule) => Rule.required().min(1).max(12),
    }),
    defineField({
      name: 'autoplay',
      title: 'Autoplay',
      type: 'boolean',
      initialValue: false,
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
      postsToShow: 'postsToShow',
    },
    prepare({ title, subtitle, postsToShow }) {
      return {
        title: title || 'Blog Carousel',
        subtitle: subtitle || `Showing ${postsToShow || 8} posts`,
      };
    },
  },
});

export const blogMinimal = defineType({
  name: 'blogMinimal',
  title: 'Blog Minimal',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'postSelection',
      title: 'Post Selection',
      type: 'string',
      options: {
        list: [
          { title: 'Latest Posts', value: 'latest' },
          { title: 'Specific Posts', value: 'specific' },
        ],
      },
      initialValue: 'latest',
    }),
    defineField({
      name: 'posts',
      title: 'Posts',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      hidden: ({ parent }) => parent?.postSelection !== 'specific',
    }),
    defineField({
      name: 'postsToShow',
      title: 'Number of Posts to Show',
      type: 'number',
      initialValue: 3,
      validation: (Rule) => Rule.required().min(1).max(10),
    }),
    defineField({
      name: 'viewAllLink',
      title: 'View All Link',
      type: 'url',
      description: 'Link to view all posts',
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
      postsToShow: 'postsToShow',
    },
    prepare({ title, postsToShow }) {
      return {
        title: title || 'Blog Minimal',
        subtitle: `Showing ${postsToShow || 3} posts`,
      };
    },
  },
});
