/**
 * Module Query Projections
 *
 * Explicit field projections for each module type to avoid over-querying.
 * Using explicit projections instead of spread operators ensures:
 * - Smaller payload sizes
 * - No accidental exposure of sensitive/internal fields
 * - Better performance and caching
 */

// Shared field projections for common patterns
const buttonFields = `{
  text,
  link,
  variant
}`;

const imageFields = `{
  asset->{
    _id,
    url,
    metadata{ dimensions }
  },
  alt,
  hotspot,
  crop
}`;

const spacingRef = `spacing->{
  _id,
  paddingTop,
  paddingBottom
}`;

const backgroundColorRef = `backgroundColor->{
  _id,
  value
}`;

// Hero module projections
const heroDefaultProjection = `{
  _type,
  _key,
  badge{ text, variant },
  heading,
  headingHighlight,
  subheading,
  buttons[]${buttonFields},
  backgroundStyle,
  alignment,
  spacing,
  backgroundColor
}`;

const heroCenteredProjection = `{
  _type,
  _key,
  badge{ text, variant },
  heading,
  headingHighlight,
  subheading,
  buttons[]${buttonFields},
  trustedByText,
  trustedByLogos[]{ asset->{ _id, url }, alt, companyName },
  spacing,
  backgroundColor
}`;

const heroSplitProjection = `{
  _type,
  _key,
  heading,
  headingHighlight,
  subheading,
  buttons[]${buttonFields},
  image${imageFields},
  imagePosition,
  features[]{ icon, text },
  spacing,
  backgroundColor
}`;

const heroVideoProjection = `{
  _type,
  _key,
  heading,
  headingHighlight,
  subheading,
  videoUrl,
  videoPoster${imageFields},
  buttons[]${buttonFields},
  overlay,
  spacing,
  backgroundColor
}`;

const heroMinimalProjection = `{
  _type,
  _key,
  heading,
  headingHighlight,
  subheading,
  announcement{ text, link },
  buttons[]${buttonFields},
  spacing,
  backgroundColor
}`;

// Features module projections
const featuresGridProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  features[]{ icon, title, description },
  columns,
  spacing,
  backgroundColor
}`;

const featuresAlternatingProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  items[]{
    heading,
    description,
    image${imageFields},
    features[]
  },
  spacing,
  backgroundColor
}`;

const featuresIconCardsProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  features[]{
    icon,
    title,
    description,
    link{ text, url }
  },
  spacing,
  backgroundColor
}`;

// Pricing module projections
const pricingCardsProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  plans[]{
    name,
    description,
    price,
    priceUnit,
    features[],
    buttonText,
    buttonLink,
    highlighted
  },
  spacing,
  backgroundColor
}`;

const pricingComparisonProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  features[],
  plans[]{
    name,
    price,
    priceUnit,
    featureValues[],
    buttonText,
    buttonLink,
    highlighted
  },
  spacing,
  backgroundColor
}`;

const pricingSimpleProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  price,
  priceUnit,
  features[],
  buttonText,
  buttonLink,
  spacing,
  backgroundColor
}`;

// Testimonials module projections
const testimonialFields = `{
  quote,
  author,
  role,
  company,
  avatar${imageFields},
  rating
}`;

const testimonialsGridProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  testimonials[]${testimonialFields},
  columns,
  spacing,
  backgroundColor
}`;

const testimonialsCarouselProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  testimonials[]${testimonialFields},
  autoplay,
  spacing,
  backgroundColor
}`;

const testimonialsFeaturedProjection = `{
  _type,
  _key,
  testimonial${testimonialFields},
  companyLogo${imageFields},
  spacing,
  backgroundColor
}`;

const testimonialsCarouselLargeProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  testimonials[]${testimonialFields},
  spacing,
  backgroundColor
}`;

// Team module projections
const teamMemberFields = `{
  name,
  role,
  bio,
  image${imageFields},
  socialLinks[]{ platform, url }
}`;

const teamGridProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  members[]${teamMemberFields},
  columns,
  spacing,
  backgroundColor
}`;

const teamCardsProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  members[]${teamMemberFields},
  spacing,
  backgroundColor
}`;

const teamCompactProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  members[]{ name, role, image${imageFields} },
  spacing,
  backgroundColor
}`;

// CTA module projections
const ctaDefaultProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  buttons[]${buttonFields},
  note,
  spacing,
  backgroundColor
}`;

const ctaNewsletterProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  placeholder,
  buttonText,
  note,
  spacing,
  backgroundColor
}`;

const ctaSplitProjection = `{
  _type,
  _key,
  heading,
  headingHighlight,
  subheading,
  image${imageFields},
  buttons[]${buttonFields},
  features[],
  spacing,
  backgroundColor
}`;

const ctaBannerProjection = `{
  _type,
  _key,
  heading,
  button${buttonFields},
  backgroundStyle,
  backgroundImage${imageFields},
  spacing,
  backgroundColor
}`;

const ctaStatsProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  stats[]{ value, label },
  buttons[]${buttonFields},
  spacing,
  backgroundColor
}`;

// Social Proof module projections
const socialProofLogosProjection = `{
  _type,
  _key,
  heading,
  logos[]{ asset, alt, companyName },
  style,
  spacing,
  backgroundColor
}`;

const socialProofStatsProjection = `{
  _type,
  _key,
  heading,
  stats[]{ value, label, prefix, suffix },
  spacing,
  backgroundColor
}`;

// Logo Cloud module projections
const logoCloudSimpleProjection = `{
  _type,
  _key,
  heading,
  logos[]{ asset, alt, companyName, url },
  spacing,
  backgroundColor
}`;

const logoCloudMarqueeProjection = `{
  _type,
  _key,
  heading,
  logos[]{ asset, alt, companyName, url },
  speed,
  direction,
  spacing,
  backgroundColor
}`;

const logoCloudGridProjection = `{
  _type,
  _key,
  heading,
  logos[]{ asset, alt, companyName, url },
  columns,
  spacing,
  backgroundColor
}`;

// FAQ module projections
const faqItemFields = `{ question, answer }`;

const faqAccordionProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  items[]${faqItemFields},
  spacing,
  backgroundColor
}`;

const faqTwoColumnProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  items[]${faqItemFields},
  spacing,
  backgroundColor
}`;

const faqWithCategoriesProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  categories[]{
    name,
    items[]${faqItemFields}
  },
  spacing,
  backgroundColor
}`;

const faqSimpleProjection = `{
  _type,
  _key,
  heading,
  items[]${faqItemFields},
  spacing,
  backgroundColor
}`;

// Gallery module projections
const galleryImageFields = `{
  asset,
  alt,
  caption,
  hotspot,
  crop
}`;

const galleryGridProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  images[]${galleryImageFields},
  columns,
  spacing,
  backgroundColor
}`;

const galleryMasonryProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  images[]${galleryImageFields},
  spacing,
  backgroundColor
}`;

const galleryCarouselProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  images[]${galleryImageFields},
  autoplay,
  spacing,
  backgroundColor
}`;

// Blog Feature module projections
const blogPostRef = `->{
  _id,
  title,
  slug,
  excerpt,
  featuredImage${imageFields},
  publishedAt
}`;

const blogFeaturedPostProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  post${blogPostRef},
  spacing,
  backgroundColor
}`;

const blogGridProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  posts[]${blogPostRef},
  columns,
  showMoreLink,
  moreText,
  spacing,
  backgroundColor
}`;

const blogListProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  posts[]${blogPostRef},
  showMoreLink,
  moreText,
  spacing,
  backgroundColor
}`;

const blogCarouselProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  posts[]${blogPostRef},
  autoplay,
  spacing,
  backgroundColor
}`;

const blogMinimalProjection = `{
  _type,
  _key,
  heading,
  posts[]${blogPostRef},
  showMoreLink,
  moreText,
  spacing,
  backgroundColor
}`;

// Form module projections
const formFieldsProjection = `fields[]{
  _key,
  name,
  label,
  type,
  required,
  placeholder,
  helpText,
  defaultValue,
  width,
  options[]{ label, value },
  rows,
  accept,
  multiple,
  validation
}`;

const formContactProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  form->{
    _id,
    name,
    ${formFieldsProjection},
    settings
  },
  spacing,
  backgroundColor
}`;

const formNewsletterProjection = `{
  _type,
  _key,
  heading,
  subheading,
  note,
  form->{
    _id,
    name,
    ${formFieldsProjection},
    settings
  },
  spacing,
  backgroundColor
}`;

const formWithImageProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  image${imageFields},
  imagePosition,
  form->{
    _id,
    name,
    ${formFieldsProjection},
    settings
  },
  spacing,
  backgroundColor
}`;

const formMultiStepProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  steps[]{
    title,
    description,
    ${formFieldsProjection}
  },
  submitText,
  successMessage,
  showProgressBar,
  spacing,
  backgroundColor
}`;

const formDynamicProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  layout,
  maxWidth,
  form->{
    _id,
    name,
    identifier,
    ${formFieldsProjection},
    settings
  },
  spacing,
  backgroundColor
}`;

// Trust module projections
const awardsProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  awards[]{
    title,
    organization,
    year,
    image${imageFields}
  },
  spacing,
  backgroundColor
}`;

const pressMentionsProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  mentions[]{
    publication,
    quote,
    logo${imageFields},
    url
  },
  spacing,
  backgroundColor
}`;

const caseStudyCardsProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  caseStudies[]{
    title,
    description,
    image${imageFields},
    stats[]{ value, label },
    link
  },
  spacing,
  backgroundColor
}`;

const integrationGridProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  integrations[]{
    name,
    description,
    icon${imageFields},
    url
  },
  columns,
  spacing,
  backgroundColor
}`;

// Content module projections
const richTextBlockProjection = `{
  _type,
  _key,
  title,
  content[],
  alignment,
  maxWidth,
  spacing,
  backgroundColor
}`;

const quoteProjection = `{
  _type,
  _key,
  quote,
  author,
  role,
  company,
  avatar${imageFields},
  style,
  spacing,
  backgroundColor
}`;

const statsCounterProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  stats[]{
    value,
    label,
    prefix,
    suffix,
    animateOnView
  },
  columns,
  spacing,
  backgroundColor
}`;

const comparisonTableProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  columns[]{
    header,
    highlighted
  },
  rows[]{
    feature,
    values[]
  },
  spacing,
  backgroundColor
}`;

// Media module projections
const videoEmbedProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  videoUrl,
  poster${imageFields},
  autoplay,
  loop,
  spacing,
  backgroundColor
}`;

const beforeAfterProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  beforeImage${imageFields},
  afterImage${imageFields},
  beforeLabel,
  afterLabel,
  spacing,
  backgroundColor
}`;

const codeBlockProjection = `{
  _type,
  _key,
  title,
  language,
  code,
  showLineNumbers,
  highlightLines[],
  spacing,
  backgroundColor
}`;

const embedBlockProjection = `{
  _type,
  _key,
  title,
  embedCode,
  aspectRatio,
  spacing,
  backgroundColor
}`;

// Interactive module projections
const tabsProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  tabs[]{
    title,
    icon,
    content[]
  },
  spacing,
  backgroundColor
}`;

const accordionProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  items[]{
    title,
    content[]
  },
  allowMultiple,
  spacing,
  backgroundColor
}`;

const stepsProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  steps[]{
    title,
    description,
    icon
  },
  orientation,
  spacing,
  backgroundColor
}`;

