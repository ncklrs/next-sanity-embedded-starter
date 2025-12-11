"use client";

import { useState, type FormEvent, type ChangeEvent, type CSSProperties } from "react";
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

export type FieldType = "text" | "email" | "textarea" | "phone" | "select" | "checkbox";

export interface FormField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // For select fields
  rows?: number; // For textarea
  validation?: {
    pattern?: RegExp;
    minLength?: number;
    maxLength?: number;
    message?: string;
  };
}

interface BaseFormProps {
  backgroundColor?: string;
  className?: string;
}

interface FormContactProps extends BaseFormProps {
  heading?: string;
  description?: string;
  fields?: FormField[];
  submitText?: string;
  onSubmit?: (data: Record<string, string>) => Promise<void> | void;
}

interface FormNewsletterProps extends BaseFormProps {
  heading?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => Promise<void> | void;
}

interface FormWithImageProps extends BaseFormProps {
  heading?: string;
  description?: string;
  image?: string;
  imagePosition?: "left" | "right";
  fields?: FormField[];
  submitText?: string;
  onSubmit?: (data: Record<string, string>) => Promise<void> | void;
}

interface FormStep {
  title: string;
  description?: string;
  fields: FormField[];
}

interface FormMultiStepProps extends BaseFormProps {
  steps: FormStep[];
  onSubmit?: (data: Record<string, string>) => Promise<void> | void;
  submitText?: string;
}

interface FormState {
  data: Record<string, string>;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSuccess: boolean;
}

// ============================================================================
// Default Form Fields
// ============================================================================

const DEFAULT_CONTACT_FIELDS: FormField[] = [
  {
    name: "name",
    label: "Full Name",
    type: "text",
    placeholder: "John Doe",
    required: true,
  },
  {
    name: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
    required: true,
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "phone",
    placeholder: "+1 (555) 000-0000",
    required: false,
  },
  {
    name: "message",
    label: "Message",
    type: "textarea",
    placeholder: "Tell us about your project...",
    required: true,
    rows: 5,
  },
];

// ============================================================================
// Section Header Component
// ============================================================================

const SectionHeader = ({ heading, description }: { heading?: string; description?: string }) => {
  if (!heading && !description) return null;

  return (
    <div className="mb-8">
      {heading && <h2 className="heading-lg mb-4">{heading}</h2>}
      {description && <p className="body-lg">{description}</p>}
    </div>
  );
};

// ============================================================================
// Form Field Renderer
// ============================================================================

