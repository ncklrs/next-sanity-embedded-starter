/**
 * Type definitions for the Testimonials module
 */

export interface Testimonial {
  id: string;
  content: string;
  rating: number;
  author: {
    name: string;
    role: string;
    company?: string;
    avatar?: string;
    initials?: string;
  };
  companyLogo?: string;
  featured?: boolean;
}

export interface TestimonialsBaseProps {
  title: string;
  subtitle?: string;
  backgroundColor?: string;
  className?: string;
}

export interface TestimonialsGridProps extends TestimonialsBaseProps {
  testimonials: Testimonial[];
}

export interface TestimonialsCarouselProps extends TestimonialsBaseProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplaySpeed?: number;
}

export interface TestimonialsFeaturedProps extends TestimonialsBaseProps {
  featured: Testimonial;
  supporting: Testimonial[];
}

export interface TestimonialsCarouselLargeProps extends TestimonialsBaseProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplaySpeed?: number;
}
