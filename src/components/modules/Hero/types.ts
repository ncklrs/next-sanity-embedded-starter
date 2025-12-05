import { type ReactNode } from "react";

/**
 * Shared type definitions for Hero components
 */

export interface CTAButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
}

export interface BadgeConfig {
  text: string;
  variant?: "default" | "gradient" | "success" | "new";
}

export interface Company {
  name: string;
  logo: string;
  width?: number;
  height?: number;
}

export interface Feature {
  icon?: ReactNode;
  text: string;
}

export interface VideoConfig {
  src: string;
  poster?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

export interface ImageConfig {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface AnnouncementConfig {
  text: string;
  link?: {
    label: string;
    href: string;
  };
}

export type BackgroundStyle = "default" | "gradient-orbs" | "grid" | "particles";
export type Alignment = "center" | "left";
export type ImagePosition = "left" | "right";
