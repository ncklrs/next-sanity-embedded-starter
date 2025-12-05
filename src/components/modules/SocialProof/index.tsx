"use client";

import { forwardRef, useEffect, useRef, useState, type HTMLAttributes } from "react";
import Image from "next/image";

// TypeScript Interfaces
export interface Logo {
  name: string;
  image: string;
  url?: string;
  width?: number;
  height?: number;
}

export interface Stat {
  value: string | number;
  label: string;
  description?: string;
  suffix?: string;
  prefix?: string;
}

interface SocialProofLogosProps extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  heading?: string;
  logos: Logo[];
  style?: "grayscale" | "color" | "hover-reveal";
  backgroundColor?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
}

interface SocialProofStatsProps extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  heading?: string;
  stats: Stat[];
  style?: "cards" | "inline" | "minimal";
  animated?: boolean;
  backgroundColor?: string;
  spacing?: "sm" | "md" | "lg" | "xl";
}

// Counter Animation Hook
function useCountUp(end: number, duration: number = 2000, enabled: boolean = true) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!enabled || hasStarted) return;

    setHasStarted(true);
    const startTime = Date.now();
    const endValue = end;

    if (isNaN(endValue)) {
      setCount(end);
      return;
    }

    const timer = setInterval(() => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = Math.floor(easeOutQuart * endValue);

      setCount(currentCount);

      if (progress === 1) {
        clearInterval(timer);
        setCount(endValue);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, enabled, hasStarted]);

  return count;
}

// Intersection Observer Hook
function useInView(options: IntersectionObserverInit = {}) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return { ref, isInView };
}

// Section Header Component
function SectionHeader({ heading, className = "" }: { heading?: string; className?: string }) {
  if (!heading) return null;

  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className="heading-lg">{heading}</h2>
    </div>
  );
}

// SocialProofLogos - Company logos display
export const SocialProofLogos = forwardRef<HTMLElement, SocialProofLogosProps>(
  (
    {
      heading,
      logos,
      style = "grayscale",
      backgroundColor,
      spacing = "lg",
      className = "",
      ...props
    },
    ref
  ) => {
    const spacingMap = {
      sm: "py-12 px-6",
      md: "py-16 px-6",
      lg: "py-20 px-8",
      xl: "py-24 px-8",
    };

    const styleClasses = {
      grayscale: "grayscale opacity-60 hover:grayscale-0 hover:opacity-100",
      color: "opacity-80 hover:opacity-100",
      "hover-reveal": "grayscale opacity-50 hover:grayscale-0 hover:opacity-100",
    };

    return (
      <section
        ref={ref}
        className={`section ${spacingMap[spacing]} ${className}`}
        style={backgroundColor ? { backgroundColor } : undefined}
        {...props}
      >
        <div className="container">
          <SectionHeader heading={heading} />

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 md:gap-x-16 lg:gap-x-20">
            {logos.map((logo, index) => {
              const LogoContent = (
                <div
                  className={`relative transition-all duration-300 ${styleClasses[style]}`}
                  style={{
                    width: logo.width || "auto",
                    height: logo.height || 48,
                  }}
                >
                  <Image
                    src={logo.image}
                    alt={`${logo.name} logo`}
                    width={logo.width || 120}
                    height={logo.height || 48}
                    className="object-contain"
                  />
                </div>
              );

              return logo.url ? (
                <a
                  key={index}
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block"
                  aria-label={logo.name}
                >
                  {LogoContent}
                </a>
              ) : (
                <div key={index} className="inline-block">
                  {LogoContent}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    );
  }
);

SocialProofLogos.displayName = "SocialProofLogos";

// Animated Stat Component
function AnimatedStat({
  stat,
  animated,
  isInView,
}: {
  stat: Stat;
  animated: boolean;
  isInView: boolean;
}) {
  const numericValue = typeof stat.value === "string" ? parseFloat(stat.value) : stat.value;
  const isNumeric = !isNaN(numericValue);
  const animatedValue = useCountUp(numericValue, 2000, animated && isInView && isNumeric);

  const displayValue = animated && isNumeric && isInView ? animatedValue : stat.value;

  return (
    <>
      {stat.prefix && (
        <span className="stat-value inline">{stat.prefix}</span>
      )}
      <span className="stat-value">{displayValue}</span>
      {stat.suffix && (
        <span className="stat-value inline">{stat.suffix}</span>
      )}
    </>
  );
}

// SocialProofStats - Statistics display with multiple styles
export const SocialProofStats = forwardRef<HTMLElement, SocialProofStatsProps>(
  (
    {
      heading,
      stats,
      style = "cards",
      animated = true,
      backgroundColor,
      spacing = "lg",
      className = "",
      ...props
    },
    ref
  ) => {
    const { ref: inViewRef, isInView } = useInView({ threshold: 0.3 });

    const spacingMap = {
      sm: "py-12 px-6",
      md: "py-16 px-6",
      lg: "py-20 px-8",
      xl: "py-24 px-8",
    };

    // Cards Style - Each stat in a glass card
    if (style === "cards") {
      return (
        <section
          ref={ref}
          className={`section ${spacingMap[spacing]} ${className}`}
          style={backgroundColor ? { backgroundColor } : undefined}
          {...props}
        >
          <div className="container" ref={inViewRef}>
            <SectionHeader heading={heading} />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="glass-card text-center p-8 group hover:scale-105 transition-transform duration-300"
                >
                  <div className="mb-3">
                    <AnimatedStat stat={stat} animated={animated} isInView={isInView} />
                  </div>
                  <div className="stat-label mb-2">{stat.label}</div>
                  {stat.description && (
                    <p className="text-[var(--foreground-muted)] text-sm leading-relaxed">
                      {stat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    // Inline Style - Horizontal row of stats
    if (style === "inline") {
      return (
        <section
          ref={ref}
          className={`section ${spacingMap[spacing]} ${className}`}
          style={backgroundColor ? { backgroundColor } : undefined}
          {...props}
        >
          <div className="container" ref={inViewRef}>
            <SectionHeader heading={heading} />

            <div className="glass-card p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border)]">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="text-center pt-6 sm:pt-0 first:pt-0 sm:px-6 first:pl-0 last:pr-0"
                  >
                    <div className="mb-2">
                      <AnimatedStat stat={stat} animated={animated} isInView={isInView} />
                    </div>
                    <div className="stat-label mb-1">{stat.label}</div>
                    {stat.description && (
                      <p className="text-[var(--foreground-subtle)] text-xs leading-relaxed max-w-[200px] mx-auto">
                        {stat.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    }

    // Minimal Style - Just numbers, clean and simple
    return (
      <section
        ref={ref}
        className={`section ${spacingMap[spacing]} ${className}`}
        style={backgroundColor ? { backgroundColor } : undefined}
        {...props}
      >
        <div className="container" ref={inViewRef}>
          <SectionHeader heading={heading} />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="mb-2">
                  <AnimatedStat stat={stat} animated={animated} isInView={isInView} />
                </div>
                <div className="text-[var(--foreground-muted)] text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
                {stat.description && (
                  <p className="text-[var(--foreground-subtle)] text-xs mt-2 leading-relaxed">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

SocialProofStats.displayName = "SocialProofStats";

// Default export
export default {
  SocialProofLogos,
  SocialProofStats,
};