const FormFieldRenderer = ({
  field,
  value,
  error,
  onChange,
}: {
  field: FormField;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    onChange(field.name, e.target.value);
  };

  const inputClasses = `input ${error ? "border-[var(--error)] focus:border-[var(--error)] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]" : ""}`;

  if (field.type === "textarea") {
    return (
      <div>
        <label htmlFor={field.name} className="block text-sm font-medium text-[var(--foreground)] mb-2">
          {field.label}
          {field.required && <span className="text-[var(--error)] ml-1">*</span>}
        </label>
        <textarea
          id={field.name}
          name={field.name}
          value={value}
          onChange={handleChange}
          placeholder={field.placeholder}
          required={field.required}
          rows={field.rows || 4}
          className={inputClasses}
        />
        {error && <p className="mt-1.5 text-sm text-[var(--error)]">{error}</p>}
      </div>
    );
  }

  if (field.type === "select" && field.options) {
    return (
      <div>
        <label htmlFor={field.name} className="block text-sm font-medium text-[var(--foreground)] mb-2">
          {field.label}
          {field.required && <span className="text-[var(--error)] ml-1">*</span>}
        </label>
        <select
          id={field.name}
          name={field.name}
          value={value}
          onChange={handleChange}
          required={field.required}
          className={inputClasses}
        >
          <option value="">Select an option</option>
          {field.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-sm text-[var(--error)]">{error}</p>}
      </div>
    );
  }

  if (field.type === "checkbox") {
    return (
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={field.name}
          name={field.name}
          checked={value === "true"}
          onChange={(e) => onChange(field.name, e.target.checked ? "true" : "false")}
          required={field.required}
          className="mt-1 w-4 h-4 rounded border-[var(--border)] bg-[var(--surface)] text-[var(--accent-violet)] focus:ring-2 focus:ring-[var(--accent-violet)] focus:ring-offset-0"
        />
        <label htmlFor={field.name} className="text-sm text-[var(--foreground)]">
          {field.label}
          {field.required && <span className="text-[var(--error)] ml-1">*</span>}
        </label>
        {error && <p className="mt-1.5 text-sm text-[var(--error)] w-full">{error}</p>}
      </div>
    );
  }

  return (
    <div>
      <label htmlFor={field.name} className="block text-sm font-medium text-[var(--foreground)] mb-2">
        {field.label}
        {field.required && <span className="text-[var(--error)] ml-1">*</span>}
      </label>
      <input
        type={field.type}
        id={field.name}
        name={field.name}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        required={field.required}
        className={inputClasses}
      />
      {error && <p className="mt-1.5 text-sm text-[var(--error)]">{error}</p>}
    </div>
  );
};

// ============================================================================
// Success Message Component
// ============================================================================

const SuccessMessage = ({ message }: { message: string }) => (
  <div className="glass-card p-8 text-center">
    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-emerald)] to-[var(--accent-cyan)] flex items-center justify-center mx-auto mb-4">
      <svg width="32" height="32" fill="none" stroke="white" strokeWidth="3">
        <path d="M6 12l6 6 12-12" />
      </svg>
    </div>
    <h3 className="heading-md mb-2">Success!</h3>
    <p className="body-lg">{message}</p>
  </div>
);

// ============================================================================
// FormContact Component
// ============================================================================

export const FormContact = ({
  backgroundColor,
  className = "",
  heading = "Get in Touch",
  description = "Fill out the form below and we'll get back to you as soon as possible.",
  fields,
  submitText = "Send Message",
  onSubmit,
}: FormContactProps) => {
  // Handle null/undefined fields from Sanity
  const safeFields = fields ?? DEFAULT_CONTACT_FIELDS;
  const [formState, setFormState] = useState<FormState>({
    data: {},
    errors: {},
    isSubmitting: false,
    isSuccess: false,
  });

  const handleFieldChange = (name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
      errors: { ...prev.errors, [name]: "" },
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    safeFields.forEach((field) => {
      const value = formState.data[field.name] || "";

      if (field.required && !value.trim()) {
        errors[field.name] = `${field.label} is required`;
      }

      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[field.name] = "Please enter a valid email address";
      }

      if (field.validation) {
        if (field.validation.pattern && !field.validation.pattern.test(value)) {
          errors[field.name] = field.validation.message || "Invalid format";
        }
        if (field.validation.minLength && value.length < field.validation.minLength) {
          errors[field.name] = `Minimum ${field.validation.minLength} characters required`;
        }
        if (field.validation.maxLength && value.length > field.validation.maxLength) {
          errors[field.name] = `Maximum ${field.validation.maxLength} characters allowed`;
        }
      }
    });

    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit?.(formState.data);
      setFormState((prev) => ({ ...prev, isSubmitting: false, isSuccess: true }));
    } catch (error) {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
      console.error("Form submission error:", error);
    }
  };

  const style: CSSProperties = getBackgroundStyle(backgroundColor) || {};

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container max-w-3xl">
        <SectionHeader heading={heading} description={description} />

        {formState.isSuccess ? (
          <SuccessMessage message="Thank you for your message. We'll be in touch soon!" />
        ) : (
          <form onSubmit={handleSubmit} className="glass-card p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {safeFields.map((field) => (
                <div
                  key={field.name}
                  className={field.type === "textarea" ? "md:col-span-2" : ""}
                >
                  <FormFieldRenderer
                    field={field}
                    value={formState.data[field.name] || ""}
                    error={formState.errors[field.name]}
                    onChange={handleFieldChange}
                  />
                </div>
              ))}
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={formState.isSubmitting}
                className="w-full md:w-auto"
              >
                {submitText}
              </Button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

