import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "modules",
      title: "Page Modules",
      type: "array",
      group: "content",
      of: [
        // Hero sections
        { type: "heroDefault" },
        { type: "heroCentered" },
        { type: "heroSplit" },
        { type: "heroVideo" },
        { type: "heroMinimal" },
        // Features
        { type: "featuresGrid" },
        { type: "featuresAlternating" },
        { type: "featuresIconCards" },
        // Pricing
        { type: "pricingCards" },
        { type: "pricingComparison" },
        { type: "pricingSimple" },
        // Testimonials
        { type: "testimonialsGrid" },
        { type: "testimonialsCarousel" },
        { type: "testimonialsFeatured" },
        { type: "testimonialsCarouselLarge" },
        // Team
        { type: "teamGrid" },
        { type: "teamCards" },
        { type: "teamCompact" },
        // CTA
        { type: "ctaDefault" },
        { type: "ctaNewsletter" },
        { type: "ctaSplit" },
        { type: "ctaBanner" },
        { type: "ctaStats" },
        // Social Proof
        { type: "socialProofLogos" },
        { type: "socialProofStats" },
        // Logo Cloud
        { type: "logoCloudSimple" },
        { type: "logoCloudMarquee" },
        { type: "logoCloudGrid" },
        // FAQ
        { type: "faqAccordion" },
        { type: "faqTwoColumn" },
        { type: "faqWithCategories" },
        { type: "faqSimple" },
        // Gallery
        { type: "galleryGrid" },
        { type: "galleryMasonry" },
        { type: "galleryCarousel" },
        // Blog Feature
        { type: "blogFeaturedPost" },
        { type: "blogGrid" },
        { type: "blogList" },
        { type: "blogCarousel" },
        { type: "blogMinimal" },
        // Form
        { type: "formContact" },
        { type: "formNewsletter" },
        { type: "formWithImage" },
        { type: "formMultiStep" },
      ],
    }),
    // SEO fields in seo group
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
    },
    prepare({ title, slug }) {
      return {
        title,
        subtitle: slug ? `/${slug}` : "No slug",
      };
    },
  },
});
