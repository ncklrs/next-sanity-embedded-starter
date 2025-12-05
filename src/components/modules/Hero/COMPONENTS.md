# Hero Component Reference Guide

## Quick Component Selection

| Component | Use Case | Key Features |
|-----------|----------|--------------|
| **HeroDefault** | Landing pages, product launches | Gradient orbs, flexible alignment, multiple backgrounds |
| **HeroCentered** | Marketing pages, brand showcases | Logo cloud, multiple CTAs, social proof |
| **HeroSplit** | Feature highlights, product demos | Image showcase, feature list, reversible layout |
| **HeroVideo** | Product demos, storytelling | Video background, dramatic effect, overlay control |
| **HeroMinimal** | Simple launches, announcements | Clean design, announcement bar, focused message |

---

## Component Variations Detail

### 1. HeroDefault
```
┌─────────────────────────────────────────────┐
│         [Badge: New Release]                │
│                                             │
│    ╔═══════════════════════════════╗       │
│    ║   Large Heading with          ║       │
│    ║   Gradient Highlight          ║       │
│    ╚═══════════════════════════════╝       │
│                                             │
│        Subheading text here                 │
│        explaining the value                 │
│                                             │
│     [Primary CTA] [Secondary CTA]          │
│                                             │
│  Background: Animated gradient orbs         │
└─────────────────────────────────────────────┘
```

**Props:**
- `badge` - Optional top badge
- `heading` - Main heading text
- `headingGradientText` - Text to highlight with gradient
- `subheading` - Descriptive text below heading
- `primaryCTA` - Main call-to-action button
- `secondaryCTA` - Secondary action button
- `backgroundStyle` - `default` | `gradient-orbs` | `grid` | `particles`
- `alignment` - `center` | `left`

**Best For:**
- Product launches
- Landing pages
- Marketing campaigns
- General purpose hero sections

---

### 2. HeroCentered
```
┌─────────────────────────────────────────────┐
│         [Badge: Trusted by 10k]             │
│                                             │
│    ╔═══════════════════════════════╗       │
│    ║    Centered Heading with      ║       │
│    ║    Gradient Accent            ║       │
│    ╚═══════════════════════════════╝       │
│                                             │
│           Centered subheading               │
│           with clear message                │
│                                             │
│  [CTA 1] [CTA 2] [CTA 3]                   │
│                                             │
│  ───────────────────────────────────       │
│     Trusted by leading companies            │
│   [Logo] [Logo] [Logo] [Logo] [Logo]      │
└─────────────────────────────────────────────┘
```

**Props:**
- `badge` - Optional top badge
- `heading` - Main heading text
- `headingGradientText` - Text to highlight with gradient
- `subheading` - Descriptive text
- `buttons` - Array of CTA buttons (1-3 recommended)
- `companies` - Array of company logos
- `companiesHeading` - Text above logo cloud

**Best For:**
- Social proof emphasis
- Multi-action scenarios
- B2B marketing
- Brand credibility

---

### 3. HeroSplit
```
┌─────────────────────────────────────────────┐
│  [Badge]            │                       │
│                     │                       │
│  ╔═══════════╗     │   ┌─────────────┐    │
│  ║  Heading  ║     │   │             │    │
│  ║  with     ║     │   │   Feature   │    │
│  ║  Gradient ║     │   │   Image     │    │
│  ╚═══════════╝     │   │             │    │
│                     │   └─────────────┘    │
│  Subheading text    │   [Glow effect]     │
│                     │                       │
│  ✓ Feature one      │                       │
│  ✓ Feature two      │                       │
│  ✓ Feature three    │                       │
│                     │                       │
│  [Primary] [Sec]    │                       │
└─────────────────────────────────────────────┘
```

**Props:**
- `badge` - Optional top badge
- `heading` - Main heading text
- `headingGradientText` - Text to highlight with gradient
- `subheading` - Descriptive text
- `features` - Array of feature items with checkmarks
- `primaryCTA` - Main call-to-action
- `secondaryCTA` - Secondary action
- `image` - Image configuration object
- `imagePosition` - `left` | `right`

**Best For:**
- Product features
- App showcases
- SaaS platforms
- Feature announcements

**Layout Options:**
- Image right (default): Content | Image
- Image left: Image | Content

---

### 4. HeroVideo
```
┌─────────────────────────────────────────────┐
│  ╔═══════════════════════════════════════╗ │
│  ║                                       ║ │
│  ║  [Badge: Watch Demo]                 ║ │
│  ║                                       ║ │
│  ║  ┌─────────────────────────┐         ║ │
│  ║  │  Heading over Video     │         ║ │
│  ║  │  with Gradient          │         ║ │
│  ║  └─────────────────────────┘         ║ │
│  ║                                       ║ │
│  ║      Subheading text                 ║ │
│  ║                                       ║ │
│  ║  [Primary CTA] [▶ Watch Video]      ║ │
│  ║                                       ║ │
│  ║  Background: Video with overlay      ║ │
│  ╚═══════════════════════════════════════╝ │
└─────────────────────────────────────────────┘
```

**Props:**
- `badge` - Optional top badge
- `heading` - Main heading text
- `headingGradientText` - Text to highlight with gradient
- `subheading` - Descriptive text
- `primaryCTA` - Main call-to-action
- `secondaryCTA` - Secondary action (often "Watch Video")
- `video` - Video configuration object
  - `src` - Video source URL
  - `poster` - Poster image URL
  - `autoplay` - Auto-play on load
  - `loop` - Loop video
  - `muted` - Mute audio
