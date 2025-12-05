import type { SpacingOption, BackgroundVariant } from "./types";
import * as Icons from "../../icons";

export function getSpacingClass(spacing: SpacingOption = "lg"): string {
  const spacingMap: Record<SpacingOption, string> = {
    none: "",
    sm: "py-8 px-4",
    md: "py-12 px-6",
    lg: "py-16 px-6",
    xl: "py-24 px-6",
  };
  return spacingMap[spacing];
}

export function getBackgroundClass(variant: BackgroundVariant = "default"): string {
  const backgroundMap: Record<BackgroundVariant, string> = {
    default: "bg-[var(--background)]",
    secondary: "bg-[var(--background-secondary)]",
    tertiary: "bg-[var(--background-tertiary)]",
    gradient: "bg-gradient-to-b from-[var(--background)] to-[var(--background-secondary)]",
  };
  return backgroundMap[variant];
}

export function getGridColumnsClass(columns: 2 | 3 | 4 = 3): string {
  const columnsMap = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };
  return columnsMap[columns];
}

export function renderIcon(iconName?: string, props?: React.SVGProps<SVGSVGElement>) {
  if (!iconName) return null;

  // Convert icon name to component name (e.g., "sparkles" -> "SparklesIcon")
  const componentName = `${iconName.charAt(0).toUpperCase()}${iconName.slice(1)}Icon`;

  // Type-safe icon lookup
  const IconComponent = Icons[componentName as keyof typeof Icons] as React.ComponentType<
    React.SVGProps<SVGSVGElement>
  >;

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found. Available icons:`, Object.keys(Icons));
    return null;
  }

  return <IconComponent {...props} />;
}

export function splitTextWithGradient(text: string, gradientText?: string): {
  beforeGradient: string;
  gradientPart: string;
  afterGradient: string;
} {
  if (!gradientText || !text.includes(gradientText)) {
    return {
      beforeGradient: text,
      gradientPart: "",
      afterGradient: "",
    };
  }

  const index = text.indexOf(gradientText);
  return {
    beforeGradient: text.slice(0, index),
    gradientPart: gradientText,
    afterGradient: text.slice(index + gradientText.length),
  };
}
