"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { urlFor } from "@/lib/sanity";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface SpacerProps {
  size?: "small" | "medium" | "large" | "xlarge";
  showDivider?: boolean;
  dividerStyle?: "solid" | "dashed" | "gradient";
  backgroundColor?: string;
}

interface AnchorPointProps {
  id: string;
  label?: string;
}

interface BannerProps {
  message: string;
  title?: string;
  type?: "info" | "warning" | "success" | "error";
  icon?: string;
  link?: {
    label: string;
    href: string;
  };
  dismissible?: boolean;
  variant?: "default" | "bordered" | "filled";
}

interface Download {
  title: string;
  description?: string;
  image?: any;
  file?: any;
  fileUrl?: string;
  fileType?: string;
  fileSize?: string;
  gated?: boolean;
}

interface DownloadCardsProps {
  title?: string;
  subtitle?: string;
  downloads: Download[];
  variant?: "grid" | "list" | "compact";
  columns?: 2 | 3 | 4;
  backgroundColor?: string;
}

interface MultiColumnProps {
  columns?: string;
  columnGap?: 'small' | 'medium' | 'large';
  verticalAlignment?: 'start' | 'center' | 'end' | 'stretch';
  columnContent?: Array<{
    _key: string;
    width?: 'auto' | 'narrow' | 'medium' | 'wide' | 'full';
    modules?: Array<{ _type: string; _key: string; [key: string]: unknown }>;
  }>;
  backgroundColor?: string;
  reverseOnMobile?: boolean;
}

// ============================================================================
// SPACER COMPONENT
// ============================================================================

export function Spacer({
  size = "medium",
  showDivider = false,
  dividerStyle = "solid",
  backgroundColor,
}: SpacerProps) {
  const sizeMap = {
    small: "2rem",
    medium: "4rem",
    large: "6rem",
    xlarge: "8rem",
  };

  const getDividerClasses = () => {
    switch (dividerStyle) {
      case "dashed":
        return "border-t border-dashed border-[var(--border)]";
      case "gradient":
        return "h-px bg-gradient-to-r from-transparent via-[var(--border)] to-transparent";
      case "solid":
      default:
        return "border-t border-[var(--border)]";
    }
  };

  return (
    <div
      style={{
        height: sizeMap[size],
        backgroundColor: backgroundColor,
      }}
      className="flex items-center justify-center w-full"
    >
      {showDivider && (
        <div className={`w-full ${getDividerClasses()}`} />
      )}
    </div>
  );
}

// ============================================================================
// ANCHOR POINT COMPONENT
// ============================================================================

export function AnchorPoint({ id, label }: AnchorPointProps) {
  return (
    <div
      id={id}
      className="scroll-mt-20"
      aria-label={label}
      style={{ position: "absolute", visibility: "hidden" }}
    />
  );
}

// ============================================================================
// BANNER COMPONENT
// ============================================================================

