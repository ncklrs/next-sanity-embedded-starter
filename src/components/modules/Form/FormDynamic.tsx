"use client";

import { useEffect, useState } from "react";
import FormRenderer, { type FormConfig } from "@/components/forms/FormRenderer";
import { getFormConfig } from "@/app/actions/forms";
import { cn } from "@/lib/utils";

interface FormDynamicProps {
  // Reference to the form document
  form?: {
    _ref: string;
  };
  // Presentation overrides
  badge?: string;
  heading?: string;
  headingHighlight?: string;
  subheading?: string;
  layout?: "default" | "centered" | "split";
  maxWidth?: "sm" | "md" | "lg" | "full";
  // Styling
  spacing?: { top?: string; bottom?: string };
  backgroundColor?: { value?: string };
  className?: string;
}

/**
 * FormDynamic Module Component
 *
 * A page builder module that renders a dynamic form from Sanity.
 * Fetches form configuration on mount and renders using FormRenderer.
 */
export function FormDynamic({
  form,
  badge,
  heading,
  headingHighlight,
  subheading,
  layout = "default",
  maxWidth = "md",
  spacing,
  backgroundColor,
  className,
}: FormDynamicProps) {
  const [formConfig, setFormConfig] = useState<FormConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadForm() {
      if (!form?._ref) {
        setError("No form configured");
        setIsLoading(false);
        return;
      }

      try {
        const config = await getFormConfig(form._ref);
        if (config) {
          setFormConfig(config);
        } else {
          setError("Form not found");
        }
      } catch {
        setError("Failed to load form");
      } finally {
        setIsLoading(false);
      }
    }

    loadForm();
  }, [form?._ref]);

  // Build section styles
  const sectionStyle: React.CSSProperties = {};
  if (backgroundColor?.value) {
    sectionStyle.backgroundColor = backgroundColor.value;
  }

  // Spacing classes
  const spacingClasses = cn(
    spacing?.top === "none"
      ? "pt-0"
      : spacing?.top === "sm"
        ? "pt-8"
        : spacing?.top === "lg"
          ? "pt-24"
          : spacing?.top === "xl"
            ? "pt-32"
            : "pt-16",
    spacing?.bottom === "none"
      ? "pb-0"
      : spacing?.bottom === "sm"
        ? "pb-8"
        : spacing?.bottom === "lg"
          ? "pb-24"
          : spacing?.bottom === "xl"
            ? "pb-32"
            : "pb-16"
  );

  // Max width classes
  const maxWidthClasses = cn(
    maxWidth === "sm" && "max-w-[480px]",
    maxWidth === "md" && "max-w-[640px]",
    maxWidth === "lg" && "max-w-[768px]",
    maxWidth === "full" && "max-w-none"
  );

  // Layout classes
  const layoutClasses = cn(
    layout === "centered" && "text-center",
    layout === "split" && "lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start"
  );

  // Render heading with highlight
  const renderHeading = () => {
    const displayHeading = heading || formConfig?.name || "Contact Us";

    if (!headingHighlight) {
      return <h2 className="heading-lg mb-4">{displayHeading}</h2>;
    }

    const parts = displayHeading.split(new RegExp(`(${headingHighlight})`, "gi"));
    return (
      <h2 className="heading-lg mb-4">
        {parts.map((part, i) =>
          part.toLowerCase() === headingHighlight.toLowerCase() ? (
            <span key={i} className="text-gradient">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </h2>
    );
  };

  return (
    <section
      className={cn("section", spacingClasses, className)}
      style={sectionStyle}
    >
      <div className="container">
        <div className={cn(layoutClasses)}>
          {/* Header */}
          <div className={cn(layout !== "split" && maxWidthClasses, layout !== "split" && layout === "centered" && "mx-auto")}>
            {badge && (
              <span className="badge badge-gradient mb-4 inline-block">
                {badge}
              </span>
            )}
            {renderHeading()}
            {subheading && (
              <p className="body-lg text-[var(--foreground-muted)] mb-8">
                {subheading}
              </p>
            )}
          </div>

          {/* Form */}
          <div className={cn(layout !== "split" && maxWidthClasses, layout !== "split" && layout === "centered" && "mx-auto")}>
            {isLoading && (
              <div className="glass-card p-8 text-center">
                <div className="animate-pulse">
                  <div className="h-10 bg-[var(--surface-hover)] rounded mb-4" />
                  <div className="h-10 bg-[var(--surface-hover)] rounded mb-4" />
                  <div className="h-24 bg-[var(--surface-hover)] rounded mb-4" />
                  <div className="h-10 bg-[var(--surface-hover)] rounded" />
                </div>
              </div>
            )}

            {error && (
              <div className="glass-card p-8 text-center text-[var(--error)]">
                <p>{error}</p>
              </div>
            )}

            {formConfig && (
              <FormRenderer form={formConfig} className="glass-card p-6 md:p-8" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FormDynamic;
