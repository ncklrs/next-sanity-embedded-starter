"use client";

import { useState } from "react";

// Types
export interface Logo {
  src: string;
  alt: string;
  href?: string;
  width?: number;
  height?: number;
}

interface BaseLogoCloudProps {
  logos: Logo[];
  heading?: string;
  subheading?: string;
  badge?: string;
  backgroundColor?: string;
  className?: string;
}

interface LogoCloudSimpleProps extends BaseLogoCloudProps {
  style?: "grayscale" | "color" | "hover-reveal";
}

interface LogoCloudMarqueeProps extends BaseLogoCloudProps {
  speed?: "slow" | "medium" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

interface LogoCloudGridProps extends BaseLogoCloudProps {
  columns?: 4 | 5 | 6;
  enableLinks?: boolean;
}

// LogoCloudSimple Component
export function LogoCloudSimple({
  logos,
  heading,
  subheading,
  style = "hover-reveal",
  backgroundColor,
  className = "",
}: LogoCloudSimpleProps) {
  const getLogoClass = () => {
    switch (style) {
      case "grayscale":
        return "grayscale opacity-60 hover:opacity-80";
      case "color":
        return "opacity-80 hover:opacity-100";
      case "hover-reveal":
        return "grayscale opacity-60 hover:grayscale-0 hover:opacity-100";
      default:
        return "";
    }
  };

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl font-bold text-white mb-2">{heading}</h2>
            )}
            {subheading && (
              <p className="text-gray-400 text-lg">{subheading}</p>
            )}
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
          {logos.map((logo, index) => (
            <div
              key={index}
              className={`transition-all duration-300 ${getLogoClass()}`}
            >
              {logo.href ? (
                <a
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 md:h-12 w-auto object-contain"
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-10 md:h-12 w-auto object-contain"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// LogoCloudMarquee Component
export function LogoCloudMarquee({
  logos,
  heading,
  subheading,
  speed = "medium",
  direction = "left",
  pauseOnHover = true,
  backgroundColor,
  className = "",
}: LogoCloudMarqueeProps) {
  const getAnimationDuration = () => {
    switch (speed) {
      case "slow":
        return "40s";
      case "medium":
        return "25s";
      case "fast":
        return "15s";
      default:
        return "25s";
    }
  };

  const animationDirection = direction === "left" ? "normal" : "reverse";

  // Duplicate logos for seamless loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        {(heading || subheading) && (
          <div className="text-center mb-12">
            {heading && (
              <h2 className="text-3xl font-bold text-white mb-2">{heading}</h2>
            )}
            {subheading && (
              <p className="text-gray-400 text-lg">{subheading}</p>
            )}
          </div>
        )}

        <div className="relative">
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
              animation: scroll ${getAnimationDuration()} linear infinite;
              animation-direction: ${animationDirection};
            }
            .pause-animation:hover .animate-scroll {
              animation-play-state: ${pauseOnHover ? "paused" : "running"};
            }
          `}</style>

          <div className={pauseOnHover ? "pause-animation" : ""}>
            <div className="flex animate-scroll">
              {duplicatedLogos.map((logo, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 mx-8 md:mx-12 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="h-10 md:h-12 w-auto object-contain"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// LogoCloudGrid Component
export function LogoCloudGrid({
  logos,
  heading,
  subheading,
  badge,
  columns = 4,
  enableLinks = true,
  backgroundColor,
  className = "",
}: LogoCloudGridProps) {
  const getGridCols = () => {
    switch (columns) {
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

  return (
    <section
      className={`py-16 px-4 sm:px-6 lg:px-8 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="max-w-7xl mx-auto">
        {(badge || heading || subheading) && (
          <div className="text-center mb-12">
            {badge && (
              <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
                {badge}
              </span>
            )}
            {heading && (
              <h2 className="text-3xl font-bold text-white mb-2">{heading}</h2>
            )}
            {subheading && (
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${getGridCols()} gap-6`}>
          {logos.map((logo, index) => {
            const content = (
              <div className="flex items-center justify-center h-full p-6 bg-white/5 border border-white/10 rounded-lg transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/10 backdrop-blur-sm">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="h-12 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            );

            if (enableLinks && logo.href) {
              return (
                <a
                  key={index}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={index} className="block">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Default export with all variants
export default {
  Simple: LogoCloudSimple,
  Marquee: LogoCloudMarquee,
  Grid: LogoCloudGrid,
};