const timelineProjection = `{
  _type,
  _key,
  badge,
  heading,
  headingHighlight,
  subheading,
  items[]{
    date,
    title,
    description,
    icon
  },
  spacing,
  backgroundColor
}`;

// Engagement module projections
const announcementBarProjection = `{
  _type,
  _key,
  text,
  link,
  linkText,
  dismissible,
  backgroundColor
}`;

const countdownProjection = `{
  _type,
  _key,
  title,
  subtitle,
  targetDate,
  expiredMessage,
  showDays,
  showHours,
  showMinutes,
  showSeconds,
  button${buttonFields},
  variant,
  backgroundColor
}`;

const stickyCtaProjection = `{
  _type,
  _key,
  text,
  buttonText,
  buttonLink,
  showAfterScroll,
  position,
  backgroundColor
}`;

const modalProjection = `{
  _type,
  _key,
  id,
  title,
  content[],
  formModule,
  image${imageFields},
  button${buttonFields},
  trigger,
  triggerValue,
  showOnce,
  variant
}`;

// Utility module projections
const spacerProjection = `{
  _type,
  _key,
  size,
  showDivider,
  dividerStyle,
  backgroundColor
}`;

const anchorPointProjection = `{
  _type,
  _key,
  id,
  label
}`;

const bannerProjection = `{
  _type,
  _key,
  title,
  message,
  type,
  icon,
  link {
    text,
    url
  },
  dismissible,
  variant
}`;

const downloadCardsProjection = `{
  _type,
  _key,
  title,
  subtitle,
  downloads[]{
    title,
    description,
    image${imageFields},
    file{ asset->{ _id, url } },
    fileUrl,
    fileType,
    fileSize,
    gated
  },
  variant,
  columns,
  backgroundColor
}`;

const multiColumnProjection = `{
  _type,
  _key,
  columns,
  columnGap,
  verticalAlignment,
  columnContent[]{
    _key,
    width,
    modules[]{
      _type,
      _key,
      // Content modules
      _type == "richTextBlock" => ${richTextBlockProjection},
      _type == "quote" => ${quoteProjection},
      _type == "statsCounter" => ${statsCounterProjection},
      // Media modules
      _type == "videoEmbed" => ${videoEmbedProjection},
      _type == "codeBlock" => ${codeBlockProjection},
      _type == "beforeAfter" => ${beforeAfterProjection},
      // Interactive
      _type == "tabs" => ${tabsProjection},
      _type == "accordion" => ${accordionProjection},
      _type == "steps" => ${stepsProjection},
      _type == "timeline" => ${timelineProjection},
      // CTA
      _type == "cta.default" => ${ctaDefaultProjection},
      _type == "cta.newsletter" => ${ctaNewsletterProjection},
      // Trust
      _type == "awards" => ${awardsProjection},
      _type == "integrationGrid" => ${integrationGridProjection},
      // Forms
      _type == "formContact" => ${formContactProjection},
      _type == "formNewsletter" => ${formNewsletterProjection},
      // Utility
      _type == "spacer" => ${spacerProjection}
    }
  },
  backgroundColor,
  reverseOnMobile
}`;

/**
 * Combined module projection that handles all module types
 * Uses select() to apply the correct projection based on _type
 */