- `overlayOpacity` - Dark overlay opacity (0-1)

**Best For:**
- Product demonstrations
- Brand storytelling
- Engaging narratives
- Visual-first content

---

### 5. HeroMinimal
```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌────────────────────────────────────┐    │
│  │ 🎉 Announcement • Read more →     │    │
│  └────────────────────────────────────┘    │
│                                             │
│         ╔═══════════════════╗              │
│         ║  Simple Heading   ║              │
│         ║  with Gradient    ║              │
│         ╚═══════════════════╝              │
│                                             │
│           Clean subheading                  │
│                                             │
│            [Primary CTA]                    │
│                                             │
│  Background: Minimal grid (optional)        │
└─────────────────────────────────────────────┘
```

**Props:**
- `announcement` - Optional announcement bar at top
  - `text` - Announcement text
  - `link` - Optional link object
- `heading` - Main heading text
- `headingGradientText` - Text to highlight with gradient
- `subheading` - Descriptive text
- `cta` - Single call-to-action button
- `showBackground` - Show subtle grid background

**Best For:**
- Simple launches
- Focused messaging
- Clean presentations
- Minimal design aesthetics

**Variations:**
- With announcement: Feature updates, news
- Without announcement: Pure simplicity

---

## Design System Integration

### Colors Used
- `--background` - Base dark background (#0a0a0f)
- `--foreground` - Text color (#f4f4f7)
- `--foreground-muted` - Secondary text (#9ca3af)
- `--gradient-primary` - Cyan → Violet → Rose gradient
- `--accent-cyan`, `--accent-violet`, `--accent-rose` - Brand colors

### Typography Classes
- `.display-xl` - Hero main headings (3-5rem)
- `.display-lg` - Split layout headings (2.5-4rem)
- `.body-lg` - Subheadings (1.125rem)
- `.text-gradient` - Gradient text effect

### Animation Classes
- `.animate-fade-in` - Fade in animation
- `.animate-fade-in-up` - Fade in with upward motion
- `.animate-delay-100` through `.animate-delay-500` - Staggered delays

### Background Elements
- `.hero` - Main hero container (100vh)
- `.hero-background` - Absolute positioned background
- `.hero-orb` - Animated gradient orbs
- `.noise-overlay` - Subtle texture
- `.grid-overlay` - Grid pattern

---

## Common Patterns

### Gradient Text Highlighting
All components support `headingGradientText` to automatically highlight a portion of the heading:

```tsx
heading="Build the future with Aurora"
headingGradientText="Aurora"
// Result: "Build the future with [Aurora in gradient]"
```

### Multiple CTAs
- **HeroDefault:** 2 CTAs (primary + secondary)
- **HeroCentered:** 1-3 CTAs (flexible)
- **HeroSplit:** 2 CTAs (primary + secondary)
- **HeroVideo:** 2 CTAs (often with play icon)
- **HeroMinimal:** 1 CTA (focused action)

### Badge Variants
All components support badges with these variants:
- `default` - Gray with subtle styling
- `gradient` - Multi-color gradient (recommended)
- `success` - Green accent
- `new` - Cyan accent

---

## Responsive Behavior

All components are fully responsive:

- **Desktop (>1024px):** Full layout with all features
- **Tablet (768-1024px):** Adjusted spacing, maintained layout
- **Mobile (<768px):**
  - Single column layouts
  - Stacked CTAs
  - Optimized typography sizes
  - Grid backgrounds adjusted for performance

---

## Accessibility Features

- Semantic HTML structure (`<section>`, `<h1>`, `<p>`)
- Proper heading hierarchy
- Alt text for all images
- Keyboard navigation support
- Focus states on interactive elements
- ARIA attributes where needed

---

## Performance Optimization

- CSS-only animations (no JavaScript)
- Next.js Image component for optimized loading
- Lazy loading for videos
- Backdrop-filter used efficiently
- Minimal re-renders with proper React patterns

---

## Integration with Sanity CMS

Example Sanity schema structure:

```typescript
{
  name: 'heroSection',
  type: 'object',
  fields: [
    {
      name: 'variant',
      type: 'string',
      options: {
        list: [
          { title: 'Default', value: 'default' },
          { title: 'Centered with Logos', value: 'centered' },
          { title: 'Split Layout', value: 'split' },
          { title: 'Video Background', value: 'video' },
          { title: 'Minimal', value: 'minimal' },
        ],
      },
    },
    // ... other fields based on variant
  ],
}
```

---

## File Structure

```
Hero/
├── index.tsx          # Main component file with all 5 variants
├── types.ts           # TypeScript type definitions
├── examples.tsx       # Usage examples for all variants
├── README.md          # Detailed documentation
└── COMPONENTS.md      # This visual reference guide
```

---

## Quick Start

```tsx
// Import the component you need
import { HeroDefault } from '@/components/modules/Hero';

// Use in your page
export default function HomePage() {
  return (
    <HeroDefault
      badge={{ text: "New", variant: "gradient" }}
      heading="Your amazing headline"
      headingGradientText="amazing"
      subheading="Supporting text that describes your value proposition."
      primaryCTA={{ label: "Get Started", onClick: () => {} }}
      secondaryCTA={{ label: "Learn More" }}
    />
  );
}
```

---

## Support

For issues, questions, or feature requests:
1. Check the examples in `examples.tsx`
2. Review TypeScript interfaces in `index.tsx`
3. Refer to the Aurora design system documentation
