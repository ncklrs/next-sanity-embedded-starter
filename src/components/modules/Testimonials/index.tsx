"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { StarIcon, ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "@/components/icons";

// ═══════════════════════════════════════════════════════════════════════════
// SHARED UTILITIES
// ═══════════════════════════════════════════════════════════════════════════

function getBackgroundStyle(backgroundColor?: string): React.CSSProperties | undefined {
  if (!backgroundColor) return undefined;
  const colorMap: Record<string, string> = {
    white: "var(--background)",
    default: "var(--background)",
    gray: "var(--background-secondary)",
    secondary: "var(--background-secondary)",
    primary: "var(--background-tertiary)",
    tertiary: "var(--background-tertiary)",
    transparent: "transparent",
  };
  const mappedColor = colorMap[backgroundColor.toLowerCase()];
  return mappedColor ? { backgroundColor: mappedColor } : { backgroundColor };
}

// ═══════════════════════════════════════════════════════════════════════════
// TYPE DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════

export interface Testimonial {
  id?: string;
  _key?: string;
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

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  size?: "default" | "large" | "featured";
  className?: string;
}

interface TestimonialsGridProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  backgroundColor?: string;
  className?: string;
}

interface TestimonialsCarouselProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  backgroundColor?: string;
  className?: string;
}

interface TestimonialsFeaturedProps {
  title: string;
  subtitle?: string;
  featured: Testimonial;
  supporting: Testimonial[];
  backgroundColor?: string;
  className?: string;
}

interface TestimonialsCarouselLargeProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  backgroundColor?: string;
  className?: string;
}

// ═══════════════════════════════════════════════════════════════════════════
// SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════

const SectionHeader = ({ title, subtitle, className = "" }: SectionHeaderProps) => (
  <div className={`section-header ${className}`}>
    <h2 className="display-lg mb-4">{title}</h2>
    {subtitle && <p className="body-lg">{subtitle}</p>}
  </div>
);

const StarRating = ({ rating, className = "" }: { rating: number; className?: string }) => (
  <div className={`flex gap-1 ${className}`} aria-label={`Rating: ${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <StarIcon
        key={i}
        className={`w-5 h-5 transition-colors ${
          i < rating ? "text-[var(--accent-amber)]" : "text-[var(--foreground-subtle)] opacity-30"
        }`}
        aria-hidden="true"
      />
    ))}
  </div>
);

const Avatar = ({
  src,
  alt,
  initials,
  size = "default",
}: {
  src?: string;
  alt: string;
  initials?: string;
  size?: "default" | "large";
}) => {
  const sizeClasses = {
    default: "w-12 h-12 text-base",
    large: "w-16 h-16 text-xl",
  };

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${sizeClasses[size]} rounded-full object-cover border-2 border-[var(--border)]`}
      />
    );
  }

  return (
    <div
      className={`${sizeClasses[size]} testimonial-avatar flex items-center justify-center font-bold`}
      aria-label={alt || "User"}
    >
      {initials || (alt ? alt.charAt(0).toUpperCase() : "?")}
    </div>
  );
};