export function Banner({
  message,
  title,
  type = "info",
  icon,
  link,
  dismissible = false,
  variant = "default",
}: BannerProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (dismissible) {
      const dismissed = localStorage.getItem(`banner-dismissed-${message.substring(0, 20)}`);
      if (dismissed) {
        setIsVisible(false);
      }
    }
  }, [dismissible, message]);

  const handleDismiss = () => {
    setIsVisible(false);
    if (dismissible) {
      localStorage.setItem(`banner-dismissed-${message.substring(0, 20)}`, "true");
    }
  };

  if (!isVisible) return null;

  const getTypeColors = () => {
    switch (type) {
      case "info":
        return {
          bg: "rgba(59, 130, 246, 0.1)",
          border: "rgba(59, 130, 246, 0.3)",
          text: "#3b82f6",
          icon: "ℹ",
        };
      case "warning":
        return {
          bg: "rgba(245, 158, 11, 0.1)",
          border: "rgba(245, 158, 11, 0.3)",
          text: "#f59e0b",
          icon: "⚠",
        };
      case "success":
        return {
          bg: "rgba(16, 185, 129, 0.1)",
          border: "rgba(16, 185, 129, 0.3)",
          text: "#10b981",
          icon: "✓",
        };
      case "error":
        return {
          bg: "rgba(239, 68, 68, 0.1)",
          border: "rgba(239, 68, 68, 0.3)",
          text: "#ef4444",
          icon: "✕",
        };
      default:
        return {
          bg: "rgba(59, 130, 246, 0.1)",
          border: "rgba(59, 130, 246, 0.3)",
          text: "#3b82f6",
          icon: "ℹ",
        };
    }
  };

  const colors = getTypeColors();

  const getVariantStyles = () => {
    switch (variant) {
      case "bordered":
        return {
          backgroundColor: "var(--surface)",
          borderLeft: `4px solid ${colors.border}`,
          border: `1px solid var(--border)`,
        };
      case "filled":
        return {
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
        };
      case "default":
      default:
        return {
          backgroundColor: colors.bg,
          border: `1px solid ${colors.border}`,
        };
    }
  };

  return (
    <div
      className="relative px-6 py-4 rounded-lg flex items-start gap-4"
      style={getVariantStyles()}
    >
      {/* Icon */}
      <div
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full font-bold text-sm"
        style={{ color: colors.text }}
      >
        {icon || colors.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {title && (
          <h3
            className="font-semibold mb-1 text-base"
            style={{ color: colors.text }}
          >
            {title}
          </h3>
        )}
        <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
          {message}
        </p>
        {link && (
          <a
            href={link.href}
            className="inline-flex items-center gap-1 mt-2 text-sm font-medium hover:underline transition-all"
            style={{ color: colors.text }}
          >
            {link.label}
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h6M6 3l3 3-3 3" />
            </svg>
          </a>
        )}
      </div>

      {/* Dismiss Button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
          aria-label="Dismiss banner"
        >
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}

// ============================================================================
// DOWNLOAD CARDS COMPONENT
// ============================================================================

export function DownloadCards({
  title,
  subtitle,
  downloads,
  variant = "grid",
  columns = 3,
  backgroundColor,
}: DownloadCardsProps) {
  const [gatedDownloads, setGatedDownloads] = useState<Record<string, boolean>>({});
  const [emailInputs, setEmailInputs] = useState<Record<string, string>>({});

  const handleDownload = (download: Download, index: number) => {
    if (download.gated && !gatedDownloads[index]) {
      return; // Don't download if gated and not unlocked
    }

    const url = download.fileUrl || (download.file?.asset?.url);
    if (url) {
      window.open(url, "_blank");
    }
  };

  const handleEmailSubmit = (index: number, email: string) => {
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setGatedDownloads((prev) => ({ ...prev, [index]: true }));
      setEmailInputs((prev) => ({ ...prev, [index]: "" }));
    }
  };

  const getFileTypeColor = (fileType?: string) => {
    const type = fileType?.toLowerCase();
    switch (type) {
      case "pdf":
        return "#ef4444";
      case "zip":
      case "rar":
        return "#f59e0b";
      case "doc":
      case "docx":
        return "#3b82f6";
      case "xls":
      case "xlsx":
        return "#10b981";
      default:
        return "#8b5cf6";
    }
  };

  const renderDownloadCard = (download: Download, index: number) => {
    const isGated = download.gated && !gatedDownloads[index];
    const imageUrl = download.image ? urlFor(download.image).width(400).height(300).url() : null;

    return (
      <div
        key={index}
        className={`glass-card overflow-hidden ${variant === "list" ? "flex flex-row gap-6" : ""}`}
      >
        {/* Image */}
        {imageUrl && (
          <div className={`relative overflow-hidden bg-[var(--surface)] ${
            variant === "list" ? "w-48 flex-shrink-0" : "aspect-video"
          }`}>
            <Image
              src={imageUrl}
              alt={download.title}
              fill
              className="object-cover"
            />
            {download.fileType && (
              <div
                className="absolute top-3 right-3 px-2 py-1 rounded text-xs font-bold text-white"
                style={{ backgroundColor: getFileTypeColor(download.fileType) }}
              >
                {download.fileType.toUpperCase()}
              </div>
            )}
          </div>
        )}

        {/* Content */}
        <div className={`p-6 flex flex-col ${variant === "list" ? "flex-1" : ""}`}>
          <div className="flex items-start justify-between mb-2">
            <h3 className="heading-md flex-1">{download.title}</h3>
            {!imageUrl && download.fileType && (
              <span
                className="px-2 py-1 rounded text-xs font-bold text-white ml-2"
                style={{ backgroundColor: getFileTypeColor(download.fileType) }}
              >
                {download.fileType.toUpperCase()}
              </span>
            )}
          </div>

          {download.description && (
            <p className="body-sm mb-4 flex-1">{download.description}</p>
          )}

          {download.fileSize && (
            <p className="text-xs text-[var(--foreground-subtle)] mb-4">
              File size: {download.fileSize}
            </p>
          )}

          {/* Gated Email Input */}
          {isGated ? (
            <div className="mt-auto">
              <p className="text-sm text-[var(--foreground-muted)] mb-3">
                Enter your email to download
              </p>
              <div className="input-group">
                <input
                  type="email"
                  value={emailInputs[index] || ""}
                  onChange={(e) =>
                    setEmailInputs((prev) => ({ ...prev, [index]: e.target.value }))
                  }
                  placeholder="your@email.com"
                  className="input text-sm"
                />
                <button
                  onClick={() => handleEmailSubmit(index, emailInputs[index] || "")}
                  className="btn btn-primary btn-sm"
                >
                  Unlock
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => handleDownload(download, index)}
              className="btn btn-primary w-full mt-auto flex items-center justify-center gap-2"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 2v10M4 8l4 4 4-4M2 14h12" />
              </svg>
              Download
            </button>
          )}
        </div>
      </div>
    );
  };

  const getGridClasses = () => {
    if (variant === "compact") return "space-y-2";
    if (variant === "list") return "space-y-6";
    return `grid gap-6 ${
      columns === 4
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        : columns === 3
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        : "grid-cols-1 md:grid-cols-2"
    }`;
  };

  const renderCompactList = () => {
    return downloads.map((download, index) => {
      const isGated = download.gated && !gatedDownloads[index];

      return (
        <div
          key={index}
          className="glass-card p-4 flex items-center justify-between gap-4 hover:bg-[var(--surface-elevated)] transition-all"
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {download.fileType && (
              <div
                className="w-10 h-10 rounded flex items-center justify-center text-xs font-bold text-white flex-shrink-0"
                style={{ backgroundColor: getFileTypeColor(download.fileType) }}
              >
                {download.fileType.toUpperCase()}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm text-[var(--foreground)] truncate">
                {download.title}
              </h4>
              {download.fileSize && (
                <p className="text-xs text-[var(--foreground-subtle)]">
                  {download.fileSize}
                </p>
              )}
            </div>
          </div>

          {isGated ? (
            <div className="flex items-center gap-2">
              <input
                type="email"
                value={emailInputs[index] || ""}
                onChange={(e) =>
                  setEmailInputs((prev) => ({ ...prev, [index]: e.target.value }))
                }
                placeholder="Email"
                className="input text-sm w-40"
              />
              <button
                onClick={() => handleEmailSubmit(index, emailInputs[index] || "")}
                className="btn btn-primary btn-sm"
              >
                Unlock
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleDownload(download, index)}
              className="btn btn-secondary btn-sm flex items-center gap-1"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 2v8M4 7l3 3 3-3" />
              </svg>
              Download
            </button>
          )}
        </div>
      );
    });
  };

  return (
    <section className="section" style={{ backgroundColor }}>
      <div className="container">
        {(title || subtitle) && (
          <div className="section-header">
            {title && <h2 className="heading-lg mb-4">{title}</h2>}
            {subtitle && <p className="body-lg">{subtitle}</p>}
          </div>
        )}

        <div className={getGridClasses()}>
          {variant === "compact"
            ? renderCompactList()
            : downloads.map((download, index) => renderDownloadCard(download, index))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// MULTI COLUMN COMPONENT
// ============================================================================

export function MultiColumn({
  columns = '2',
  columnGap = 'medium',
  verticalAlignment = 'start',
  columnContent = [],
  backgroundColor = 'default',
  reverseOnMobile = false,
}: MultiColumnProps) {
  // Import ModuleRenderer dynamically to avoid circular deps
  const ModuleRenderer = dynamic(() => import('../ModuleRenderer').then(mod => ({ default: mod.ModuleRenderer })), { ssr: true });

  const bgClasses: Record<string, string> = {
    default: '',
    muted: 'bg-[var(--surface)]',
    accent: 'bg-gradient-to-br from-[var(--accent-violet)]/10 to-[var(--accent-cyan)]/10',
  };

  const gapClasses: Record<string, string> = {
    small: 'gap-4',
    medium: 'gap-6 lg:gap-8',
    large: 'gap-8 lg:gap-12',
  };

  const alignClasses: Record<string, string> = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch',
  };

  const widthClasses: Record<string, string> = {
    auto: 'flex-1',
    narrow: 'w-full lg:w-1/4',
    medium: 'w-full lg:w-1/3',
    wide: 'w-full lg:w-1/2',
    full: 'w-full lg:w-2/3',
  };

  const gridCols: Record<string, string> = {
    '2': 'lg:grid-cols-2',
    '3': 'lg:grid-cols-3',
    '4': 'lg:grid-cols-4',
  };

  return (
    <section className={`section ${bgClasses[backgroundColor]}`}>
      <div className="container">
        <div
          className={`
            grid grid-cols-1 ${gridCols[columns] || 'lg:grid-cols-2'}
            ${gapClasses[columnGap]}
            ${alignClasses[verticalAlignment]}
            ${reverseOnMobile ? 'flex-col-reverse lg:flex-row' : ''}
          `}
        >
          {columnContent.map((column) => (
            <div
              key={column._key}
              className={column.width && column.width !== 'auto' ? widthClasses[column.width] : ''}
            >
              {column.modules && column.modules.length > 0 && (
                <div className="space-y-6">
                  <ModuleRenderer modules={column.modules} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  Spacer,
  AnchorPoint,
  Banner,
  DownloadCards,
  MultiColumn,
};
