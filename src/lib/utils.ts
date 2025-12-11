import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parse a color string (hex, rgb, rgba) into RGB components
 */
export function parseColor(color: string): { r: number; g: number; b: number } | null {
  if (!color) return null;

  // Handle hex colors
  const hexMatch = color.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (hexMatch) {
    return {
      r: parseInt(hexMatch[1], 16),
      g: parseInt(hexMatch[2], 16),
      b: parseInt(hexMatch[3], 16),
    };
  }

  // Handle shorthand hex (#fff)
  const shortHexMatch = color.match(/^#?([a-f\d])([a-f\d])([a-f\d])$/i);
  if (shortHexMatch) {
    return {
      r: parseInt(shortHexMatch[1] + shortHexMatch[1], 16),
      g: parseInt(shortHexMatch[2] + shortHexMatch[2], 16),
      b: parseInt(shortHexMatch[3] + shortHexMatch[3], 16),
    };
  }

  // Handle rgb/rgba
  const rgbMatch = color.match(/rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
  if (rgbMatch) {
    return {
      r: parseInt(rgbMatch[1], 10),
      g: parseInt(rgbMatch[2], 10),
      b: parseInt(rgbMatch[3], 10),
    };
  }

  return null;
}

/**
 * Calculate relative luminance using WCAG formula
 * Returns value between 0 (black) and 1 (white)
 */
export function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Determine if a color is "light" (would need dark text for contrast)
 * Uses WCAG luminance threshold of 0.179 for AA compliance
 */
export function isLightColor(color: string | undefined): boolean | null {
  if (!color) return null;

  const parsed = parseColor(color);
  if (!parsed) return null;

  const luminance = getLuminance(parsed.r, parsed.g, parsed.b);
  return luminance > 0.179;
}

/**
 * Get the appropriate theme class based on background color
 * Returns 'theme-light' for light backgrounds, 'theme-dark' for dark backgrounds
 */
export function getContrastTheme(backgroundColor: string | undefined): string {
  const isLight = isLightColor(backgroundColor);
  if (isLight === null) return ''; // No override needed, use page theme
  return isLight ? 'theme-on-light' : 'theme-on-dark';
}