const TestimonialCard = ({ testimonial, size = "default", className = "" }: TestimonialCardProps) => {
  const isLarge = size === "large";
  const isFeatured = size === "featured";

  return (
    <div
      className={`testimonial-card ${isFeatured ? "border-2" : ""} ${className}`}
      style={isFeatured ? { borderColor: "var(--accent-violet)" } : undefined}
    >
      {/* Quote Icon for large/featured */}
      {(isLarge || isFeatured) && (
        <QuoteIcon
          className="w-10 h-10 text-[var(--accent-violet)] opacity-50 mb-4"
          aria-hidden="true"
        />
      )}

      {/* Star Rating */}
      <StarRating rating={testimonial.rating} className="mb-4" />

      {/* Content */}
      <blockquote className={`testimonial-content ${isLarge ? "text-xl" : ""}`}>
        {testimonial.content}
      </blockquote>

      {/* Author Info */}
      <div className="flex items-center gap-4 mt-6">
        <Avatar
          src={testimonial.author.avatar}
          alt={testimonial.author.name}
          initials={testimonial.author.initials}
          size={isLarge ? "large" : "default"}
        />
        <div className="flex-1">
          <div className="font-semibold text-[var(--foreground)]">{testimonial.author.name}</div>
          <div className="text-sm text-[var(--foreground-muted)]">
            {testimonial.author.role}
            {testimonial.author.company && ` at ${testimonial.author.company}`}
          </div>
        </div>
        {testimonial.companyLogo && (
          <img
            src={testimonial.companyLogo}
            alt={`${testimonial.author.company} logo`}
            className="h-8 w-auto opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
          />
        )}
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// CAROUSEL CONTROLS
// ═══════════════════════════════════════════════════════════════════════════

interface CarouselControlsProps {
  currentIndex: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
  showDots?: boolean;
  onDotClick?: (index: number) => void;
  className?: string;
}

const CarouselControls = ({
  currentIndex,
  total,
  onPrevious,
  onNext,
  showDots = true,
  onDotClick,
  className = "",
}: CarouselControlsProps) => (
  <div className={`flex items-center justify-center gap-6 ${className}`}>
    {/* Navigation Arrows */}
    <div className="flex gap-2">
      <button
        onClick={onPrevious}
        className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous testimonial"
        disabled={total <= 1}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </button>
      <button
        onClick={onNext}
        className="w-10 h-10 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next testimonial"
        disabled={total <= 1}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>
    </div>

    {/* Dot Indicators */}
    {showDots && total > 1 && (
      <div className="flex gap-2" role="tablist" aria-label="Testimonial indicators">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            onClick={() => onDotClick?.(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-[var(--accent-violet)] w-6"
                : "bg-[var(--border-hover)] hover:bg-[var(--foreground-subtle)]"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
            aria-selected={index === currentIndex}
            role="tab"
          />
        ))}
      </div>
    )}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════
// VARIATION 1: TESTIMONIALS GRID
// ═══════════════════════════════════════════════════════════════════════════

export const TestimonialsGrid = ({
  title,
  subtitle,
  testimonials: rawTestimonials,
  backgroundColor,
  className = "",
}: TestimonialsGridProps) => {
  const testimonials = rawTestimonials ?? [];

  return (
    <section
      className={`section ${className}`}
      style={getBackgroundStyle(backgroundColor)}
    >
      <div className="container">
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial._key || index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// VARIATION 2: TESTIMONIALS CAROUSEL
// ═══════════════════════════════════════════════════════════════════════════

export const TestimonialsCarousel = ({
  title,
  subtitle,
  testimonials: rawTestimonials,
  autoplay = false,
  autoplaySpeed = 5000,
  backgroundColor,
  className = "",
}: TestimonialsCarouselProps) => {
  const testimonials = rawTestimonials ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToNext = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const goToPrevious = useCallback(() => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isPaused || testimonials.length <= 1) return;

    const interval = setInterval(goToNext, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplay, isPaused, autoplaySpeed, goToNext, testimonials.length]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  // Calculate visible cards based on screen size
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section
      className={`section ${className}`}
      style={getBackgroundStyle(backgroundColor)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <SectionHeader title={title} subtitle={subtitle} />

        <div
          className="relative overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {visibleTestimonials.map((testimonial, index) => (
              <div
                key={testimonial._key || index}
                className="transition-all duration-500 ease-in-out"
                style={{
                  animation: "fade-in-up 0.6s ease-out forwards",
                }}
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>

        <CarouselControls
          currentIndex={currentIndex}
          total={testimonials.length}
          onPrevious={goToPrevious}
          onNext={goToNext}
          onDotClick={goToIndex}
          className="mt-12"
        />
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// VARIATION 3: TESTIMONIALS FEATURED
// ═══════════════════════════════════════════════════════════════════════════

export const TestimonialsFeatured = ({
  title,
  subtitle,
  featured,
  supporting: rawSupporting,
  backgroundColor,
  className = "",
}: TestimonialsFeaturedProps) => {
  const supporting = rawSupporting ?? [];

  return (
    <section
      className={`section ${className}`}
      style={getBackgroundStyle(backgroundColor)}
    >
      <div className="container">
        <SectionHeader title={title} subtitle={subtitle} />

        <div className="space-y-8">
          {/* Featured Testimonial */}
          {featured && (
            <div className="max-w-4xl mx-auto">
              <TestimonialCard testimonial={featured} size="featured" className="shadow-2xl" />
            </div>
          )}

          {/* Supporting Testimonials */}
          {supporting.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supporting.map((testimonial, index) => (
                <TestimonialCard key={testimonial._key || index} testimonial={testimonial} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// VARIATION 4: TESTIMONIALS CAROUSEL LARGE
// ═══════════════════════════════════════════════════════════════════════════

export const TestimonialsCarouselLarge = ({
  title,
  subtitle,
  testimonials: rawTestimonials,
  autoplay = false,
  autoplaySpeed = 6000,
  backgroundColor,
  className = "",
}: TestimonialsCarouselLargeProps) => {
  const testimonials = rawTestimonials ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToNext = useCallback(() => {
    if (isTransitioning || testimonials.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [testimonials.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning || testimonials.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [testimonials.length, isTransitioning]);

  const goToIndex = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isPaused || testimonials.length <= 1) return;

    const interval = setInterval(goToNext, autoplaySpeed);
    return () => clearInterval(interval);
  }, [autoplay, isPaused, autoplaySpeed, goToNext, testimonials.length]);

  // Touch/swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious]);

  const currentTestimonial = testimonials[currentIndex];

  if (!currentTestimonial) {
    return (
      <section
        className={`section relative ${className}`}
        style={getBackgroundStyle(backgroundColor)}
      >
        <div className="container">
          <SectionHeader title={title} subtitle={subtitle} />
          <p className="text-center text-[var(--foreground-muted)]">No testimonials available</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`section relative ${className}`}
      style={getBackgroundStyle(backgroundColor)}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <SectionHeader title={title} subtitle={subtitle} />

        <div
          className="relative max-w-5xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Navigation Arrows - Absolute positioned on sides */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-16 w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:scale-110 transition-all z-10 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous testimonial"
            disabled={testimonials.length <= 1 || isTransitioning}
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-16 w-12 h-12 rounded-full bg-[var(--surface)] border border-[var(--border)] flex items-center justify-center hover:bg-[var(--surface-hover)] hover:border-[var(--border-hover)] hover:scale-110 transition-all z-10 disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next testimonial"
            disabled={testimonials.length <= 1 || isTransitioning}
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Testimonial Card */}
          <div
            key={currentTestimonial.id || currentTestimonial._key || currentIndex}
            className={`transition-opacity duration-500 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <TestimonialCard testimonial={currentTestimonial} size="large" className="shadow-2xl" />
          </div>
        </div>

        {/* Dot Indicators */}
        {testimonials.length > 1 && (
          <div className="flex justify-center gap-2 mt-12" role="tablist" aria-label="Testimonial indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                disabled={isTransitioning}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-[var(--accent-violet)] w-6"
                    : "bg-[var(--border-hover)] hover:bg-[var(--foreground-subtle)]"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-selected={index === currentIndex}
                role="tab"
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// DEFAULT EXPORT - All variations
// ═══════════════════════════════════════════════════════════════════════════

export default {
  Grid: TestimonialsGrid,
  Carousel: TestimonialsCarousel,
  Featured: TestimonialsFeatured,
  CarouselLarge: TestimonialsCarouselLarge,
};
