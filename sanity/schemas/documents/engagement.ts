import { defineField, defineType } from 'sanity';

export const engagement = defineType({
  name: 'engagement',
  title: 'Engagement',
  type: 'document',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'targeting', title: 'Targeting' },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    // ─────────────────────────────────────────────
    // CORE FIELDS
    // ─────────────────────────────────────────────
    defineField({
      name: 'name',
      title: 'Internal Name',
      type: 'string',
      group: 'content',
      description: 'Internal name for this engagement (shown in Sanity Studio)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'engagementType',
      title: 'Engagement Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          { title: 'Announcement Bar', value: 'announcementBar' },
          { title: 'Sticky CTA', value: 'stickyCta' },
          { title: 'Exit Intent Modal', value: 'exitIntentModal' },
          { title: 'Newsletter Popup', value: 'newsletterPopup' },
        ],
        layout: 'radio',
      },
      initialValue: 'announcementBar',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      group: 'content',
      initialValue: true,
      description: 'Toggle to enable/disable this engagement',
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      group: 'settings',
      initialValue: 50,
      description:
        'Higher priority engagements render first (0-100). For same-type conflicts, highest priority wins.',
      validation: (rule) => rule.min(0).max(100),
    }),

    // ─────────────────────────────────────────────
    // ANNOUNCEMENT BAR FIELDS
    // ─────────────────────────────────────────────
    defineField({
      name: 'announcementMessage',
      title: 'Message',
      type: 'string',
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'announcementBar',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { engagementType?: string };
          if (parent?.engagementType === 'announcementBar' && !value) {
            return 'Message is required for announcement bars';
          }
          return true;
        }),
    }),
    defineField({
      name: 'announcementLink',
      title: 'Link',
      type: 'object',
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'announcementBar',
      fields: [
        defineField({ name: 'text', title: 'Link Text', type: 'string' }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
        }),
      ],
    }),
    defineField({
      name: 'announcementDismissible',
      title: 'Dismissible',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      hidden: ({ parent }) => parent?.engagementType !== 'announcementBar',
    }),
    defineField({
      name: 'announcementVariant',
      title: 'Variant',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Gradient', value: 'gradient' },
          { title: 'Highlight', value: 'highlight' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) => parent?.engagementType !== 'announcementBar',
    }),
    defineField({
      name: 'announcementBackgroundColor',
      title: 'Background Color',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Muted', value: 'muted' },
          { title: 'Accent', value: 'accent' },
          { title: 'Warning', value: 'warning' },
          { title: 'Success', value: 'success' },
          { title: 'Error', value: 'error' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) => parent?.engagementType !== 'announcementBar',
    }),

    // ─────────────────────────────────────────────
    // STICKY CTA FIELDS
    // ─────────────────────────────────────────────
    defineField({
      name: 'stickyText',
      title: 'Button Text',
      type: 'string',
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'stickyCta',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as { engagementType?: string };
          if (parent?.engagementType === 'stickyCta' && !value) {
            return 'Button text is required for sticky CTAs';
          }
          return true;
        }),
    }),
    defineField({
      name: 'stickyUrl',
      title: 'URL',
      type: 'url',
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'stickyCta',
      validation: (rule) =>
        rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
    }),
    defineField({
      name: 'stickyIcon',
      title: 'Icon',
      type: 'string',
      group: 'content',
      description: 'Icon name or emoji',
      hidden: ({ parent }) => parent?.engagementType !== 'stickyCta',
    }),
    defineField({
      name: 'stickyPosition',
      title: 'Position',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Bottom Right', value: 'bottom-right' },
          { title: 'Bottom Left', value: 'bottom-left' },
          { title: 'Bottom Center', value: 'bottom-center' },
        ],
      },
      initialValue: 'bottom-right',
      hidden: ({ parent }) => parent?.engagementType !== 'stickyCta',
    }),
    defineField({
      name: 'stickyShowAfterScroll',
      title: 'Show After Scroll (px)',
      type: 'number',
      group: 'settings',
      initialValue: 300,
      hidden: ({ parent }) => parent?.engagementType !== 'stickyCta',
    }),
    defineField({
      name: 'stickyVariant',
      title: 'Variant',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Button', value: 'button' },
          { title: 'Pill', value: 'pill' },
          { title: 'Expanded', value: 'expanded' },
        ],
      },
      initialValue: 'button',
      hidden: ({ parent }) => parent?.engagementType !== 'stickyCta',
    }),
    defineField({
      name: 'stickyDismissible',
      title: 'Dismissible',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      description: 'Allow users to dismiss the sticky CTA (persists in localStorage)',
      hidden: ({ parent }) => parent?.engagementType !== 'stickyCta',
    }),

    // ─────────────────────────────────────────────
    // EXIT INTENT MODAL FIELDS
    // ─────────────────────────────────────────────
    defineField({
      name: 'exitTitle',
      title: 'Title',
      type: 'string',
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'exitIntentModal',
    }),
    defineField({
      name: 'exitMessage',
      title: 'Message',
      type: 'text',
      rows: 3,
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'exitIntentModal',
    }),
    defineField({
      name: 'exitImage',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'exitIntentModal',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'exitCta',
      title: 'Call to Action',
      type: 'object',
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'exitIntentModal',
      fields: [
        defineField({ name: 'text', title: 'Button Text', type: 'string' }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'url',
          validation: (rule) =>
            rule.uri({ allowRelative: true, scheme: ['http', 'https', 'mailto', 'tel'] }),
        }),
        defineField({
          name: 'variant',
          title: 'Variant',
          type: 'string',
          options: {
            list: [
              { title: 'Primary', value: 'primary' },
              { title: 'Secondary', value: 'secondary' },
            ],
          },
          initialValue: 'primary',
        }),
      ],
    }),
    defineField({
      name: 'exitShowOnce',
      title: 'Show Once Per Session',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      hidden: ({ parent }) => parent?.engagementType !== 'exitIntentModal',
    }),
    defineField({
      name: 'exitVariant',
      title: 'Modal Variant',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Fullscreen', value: 'fullscreen' },
          { title: 'Slide In', value: 'slide-in' },
        ],
      },
      initialValue: 'default',
      hidden: ({ parent }) => parent?.engagementType !== 'exitIntentModal',
    }),

    // ─────────────────────────────────────────────
    // NEWSLETTER POPUP FIELDS
    // ─────────────────────────────────────────────
    defineField({
      name: 'newsletterTitle',
      title: 'Title',
      type: 'string',
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'newsletterPopup',
    }),
    defineField({
      name: 'newsletterMessage',
      title: 'Message',
      type: 'text',
      rows: 2,
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'newsletterPopup',
    }),
    defineField({
      name: 'newsletterImage',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      group: 'content',
      hidden: ({ parent }) => parent?.engagementType !== 'newsletterPopup',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'newsletterPlaceholder',
      title: 'Email Placeholder',
      type: 'string',
      group: 'content',
      initialValue: 'Enter your email',
      hidden: ({ parent }) => parent?.engagementType !== 'newsletterPopup',
    }),
    defineField({
      name: 'newsletterButtonText',
      title: 'Button Text',
      type: 'string',
      group: 'content',
      initialValue: 'Subscribe',
      hidden: ({ parent }) => parent?.engagementType !== 'newsletterPopup',
    }),
    defineField({
      name: 'newsletterSuccessMessage',
      title: 'Success Message',
      type: 'string',
      group: 'content',
      initialValue: 'Thanks for subscribing!',
      hidden: ({ parent }) => parent?.engagementType !== 'newsletterPopup',
    }),
    defineField({
      name: 'newsletterTrigger',
      title: 'Trigger',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          { title: 'Time Delay', value: 'time-delay' },
          { title: 'Scroll Depth', value: 'scroll-depth' },
        ],
      },
      initialValue: 'time-delay',
      hidden: ({ parent }) => parent?.engagementType !== 'newsletterPopup',
    }),
    defineField({
      name: 'newsletterTriggerValue',
      title: 'Trigger Value',
      type: 'number',
      group: 'settings',
      description: 'Seconds for time-delay, percentage (0-100) for scroll-depth',
      initialValue: 10,
      hidden: ({ parent }) => parent?.engagementType !== 'newsletterPopup',
    }),
    defineField({
      name: 'newsletterShowOnce',
      title: 'Show Once Per Session',
      type: 'boolean',
      group: 'settings',
      initialValue: true,
      hidden: ({ parent }) => parent?.engagementType !== 'newsletterPopup',
    }),

    // ─────────────────────────────────────────────
    // SCHEDULING (All Types)
    // ─────────────────────────────────────────────
    defineField({
      name: 'schedule',
      title: 'Schedule',
      type: 'object',
      group: 'settings',
      description: 'Optional date range for this engagement',
      fields: [
        defineField({ name: 'startDate', title: 'Start Date', type: 'datetime' }),
        defineField({ name: 'endDate', title: 'End Date', type: 'datetime' }),
      ],
    }),

    // ─────────────────────────────────────────────
    // PAGE TARGETING (All Types)
    // ─────────────────────────────────────────────
    defineField({
      name: 'targetingMode',
      title: 'Page Targeting',
      type: 'string',
      group: 'targeting',
      options: {
        list: [
          { title: 'All Pages', value: 'all' },
          { title: 'Include Specific Pages', value: 'include' },
          { title: 'Exclude Specific Pages', value: 'exclude' },
        ],
        layout: 'radio',
      },
      initialValue: 'all',
    }),
    defineField({
      name: 'includePages',
      title: 'Include Pages',
      type: 'array',
      group: 'targeting',
      description: 'Only show on these pages',
      hidden: ({ parent }) => parent?.targetingMode !== 'include',
      of: [{ type: 'reference', to: [{ type: 'page' }] }],
    }),
    defineField({
      name: 'excludePages',
      title: 'Exclude Pages',
      type: 'array',
      group: 'targeting',
      description: 'Do not show on these pages',
      hidden: ({ parent }) => parent?.targetingMode !== 'exclude',
      of: [{ type: 'reference', to: [{ type: 'page' }] }],
    }),
  ],
  orderings: [
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
    {
      title: 'Priority (Low to High)',
      name: 'priorityAsc',
      by: [{ field: 'priority', direction: 'asc' }],
    },
    {
      title: 'Name A-Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Recently Updated',
      name: 'updatedAtDesc',
      by: [{ field: '_updatedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      name: 'name',
      engagementType: 'engagementType',
      enabled: 'enabled',
      priority: 'priority',
      startDate: 'schedule.startDate',
      endDate: 'schedule.endDate',
    },
    prepare({ name, engagementType, enabled, priority, startDate, endDate }) {
      const typeLabels: Record<string, string> = {
        announcementBar: 'Announcement Bar',
        stickyCta: 'Sticky CTA',
        exitIntentModal: 'Exit Intent Modal',
        newsletterPopup: 'Newsletter Popup',
      };
      const typeIcons: Record<string, string> = {
        announcementBar: '📢',
        stickyCta: '🔘',
        exitIntentModal: '👋',
        newsletterPopup: '📬',
      };

      // Build status indicator
      const now = new Date();
      let statusIndicator = enabled ? '✅' : '⏸️';
      if (startDate && new Date(startDate) > now) {
        statusIndicator = '📅'; // Scheduled
      }
      if (endDate && new Date(endDate) < now) {
        statusIndicator = '⏹️'; // Ended
      }

      return {
        title: name || 'Untitled Engagement',
        subtitle: `${statusIndicator} ${typeLabels[engagementType] || engagementType} • Priority: ${priority ?? 50}`,
      };
    },
  },
});
