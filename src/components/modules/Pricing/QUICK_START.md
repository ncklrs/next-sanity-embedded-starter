# Pricing Components - Quick Start Guide

## Installation & Setup

The Pricing module is ready to use. No additional installation required.

## Import Components

```tsx
// Import individual components
import { PricingCards, PricingComparison, PricingSimple } from "@/components/modules/Pricing";

// Or import examples
import { 
  PricingCardsExample, 
  PricingComparisonExample, 
  PricingSimpleExample 
} from "@/components/modules/Pricing/examples";
```

## 1. Basic Pricing Cards (Most Common)

Copy and customize this example:

```tsx
import { PricingCards } from "@/components/modules/Pricing";

export default function MyPricingPage() {
  const plans = [
    {
      name: "Starter",
      price: 29,
      period: "month",
      description: "Perfect for individuals",
      features: [
        { text: "Up to 10 projects" },
        { text: "5 GB storage" },
        { text: "Basic analytics" },
        { text: "Email support" },
      ],
      ctaText: "Start Free Trial",
    },
    {
      name: "Professional",
      price: 79,
      period: "month",
      description: "For growing teams",
      features: [
        { text: "Unlimited projects" },
        { text: "50 GB storage" },
        { text: "Advanced analytics" },
        { text: "Priority support" },
      ],
      ctaText: "Get Started",
      isPopular: true,
      badge: "Most Popular",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        { text: "Unlimited everything" },
        { text: "Custom integrations" },
        { text: "Dedicated support" },
        { text: "SLA guarantee" },
      ],
      ctaText: "Contact Sales",
      ctaVariant: "secondary",
    },
  ];

  const handlePlanSelect = (planName: string) => {
    console.log(`User selected: ${planName}`);
    // Add your logic here:
    // - Redirect to signup
    // - Open payment modal
    // - Track analytics
  };

  return (
    <PricingCards
      badge="Pricing"
      heading="Simple, transparent pricing"
      subheading="Choose the perfect plan for your needs. All plans include a 14-day free trial."
      plans={plans}
      onPlanSelect={handlePlanSelect}
    />
  );
}
```

## 2. Feature Comparison Table

Use when you need detailed feature comparisons:

```tsx
import { PricingComparison } from "@/components/modules/Pricing";

export default function ComparisonPage() {
  const plans = [
    // ... same plans as above
  ];

  const features = [
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
      name: "Storage",
      plans: {
        Starter: "5 GB",
        Professional: "50 GB",
        Enterprise: "Unlimited",
      },
    },
    {
      category: "Analytics",
      name: "Basic analytics",
      plans: {
        Starter: true,
        Professional: true,
        Enterprise: true,
      },
    },
    {
      name: "Advanced analytics",
      plans: {
        Starter: false,
        Professional: true,
        Enterprise: true,
      },
    },
  ];

  return (
    <PricingComparison
      heading="Compare all features"
      subheading="See exactly what's included in each plan"
      plans={plans}
      comparisonFeatures={features}
      onPlanSelect={(name) => console.log(name)}
    />
  );
}
```

## 3. Simple Single Plan

Use for focused single-plan promotions:

```tsx
import { PricingSimple } from "@/components/modules/Pricing";

export default function SimplePricingPage() {
  const plan = {
    name: "Professional",
    price: 79,
    period: "month",
    description: "Everything you need to grow your business",
    features: [
      { text: "Unlimited projects and team members" },
      { text: "50 GB storage with automatic backups" },
      { text: "Advanced analytics and reporting" },
      { text: "Priority email and chat support" },
      { text: "Full API access with webhooks" },
    ],
    ctaText: "Start 14-Day Free Trial",
  };

  return (
    <PricingSimple
      heading="One plan. All the power."
      subheading="Get everything you need to succeed"
      plan={plan}
      note="No credit card required. Cancel anytime."
      onSelect={() => {
        window.location.href = "/signup";
      }}
    />
  );
}
```

## Customization Tips

### 1. Change Spacing
```tsx
<PricingCards spacing="sm" />  // Less padding
<PricingCards spacing="lg" />  // More padding
```

### 2. Custom Background
```tsx
<PricingCards 
  backgroundColor="var(--background-secondary)"
  className="border-t border-b border-[var(--border)]"
/>
```

### 3. Disable Features
```tsx
features: [
  { text: "Available feature" },
  { text: "Not available", available: false },  // Grayed out
]
```

### 4. Custom Button Style
```tsx
{
  name: "Enterprise",
  ctaText: "Contact Sales",
  ctaVariant: "secondary",  // or "ghost", "outline"
}
```

## Common Patterns

### Annual/Monthly Toggle
```tsx
const [isAnnual, setIsAnnual] = useState(false);

const plans = [
  {
    name: "Pro",
    price: isAnnual ? 67 : 79,
    period: "month",
    // ... rest
  }
];

return (
  <>
    <div className="text-center mb-8">
      <button onClick={() => setIsAnnual(!isAnnual)}>
        {isAnnual ? "Monthly" : "Annual"} 
        {isAnnual && <span>(Save 15%)</span>}
      </button>
    </div>
    <PricingCards plans={plans} />
  </>
);
```

### Redirect to Checkout
```tsx
const handlePlanSelect = (planName: string) => {
  // Track analytics
  analytics.track('plan_selected', { plan: planName });
  
  // Redirect to checkout
  router.push(`/checkout?plan=${planName.toLowerCase()}`);
};
```

### Open Modal
```tsx
const [selectedPlan, setSelectedPlan] = useState(null);

const handlePlanSelect = (planName: string) => {
  setSelectedPlan(planName);
  setIsModalOpen(true);
};

return (
  <>
    <PricingCards onPlanSelect={handlePlanSelect} />
    {isModalOpen && <CheckoutModal plan={selectedPlan} />}
  </>
);
```

## Demo & Testing

Visit the demo page to see all components in action:

```bash
npm run dev
# or
bun dev

# Then visit: http://localhost:3000/pricing-demo
```

## Need More Help?

- See `README.md` for full documentation
- Check `examples.tsx` for complete working examples
- View `IMPLEMENTATION_SUMMARY.md` for technical details
- Visit `/pricing-demo` for live demonstrations

## Troubleshooting

### Component not rendering?
- Ensure you're using "use client" directive if importing in server component
- Check that all required props are provided

### Styling issues?
- Verify globals.css is imported in your layout
- Check that Aurora design system CSS variables are defined

### TypeScript errors?
- Ensure plan objects match the Plan interface
- Check that feature values in comparison table match expected types

## What's Next?

1. Copy one of the examples above
2. Customize the plans data for your product
3. Update heading and subheading text
4. Wire up the onPlanSelect handler
5. Style with spacing and backgroundColor props
6. Test on mobile and desktop
7. Deploy!
