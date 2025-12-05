"use client";

import { useState, useEffect, useRef, type CSSProperties } from "react";
import Button from "@/components/ui/Button";

// ============================================================================
// Types & Interfaces
// ============================================================================

export interface BlogPost {
  title: string;
  slug: string;
  excerpt: string;
  featuredImage?: string;
  publishedAt: string;
  author?: {
    name: string;
    avatar?: string;
  };
  category?: string;
  readingTime?: number;
}

interface BaseBlogProps {
  posts: BlogPost[];
  backgroundColor?: string;
  className?: string;
}

interface BlogFeaturedPostProps {
  post: BlogPost;
  backgroundColor?: string;
  className?: string;
  onReadMore?: (slug: string) => void;
}

interface BlogGridProps extends BaseBlogProps {
  columns?: 2 | 3;
  showHeader?: boolean;
  heading?: string;
  description?: string;
  onReadMore?: (slug: string) => void;
}

interface BlogListProps extends BaseBlogProps {
  showHeader?: boolean;
  heading?: string;
  description?: string;
  onReadMore?: (slug: string) => void;
}

interface BlogCarouselProps extends BaseBlogProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showHeader?: boolean;
  heading?: string;
  description?: string;
  onReadMore?: (slug: string) => void;
}

interface BlogMinimalProps extends BaseBlogProps {
  heading?: string;
  viewAllText?: string;
  onViewAll?: () => void;
  onPostClick?: (slug: string) => void;
}

// ============================================================================
// Utility Functions
// ============================================================================

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
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
// BlogFeaturedPost Component
// ============================================================================

export const BlogFeaturedPost = ({
  post,
  backgroundColor,
  className = "",
  onReadMore,
}: BlogFeaturedPostProps) => {
  const style: CSSProperties = backgroundColor ? { backgroundColor } : {};

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container">
        <article className="glass-card overflow-hidden max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-[var(--surface)]">
              {post.featuredImage ? (
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-violet)] opacity-20">
                  <svg width="80" height="80" fill="currentColor" opacity="0.3">
                    <path d="M8 8h64v64H8z" />
                    <path d="M20 50l15-15 10 10 20-20" stroke="currentColor" strokeWidth="3" fill="none" />
                  </svg>
                </div>
              )}
              {post.category && (
                <div className="absolute top-6 left-6">
                  <span className="badge badge-gradient">{post.category}</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-[var(--foreground-muted)] mb-4">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <span>{post.readingTime} min read</span>
                  </>
                )}
              </div>

              <h2 className="heading-lg mb-4">{post.title}</h2>

              <p className="body-lg mb-6 line-clamp-3">{post.excerpt}</p>

              {post.author && (
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-[var(--border)]">
                  {post.author.avatar ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-violet)] flex items-center justify-center text-white font-semibold">
                      {post.author.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-medium text-[var(--foreground)]">
                      {post.author.name}
                    </p>
                  </div>
                </div>
              )}

              <Button
                variant="primary"
                onClick={() => onReadMore?.(post.slug)}
              >
                Read Full Article
              </Button>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};

// ============================================================================
// BlogGrid Component
// ============================================================================

export const BlogGrid = ({
  posts,
  columns = 3,
  backgroundColor,
  className = "",
  showHeader = true,
  heading = "Latest Articles",
  description,
  onReadMore,
}: BlogGridProps) => {
  const style: CSSProperties = backgroundColor ? { backgroundColor } : {};

  const gridColumns = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container">
        {showHeader && <SectionHeader heading={heading} description={description} />}

        <div className={`grid ${gridColumns[columns]} gap-8`}>
          {posts.map((post) => (
            <article
              key={post.slug}
              className="glass-card overflow-hidden flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface)]">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-violet)] opacity-20">
                    <svg width="60" height="60" fill="currentColor" opacity="0.3">
                      <path d="M8 8h44v44H8z" />
                      <path d="M15 38l12-12 8 8 14-14" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                )}
                {post.category && (
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-gradient text-xs">{post.category}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs text-[var(--foreground-muted)] mb-3">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime} min read</span>
                    </>
                  )}
                </div>

                <h3 className="heading-md mb-3 line-clamp-2">{post.title}</h3>

                <p className="body-sm mb-4 line-clamp-3 flex-grow">{post.excerpt}</p>

                <button
                  onClick={() => onReadMore?.(post.slug)}
                  className="text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] font-semibold text-sm flex items-center gap-2 transition-colors group"
                >
                  <span>Read More</span>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// BlogList Component
// ============================================================================

