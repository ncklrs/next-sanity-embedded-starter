# Hero Component Variations

Five production-ready Hero section variations following the Aurora design system.

## Components Overview

### 1. HeroDefault
Full viewport hero with animated gradient orbs background.

**Features:**
- Configurable badge at top
- Large heading with optional gradient highlight
- Subheading text
- Primary and secondary CTA buttons
- Multiple background styles: `default`, `gradient-orbs`, `grid`, `particles`
- Layout alignment: `center` or `left`
- Smooth fade-in animations

**Usage:**
```tsx
import { HeroDefault } from '@/components/modules/Hero';

<HeroDefault
  badge={{ text: "New Release", variant: "gradient" }}
  heading="Build the future with"
  headingGradientText="Aurora"
  subheading="The modern design system for ambitious teams building exceptional products."
  primaryCTA={{ label: "Get Started", onClick: () => {} }}
  secondaryCTA={{ label: "View Demo" }}
  backgroundStyle="gradient-orbs"
  alignment="center"
/>
```

### 2. HeroCentered
Centered layout with logo cloud of trusted companies.

**Features:**
- Badge, heading, subheading centered
- Multiple CTA buttons
- Logo cloud with trusted companies at bottom
- Fade-in animations with staggered delays
- Gradient orb background

**Usage:**
```tsx
import { HeroCentered } from '@/components/modules/Hero';

<HeroCentered
  badge={{ text: "Trusted by 10,000+ teams", variant: "new" }}
  heading="The platform teams love"
  headingGradientText="teams love"
  subheading="Join thousands of companies already building with Aurora."
  buttons={[
    { label: "Start Free Trial", variant: "primary" },
    { label: "Schedule Demo", variant: "secondary" },
    { label: "View Pricing", variant: "ghost" }
  ]}
  companies={[
    { name: "Acme Corp", logo: "/logos/acme.svg" },
    { name: "TechCo", logo: "/logos/techco.svg" }
  ]}
  companiesHeading="Trusted by leading companies"
/>
```

### 3. HeroSplit
Two-column split layout with content on one side and image on the other.

**Features:**
- Content column: badge, heading, subheading, feature list, buttons
- Image column: large image with subtle glow effect
- Reversible layout (`imagePosition`: `left` or `right`)
- Feature list with checkmark icons
- Grid background overlay

**Usage:**
```tsx
import { HeroSplit } from '@/components/modules/Hero';

<HeroSplit
  badge={{ text: "Product Launch", variant: "success" }}
  heading="Everything you need to scale"
  headingGradientText="scale"
  subheading="Built for teams that move fast and ship quality products."
  features={[
    { text: "Lightning-fast performance" },
    { text: "Enterprise-grade security" },
    { text: "99.9% uptime guarantee" }
  ]}
  primaryCTA={{ label: "Get Started" }}
  secondaryCTA={{ label: "Learn More" }}
  image={{
    src: "/hero-product.png",
    alt: "Product Dashboard",
    width: 800,
    height: 600
  }}
  imagePosition="right"
/>
```

### 4. HeroVideo
Hero with video background and optional dark overlay.

**Features:**
- Full-screen video background
- Configurable video properties (autoplay, loop, muted)
- Optional poster image for loading state
- Dark overlay with adjustable opacity
- Centered content with CTAs
- Play button option for secondary CTA

**Usage:**
```tsx
import { HeroVideo } from '@/components/modules/Hero';

<HeroVideo
  badge={{ text: "Watch Demo", variant: "gradient" }}
  heading="See Aurora in action"
  headingGradientText="in action"
  subheading="Watch how leading teams use Aurora to build beautiful products."
  primaryCTA={{ label: "Get Started" }}
  secondaryCTA={{ label: "Watch Video" }}
  video={{
    src: "/videos/hero-bg.mp4",
    poster: "/videos/hero-poster.jpg",
    autoplay: true,
    loop: true,
    muted: true
  }}
  overlayOpacity={0.6}
/>
```

### 5. HeroMinimal
Clean, minimal hero with optional announcement bar.

**Features:**
- Optional announcement bar at top with link
- Large heading with gradient text
- Subheading and single CTA
- Minimal background (optional grid overlay)
- Clean, focused design

**Usage:**
```tsx
import { HeroMinimal } from '@/components/modules/Hero';

<HeroMinimal
  announcement={{
    text: "🎉 Announcing Aurora 2.0",
    link: { label: "Read more", href: "/blog/aurora-2" }
  }}
  heading="Ship faster with Aurora"
  headingGradientText="Aurora"
  subheading="The design system that grows with your team."
  cta={{ label: "Get Started", variant: "primary" }}
  showBackground={true}
/>
```

## TypeScript Interfaces

All components are fully typed with comprehensive TypeScript interfaces:

```typescript
// Shared types
interface CTAButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
}

interface Company {
  name: string;
  logo: string;
  width?: number;
  height?: number;
}

// Component-specific props available as exports:
// - HeroDefaultProps
// - HeroCenteredProps
// - HeroSplitProps
// - HeroVideoProps
// - HeroMinimalProps
```

## Design System Integration

All components follow the Aurora design system:

- **CSS Variables:** Uses `--background`, `--foreground`, `--gradient-primary`, accent colors
- **Glassmorphism:** Backdrop-filter blur with semi-transparent surfaces
- **Typography:** `display-xl`, `display-lg`, `body-lg` classes
- **Gradient Text:** `.text-gradient` class for brand accents
- **Animations:** `animate-fade-in`, `animate-fade-in-up` with delay classes
- **Components:** Integrates existing Button and Badge components
- **Icons:** Uses icon components from `@/components/icons`

## Animation Classes

The components use these animation classes defined in globals.css:

- `.animate-fade-in` - Fade in from opacity 0
- `.animate-fade-in-up` - Fade in with upward movement
- `.animate-delay-100` through `.animate-delay-500` - Staggered animation delays

## Background Styles

### HeroDefault Background Options:
- `default` - Plain dark background
- `gradient-orbs` - Animated gradient orbs (violet, cyan, rose)
- `grid` - Subtle grid overlay
- `particles` - Grid with subtle orb

### Shared Background Elements:
- `.hero-background` - Absolute positioned background container
- `.hero-orb` - Animated gradient orbs
- `.noise-overlay` - Subtle texture overlay
- `.grid-overlay` - Grid pattern with radial fade

## Accessibility

All components include:
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images
- Keyboard-accessible buttons
- Focus states on interactive elements

## Responsive Design

Components are fully responsive:
- Fluid typography with `clamp()`
- Grid layouts adjust to single column on mobile
- Optimized spacing for all screen sizes
- Touch-friendly button sizes

## Sanity CMS Integration

These components are designed to work seamlessly with Sanity schemas. Recommended schema fields:

```typescript
// Hero section schema
{
  name: 'hero',
  type: 'object',
  fields: [
    { name: 'variant', type: 'string', options: { list: ['default', 'centered', 'split', 'video', 'minimal'] } },
    { name: 'badge', type: 'object', fields: [
      { name: 'text', type: 'string' },
      { name: 'variant', type: 'string' }
    ]},
    { name: 'heading', type: 'string' },
    { name: 'headingGradientText', type: 'string' },
    { name: 'subheading', type: 'text' },
    { name: 'primaryCTA', type: 'object', fields: [
      { name: 'label', type: 'string' },
      { name: 'href', type: 'string' }
    ]},
    // ... additional fields per variant
  ]
}
```

## Performance

- Uses Next.js `Image` component for optimized images
- Lazy loading of heavy assets
- CSS animations (no JavaScript animation libraries)
- Minimal re-renders with "use client" directive only where needed
