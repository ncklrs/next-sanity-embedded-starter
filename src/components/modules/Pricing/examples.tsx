"use client";

import { PricingCards, PricingComparison, PricingSimple } from "./index";

// ═════════════════════════════════════════════════════════════════════════════
// EXAMPLE DATA
// ═════════════════════════════════════════════════════════════════════════════

const samplePlans = [
  {
    name: "Starter",
    price: 29,
    period: "month",
    description: "Perfect for individuals and small projects",
    features: [
      { text: "Up to 10 projects" },
      { text: "5 GB storage" },
      { text: "Basic analytics" },
      { text: "Email support" },
      { text: "API access", available: false },
      { text: "Custom domain", available: false },
    ],
    ctaText: "Start Free Trial",
  },
  {
    name: "Professional",
    price: 79,
    period: "month",
    description: "For growing teams and businesses",
    features: [
      { text: "Unlimited projects" },
      { text: "50 GB storage" },
      { text: "Advanced analytics" },
      { text: "Priority support" },
      { text: "Full API access" },
      { text: "Custom domain" },
    ],
    ctaText: "Get Started",
    isPopular: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: undefined,
    description: "For large organizations with custom needs",
    features: [
      { text: "Unlimited everything" },
      { text: "Unlimited storage" },
      { text: "Custom analytics" },
      { text: "Dedicated support" },
      { text: "Custom integrations" },
      { text: "SLA guarantee" },
    ],
    ctaText: "Contact Sales",
    ctaVariant: "secondary" as const,
  },
];

const comparisonFeatures = [
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
    name: "Team members",
    plans: {
      Starter: "3",
      Professional: "15",
      Enterprise: "Unlimited",
    },
  },
  {
    category: "Analytics & Insights",
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
  {
    name: "Custom reports",
    plans: {
      Starter: false,
      Professional: false,
      Enterprise: true,
    },
  },
  {
    category: "Support & Security",
    name: "Email support",
    plans: {
      Starter: true,
      Professional: true,
      Enterprise: true,
    },
  },
  {
    name: "Priority support",
    plans: {
      Starter: false,
      Professional: true,
      Enterprise: true,
    },
  },
  {
    name: "Dedicated account manager",
    plans: {
      Starter: false,
      Professional: false,
      Enterprise: true,
    },
  },
  {
    name: "SLA guarantee",
    plans: {
      Starter: false,
      Professional: false,
      Enterprise: true,
    },
  },
  {
    category: "Integration & API",
    name: "API access",
    plans: {
      Starter: false,
      Professional: true,
      Enterprise: true,
    },
  },
  {
    name: "Webhooks",
    plans: {
      Starter: false,
      Professional: true,
      Enterprise: true,
    },
  },
  {
    name: "Custom integrations",
    plans: {
      Starter: false,
      Professional: false,
      Enterprise: true,
    },
  },
];

const simplePlan = {
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
    { text: "Custom domain and branding" },
  ],
  ctaText: "Start 14-Day Free Trial",
};

// ═════════════════════════════════════════════════════════════════════════════
// EXAMPLE COMPONENTS
// ═════════════════════════════════════════════════════════════════════════════

export function PricingCardsExample() {
  const handlePlanSelect = (planName: string) => {
    console.log(`Selected plan: ${planName}`);
    // Add your plan selection logic here
  };

  return (
    <PricingCards
      heading="Simple, transparent pricing"
      subheading="Choose the perfect plan for your needs. All plans include a 14-day free trial with no credit card required."
      plans={samplePlans}
      onPlanSelect={handlePlanSelect}
    />
  );
}

export function PricingComparisonExample() {
  const handlePlanSelect = (planName: string) => {
    console.log(`Selected plan: ${planName}`);
    // Add your plan selection logic here
  };

  return (
    <PricingComparison
      heading="Compare all features"
      subheading="See exactly what's included in each plan and find the perfect fit for your team."
      plans={samplePlans}
      features={comparisonFeatures}
      onPlanSelect={handlePlanSelect}
    />
  );
}

export function PricingSimpleExample() {
  const handleSelect = () => {
    console.log("Plan selected");
    // Add your plan selection logic here
  };

  return (
    <PricingSimple
      heading="One plan. All the power."
      subheading="Get everything you need to succeed with our comprehensive Professional plan."
      plan={simplePlan}
      note="No credit card required. Cancel anytime."
      onSelect={handleSelect}
    />
  );
}

// Combined example showing all three variations
export function PricingShowcase() {
  return (
    <div className="space-y-0">
      <PricingCardsExample />
      <div className="h-24" />
      <PricingComparisonExample />
      <div className="h-24" />
      <PricingSimpleExample />
    </div>
  );
}
