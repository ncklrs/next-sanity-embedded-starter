"use client";

import {
  HeroDefault,
  HeroCentered,
  HeroSplit,
  HeroVideo,
  HeroMinimal,
} from "./index";

/**
 * Example usage of all Hero component variations
 * These can be used as references for implementation
 */

export function HeroDefaultExample() {
  return (
    <HeroDefault
      badge={{ text: "New Release v2.0", variant: "gradient" }}
      heading="Build the future with "
      headingGradientText="Aurora"
      subheading="The modern design system for ambitious teams building exceptional products. Ship faster with pre-built components and a cohesive design language."
      primaryCTA={{
        label: "Get Started Free",
        onClick: () => console.log("Primary CTA clicked"),
      }}
      secondaryCTA={{
        label: "View Documentation",
        onClick: () => console.log("Secondary CTA clicked"),
      }}
      backgroundStyle="gradient-orbs"
      alignment="center"
    />
  );
}

export function HeroCenteredExample() {
  return (
    <HeroCentered
      badge={{ text: "Trusted by 10,000+ teams", variant: "new" }}
      heading="The platform that "
      headingGradientText="teams love"
      subheading="Join thousands of companies already building with Aurora. Start shipping faster with our modern design system and component library."
      buttons={[
        {
          label: "Start Free Trial",
          variant: "primary",
          onClick: () => console.log("Start trial"),
        },
        {
          label: "Schedule Demo",
          variant: "secondary",
          onClick: () => console.log("Schedule demo"),
        },
        {
          label: "View Pricing",
          variant: "ghost",
          onClick: () => console.log("View pricing"),
        },
      ]}
      companies={[
        { name: "Acme Corp", logo: "/logos/acme.svg", width: 120, height: 40 },
        { name: "TechCo", logo: "/logos/techco.svg", width: 120, height: 40 },
        { name: "StartupXYZ", logo: "/logos/startup.svg", width: 120, height: 40 },
        { name: "GlobalInc", logo: "/logos/global.svg", width: 120, height: 40 },
      ]}
      companiesHeading="Trusted by leading companies worldwide"
    />
  );
}

export function HeroSplitExample() {
  return (
    <HeroSplit
      badge={{ text: "Product Launch 2025", variant: "success" }}
      heading="Everything you need to "
      headingGradientText="scale"
      subheading="Built for teams that move fast and ship quality products. Aurora provides the tools and components you need to succeed."
      features={[
        { text: "Lightning-fast performance with optimized components" },
        { text: "Enterprise-grade security and compliance" },
        { text: "99.9% uptime SLA guarantee" },
        { text: "24/7 premium support for your team" },
      ]}
      primaryCTA={{
        label: "Get Started",
        onClick: () => console.log("Get started"),
      }}
      secondaryCTA={{
        label: "Learn More",
        onClick: () => console.log("Learn more"),
      }}
      image={{
        src: "/hero-product.png",
        alt: "Product Dashboard Interface",
        width: 800,
        height: 600,
      }}
      imagePosition="right"
    />
  );
}

export function HeroSplitReversedExample() {
  return (
    <HeroSplit
      badge={{ text: "New Feature", variant: "gradient" }}
      heading="Collaborate in "
      headingGradientText="real-time"
      subheading="Work together seamlessly with your team. Real-time collaboration features make building together effortless."
      features={[
        { text: "Live collaborative editing" },
        { text: "Comment and feedback tools" },
        { text: "Version history and rollback" },
      ]}
      primaryCTA={{
        label: "Try Collaboration",
        onClick: () => console.log("Try collaboration"),
      }}
      image={{
        src: "/hero-collaboration.png",
        alt: "Real-time Collaboration",
        width: 800,
        height: 600,
      }}
      imagePosition="left"
    />
  );
}

export function HeroVideoExample() {
  return (
    <HeroVideo
      badge={{ text: "Watch Demo", variant: "gradient" }}
      heading="See Aurora "
      headingGradientText="in action"
      subheading="Watch how leading teams use Aurora to build beautiful products faster than ever before."
      primaryCTA={{
        label: "Get Started Free",
        onClick: () => console.log("Get started"),
      }}
      secondaryCTA={{
        label: "Watch Full Demo",
        onClick: () => console.log("Watch demo"),
      }}
      video={{
        src: "/videos/hero-background.mp4",
        poster: "/videos/hero-poster.jpg",
        autoplay: true,
        loop: true,
        muted: true,
      }}
      overlayOpacity={0.6}
    />
  );
}

export function HeroMinimalExample() {
  return (
    <HeroMinimal
      announcement={{
        text: "🎉 Announcing Aurora 2.0 - Now with enhanced performance",
        link: {
          label: "Read the announcement",
          href: "/blog/aurora-2-0",
        },
      }}
      heading="Ship faster with "
      headingGradientText="Aurora"
      subheading="The design system that grows with your team. Start building beautiful products today."
      cta={{
        label: "Get Started Free",
        variant: "primary",
        onClick: () => console.log("Get started"),
      }}
      showBackground={true}
    />
  );
}

export function HeroMinimalCleanExample() {
  return (
    <HeroMinimal
      heading="Simple. Powerful. "
      headingGradientText="Beautiful."
      subheading="Everything you need to build exceptional products. Nothing you don't."
      cta={{
        label: "Start Building",
        variant: "primary",
        onClick: () => console.log("Start building"),
      }}
      showBackground={false}
    />
  );
}

// Export all examples as a collection for easy testing
export const HeroExamples = {
  Default: HeroDefaultExample,
  Centered: HeroCenteredExample,
  Split: HeroSplitExample,
  SplitReversed: HeroSplitReversedExample,
  Video: HeroVideoExample,
  Minimal: HeroMinimalExample,
  MinimalClean: HeroMinimalCleanExample,
};