export const moduleProjection = `{
  _type,
  _key,
  // Select the appropriate fields based on module type
  _type == "heroDefault" => ${heroDefaultProjection},
  _type == "heroCentered" => ${heroCenteredProjection},
  _type == "heroSplit" => ${heroSplitProjection},
  _type == "heroVideo" => ${heroVideoProjection},
  _type == "heroMinimal" => ${heroMinimalProjection},
  _type == "featuresGrid" => ${featuresGridProjection},
  _type == "featuresAlternating" => ${featuresAlternatingProjection},
  _type == "featuresIconCards" => ${featuresIconCardsProjection},
  _type == "pricingCards" => ${pricingCardsProjection},
  _type == "pricingComparison" => ${pricingComparisonProjection},
  _type == "pricingSimple" => ${pricingSimpleProjection},
  _type == "testimonialsGrid" => ${testimonialsGridProjection},
  _type == "testimonialsCarousel" => ${testimonialsCarouselProjection},
  _type == "testimonialsFeatured" => ${testimonialsFeaturedProjection},
  _type == "testimonialsCarouselLarge" => ${testimonialsCarouselLargeProjection},
  _type == "teamGrid" => ${teamGridProjection},
  _type == "teamCards" => ${teamCardsProjection},
  _type == "teamCompact" => ${teamCompactProjection},
  _type == "cta.default" => ${ctaDefaultProjection},
  _type == "cta.newsletter" => ${ctaNewsletterProjection},
  _type == "cta.split" => ${ctaSplitProjection},
  _type == "cta.banner" => ${ctaBannerProjection},
  _type == "cta.stats" => ${ctaStatsProjection},
  _type == "socialProof.logos" => ${socialProofLogosProjection},
  _type == "socialProof.stats" => ${socialProofStatsProjection},
  _type == "logoCloudSimple" => ${logoCloudSimpleProjection},
  _type == "logoCloudMarquee" => ${logoCloudMarqueeProjection},
  _type == "logoCloudGrid" => ${logoCloudGridProjection},
  _type == "faqAccordion" => ${faqAccordionProjection},
  _type == "faqTwoColumn" => ${faqTwoColumnProjection},
  _type == "faqWithCategories" => ${faqWithCategoriesProjection},
  _type == "faqSimple" => ${faqSimpleProjection},
  _type == "galleryGrid" => ${galleryGridProjection},
  _type == "galleryMasonry" => ${galleryMasonryProjection},
  _type == "galleryCarousel" => ${galleryCarouselProjection},
  _type == "blogFeaturedPost" => ${blogFeaturedPostProjection},
  _type == "blogGrid" => ${blogGridProjection},
  _type == "blogList" => ${blogListProjection},
  _type == "blogCarousel" => ${blogCarouselProjection},
  _type == "blogMinimal" => ${blogMinimalProjection},
  _type == "formContact" => ${formContactProjection},
  _type == "formNewsletter" => ${formNewsletterProjection},
  _type == "formWithImage" => ${formWithImageProjection},
  _type == "formMultiStep" => ${formMultiStepProjection},
  _type == "formDynamic" => ${formDynamicProjection},
  _type == "awards" => ${awardsProjection},
  _type == "pressMentions" => ${pressMentionsProjection},
  _type == "caseStudyCards" => ${caseStudyCardsProjection},
  _type == "integrationGrid" => ${integrationGridProjection},
  _type == "richTextBlock" => ${richTextBlockProjection},
  _type == "quote" => ${quoteProjection},
  _type == "statsCounter" => ${statsCounterProjection},
  _type == "comparisonTable" => ${comparisonTableProjection},
  _type == "videoEmbed" => ${videoEmbedProjection},
  _type == "beforeAfter" => ${beforeAfterProjection},
  _type == "codeBlock" => ${codeBlockProjection},
  _type == "embedBlock" => ${embedBlockProjection},
  _type == "tabs" => ${tabsProjection},
  _type == "accordion" => ${accordionProjection},
  _type == "steps" => ${stepsProjection},
  _type == "timeline" => ${timelineProjection},
  _type == "announcementBar" => ${announcementBarProjection},
  _type == "countdown" => ${countdownProjection},
  _type == "stickyCta" => ${stickyCtaProjection},
  _type == "modal" => ${modalProjection},
  _type == "spacer" => ${spacerProjection},
  _type == "anchorPoint" => ${anchorPointProjection},
  _type == "banner" => ${bannerProjection},
  _type == "downloadCards" => ${downloadCardsProjection},
  _type == "multiColumn" => ${multiColumnProjection}
}`;

