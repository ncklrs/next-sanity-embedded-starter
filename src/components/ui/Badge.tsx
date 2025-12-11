"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

type BadgeVariant = "default" | "gradient" | "success" | "new" | "warning" | "error";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
  dot?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = "default", children, dot = false, className = "", ...props }, ref) => {
    const variantStyles: Record<BadgeVariant, string> = {
      default: "badge",
      gradient: "badge badge-gradient",
      success: "badge badge-success",
      new: "badge badge-new",
      warning: "badge badge-warning",
      error: "badge badge-error",
    };

    const dotColors: Record<BadgeVariant, string> = {
      default: "bg-[var(--foreground-muted)]",
      gradient: "bg-[var(--accent-violet)]",
      success: "bg-[var(--accent-emerald)]",
      new: "bg-[var(--accent-cyan)]",
      warning: "bg-[var(--accent-amber)]",
      error: "bg-[var(--error)]",
    };

    return (
      <span
        ref={ref}
        className={`${variantStyles[variant]} ${className}`}
        {...props}
      >
        {dot && (
          <span
            className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]} animate-pulse`}
          />
        )}
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;
