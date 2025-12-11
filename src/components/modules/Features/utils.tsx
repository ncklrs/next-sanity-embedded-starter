import * as Icons from "../../icons";

export function getSpacingClass(spacing?: string): string {
  const spacingMap: Record<string, string> = {
    none: "",
    sm: "py-8 px-4",
    small: "py-8 px-4",
    md: "py-12 px-6",
    medium: "py-12 px-6",
    lg: "py-16 px-6",
    large: "py-16 px-6",
    xl: "py-24 px-6",
  };
  return spacingMap[spacing || "lg"] || spacingMap.lg;
}

export function getBackgroundClass(variant?: string): string {
  const backgroundMap: Record<string, string> = {
    default: "bg-[var(--background)]",
    white: "bg-[var(--background)]",
    secondary: "bg-[var(--background-secondary)]",
    gray: "bg-[var(--background-secondary)]",
    muted: "bg-[var(--background-secondary)]",
    tertiary: "bg-[var(--background-tertiary)]",
    primary: "bg-[var(--background-tertiary)]",
    accent: "bg-[var(--background-tertiary)]",
    gradient: "bg-gradient-to-b from-[var(--background)] to-[var(--background-secondary)]",
  };
  return backgroundMap[variant || "default"] || backgroundMap.default;
}

export function getGridColumnsClass(columns?: number): string {
  const columnsMap: Record<number, string> = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };
  return columnsMap[columns || 3] || columnsMap[3];
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

export function splitTextWithGradient(text?: string, gradientText?: string): {
  beforeGradient: string;
  gradientPart: string;
  afterGradient: string;
} {
  if (!text) {
    return {
      beforeGradient: "",
      gradientPart: "",
      afterGradient: "",
    };
  }

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
