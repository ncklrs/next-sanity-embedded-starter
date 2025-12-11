"use client";

import { type HTMLAttributes, type ReactNode } from "react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { CheckIcon } from "@/components/icons";

// ═════════════════════════════════════════════════════════════════════════════
// SHARED UTILITIES
// ═════════════════════════════════════════════════════════════════════════════

/**
 * Map Sanity background color values to theme-appropriate CSS variables.
 * This ensures colors work correctly in dark themes.
 */
function getBackgroundStyle(backgroundColor?: string): React.CSSProperties | undefined {
  if (!backgroundColor) return undefined;

  const colorMap: Record<string, string> = {
    // Map Sanity values to CSS variables
    white: "var(--background)",
    default: "var(--background)",
    gray: "var(--background-secondary)",
    secondary: "var(--background-secondary)",
    primary: "var(--background-tertiary)",
    tertiary: "var(--background-tertiary)",
    transparent: "transparent",
  };

  const mappedColor = colorMap[backgroundColor.toLowerCase()];
  if (mappedColor) {
    return { backgroundColor: mappedColor };
  }

  // If it's already a CSS variable or valid color, use as-is
  return { backgroundColor };
}

// ═════════════════════════════════════════════════════════════════════════════
// SHARED TYPES & INTERFACES
// ═════════════════════════════════════════════════════════════════════════════

interface BaseProps {
  spacing?: "sm" | "md" | "lg" | "xl";
  backgroundColor?: string;
  className?: string;
}

interface Feature {
  text: string;
  available?: boolean;
}

interface Plan {
  name: string;
  price: string | number;
  period?: string;
  description: string;
  features: Feature[];
  ctaText?: string;
  ctaVariant?: "primary" | "secondary" | "ghost" | "outline";
  isPopular?: boolean;
  badge?: string;
}

// ═════════════════════════════════════════════════════════════════════════════
// PRICING CARDS COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

interface PricingCardsProps extends BaseProps {
  badge?: string;
  heading: string;
  subheading?: string;
  plans: Plan[];
  onPlanSelect?: (planName: string) => void;
}

