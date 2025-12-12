import { defineField, defineType } from "sanity";

// Base nav link fields (without children - used for nested items)
const baseNavLinkFields = [
  {
    name: "label",
    title: "Label",
    type: "string",
    validation: (rule: any) => rule.required(),
  },
  {
    name: "linkType",
    title: "Link Type",
    type: "string",
    options: {
      list: [
        { title: "Internal Page", value: "internal" },
        { title: "External URL", value: "external" },
        { title: "Anchor Link", value: "anchor" },
      ],
    },
    initialValue: "internal",
  },
  {
    name: "internalLink",
    title: "Internal Page",
    type: "reference",
    to: [{ type: "page" }],
    hidden: ({ parent }: { parent?: { linkType?: string } }) =>
      parent?.linkType !== "internal",
  },
  {
    name: "externalUrl",
    title: "External URL",
    type: "url",
    hidden: ({ parent }: { parent?: { linkType?: string } }) =>
      parent?.linkType !== "external",
  },
  {
    name: "anchor",
    title: "Anchor",
    type: "string",
    description: "e.g., #features, #pricing",
    hidden: ({ parent }: { parent?: { linkType?: string } }) =>
      parent?.linkType !== "anchor",
  },
  {
    name: "description",
    title: "Description",
    type: "string",
    description: "Optional description shown in dropdown menus",
  },
  {
    name: "icon",
    title: "Icon",
    type: "string",
    description: "Optional icon name (e.g., 'rocket', 'shield', 'chart')",
  },
];

// Column definition for mega menu dropdowns
const columnFields = [
  {
    name: "title",
    title: "Column Title",
    type: "string",
    description: "Optional heading for this column",
  },
  {
    name: "links",
    title: "Links",
    type: "array",
    of: [
      {
        type: "object",
        fields: baseNavLinkFields,
        preview: {
          select: {
            title: "label",
            subtitle: "description",
          },
        },
      },
    ],
  },
];

