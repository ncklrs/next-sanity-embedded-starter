export type SpacingOption = "none" | "sm" | "md" | "lg" | "xl";
export type BackgroundVariant = "default" | "secondary" | "tertiary" | "gradient";
export type GridColumns = 2 | 3 | 4;

export interface BaseFeatureProps {
  spacing?: SpacingOption;
  backgroundColor?: BackgroundVariant;
}

export interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}

export interface FeatureSection {
  badge?: string;
  heading: string;
  subheading?: string;
  headingGradient?: string;
}

export interface FeaturesGridProps extends BaseFeatureProps {
  section: FeatureSection;
  features: FeatureItem[];
  columns?: GridColumns;
}

export interface AlternatingFeature {
  heading: string;
  description: string;
  bullets?: string[];
  image: {
    src: string;
    alt: string;
  };
}

export interface FeaturesAlternatingProps extends BaseFeatureProps {
  section: FeatureSection;
  features: AlternatingFeature[];
}

export interface FeaturesIconCardsProps extends BaseFeatureProps {
  section: FeatureSection;
  features: FeatureItem[];
}