export function PricingCards({
  badge = "Pricing",
  heading,
  subheading,
  plans,
  spacing = "xl",
  backgroundColor,
  className = "",
  onPlanSelect,
}: PricingCardsProps) {
  const spacingMap = {
    sm: "py-12 px-4",
    md: "py-16 px-6",
    lg: "py-20 px-6",
    xl: "py-24 px-6",
  };

  return (
    <section
      className={`section ${spacingMap[spacing]} ${className}`}
      style={getBackgroundStyle(backgroundColor)}
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="section-header text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gradient" className="mb-4">
            {badge}
          </Badge>
          <h2 className="display-lg mb-4">{heading}</h2>
          {subheading && (
            <p className="body-lg text-[var(--foreground-muted)]">{subheading}</p>
          )}
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group transition-all duration-500 ${
                plan.isPopular ? "md:scale-105 z-10" : ""
              }`}
            >
              {/* Popular Badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                  <Badge variant="gradient" dot>
                    {plan.badge || "Most Popular"}
                  </Badge>
                </div>
              )}

              {/* Card */}
              <div
                className={`relative h-full p-8 rounded-2xl backdrop-blur-lg transition-all duration-500
                  ${
                    plan.isPopular
                      ? "bg-[var(--surface-elevated)] border-2 border-transparent bg-gradient-to-b from-[rgba(139,92,246,0.1)] to-transparent"
                      : "bg-[var(--surface)] border border-[var(--border)]"
                  }
                  hover:border-[var(--border-hover)] hover:shadow-2xl hover:transform hover:-translate-y-1`}
                style={
                  plan.isPopular
                    ? {
                        background:
                          "linear-gradient(var(--surface-elevated), var(--surface-elevated)) padding-box, linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%) border-box",
                        border: "2px solid transparent",
                      }
                    : undefined
                }
              >
                {/* Plan Name */}
                <h3 className="heading-md mb-2">{plan.name}</h3>

                {/* Description */}
                <p className="text-[var(--foreground-muted)] text-sm mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-8">
                  <div className="flex items-baseline gap-2">
                    <span
                      className={`text-6xl font-bold tracking-tight ${
                        plan.isPopular ? "text-gradient" : ""
                      }`}
                    >
                      {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                    </span>
                    {plan.period && (
                      <span className="text-[var(--foreground-muted)] text-lg">
                        /{plan.period}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          feature.available !== false
                            ? "bg-[rgba(16,185,129,0.15)]"
                            : "bg-[var(--surface-elevated)]"
                        }`}
                      >
                        <CheckIcon
                          className={`w-3 h-3 ${
                            feature.available !== false
                              ? "text-[var(--accent-emerald)]"
                              : "text-[var(--foreground-subtle)] opacity-40"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm ${
                          feature.available !== false
                            ? "text-[var(--foreground)]"
                            : "text-[var(--foreground-subtle)] opacity-60"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={plan.ctaVariant || (plan.isPopular ? "primary" : "secondary")}
                  size="lg"
                  className="w-full"
                  onClick={() => onPlanSelect?.(plan.name)}
                >
                  {plan.ctaText || "Get Started"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// PRICING COMPARISON TABLE COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

interface ComparisonFeature {
  category?: string;
  name: string;
  plans: {
    [planName: string]: boolean | string | number | ReactNode;
  };
}

// Sanity plan structure (different from component's Plan interface)
interface SanityPricingPlan {
  name: string;
  price: string | number;
  priceUnit?: string;
  featureValues?: (boolean | string | number)[];
  buttonText?: string;
  buttonLink?: string;
  highlighted?: boolean;
}

interface PricingComparisonProps extends BaseProps {
  badge?: string;
  heading?: string;
  headingHighlight?: string;
  subheading?: string;
  plans?: Plan[] | SanityPricingPlan[];
  features?: ComparisonFeature[] | string[];
  onPlanSelect?: (planName: string) => void;
}

// Sanity feature structure (if features are objects with name/values)
interface SanityFeature {
  _key?: string;
  name: string;
  values?: (boolean | string | number)[];
}

// Transform Sanity data to component format
function transformSanityData(
  features: ComparisonFeature[] | string[] | SanityFeature[] | undefined,
  plans: Plan[] | SanityPricingPlan[] | undefined
): { transformedFeatures: ComparisonFeature[]; transformedPlans: Plan[] } {
  if (!features || !plans || features.length === 0 || plans.length === 0) {
    return { transformedFeatures: [], transformedPlans: [] };
  }

  // Check if features is already in component format (has 'plans' property)
  const isComponentFormat = typeof features[0] === 'object' && 'plans' in (features[0] as ComparisonFeature);

  if (isComponentFormat) {
    return {
      transformedFeatures: features as ComparisonFeature[],
      transformedPlans: plans as Plan[]
    };
  }

  const sanityPlans = plans as SanityPricingPlan[];
  let transformedFeatures: ComparisonFeature[];

  // Check if features are Sanity objects with 'name' property (but not 'plans')
  const isSanityFeatureFormat = typeof features[0] === 'object' && 'name' in (features[0] as SanityFeature);

  if (isSanityFeatureFormat) {
    // Transform from Sanity feature objects {_key, name, values}
    const sanityFeatures = features as SanityFeature[];
    transformedFeatures = sanityFeatures
      .filter((feature) => feature && feature.name) // Filter out undefined or invalid features
      .map((feature, featureIndex) => {
        const planValues: { [planName: string]: boolean | string | number } = {};
        sanityPlans.forEach((plan, planIndex) => {
          if (!plan || !plan.name) return; // Skip invalid plans
          // Use feature.values if available, otherwise fall back to plan.featureValues
          const value = feature.values?.[planIndex] ?? plan.featureValues?.[featureIndex] ?? false;
          planValues[plan.name] = value;
        });
        return { name: feature.name, plans: planValues };
      });
  } else {
    // Transform from string array format
    const featureNames = (features as string[]).filter((name) => typeof name === 'string' && name);
    transformedFeatures = featureNames.map((name, featureIndex) => {
      const planValues: { [planName: string]: boolean | string | number } = {};
      sanityPlans.forEach((plan) => {
        if (!plan || !plan.name) return; // Skip invalid plans
        planValues[plan.name] = plan.featureValues?.[featureIndex] ?? false;
      });
      return { name, plans: planValues };
    });
  }

  const transformedPlans: Plan[] = sanityPlans
    .filter((plan) => plan && plan.name) // Filter out invalid plans
    .map((plan) => ({
      name: plan.name,
      price: plan.price,
      period: plan.priceUnit,
      description: '',
      features: [],
      ctaText: plan.buttonText,
      isPopular: plan.highlighted,
    }));

  return { transformedFeatures, transformedPlans };
}

export function PricingComparison({
  badge = "Compare Plans",
  heading = "",
  subheading,
  plans: rawPlans = [],
  features: rawFeatures = [],
  spacing = "xl",
  backgroundColor,
  className = "",
  onPlanSelect,
}: PricingComparisonProps) {
  // Transform data if needed
  const { transformedFeatures: features, transformedPlans: plans } = transformSanityData(rawFeatures, rawPlans);

  // Early return if no valid data
  if (plans.length === 0) {
    return (
      <section className="section py-16 px-6">
        <div className="container mx-auto text-center">
          <p className="body-lg text-[var(--foreground-muted)]">No pricing plans configured</p>
        </div>
      </section>
    );
  }

  const spacingMap = {
    sm: "py-12 px-4",
    md: "py-16 px-6",
    lg: "py-20 px-6",
    xl: "py-24 px-6",
  };

  return (
    <section
      className={`section ${spacingMap[spacing]} ${className}`}
      style={getBackgroundStyle(backgroundColor)}
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="section-header text-center max-w-3xl mx-auto mb-16">
          <Badge variant="gradient" className="mb-4">
            {badge}
          </Badge>
          <h2 className="display-lg mb-4">{heading}</h2>
          {subheading && (
            <p className="body-lg text-[var(--foreground-muted)]">{subheading}</p>
          )}
        </div>

        {/* Comparison Table - Desktop */}
        <div className="hidden lg:block max-w-7xl mx-auto overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
          {/* Plan Headers */}
          <div className="grid grid-cols-4 gap-6 p-8 border-b border-[var(--border)] bg-[var(--surface-elevated)]">
            <div className="text-sm font-semibold text-[var(--foreground-muted)]">
              Features
            </div>
            {plans.map((plan, index) => (
              <div key={index} className="text-center">
                {plan.isPopular && (
                  <Badge variant="gradient" className="mb-3">
                    {plan.badge || "Popular"}
                  </Badge>
                )}
                <h3 className="heading-md mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1 mb-3">
                  <span
                    className={`text-3xl font-bold ${plan.isPopular ? "text-gradient" : ""}`}
                  >
                    {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[var(--foreground-muted)] text-sm">
                      /{plan.period}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[var(--foreground-muted)] mb-4">
                  {plan.description}
                </p>
              </div>
            ))}
          </div>

          {/* Feature Rows */}
          {features.map((feature, index) => (
            <div key={index}>
              {feature.category && (
                <div className="px-8 py-4 bg-[var(--background-secondary)] border-t border-[var(--border)]">
                  <h4 className="text-sm font-semibold text-[var(--foreground-muted)] uppercase tracking-wider">
                    {feature.category}
                  </h4>
                </div>
              )}
              <div
                className={`grid grid-cols-4 gap-6 p-6 border-t border-[var(--border)] transition-colors hover:bg-[var(--surface-elevated)] ${
                  index % 2 === 0 ? "bg-[var(--surface)]" : "bg-[rgba(255,255,255,0.01)]"
                }`}
              >
                <div className="text-sm font-medium text-[var(--foreground)]">
                  {feature.name}
                </div>
                {plans.map((plan, planIndex) => (
                  <div key={planIndex} className="flex justify-center items-center">
                    {renderFeatureValue(feature.plans[plan.name])}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA Row */}
          <div className="grid grid-cols-4 gap-6 p-8 border-t-2 border-[var(--border)] bg-[var(--surface-elevated)]">
            <div></div>
            {plans.map((plan, index) => (
              <div key={index}>
                <Button
                  variant={plan.ctaVariant || (plan.isPopular ? "primary" : "secondary")}
                  size="lg"
                  className="w-full"
                  onClick={() => onPlanSelect?.(plan.name)}
                >
                  {plan.ctaText || "Get Started"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View - Stacked Cards */}
        <div className="lg:hidden space-y-6">
          {plans.map((plan, planIndex) => (
            <div
              key={planIndex}
              className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] overflow-hidden"
            >
              {/* Plan Header */}
              <div className="p-6 border-b border-[var(--border)] bg-[var(--surface-elevated)]">
                {plan.isPopular && (
                  <Badge variant="gradient" className="mb-3">
                    {plan.badge || "Popular"}
                  </Badge>
                )}
                <h3 className="heading-md mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-3">
                  <span className={`text-3xl font-bold ${plan.isPopular ? "text-gradient" : ""}`}>
                    {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[var(--foreground-muted)] text-sm">/{plan.period}</span>
                  )}
                </div>
                <p className="text-sm text-[var(--foreground-muted)]">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="p-6">
                {features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="mb-4 last:mb-0">
                    {feature.category && featureIndex === 0 && (
                      <h4 className="text-xs font-semibold text-[var(--foreground-muted)] uppercase tracking-wider mb-3">
                        {feature.category}
                      </h4>
                    )}
                    <div className="flex justify-between items-center py-2">
                      <span className="text-sm text-[var(--foreground)]">{feature.name}</span>
                      <div>{renderFeatureValue(feature.plans[plan.name])}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="p-6 border-t border-[var(--border)]">
                <Button
                  variant={plan.ctaVariant || (plan.isPopular ? "primary" : "secondary")}
                  size="lg"
                  className="w-full"
                  onClick={() => onPlanSelect?.(plan.name)}
                >
                  {plan.ctaText || "Get Started"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function to render feature values
function renderFeatureValue(value: boolean | string | number | ReactNode) {
  if (typeof value === "boolean") {
    return value ? (
      <div className="w-5 h-5 rounded-full bg-[rgba(16,185,129,0.15)] flex items-center justify-center">
        <CheckIcon className="w-3 h-3 text-[var(--accent-emerald)]" />
      </div>
    ) : (
      <span className="text-[var(--foreground-subtle)] text-2xl">−</span>
    );
  }
  if (typeof value === "string" || typeof value === "number") {
    return <span className="text-sm font-medium text-[var(--foreground)]">{value}</span>;
  }
  return value;
}

// ═════════════════════════════════════════════════════════════════════════════
// PRICING SIMPLE COMPONENT
// ═════════════════════════════════════════════════════════════════════════════

interface PricingSimpleProps extends BaseProps {
  badge?: string;
  heading: string;
  subheading?: string;
  plan: Plan;
  note?: string;
  onSelect?: () => void;
}

export function PricingSimple({
  badge = "Pricing",
  heading,
  subheading,
  plan,
  note,
  spacing = "xl",
  backgroundColor,
  className = "",
  onSelect,
}: PricingSimpleProps) {
  const spacingMap = {
    sm: "py-12 px-4",
    md: "py-16 px-6",
    lg: "py-20 px-6",
    xl: "py-24 px-6",
  };

  return (
    <section
      className={`section ${spacingMap[spacing]} ${className}`}
      style={getBackgroundStyle(backgroundColor)}
    >
      <div className="container mx-auto max-w-2xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          {badge && (
            <Badge variant="gradient" className="mb-4">
              {badge}
            </Badge>
          )}
          <h2 className="display-lg mb-4">{heading}</h2>
          {subheading && (
            <p className="body-lg text-[var(--foreground-muted)]">{subheading}</p>
          )}
        </div>

        {/* Single Pricing Card */}
        <div className="relative">
          {/* Gradient Glow Effect */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-violet)] to-[var(--accent-rose)] opacity-20 blur-3xl -z-10"
            style={{ transform: "scale(0.9)" }}
          />

          {/* Card */}
          <div className="relative p-12 rounded-3xl backdrop-blur-xl bg-[var(--surface-elevated)] border-2 border-transparent overflow-hidden">
            {/* Gradient Border Effect */}
            <div
              className="absolute inset-0 rounded-3xl opacity-50 -z-10"
              style={{
                background:
                  "linear-gradient(var(--surface-elevated), var(--surface-elevated)) padding-box, linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%) border-box",
                border: "2px solid transparent",
              }}
            />

            {/* Plan Name & Description */}
            <div className="text-center mb-8">
              <h3 className="heading-lg mb-3">{plan.name}</h3>
              <p className="text-[var(--foreground-muted)]">{plan.description}</p>
            </div>

            {/* Large Centered Price */}
            <div className="text-center mb-10">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-7xl font-bold text-gradient tracking-tight">
                  {typeof plan.price === "number" ? `$${plan.price}` : plan.price}
                </span>
                {plan.period && (
                  <span className="text-2xl text-[var(--foreground-muted)] font-medium">
                    /{plan.period}
                  </span>
                )}
              </div>
            </div>

            {/* Features List */}
            <ul className="space-y-4 mb-10 max-w-md mx-auto">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[rgba(16,185,129,0.15)] flex items-center justify-center">
                    <CheckIcon className="w-4 h-4 text-[var(--accent-emerald)]" />
                  </div>
                  <span className="text-base text-[var(--foreground)]">{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="flex flex-col items-center gap-4">
              <Button
                variant={plan.ctaVariant || "primary"}
                size="lg"
                className="w-full max-w-md text-base px-12 py-4"
                onClick={onSelect}
              >
                {plan.ctaText || "Get Started"}
              </Button>

              {/* Optional Note */}
              {note && (
                <p className="text-sm text-[var(--foreground-muted)] text-center max-w-md">
                  {note}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═════════════════════════════════════════════════════════════════════════════
// DEFAULT EXPORT
// ═════════════════════════════════════════════════════════════════════════════

export default PricingCards;
