"use client";

import { type ReactNode } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { ArrowRightIcon, CheckIcon, PlayIcon } from "@/components/icons";
import Image from "next/image";

// ═══════════════════════════════════════════════════════════════════════════
// SHARED TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface CTAButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
}

interface Company {
  name: string;
  logo: string;
  width?: number;
  height?: number;
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO DEFAULT
// ═══════════════════════════════════════════════════════════════════════════

export interface HeroDefaultProps {
  badge?: {
    text: string;
    variant?: "default" | "gradient" | "success" | "new";
  };
  heading: string;
  headingGradientText?: string;
  subheading: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  backgroundStyle?: "default" | "gradient-orbs" | "grid" | "particles";
  alignment?: "center" | "left";
}

export function HeroDefault({
  badge,
  heading,
  headingGradientText,
  subheading,
  primaryCTA,
  secondaryCTA,
  backgroundStyle = "gradient-orbs",
  alignment = "center",
}: HeroDefaultProps) {
  const isCenter = alignment === "center";

  return (
    <section className="hero">
      {/* Background Layer */}
      <div className="hero-background">
        {backgroundStyle === "gradient-orbs" && (
          <>
            <div className="hero-orb hero-orb-1" />
            <div className="hero-orb hero-orb-2" />
            <div className="hero-orb hero-orb-3" />
          </>
        )}
        {backgroundStyle === "grid" && <div className="grid-overlay" />}
        {backgroundStyle === "particles" && (
          <>
            <div className="grid-overlay" />
            <div className="hero-orb hero-orb-1" style={{ opacity: 0.2 }} />
          </>
        )}
        <div className="noise-overlay" />
      </div>

      {/* Content */}
      <div className="container">
        <div
          className={`max-w-5xl ${isCenter ? "mx-auto text-center" : ""}`}
          style={{ opacity: 0 }}
        >
          {badge && (
            <div
              className={`animate-fade-in ${isCenter ? "flex justify-center" : ""}`}
            >
              <Badge variant={badge.variant || "gradient"}>
                {badge.text}
              </Badge>
            </div>
          )}

          <h1
            className="display-xl mt-6 mb-6 animate-fade-in-up animate-delay-100"
            style={{ opacity: 0 }}
          >
            {headingGradientText ? (
              <>
                {heading.replace(headingGradientText, "").split(headingGradientText)[0]}
                <span className="text-gradient">{headingGradientText}</span>
                {heading.split(headingGradientText)[1]}
              </>
            ) : (
              heading
            )}
          </h1>

          <p
            className="body-lg max-w-3xl mb-10 animate-fade-in-up animate-delay-200"
            style={{ opacity: 0, marginLeft: isCenter ? "auto" : "0", marginRight: isCenter ? "auto" : "0" }}
          >
            {subheading}
          </p>

          <div
            className={`flex flex-wrap gap-4 animate-fade-in-up animate-delay-300 ${
              isCenter ? "justify-center" : ""
            }`}
            style={{ opacity: 0 }}
          >
            {primaryCTA && (
              <Button
                variant={primaryCTA.variant || "primary"}
                size="lg"
                onClick={primaryCTA.onClick}
                rightIcon={primaryCTA.icon || <ArrowRightIcon className="w-4 h-4" />}
              >
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button
                variant={secondaryCTA.variant || "secondary"}
                size="lg"
                onClick={secondaryCTA.onClick}
                rightIcon={secondaryCTA.icon}
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO CENTERED
// ═══════════════════════════════════════════════════════════════════════════

export interface HeroCenteredProps {
  badge?: {
    text: string;
    variant?: "default" | "gradient" | "success" | "new";
  };
  heading: string;
  headingGradientText?: string;
  subheading: string;
  buttons?: CTAButton[];
  companies?: Company[];
  companiesHeading?: string;
}

export function HeroCentered({
  badge,
  heading,
  headingGradientText,
  subheading,
  buttons = [],
  companies = [],
  companiesHeading = "Trusted by leading companies",
}: HeroCenteredProps) {
  return (
    <section className="hero">
      {/* Background */}
      <div className="hero-background">
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="noise-overlay" />
      </div>

      {/* Content */}
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <div className="animate-fade-in flex justify-center" style={{ opacity: 0 }}>
              <Badge variant={badge.variant || "gradient"}>
                {badge.text}
              </Badge>
            </div>
          )}

          <h1
            className="display-xl mt-6 mb-6 animate-fade-in-up animate-delay-100"
            style={{ opacity: 0 }}
          >
            {headingGradientText ? (
              <>
                {heading.replace(headingGradientText, "").split(headingGradientText)[0]}
                <span className="text-gradient">{headingGradientText}</span>
                {heading.split(headingGradientText)[1]}
              </>
            ) : (
              heading
            )}
          </h1>

          <p
            className="body-lg max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200"
            style={{ opacity: 0 }}
          >
            {subheading}
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center mb-16 animate-fade-in-up animate-delay-300"
            style={{ opacity: 0 }}
          >
            {buttons.map((button, index) => (
              <Button
                key={index}
                variant={button.variant || (index === 0 ? "primary" : "secondary")}
                size="lg"
                onClick={button.onClick}
                rightIcon={button.icon || (index === 0 ? <ArrowRightIcon className="w-4 h-4" /> : undefined)}
              >
                {button.label}
              </Button>
            ))}
          </div>

          {/* Logo Cloud */}
          {companies.length > 0 && (
            <div
              className="animate-fade-in-up animate-delay-400"
              style={{ opacity: 0 }}
            >
              <p className="body-sm mb-8 uppercase tracking-wider">
                {companiesHeading}
              </p>
              <div className="logo-cloud">
                {companies.map((company, index) => (
                  <Image
                    key={index}
                    src={company.logo}
                    alt={company.name}
                    width={company.width || 120}
                    height={company.height || 40}
                    className="opacity-50 grayscale hover:opacity-70 hover:grayscale-0 transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO SPLIT
// ═══════════════════════════════════════════════════════════════════════════

export interface HeroSplitProps {
  badge?: {
    text: string;
    variant?: "default" | "gradient" | "success" | "new";
  };
  heading: string;
  headingGradientText?: string;
  subheading: string;
  features?: Array<{
    icon?: ReactNode;
    text: string;
  }>;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  imagePosition?: "left" | "right";
}

export function HeroSplit({
  badge,
  heading,
  headingGradientText,
  subheading,
  features = [],
  primaryCTA,
  secondaryCTA,
  image,
  imagePosition = "right",
}: HeroSplitProps) {
  const imageOnLeft = imagePosition === "left";

  return (
    <section className="section min-h-screen flex items-center relative overflow-hidden">
      {/* Background */}
      <div className="hero-background">
        <div className="grid-overlay" />
        <div className="noise-overlay" />
      </div>

      <div className="container">
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${imageOnLeft ? "lg:flex-row-reverse" : ""}`}>
          {/* Content Side */}
          <div className={`${imageOnLeft ? "lg:order-2" : ""}`} style={{ opacity: 0 }}>
            {badge && (
              <div className="animate-fade-in">
                <Badge variant={badge.variant || "gradient"}>
                  {badge.text}
                </Badge>
              </div>
            )}

            <h1
              className="display-lg mt-6 mb-6 animate-fade-in-up animate-delay-100"
              style={{ opacity: 0 }}
            >
              {headingGradientText ? (
                <>
                  {heading.replace(headingGradientText, "").split(headingGradientText)[0]}
                  <span className="text-gradient">{headingGradientText}</span>
                  {heading.split(headingGradientText)[1]}
                </>
              ) : (
                heading
              )}
            </h1>

            <p
              className="body-lg mb-8 animate-fade-in-up animate-delay-200"
              style={{ opacity: 0 }}
            >
              {subheading}
            </p>

            {features.length > 0 && (
              <ul
                className="space-y-4 mb-10 animate-fade-in-up animate-delay-300"
                style={{ opacity: 0 }}
              >
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--gradient-primary-soft)] flex items-center justify-center text-[var(--accent-violet)] mt-0.5">
                      {feature.icon || <CheckIcon className="w-3.5 h-3.5" />}
                    </span>
                    <span className="text-[var(--foreground)] text-lg">
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div
              className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-400"
              style={{ opacity: 0 }}
            >
              {primaryCTA && (
                <Button
                  variant={primaryCTA.variant || "primary"}
                  size="lg"
                  onClick={primaryCTA.onClick}
                  rightIcon={primaryCTA.icon || <ArrowRightIcon className="w-4 h-4" />}
                >
                  {primaryCTA.label}
                </Button>
              )}
              {secondaryCTA && (
                <Button
                  variant={secondaryCTA.variant || "secondary"}
                  size="lg"
                  onClick={secondaryCTA.onClick}
                  rightIcon={secondaryCTA.icon}
                >
                  {secondaryCTA.label}
                </Button>
              )}
            </div>
          </div>

          {/* Image Side */}
          <div
            className={`relative animate-fade-in-up animate-delay-200 ${imageOnLeft ? "lg:order-1" : ""}`}
            style={{ opacity: 0 }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] glow-cyan">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width || 800}
                height={image.height || 600}
                className="w-full h-auto"
                priority
              />
            </div>
            {/* Decorative gradient orb behind image */}
            <div
              className="absolute -z-10 w-[120%] h-[120%] -top-[10%] -left-[10%] rounded-full blur-[120px] opacity-20"
              style={{ background: "var(--gradient-primary)" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO VIDEO
// ═══════════════════════════════════════════════════════════════════════════

export interface HeroVideoProps {
  badge?: {
    text: string;
    variant?: "default" | "gradient" | "success" | "new";
  };
  heading: string;
  headingGradientText?: string;
  subheading: string;
  primaryCTA?: CTAButton;
  secondaryCTA?: CTAButton;
  video: {
    src: string;
    poster?: string;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
  };
  overlayOpacity?: number;
}

export function HeroVideo({
  badge,
  heading,
  headingGradientText,
  subheading,
  primaryCTA,
  secondaryCTA,
  video,
  overlayOpacity = 0.6,
}: HeroVideoProps) {
  return (
    <section className="hero">
      {/* Video Background */}
      <div className="hero-background">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={video.src}
          poster={video.poster}
          autoPlay={video.autoplay !== false}
          loop={video.loop !== false}
          muted={video.muted !== false}
          playsInline
        />
        {/* Dark Overlay */}
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: overlayOpacity }}
        />
        <div className="noise-overlay" />
      </div>

      {/* Content */}
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {badge && (
            <div className="animate-fade-in flex justify-center" style={{ opacity: 0 }}>
              <Badge variant={badge.variant || "gradient"}>
                {badge.text}
              </Badge>
            </div>
          )}

          <h1
            className="display-xl mt-6 mb-6 animate-fade-in-up animate-delay-100"
            style={{ opacity: 0 }}
          >
            {headingGradientText ? (
              <>
                {heading.replace(headingGradientText, "").split(headingGradientText)[0]}
                <span className="text-gradient">{headingGradientText}</span>
                {heading.split(headingGradientText)[1]}
              </>
            ) : (
              heading
            )}
          </h1>

          <p
            className="body-lg max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200"
            style={{ opacity: 0 }}
          >
            {subheading}
          </p>

          <div
            className="flex flex-wrap gap-4 justify-center animate-fade-in-up animate-delay-300"
            style={{ opacity: 0 }}
          >
            {primaryCTA && (
              <Button
                variant={primaryCTA.variant || "primary"}
                size="lg"
                onClick={primaryCTA.onClick}
                rightIcon={primaryCTA.icon || <ArrowRightIcon className="w-4 h-4" />}
              >
                {primaryCTA.label}
              </Button>
            )}
            {secondaryCTA && (
              <Button
                variant={secondaryCTA.variant || "secondary"}
                size="lg"
                onClick={secondaryCTA.onClick}
                leftIcon={secondaryCTA.icon || <PlayIcon className="w-4 h-4" />}
              >
                {secondaryCTA.label}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// HERO MINIMAL
// ═══════════════════════════════════════════════════════════════════════════

export interface HeroMinimalProps {
  announcement?: {
    text: string;
    link?: {
      label: string;
      href: string;
    };
  };
  heading: string;
  headingGradientText?: string;
  subheading: string;
  cta?: CTAButton;
  showBackground?: boolean;
}

export function HeroMinimal({
  announcement,
  heading,
  headingGradientText,
  subheading,
  cta,
  showBackground = true,
}: HeroMinimalProps) {
  return (
    <section className="hero">
      {/* Minimal Background */}
      {showBackground && (
        <div className="hero-background">
          <div className="grid-overlay" style={{ opacity: 0.3 }} />
          <div className="noise-overlay" />
        </div>
      )}

      {/* Content */}
      <div className="container">
        <div className="max-w-4xl mx-auto text-center">
          {announcement && (
            <div
              className="animate-fade-in flex justify-center mb-8"
              style={{ opacity: 0 }}
            >
              <div className="glass-card px-6 py-3 inline-flex items-center gap-3">
                <span className="text-sm text-[var(--foreground-muted)]">
                  {announcement.text}
                </span>
                {announcement.link && (
                  <>
                    <span className="w-px h-4 bg-[var(--border)]" />
                    <a
                      href={announcement.link.href}
                      className="text-sm font-medium text-[var(--accent-cyan)] hover:text-[var(--accent-violet)] transition-colors inline-flex items-center gap-1"
                    >
                      {announcement.link.label}
                      <ArrowRightIcon className="w-3 h-3" />
                    </a>
                  </>
                )}
              </div>
            </div>
          )}

          <h1
            className="display-xl mb-6 animate-fade-in-up animate-delay-100"
            style={{ opacity: 0 }}
          >
            {headingGradientText ? (
              <>
                {heading.replace(headingGradientText, "").split(headingGradientText)[0]}
                <span className="text-gradient">{headingGradientText}</span>
                {heading.split(headingGradientText)[1]}
              </>
            ) : (
              heading
            )}
          </h1>

          <p
            className="body-lg max-w-2xl mx-auto mb-10 animate-fade-in-up animate-delay-200"
            style={{ opacity: 0 }}
          >
            {subheading}
          </p>

          {cta && (
            <div
              className="animate-fade-in-up animate-delay-300 flex justify-center"
              style={{ opacity: 0 }}
            >
              <Button
                variant={cta.variant || "primary"}
                size="lg"
                onClick={cta.onClick}
                rightIcon={cta.icon || <ArrowRightIcon className="w-4 h-4" />}
              >
                {cta.label}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════

// All components are already exported inline above
