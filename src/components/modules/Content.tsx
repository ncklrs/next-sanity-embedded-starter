"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Image from "next/image";
import { QuoteIcon, CheckIcon, XIcon } from "@/components/icons";

// ═══════════════════════════════════════════════════════════════════════════
// SHARED TYPES
// ═══════════════════════════════════════════════════════════════════════════

interface BaseProps {
  backgroundColor?: "default" | "secondary" | "tertiary";
  className?: string;
}

type PortableTextContent = any; // Use proper Sanity portable text type in production

// ═══════════════════════════════════════════════════════════════════════════
// RICH TEXT BLOCK COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface RichTextBlockProps extends BaseProps {
  title?: string;
  content: PortableTextContent;
  alignment?: "left" | "center";
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full";
}

export function RichTextBlock({
  title,
  content,
  alignment = "left",
  maxWidth = "lg",
  backgroundColor = "default",
  className = "",
}: RichTextBlockProps) {
  const bgMap = {
    default: "var(--background)",
    secondary: "var(--background-secondary)",
    tertiary: "var(--background-tertiary)",
  };

  const maxWidthMap = {
    sm: "max-w-2xl",
    md: "max-w-3xl",
    lg: "max-w-4xl",
    xl: "max-w-5xl",
    full: "max-w-full",
  };

  const alignmentClasses = alignment === "center" ? "mx-auto text-center" : "";

  const portableTextComponents: PortableTextComponents = {
    block: {
      h1: ({ children }) => (
        <h1 className="display-lg mb-6 mt-12 first:mt-0">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="heading-lg mb-5 mt-10 first:mt-0">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="heading-md mb-4 mt-8 first:mt-0">{children}</h3>
      ),
      h4: ({ children }) => (
        <h4 className="text-xl font-semibold mb-3 mt-6 text-[var(--foreground)]">
          {children}
        </h4>
      ),
      normal: ({ children }) => (
        <p className="body-lg mb-6 leading-relaxed text-[var(--foreground-muted)]">
          {children}
        </p>
      ),
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-[var(--accent-violet)] pl-6 my-8 italic text-[var(--foreground)]">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="space-y-3 mb-6 pl-6 list-disc marker:text-[var(--accent-cyan)]">
          {children}
        </ul>
      ),
      number: ({ children }) => (
        <ol className="space-y-3 mb-6 pl-6 list-decimal marker:text-[var(--accent-cyan)]">
          {children}
        </ol>
      ),
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="text-[var(--foreground-muted)] pl-2">{children}</li>
      ),
      number: ({ children }) => (
        <li className="text-[var(--foreground-muted)] pl-2">{children}</li>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-semibold text-[var(--foreground)]">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ children, value }) => (
        <a
          href={value?.href}
          className="text-[var(--accent-cyan)] hover:text-[var(--accent-violet)] transition-colors underline decoration-1 underline-offset-2"
          target={value?.blank ? "_blank" : undefined}
          rel={value?.blank ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      ),
      code: ({ children }) => (
        <code className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border)] text-sm font-mono text-[var(--accent-cyan)]">
          {children}
        </code>
      ),
    },
  };

  return (
    <section
      className={`section py-20 px-6 ${className}`}
      style={{ backgroundColor: bgMap[backgroundColor] }}
    >
      <div className={`container mx-auto ${maxWidthMap[maxWidth]} ${alignmentClasses}`}>
        {title && (
          <h2 className="display-lg mb-12 text-[var(--foreground)]">{title}</h2>
        )}
        <div className={alignment === "left" ? "prose-dark" : ""}>
          <PortableText value={content} components={portableTextComponents} />
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// QUOTE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface QuoteProps extends BaseProps {
  quote: string;
  attribution?: string;
  role?: string;
  image?: {
    src: string;
    alt: string;
  };
  variant?: "simple" | "large" | "with-image";
}