// Nav link fields with children support (for top-level items)
const navLinkFields = [
  ...baseNavLinkFields,
  {
    name: "dropdownStyle",
    title: "Dropdown Style",
    type: "string",
    options: {
      list: [
        { title: "Simple List", value: "simple" },
        { title: "Columns (Mega Menu)", value: "columns" },
      ],
      layout: "radio",
    },
    initialValue: "simple",
    description: "Choose how dropdown items are organized",
  },
  {
    name: "children",
    title: "Dropdown Items",
    type: "array",
    description: "Add child links for a simple dropdown",
    hidden: ({ parent }: { parent?: { dropdownStyle?: string } }) =>
      parent?.dropdownStyle === "columns",
    of: [
      {
        type: "object",
        fields: baseNavLinkFields,
        preview: {
          select: {
            title: "label",
            subtitle: "description",
          },
        },
      },
    ],
  },
  {
    name: "columns",
    title: "Dropdown Columns",
    type: "array",
    description: "Organize links into columns for a mega menu",
    hidden: ({ parent }: { parent?: { dropdownStyle?: string } }) =>
      parent?.dropdownStyle !== "columns",
    of: [
      {
        type: "object",
        name: "column",
        title: "Column",
        fields: columnFields,
        preview: {
          select: {
            title: "title",
            links: "links",
          },
          prepare({
            title,
            links,
          }: {
            title?: string;
            links?: any[];
          }) {
            return {
              title: title || "Untitled Column",
              subtitle: `${links?.length || 0} links`,
            };
          },
        },
      },
    ],
  },
  {
    name: "featuredItem",
    title: "Featured Item",
    type: "object",
    description: "Optional highlighted item shown in mega menu",
    hidden: ({ parent }: { parent?: { dropdownStyle?: string } }) =>
      parent?.dropdownStyle !== "columns",
    fields: [
      {
        name: "title",
        title: "Title",
        type: "string",
      },
      {
        name: "description",
        title: "Description",
        type: "text",
        rows: 2,
      },
      {
        name: "image",
        title: "Image",
        type: "image",
        options: { hotspot: true },
      },
      {
        name: "link",
        title: "Link",
        type: "object",
        fields: baseNavLinkFields.slice(0, 5), // Just the link fields without description/icon
      },
    ],
  },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "general", title: "General", default: true },
    { name: "header", title: "Header Navigation" },
    { name: "footer", title: "Footer Navigation" },
    { name: "engagement", title: "Engagement" },
    { name: "seo", title: "SEO & Social" },
  ],
  fields: [
    // ─────────────────────────────────────────────
    // General Settings
    // ─────────────────────────────────────────────
    defineField({
      name: "title",
      title: "Site Title",
      type: "string",
      group: "general",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Site Description",
      type: "text",
      rows: 3,
      group: "general",
      description: "Used for SEO and social sharing",
    }),
    defineField({
      name: "homepage",
      title: "Homepage",
      type: "reference",
      to: [{ type: "page" }],
      group: "general",
      description: "Select the page to display as the homepage",
    }),

    // ─────────────────────────────────────────────
    // Header Navigation Settings
    // ─────────────────────────────────────────────
    defineField({
      name: "headerNavigation",
      title: "Header Navigation",
      type: "object",
      group: "header",
      fields: [
        defineField({
          name: "logo",
          title: "Logo",
          type: "image",
          options: {
            hotspot: true,
          },
        }),
        defineField({
          name: "navLinks",
          title: "Navigation Links",
          type: "array",
          description: "Main navigation links in the header",
          of: [
            {
              type: "object",
              fields: navLinkFields,
              preview: {
                select: {
                  title: "label",
                  linkType: "linkType",
                },
                prepare({
                  title,
                  linkType,
                }: {
                  title?: string;
                  linkType?: string;
                }) {
                  return {
                    title: title || "Untitled link",
                    subtitle: linkType,
                  };
                },
              },
            },
          ],
        }),
        defineField({
          name: "ctaButtons",
          title: "CTA Buttons",
          type: "array",
          description: "Call-to-action buttons in the header (max 2)",
          validation: (rule) => rule.max(2),
          of: [{ type: "button" }],
        }),
        defineField({
          name: "showCta",
          title: "Show CTA Buttons",
          type: "boolean",
          initialValue: true,
          description: "Toggle visibility of CTA buttons in header",
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // Footer Navigation Settings
    // ─────────────────────────────────────────────
    defineField({
      name: "footerNavigation",
      title: "Footer Navigation",
      type: "object",
      group: "footer",
      fields: [
        defineField({
          name: "description",
          title: "Footer Description",
          type: "text",
          rows: 3,
          description: "Brief description shown in footer (e.g., company tagline)",
        }),
        defineField({
          name: "linkColumns",
          title: "Link Columns",
          type: "array",
          description: "Footer link columns (e.g., Product, Company, Resources)",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  title: "Column Title",
                  type: "string",
                  validation: (rule: any) => rule.required(),
                },
                {
                  name: "links",
                  title: "Links",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: navLinkFields,
                      preview: {
                        select: {
                          title: "label",
                          linkType: "linkType",
                        },
                        prepare({
                          title,
                          linkType,
                        }: {
                          title?: string;
                          linkType?: string;
                        }) {
                          return {
                            title: title || "Untitled link",
                            subtitle: linkType,
                          };
                        },
                      },
                    },
                  ],
                },
              ],
              preview: {
                select: {
                  title: "title",
                  links: "links",
                },
                prepare({
                  title,
                  links,
                }: {
                  title?: string;
                  links?: any[];
                }) {
                  return {
                    title: title || "Untitled column",
                    subtitle: `${links?.length || 0} links`,
                  };
                },
              },
            },
          ],
        }),
        defineField({
          name: "socialLinks",
          title: "Social Links",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "platform",
                  title: "Platform",
                  type: "string",
                  options: {
                    list: [
                      { title: "Twitter/X", value: "twitter" },
                      { title: "Facebook", value: "facebook" },
                      { title: "Instagram", value: "instagram" },
                      { title: "LinkedIn", value: "linkedin" },
                      { title: "YouTube", value: "youtube" },
                      { title: "GitHub", value: "github" },
                      { title: "TikTok", value: "tiktok" },
                      { title: "Discord", value: "discord" },
                    ],
                  },
                  validation: (rule: any) => rule.required(),
                },
                {
                  name: "url",
                  title: "URL",
                  type: "url",
                  validation: (rule: any) => rule.required(),
                },
              ],
              preview: {
                select: {
                  title: "platform",
                  subtitle: "url",
                },
              },
            },
          ],
        }),
        defineField({
          name: "bottomLinks",
          title: "Bottom Links",
          type: "array",
          description: "Links shown at the bottom of footer (e.g., Privacy, Terms)",
          of: [
            {
              type: "object",
              fields: navLinkFields,
              preview: {
                select: {
                  title: "label",
                  linkType: "linkType",
                },
                prepare({
                  title,
                  linkType,
                }: {
                  title?: string;
                  linkType?: string;
                }) {
                  return {
                    title: title || "Untitled link",
                    subtitle: linkType,
                  };
                },
              },
            },
          ],
        }),
        defineField({
          name: "copyrightText",
          title: "Copyright Text",
          type: "string",
          description: "Copyright text (year will be added automatically)",
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // Global Engagement Settings
    // ─────────────────────────────────────────────
    defineField({
      name: "globalEngagement",
      title: "Global Engagement",
      type: "object",
      group: "engagement",
      description: "Site-wide engagement elements that appear on all pages",
      fields: [
        // Global Announcement Bar
        defineField({
          name: "announcementBar",
          title: "Announcement Bar",
          type: "object",
          description: "Top-of-page announcement shown site-wide",
          fields: [
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "message",
              title: "Message",
              type: "string",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "link",
              title: "Link",
              type: "object",
              hidden: ({ parent }) => !parent?.enabled,
              fields: [
                { name: "text", title: "Link Text", type: "string" },
                {
                  name: "url",
                  title: "URL",
                  type: "url",
                  validation: (rule: any) =>
                    rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                },
              ],
            }),
            defineField({
              name: "dismissible",
              title: "Dismissible",
              type: "boolean",
              initialValue: true,
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "variant",
              title: "Variant",
              type: "string",
              options: {
                list: [
                  { title: "Default", value: "default" },
                  { title: "Gradient", value: "gradient" },
                  { title: "Highlight", value: "highlight" },
                ],
              },
              initialValue: "default",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "backgroundColor",
              title: "Background Color",
              type: "string",
              options: {
                list: [
                  { title: "Default", value: "default" },
                  { title: "Muted", value: "muted" },
                  { title: "Accent", value: "accent" },
                  { title: "Warning", value: "warning" },
                  { title: "Success", value: "success" },
                  { title: "Error", value: "error" },
                ],
              },
              initialValue: "default",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "schedule",
              title: "Schedule",
              type: "object",
              description: "Optional scheduling for the announcement",
              hidden: ({ parent }) => !parent?.enabled,
              fields: [
                { name: "startDate", title: "Start Date", type: "datetime" },
                { name: "endDate", title: "End Date", type: "datetime" },
              ],
            }),
          ],
        }),

        // Global Sticky CTA
        defineField({
          name: "stickyCta",
          title: "Sticky CTA",
          type: "object",
          description: "Floating call-to-action button shown site-wide",
          fields: [
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "text",
              title: "Button Text",
              type: "string",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              hidden: ({ parent }) => !parent?.enabled,
              validation: (rule: any) =>
                rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
            }),
            defineField({
              name: "icon",
              title: "Icon",
              type: "string",
              description: "Icon name or emoji",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "position",
              title: "Position",
              type: "string",
              options: {
                list: [
                  { title: "Bottom Right", value: "bottom-right" },
                  { title: "Bottom Left", value: "bottom-left" },
                  { title: "Bottom Center", value: "bottom-center" },
                ],
              },
              initialValue: "bottom-right",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "showAfterScroll",
              title: "Show After Scroll (px)",
              type: "number",
              initialValue: 300,
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "variant",
              title: "Variant",
              type: "string",
              options: {
                list: [
                  { title: "Button", value: "button" },
                  { title: "Pill", value: "pill" },
                  { title: "Expanded", value: "expanded" },
                ],
              },
              initialValue: "button",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "excludePages",
              title: "Exclude from Pages",
              type: "array",
              description: "Pages where this CTA should not appear",
              hidden: ({ parent }) => !parent?.enabled,
              of: [{ type: "reference", to: [{ type: "page" }] }],
            }),
          ],
        }),

        // Global Exit Intent Modal
        defineField({
          name: "exitIntentModal",
          title: "Exit Intent Modal",
          type: "object",
          description: "Modal shown when user tries to leave the site",
          fields: [
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "message",
              title: "Message",
              type: "text",
              rows: 3,
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "cta",
              title: "Call to Action",
              type: "object",
              hidden: ({ parent }) => !parent?.enabled,
              fields: [
                { name: "text", title: "Button Text", type: "string" },
                {
                  name: "url",
                  title: "URL",
                  type: "url",
                  validation: (rule: any) =>
                    rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
                },
                {
                  name: "variant",
                  title: "Variant",
                  type: "string",
                  options: {
                    list: [
                      { title: "Primary", value: "primary" },
                      { title: "Secondary", value: "secondary" },
                    ],
                  },
                  initialValue: "primary",
                },
              ],
            }),
            defineField({
              name: "showOnce",
              title: "Show Once Per Session",
              type: "boolean",
              initialValue: true,
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "variant",
              title: "Modal Variant",
              type: "string",
              options: {
                list: [
                  { title: "Default", value: "default" },
                  { title: "Fullscreen", value: "fullscreen" },
                  { title: "Slide In", value: "slide-in" },
                ],
              },
              initialValue: "default",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "excludePages",
              title: "Exclude from Pages",
              type: "array",
              description: "Pages where this modal should not appear",
              hidden: ({ parent }) => !parent?.enabled,
              of: [{ type: "reference", to: [{ type: "page" }] }],
            }),
          ],
        }),

        // Newsletter Popup
        defineField({
          name: "newsletterPopup",
          title: "Newsletter Popup",
          type: "object",
          description: "Timed popup for newsletter signup",
          fields: [
            defineField({
              name: "enabled",
              title: "Enabled",
              type: "boolean",
              initialValue: false,
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "message",
              title: "Message",
              type: "text",
              rows: 2,
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "image",
              title: "Image",
              type: "image",
              options: { hotspot: true },
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "placeholder",
              title: "Email Placeholder",
              type: "string",
              initialValue: "Enter your email",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "buttonText",
              title: "Button Text",
              type: "string",
              initialValue: "Subscribe",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "successMessage",
              title: "Success Message",
              type: "string",
              initialValue: "Thanks for subscribing!",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "trigger",
              title: "Trigger",
              type: "string",
              options: {
                list: [
                  { title: "Time Delay", value: "time-delay" },
                  { title: "Scroll Depth", value: "scroll-depth" },
                ],
              },
              initialValue: "time-delay",
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "triggerValue",
              title: "Trigger Value",
              type: "number",
              description: "Seconds for time-delay, percentage (0-100) for scroll-depth",
              initialValue: 10,
              hidden: ({ parent }) => !parent?.enabled,
            }),
            defineField({
              name: "showOnce",
              title: "Show Once Per Session",
              type: "boolean",
              initialValue: true,
              hidden: ({ parent }) => !parent?.enabled,
            }),
          ],
        }),
      ],
    }),

    // ─────────────────────────────────────────────
    // SEO & Social Settings
    // ─────────────────────────────────────────────
    defineField({
      name: "favicon",
      title: "Favicon",
      type: "image",
      group: "seo",
      description: "Upload a square image (recommended 32x32 or larger)",
    }),
    defineField({
      name: "ogImage",
      title: "Default Social Share Image",
      type: "image",
      group: "seo",
      description: "Default image for social media sharing (recommended 1200x630)",
      options: {
        hotspot: true,
      },
    }),

    // ─────────────────────────────────────────────
    // Legacy fields (kept for backwards compatibility)
    // ─────────────────────────────────────────────
    defineField({
      name: "logo",
      title: "Logo (Legacy)",
      type: "image",
      hidden: true,
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links (Legacy)",
      type: "array",
      hidden: true,
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              title: "Platform",
              type: "string",
            },
            {
              name: "url",
              title: "URL",
              type: "url",
            },
          ],
        },
      ],
    }),
    defineField({
      name: "footerText",
      title: "Footer Text (Legacy)",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "mainNavigation",
      title: "Main Navigation (Legacy)",
      type: "array",
      hidden: true,
      of: [
        {
          type: "object",
          fields: navLinkFields,
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
