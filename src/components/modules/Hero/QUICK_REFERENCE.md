# Hero Components - Quick Reference Card

## Import Statement
```tsx
import { HeroDefault, HeroCentered, HeroSplit, HeroVideo, HeroMinimal } from '@/components/modules/Hero';
```

---

## Component Selector

| Choose... | When you need... |
|-----------|------------------|
| **HeroDefault** | Standard landing page hero with gradient orbs |
| **HeroCentered** | Social proof with company logos |
| **HeroSplit** | Product showcase with image |
| **HeroVideo** | Video background for impact |
| **HeroMinimal** | Clean, focused messaging |

---

## Minimal Examples

### HeroDefault
```tsx
<HeroDefault
  badge={{ text: "New", variant: "gradient" }}
  heading="Build with Aurora"
  headingGradientText="Aurora"
  subheading="Modern design system for teams."
  primaryCTA={{ label: "Start", onClick: () => {} }}
  backgroundStyle="gradient-orbs"
  alignment="center"
/>
```

### HeroCentered
```tsx
<HeroCentered
  heading="Teams love Aurora"
  headingGradientText="love"
  subheading="Join thousands of companies."
  buttons={[
    { label: "Start", variant: "primary" },
    { label: "Demo", variant: "secondary" }
  ]}
  companies={[
    { name: "Acme", logo: "/logo.svg" }
  ]}
/>
```

### HeroSplit
```tsx
<HeroSplit
  heading="Everything to scale"
  headingGradientText="scale"
  subheading="Built for fast teams."
  features={[
    { text: "Fast performance" },
    { text: "Secure platform" }
  ]}
  primaryCTA={{ label: "Start" }}
  image={{ src: "/hero.png", alt: "Product" }}
  imagePosition="right"
/>
```

### HeroVideo
```tsx
<HeroVideo
  heading="See it in action"
  headingGradientText="in action"
  subheading="Watch the demo."
  primaryCTA={{ label: "Start" }}
  video={{ src: "/video.mp4", muted: true }}
  overlayOpacity={0.6}
/>
```

### HeroMinimal
```tsx
<HeroMinimal
  announcement={{
    text: "New: Aurora 2.0",
    link: { label: "Learn", href: "/blog" }
  }}
  heading="Ship with Aurora"
  headingGradientText="Aurora"
  subheading="Design system for teams."
  cta={{ label: "Start" }}
/>
```

---

## Common Props

### Badge
```tsx
badge={{
  text: "New Release",
  variant: "gradient" | "new" | "success" | "default"
}}
```

### CTA Button
```tsx
primaryCTA={{
  label: "Get Started",
  onClick: () => {},
  variant: "primary" | "secondary" | "ghost",
  icon: <ArrowRightIcon />
}}
```

### Gradient Text
```tsx
heading="Build the future with Aurora"
headingGradientText="Aurora"
// Result: "Build the future with [Aurora in gradient]"
```

---

## Background Styles (HeroDefault)

```tsx
backgroundStyle="gradient-orbs"  // Animated orbs (default)
backgroundStyle="grid"           // Grid pattern
backgroundStyle="particles"      // Grid + subtle orb
backgroundStyle="default"        // Plain dark
```

---

## Layout Options

### HeroDefault & HeroMinimal
```tsx
alignment="center"  // Centered (default)
alignment="left"    // Left-aligned
```

### HeroSplit
```tsx
imagePosition="right"  // Image on right (default)
imagePosition="left"   // Image on left
```

---

## Animation Classes (Built-in)

- `.animate-fade-in` - Simple fade
- `.animate-fade-in-up` - Fade with upward motion
- `.animate-delay-100` to `.animate-delay-500` - Staggered timing

Applied automatically to all hero elements.

---

## TypeScript Types

```tsx
import type {
  HeroDefaultProps,
  HeroCenteredProps,
  HeroSplitProps,
  HeroVideoProps,
  HeroMinimalProps
} from '@/components/modules/Hero';
```

---

## Design System Values

### Colors
- `--background` - Dark background
- `--foreground` - White text
- `--gradient-primary` - Cyan → Violet → Rose
- `--accent-cyan`, `--accent-violet`, `--accent-rose`

### Typography
- `.display-xl` - Hero headings (3-5rem)
- `.body-lg` - Subheadings (1.125rem)
- `.text-gradient` - Gradient text effect

---

## File Location

```
/src/components/modules/Hero/
├── index.tsx          # Main components
├── types.ts           # TypeScript types
├── examples.tsx       # Usage examples
├── demo-page.tsx      # Demo page
├── README.md          # Full documentation
├── COMPONENTS.md      # Visual guide
└── QUICK_REFERENCE.md # This file
```

---

## Cheat Sheet

**Most common pattern:**
```tsx
import { HeroDefault } from '@/components/modules/Hero';

<HeroDefault
  heading="Your headline here"
  headingGradientText="headline"
  subheading="Your description here."
  primaryCTA={{ label: "Get Started", onClick: () => {} }}
  secondaryCTA={{ label: "Learn More" }}
/>
```

**With badge:**
```tsx
badge={{ text: "New Feature", variant: "gradient" }}
```

**With background:**
```tsx
backgroundStyle="gradient-orbs"
```

**With alignment:**
```tsx
alignment="center"
```

---

## Need Help?

1. See `examples.tsx` for complete examples
2. Check `README.md` for detailed docs
3. View `COMPONENTS.md` for visual guide
4. Use `demo-page.tsx` for interactive demo

---

## Production Checklist

- ✅ Import component
- ✅ Add heading and subheading
- ✅ Configure CTAs
- ✅ Add gradient text (optional)
- ✅ Add badge (optional)
- ✅ Choose background style
- ✅ Set alignment/layout
- ✅ Test responsive behavior
- ✅ Verify animations
- ✅ Check accessibility

**Done! You're ready to ship.** 🚀
