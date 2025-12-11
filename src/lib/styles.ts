/**
 * Shared Style Utilities
 *
 * Centralized styling functions used across module components.
 * This eliminates code duplication and ensures consistent theming.
 */

import type { CSSProperties } from "react";

const BACKGROUND_COLOR_MAP: Record<string, string> = {
  white: "var(--background)",
  default: "var(--background)",
  gray: "var(--background-secondary)",
  secondary: "var(--background-secondary)",
  primary: "var(--background-tertiary)",
  tertiary: "var(--background-tertiary)",
  transparent: "transparent",
};

export function getBackgroundStyle(backgroundColor?: string): CSSProperties | undefined {
  if (!backgroundColor) return undefined;
  const normalizedColor = backgroundColor.toLowerCase();
  const mappedColor = BACKGROUND_COLOR_MAP[normalizedColor];
  return mappedColor ? { backgroundColor: mappedColor } : { backgroundColor };
}

export const SPACING_CLASSES = { sm: "gap-4", md: "gap-6", lg: "gap-8" } as const;
export const SECTION_PADDING = { sm: "py-8 md:py-12", md: "py-12 md:py-16", lg: "py-16 md:py-24" } as const;
