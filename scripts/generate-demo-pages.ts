#!/usr/bin/env bun
/**
 * Demo Page Generator
 *
 * Creates demo pages in Sanity for each module category with:
 * - All modules from that category displayed
 * - Unsplash images where required
 * - Links to related categories at the bottom
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error("Missing environment variables:");
  console.error("- NEXT_PUBLIC_SANITY_PROJECT_ID:", projectId ? "✓" : "✗");
  console.error("- NEXT_PUBLIC_SANITY_DATASET:", dataset ? "✓" : "✗");
  console.error("- SANITY_API_WRITE_TOKEN:", token ? "✓" : "✗");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  useCdn: false,
  token,
});

// Generate unique keys for array items
function key(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Upload image from URL and return asset reference
async function uploadImage(
  url: string,
  filename: string
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } }> {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    const asset = await client.assets.upload("image", Buffer.from(buffer), {
      filename,
    });
    return {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
  } catch (error) {
    console.error(`Failed to upload image ${filename}:`, error);
    throw error;
  }
}

// Category definitions with related categories
interface Category {
  name: string;
  slug: string;
  description: string;
  related: string[];
}

const categories: Category[] = [
  {
    name: "Hero",
    slug: "demo-hero",
    description:
      "Hero sections are the first thing visitors see. They set the tone for your entire page.",
    related: ["features", "cta", "social-proof"],
  },
  {
    name: "Features",
    slug: "demo-features",
    description:
      "Showcase your product's capabilities with various feature display layouts.",
    related: ["hero", "pricing", "testimonials"],
  },
  {
    name: "Pricing",
    slug: "demo-pricing",
    description:
      "Present your pricing plans clearly with comparison tables and feature lists.",
    related: ["features", "faq", "cta"],
  },
  {
    name: "Testimonials",
    slug: "demo-testimonials",
    description:
      "Build trust with customer quotes, reviews, and success stories.",
    related: ["social-proof", "team", "trust"],
  },
  {
    name: "Team",
    slug: "demo-team",
    description:
      "Introduce your team members with photos, bios, and social links.",
    related: ["testimonials", "trust", "cta"],
  },
  {
    name: "CTA",
    slug: "demo-cta",
    description:
      "Drive conversions with compelling call-to-action sections.",
    related: ["hero", "pricing", "form"],
  },
  {
    name: "Social Proof",
    slug: "demo-social-proof",
    description:
      "Display logos, stats, and badges to build credibility.",
    related: ["testimonials", "logo-cloud", "trust"],
  },
  {
    name: "Logo Cloud",
    slug: "demo-logo-cloud",
    description:
      "Showcase partner and client logos in various layouts.",
    related: ["social-proof", "testimonials", "trust"],
  },
  {
    name: "FAQ",
    slug: "demo-faq",
    description:
      "Answer common questions with organized, searchable FAQ sections.",
    related: ["pricing", "features", "form"],
  },
  {
    name: "Gallery",
    slug: "demo-gallery",
    description:
      "Display images in grids, masonry layouts, and carousels.",
    related: ["media", "testimonials", "team"],
  },
  {
    name: "Blog Feature",
    slug: "demo-blog-feature",
    description:
      "Highlight blog posts with featured articles and post grids.",
    related: ["content", "gallery", "cta"],
  },
  {
    name: "Form",
    slug: "demo-form",
    description:
      "Collect user data with contact forms, newsletters, and multi-step wizards.",
    related: ["cta", "engagement", "hero"],
  },
  {
    name: "Trust",
    slug: "demo-trust",
    description:
      "Build credibility with awards, press mentions, and case studies.",
    related: ["testimonials", "social-proof", "logo-cloud"],
  },
  {
    name: "Content",
    slug: "demo-content",
    description:
      "Rich text blocks, quotes, stats, and comparison tables.",
    related: ["media", "interactive", "blog-feature"],
  },
  {
    name: "Media",
    slug: "demo-media",
    description:
      "Video embeds, before/after sliders, and code blocks.",
    related: ["gallery", "content", "interactive"],
  },
  {
    name: "Interactive",
    slug: "demo-interactive",
    description:
      "Tabs, accordions, timelines, and step-by-step guides.",
    related: ["content", "faq", "media"],
  },
  {
    name: "Engagement",
    slug: "demo-engagement",
    description:
      "Announcement bars, countdowns, sticky CTAs, and modals.",
    related: ["cta", "form", "utility"],
  },
  {
    name: "Utility",
    slug: "demo-utility",
    description:
      "Spacers, anchors, banners, downloads, and multi-column layouts.",
    related: ["content", "engagement", "interactive"],
  },
];

// Unsplash images for demo content
const unsplashImages = {
  hero: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop",
  team1:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
  team2:
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  team3:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  team4:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  feature1:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
  feature2:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
  feature3:
    "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=600&fit=crop",
  gallery1:
    "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&h=600&fit=crop",
  gallery2:
    "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
  gallery3:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  gallery4:
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop",
  gallery5:
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&h=600&fit=crop",
  gallery6:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
  testimonial:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop",
  logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
  beforeAfter1:
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop",
  beforeAfter2:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
  download:
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop",
  award:
    "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=200&h=200&fit=crop",
  press:
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=200&h=100&fit=crop",
  caseStudy:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  integration:
    "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=100&h=100&fit=crop",
};

// Create page intro module
function createIntroModule(category: Category) {
  return {
    _type: "richTextBlock",
    _key: key(),
    title: `${category.name} Modules`,
    content: [
      {
        _type: "block",
        _key: key(),
        style: "normal",
        children: [
          {
            _type: "span",
            _key: key(),
            text: category.description,
          },
        ],
      },
      {
        _type: "block",
        _key: key(),
        style: "normal",
        children: [
          {
            _type: "span",
            _key: key(),
            text: `This page demonstrates all available ${category.name.toLowerCase()} module variants. Use them to build compelling page sections.`,
          },
        ],
      },
    ],
    alignment: "center",
    maxWidth: "medium",
    backgroundColor: "default",
  };
}

// Create navigation module to related categories
function createNavModule(category: Category) {
  const relatedCategories = category.related.map((slug) =>
    categories.find((c) => c.slug === `demo-${slug}`)
  );

  const columns = relatedCategories.map((cat) => ({
    _type: "object",
    _key: key(),
    heading: cat?.name || "",
    content: [
      {
        _type: "block",
        _key: key(),
        style: "normal",
        children: [
          {
            _type: "span",
            _key: key(),
            text: cat?.description || "",
          },
        ],
      },
    ],
    link: {
      text: `View ${cat?.name}`,
      url: `/${cat?.slug}`,
    },
  }));

  return {
    _type: "featuresIconCards",
    _key: key(),
    badge: "Related Categories",
    heading: "Explore More",
    headingHighlight: "Modules",
    subheading:
      "Discover other module categories that work well with " +
      category.name.toLowerCase() +
      " sections.",
    features: relatedCategories.slice(0, 3).map((cat) => ({
      _key: key(),
      icon: getIconForCategory(cat?.slug || ""),
      title: cat?.name || "",
      description: cat?.description || "",
      link: {
        text: `View ${cat?.name}`,
        url: `/${cat?.slug}`,
      },
    })),
    spacing: "medium",
    backgroundColor: "gray",
  };
}

function getIconForCategory(slug: string): string {
  const iconMap: Record<string, string> = {
    "demo-hero": "Sparkles",
    "demo-features": "Grid",
    "demo-pricing": "CreditCard",
    "demo-testimonials": "MessageSquare",
    "demo-team": "Users",
    "demo-cta": "MousePointer",
    "demo-social-proof": "Award",
    "demo-logo-cloud": "Building",
    "demo-faq": "HelpCircle",
    "demo-gallery": "Image",
    "demo-blog-feature": "FileText",
    "demo-form": "Mail",
    "demo-trust": "Shield",
    "demo-content": "Type",
    "demo-media": "Video",
    "demo-interactive": "Layers",
    "demo-engagement": "Bell",
    "demo-utility": "Settings",
  };
  return iconMap[slug] || "Box";
}

// Hero modules
async function createHeroModules(images: Record<string, any>) {
  return [
    {
      _type: "heroDefault",
      _key: key(),
      badge: { text: "New Release v2.0", variant: "gradient" },
      heading: "Build Beautiful Pages",
      headingHighlight: "Without Code",
      subheading:
        "Create stunning landing pages with our modular page builder. Drag, drop, and customize to your heart's content.",
      primaryButton: {
        text: "Get Started Free",
        link: "/signup",
        variant: "primary",
      },
      secondaryButton: {
        text: "Watch Demo",
        link: "/demo",
        variant: "secondary",
      },
      backgroundStyle: "gradient-orbs",
      alignment: "center",
    },
    {
      _type: "heroCentered",
      _key: key(),
      badge: { text: "Trusted by 10,000+ teams", variant: "success" },
      heading: "The Modern Way to",
      headingHighlight: "Build Websites",
      subheading:
        "Join thousands of companies using our platform to create engaging web experiences.",
      buttons: [
        { _key: key(), text: "Start Building", link: "/start", variant: "primary" },
        { _key: key(), text: "View Examples", link: "/examples", variant: "outline" },
      ],
      trustedByText: "Trusted by industry leaders",
    },
    {
      _type: "heroSplit",
      _key: key(),
      heading: "Power Your Business",
      headingHighlight: "Growth",
      subheading:
        "Streamline operations, boost productivity, and scale your business with our comprehensive toolkit.",
      buttons: [
        { _key: key(), text: "Try Free", link: "/trial", variant: "primary" },
        { _key: key(), text: "Book Demo", link: "/demo", variant: "outline" },
      ],
      image: images.hero,
      imagePosition: "right",
      features: [
        { _key: key(), icon: "⚡", text: "Lightning fast performance" },
        { _key: key(), icon: "🔒", text: "Enterprise-grade security" },
        { _key: key(), icon: "📊", text: "Real-time analytics" },
      ],
    },
    {
      _type: "heroVideo",
      _key: key(),
      heading: "See It In Action",
      headingHighlight: "Live Demo",
      subheading:
        "Watch how easy it is to build professional pages in minutes.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      buttons: [
        { _key: key(), text: "Get Started", link: "/start", variant: "primary" },
      ],
      overlay: true,
    },
    {
      _type: "heroMinimal",
      _key: key(),
      heading: "Simple.",
      headingHighlight: "Powerful.",
      subheading: "Everything you need. Nothing you don't.",
      announcement: {
        text: "🎉 Just launched: AI-powered content suggestions",
        link: "/blog/ai-launch",
      },
      singleButton: {
        text: "Explore Features",
        link: "/features",
        variant: "primary",
      },
    },
  ];
}

// Features modules
async function createFeaturesModules(images: Record<string, any>) {
  return [
    {
      _type: "featuresGrid",
      _key: key(),
      badge: "Features",
      heading: "Everything You Need to",
      headingHighlight: "Succeed",
      subheading:
        "Powerful features designed to help you build, launch, and grow your digital presence.",
      features: [
        {
          _key: key(),
          icon: "Zap",
          title: "Lightning Fast",
          description:
            "Optimized for speed with sub-second load times and instant interactions.",
        },
        {
          _key: key(),
          icon: "Shield",
          title: "Secure by Default",
          description:
            "Enterprise-grade security with encryption, SSO, and compliance built-in.",
        },
        {
          _key: key(),
          icon: "BarChart",
          title: "Analytics Dashboard",
          description:
            "Track performance with real-time metrics and customizable reports.",
        },
        {
          _key: key(),
          icon: "Puzzle",
          title: "Integrations",
          description:
            "Connect with 100+ tools including Slack, Salesforce, and Zapier.",
        },
        {
          _key: key(),
          icon: "Users",
          title: "Team Collaboration",
          description:
            "Work together seamlessly with roles, permissions, and real-time editing.",
        },
        {
          _key: key(),
          icon: "Globe",
          title: "Global CDN",
          description:
            "Deliver content worldwide with edge caching and automatic optimization.",
        },
      ],
      columns: 3,
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "featuresAlternating",
      _key: key(),
      badge: "Deep Dive",
      heading: "Built for",
      headingHighlight: "Professionals",
      subheading:
        "Discover how our platform handles the complexities of modern web development.",
      items: [
        {
          _key: key(),
          heading: "Visual Page Builder",
          description:
            "Drag and drop components to create pixel-perfect layouts without writing code. Preview changes in real-time.",
          image: { ...images.feature1, alt: "Visual page builder interface" },
          features: [
            "50+ pre-built components",
            "Responsive design controls",
            "Version history",
          ],
        },
        {
          _key: key(),
          heading: "Content Management",
          description:
            "Organize and manage content with a powerful CMS. Schedule posts, manage assets, and collaborate with your team.",
          image: { ...images.feature2, alt: "Content management dashboard" },
          features: [
            "Scheduled publishing",
            "Asset management",
            "Multi-language support",
          ],
        },
        {
          _key: key(),
          heading: "Performance Optimization",
          description:
            "Automatic optimization for images, scripts, and assets. Get perfect Lighthouse scores out of the box.",
          image: { ...images.feature3, alt: "Performance metrics" },
          features: [
            "Image optimization",
            "Code splitting",
            "Lazy loading",
          ],
        },
      ],
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "featuresIconCards",
      _key: key(),
      badge: "Capabilities",
      heading: "Powerful Tools at Your",
      headingHighlight: "Fingertips",
      subheading:
        "Everything you need to build, deploy, and scale your projects.",
      features: [
        {
          _key: key(),
          icon: "Code",
          title: "Developer Tools",
          description:
            "CLI, APIs, and SDKs for custom development workflows.",
          link: { text: "View Docs", url: "/docs" },
        },
        {
          _key: key(),
          icon: "Paintbrush",
          title: "Design System",
          description:
            "Customizable themes, typography, and component library.",
          link: { text: "Browse Themes", url: "/themes" },
        },
        {
          _key: key(),
          icon: "Database",
          title: "Data Layer",
          description:
            "Structured content with relations, references, and queries.",
          link: { text: "Learn More", url: "/data" },
        },
        {
          _key: key(),
          icon: "Rocket",
          title: "Deployment",
          description:
            "One-click deploy to global edge network with preview URLs.",
          link: { text: "See Hosting", url: "/hosting" },
        },
      ],
      spacing: "medium",
      backgroundColor: "gray",
    },
  ];
}

// Pricing modules
async function createPricingModules() {
  return [
    {
      _type: "pricingCards",
      _key: key(),
      badge: "Pricing",
      heading: "Simple, Transparent",
      headingHighlight: "Pricing",
      subheading:
        "Choose the plan that fits your needs. All plans include core features.",
      plans: [
        {
          _key: key(),
          name: "Starter",
          price: "$0",
          period: "forever",
          description: "Perfect for personal projects and experimentation.",
          features: [
            { _key: key(), text: "Up to 3 projects", included: true },
            { _key: key(), text: "Basic analytics", included: true },
            { _key: key(), text: "Community support", included: true },
            { _key: key(), text: "Custom domains", included: false },
            { _key: key(), text: "Team collaboration", included: false },
          ],
          button: { text: "Get Started", link: "/signup", variant: "outline" },
          highlighted: false,
        },
        {
          _key: key(),
          name: "Pro",
          price: "$29",
          period: "per month",
          description: "For professionals and growing teams.",
          features: [
            { _key: key(), text: "Unlimited projects", included: true },
            { _key: key(), text: "Advanced analytics", included: true },
            { _key: key(), text: "Priority support", included: true },
            { _key: key(), text: "Custom domains", included: true },
            { _key: key(), text: "Team collaboration", included: true },
          ],
          button: { text: "Start Free Trial", link: "/trial", variant: "primary" },
          highlighted: true,
          badge: "Most Popular",
        },
        {
          _key: key(),
          name: "Enterprise",
          price: "Custom",
          period: "contact us",
          description: "For organizations with advanced needs.",
          features: [
            { _key: key(), text: "Everything in Pro", included: true },
            { _key: key(), text: "SSO/SAML", included: true },
            { _key: key(), text: "Dedicated support", included: true },
            { _key: key(), text: "SLA guarantee", included: true },
            { _key: key(), text: "Custom integrations", included: true },
          ],
          button: { text: "Contact Sales", link: "/contact", variant: "outline" },
          highlighted: false,
        },
      ],
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "pricingComparison",
      _key: key(),
      badge: "Compare Plans",
      heading: "Find Your Perfect",
      headingHighlight: "Fit",
      subheading: "Detailed feature comparison across all plans.",
      plans: [
        {
          _key: key(),
          name: "Free",
          price: "$0",
          button: { text: "Start Free", link: "/signup" },
        },
        {
          _key: key(),
          name: "Pro",
          price: "$29/mo",
          button: { text: "Try Pro", link: "/trial" },
          highlighted: true,
        },
        {
          _key: key(),
          name: "Enterprise",
          price: "Custom",
          button: { text: "Contact Us", link: "/contact" },
        },
      ],
      features: [
        { _key: key(), name: "Projects", values: ["3", "Unlimited", "Unlimited"] },
        { _key: key(), name: "Team Members", values: ["1", "10", "Unlimited"] },
        { _key: key(), name: "Storage", values: ["1 GB", "100 GB", "Unlimited"] },
        { _key: key(), name: "Custom Domains", values: ["false", "true", "true"] },
        { _key: key(), name: "API Access", values: ["false", "true", "true"] },
        { _key: key(), name: "SSO", values: ["false", "false", "true"] },
        { _key: key(), name: "Support", values: ["Community", "Priority", "Dedicated"] },
      ],
      spacing: "large",
      backgroundColor: "gray",
    },
    {
      _type: "pricingSimple",
      _key: key(),
      heading: "One Plan.",
      headingHighlight: "Everything Included.",
      subheading: "No tiers, no confusion. Just $49/month for everything.",
      price: "$49",
      period: "per month",
      features: [
        "Unlimited projects",
        "Unlimited team members",
        "All features included",
        "Priority support",
        "Custom domains",
        "API access",
      ],
      button: { text: "Start Your Free Trial", link: "/trial", variant: "primary" },
      spacing: "large",
      backgroundColor: "white",
    },
  ];
}

// Testimonials modules
async function createTestimonialsModules(images: Record<string, any>) {
  const testimonials = [
    {
      _key: key(),
      content:
        "This platform transformed how we build websites. What used to take weeks now takes hours.",
      author: "Sarah Chen",
      role: "Head of Product",
      company: "TechCorp",
      avatar: images.team1,
      rating: 5,
    },
    {
      _key: key(),
      content:
        "The best investment we've made. Our team productivity has increased by 300%.",
      author: "Michael Torres",
      role: "CTO",
      company: "StartupXYZ",
      avatar: images.team2,
      rating: 5,
    },
    {
      _key: key(),
      content:
        "Beautiful, intuitive, and incredibly powerful. Highly recommended!",
      author: "Emily Johnson",
      role: "Designer",
      company: "Creative Agency",
      avatar: images.team3,
      rating: 5,
    },
    {
      _key: key(),
      content:
        "Finally, a tool that understands what modern teams need. Game changer.",
      author: "David Kim",
      role: "Engineering Lead",
      company: "Enterprise Co",
      avatar: images.team4,
      rating: 5,
    },
  ];

  return [
    {
      _type: "testimonialsGrid",
      _key: key(),
      badge: "Testimonials",
      heading: "Loved by Teams",
      headingHighlight: "Worldwide",
      subheading: "See what our customers have to say about their experience.",
      testimonials: testimonials,
      columns: 2,
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "testimonialsCarousel",
      _key: key(),
      badge: "Reviews",
      heading: "What People Are",
      headingHighlight: "Saying",
      testimonials: testimonials,
      autoplay: true,
      autoplaySpeed: 5000,
      spacing: "large",
      backgroundColor: "gray",
    },
    {
      _type: "testimonialsFeatured",
      _key: key(),
      badge: "Featured Review",
      heading: "Trusted by",
      headingHighlight: "Industry Leaders",
      featured: {
        content:
          "This is hands down the best website builder I've ever used. The combination of power and ease-of-use is unmatched. Our team went from idea to launch in just two days.",
        author: "Alex Rivera",
        role: "VP of Engineering",
        company: "Fortune 500 Company",
        avatar: images.testimonial,
        rating: 5,
      },
      supporting: testimonials.slice(0, 3),
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "testimonialsCarouselLarge",
      _key: key(),
      testimonials: testimonials.map((t) => ({
        ...t,
        companyLogo: images.logo,
      })),
      autoplay: true,
      showNavigation: true,
      spacing: "large",
      backgroundColor: "gray",
    },
  ];
}

// Team modules
async function createTeamModules(images: Record<string, any>) {
  const members = [
    {
      _key: key(),
      name: "Alexandra Chen",
      role: "CEO & Co-Founder",
      bio: "Former Google engineer with 15 years of experience building developer tools.",
      image: { ...images.team1, alt: "Alexandra Chen" },
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      _key: key(),
      name: "Marcus Johnson",
      role: "CTO & Co-Founder",
      bio: "Led engineering teams at Stripe and Airbnb. Passionate about DX.",
      image: { ...images.team2, alt: "Marcus Johnson" },
      socialLinks: {
        linkedin: "https://linkedin.com",
        github: "https://github.com",
      },
    },
    {
      _key: key(),
      name: "Priya Patel",
      role: "Head of Design",
      bio: "Award-winning designer previously at Apple and Figma.",
      image: { ...images.team3, alt: "Priya Patel" },
      socialLinks: {
        linkedin: "https://linkedin.com",
        twitter: "https://twitter.com",
      },
    },
    {
      _key: key(),
      name: "Jordan Williams",
      role: "VP of Engineering",
      bio: "Systems architect with expertise in distributed systems and performance.",
      image: { ...images.team4, alt: "Jordan Williams" },
      socialLinks: {
        github: "https://github.com",
        linkedin: "https://linkedin.com",
      },
    },
  ];

  return [
    {
      _type: "teamGrid",
      _key: key(),
      badge: "Our Team",
      heading: "Meet the People Behind",
      headingHighlight: "the Product",
      subheading:
        "We're a diverse team of builders, designers, and problem solvers.",
      members: members,
      columns: 4,
      showBio: true,
      showSocial: true,
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "teamCards",
      _key: key(),
      badge: "Leadership",
      heading: "Experienced",
      headingHighlight: "Leaders",
      subheading: "Our leadership team brings decades of industry experience.",
      members: members.slice(0, 3),
      columns: 3,
      variant: "cards",
      spacing: "large",
      backgroundColor: "gray",
    },
    {
      _type: "teamCompact",
      _key: key(),
      badge: "Team",
      heading: "Our",
      headingHighlight: "Crew",
      members: members,
      showRole: true,
      spacing: "medium",
      backgroundColor: "white",
    },
  ];
}

// CTA modules
async function createCTAModules(images: Record<string, any>) {
  return [
    {
      _type: "ctaDefault",
      _key: key(),
      heading: "Ready to Get Started?",
      headingHighlight: "Get Started",
      subheading:
        "Join thousands of teams building better websites. Start free, no credit card required.",
      buttons: [
        { _key: key(), text: "Start Building Free", link: "/signup", variant: "primary" },
        { _key: key(), text: "Schedule Demo", link: "/demo", variant: "outline" },
      ],
      spacing: "large",
      backgroundColor: "accent",
    },
    {
      _type: "ctaNewsletter",
      _key: key(),
      heading: "Stay in the Loop",
      subheading:
        "Get the latest updates, tips, and resources delivered to your inbox.",
      placeholder: "Enter your email",
      buttonText: "Subscribe",
      privacyText: "We respect your privacy. Unsubscribe anytime.",
      spacing: "medium",
      backgroundColor: "muted",
    },
    {
      _type: "ctaSplit",
      _key: key(),
      heading: "Transform Your Workflow",
      headingHighlight: "Transform",
      subheading:
        "See how our platform can help you build faster and smarter.",
      buttons: [
        { _key: key(), text: "Get Started", link: "/start", variant: "primary" },
      ],
      image: images.feature1,
      imagePosition: "right",
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "ctaBanner",
      _key: key(),
      heading: "Special Launch Offer",
      headingHighlight: "50% Off",
      subheading: "Get 50% off your first year. Limited time only.",
      buttons: [
        { _key: key(), text: "Claim Offer", link: "/offer", variant: "primary" },
      ],
      backgroundType: "gradient",
      spacing: "medium",
    },
    {
      _type: "ctaStats",
      _key: key(),
      heading: "Join the Movement",
      subheading:
        "See why teams are switching to our platform.",
      stats: [
        { _key: key(), value: "10K+", label: "Active Users" },
        { _key: key(), value: "50M+", label: "Pages Built" },
        { _key: key(), value: "99.9%", label: "Uptime" },
        { _key: key(), value: "4.9", label: "Average Rating" },
      ],
      buttons: [
        { _key: key(), text: "Join Now", link: "/signup", variant: "primary" },
      ],
      spacing: "large",
      backgroundColor: "accent",
    },
  ];
}

// Social Proof modules
async function createSocialProofModules(images: Record<string, any>) {
  return [
    {
      _type: "socialProofLogos",
      _key: key(),
      heading: "Trusted by Industry Leaders",
      logos: [
        { _key: key(), image: images.logo, alt: "Company 1", name: "TechCorp" },
        { _key: key(), image: images.logo, alt: "Company 2", name: "StartupXYZ" },
        { _key: key(), image: images.logo, alt: "Company 3", name: "Enterprise Co" },
        { _key: key(), image: images.logo, alt: "Company 4", name: "Agency Inc" },
        { _key: key(), image: images.logo, alt: "Company 5", name: "Global Ltd" },
        { _key: key(), image: images.logo, alt: "Company 6", name: "Innovate Labs" },
      ],
      style: "hover-reveal",
      columns: 6,
      spacing: "medium",
      backgroundColor: "white",
    },
    {
      _type: "socialProofStats",
      _key: key(),
      heading: "By the Numbers",
      subheading: "Impact we've made together",
      stats: [
        { _key: key(), value: "10,000+", label: "Happy Customers", icon: "Users" },
        { _key: key(), value: "$50M+", label: "Revenue Generated", icon: "DollarSign" },
        { _key: key(), value: "150+", label: "Countries Served", icon: "Globe" },
        { _key: key(), value: "24/7", label: "Support Available", icon: "Clock" },
      ],
      variant: "cards",
      columns: 4,
      spacing: "large",
      backgroundColor: "gray",
    },
  ];
}

// Logo Cloud modules
async function createLogoCloudModules(images: Record<string, any>) {
  const logos = [
    { _key: key(), image: images.logo, alt: "Partner 1", name: "TechCorp" },
    { _key: key(), image: images.logo, alt: "Partner 2", name: "InnovateLabs" },
    { _key: key(), image: images.logo, alt: "Partner 3", name: "GlobalTech" },
    { _key: key(), image: images.logo, alt: "Partner 4", name: "StartupXYZ" },
    { _key: key(), image: images.logo, alt: "Partner 5", name: "Enterprise" },
    { _key: key(), image: images.logo, alt: "Partner 6", name: "Agency Inc" },
  ];

  return [
    {
      _type: "logoCloudSimple",
      _key: key(),
      heading: "Our Partners",
      logos: logos,
      grayscale: true,
      spacing: "medium",
      backgroundColor: "white",
    },
    {
      _type: "logoCloudMarquee",
      _key: key(),
      heading: "Trusted Worldwide",
      logos: [...logos, ...logos],
      speed: "medium",
      direction: "left",
      pauseOnHover: true,
      spacing: "medium",
      backgroundColor: "gray",
    },
    {
      _type: "logoCloudGrid",
      _key: key(),
      badge: "Partners",
      heading: "Working with the",
      headingHighlight: "Best",
      subheading: "We partner with industry-leading companies to deliver exceptional results.",
      logos: logos,
      columns: 6,
      spacing: "large",
      backgroundColor: "white",
    },
  ];
}

// FAQ modules
async function createFAQModules() {
  const faqs = [
    {
      _key: key(),
      question: "How do I get started?",
      answer:
        "Simply sign up for a free account and you can start building immediately. No credit card required.",
    },
    {
      _key: key(),
      question: "Can I use my own domain?",
      answer:
        "Yes! You can connect any custom domain on paid plans. We handle SSL certificates automatically.",
    },
    {
      _key: key(),
      question: "Is there a free plan?",
      answer:
        "Yes, our Starter plan is free forever. It includes up to 3 projects and basic features.",
    },
    {
      _key: key(),
      question: "How does billing work?",
      answer:
        "We offer monthly and annual billing. Annual plans come with a 20% discount.",
    },
    {
      _key: key(),
      question: "Can I cancel anytime?",
      answer:
        "Absolutely. You can cancel your subscription at any time with no hidden fees or penalties.",
    },
    {
      _key: key(),
      question: "Do you offer support?",
      answer:
        "Yes, all plans include support. Paid plans get priority support with faster response times.",
    },
  ];

  return [
    {
      _type: "faqAccordion",
      _key: key(),
      badge: "FAQ",
      heading: "Frequently Asked",
      headingHighlight: "Questions",
      subheading: "Find answers to common questions about our platform.",
      items: faqs,
      allowMultiple: false,
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "faqTwoColumn",
      _key: key(),
      badge: "Help Center",
      heading: "Got Questions?",
      headingHighlight: "We Have Answers",
      leftItems: faqs.slice(0, 3),
      rightItems: faqs.slice(3),
      spacing: "large",
      backgroundColor: "gray",
    },
    {
      _type: "faqWithCategories",
      _key: key(),
      badge: "Knowledge Base",
      heading: "Browse by",
      headingHighlight: "Topic",
      categories: [
        {
          _key: key(),
          name: "Getting Started",
          items: faqs.slice(0, 2),
        },
        {
          _key: key(),
          name: "Billing",
          items: faqs.slice(2, 4),
        },
        {
          _key: key(),
          name: "Support",
          items: faqs.slice(4),
        },
      ],
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "faqSimple",
      _key: key(),
      heading: "Questions & Answers",
      items: faqs.slice(0, 4),
      showContactCta: true,
      contactText: "Still have questions?",
      contactButton: { text: "Contact Us", link: "/contact" },
      spacing: "medium",
      backgroundColor: "gray",
    },
  ];
}

// Gallery modules
async function createGalleryModules(images: Record<string, any>) {
  const galleryImages = [
    { _key: key(), image: images.gallery1, caption: "Modern office space", alt: "Office interior" },
    { _key: key(), image: images.gallery2, caption: "Team collaboration", alt: "Team meeting" },
    { _key: key(), image: images.gallery3, caption: "Creative workspace", alt: "Creative desk" },
    { _key: key(), image: images.gallery4, caption: "Conference room", alt: "Meeting room" },
    { _key: key(), image: images.gallery5, caption: "Open floor plan", alt: "Open office" },
    { _key: key(), image: images.gallery6, caption: "Team building", alt: "Team activity" },
  ];

  return [
    {
      _type: "galleryGrid",
      _key: key(),
      badge: "Gallery",
      heading: "Our",
      headingHighlight: "Workspace",
      subheading: "Take a peek inside our creative environment.",
      images: galleryImages,
      columns: 3,
      gap: "medium",
      enableLightbox: true,
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "galleryMasonry",
      _key: key(),
      badge: "Photos",
      heading: "Life at",
      headingHighlight: "Our Company",
      images: galleryImages.map((img, i) => ({
        ...img,
        size: i === 0 || i === 3 ? "large" : i % 3 === 0 ? "medium" : "small",
      })),
      enableLightbox: true,
      spacing: "large",
      backgroundColor: "gray",
    },
    {
      _type: "galleryCarousel",
      _key: key(),
      badge: "Slideshow",
      heading: "Featured",
      headingHighlight: "Moments",
      images: galleryImages,
      autoplay: true,
      autoplaySpeed: 4000,
      showThumbnails: true,
      spacing: "large",
      backgroundColor: "white",
    },
  ];
}

// Blog Feature modules
async function createBlogFeatureModules() {
  return [
    {
      _type: "blogFeaturedPost",
      _key: key(),
      badge: "Featured",
      heading: "Latest from the",
      headingHighlight: "Blog",
      postSelection: "latest",
      showExcerpt: true,
      showDate: true,
      showAuthor: true,
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "blogGrid",
      _key: key(),
      badge: "Blog",
      heading: "Recent",
      headingHighlight: "Articles",
      subheading: "Insights, tutorials, and updates from our team.",
      postSelection: "latest",
      postsToShow: 6,
      columns: 3,
      showExcerpt: true,
      showDate: true,
      spacing: "large",
      backgroundColor: "gray",
    },
    {
      _type: "blogList",
      _key: key(),
      badge: "Updates",
      heading: "What's",
      headingHighlight: "New",
      postSelection: "latest",
      postsToShow: 5,
      showExcerpt: true,
      showDate: true,
      showImage: true,
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "blogCarousel",
      _key: key(),
      heading: "Popular Posts",
      postSelection: "latest",
      postsToShow: 6,
      autoplay: true,
      showExcerpt: true,
      spacing: "medium",
      backgroundColor: "gray",
    },
    {
      _type: "blogMinimal",
      _key: key(),
      heading: "Quick Reads",
      postSelection: "latest",
      postsToShow: 4,
      showDate: true,
      spacing: "medium",
      backgroundColor: "white",
    },
  ];
}

// Form modules
async function createFormModules(images: Record<string, any>) {
  return [
    {
      _type: "formContact",
      _key: key(),
      badge: "Contact",
      heading: "Get in",
      headingHighlight: "Touch",
      subheading:
        "Have a question or want to work together? We'd love to hear from you.",
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "formNewsletter",
      _key: key(),
      heading: "Subscribe to Our Newsletter",
      subheading: "Get weekly updates on the latest features and tips.",
      placeholder: "your@email.com",
      buttonText: "Subscribe",
      privacyText: "We respect your privacy. Unsubscribe anytime.",
      spacing: "medium",
      backgroundColor: "accent",
    },
    {
      _type: "formWithImage",
      _key: key(),
      badge: "Let's Talk",
      heading: "Start a",
      headingHighlight: "Conversation",
      subheading: "Fill out the form and we'll be in touch within 24 hours.",
      image: images.feature2,
      imagePosition: "right",
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "formMultiStep",
      _key: key(),
      badge: "Onboarding",
      heading: "Tell Us About Your",
      headingHighlight: "Project",
      subheading: "Complete this quick form to get started",
      steps: [
        {
          _key: key(),
          title: "Basic Info",
          description: "Let's start with the basics",
          fields: [
            {
              _key: key(),
              name: "fullName",
              label: "Full Name",
              type: "text",
              placeholder: "John Doe",
              required: true,
              width: "full",
            },
            {
              _key: key(),
              name: "email",
              label: "Email Address",
              type: "email",
              placeholder: "john@example.com",
              required: true,
              width: "full",
            },
            {
              _key: key(),
              name: "company",
              label: "Company Name",
              type: "text",
              placeholder: "Acme Inc.",
              required: false,
              width: "full",
            },
          ],
        },
        {
          _key: key(),
          title: "Project Details",
          description: "Tell us about your project",
          fields: [
            {
              _key: key(),
              name: "projectType",
              label: "Project Type",
              type: "select",
              required: true,
              width: "full",
              options: [
                { label: "Web Application", value: "web-app" },
                { label: "Mobile App", value: "mobile-app" },
                { label: "E-commerce", value: "ecommerce" },
                { label: "Other", value: "other" },
              ],
            },
            {
              _key: key(),
              name: "budget",
              label: "Budget Range",
              type: "select",
              required: true,
              width: "full",
              options: [
                { label: "Under $10k", value: "under-10k" },
                { label: "$10k - $50k", value: "10k-50k" },
                { label: "$50k - $100k", value: "50k-100k" },
                { label: "Over $100k", value: "over-100k" },
              ],
            },
            {
              _key: key(),
              name: "timeline",
              label: "Expected Timeline",
              type: "select",
              required: true,
              width: "full",
              options: [
                { label: "ASAP (< 1 month)", value: "asap" },
                { label: "1-3 months", value: "1-3-months" },
                { label: "3-6 months", value: "3-6-months" },
                { label: "6+ months", value: "6-plus-months" },
              ],
            },
          ],
        },
        {
          _key: key(),
          title: "Preferences",
          description: "Set your preferences",
          fields: [
            {
              _key: key(),
              name: "projectDescription",
              label: "Project Description",
              type: "textarea",
              placeholder: "Tell us about your project...",
              required: true,
              width: "full",
              rows: 4,
            },
            {
              _key: key(),
              name: "newsletter",
              label: "Subscribe to our newsletter for updates",
              type: "checkbox",
              required: false,
              width: "full",
            },
          ],
        },
      ],
      submitText: "Submit Application",
      successMessage: "Thank you! We'll review your application and get back to you soon.",
      showProgressBar: true,
      spacing: { _ref: "spacing-large" },
      backgroundColor: { _ref: "background-gray" },
    },
    {
      _type: "formDynamic",
      _key: key(),
      badge: "Quick Form",
      heading: "Request a",
      headingHighlight: "Demo",
      subheading: "See our platform in action with a personalized demo.",
      layout: "centered",
      spacing: "large",
      backgroundColor: "white",
    },
  ];
}

// Trust modules
async function createTrustModules(images: Record<string, any>) {
  return [
    {
      _type: "awards",
      _key: key(),
      badge: "Recognition",
      heading: "Award-Winning",
      headingHighlight: "Platform",
      subheading: "Recognized by industry leaders for excellence.",
      awards: [
        {
          _key: key(),
          name: "Best SaaS Product 2024",
          organization: "TechAwards",
          year: "2024",
          image: images.award,
        },
        {
          _key: key(),
          name: "Top 100 Startups",
          organization: "Forbes",
          year: "2024",
          image: images.award,
        },
        {
          _key: key(),
          name: "Users' Choice Award",
          organization: "G2 Crowd",
          year: "2024",
          image: images.award,
        },
        {
          _key: key(),
          name: "Innovation Excellence",
          organization: "ProductHunt",
          year: "2024",
          image: images.award,
        },
      ],
      variant: "grid",
      columns: 4,
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "pressMentions",
      _key: key(),
      badge: "In the Press",
      heading: "Featured",
      headingHighlight: "Coverage",
      mentions: [
        {
          _key: key(),
          publication: "TechCrunch",
          quote: "A game-changing platform for modern web development.",
          logo: images.press,
          link: "https://techcrunch.com",
        },
        {
          _key: key(),
          publication: "Forbes",
          quote: "The future of website building is here.",
          logo: images.press,
          link: "https://forbes.com",
        },
        {
          _key: key(),
          publication: "Wired",
          quote: "Simplifying complexity without sacrificing power.",
          logo: images.press,
          link: "https://wired.com",
        },
      ],
      variant: "with-quotes",
      spacing: "large",
      backgroundColor: "gray",
    },
    {
      _type: "caseStudyCards",
      _key: key(),
      badge: "Case Studies",
      heading: "Success",
      headingHighlight: "Stories",
      subheading: "See how companies are achieving results with our platform.",
      caseStudies: [
        {
          _key: key(),
          title: "How TechCorp Increased Conversions by 200%",
          description:
            "Learn how TechCorp used our platform to redesign their marketing site.",
          image: images.caseStudy,
          stats: [
            { label: "Conversion Rate", value: "+200%" },
            { label: "Page Speed", value: "2x Faster" },
          ],
          link: "/case-studies/techcorp",
        },
        {
          _key: key(),
          title: "StartupXYZ's Journey to 10K Users",
          description:
            "Discover how StartupXYZ scaled their landing pages for growth.",
          image: images.caseStudy,
          stats: [
            { label: "Users", value: "10K+" },
            { label: "Revenue", value: "+150%" },
          ],
          link: "/case-studies/startupxyz",
        },
      ],
      variant: "grid",
      columns: 2,
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "integrationGrid",
      _key: key(),
      badge: "Integrations",
      heading: "Works With Your",
      headingHighlight: "Favorite Tools",
      subheading: "Connect with 100+ popular apps and services.",
      integrations: [
        {
          _key: key(),
          name: "Slack",
          description: "Team communication",
          icon: images.integration,
          category: "Communication",
        },
        {
          _key: key(),
          name: "Salesforce",
          description: "CRM & Sales",
          icon: images.integration,
          category: "Sales",
        },
        {
          _key: key(),
          name: "Zapier",
          description: "Automation",
          icon: images.integration,
          category: "Automation",
        },
        {
          _key: key(),
          name: "Google Analytics",
          description: "Analytics",
          icon: images.integration,
          category: "Analytics",
        },
        {
          _key: key(),
          name: "Stripe",
          description: "Payments",
          icon: images.integration,
          category: "Payments",
        },
        {
          _key: key(),
          name: "Mailchimp",
          description: "Email Marketing",
          icon: images.integration,
          category: "Marketing",
        },
      ],
      variant: "grid",
      columns: 6,
      showSearch: false,
      spacing: "large",
      backgroundColor: "gray",
    },
  ];
}

// Content modules
async function createContentModules(images: Record<string, any>) {
  return [
    {
      _type: "richTextBlock",
      _key: key(),
      title: "About Our Platform",
      content: [
        {
          _type: "block",
          _key: key(),
          style: "normal",
          children: [
            {
              _type: "span",
              _key: key(),
              text: "Our platform empowers teams to build beautiful, high-performance websites without the complexity of traditional development. Whether you're a startup founder, marketing team, or enterprise organization, we provide the tools you need to succeed.",
            },
          ],
        },
        {
          _type: "block",
          _key: key(),
          style: "h2",
          children: [
            {
              _type: "span",
              _key: key(),
              text: "Built for Speed",
            },
          ],
        },
        {
          _type: "block",
          _key: key(),
          style: "normal",
          children: [
            {
              _type: "span",
              _key: key(),
              text: "Every page built with our platform is optimized for performance. From automatic image optimization to intelligent code splitting, we handle the technical details so you can focus on your content.",
            },
          ],
        },
      ],
      alignment: "left",
      maxWidth: "medium",
      backgroundColor: "default",
    },
    {
      _type: "quote",
      _key: key(),
      quote:
        "The best websites are built with intention, not just code. Our platform helps teams focus on what matters: creating meaningful experiences for their users.",
      attribution: "Alexandra Chen",
      role: "CEO & Co-Founder",
      image: images.team1,
      variant: "with-image",
      backgroundColor: "muted",
    },
    {
      _type: "statsCounter",
      _key: key(),
      title: "Platform Impact",
      subtitle: "Numbers that speak for themselves",
      stats: [
        { _key: key(), value: "50", label: "Million Pages Served", prefix: "", suffix: "M+" },
        { _key: key(), value: "99.99", label: "Uptime SLA", prefix: "", suffix: "%" },
        { _key: key(), value: "500", label: "Avg Response Time", prefix: "", suffix: "ms" },
        { _key: key(), value: "4.9", label: "Customer Rating", prefix: "", suffix: "/5" },
      ],
      columns: 4,
      variant: "cards",
      backgroundColor: "accent",
    },
    {
      _type: "comparisonTable",
      _key: key(),
      title: "How We Compare",
      subtitle: "See how our platform stacks up against alternatives",
      columns: [
        {
          _key: key(),
          title: "Traditional Dev",
          price: "$$$",
          buttonText: "Learn More",
          buttonLink: "/compare/traditional",
          highlighted: false,
        },
        {
          _key: key(),
          title: "Our Platform",
          price: "$",
          buttonText: "Get Started",
          buttonLink: "/signup",
          highlighted: true,
        },
        {
          _key: key(),
          title: "Other Builders",
          price: "$$",
          buttonText: "Compare",
          buttonLink: "/compare/others",
          highlighted: false,
        },
      ],
      rows: [
        { _key: key(), feature: "Setup Time", values: ["Weeks", "Minutes", "Hours"] },
        { _key: key(), feature: "Performance", values: ["Varies", "Optimized", "Basic"] },
        { _key: key(), feature: "SEO Built-in", values: ["false", "true", "Limited"] },
        { _key: key(), feature: "Team Collaboration", values: ["Complex", "Easy", "Basic"] },
        { _key: key(), feature: "Maintenance", values: ["Ongoing", "Minimal", "Moderate"] },
      ],
      backgroundColor: "default",
    },
  ];
}

// Media modules
async function createMediaModules(images: Record<string, any>) {
  return [
    {
      _type: "videoEmbed",
      _key: key(),
      badge: "Demo Video",
      heading: "See It In",
      headingHighlight: "Action",
      subheading: "Watch a quick demo of our platform's key features.",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      posterImage: images.feature1,
      autoplay: false,
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "beforeAfter",
      _key: key(),
      badge: "Transformation",
      heading: "Before &",
      headingHighlight: "After",
      subheading: "See the difference our platform can make.",
      beforeImage: { ...images.beforeAfter1, alt: "Before redesign", label: "Before" },
      afterImage: { ...images.beforeAfter2, alt: "After redesign", label: "After" },
      orientation: "horizontal",
      startPosition: 50,
      spacing: "large",
      backgroundColor: "gray",
    },
    {
      _type: "codeBlock",
      _key: key(),
      badge: "Developer-Friendly",
      heading: "Clean, Simple",
      headingHighlight: "API",
      code: `import { createPage } from '@platform/sdk';

const page = await createPage({
  title: 'My Landing Page',
  modules: [
    { type: 'hero', heading: 'Welcome!' },
    { type: 'features', items: [...] },
    { type: 'cta', text: 'Get Started' }
  ]
});

console.log('Page created:', page.url);`,
      language: "typescript",
      showLineNumbers: true,
      highlightLines: [1, 3, 10],
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "embedBlock",
      _key: key(),
      badge: "Live Demo",
      heading: "Interactive",
      headingHighlight: "Playground",
      subheading: "Try our component library directly in your browser.",
      embedCode:
        '<iframe src="https://codesandbox.io/embed/example" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"></iframe>',
      aspectRatio: "16:9",
      spacing: "large",
      backgroundColor: "gray",
    },
  ];
}

// Interactive modules
async function createInteractiveModules() {
  return [
    {
      _type: "tabs",
      _key: key(),
      badge: "Features",
      heading: "Explore Our",
      headingHighlight: "Capabilities",
      tabs: [
        {
          _key: key(),
          title: "Design",
          icon: "Paintbrush",
          content: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "Create stunning designs with our visual editor. Drag and drop components, customize styles, and preview changes in real-time.",
                },
              ],
            },
          ],
        },
        {
          _key: key(),
          title: "Develop",
          icon: "Code",
          content: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "For developers, we offer full access to the codebase, APIs, and CLI tools. Build custom components and integrations.",
                },
              ],
            },
          ],
        },
        {
          _key: key(),
          title: "Deploy",
          icon: "Rocket",
          content: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "One-click deployment to our global edge network. Preview URLs, rollbacks, and automatic SSL included.",
                },
              ],
            },
          ],
        },
      ],
      variant: "default",
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "accordion",
      _key: key(),
      badge: "Details",
      heading: "Technical",
      headingHighlight: "Specifications",
      items: [
        {
          _key: key(),
          title: "Infrastructure",
          content: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "Built on a globally distributed edge network with 200+ PoPs worldwide. Automatic failover and 99.99% uptime SLA.",
                },
              ],
            },
          ],
        },
        {
          _key: key(),
          title: "Security",
          content: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "SOC 2 Type II certified. All data encrypted at rest and in transit. SSO/SAML support for enterprise customers.",
                },
              ],
            },
          ],
        },
        {
          _key: key(),
          title: "Performance",
          content: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "Automatic image optimization, code splitting, and lazy loading. Average Lighthouse score: 95+.",
                },
              ],
            },
          ],
        },
      ],
      variant: "bordered",
      allowMultiple: true,
      spacing: "large",
      backgroundColor: "gray",
    },
    {
      _type: "steps",
      _key: key(),
      badge: "Getting Started",
      heading: "How It",
      headingHighlight: "Works",
      subheading: "Get up and running in three simple steps.",
      steps: [
        {
          _key: key(),
          title: "Sign Up",
          description: "Create your free account in seconds. No credit card required.",
          icon: "UserPlus",
        },
        {
          _key: key(),
          title: "Build",
          description: "Use our visual editor to create your pages. Drag, drop, customize.",
          icon: "Hammer",
        },
        {
          _key: key(),
          title: "Launch",
          description: "Publish with one click. Your site goes live on our global CDN.",
          icon: "Rocket",
        },
      ],
      variant: "numbered",
      spacing: "large",
      backgroundColor: "white",
    },
    {
      _type: "timeline",
      _key: key(),
      badge: "Our Journey",
      heading: "Company",
      headingHighlight: "Milestones",
      events: [
        {
          _key: key(),
          date: "2020",
          title: "Founded",
          description: "Started in a garage with a vision to democratize web development.",
        },
        {
          _key: key(),
          date: "2021",
          title: "Seed Funding",
          description: "Raised $5M to build out the core platform and grow the team.",
        },
        {
          _key: key(),
          date: "2022",
          title: "Public Launch",
          description: "Launched publicly and reached 1,000 customers in the first month.",
        },
        {
          _key: key(),
          date: "2023",
          title: "Series A",
          description: "Raised $25M to expand globally and add enterprise features.",
        },
        {
          _key: key(),
          date: "2024",
          title: "10K Customers",
          description: "Crossed 10,000 paying customers across 50+ countries.",
        },
      ],
      orientation: "vertical",
      variant: "alternating",
      spacing: "large",
      backgroundColor: "gray",
    },
  ];
}

// Engagement modules
async function createEngagementModules() {
  return [
    {
      _type: "announcementBar",
      _key: key(),
      text: "🎉 New: AI-powered content suggestions now available!",
      link: "/blog/ai-launch",
      linkText: "Learn more",
      variant: "gradient",
      dismissible: true,
      position: "top",
    },
    {
      _type: "countdown",
      _key: key(),
      badge: "Limited Time",
      heading: "Black Friday",
      headingHighlight: "Sale",
      subheading: "Get 50% off all annual plans. Offer ends soon!",
      targetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      expiredMessage: "This offer has ended. Check out our current deals.",
      button: { text: "Claim Offer", link: "/offer", variant: "primary" },
      spacing: "large",
      backgroundColor: "accent",
    },
    {
      _type: "stickyCta",
      _key: key(),
      text: "Ready to get started?",
      buttonText: "Start Free Trial",
      buttonLink: "/trial",
      variant: "primary",
      position: "bottom-right",
      showAfterScroll: 500,
    },
    {
      _type: "modal",
      _key: key(),
      heading: "Wait! Before You Go...",
      subheading: "Get 20% off your first order when you sign up for our newsletter.",
      content: [
        {
          _type: "block",
          _key: key(),
          style: "normal",
          children: [
            {
              _type: "span",
              _key: key(),
              text: "Join 10,000+ subscribers who get our weekly tips and exclusive offers.",
            },
          ],
        },
      ],
      showForm: true,
      formPlaceholder: "Enter your email",
      formButtonText: "Get 20% Off",
      trigger: "exit-intent",
      delay: 0,
      scrollDepth: 0,
    },
  ];
}

// Utility modules
async function createUtilityModules(images: Record<string, any>) {
  return [
    {
      _type: "spacer",
      _key: key(),
      size: "large",
      showDivider: true,
      dividerStyle: "solid",
    },
    {
      _type: "anchorPoint",
      _key: key(),
      id: "getting-started",
      label: "Getting Started Section",
    },
    {
      _type: "banner",
      _key: key(),
      type: "info",
      heading: "System Status",
      message: "All systems operational. Last updated 5 minutes ago.",
      dismissible: true,
      icon: "Info",
    },
    {
      _type: "banner",
      _key: key(),
      type: "warning",
      heading: "Scheduled Maintenance",
      message: "We'll be performing maintenance on Saturday from 2-4 AM UTC.",
      dismissible: true,
      icon: "AlertTriangle",
    },
    {
      _type: "banner",
      _key: key(),
      type: "success",
      heading: "New Feature Released",
      message: "AI-powered suggestions are now available for all users!",
      dismissible: true,
      link: "/blog/ai-launch",
      linkText: "Learn more",
      icon: "CheckCircle",
    },
    {
      _type: "downloadCards",
      _key: key(),
      badge: "Resources",
      heading: "Download Our",
      headingHighlight: "Resources",
      subheading: "Free guides, templates, and tools to help you succeed.",
      downloads: [
        {
          _key: key(),
          title: "Getting Started Guide",
          description: "Everything you need to know to get up and running quickly.",
          fileType: "PDF",
          fileSize: "2.4 MB",
          image: images.download,
          downloadUrl: "/downloads/getting-started.pdf",
        },
        {
          _key: key(),
          title: "Brand Guidelines",
          description: "Logos, colors, and typography for consistent branding.",
          fileType: "ZIP",
          fileSize: "15 MB",
          image: images.download,
          downloadUrl: "/downloads/brand-kit.zip",
        },
        {
          _key: key(),
          title: "API Reference",
          description: "Complete documentation for our REST API.",
          fileType: "PDF",
          fileSize: "1.8 MB",
          image: images.download,
          downloadUrl: "/downloads/api-docs.pdf",
        },
      ],
      variant: "grid",
      columns: 3,
      spacing: "large",
      backgroundColor: "gray",
    },
    {
      _type: "multiColumn",
      _key: key(),
      columns: 3,
      columnContent: [
        {
          _key: key(),
          heading: "Column 1",
          content: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "Multi-column layouts allow you to organize content side-by-side. Great for comparisons, feature lists, or any content that benefits from horizontal organization.",
                },
              ],
            },
          ],
        },
        {
          _key: key(),
          heading: "Column 2",
          content: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "Each column can contain rich text, images, and other content. The layout automatically adjusts for mobile devices, stacking columns vertically.",
                },
              ],
            },
          ],
        },
        {
          _key: key(),
          heading: "Column 3",
          content: [
            {
              _type: "block",
              _key: key(),
              style: "normal",
              children: [
                {
                  _type: "span",
                  _key: key(),
                  text: "Use multi-column layouts to break up long content sections, create visual interest, and improve readability for your visitors.",
                },
              ],
            },
          ],
        },
      ],
      gap: "medium",
      spacing: "large",
      backgroundColor: "white",
    },
  ];
}

// Main generator function
async function generateDemoPages() {
  console.log("🚀 Starting demo page generation...\n");

  // Upload images first
  console.log("📸 Uploading images from Unsplash...");
  const images: Record<string, any> = {};

  for (const [name, url] of Object.entries(unsplashImages)) {
    try {
      console.log(`  Uploading ${name}...`);
      images[name] = await uploadImage(url, `${name}.jpg`);
    } catch (error) {
      console.error(`  Failed to upload ${name}, using placeholder`);
      images[name] = null;
    }
  }

  console.log("✅ Images uploaded\n");

  // Generate modules for each category
  const moduleGenerators: Record<string, () => Promise<any[]>> = {
    "demo-hero": () => createHeroModules(images),
    "demo-features": () => createFeaturesModules(images),
    "demo-pricing": () => createPricingModules(),
    "demo-testimonials": () => createTestimonialsModules(images),
    "demo-team": () => createTeamModules(images),
    "demo-cta": () => createCTAModules(images),
    "demo-social-proof": () => createSocialProofModules(images),
    "demo-logo-cloud": () => createLogoCloudModules(images),
    "demo-faq": () => createFAQModules(),
    "demo-gallery": () => createGalleryModules(images),
    "demo-blog-feature": () => createBlogFeatureModules(),
    "demo-form": () => createFormModules(images),
    "demo-trust": () => createTrustModules(images),
    "demo-content": () => createContentModules(images),
    "demo-media": () => createMediaModules(images),
    "demo-interactive": () => createInteractiveModules(),
    "demo-engagement": () => createEngagementModules(),
    "demo-utility": () => createUtilityModules(images),
  };

  // Create pages for each category
  for (const category of categories) {
    console.log(`📄 Creating page: ${category.name}...`);

    try {
      // Generate category-specific modules
      const categoryModules = await moduleGenerators[category.slug]();

      // Build the page document
      const page = {
        _type: "page",
        _id: category.slug,
        title: category.name,
        slug: {
          _type: "slug",
          current: category.slug,
        },
        modules: [
          // Intro section
          createIntroModule(category),
          // Spacer
          { _type: "spacer", _key: key(), size: "medium" },
          // Category-specific modules
          ...categoryModules,
          // Spacer before nav
          { _type: "spacer", _key: key(), size: "large", showDivider: true },
          // Navigation to related categories
          createNavModule(category),
        ],
        seo: {
          title: `${category.name} Modules Demo | Page Builder`,
          description: category.description,
        },
      };

      // Create or replace the document
      await client.createOrReplace(page);
      console.log(`  ✅ Created: /${category.slug}`);
    } catch (error) {
      console.error(`  ❌ Failed to create ${category.name}:`, error);
    }
  }

  console.log("\n🎉 Demo page generation complete!");
  console.log("\nCreated pages:");
  categories.forEach((cat) => {
    console.log(`  - /${cat.slug}`);
  });
}

// Run the generator
generateDemoPages().catch(console.error);
