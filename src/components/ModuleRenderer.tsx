"use client";

import { HeroDefault, HeroCentered, HeroSplit, HeroVideo, HeroMinimal } from "./modules/Hero";
import { FeaturesGrid, FeaturesAlternating, FeaturesIconCards } from "./modules/Features";
import { PricingCards, PricingComparison, PricingSimple } from "./modules/Pricing";
import { TestimonialsGrid, TestimonialsCarousel, TestimonialsFeatured, TestimonialsCarouselLarge } from "./modules/Testimonials";
import { TeamGrid, TeamCards, TeamCompact } from "./modules/Team";
import { CTADefault, CTANewsletter, CTASplit, CTABanner, CTAStats } from "./modules/CTA";
import { SocialProofLogos, SocialProofStats } from "./modules/SocialProof";
import { LogoCloudSimple, LogoCloudMarquee, LogoCloudGrid } from "./modules/LogoCloud";
import { FAQAccordion, FAQTwoColumn, FAQWithCategories, FAQSimple } from "./modules/FAQ";
import { GalleryGrid, GalleryMasonry, GalleryCarousel } from "./modules/Gallery";
import { BlogFeaturedPost, BlogGrid, BlogList, BlogCarousel, BlogMinimal } from "./modules/BlogFeature";
import { FormContact, FormNewsletter, FormWithImage, FormMultiStep, FormDynamic } from "./modules/Form";
import { RichTextBlock, Quote, StatsCounter, ComparisonTable } from "./modules/Content";
import { VideoEmbed, BeforeAfter, CodeBlock, EmbedBlock } from "./modules/Media";
import { Tabs, Accordion, Steps, Timeline } from "./modules/Interactive";
import { AnnouncementBar, Countdown, StickyCta, Modal } from "./modules/Engagement";
import { Awards, PressMentions, CaseStudyCards, IntegrationGrid } from "./modules/Trust";
import { Spacer, AnchorPoint, Banner, DownloadCards, MultiColumn } from "./modules/Utility";

// Map of module type names to components
const moduleComponents: Record<string, React.ComponentType<any>> = {
  // Hero
  heroDefault: HeroDefault,
  heroCentered: HeroCentered,
  heroSplit: HeroSplit,
  heroVideo: HeroVideo,
  heroMinimal: HeroMinimal,
  // Features
  featuresGrid: FeaturesGrid,
  featuresAlternating: FeaturesAlternating,
  featuresIconCards: FeaturesIconCards,
  // Pricing
  pricingCards: PricingCards,
  pricingComparison: PricingComparison,
  pricingSimple: PricingSimple,
  // Testimonials
  testimonialsGrid: TestimonialsGrid,
  testimonialsCarousel: TestimonialsCarousel,
  testimonialsFeatured: TestimonialsFeatured,
  testimonialsCarouselLarge: TestimonialsCarouselLarge,
  // Team
  teamGrid: TeamGrid,
  teamCards: TeamCards,
  teamCompact: TeamCompact,
  // CTA
  ctaDefault: CTADefault,
  ctaNewsletter: CTANewsletter,
  ctaSplit: CTASplit,
  ctaBanner: CTABanner,
  ctaStats: CTAStats,
  // Social Proof
  socialProofLogos: SocialProofLogos,
  socialProofStats: SocialProofStats,
  // Logo Cloud
  logoCloudSimple: LogoCloudSimple,
  logoCloudMarquee: LogoCloudMarquee,
  logoCloudGrid: LogoCloudGrid,
  // FAQ
  faqAccordion: FAQAccordion,
  faqTwoColumn: FAQTwoColumn,
  faqWithCategories: FAQWithCategories,
  faqSimple: FAQSimple,
  // Gallery
  galleryGrid: GalleryGrid,
  galleryMasonry: GalleryMasonry,
  galleryCarousel: GalleryCarousel,
  // Blog Feature
  blogFeaturedPost: BlogFeaturedPost,
  blogGrid: BlogGrid,
  blogList: BlogList,
  blogCarousel: BlogCarousel,
  blogMinimal: BlogMinimal,
  // Form
  formContact: FormContact,
  formNewsletter: FormNewsletter,
  formWithImage: FormWithImage,
  formMultiStep: FormMultiStep,
  formDynamic: FormDynamic,
  // Content
  richTextBlock: RichTextBlock,
  quote: Quote,
  statsCounter: StatsCounter,
  comparisonTable: ComparisonTable,
  // Media
  videoEmbed: VideoEmbed,
  beforeAfter: BeforeAfter,
  codeBlock: CodeBlock,
  embedBlock: EmbedBlock,
  // Interactive
  tabs: Tabs,
  accordion: Accordion,
  steps: Steps,
  timeline: Timeline,
  // Engagement
  announcementBar: AnnouncementBar,
  countdown: Countdown,
  stickyCta: StickyCta,
  modal: Modal,
  // Trust
  awards: Awards,
  pressMentions: PressMentions,
  caseStudyCards: CaseStudyCards,
  integrationGrid: IntegrationGrid,
  // Utility
  spacer: Spacer,
  anchorPoint: AnchorPoint,
  banner: Banner,
  downloadCards: DownloadCards,
  multiColumn: MultiColumn,
};

interface Module {
  _type: string;
  _key: string;
  [key: string]: any;
}

interface ModuleRendererProps {
  modules: Module[];
}

export function ModuleRenderer({ modules }: ModuleRendererProps) {
  if (!modules || modules.length === 0) {
    return null;
  }

  return (
    <>
      {modules.map((module) => {
        const Component = moduleComponents[module._type];

        if (!Component) {
          console.warn(`Unknown module type: ${module._type}`);
          return null;
        }

        return <Component key={module._key} {...module} />;
      })}
    </>
  );
}

export default ModuleRenderer;