// Export individual projections for reuse
export const moduleProjections = {
  // Hero
  heroDefault: heroDefaultProjection,
  heroCentered: heroCenteredProjection,
  heroSplit: heroSplitProjection,
  heroVideo: heroVideoProjection,
  heroMinimal: heroMinimalProjection,
  // Features
  featuresGrid: featuresGridProjection,
  featuresAlternating: featuresAlternatingProjection,
  featuresIconCards: featuresIconCardsProjection,
  // Pricing
  pricingCards: pricingCardsProjection,
  pricingComparison: pricingComparisonProjection,
  pricingSimple: pricingSimpleProjection,
  // Testimonials
  testimonialsGrid: testimonialsGridProjection,
  testimonialsCarousel: testimonialsCarouselProjection,
  testimonialsFeatured: testimonialsFeaturedProjection,
  testimonialsCarouselLarge: testimonialsCarouselLargeProjection,
  // Team
  teamGrid: teamGridProjection,
  teamCards: teamCardsProjection,
  teamCompact: teamCompactProjection,
  // CTA
  ctaDefault: ctaDefaultProjection,
  ctaNewsletter: ctaNewsletterProjection,
  ctaSplit: ctaSplitProjection,
  ctaBanner: ctaBannerProjection,
  ctaStats: ctaStatsProjection,
  // Social Proof
  socialProofLogos: socialProofLogosProjection,
  socialProofStats: socialProofStatsProjection,
  // Logo Cloud
  logoCloudSimple: logoCloudSimpleProjection,
  logoCloudMarquee: logoCloudMarqueeProjection,
  logoCloudGrid: logoCloudGridProjection,
  // FAQ
  faqAccordion: faqAccordionProjection,
  faqTwoColumn: faqTwoColumnProjection,
  faqWithCategories: faqWithCategoriesProjection,
  faqSimple: faqSimpleProjection,
  // Gallery
  galleryGrid: galleryGridProjection,
  galleryMasonry: galleryMasonryProjection,
  galleryCarousel: galleryCarouselProjection,
  // Blog Feature
  blogFeaturedPost: blogFeaturedPostProjection,
  blogGrid: blogGridProjection,
  blogList: blogListProjection,
  blogCarousel: blogCarouselProjection,
  blogMinimal: blogMinimalProjection,
  // Form
  formContact: formContactProjection,
  formNewsletter: formNewsletterProjection,
  formWithImage: formWithImageProjection,
  formMultiStep: formMultiStepProjection,
  formDynamic: formDynamicProjection,
  // Trust
  awards: awardsProjection,
  pressMentions: pressMentionsProjection,
  caseStudyCards: caseStudyCardsProjection,
  integrationGrid: integrationGridProjection,
  // Content
  richTextBlock: richTextBlockProjection,
  quote: quoteProjection,
  statsCounter: statsCounterProjection,
  comparisonTable: comparisonTableProjection,
  // Media
  videoEmbed: videoEmbedProjection,
  beforeAfter: beforeAfterProjection,
  codeBlock: codeBlockProjection,
  embedBlock: embedBlockProjection,
  // Interactive
  tabs: tabsProjection,
  accordion: accordionProjection,
  steps: stepsProjection,
  timeline: timelineProjection,
  // Engagement
  announcementBar: announcementBarProjection,
  countdown: countdownProjection,
  stickyCta: stickyCtaProjection,
  modal: modalProjection,
  // Utility
  spacer: spacerProjection,
  anchorPoint: anchorPointProjection,
  banner: bannerProjection,
  downloadCards: downloadCardsProjection,
  multiColumn: multiColumnProjection,
};

// Export shared fields for use in other queries
export const sharedFields = {
  button: buttonFields,
  image: imageFields,
  spacing: spacingRef,
  backgroundColor: backgroundColorRef,
  formFields: formFieldsProjection,
};
