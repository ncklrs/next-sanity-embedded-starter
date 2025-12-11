"use client";

import { useState, useCallback, useEffect, useRef, type CSSProperties } from "react";
import Button from "@/components/ui/Button";

// ============================================================================
// Shared Utilities
// ============================================================================

function getBackgroundStyle(backgroundColor?: string): CSSProperties | undefined {
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

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
  size?: "small" | "medium" | "large";
}

interface BaseGalleryProps {
  images: GalleryImage[];
  spacing?: "sm" | "md" | "lg";
  backgroundColor?: string;
  className?: string;
}

interface GalleryGridProps extends BaseGalleryProps {
  columns?: 2 | 3 | 4;
  showHeader?: boolean;
  heading?: string;
  description?: string;
  enableLightbox?: boolean;
}

interface GalleryMasonryProps extends BaseGalleryProps {
  showHeader?: boolean;
  heading?: string;
  description?: string;
  enableLightbox?: boolean;
}

interface GalleryCarouselProps extends BaseGalleryProps {
  showThumbnails?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showHeader?: boolean;
  heading?: string;
  description?: string;
}

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

// ============================================================================
// Lightbox Component
// ============================================================================

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrevious }: LightboxProps) => {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrevious();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Previous Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30"
        disabled={currentIndex === 0}
        aria-label="Previous image"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all disabled:opacity-30"
        disabled={currentIndex === images.length - 1}
        aria-label="Next image"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Image Container */}
      <div
        className="relative max-w-7xl max-h-[90vh] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="max-w-full max-h-[90vh] object-contain rounded-lg"
        />
        {currentImage.title && (
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
            <p className="text-white text-lg font-medium">{currentImage.title}</p>
          </div>
        )}
      </div>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

// ============================================================================
// Section Header Component
// ============================================================================

const SectionHeader = ({ heading, description }: { heading?: string; description?: string }) => {
  if (!heading && !description) return null;

  return (
    <div className="section-header mb-12">
      {heading && <h2 className="heading-lg mb-4">{heading}</h2>}
      {description && <p className="body-lg">{description}</p>}
    </div>
  );
};

// ============================================================================
// GalleryGrid Component
// ============================================================================

export const GalleryGrid = ({
  images,
  columns = 3,
  spacing = "md",
  backgroundColor,
  className = "",
  showHeader = true,
  heading = "Gallery",
  description,
  enableLightbox = true,
}: GalleryGridProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const spacingClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const gridColumns = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  };

  const openLightbox = (index: number) => {
    if (enableLightbox) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  };

  const style: CSSProperties = getBackgroundStyle(backgroundColor) || {};

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container">
        {showHeader && <SectionHeader heading={heading} description={description} />}

        <div className={`grid ${gridColumns[columns]} ${spacingClasses[spacing]}`}>
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-xl bg-[var(--surface)] border border-[var(--border)] cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <div className="aspect-square relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {image.title && (
                      <p className="text-white font-semibold text-lg mb-1">{image.title}</p>
                    )}
                    {enableLightbox && (
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M10 3h4v4M14 3l-5 5m-3 5H2v-4m4 4l-5-5" />
                        </svg>
                        <span>Click to expand</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setCurrentImageIndex((prev) => Math.min(prev + 1, images.length - 1))}
          onPrevious={() => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))}
        />
      )}
    </section>
  );
};

// ============================================================================
// GalleryMasonry Component
// ============================================================================

export const GalleryMasonry = ({
  images,
  spacing = "md",
  backgroundColor,
  className = "",
  showHeader = true,
  heading = "Gallery",
  description,
  enableLightbox = true,
}: GalleryMasonryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const spacingClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
  };

  const getSizeClass = (size?: string) => {
    switch (size) {
      case "small":
        return "md:col-span-1 md:row-span-1";
      case "large":
        return "md:col-span-2 md:row-span-2";
      case "medium":
      default:
        return "md:col-span-1 md:row-span-1";
    }
  };

  const openLightbox = (index: number) => {
    if (enableLightbox) {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
    }
  };

  const style: CSSProperties = getBackgroundStyle(backgroundColor) || {};

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container">
        {showHeader && <SectionHeader heading={heading} description={description} />}

        <div
          className={`grid grid-cols-1 md:grid-cols-3 auto-rows-[200px] ${spacingClasses[spacing]}`}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`group relative overflow-hidden rounded-xl bg-[var(--surface)] border border-[var(--border)] cursor-pointer ${getSizeClass(
                image.size
              )}`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {image.title && (
                    <p className="text-white font-semibold text-lg mb-1">{image.title}</p>
                  )}
                  {enableLightbox && (
                    <div className="flex items-center gap-2 text-white/80 text-sm">
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 3h4v4M14 3l-5 5m-3 5H2v-4m4 4l-5-5" />
                      </svg>
                      <span>View full size</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          images={images}
          currentIndex={currentImageIndex}
          onClose={() => setLightboxOpen(false)}
          onNext={() => setCurrentImageIndex((prev) => Math.min(prev + 1, images.length - 1))}
          onPrevious={() => setCurrentImageIndex((prev) => Math.max(prev - 1, 0))}
        />
      )}
    </section>
  );
};

// ============================================================================
// GalleryCarousel Component
// ============================================================================

export const GalleryCarousel = ({
  images,
  spacing = "md",
  backgroundColor,
  className = "",
  showThumbnails = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  showHeader = true,
  heading = "Gallery",
  description,
}: GalleryCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goToImage = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(goToNext, autoPlayInterval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, goToNext, autoPlayInterval]);

  const currentImage = images[currentIndex];
  const style: CSSProperties = getBackgroundStyle(backgroundColor) || {};

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container">
        {showHeader && <SectionHeader heading={heading} description={description} />}

        {/* Main Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="w-full h-full object-cover"
            />

            {currentImage.title && (
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-white text-xl font-semibold">{currentImage.title}</p>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all"
              aria-label="Previous image"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all"
              aria-label="Next image"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Play/Pause Button */}
            {autoPlay && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white transition-all"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="20" height="20" fill="currentColor">
                    <path d="M6 4h4v12H6V4zm8 0h4v12h-4V4z" />
                  </svg>
                ) : (
                  <svg width="20" height="20" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            )}

            {/* Image Counter */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnails */}
          {showThumbnails && (
            <div
              className={`mt-${spacing === "sm" ? "4" : spacing === "md" ? "6" : "8"} flex gap-3 overflow-x-auto pb-2 scrollbar-thin`}
            >
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToImage(index)}
                  className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentIndex
                      ? "border-[var(--accent-violet)] scale-105"
                      : "border-[var(--border)] hover:border-[var(--border-hover)] opacity-60 hover:opacity-100"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

// Default export with all components
export default {
  GalleryGrid,
  GalleryMasonry,
  GalleryCarousel,
};
