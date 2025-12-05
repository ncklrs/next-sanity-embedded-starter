/**
 * Demo Page - Hero Component Showcase
 *
 * This file demonstrates how to use all Hero component variations
 * in a real Next.js page. Use this as a reference for implementation.
 */

"use client";

import { useState } from "react";
import {
  HeroDefault,
  HeroCentered,
  HeroSplit,
  HeroVideo,
  HeroMinimal,
} from "./index";

type HeroVariant = "default" | "centered" | "split" | "video" | "minimal";

export default function HeroDemoPage() {
  const [activeVariant, setActiveVariant] = useState<HeroVariant>("default");

  const variants: { value: HeroVariant; label: string }[] = [
    { value: "default", label: "Default" },
    { value: "centered", label: "Centered" },
    { value: "split", label: "Split" },
    { value: "video", label: "Video" },
    { value: "minimal", label: "Minimal" },
  ];

  return (
    <div className="min-h-screen">
      {/* Variant Selector */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass-card px-4 py-2">
        <div className="flex gap-2">
          {variants.map((variant) => (
            <button
              key={variant.value}
              onClick={() => setActiveVariant(variant.value)}
              className={`btn btn-sm ${
                activeVariant === variant.value
                  ? "btn-primary"
                  : "btn-secondary"
              }`}
            >
              {variant.label}
            </button>
          ))}
        </div>
      </div>

      {/* Render Active Variant */}
      {activeVariant === "default" && <DefaultVariant />}
      {activeVariant === "centered" && <CenteredVariant />}
      {activeVariant === "split" && <SplitVariant />}
      {activeVariant === "video" && <VideoVariant />}
      {activeVariant === "minimal" && <MinimalVariant />}
    </div>
  );
}

// Individual variant implementations
function DefaultVariant() {
  return (
    <HeroDefault
      badge={{ text: "New Release v2.0", variant: "gradient" }}
      heading="Build the future with "
      headingGradientText="Aurora"
      subheading="The modern design system for ambitious teams building exceptional products. Ship faster with pre-built components and a cohesive design language."
      primaryCTA={{
        label: "Get Started Free",
        onClick: () => alert("Primary CTA clicked!"),
      }}
      secondaryCTA={{
        label: "View Documentation",
        onClick: () => alert("Secondary CTA clicked!"),
      }}
      backgroundStyle="gradient-orbs"
      alignment="center"
    />
  );
}

function CenteredVariant() {
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
          onClick: () => alert("Start trial clicked!"),
        },
        {
          label: "Schedule Demo",
          variant: "secondary",
          onClick: () => alert("Schedule demo clicked!"),
        },
        {
          label: "View Pricing",
          variant: "ghost",
          onClick: () => alert("View pricing clicked!"),
        },
      ]}
      companies={[
        {
          name: "Vercel",
          logo: "https://vercel.com/api/www/avatar/?u=vercel&s=96",
          width: 120,
          height: 40,
        },
        {
          name: "GitHub",
          logo: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
          width: 40,
          height: 40,
        },
        {
          name: "Next.js",
          logo: "https://vercel.com/api/www/avatar/?u=nextjs&s=96",
          width: 120,
          height: 40,
        },
      ]}
      companiesHeading="Trusted by leading companies worldwide"
    />
  );
}

function SplitVariant() {
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
        onClick: () => alert("Get started clicked!"),
      }}
      secondaryCTA={{
        label: "Learn More",
        onClick: () => alert("Learn more clicked!"),
      }}
      image={{
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        alt: "Analytics Dashboard",
        width: 800,
        height: 600,
      }}
      imagePosition="right"
    />
  );
}

function VideoVariant() {
  return (
    <HeroVideo
      badge={{ text: "Watch Demo", variant: "gradient" }}
      heading="See Aurora "
      headingGradientText="in action"
      subheading="Watch how leading teams use Aurora to build beautiful products faster than ever before."
      primaryCTA={{
        label: "Get Started Free",
        onClick: () => alert("Get started clicked!"),
      }}
      secondaryCTA={{
        label: "Watch Full Demo",
        onClick: () => alert("Watch demo clicked!"),
      }}
      video={{
        src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
        poster: "https://images.unsplash.com/photo-1557821552-17105176677c?w=1920&h=1080&fit=crop",
        autoplay: true,
        loop: true,
        muted: true,
      }}
      overlayOpacity={0.7}
    />
  );
}

function MinimalVariant() {
  return (
    <HeroMinimal
      announcement={{
        text: "🎉 Announcing Aurora 2.0 - Now with enhanced performance",
        link: {
          label: "Read the announcement",
          href: "#announcement",
        },
      }}
      heading="Ship faster with "
      headingGradientText="Aurora"
      subheading="The design system that grows with your team. Start building beautiful products today."
      cta={{
        label: "Get Started Free",
        variant: "primary",
        onClick: () => alert("Get started clicked!"),
      }}
      showBackground={true}
    />
  );
}

/**
 * Example: Using Hero components in a standard Next.js page
 *
 * app/page.tsx or pages/index.tsx
 */
export function HomePageExample() {
  return (
    <main>
      <HeroDefault
        badge={{ text: "New Release", variant: "gradient" }}
        heading="Welcome to Aurora"
        headingGradientText="Aurora"
        subheading="The modern design system for building beautiful products."
        primaryCTA={{
          label: "Get Started",
          onClick: () => console.log("Navigate to /get-started"),
        }}
        secondaryCTA={{
          label: "Learn More",
          onClick: () => console.log("Navigate to /docs"),
        }}
      />

      {/* Rest of your page content */}
    </main>
  );
}

/**
 * Example: Using with Next.js routing
 */
export function HomePageWithRouting() {
  const router = typeof window !== "undefined" ? window.location : null;

  return (
    <HeroDefault
      badge={{ text: "New Release", variant: "gradient" }}
      heading="Welcome to Aurora"
      headingGradientText="Aurora"
      subheading="The modern design system for building beautiful products."
      primaryCTA={{
        label: "Get Started",
        onClick: () => {
          // Use Next.js router or standard navigation
          window.location.href = "/get-started";
        },
      }}
      secondaryCTA={{
        label: "Learn More",
        onClick: () => {
          window.location.href = "/docs";
        },
      }}
    />
  );
}

/**
 * Example: Dynamic content from CMS
 */
export function HeroWithCMSData({ heroData }: { heroData: any }) {
  // Map CMS data to Hero component props
  const variant = heroData.variant || "default";

  if (variant === "default") {
    return (
      <HeroDefault
        badge={heroData.badge}
        heading={heroData.heading}
        headingGradientText={heroData.headingGradient}
        subheading={heroData.subheading}
        primaryCTA={heroData.primaryCTA}
        secondaryCTA={heroData.secondaryCTA}
        backgroundStyle={heroData.backgroundStyle || "gradient-orbs"}
        alignment={heroData.alignment || "center"}
      />
    );
  }

  if (variant === "split") {
    return (
      <HeroSplit
        badge={heroData.badge}
        heading={heroData.heading}
        headingGradientText={heroData.headingGradient}
        subheading={heroData.subheading}
        features={heroData.features}
        primaryCTA={heroData.primaryCTA}
        secondaryCTA={heroData.secondaryCTA}
        image={heroData.image}
        imagePosition={heroData.imagePosition || "right"}
      />
    );
  }

  // Add other variants as needed
  return null;
}
