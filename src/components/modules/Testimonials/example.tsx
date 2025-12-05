"use client";

import {
  TestimonialsGrid,
  TestimonialsCarousel,
  TestimonialsFeatured,
  TestimonialsCarouselLarge,
  type Testimonial,
} from "./index";

// ═══════════════════════════════════════════════════════════════════════════
// SAMPLE DATA
// ═══════════════════════════════════════════════════════════════════════════

const sampleTestimonials: Testimonial[] = [
  {
    id: "1",
    content:
      "This product has completely transformed how our team collaborates. The intuitive interface and powerful features have made our workflow incredibly efficient.",
    rating: 5,
    author: {
      name: "Sarah Chen",
      role: "Product Manager",
      company: "TechCorp",
      initials: "SC",
    },
  },
  {
    id: "2",
    content:
      "We've seen a 300% increase in productivity since implementing this solution. It's become an essential part of our daily operations.",
    rating: 5,
    author: {
      name: "Michael Rodriguez",
      role: "CTO",
      company: "Innovate Labs",
      initials: "MR",
    },
  },
  {
    id: "3",
    content:
      "The customer support is outstanding. They went above and beyond to ensure our team was set up for success.",
    rating: 5,
    author: {
      name: "Emily Thompson",
      role: "Operations Director",
      company: "Global Solutions",
      initials: "ET",
    },
  },
  {
    id: "4",
    content:
      "Best investment we've made this year. The ROI was evident within the first month of implementation.",
    rating: 5,
    author: {
      name: "David Park",
      role: "CEO",
      company: "StartupVentures",
      initials: "DP",
    },
  },
  {
    id: "5",
    content:
      "The analytics and reporting features give us insights we never had before. Game-changer for data-driven decisions.",
    rating: 5,
    author: {
      name: "Jessica Martinez",
      role: "Data Analyst",
      company: "Analytics Pro",
      initials: "JM",
    },
  },
  {
    id: "6",
    content:
      "Seamless integration with our existing tools. The migration was smooth and the team was productive from day one.",
    rating: 5,
    author: {
      name: "Ryan Foster",
      role: "Engineering Lead",
      company: "DevHub",
      initials: "RF",
    },
  },
];

const featuredTestimonial: Testimonial = {
  id: "featured",
  content:
    "This platform has revolutionized how we approach project management. The combination of powerful features and elegant design makes it a joy to use every day. Our team's productivity has skyrocketed, and collaboration has never been smoother.",
  rating: 5,
  author: {
    name: "Alexandra Williams",
    role: "VP of Product",
    company: "Enterprise Co",
    initials: "AW",
  },
  featured: true,
};

const supportingTestimonials = sampleTestimonials.slice(0, 3);

// ═══════════════════════════════════════════════════════════════════════════
// EXAMPLE COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

export function TestimonialsGridExample() {
  return (
    <TestimonialsGrid
      title="What Our Customers Say"
      subtitle="Join thousands of satisfied customers who have transformed their workflow"
      testimonials={sampleTestimonials}
      className="bg-[var(--background)]"
    />
  );
}

export function TestimonialsCarouselExample() {
  return (
    <TestimonialsCarousel
      title="Trusted by Industry Leaders"
      subtitle="See why top companies choose our platform"
      testimonials={sampleTestimonials}
      autoplay={true}
      autoplaySpeed={5000}
      className="bg-[var(--background-secondary)]"
    />
  );
}

export function TestimonialsFeaturedExample() {
  return (
    <TestimonialsFeatured
      title="Featured Success Stories"
      subtitle="Real results from real customers"
      featured={featuredTestimonial}
      supporting={supportingTestimonials}
      className="bg-[var(--background)]"
    />
  );
}

export function TestimonialsCarouselLargeExample() {
  return (
    <TestimonialsCarouselLarge
      title="Customer Spotlight"
      subtitle="Hear directly from the teams transforming their business"
      testimonials={sampleTestimonials}
      autoplay={true}
      autoplaySpeed={6000}
      className="bg-[var(--background-secondary)]"
    />
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ALL VARIATIONS SHOWCASE
// ═══════════════════════════════════════════════════════════════════════════

export default function TestimonialsShowcase() {
  return (
    <div className="space-y-0">
      <TestimonialsGridExample />
      <TestimonialsCarouselExample />
      <TestimonialsFeaturedExample />
      <TestimonialsCarouselLargeExample />
    </div>
  );
}
