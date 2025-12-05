import { z } from "zod";

/**
 * Form Field Configuration from Sanity
 */
export interface FormFieldConfig {
  _key: string;
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  defaultValue?: string;
  width?: "full" | "half";
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

/**
 * Generate a Zod schema from Sanity form field configuration
 */
export function generateFormSchema(fields: FormFieldConfig[]) {
  const schemaShape: Record<string, z.ZodTypeAny> = {};

  for (const field of fields) {
    let fieldSchema: z.ZodTypeAny;

    switch (field.type) {
      case "email":
        fieldSchema = z.string().email("Please enter a valid email address");
        break;

      case "number":
        fieldSchema = z.coerce.number();
        if (field.validation?.min !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).min(
            field.validation.min,
            `Must be at least ${field.validation.min}`
          );
        }
        if (field.validation?.max !== undefined) {
          fieldSchema = (fieldSchema as z.ZodNumber).max(
            field.validation.max,
            `Must be no more than ${field.validation.max}`
          );
        }
        break;

      case "checkbox":
        fieldSchema = z.boolean().default(false);
        break;

      case "date":
        fieldSchema = z.string();
        break;

      case "select":
      case "radio":
        if (field.options && field.options.length > 0) {
          const values = field.options.map((o) => o.value) as [
            string,
            ...string[],
          ];
          fieldSchema = z.enum(values, {
            message: "Please select a valid option",
          });
        } else {
          fieldSchema = z.string();
        }
        break;

      case "phone":
        fieldSchema = z
          .string()
          .refine(
            (val) => {
              if (!val) return true; // Let required handle empty
              const cleaned = val.replace(/[\s\-\(\)\.\+]/g, "");
              return /^\d{7,15}$/.test(cleaned);
            },
            { message: "Please enter a valid phone number" }
          );
        break;

      case "textarea":
      case "text":
      default:
        fieldSchema = z.string();
        break;
    }

    // Apply common string validations for text-based fields
    const textBasedTypes = ["text", "textarea", "email", "phone", "date"];
    if (textBasedTypes.includes(field.type)) {
      let stringSchema = fieldSchema as z.ZodString;
      if (field.validation?.minLength) {
        stringSchema = stringSchema.min(
          field.validation.minLength,
          `Must be at least ${field.validation.minLength} characters`
        );
      }
      if (field.validation?.maxLength) {
        stringSchema = stringSchema.max(
          field.validation.maxLength,
          `Must be no more than ${field.validation.maxLength} characters`
        );
      }
      if (field.validation?.pattern) {
        try {
          const regex = new RegExp(field.validation.pattern);
          stringSchema = stringSchema.regex(
            regex,
            field.validation.patternMessage || "Invalid format"
          );
        } catch {
          // Invalid regex, skip
        }
      }
      fieldSchema = stringSchema;
    }

    // Handle required/optional
    if (field.required) {
      if (field.type === "checkbox") {
        fieldSchema = (fieldSchema as z.ZodBoolean).refine((val) => val === true, {
          message: `${field.label} is required`,
        });
      } else if (textBasedTypes.includes(field.type)) {
        fieldSchema = (fieldSchema as z.ZodString).min(1, `${field.label} is required`);
      }
      // Note: select/radio with z.enum already requires a valid option
    } else {
      // Make optional
      if (field.type !== "checkbox") {
        fieldSchema = fieldSchema.optional().or(z.literal(""));
      }
    }

    schemaShape[field.name] = fieldSchema;
  }

  return z.object(schemaShape);
}

/**
 * Get default values from field config
 */
export function getDefaultValues(
  fields: FormFieldConfig[]
): Record<string, string | boolean> {
  const defaults: Record<string, string | boolean> = {};

  for (const field of fields) {
    if (field.type === "checkbox") {
      defaults[field.name] = field.defaultValue === "true";
    } else {
      defaults[field.name] = field.defaultValue || "";
    }
  }

  return defaults;
}
