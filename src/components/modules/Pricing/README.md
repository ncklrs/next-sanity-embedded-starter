# Pricing Components

Production-ready pricing section variations following the Aurora design system with dark theme glassmorphism, gradient accents, and comprehensive feature comparison capabilities.

## Components

### 1. PricingCards
Three-column pricing cards with popular plan highlight and hover effects.

**Features:**
- Responsive grid layout (stacks on mobile)
- Popular plan scaled up (scale-105) with gradient border
- Glassmorphism card design
- Feature lists with check icons
- Customizable CTA buttons
- Badge support for plan highlights

**Usage:**
```tsx
import { PricingCards } from "@/components/modules/Pricing";

<PricingCards
  badge="Pricing"
  heading="Simple, transparent pricing"
  subheading="Choose the perfect plan for your needs."
  plans={[
    {
      name: "Starter",
      price: 29,
      period: "month",
      description: "Perfect for individuals",
      features: [
        { text: "Up to 10 projects" },
        { text: "5 GB storage" },
      ],
      ctaText: "Get Started",
    },
    // ... more plans
  ]}
  spacing="xl"
  onPlanSelect={(planName) => console.log(planName)}
/>
```

### 2. PricingComparison
Full feature comparison table with plan headers and detailed feature rows.

**Features:**
- Responsive table (stacks cards on mobile)
- Feature categories with headers
- Alternating row backgrounds
- Checkmarks, custom values, or ReactNode support
- CTA buttons at bottom of each column
- Plan badges and highlights

**Usage:**
```tsx
import { PricingComparison } from "@/components/modules/Pricing";

<PricingComparison
  heading="Compare all features"
  subheading="See exactly what's included in each plan."
  plans={plansArray}
  comparisonFeatures={[
    {
      category: "Core Features",
      name: "Projects",
      plans: {
        Starter: "10",
        Professional: "Unlimited",
        Enterprise: "Unlimited",
      },
    },
    {
      name: "API access",
      plans: {
        Starter: false,
        Professional: true,
        Enterprise: true,
      },
    },
    // ... more features
  ]}
  onPlanSelect={(planName) => console.log(planName)}
/>
```

### 3. PricingSimple
Minimal single-plan display with large centered price and prominent CTA.

**Features:**
- Single plan focus with gradient glow effects
- Large centered price with gradient text
- Centered feature list
- Prominent CTA button
- Optional note below button
- Gradient border effects

**Usage:**
```tsx
import { PricingSimple } from "@/components/modules/Pricing";

<PricingSimple
  heading="One plan. All the power."
  subheading="Get everything you need to succeed."
  plan={{
    name: "Professional",
    price: 79,
    period: "month",
    description: "Everything you need to grow",
    features: [
      { text: "Unlimited projects" },
      { text: "Advanced analytics" },
    ],
    ctaText: "Start Free Trial",
  }}
  note="No credit card required. Cancel anytime."
  onSelect={() => console.log("Selected")}
/>
```

## TypeScript Interfaces

### Plan
```typescript
interface Plan {
  name: string;
  price: string | number;
  period?: string;
  description: string;
  features: Feature[];
  ctaText?: string;
  ctaVariant?: "primary" | "secondary" | "ghost" | "outline";
  isPopular?: boolean;
  badge?: string;
}
```

### Feature
```typescript
interface Feature {
  text: string;
  available?: boolean;  // Default: true
}
```

### ComparisonFeature
```typescript
interface ComparisonFeature {
  category?: string;  // Optional section header
  name: string;
  plans: {
    [planName: string]: boolean | string | number | ReactNode;
  };
}
```

## Common Props

All components support these base props:

```typescript
interface BaseProps {
  spacing?: "sm" | "md" | "lg" | "xl";  // Default: "xl"
  backgroundColor?: string;              // Custom background color
  className?: string;                    // Additional CSS classes
}
```

## Design System Integration

### Colors
- Surface: `var(--surface)`, `var(--surface-elevated)`
- Borders: `var(--border)`, `var(--border-hover)`
- Text: `var(--foreground)`, `var(--foreground-muted)`
- Accents: `var(--accent-emerald)` for check icons
- Gradient: `linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)`

### Typography
- Section headings: `.display-lg`
- Card titles: `.heading-md`
- Body text: `.body-lg`
- Gradient text: `.text-gradient`

### Components Used
- `Button` from `@/components/ui/Button`
- `Badge` from `@/components/ui/Badge`
- `CheckIcon` from `@/components/icons`

## Responsive Behavior

### PricingCards
- Desktop: 3-column grid
- Tablet: 2-column grid
- Mobile: Single column stack

### PricingComparison
- Desktop: Full comparison table
- Mobile: Stacked cards with inline features

### PricingSimple
- All breakpoints: Centered single-column layout
- Maximum width: 2xl (672px)

## Examples

See `examples.tsx` for complete working examples:
- `PricingCardsExample` - Basic three-tier pricing
- `PricingComparisonExample` - Full feature comparison
- `PricingSimpleExample` - Single plan showcase
- `PricingShowcase` - All three variations together

## Customization

### Custom Spacing
```tsx
<PricingCards spacing="sm" />  // Less padding
<PricingCards spacing="xl" />  // More padding (default)
```

### Custom Background
```tsx
<PricingCards backgroundColor="#0a0a0f" />
```

### Custom Button Variants
```tsx
plans={[
  {
    // ... other props
    ctaVariant: "secondary",  // override default button style
  }
]}
```

### Feature Availability
```tsx
features: [
  { text: "Basic feature" },                    // Available by default
  { text: "Premium feature", available: true }, // Explicitly available
  { text: "Enterprise only", available: false } // Grayed out with different icon
]
```

## Best Practices

1. **Popular Plan**: Mark one plan as `isPopular: true` to highlight it
2. **Consistent Features**: Use same feature count across plans for visual balance
3. **Clear CTAs**: Use action-oriented button text ("Start Free Trial" vs "Get Started")
4. **Pricing Display**: Use numbers for prices or strings for custom text ("Custom", "Free")
5. **Period Labels**: Include period for subscription pricing ("month", "year")
6. **Feature Descriptions**: Keep feature text concise (1-5 words ideal)
7. **Comparison Categories**: Group related features under category headers
8. **Mobile Testing**: Always test on mobile to ensure proper stacking

## Accessibility

- Semantic HTML structure
- Proper heading hierarchy
- Color contrast meets WCAG standards
- Focus visible states on interactive elements
- Screen reader friendly with proper labels

## Performance

- Client-side rendered ("use client" directive)
- No external dependencies beyond UI components
- CSS-in-JS avoided (uses Tailwind utilities)
- Optimized hover animations with GPU acceleration
