"use client";

import Badge from "../../ui/Badge";
import type { FeaturesGridProps } from "./types";
import {
  getSpacingClass,
  getBackgroundClass,
  getGridColumnsClass,
  renderIcon,
  splitTextWithGradient,
} from "./utils";

export default function FeaturesGrid({
  section,
  features,
  columns = 3,
  spacing = "lg",
  backgroundColor = "default",
}: FeaturesGridProps) {
  const { beforeGradient, gradientPart, afterGradient } = splitTextWithGradient(
    section.heading,
    section.headingGradient
  );

  return (
    <section className={`section ${getSpacingClass(spacing)} ${getBackgroundClass(backgroundColor)}`}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          {section.badge && (
            <Badge variant="gradient" className="mb-4">
              {section.badge}
            </Badge>
          )}
          <h2 className="heading-lg mb-4">
            {beforeGradient}
            {gradientPart && <span className="text-gradient">{gradientPart}</span>}
            {afterGradient}
          </h2>
          {section.subheading && <p className="body-lg">{section.subheading}</p>}
        </div>

        {/* Features Grid */}
        <div className={`feature-grid grid gap-6 ${getGridColumnsClass(columns)}`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Icon */}
              {feature.icon && (
                <div className="feature-icon">
                  {renderIcon(feature.icon, {
                    className: "w-6 h-6",
                    "aria-hidden": "true",
                  })}
                </div>
              )}

              {/* Content */}
              <h3 className="heading-md mb-3 text-[var(--foreground)]">{feature.title}</h3>
              <p className="body-lg">{feature.description}</p>

              {/* Optional Link */}
              {feature.link && (
                <a
                  href={feature.link.href}
                  className="inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] transition-colors"
                >
                  {feature.link.text}
                  {renderIcon("arrowRight", {
                    className: "w-4 h-4",
                    "aria-hidden": "true",
                  })}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
