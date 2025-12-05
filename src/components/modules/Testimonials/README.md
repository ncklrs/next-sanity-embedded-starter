# Testimonials Module

A comprehensive set of testimonial components following the Aurora design system. Features four distinct variations for displaying customer testimonials with dark theme, glassmorphism cards, and smooth animations.

## Features

- **Dark theme with glassmorphism** - Beautiful card designs with Aurora's signature style
- **Four distinct variations** - Grid, Carousel, Featured, and Large Carousel layouts
- **Responsive design** - Adapts seamlessly from mobile to desktop
- **Touch/swipe support** - Mobile-friendly carousel navigation
- **Keyboard navigation** - Arrow keys for carousel control
- **Autoplay option** - Configurable auto-rotation for carousels
- **Star ratings** - Visual 5-star rating system with amber accent
- **Avatar system** - Image or gradient fallback with initials
- **Accessibility** - ARIA labels and semantic HTML
- **TypeScript** - Full type safety with comprehensive interfaces

## Variations

### 1. TestimonialsGrid

A static grid layout perfect for displaying multiple testimonials at once.

**Features:**
- 3-column responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
- Hover effects on cards
- Section header with title and subtitle

**Usage:**
```tsx
import { TestimonialsGrid } from "@/components/modules/Testimonials";

<TestimonialsGrid
  title="What Our Customers Say"
  subtitle="Join thousands of satisfied customers"
  testimonials={testimonials}
  backgroundColor="var(--background)"
/>
```

### 2. TestimonialsCarousel

A horizontal carousel showing 1-3 cards at a time based on screen size.

**Features:**
- Responsive: 1 card (mobile), 2 cards (tablet), 3 cards (desktop)
- Navigation arrows
- Dot indicators
- Optional autoplay
- Touch/swipe support
- Smooth transitions

**Usage:**
```tsx
import { TestimonialsCarousel } from "@/components/modules/Testimonials";

<TestimonialsCarousel
  title="Trusted by Industry Leaders"
  subtitle="See why top companies choose our platform"
  testimonials={testimonials}
  autoplay={true}
  autoplaySpeed={5000}
  backgroundColor="var(--background-secondary)"
/>
```

### 3. TestimonialsFeatured

Highlights one featured testimonial with supporting testimonials below.

**Features:**
- Large featured card with special styling
- Grid of supporting testimonials
- Prominent company logo display
- Enhanced visual hierarchy

**Usage:**
```tsx
import { TestimonialsFeatured } from "@/components/modules/Testimonials";

<TestimonialsFeatured
  title="Featured Success Stories"
  subtitle="Real results from real customers"
  featured={featuredTestimonial}
  supporting={supportingTestimonials}
  backgroundColor="var(--background)"
/>
```

### 4. TestimonialsCarouselLarge

Full-width carousel displaying one large testimonial at a time.

**Features:**
- One testimonial per view
- Side-mounted navigation arrows
- Large quote icon
- Prominent author information
- Company logo integration
- Keyboard navigation (arrow keys)
- Optional autoplay
- Smooth fade transitions

**Usage:**
```tsx
import { TestimonialsCarouselLarge } from "@/components/modules/Testimonials";

<TestimonialsCarouselLarge
  title="Customer Spotlight"
  subtitle="Hear directly from the teams"
  testimonials={testimonials}
  autoplay={true}
  autoplaySpeed={6000}
  backgroundColor="var(--background-secondary)"
/>
```

## Data Structure

### Testimonial Interface

```typescript
interface Testimonial {
  id: string;
  content: string;
  rating: number; // 1-5
  author: {
    name: string;
    role: string;
    company?: string;
    avatar?: string; // Image URL
    initials?: string; // For fallback avatar
  };
  companyLogo?: string; // Company logo URL
  featured?: boolean;
}
```

### Example Data