export const BlogList = ({
  posts,
  backgroundColor,
  className = "",
  showHeader = true,
  heading = "Recent Posts",
  description,
  onReadMore,
}: BlogListProps) => {
  const style: CSSProperties = backgroundColor ? { backgroundColor } : {};

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container max-w-5xl">
        {showHeader && <SectionHeader heading={heading} description={description} />}

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="glass-card overflow-hidden"
            >
              <div className="grid md:grid-cols-[300px_1fr] gap-6">
                {/* Image */}
                <div className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden bg-[var(--surface)]">
                  {post.featuredImage ? (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-violet)] opacity-20">
                      <svg width="50" height="50" fill="currentColor" opacity="0.3">
                        <path d="M5 5h40v40H5z" />
                        <path d="M12 32l10-10 7 7 11-11" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </div>
                  )}
                  {post.category && (
                    <div className="absolute top-3 left-3">
                      <span className="badge badge-gradient text-xs">{post.category}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center py-2 pr-4">
                  <div className="flex items-center gap-3 text-xs text-[var(--foreground-muted)] mb-3">
                    <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    {post.readingTime && (
                      <>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                      </>
                    )}
                  </div>

                  <h3 className="heading-md mb-3">{post.title}</h3>

                  <p className="body-sm mb-4 line-clamp-2">{post.excerpt}</p>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => onReadMore?.(post.slug)}
                      className="text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] font-semibold text-sm flex items-center gap-2 transition-colors group"
                    >
                      <span>Read More</span>
                      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                        <path d="M5 12l6-6-6-6" />
                      </svg>
                    </button>

                    {post.author && (
                      <div className="flex items-center gap-2">
                        {post.author.avatar ? (
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-violet)] flex items-center justify-center text-white text-xs font-semibold">
                            {post.author.name.charAt(0)}
                          </div>
                        )}
                        <span className="text-sm text-[var(--foreground-muted)]">
                          {post.author.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// BlogCarousel Component
// ============================================================================

export const BlogCarousel = ({
  posts,
  backgroundColor,
  className = "",
  autoPlay = false,
  autoPlayInterval = 5000,
  showHeader = true,
  heading = "Featured Posts",
  description,
  onReadMore,
}: BlogCarouselProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const scrollRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scrollNext = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
      const gap = 32; // gap-8 = 32px
      scrollRef.current.scrollBy({ left: cardWidth + gap, behavior: "smooth" });
    }
  };

  const scrollPrev = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.children[0]?.clientWidth || 0;
      const gap = 32;
      scrollRef.current.scrollBy({ left: -(cardWidth + gap), behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      setScrollPosition(scrollRef.current.scrollLeft);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(scrollNext, autoPlayInterval);
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
  }, [isPlaying, autoPlayInterval]);

  const style: CSSProperties = backgroundColor ? { backgroundColor } : {};
  const canScrollLeft = scrollPosition > 0;
  const canScrollRight = scrollRef.current
    ? scrollRef.current.scrollLeft < scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
    : true;

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container">
        <div className="flex items-end justify-between mb-8">
          {showHeader && <SectionHeader heading={heading} description={description} />}

          <div className="flex items-center gap-3">
            {autoPlay && (
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg width="16" height="16" fill="currentColor">
                    <path d="M4 2h3v12H4V2zm9 0h3v12h-3V2z" />
                  </svg>
                ) : (
                  <svg width="16" height="16" fill="currentColor">
                    <path d="M5 2v12l10-6z" />
                  </svg>
                )}
              </button>
            )}

            <button
              onClick={scrollPrev}
              disabled={!canScrollLeft}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              onClick={scrollNext}
              disabled={!canScrollRight}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-[var(--border)] hover:border-[var(--border-hover)] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {posts.map((post) => (
            <article
              key={post.slug}
              className="glass-card overflow-hidden flex-shrink-0 w-[350px] snap-start"
            >
              {/* Image */}
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--surface)]">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-violet)] opacity-20">
                    <svg width="60" height="60" fill="currentColor" opacity="0.3">
                      <path d="M8 8h44v44H8z" />
                      <path d="M15 38l12-12 8 8 14-14" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                  </div>
                )}
                {post.category && (
                  <div className="absolute top-4 left-4">
                    <span className="badge badge-gradient text-xs">{post.category}</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-[var(--foreground-muted)] mb-3">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime} min</span>
                    </>
                  )}
                </div>

                <h3 className="heading-md mb-3 line-clamp-2">{post.title}</h3>

                <p className="body-sm mb-4 line-clamp-3">{post.excerpt}</p>

                <button
                  onClick={() => onReadMore?.(post.slug)}
                  className="text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] font-semibold text-sm flex items-center gap-2 transition-colors group"
                >
                  <span>Read More</span>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12l6-6-6-6" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// BlogMinimal Component
// ============================================================================

export const BlogMinimal = ({
  posts,
  backgroundColor,
  className = "",
  heading = "Recent Posts",
  viewAllText = "View All Posts",
  onViewAll,
  onPostClick,
}: BlogMinimalProps) => {
  const style: CSSProperties = backgroundColor ? { backgroundColor } : {};

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container max-w-3xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="heading-lg">{heading}</h2>
          {onViewAll && (
            <button
              onClick={onViewAll}
              className="text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] font-semibold text-sm flex items-center gap-2 transition-colors group"
            >
              <span>{viewAllText}</span>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-1">
                <path d="M5 12l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>

        <div className="space-y-6">
          {posts.map((post, index) => (
            <article
              key={post.slug}
              className={`flex items-start gap-6 pb-6 ${
                index !== posts.length - 1 ? "border-b border-[var(--border)]" : ""
              }`}
            >
              <div className="flex-grow">
                <div className="flex items-center gap-3 text-xs text-[var(--foreground-muted)] mb-2">
                  <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                  {post.category && (
                    <>
                      <span>•</span>
                      <span className="text-[var(--accent-violet)]">{post.category}</span>
                    </>
                  )}
                  {post.readingTime && (
                    <>
                      <span>•</span>
                      <span>{post.readingTime} min read</span>
                    </>
                  )}
                </div>

                <button
                  onClick={() => onPostClick?.(post.slug)}
                  className="text-left group"
                >
                  <h3 className="text-lg font-semibold text-[var(--foreground)] mb-2 group-hover:text-[var(--accent-violet)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="body-sm line-clamp-2">{post.excerpt}</p>
                </button>
              </div>

              {post.featuredImage && (
                <button
                  onClick={() => onPostClick?.(post.slug)}
                  className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden bg-[var(--surface)] hover:opacity-80 transition-opacity"
                >
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

// Default export with all components
export default {
  BlogFeaturedPost,
  BlogGrid,
  BlogList,
  BlogCarousel,
  BlogMinimal,
};
