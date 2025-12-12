"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { PortableText, type PortableTextBlock } from "@portabletext/react";
import { XIcon } from "@/components/icons";

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

type BackgroundColor = "default" | "gradient" | "transparent" | "secondary";

interface CTAConfig {
  text: string;
  url: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
}

// ============================================================================
// ANNOUNCEMENT BAR
// ============================================================================

export interface AnnouncementBarProps {
  message: string;
  link?: {
    text: string;
    url: string;
  };
  icon?: ReactNode;
  dismissible?: boolean;
  variant?: "default" | "gradient" | "highlight";
  backgroundColor?: string;
}

export function AnnouncementBar({
  message,
  link,
  icon,
  dismissible = true,
  variant = "default",
  backgroundColor,
}: AnnouncementBarProps) {
  const [isDismissed, setIsDismissed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check localStorage for dismissal
    const dismissed = localStorage.getItem("announcement-dismissed");
    if (dismissed === "true") {
      setIsDismissed(true);
    } else {
      // Subtle mount animation delay
      setTimeout(() => setIsVisible(true), 100);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsDismissed(true);
      if (dismissible) {
        localStorage.setItem("announcement-dismissed", "true");
      }
    }, 300);
  };

  if (isDismissed) return null;

  const getBackgroundStyle = () => {
    if (backgroundColor) return { backgroundColor };

    switch (variant) {
      case "gradient":
        return {
          background: "var(--gradient-primary)",
        };
      case "highlight":
        return {
          background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)",
          borderBottom: "1px solid var(--border)",
        };
      default:
        return {
          background: "var(--surface)",
          borderBottom: "1px solid var(--border)",
        };
    }
  };

  return (
    <div
      className="relative overflow-hidden transition-all duration-300"
      style={{
        ...getBackgroundStyle(),
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between gap-4 py-3 px-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {icon && (
              <div className="flex-shrink-0 w-5 h-5 text-[var(--accent-cyan)]">
                {icon}
              </div>
            )}
            <p className={`text-sm font-medium ${variant === "gradient" ? "text-white" : "text-[var(--foreground)]"}`}>
              {message}
            </p>
            {link && (
              <a
                href={link.url}
                className={`text-sm font-semibold hover:underline flex-shrink-0 inline-flex items-center gap-1 transition-colors ${
                  variant === "gradient"
                    ? "text-white hover:text-white/90"
                    : "text-[var(--accent-violet)] hover:text-[var(--accent-cyan)]"
                }`}
              >
                {link.text}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            )}
          </div>
          {dismissible && (
            <button
              onClick={handleDismiss}
              className={`flex-shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors ${
                variant === "gradient" ? "text-white" : "text-[var(--foreground-muted)]"
              }`}
              aria-label="Dismiss announcement"
            >
              <XIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// COUNTDOWN
// ============================================================================

interface TimeUnit {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownProps {
  title?: string;
  subtitle?: string;
  targetDate: Date | string;
  expiredMessage?: string;
  showDays?: boolean;
  showHours?: boolean;
  showMinutes?: boolean;
  showSeconds?: boolean;
  cta?: CTAConfig;
  variant?: "default" | "compact" | "hero";
  backgroundColor?: BackgroundColor;
}

export function Countdown({
  title,
  subtitle,
  targetDate,
  expiredMessage = "Event has started!",
  showDays = true,
  showHours = true,
  showMinutes = true,
  showSeconds = true,
  cta,
  variant = "default",
  backgroundColor = "default",
}: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeUnit>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);
  const [prevTime, setPrevTime] = useState<TimeUnit>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = typeof targetDate === "string" ? new Date(targetDate) : targetDate;
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const updateTimer = () => {
      const newTime = calculateTimeLeft();
      setPrevTime(timeLeft);
      setTimeLeft(newTime);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const getBackgroundClass = () => {
    switch (backgroundColor) {
      case "gradient":
        return "bg-gradient-to-br from-[var(--accent-violet)]/10 to-[var(--accent-cyan)]/10";
      case "transparent":
        return "bg-transparent";
      case "secondary":
        return "bg-[var(--background-secondary)]";
      default:
        return "bg-[var(--surface)]";
    }
  };

  const TimeUnit = ({ value, label, isChanging }: { value: number; label: string; isChanging: boolean }) => {
    if (variant === "compact") {
      return (
        <div className="inline-flex items-baseline gap-1">
          <span className={`text-4xl font-bold text-gradient transition-transform duration-200 ${isChanging ? "scale-110" : ""}`}>
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-sm text-[var(--foreground-muted)] uppercase tracking-wider">{label}</span>
        </div>
      );
    }

    if (variant === "hero") {
      return (
        <div className="flex flex-col items-center">
          <div className="relative">
            <div className={`text-7xl md:text-8xl font-bold text-gradient transition-all duration-300 ${isChanging ? "scale-110" : "scale-100"}`}>
              {String(value).padStart(2, "0")}
            </div>
            <div className="absolute -inset-4 bg-gradient-to-br from-[var(--accent-cyan)]/20 to-[var(--accent-violet)]/20 rounded-2xl blur-xl -z-10 opacity-50" />
          </div>
          <div className="text-lg md:text-xl text-[var(--foreground-muted)] uppercase tracking-widest mt-4 font-semibold">
            {label}
          </div>
        </div>
      );
    }

    // Default card variant
    return (
      <div className="glass-card p-6 min-w-[100px] text-center">
        <div className={`text-5xl md:text-6xl font-bold text-gradient mb-2 transition-transform duration-200 ${isChanging ? "scale-110" : ""}`}>
          {String(value).padStart(2, "0")}
        </div>
        <div className="text-sm text-[var(--foreground-muted)] uppercase tracking-wider font-medium">
          {label}
        </div>
      </div>
    );
  };

  const units = [
    { value: timeLeft.days, label: "Days", show: showDays, prev: prevTime.days },
    { value: timeLeft.hours, label: "Hours", show: showHours, prev: prevTime.hours },
    { value: timeLeft.minutes, label: "Minutes", show: showMinutes, prev: prevTime.minutes },
    { value: timeLeft.seconds, label: "Seconds", show: showSeconds, prev: prevTime.seconds },
  ].filter(unit => unit.show);

  return (
    <section className={`section ${getBackgroundClass()}`}>
      <div className="container">
        <div className={`${variant === "hero" ? "max-w-6xl" : "max-w-4xl"} mx-auto text-center`}>
          {title && (
            <h2 className={`${variant === "hero" ? "display-lg" : "heading-lg"} mb-4`}>
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="body-lg mb-12 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}

          {isExpired ? (
            <div className="glass-card p-12">
              <p className="text-3xl font-bold text-gradient">{expiredMessage}</p>
            </div>
          ) : (
            <div className={`flex ${variant === "compact" ? "flex-wrap justify-center gap-6" : "flex-wrap md:flex-nowrap justify-center gap-4 md:gap-6"} mb-8`}>
              {units.map((unit) => (
                <TimeUnit
                  key={unit.label}
                  value={unit.value}
                  label={unit.label}
                  isChanging={unit.value !== unit.prev}
                />
              ))}
            </div>
          )}

          {cta && (
            <div className="mt-8">
              <a
                href={cta.url}
                className={`btn ${
                  cta.variant === "secondary"
                    ? "btn-secondary"
                    : cta.variant === "ghost"
                    ? "btn-ghost"
                    : cta.variant === "outline"
                    ? "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)] hover:border-[var(--border-hover)]"
                    : "btn-primary"
                } btn-lg`}
              >
                {cta.text}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// STICKY CTA
// ============================================================================

export interface StickyCtaProps {
  id?: string;
  text: string;
  url: string;
  icon?: ReactNode;
  position?: "bottom-right" | "bottom-left" | "bottom-center";
  showAfterScroll?: number;
  variant?: "button" | "pill" | "expanded";
  dismissible?: boolean;
}

export function StickyCta({
  id,
  text,
  url,
  icon,
  position = "bottom-right",
  showAfterScroll = 300,
  variant = "button",
  dismissible = false,
}: StickyCtaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Check localStorage for dismissed state on mount
  useEffect(() => {
    if (dismissible && id) {
      const dismissed = localStorage.getItem(`sticky-cta-dismissed-${id}`);
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    }
  }, [dismissible, id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > showAfterScroll;
      setIsVisible(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDismissed(true);
    if (id) {
      localStorage.setItem(`sticky-cta-dismissed-${id}`, "true");
    }
  };

  const getPositionClasses = () => {
    const base = "fixed z-50";
    switch (position) {
      case "bottom-left":
        return `${base} bottom-6 left-6`;
      case "bottom-center":
        return `${base} bottom-6 left-1/2 -translate-x-1/2`;
      default: // bottom-right
        return `${base} bottom-6 right-6`;
    }
  };

  const getVariantClasses = () => {
    switch (variant) {
      case "pill":
        return "rounded-full px-8 py-4 shadow-xl";
      case "expanded":
        return "rounded-2xl px-6 py-4 shadow-xl flex items-center gap-3";
      default: // button
        return "btn btn-primary btn-lg shadow-xl";
    }
  };

  // Don't render if dismissed
  if (isDismissed) return null;

  return (
    <div
      className={`${getPositionClasses()} transition-all duration-300 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      {/* Dismiss button */}
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-800 border border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700 flex items-center justify-center transition-colors z-10"
          aria-label="Dismiss"
        >
          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
      <a
        href={url}
        className={`${getVariantClasses()} block ${
          variant === "pill" || variant === "expanded"
            ? "bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)] text-white font-semibold hover:shadow-2xl hover:scale-105"
            : ""
        }`}
        style={{
          backdropFilter: variant === "expanded" ? "blur(12px)" : undefined,
        }}
      >
        {icon && variant === "expanded" && (
          <div className="w-6 h-6 flex-shrink-0">{icon}</div>
        )}
        <span>{text}</span>
        {!icon && variant !== "pill" && (
          <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        )}
      </a>
    </div>
  );
}

// ============================================================================
// MODAL
// ============================================================================

interface FormField {
  _key: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  options?: string[]; // For select fields
}

interface FormModule {
  formType?: 'contact' | 'newsletter' | 'custom';
  customFields?: FormField[];
  submitButtonText?: string;
  successMessage?: string;
}

export interface ModalProps {
  id: string;
  title?: string;
  content: ReactNode | PortableTextBlock[];
  image?: string;
  cta?: CTAConfig;
  trigger?: "exit-intent" | "time-delay" | "scroll-depth" | "manual";
  triggerValue?: number;
  showOnce?: boolean;
  variant?: "default" | "fullscreen" | "slide-in";
  onClose?: () => void;
  formModule?: FormModule;
}

// Helper to check if content is Portable Text
function isPortableText(content: any): content is PortableTextBlock[] {
  return Array.isArray(content) && content.length > 0 && content[0]?._type === "block";
}

// ============================================================================
// MODAL FORM SUB-COMPONENT
// ============================================================================

function ModalForm({ formModule }: { formModule: FormModule }) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);

      setIsSuccess(true);
      setFormData({});
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10 mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-lg font-medium text-[var(--foreground)]">
          {formModule.successMessage || 'Thank you for your submission!'}
        </p>
      </div>
    );
  }

  const renderField = (field: FormField) => {
    const baseClasses = "w-full px-4 py-3 bg-[var(--surface)] border border-[var(--border)] rounded-lg text-[var(--foreground)] placeholder:text-[var(--foreground-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-cyan)] focus:border-transparent transition-all";

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            name={field.name}
            id={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            rows={4}
            className={baseClasses}
          />
        );
      case 'select':
        return (
          <select
            name={field.name}
            id={field.name}
            required={field.required}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className={`${baseClasses} appearance-none cursor-pointer`}
          >
            <option value="" disabled>
              {field.placeholder || 'Select an option'}
            </option>
            {field.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            type={field.type}
            name={field.name}
            id={field.name}
            placeholder={field.placeholder}
            required={field.required}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            className={baseClasses}
          />
        );
    }
  };

  const getFormFields = (): FormField[] => {
    if (formModule.formType === 'contact') {
      return [
        { _key: '1', name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your name' },
        { _key: '2', name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your@email.com' },
        { _key: '3', name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Your message...' },
      ];
    }

    if (formModule.formType === 'newsletter') {
      return [
        { _key: '1', name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'your@email.com' },
      ];
    }

    if (formModule.formType === 'custom' && formModule.customFields) {
      return formModule.customFields;
    }

    return [];
  };

  const fields = getFormFields();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field._key}>
          <label htmlFor={field.name} className="block text-sm font-medium text-[var(--foreground)] mb-2">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : (formModule.submitButtonText || 'Submit')}
      </button>
    </form>
  );
}

// ============================================================================
// MODAL COMPONENT
// ============================================================================

export function Modal({
  id,
  title,
  content,
  image,
  cta,
  trigger = "manual",
  triggerValue = 3000,
  showOnce = true,
  variant = "default",
  onClose,
  formModule,
}: ModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    if (hasTriggeredRef.current) return;

    // Check if modal was already shown
    if (showOnce) {
      const wasShown = localStorage.getItem(`modal-${id}-shown`);
      if (wasShown === "true") return;
    }

    const handleTrigger = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      setIsOpen(true);
      if (showOnce) {
        localStorage.setItem(`modal-${id}-shown`, "true");
      }
    };

    if (trigger === "time-delay") {
      const timer = setTimeout(handleTrigger, triggerValue);
      return () => clearTimeout(timer);
    }

    if (trigger === "exit-intent") {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          handleTrigger();
        }
      };
      document.addEventListener("mouseleave", handleMouseLeave);
      return () => document.removeEventListener("mouseleave", handleMouseLeave);
    }

    if (trigger === "scroll-depth") {
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent >= (triggerValue || 50)) {
          handleTrigger();
        }
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [id, trigger, triggerValue, showOnce]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Expose method to manually open modal
  useEffect(() => {
    if (trigger === "manual") {
      (window as any)[`openModal${id}`] = () => setIsOpen(true);
    }
  }, [id, trigger]);

  if (!isMounted || !isOpen) return null;

  const getVariantClasses = () => {
    switch (variant) {
      case "fullscreen":
        return "w-full h-full max-w-none rounded-none";
      case "slide-in":
        return "h-full w-full max-w-2xl ml-auto rounded-none";
      default:
        return "w-full max-w-2xl rounded-2xl max-h-[90vh] overflow-y-auto";
    }
  };

  const getAnimationClasses = () => {
    switch (variant) {
      case "slide-in":
        return isOpen ? "translate-x-0" : "translate-x-full";
      default:
        return isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0";
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300"
      onClick={handleBackdropClick}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div
        className={`${getVariantClasses()} ${getAnimationClasses()} bg-[var(--background)] border border-[var(--border)] shadow-2xl transition-all duration-300 relative`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-[var(--surface)] hover:bg-[var(--surface-hover)] text-[var(--foreground)] transition-colors"
          aria-label="Close modal"
        >
          <XIcon className="w-5 h-5" />
        </button>

        {/* Image */}
        {image && (
          <div className="relative w-full h-48 md:h-64 overflow-hidden">
            <img
              src={image}
              alt={title || "Modal image"}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--background)]/50" />
          </div>
        )}

        {/* Content */}
        <div className={`p-8 ${image ? "md:p-12" : "md:p-16"}`}>
          {title && (
            <h2 className="heading-lg mb-6">{title}</h2>
          )}
          <div className="body-lg mb-8 text-[var(--foreground-muted)] prose prose-invert max-w-none">
            {isPortableText(content) ? (
              <PortableText value={content} />
            ) : (
              content
            )}
          </div>

          {cta && (
            <a
              href={cta.url}
              className={`btn ${
                cta.variant === "secondary"
                  ? "btn-secondary"
                  : cta.variant === "ghost"
                  ? "btn-ghost"
                  : cta.variant === "outline"
                  ? "border border-[var(--border)] bg-transparent text-[var(--foreground)] hover:bg-[var(--surface)] hover:border-[var(--border-hover)]"
                  : "btn-primary"
              } btn-lg w-full md:w-auto`}
              onClick={handleClose}
            >
              {cta.text}
            </a>
          )}

          {/* Embedded Form */}
          {formModule?.formType && (
            <div className="mt-6 pt-6 border-t border-white/10">
              <ModalForm formModule={formModule} />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

export default {
  AnnouncementBar,
  Countdown,
  StickyCta,
  Modal,
};