export function Quote({
  quote,
  attribution,
  role,
  image,
  variant = "simple",
  backgroundColor = "default",
  className = "",
}: QuoteProps) {
  const bgMap = {
    default: "var(--background)",
    secondary: "var(--background-secondary)",
    tertiary: "var(--background-tertiary)",
  };

  if (variant === "simple") {
    return (
      <section
        className={`section py-16 px-6 ${className}`}
        style={{ backgroundColor: bgMap[backgroundColor] }}
      >
        <div className="container mx-auto max-w-3xl">
          <blockquote className="relative">
            <div className="text-[var(--accent-violet)] opacity-20 mb-4">
              <QuoteIcon className="w-12 h-12" />
            </div>
            <p className="text-xl md:text-2xl leading-relaxed text-[var(--foreground)] mb-6 italic">
              {quote}
            </p>
            {attribution && (
              <footer className="flex items-center gap-2">
                <div className="h-px flex-1 bg-[var(--border)]" />
                <div className="text-right">
                  <cite className="not-italic font-medium text-[var(--foreground)]">
                    {attribution}
                  </cite>
                  {role && (
                    <p className="text-sm text-[var(--foreground-muted)] mt-1">{role}</p>
                  )}
                </div>
              </footer>
            )}
          </blockquote>
        </div>
      </section>
    );
  }

  if (variant === "large") {
    return (
      <section
        className={`section py-24 px-6 relative overflow-hidden ${className}`}
        style={{ backgroundColor: bgMap[backgroundColor] }}
      >
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <QuoteIcon className="absolute top-10 left-10 w-64 h-64 text-[var(--accent-violet)]" />
          <QuoteIcon className="absolute bottom-10 right-10 w-64 h-64 text-[var(--accent-cyan)] rotate-180" />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <blockquote className="text-center">
            <p className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gradient mb-8">
              "{quote}"
            </p>
            {attribution && (
              <footer className="flex flex-col items-center gap-2">
                <cite className="not-italic font-semibold text-xl text-[var(--foreground)]">
                  {attribution}
                </cite>
                {role && (
                  <p className="text-base text-[var(--foreground-muted)]">{role}</p>
                )}
              </footer>
            )}
          </blockquote>
        </div>
      </section>
    );
  }

  if (variant === "with-image") {
    return (
      <section
        className={`section py-20 px-6 ${className}`}
        style={{ backgroundColor: bgMap[backgroundColor] }}
      >
        <div className="container mx-auto max-w-4xl">
          <div className="glass-card p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {image && (
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-[var(--border)] ring-offset-4 ring-offset-[var(--surface)]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
              <blockquote className="flex-1">
                <div className="text-[var(--accent-violet)] opacity-30 mb-4">
                  <QuoteIcon className="w-10 h-10" />
                </div>
                <p className="text-lg md:text-xl leading-relaxed text-[var(--foreground)] mb-6 italic">
                  {quote}
                </p>
                {attribution && (
                  <footer>
                    <cite className="not-italic font-semibold text-[var(--foreground)]">
                      {attribution}
                    </cite>
                    {role && (
                      <p className="text-sm text-[var(--foreground-muted)] mt-1">{role}</p>
                    )}
                  </footer>
                )}
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}

// ═══════════════════════════════════════════════════════════════════════════
// STATS COUNTER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface Stat {
  value: string | number;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface StatsCounterProps extends BaseProps {
  title?: string;
  subtitle?: string;
  stats: Stat[];
  columns?: 2 | 3 | 4;
  variant?: "simple" | "cards" | "inline";
}

export function StatsCounter({
  title,
  subtitle,
  stats,
  columns = 3,
  variant = "simple",
  backgroundColor = "default",
  className = "",
}: StatsCounterProps) {
  const bgMap = {
    default: "var(--background)",
    secondary: "var(--background-secondary)",
    tertiary: "var(--background-tertiary)",
  };

  const columnMap = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-2 lg:grid-cols-4",
  };

  if (variant === "simple") {
    return (
      <section
        className={`section py-20 px-6 ${className}`}
        style={{ backgroundColor: bgMap[backgroundColor] }}
      >
        <div className="container mx-auto max-w-6xl">
          {(title || subtitle) && (
            <div className="text-center mb-16">
              {title && <h2 className="display-lg mb-4">{title}</h2>}
              {subtitle && (
                <p className="body-lg text-[var(--foreground-muted)]">{subtitle}</p>
              )}
            </div>
          )}
          <div className={`grid grid-cols-1 ${columnMap[columns]} gap-12`}>
            {stats.map((stat, index) => (
              <StatItem key={index} stat={stat} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "cards") {
    return (
      <section
        className={`section py-20 px-6 ${className}`}
        style={{ backgroundColor: bgMap[backgroundColor] }}
      >
        <div className="container mx-auto max-w-7xl">
          {(title || subtitle) && (
            <div className="text-center mb-16">
              {title && <h2 className="display-lg mb-4">{title}</h2>}
              {subtitle && (
                <p className="body-lg text-[var(--foreground-muted)]">{subtitle}</p>
              )}
            </div>
          )}
          <div className={`grid grid-cols-1 ${columnMap[columns]} gap-6`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card p-8 text-center hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <StatItem stat={stat} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "inline") {
    return (
      <section
        className={`section py-16 px-6 ${className}`}
        style={{ backgroundColor: bgMap[backgroundColor] }}
      >
        <div className="container mx-auto max-w-7xl">
          {(title || subtitle) && (
            <div className="text-center mb-12">
              {title && <h2 className="heading-lg mb-3">{title}</h2>}
              {subtitle && (
                <p className="text-base text-[var(--foreground-muted)]">{subtitle}</p>
              )}
            </div>
          )}
          <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <StatItem stat={stat} compact />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
}

// Helper component for stat item with animation
function StatItem({ stat, compact = false }: { stat: Stat; compact?: boolean }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    const targetValue = typeof stat.value === "number" ? stat.value : 0;
    if (targetValue === 0) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = targetValue / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  const displayValue =
    typeof stat.value === "number" ? count.toLocaleString() : stat.value;

  return (
    <div ref={ref} className="text-center">
      <div
        className={`font-bold text-gradient ${
          compact ? "text-4xl mb-2" : "text-5xl md:text-6xl mb-3"
        }`}
      >
        {stat.prefix}
        {displayValue}
        {stat.suffix}
      </div>
      <div
        className={`font-medium uppercase tracking-wider ${
          compact
            ? "text-xs text-[var(--foreground-muted)]"
            : "text-sm text-[var(--foreground-muted)]"
        }`}
      >
        {stat.label}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// COMPARISON TABLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════

interface Column {
  title: string;
  highlighted?: boolean;
  price?: string;
  buttonText?: string;
  buttonLink?: string;
}

interface Row {
  feature: string;
  tooltip?: string;
  values: Array<boolean | string | number | ReactNode>;
}

interface ComparisonTableProps extends BaseProps {
  title?: string;
  subtitle?: string;
  columns: Column[];
  rows: Row[];
}

export function ComparisonTable({
  title,
  subtitle,
  columns: rawColumns,
  rows: rawRows,
  backgroundColor = "default",
  className = "",
}: ComparisonTableProps) {
  // Defensive defaults for null/undefined arrays from Sanity
  const columns = rawColumns ?? [];
  const rows = rawRows ?? [];

  const bgMap = {
    default: "var(--background)",
    secondary: "var(--background-secondary)",
    tertiary: "var(--background-tertiary)",
  };

  return (
    <section
      className={`section py-20 px-6 ${className}`}
      style={{ backgroundColor: bgMap[backgroundColor] }}
    >
      <div className="container mx-auto max-w-7xl">
        {(title || subtitle) && (
          <div className="text-center mb-16">
            {title && <h2 className="display-lg mb-4">{title}</h2>}
            {subtitle && (
              <p className="body-lg text-[var(--foreground-muted)]">{subtitle}</p>
            )}
          </div>
        )}

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <div className="glass-card p-0 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left p-6 font-semibold text-[var(--foreground-muted)] text-sm uppercase tracking-wider">
                    Features
                  </th>
                  {columns.map((column, index) => (
                    <th
                      key={index}
                      className={`p-6 text-center ${
                        column.highlighted
                          ? "bg-[var(--gradient-primary-soft)] relative"
                          : ""
                      }`}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span className="font-bold text-lg text-[var(--foreground)]">
                          {column.title}
                        </span>
                        {column.price && (
                          <span
                            className={`text-2xl font-bold ${
                              column.highlighted ? "text-gradient" : ""
                            }`}
                          >
                            {column.price}
                          </span>
                        )}
                      </div>
                      {column.highlighted && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-violet)] to-[var(--accent-rose)]" />
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`border-b border-[var(--border)] hover:bg-[var(--surface-elevated)] transition-colors ${
                      rowIndex % 2 === 0 ? "bg-[var(--surface)]" : ""
                    }`}
                  >
                    <td className="p-6 font-medium text-[var(--foreground)]">
                      {row.feature}
                      {row.tooltip && (
                        <span className="ml-2 text-xs text-[var(--foreground-subtle)]">
                          ⓘ
                        </span>
                      )}
                    </td>
                    {(row.values || []).map((value, colIndex) => (
                      <td
                        key={colIndex}
                        className={`p-6 text-center ${
                          columns[colIndex]?.highlighted
                            ? "bg-[var(--gradient-primary-soft)]"
                            : ""
                        }`}
                      >
                        {renderCellValue(value)}
                      </td>
                    ))}
                  </tr>
                ))}
                {/* CTA Row */}
                <tr>
                  <td className="p-6"></td>
                  {columns.map((column, index) => (
                    <td
                      key={index}
                      className={`p-6 ${
                        column.highlighted ? "bg-[var(--gradient-primary-soft)]" : ""
                      }`}
                    >
                      {column.buttonText && (
                        <a
                          href={column.buttonLink || "#"}
                          className={`btn ${
                            column.highlighted ? "btn-primary" : "btn-secondary"
                          } w-full justify-center`}
                        >
                          {column.buttonText}
                        </a>
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-6">
          {columns.map((column, colIndex) => (
            <div
              key={colIndex}
              className={`glass-card p-6 ${
                column.highlighted ? "border-2 border-[var(--accent-violet)]" : ""
              }`}
            >
              <div className="text-center mb-6 pb-6 border-b border-[var(--border)]">
                <h3 className="text-xl font-bold mb-2">{column.title}</h3>
                {column.price && (
                  <p
                    className={`text-3xl font-bold ${
                      column.highlighted ? "text-gradient" : ""
                    }`}
                  >
                    {column.price}
                  </p>
                )}
              </div>
              <div className="space-y-4 mb-6">
                {rows.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex items-center justify-between py-2"
                  >
                    <span className="text-sm text-[var(--foreground)]">
                      {row.feature}
                    </span>
                    <span>{renderCellValue((row.values || [])[colIndex])}</span>
                  </div>
                ))}
              </div>
              {column.buttonText && (
                <a
                  href={column.buttonLink || "#"}
                  className={`btn ${
                    column.highlighted ? "btn-primary" : "btn-secondary"
                  } w-full justify-center`}
                >
                  {column.buttonText}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to render cell values
function renderCellValue(value: boolean | string | number | ReactNode) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[rgba(16,185,129,0.15)]">
        <CheckIcon className="w-4 h-4 text-[var(--accent-emerald)]" />
      </div>
    ) : (
      <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[var(--surface-elevated)]">
        <XIcon className="w-4 h-4 text-[var(--foreground-subtle)] opacity-40" />
      </div>
    );
  }
  if (typeof value === "string" || typeof value === "number") {
    return (
      <span className="text-sm font-medium text-[var(--foreground)]">{value}</span>
    );
  }
  return value;
}
