# Features Module

Three production-ready React components for displaying features following the Aurora design system.

## Components

### 1. FeaturesGrid
Grid layout with feature cards, icons, and hover effects.

**Features:**
- Configurable grid columns (2, 3, or 4)
- Icon in gradient background circle
- Gradient border reveal on hover
- translateY animation on hover

**Usage:**
```tsx
import { FeaturesGrid } from "@/components/modules/Features";

<FeaturesGrid
  section={{
    badge: "Features",
    heading: "Built for modern development",
    headingGradient: "modern development",
    subheading: "Everything you need to build amazing products"
  }}
  features={[
    {
      icon: "sparkles",
      title: "Beautiful Design",
      description: "Crafted with attention to every detail",
      link: { text: "Learn more", href: "/features/design" }
    },
    {
      icon: "zap",
      title: "Lightning Fast",
      description: "Optimized for performance"
    }
  ]}
  columns={3}
  spacing="lg"
  backgroundColor="default"
/>
```

### 2. FeaturesAlternating
Alternating image/content rows with scroll animations.

**Features:**
- Left/right alternating layout
- Image with glow effect on hover
- Check-marked bullet lists
- Intersection Observer scroll animations

**Usage:**
```tsx
import { FeaturesAlternating } from "@/components/modules/Features";

<FeaturesAlternating
  section={{
    badge: "How it works",
    heading: "Everything you need in one place",
    headingGradient: "one place"
  }}
  features={[
    {
      heading: "Seamless Integration",
      description: "Connect all your tools in minutes",
      bullets: [
        "One-click setup process",
        "Automatic data syncing",
        "Real-time updates"
      ],
      image: {
        src: "/images/feature-1.png",
        alt: "Integration dashboard"
      }
    }
  ]}
  spacing="xl"
/>
```

### 3. FeaturesIconCards
Glass card effect with large icons and scale animations.

**Features:**
- Glassmorphism backdrop blur
- Large icon with scale animation
- Gradient glow on hover
- Optional link with arrow icon

**Usage:**
```tsx
import { FeaturesIconCards } from "@/components/modules/Features";

<FeaturesIconCards
  section={{
    badge: "Capabilities",
    heading: "Powerful features for power users",
    headingGradient: "power users"
  }}
  features={[
    {
      icon: "rocket",
      title: "Deploy Anywhere",
      description: "Deploy to any cloud provider with ease",
      link: { text: "View docs", href: "/docs/deployment" }
    },
    {
      icon: "shield",
      title: "Enterprise Security",
      description: "Bank-grade security for your data"
    }
  ]}
  spacing="md"
  backgroundColor="secondary"
/>
```

## Props

### Common Props (all components)
- `spacing`: "none" | "sm" | "md" | "lg" | "xl" (default: "lg")
- `backgroundColor`: "default" | "secondary" | "tertiary" | "gradient" (default: "default")

### Section Props
```typescript
{
  badge?: string;           // Optional badge text
  heading: string;          // Main heading
  headingGradient?: string; // Part of heading to apply gradient
  subheading?: string;      // Optional subheading
}
```

### Feature Item Props
```typescript
{
  icon?: string;            // Icon name (e.g., "sparkles", "rocket")
  title: string;
  description: string;
  link?: {
    text: string;
    href: string;
  };
}
```

## Available Icons

The following icons are available via the `icon` prop:
- `sparkles`, `rocket`, `shield`, `zap`, `layers`, `code`
- `barChart`, `users`, `arrowRight`, `check`, `globe`
- `play`, `star`, `menu`, `x`

Icons are rendered using the utility function from `utils.ts` which maps icon names to components from `/components/icons.tsx`.

## Design System Classes

Components use Aurora design system classes:
- `.section` - Section wrapper
- `.section-header` - Centered header layout
- `.container` - Max-width container
- `.feature-grid` - Grid layout for features
- `.feature-card` - Individual feature card
- `.feature-icon` - Icon circle with gradient
- `.glass-card` - Glassmorphism card effect
- `.badge` - Badge component
- `.text-gradient` - Gradient text effect
- `.heading-lg`, `.heading-md` - Heading styles
- `.body-lg` - Body text style

## Customization

### Spacing Options
- `none`: No padding
- `sm`: 32px vertical, 16px horizontal
- `md`: 48px vertical, 24px horizontal
- `lg`: 64px vertical, 24px horizontal (default)
- `xl`: 96px vertical, 24px horizontal

### Background Options
- `default`: --background
- `secondary`: --background-secondary
- `tertiary`: --background-tertiary
- `gradient`: Gradient from background to background-secondary

### Grid Columns (FeaturesGrid only)
- `2`: 1 column mobile, 2 columns desktop
- `3`: 1 column mobile, 2 tablet, 3 desktop (default)
- `4`: 1 column mobile, 2 tablet, 4 desktop
