import { defineField, defineType } from "sanity";

export const subscriber = defineType({
  name: "subscriber",
  title: "Subscriber",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      description: "Where the subscription came from",
      options: {
        list: [
          { title: "Website", value: "website" },
          { title: "Blog", value: "blog" },
          { title: "Landing Page", value: "landing" },
          { title: "Footer", value: "footer" },
          { title: "Popup", value: "popup" },
          { title: "Manual", value: "manual" },
        ],
      },
    }),
    defineField({
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Unsubscribed", value: "unsubscribed" },
          { title: "Bounced", value: "bounced" },
        ],
      },
      initialValue: "active",
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
  ],
  orderings: [
    {
      title: "Newest First",
      name: "subscribedAtDesc",
      by: [{ field: "subscribedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      email: "email",
      status: "status",
      source: "source",
      date: "subscribedAt",
    },
    prepare({ email, status, source, date }) {
      const statusEmoji = {
        active: "✅",
        unsubscribed: "❌",
        bounced: "⚠️",
      }[status as string] || "⚪";

      return {
        title: `${statusEmoji} ${email}`,
        subtitle: `${source || "website"} • ${date ? new Date(date).toLocaleDateString() : ""}`,
      };
    },
  },
});
