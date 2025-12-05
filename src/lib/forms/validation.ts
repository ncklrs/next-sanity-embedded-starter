/**
 * Server-side Form Validation
 *
 * Validates form data against field configurations from Sanity.
 */

export interface FormField {
  _key: string;
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: Array<{ label: string; value: string }>;
  rows?: number;
  accept?: string;
  multiple?: boolean;
  validation?: {
    pattern?: string;
    patternMessage?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Validate form data against field configurations
 */
export function validateFormData(
  fields: FormField[],
  data: Record<string, unknown>
): ValidationError[] {
  const errors: ValidationError[] = [];

  for (const field of fields) {
    const value = data[field.name];
    const fieldErrors = validateField(field, value);
    errors.push(...fieldErrors);
  }

  return errors;
}

/**
 * Validate a single field value
 */
function validateField(field: FormField, value: unknown): ValidationError[] {
  const errors: ValidationError[] = [];
  const stringValue = value ? String(value).trim() : "";

  // Required validation
  if (field.required && !stringValue) {
    errors.push({
      field: field.name,
      message: `${field.label} is required`,
    });
    return errors; // Skip other validations if required field is empty
  }

  // Skip further validation if field is empty and not required
  if (!stringValue) {
    return errors;
  }

  // Type-specific validation
  switch (field.type) {
    case "email":
      if (!isValidEmail(stringValue)) {
        errors.push({
          field: field.name,
          message: "Please enter a valid email address",
        });
      }
      break;

    case "phone":
      if (!isValidPhone(stringValue)) {
        errors.push({
          field: field.name,
          message: "Please enter a valid phone number",
        });
      }
      break;

    case "number":
      const numValue = Number(value);
      if (isNaN(numValue)) {
        errors.push({
          field: field.name,
          message: `${field.label} must be a valid number`,
        });
      } else {
        if (
          field.validation?.min !== undefined &&
          numValue < field.validation.min
        ) {
          errors.push({
            field: field.name,
            message: `${field.label} must be at least ${field.validation.min}`,
          });
        }
        if (
          field.validation?.max !== undefined &&
          numValue > field.validation.max
        ) {
          errors.push({
            field: field.name,
            message: `${field.label} must be no more than ${field.validation.max}`,
          });
        }
      }
      break;

    case "select":
    case "radio":
      // Validate that value is one of the allowed options
      if (field.options && field.options.length > 0) {
        const validValues = field.options.map((opt) => opt.value);
        if (!validValues.includes(stringValue)) {
          errors.push({
            field: field.name,
            message: `Please select a valid option for ${field.label}`,
          });
        }
      }
      break;
  }

  // Custom validation rules
  if (field.validation) {
    // Min length
    if (
      field.validation.minLength &&
      stringValue.length < field.validation.minLength
    ) {
      errors.push({
        field: field.name,
        message: `${field.label} must be at least ${field.validation.minLength} characters`,
      });
    }

    // Max length
    if (
      field.validation.maxLength &&
      stringValue.length > field.validation.maxLength
    ) {
      errors.push({
        field: field.name,
        message: `${field.label} must be no more than ${field.validation.maxLength} characters`,
      });
    }

    // Custom pattern
    if (field.validation.pattern) {
      try {
        const regex = new RegExp(field.validation.pattern);
        if (!regex.test(stringValue)) {
          errors.push({
            field: field.name,
            message:
              field.validation.patternMessage ||
              `${field.label} has an invalid format`,
          });
        }
      } catch {
        // Invalid regex pattern in config, skip validation
        console.warn(`Invalid regex pattern for field ${field.name}`);
      }
    }
  }

  return errors;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (flexible, allows various formats)
 */
function isValidPhone(phone: string): boolean {
  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-\(\)\.\+]/g, "");
  // Check if remaining characters are digits and length is reasonable
  return /^\d{7,15}$/.test(cleaned);
}

/**
 * Sanitize form data to prevent XSS and injection
 */
export function sanitizeFormData(
  data: Record<string, unknown>
): Record<string, unknown> {
  const sanitized: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(data)) {
    if (typeof value === "string") {
      sanitized[key] = sanitizeString(value);
    } else if (typeof value === "number" || typeof value === "boolean") {
      sanitized[key] = value;
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((v) =>
        typeof v === "string" ? sanitizeString(v) : v
      );
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Sanitize a string value
 */
function sanitizeString(str: string): string {
  return str
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}

/**
 * Check for honeypot field (spam protection)
 */
export function isSpamSubmission(data: Record<string, unknown>): boolean {
  // Check for honeypot field
  const honeypotValue = data._hp || data._honeypot || data.website;
  if (honeypotValue && String(honeypotValue).trim() !== "") {
    return true;
  }

  return false;
}