// ============================================================================
// FormNewsletter Component
// ============================================================================

export const FormNewsletter = ({
  backgroundColor,
  className = "",
  heading = "Subscribe to our newsletter",
  description = "Get the latest updates and articles delivered to your inbox.",
  placeholder = "Enter your email address",
  buttonText = "Subscribe",
  onSubmit,
}: FormNewsletterProps) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit?.(email);
      setIsSuccess(true);
      setEmail("");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const style: CSSProperties = getBackgroundStyle(backgroundColor) || {};

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container max-w-2xl">
        <div className="glass-card p-8 md:p-12 text-center">
          <h2 className="heading-lg mb-3">{heading}</h2>
          {description && <p className="body-lg mb-8">{description}</p>}

          {isSuccess ? (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-emerald)] to-[var(--accent-cyan)] flex items-center justify-center mb-4">
                <svg width="32" height="32" fill="none" stroke="white" strokeWidth="3">
                  <path d="M6 12l6 6 12-12" />
                </svg>
              </div>
              <p className="text-[var(--foreground)] text-lg font-medium">
                Thank you for subscribing!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={placeholder}
                  className="input"
                />
                <Button
                  type="submit"
                  variant="primary"
                  isLoading={isSubmitting}
                >
                  {buttonText}
                </Button>
              </div>
              {error && (
                <p className="mt-3 text-sm text-[var(--error)] text-left">{error}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FormWithImage Component
// ============================================================================

export const FormWithImage = ({
  backgroundColor,
  className = "",
  heading = "Let's Work Together",
  description = "Tell us about your project and we'll get back to you within 24 hours.",
  image = "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800",
  imagePosition = "right",
  fields,
  submitText = "Send Message",
  onSubmit,
}: FormWithImageProps) => {
  // Handle null/undefined fields from Sanity
  const safeFields = fields ?? DEFAULT_CONTACT_FIELDS;
  const [formState, setFormState] = useState<FormState>({
    data: {},
    errors: {},
    isSubmitting: false,
    isSuccess: false,
  });

  const handleFieldChange = (name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
      errors: { ...prev.errors, [name]: "" },
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    safeFields.forEach((field) => {
      const value = formState.data[field.name] || "";

      if (field.required && !value.trim()) {
        errors[field.name] = `${field.label} is required`;
      }

      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[field.name] = "Please enter a valid email address";
      }
    });

    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit?.(formState.data);
      setFormState((prev) => ({ ...prev, isSubmitting: false, isSuccess: true }));
    } catch (error) {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const style: CSSProperties = getBackgroundStyle(backgroundColor) || {};

  const formContent = (
    <div className="p-8 md:p-12">
      <SectionHeader heading={heading} description={description} />

      {formState.isSuccess ? (
        <SuccessMessage message="Thank you! We'll get back to you soon." />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {safeFields.map((field) => (
              <FormFieldRenderer
                key={field.name}
                field={field}
                value={formState.data[field.name] || ""}
                error={formState.errors[field.name]}
                onChange={handleFieldChange}
              />
            ))}
          </div>

          <div className="mt-6">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={formState.isSubmitting}
              className="w-full"
            >
              {submitText}
            </Button>
          </div>
        </form>
      )}
    </div>
  );

  const imageContent = (
    <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden bg-[var(--surface)]">
      <img
        src={image}
        alt="Contact"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-violet)]/20 to-[var(--accent-cyan)]/20" />
    </div>
  );

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container max-w-6xl">
        <div className="glass-card overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {imagePosition === "left" ? (
              <>
                {imageContent}
                {formContent}
              </>
            ) : (
              <>
                {formContent}
                {imageContent}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FormMultiStep Component
// ============================================================================

export const FormMultiStep = ({
  backgroundColor,
  className = "",
  steps: rawSteps,
  submitText = "Submit",
  onSubmit,
}: FormMultiStepProps) => {
  const steps = rawSteps ?? [];
  const [currentStep, setCurrentStep] = useState(0);
  const [formState, setFormState] = useState<FormState>({
    data: {},
    errors: {},
    isSubmitting: false,
    isSuccess: false,
  });

  const handleFieldChange = (name: string, value: string) => {
    setFormState((prev) => ({
      ...prev,
      data: { ...prev.data, [name]: value },
      errors: { ...prev.errors, [name]: "" },
    }));
  };

  const validateCurrentStep = (): boolean => {
    if (!steps[currentStep]) return true;
    const currentFields = steps[currentStep].fields ?? [];
    const errors: Record<string, string> = {};

    currentFields.forEach((field) => {
      const value = formState.data[field.name] || "";

      if (field.required && !value.trim()) {
        errors[field.name] = `${field.label} is required`;
      }

      if (field.type === "email" && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        errors[field.name] = "Please enter a valid email address";
      }
    });

    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateCurrentStep()) return;

    setFormState((prev) => ({ ...prev, isSubmitting: true }));

    try {
      await onSubmit?.(formState.data);
      setFormState((prev) => ({ ...prev, isSubmitting: false, isSuccess: true }));
    } catch (error) {
      setFormState((prev) => ({ ...prev, isSubmitting: false }));
    }
  };

  const style: CSSProperties = getBackgroundStyle(backgroundColor) || {};
  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  // Early return if no steps available or current step has no fields
  if (steps.length === 0 || !currentStepData || !currentStepData.fields || currentStepData.fields.length === 0) {
    return (
      <section className={`section ${className}`} style={style}>
        <div className="container max-w-3xl">
          <p className="text-center text-[var(--foreground-muted)]">Form not configured</p>
        </div>
      </section>
    );
  }

  return (
    <section className={`section ${className}`} style={style}>
      <div className="container max-w-3xl">
        {formState.isSuccess ? (
          <SuccessMessage message="Thank you! Your submission has been received." />
        ) : (
          <div className="glass-card p-8 md:p-12">
            {/* Step Indicator */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center flex-1">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                        index === currentStep
                          ? "bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-violet)] text-white"
                          : index < currentStep
                          ? "bg-[var(--accent-emerald)] text-white"
                          : "bg-[var(--surface)] text-[var(--foreground-muted)] border border-[var(--border)]"
                      }`}
                    >
                      {index < currentStep ? (
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3">
                          <path d="M3 8l4 4 8-8" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`flex-1 h-0.5 mx-2 transition-colors ${
                          index < currentStep ? "bg-[var(--accent-emerald)]" : "bg-[var(--border)]"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="text-center">
                <h3 className="heading-md mb-2">{currentStepData.title}</h3>
                {currentStepData.description && (
                  <p className="body-sm">{currentStepData.description}</p>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <form onSubmit={isLastStep ? handleSubmit : (e) => { e.preventDefault(); handleNext(); }}>
              <div className="space-y-6 mb-8">
                {currentStepData.fields.map((field) => (
                  <FormFieldRenderer
                    key={field.name}
                    field={field}
                    value={formState.data[field.name] || ""}
                    error={formState.errors[field.name]}
                    onChange={handleFieldChange}
                  />
                ))}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className={currentStep === 0 ? "invisible" : ""}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Previous
                </Button>

                {isLastStep ? (
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={formState.isSubmitting}
                  >
                    {submitText}
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="primary"
                  >
                    Next
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
};

// Re-export dynamic form component
export { FormDynamic } from "./FormDynamic";

// Default export with all components
export default {
  FormContact,
  FormNewsletter,
  FormWithImage,
  FormMultiStep,
};