```typescript
const testimonial: Testimonial = {
  id: "1",
  content: "This product has completely transformed our workflow...",
  rating: 5,
  author: {
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    avatar: "/avatars/sarah.jpg", // Optional
    initials: "SC", // Fallback if no avatar
  },
  companyLogo: "/logos/techcorp.svg", // Optional
};
```

## Props

### Common Props (All Variations)

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | Required | Section title |
| `subtitle` | `string` | `undefined` | Optional subtitle |
| `backgroundColor` | `string` | `undefined` | Custom background color |
| `className` | `string` | `""` | Additional CSS classes |

### TestimonialsGrid Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `testimonials` | `Testimonial[]` | Required | Array of testimonials |

### TestimonialsCarousel Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `testimonials` | `Testimonial[]` | Required | Array of testimonials |
| `autoplay` | `boolean` | `false` | Enable auto-rotation |
| `autoplaySpeed` | `number` | `5000` | Auto-rotation speed (ms) |

### TestimonialsFeatured Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `featured` | `Testimonial` | Required | Featured testimonial |
| `supporting` | `Testimonial[]` | Required | Supporting testimonials |

### TestimonialsCarouselLarge Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `testimonials` | `Testimonial[]` | Required | Array of testimonials |
| `autoplay` | `boolean` | `false` | Enable auto-rotation |
| `autoplaySpeed` | `number` | `6000` | Auto-rotation speed (ms) |

## Design System Integration

### Typography Classes Used

- `display-lg` - Section titles
- `body-lg` - Section subtitles
- `testimonial-content` - Quote content (italic, 1.125rem)
- `testimonial-card` - Card styling with hover effects

### Colors Used

- `--surface` - Card backgrounds
- `--border` - Card borders
- `--foreground` - Text colors
- `--foreground-muted` - Secondary text
- `--accent-amber` - Star ratings
- `--accent-violet` - Accents and active states
- `--gradient-primary` - Avatar fallback backgrounds

### Spacing

- Section padding: `var(--space-4xl)` top/bottom, `var(--space-xl)` left/right
- Card padding: `var(--space-2xl)`
- Grid gaps: `var(--space-xl)` to `var(--space-2xl)`

## Accessibility

- **ARIA labels** on all interactive elements
- **Semantic HTML** with proper `<section>`, `<blockquote>`, etc.
- **Keyboard navigation** for carousels (arrow keys)
- **Screen reader support** with descriptive labels
- **Focus states** on all clickable elements
- **Disabled state** handling for navigation buttons

## Responsive Behavior

### Breakpoints

- **Mobile (<640px)**: 1 column, smaller text, compact spacing
- **Tablet (640-1024px)**: 2 columns for grids/carousels
- **Desktop (>1024px)**: 3 columns for grids/carousels

### Touch Support

- Swipe left/right to navigate carousels
- Minimum swipe distance: 50px
- Smooth transitions on touch interactions

## Animation & Transitions

- **Card hover**: `translateY(-4px)` with shadow increase
- **Carousel transitions**: 500ms fade effect
- **Button hover**: Scale and color transitions
- **Autoplay pause**: On hover/touch to prevent disruptive transitions

## Best Practices

1. **Limit testimonial count**: 3-6 testimonials for Grid, 4-8 for Carousels
2. **Keep content concise**: 1-3 sentences for optimal readability
3. **Use high-quality images**: Avatar images should be 96x96px minimum
4. **Provide fallbacks**: Always include initials for avatar fallback
5. **Test autoplay speed**: 5-7 seconds recommended for readability
6. **Balance featured/supporting**: 3 supporting testimonials works best

## Examples

See `example.tsx` for complete working examples of all four variations with sample data.

```tsx
import TestimonialsShowcase from "@/components/modules/Testimonials/example";

// Renders all four variations
<TestimonialsShowcase />
```

## Dependencies

- React 18+
- Next.js 14+
- TypeScript
- Icons from `@/components/icons`

## File Structure

```
Testimonials/
├── index.tsx      # Main component with all 4 variations
├── example.tsx    # Example usage with sample data
└── README.md      # This file
```

## License

Part of the Aurora design system.
