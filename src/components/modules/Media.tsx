"use client";

import { useState, useRef, useEffect, type CSSProperties, type MouseEvent, type TouchEvent } from "react";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type BackgroundColor = "default" | "secondary" | "transparent";
type AspectRatio = "16/9" | "4/3" | "1/1" | "21/9";

interface BaseMediaProps {
  title?: string;
  backgroundColor?: BackgroundColor;
}

// ============================================================================
// VIDEO EMBED COMPONENT
// ============================================================================

export interface VideoEmbedProps extends BaseMediaProps {
  subtitle?: string;
  videoUrl: string;
  posterImage?: string;
  autoplay?: boolean;
  loop?: boolean;
  aspectRatio?: AspectRatio;
  variant?: "inline" | "fullwidth" | "lightbox";
}

export function VideoEmbed({
  title,
  subtitle,
  videoUrl,
  posterImage,
  autoplay = false,
  loop = false,
  aspectRatio = "16/9",
  variant = "inline",
  backgroundColor = "default",
}: VideoEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  // Parse YouTube/Vimeo URLs to get embed URLs
  const getEmbedUrl = (url: string): string => {
    // YouTube
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1&loop=${loop ? 1 : 0}`;
    }

    // Vimeo
    const vimeoRegex = /vimeo\.com\/(?:.*\/)?(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1&loop=${loop ? 1 : 0}`;
    }

    return url;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  const handlePlayClick = () => {
    if (variant === "lightbox") {
      setShowLightbox(true);
    } else {
      setIsPlaying(true);
    }
  };

  const getBackgroundClass = () => {
    switch (backgroundColor) {
      case "secondary":
        return "bg-[var(--background-secondary)]";
      case "transparent":
        return "bg-transparent";
      default:
        return "bg-[var(--background)]";
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "4/3":
        return "aspect-[4/3]";
      case "1/1":
        return "aspect-square";
      case "21/9":
        return "aspect-[21/9]";
      default:
        return "aspect-video";
    }
  };

  const VideoPlayer = ({ inLightbox = false }: { inLightbox?: boolean }) => (
    <div className={`relative ${getAspectRatioClass()} overflow-hidden rounded-2xl bg-[var(--surface)] border border-[var(--border)]`}>
      {!isPlaying && !inLightbox ? (
        <>
          {posterImage && (
            <img
              src={posterImage}
              alt={title || "Video thumbnail"}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <button
              onClick={handlePlayClick}
              className="group w-20 h-20 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/40 hover:border-white/60 backdrop-blur-sm transition-all hover:scale-110"
              aria-label="Play video"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </>
      ) : (
        <iframe
          src={embedUrl}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );

  const Lightbox = () => (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fade-in"
      onClick={() => setShowLightbox(false)}
    >
      <button
        onClick={() => setShowLightbox(false)}
        className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
        aria-label="Close lightbox"
      >
        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="max-w-6xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <div className={`${getAspectRatioClass()} relative`}>
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full rounded-2xl"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );

  const containerClass = variant === "fullwidth" ? "w-full" : "container max-w-5xl mx-auto";

  return (
    <section className={`section ${getBackgroundClass()}`}>
      <div className={containerClass}>
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h2 className="heading-lg mb-4">{title}</h2>}
            {subtitle && <p className="body-lg">{subtitle}</p>}
          </div>
        )}

        <VideoPlayer />
      </div>

      {showLightbox && <Lightbox />}
    </section>
  );
}

// ============================================================================
// BEFORE/AFTER COMPONENT
// ============================================================================

export interface BeforeAfterProps extends BaseMediaProps {
  beforeImage: string;
  beforeLabel?: string;
  afterImage: string;
  afterLabel?: string;
  orientation?: "horizontal" | "vertical";
  initialPosition?: number;
}

export function BeforeAfter({
  title,
  beforeImage,
  beforeLabel = "Before",
  afterImage,
  afterLabel = "After",
  orientation = "horizontal",
  initialPosition = 50,
  backgroundColor = "default",
}: BeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    let percentage: number;

    if (orientation === "horizontal") {
      percentage = ((clientX - rect.left) / rect.width) * 100;
    } else {
      percentage = ((clientY - rect.top) / rect.height) * 100;
    }

    setSliderPosition(Math.max(0, Math.min(100, percentage)));
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, []);

  const getBackgroundClass = () => {
    switch (backgroundColor) {
      case "secondary":
        return "bg-[var(--background-secondary)]";
      case "transparent":
        return "bg-transparent";
      default:
        return "bg-[var(--background)]";
    }
  };

  const isHorizontal = orientation === "horizontal";

  return (
    <section className={`section ${getBackgroundClass()}`}>
      <div className="container max-w-5xl mx-auto">
        {title && (
          <div className="text-center mb-8">
            <h2 className="heading-lg">{title}</h2>
          </div>
        )}

        <div
          ref={containerRef}
          className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[var(--border)] select-none cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* After Image (Full) */}
          <div className="absolute inset-0">
            <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover" />
            <div className="absolute top-4 right-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-semibold">
              {afterLabel}
            </div>
          </div>

          {/* Before Image (Clipped) */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: isHorizontal
                ? `inset(0 ${100 - sliderPosition}% 0 0)`
                : `inset(0 0 ${100 - sliderPosition}% 0)`,
            }}
          >
            <img src={beforeImage} alt={beforeLabel} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/60 backdrop-blur-sm text-white text-sm font-semibold">
              {beforeLabel}
            </div>
          </div>

          {/* Slider Handle */}
          <div
            className="absolute z-10"
            style={
              isHorizontal
                ? {
                    left: `${sliderPosition}%`,
                    top: 0,
                    bottom: 0,
                    transform: "translateX(-50%)",
                  }
                : {
                    top: `${sliderPosition}%`,
                    left: 0,
                    right: 0,
                    transform: "translateY(-50%)",
                  }
            }
          >
            <div
              className={`${
                isHorizontal ? "w-1 h-full" : "h-1 w-full"
              } bg-white shadow-lg`}
            />
            <div
              className={`absolute ${
                isHorizontal
                  ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              } w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center`}
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                {isHorizontal ? (
                  <path d="M15 6l-6 6 6 6M9 6l-6 6 6 6" />
                ) : (
                  <path d="M6 9l6 6 6-6M6 15l6 6 6-6" />
                )}
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// CODE BLOCK COMPONENT
// ============================================================================

export interface CodeBlockProps extends BaseMediaProps {
  description?: string;
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  variant?: "default" | "with-tabs" | "terminal";
}

export function CodeBlock({
  title,
  description,
  code = "",
  language = "javascript",
  filename,
  showLineNumbers = true,
  highlightLines,
  variant = "default",
  backgroundColor = "default",
}: CodeBlockProps) {
  // Ensure highlightLines is always an array
  const safeHighlightLines = Array.isArray(highlightLines) ? highlightLines : [];
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBackgroundClass = () => {
    switch (backgroundColor) {
      case "secondary":
        return "bg-[var(--background-secondary)]";
      case "transparent":
        return "bg-transparent";
      default:
        return "bg-[var(--background)]";
    }
  };

  const lines = (code || "").split("\n");

  return (
    <section className={`section ${getBackgroundClass()}`}>
      <div className="container max-w-5xl mx-auto">
        {(title || description) && (
          <div className="text-center mb-8">
            {title && <h2 className="heading-lg mb-4">{title}</h2>}
            {description && <p className="body-lg">{description}</p>}
          </div>
        )}

        <div className="card overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[var(--surface-elevated)] border-b border-[var(--border)]">
            <div className="flex items-center gap-4">
              {variant === "with-tabs" && (
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[var(--error)]" />
                  <div className="w-3 h-3 rounded-full bg-[var(--warning)]" />
                  <div className="w-3 h-3 rounded-full bg-[var(--success)]" />
                </div>
              )}
              {filename && (
                <span className="text-sm font-mono text-[var(--foreground-muted)]">
                  {filename}
                </span>
              )}
              {!filename && language && (
                <span className="text-sm font-mono text-[var(--foreground-subtle)] uppercase">
                  {language}
                </span>
              )}
            </div>

            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-[var(--border)] text-sm font-medium transition-all"
              aria-label="Copy code"
            >
              {copied ? (
                <>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" />
                    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>

          {/* Code Content */}
          <div
            className={`relative overflow-x-auto ${
              variant === "terminal"
                ? "bg-black text-[var(--accent-emerald)]"
                : "bg-[var(--background-secondary)]"
            }`}
          >
            <pre className="p-6">
              <code className="font-mono text-sm leading-relaxed">
                {lines.map((line, index) => (
                  <div
                    key={index}
                    className={`${
                      safeHighlightLines.includes(index + 1)
                        ? "bg-[var(--accent-violet)]/10 -mx-6 px-6"
                        : ""
                    }`}
                  >
                    {showLineNumbers && (
                      <span className="inline-block w-12 text-right mr-4 text-[var(--foreground-subtle)] select-none">
                        {index + 1}
                      </span>
                    )}
                    <span>{line || " "}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// EMBED BLOCK COMPONENT
// ============================================================================

export interface EmbedBlockProps extends BaseMediaProps {
  embedCode?: string;
  url?: string;
  aspectRatio?: AspectRatio;
  maxWidth?: string;
  sandboxed?: boolean;
}

export function EmbedBlock({
  title,
  embedCode,
  url,
  aspectRatio = "16/9",
  maxWidth,
  sandboxed = true,
  backgroundColor = "default",
}: EmbedBlockProps) {
  const getBackgroundClass = () => {
    switch (backgroundColor) {
      case "secondary":
        return "bg-[var(--background-secondary)]";
      case "transparent":
        return "bg-transparent";
      default:
        return "bg-[var(--background)]";
    }
  };

  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case "4/3":
        return "aspect-[4/3]";
      case "1/1":
        return "aspect-square";
      case "21/9":
        return "aspect-[21/9]";
      default:
        return "aspect-video";
    }
  };

  const containerStyle: CSSProperties = maxWidth
    ? { maxWidth }
    : {};

  return (
    <section className={`section ${getBackgroundClass()}`}>
      <div className="container max-w-5xl mx-auto">
        {title && (
          <div className="text-center mb-8">
            <h2 className="heading-lg">{title}</h2>
          </div>
        )}

        <div style={containerStyle} className="mx-auto">
          <div className={`${getAspectRatioClass()} relative overflow-hidden rounded-2xl bg-[var(--surface)] border border-[var(--border)]`}>
            {embedCode ? (
              // SECURITY WARNING: embedCode must be sanitized before use to prevent XSS attacks.
              // Only use with trusted, sanitized content from your CMS. Consider using DOMPurify
              // or a similar library to sanitize HTML before rendering.
              <div
                className="absolute inset-0 w-full h-full"
                dangerouslySetInnerHTML={{ __html: embedCode }}
              />
            ) : url ? (
              <iframe
                src={url}
                className="absolute inset-0 w-full h-full"
                sandbox={
                  sandboxed
                    ? "allow-scripts allow-same-origin allow-popups allow-forms"
                    : undefined
                }
                allowFullScreen
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[var(--foreground-subtle)]">
                <div className="text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
                  </svg>
                  <p className="text-sm">No embed content provided</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  VideoEmbed,
  BeforeAfter,
  CodeBlock,
  EmbedBlock,
};
