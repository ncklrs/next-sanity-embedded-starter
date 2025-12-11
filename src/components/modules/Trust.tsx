"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { ArrowRightIcon } from "@/components/icons";

// ═══════════════════════════════════════════════════════════════════════════
// SHARED UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

function getBackgroundStyle(backgroundColor?: string): React.CSSProperties | undefined {
  if (!backgroundColor) return undefined;
  const colorMap: Record<string, string> = {
    white: "var(--background)",
    default: "var(--background)",
    gray: "var(--background-secondary)",
    secondary: "var(--background-secondary)",
    primary: "var(--background-tertiary)",
    tertiary: "var(--background-tertiary)",
    transparent: "transparent",
  };
  const mappedColor = colorMap[backgroundColor.toLowerCase()];
  return mappedColor ? { backgroundColor: mappedColor } : { backgroundColor };
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface Award {
  name: string;
  organization?: string;
  image: any; // Sanity image reference
  year?: string;
  link?: string;
}

export interface PressMention {
  name: string;
  logo: any; // Sanity image reference
  quote?: string;
  link?: string;
}

export interface CaseStudy {
  title: string;
  company?: string;
  logo?: any; // Sanity image reference
  image?: any; // Sanity image reference
  excerpt?: string;
  metric?: {
    value: string;
    label: string;
  };
  link?: string;
}

export interface Integration {
  name: string;
  logo: any; // Sanity image reference
  description?: string;
  category?: string;
  link?: string;
  featured?: boolean;
}

interface AwardsProps {
  title?: string;
  subtitle?: string;
  items: Award[];
  variant: "grid" | "inline" | "featured";
  columns?: 3 | 4 | 5;
  backgroundColor?: string;
  className?: string;
}

interface PressMentionsProps {
  title?: string;
  mentions: PressMention[];
  variant: "logos-only" | "with-quotes" | "carousel";
  backgroundColor?: string;
  className?: string;
}

interface CaseStudyCardsProps {
  title?: string;
  subtitle?: string;
  caseStudies: CaseStudy[];
  variant: "grid" | "featured" | "carousel";
  columns?: 2 | 3;
  backgroundColor?: string;
  className?: string;
}

interface IntegrationGridProps {
  title?: string;
  subtitle?: string;
  categories?: string[];
  integrations: Integration[];
  variant: "grid" | "categorized" | "searchable";
  columns?: 3 | 4 | 5 | 6;
  backgroundColor?: string;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const SectionHeader = ({
  title,
  subtitle,
  className = "",
}: {
  title?: string;
  subtitle?: string;
  className?: string;
}) => {
  if (!title && !subtitle) return null;

  return (
    <div className={`section-header ${className}`}>
      {title && <h2 className="display-lg mb-4">{title}</h2>}
      {subtitle && <p className="body-lg">{subtitle}</p>}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// 1. AWARDS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function Awards({
  title,
  subtitle,
  items,
  variant,
  columns = 4,
  backgroundColor,
  className = "",
}: AwardsProps) {
  const getGridColumns = () => {
    if (variant === "inline") return "";
    switch (columns) {
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
      case 5:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";
      default:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    }
  };

  const renderAwardCard = (award: Award, index: number, isFeatured = false) => {
    const content = (
      <div
        className={`group relative bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 transition-all duration-300 hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-lg ${
          isFeatured ? "lg:col-span-2 lg:row-span-2 lg:p-8" : ""
        }`}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Award Image/Badge */}
        <div className={`relative mx-auto mb-4 ${isFeatured ? "w-32 h-32" : "w-20 h-20"}`}>
          <Image
            src={urlFor(award.image).width(isFeatured ? 256 : 160).height(isFeatured ? 256 : 160).url()}
            alt={award.name}
            width={isFeatured ? 128 : 80}
            height={isFeatured ? 128 : 80}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Award Name */}
        <h3 className={`font-semibold text-[var(--foreground)] text-center mb-1 ${isFeatured ? "text-xl" : "text-base"}`}>
          {award.name}
        </h3>

        {/* Organization */}
        {award.organization && (
          <p className={`text-[var(--foreground-muted)] text-center ${isFeatured ? "text-base" : "text-sm"}`}>
            {award.organization}
          </p>
        )}

        {/* Year */}
        {award.year && (
          <p className={`text-[var(--foreground-subtle)] text-center mt-2 ${isFeatured ? "text-sm" : "text-xs"}`}>
            {award.year}
          </p>
        )}

        {/* Hover Arrow for linked items */}
        {award.link && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRightIcon className="w-4 h-4 text-[var(--accent-violet)]" />
          </div>
        )}
      </div>
    );

    if (award.link) {
      return (
        <a key={index} href={award.link} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      );
    }

    return <div key={index}>{content}</div>;
  };

  return (
    <section className={`section ${className}`} style={getBackgroundStyle(backgroundColor)}>
      <div className="container">
        <SectionHeader title={title} subtitle={subtitle} />

        {/* Grid Variant */}
        {variant === "grid" && (
          <div className={`grid gap-6 ${getGridColumns()}`}>
            {items.map((award, index) => renderAwardCard(award, index))}
          </div>
        )}

        {/* Inline Variant - Horizontal Scroll on Mobile */}
        {variant === "inline" && (
          <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex gap-6 lg:justify-center min-w-max lg:min-w-0 lg:flex-wrap">
              {items.map((award, index) => (
                <div key={index} className="flex-shrink-0 w-48">
                  {renderAwardCard(award, index)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Featured Variant - Larger First Item */}
        {variant === "featured" && (
          <div className={`grid gap-6 ${getGridColumns()}`}>
            {items.map((award, index) => renderAwardCard(award, index, index === 0))}
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. PRESS MENTIONS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function PressMentions({
  title,
  mentions,
  variant,
  backgroundColor,
  className = "",
}: PressMentionsProps) {
  // Duplicate mentions for seamless carousel
  const duplicatedMentions = variant === "carousel" ? [...mentions, ...mentions] : mentions;

  return (
    <section className={`section ${className}`} style={getBackgroundStyle(backgroundColor)}>
      <div className="container">
        {title && <SectionHeader title={title} />}

        {/* Logos Only Variant */}
        {variant === "logos-only" && (
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {mentions.map((mention, index) => {
              const logoContent = (
                <div className="group transition-all duration-300 grayscale opacity-60 hover:grayscale-0 hover:opacity-100">
                  <Image
                    src={urlFor(mention.logo).width(200).height(80).url()}
                    alt={mention.name}
                    width={150}
                    height={60}
                    className="h-10 md:h-12 w-auto object-contain"
                  />
                </div>
              );

              if (mention.link) {
                return (
                  <a
                    key={index}
                    href={mention.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {logoContent}
                  </a>
                );
              }

              return <div key={index}>{logoContent}</div>;
            })}
          </div>
        )}

        {/* With Quotes Variant */}
        {variant === "with-quotes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mentions.map((mention, index) => (
              <div
                key={index}
                className="group text-center"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Logo */}
                <div className="mb-4 grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300">
                  <Image
                    src={urlFor(mention.logo).width(200).height(80).url()}
                    alt={mention.name}
                    width={150}
                    height={60}
                    className="h-10 w-auto object-contain mx-auto"
                  />
                </div>

                {/* Quote */}
                {mention.quote && (
                  <blockquote className="text-sm text-[var(--foreground-muted)] italic">
                    "{mention.quote}"
                  </blockquote>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Carousel Variant - Infinite Scroll */}
        {variant === "carousel" && (
          <div className="relative overflow-hidden">
            <style jsx>{`
              @keyframes scroll {
                0% {
                  transform: translateX(0);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
              .animate-scroll {
                animation: scroll 30s linear infinite;
              }
              .pause-animation:hover .animate-scroll {
                animation-play-state: paused;
              }
            `}</style>

            <div className="pause-animation">
              <div className="flex animate-scroll">
                {duplicatedMentions.map((mention, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 mx-8 md:mx-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  >
                    <Image
                      src={urlFor(mention.logo).width(200).height(80).url()}
                      alt={mention.name}
                      width={150}
                      height={60}
                      className="h-10 md:h-12 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. CASE STUDY CARDS COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function CaseStudyCards({
  title,
  subtitle,
  caseStudies,
  variant,
  columns = 3,
  backgroundColor,
  className = "",
}: CaseStudyCardsProps) {
  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 md:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
    }
  };

  const renderCaseStudyCard = (caseStudy: CaseStudy, index: number, isLarge = false) => {
    const content = (
      <div
        className={`group relative bg-[var(--surface)] border border-[var(--border)] rounded-xl overflow-hidden transition-all duration-300 hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:-translate-y-2 hover:shadow-xl ${
          isLarge ? "lg:col-span-2" : ""
        }`}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Image */}
        {caseStudy.image && (
          <div className={`relative overflow-hidden ${isLarge ? "h-80" : "h-48"}`}>
            <Image
              src={urlFor(caseStudy.image).width(isLarge ? 800 : 600).height(isLarge ? 600 : 400).url()}
              alt={caseStudy.title}
              width={isLarge ? 800 : 600}
              height={isLarge ? 600 : 400}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60" />
          </div>
        )}

        {/* Content */}
        <div className={`p-6 ${isLarge ? "lg:p-8" : ""}`}>
          {/* Company Logo */}
          {caseStudy.logo && (
            <div className="mb-4">
              <Image
                src={urlFor(caseStudy.logo).width(120).height(40).url()}
                alt={caseStudy.company || caseStudy.title}
                width={120}
                height={40}
                className="h-8 w-auto object-contain opacity-80"
              />
            </div>
          )}

          {/* Title */}
          <h3 className={`font-bold text-[var(--foreground)] mb-2 ${isLarge ? "text-2xl" : "text-xl"}`}>
            {caseStudy.title}
          </h3>

          {/* Company */}
          {caseStudy.company && !caseStudy.logo && (
            <p className="text-sm text-[var(--foreground-subtle)] mb-3">{caseStudy.company}</p>
          )}

          {/* Excerpt */}
          {caseStudy.excerpt && (
            <p className="text-[var(--foreground-muted)] mb-4 line-clamp-3">{caseStudy.excerpt}</p>
          )}

          {/* Metric */}
          {caseStudy.metric && (
            <div className="mt-4 pt-4 border-t border-[var(--border)]">
              <div className="text-3xl font-bold text-[var(--accent-violet)] mb-1">
                {caseStudy.metric.value}
              </div>
              <div className="text-sm text-[var(--foreground-muted)]">{caseStudy.metric.label}</div>
            </div>
          )}

          {/* Link Arrow */}
          {caseStudy.link && (
            <div className="flex items-center gap-2 mt-4 text-sm font-semibold text-[var(--accent-violet)] opacity-0 group-hover:opacity-100 transition-opacity">
              Read case study
              <ArrowRightIcon className="w-4 h-4" />
            </div>
          )}
        </div>
      </div>
    );

    if (caseStudy.link) {
      return (
        <a key={index} href={caseStudy.link} className="block">
          {content}
        </a>
      );
    }

    return <div key={index}>{content}</div>;
  };

  return (
    <section className={`section ${className}`} style={getBackgroundStyle(backgroundColor)}>
      <div className="container">
        <SectionHeader title={title} subtitle={subtitle} />

        {/* Grid Variant */}
        {variant === "grid" && (
          <div className={`grid gap-6 lg:gap-8 ${getGridColumns()}`}>
            {caseStudies.map((caseStudy, index) => renderCaseStudyCard(caseStudy, index))}
          </div>
        )}

        {/* Featured Variant - One Large + Smaller */}
        {variant === "featured" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {caseStudies.map((caseStudy, index) => renderCaseStudyCard(caseStudy, index, index === 0))}
          </div>
        )}

        {/* Carousel Variant - Horizontal Scroll */}
        {variant === "carousel" && (
          <div className="overflow-x-auto -mx-4 px-4 lg:mx-0 lg:px-0">
            <div className="flex gap-6 min-w-max lg:min-w-0 lg:grid lg:grid-cols-3">
              {caseStudies.map((caseStudy, index) => (
                <div key={index} className="flex-shrink-0 w-80 lg:w-auto">
                  {renderCaseStudyCard(caseStudy, index)}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// 4. INTEGRATION GRID COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

export function IntegrationGrid({
  title,
  subtitle,
  categories,
  integrations,
  variant,
  columns = 4,
  backgroundColor,
  className = "",
}: IntegrationGridProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const getGridColumns = () => {
    switch (columns) {
      case 3:
        return "grid-cols-2 sm:grid-cols-3";
      case 4:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
      case 5:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5";
      case 6:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6";
      default:
        return "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";
    }
  };

  const filteredIntegrations = variant === "searchable"
    ? integrations.filter(
        (integration) =>
          integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          integration.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          integration.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : integrations;

  const groupedByCategory = variant === "categorized"
    ? categories?.reduce((acc, category) => {
        acc[category] = integrations.filter((int) => int.category === category);
        return acc;
      }, {} as Record<string, Integration[]>) || {}
    : {};

  const renderIntegrationCard = (integration: Integration, index: number) => {
    const content = (
      <div
        className={`group relative bg-[var(--surface)] border ${
          integration.featured ? "border-[var(--accent-violet)]" : "border-[var(--border)]"
        } rounded-xl p-6 transition-all duration-300 hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:-translate-y-1 hover:shadow-lg flex flex-col items-center text-center h-full`}
        style={{
          animationDelay: `${index * 50}ms`,
        }}
      >
        {/* Featured Badge */}
        {integration.featured && (
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] border border-[var(--accent-violet)]/20">
              Featured
            </span>
          </div>
        )}

        {/* Logo */}
        <div className="relative w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-110">
          <Image
            src={urlFor(integration.logo).width(128).height(128).url()}
            alt={integration.name}
            width={64}
            height={64}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Name */}
        <h3 className="font-semibold text-[var(--foreground)] mb-2">{integration.name}</h3>

        {/* Description */}
        {integration.description && (
          <p className="text-sm text-[var(--foreground-muted)] line-clamp-2 flex-1">
            {integration.description}
          </p>
        )}

        {/* Category Badge */}
        {integration.category && variant !== "categorized" && (
          <div className="mt-3">
            <span className="inline-flex items-center px-2 py-1 text-xs rounded-full bg-[var(--surface-elevated)] text-[var(--foreground-subtle)] border border-[var(--border)]">
              {integration.category}
            </span>
          </div>
        )}

        {/* Link Arrow */}
        {integration.link && (
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowRightIcon className="w-4 h-4 text-[var(--accent-violet)]" />
          </div>
        )}
      </div>
    );

    if (integration.link) {
      return (
        <a key={index} href={integration.link} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      );
    }

    return <div key={index}>{content}</div>;
  };

  return (
    <section className={`section ${className}`} style={getBackgroundStyle(backgroundColor)}>
      <div className="container">
        <SectionHeader title={title} subtitle={subtitle} />

        {/* Searchable Variant - Search Input */}
        {variant === "searchable" && (
          <div className="max-w-md mx-auto mb-12">
            <input
              type="text"
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-full text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--accent-violet)] focus:ring-2 focus:ring-[var(--accent-violet)]/20 transition-all"
            />
            {searchTerm && (
              <p className="text-sm text-[var(--foreground-muted)] mt-3 text-center">
                Found {filteredIntegrations.length} integration{filteredIntegrations.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        )}

        {/* Grid Variant */}
        {variant === "grid" && (
          <div className={`grid gap-6 ${getGridColumns()}`}>
            {integrations.map((integration, index) => renderIntegrationCard(integration, index))}
          </div>
        )}

        {/* Categorized Variant */}
        {variant === "categorized" && (
          <div className="space-y-12">
            {Object.entries(groupedByCategory).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-6">{category}</h3>
                <div className={`grid gap-6 ${getGridColumns()}`}>
                  {items.map((integration, index) => renderIntegrationCard(integration, index))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Searchable Variant */}
        {variant === "searchable" && (
          <div className={`grid gap-6 ${getGridColumns()}`}>
            {filteredIntegrations.map((integration, index) => renderIntegrationCard(integration, index))}
          </div>
        )}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// DEFAULT EXPORT
// ═══════════════════════════════════════════════════════════════════════════

export default {
  Awards,
  PressMentions,
  CaseStudyCards,
  IntegrationGrid,
};
