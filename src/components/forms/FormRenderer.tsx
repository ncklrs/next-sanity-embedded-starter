"use client";

import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, CheckCircle2 } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  generateFormSchema,
  getDefaultValues,
  type FormFieldConfig,
} from "@/lib/forms/schema";
import { submitDynamicForm } from "@/app/actions/forms";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Button from "@/components/ui/Button";

/**
 * Form Configuration from Sanity
 */
export interface FormConfig {
  _id: string;
  name: string;
  identifier?: { current: string };
  description?: string;
  fields: FormFieldConfig[];
  settings?: {
    submitButtonText?: string;
    submitButtonLoadingText?: string;
    successTitle?: string;
    successMessage?: string;
    errorMessage?: string;
    enableSpamProtection?: boolean;
  };
}

interface FormRendererProps {
  form: FormConfig;
  className?: string;
  onSuccess?: (submissionId: string | undefined) => void;
  onError?: (error: string) => void;
}

/**
 * FormRenderer Component
 *
 * Renders a dynamic form based on Sanity configuration using
 * react-hook-form for form state management and zod for validation.
 */
export function FormRenderer({
  form: formConfig,
  className = "",
  onSuccess,
  onError,
}: FormRendererProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Generate zod schema from form fields
  const formSchema = useMemo(
    () => generateFormSchema(formConfig.fields),
    [formConfig.fields]
  );

  // Get default values
  const defaultValues = useMemo(
    () => getDefaultValues(formConfig.fields),
    [formConfig.fields]
  );

  // Initialize react-hook-form with zod resolver
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onBlur", // Validate on blur for better UX
  });

  // Handle form submission
  async function onSubmit(data: z.infer<typeof formSchema>) {
    setSubmitError(null);

    try {
      const result = await submitDynamicForm({
        formId: formConfig._id,
        formIdentifier: formConfig.identifier?.current,
        data: data as Record<string, unknown>,
        metadata: {
          userAgent:
            typeof navigator !== "undefined" ? navigator.userAgent : undefined,
          referrer:
            typeof document !== "undefined" ? document.referrer : undefined,
        },
      });

      if (result.success) {
        setIsSuccess(true);
        onSuccess?.(result.submissionId);
      } else if (result.errors && result.errors.length > 0) {
        // Set server-side validation errors
        result.errors.forEach((err) => {
          form.setError(err.field as keyof z.infer<typeof formSchema>, {
            type: "server",
            message: err.message,
          });
        });
      } else {
        throw new Error(result.error || "Submission failed");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Something went wrong";
      setSubmitError(errorMessage);
      onError?.(errorMessage);
    }
  }

  // Success state
  if (isSuccess) {
    return (
      <div className={cn("glass-card p-8 text-center", className)}>
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          {formConfig.settings?.successTitle || "Thank you!"}
        </h3>
        <p className="text-[var(--foreground-muted)]">
          {formConfig.settings?.successMessage ||
            "Your submission has been received. We'll get back to you soon."}
        </p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        {/* Honeypot field for spam protection */}
        {formConfig.settings?.enableSpamProtection && (
          <div className="hidden" aria-hidden="true">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register("_hp" as never)}
            />
          </div>
        )}

        {/* Form fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formConfig.fields.map((fieldConfig) => (
            <DynamicFormField
              key={fieldConfig._key || fieldConfig.name}
              fieldConfig={fieldConfig}
              form={form}
            />
          ))}
        </div>

        {/* Error message */}
        {submitError && (
          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
            <p className="text-sm">
              {formConfig.settings?.errorMessage || submitError}
            </p>
          </div>
        )}

        {/* Submit button */}
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="w-full"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {formConfig.settings?.submitButtonLoadingText || "Submitting..."}
            </>
          ) : (
            formConfig.settings?.submitButtonText || "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}

/**
 * Dynamic Form Field Component
 *
 * Renders the appropriate form field based on the field type from Sanity.
 */
function DynamicFormField({
  fieldConfig,
  form,
}: {
  fieldConfig: FormFieldConfig;
  form: ReturnType<typeof useForm<Record<string, unknown>>>;
}) {
  const widthClass =
    fieldConfig.width === "half" ? "md:col-span-1" : "md:col-span-2";

  return (
    <FormField
      control={form.control}
      name={fieldConfig.name}
      render={({ field }) => (
        <FormItem className={widthClass}>
          {fieldConfig.type !== "checkbox" && (
            <FormLabel>
              {fieldConfig.label}
              {fieldConfig.required && (
                <span className="text-[var(--error)] ml-1">*</span>
              )}
            </FormLabel>
          )}

          <FormControl>
            {renderFieldInput(fieldConfig, field)}
          </FormControl>

          {fieldConfig.helpText && (
            <FormDescription>{fieldConfig.helpText}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/**
 * Render the appropriate input component based on field type
 */
function renderFieldInput(
  fieldConfig: FormFieldConfig,
  field: {
    value: unknown;
    onChange: (value: unknown) => void;
    onBlur: () => void;
    name: string;
    ref: React.Ref<unknown>;
  }
) {
  // Extract field properties without ref for components that have different ref types
  const { ref: _ref, ...fieldWithoutRef } = field;

  switch (fieldConfig.type) {
    case "textarea":
      return (
        <Textarea
          placeholder={fieldConfig.placeholder}
          rows={fieldConfig.rows || 4}
          name={field.name}
          value={field.value as string}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
        />
      );

    case "select":
      return (
        <Select
          onValueChange={field.onChange}
          defaultValue={field.value as string}
        >
          <SelectTrigger>
            <SelectValue placeholder={fieldConfig.placeholder || "Select an option"} />
          </SelectTrigger>
          <SelectContent>
            {fieldConfig.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "radio":
      return (
        <RadioGroup
          onValueChange={field.onChange}
          defaultValue={field.value as string}
          className="flex flex-col space-y-2"
        >
          {fieldConfig.options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={`${field.name}-${option.value}`} />
              <Label htmlFor={`${field.name}-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      );

    case "checkbox":
      return (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={field.value as boolean}
            onCheckedChange={field.onChange}
            id={field.name}
          />
          <Label htmlFor={field.name} className="cursor-pointer">
            {fieldConfig.label}
            {fieldConfig.required && (
              <span className="text-[var(--error)] ml-1">*</span>
            )}
          </Label>
        </div>
      );

    case "number":
      return (
        <Input
          type="number"
          name={field.name}
          placeholder={fieldConfig.placeholder}
          min={fieldConfig.validation?.min}
          max={fieldConfig.validation?.max}
          value={field.value as string}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
        />
      );

    case "date":
      return (
        <Input
          type="date"
          name={field.name}
          value={field.value as string}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
        />
      );

    case "email":
      return (
        <Input
          type="email"
          name={field.name}
          placeholder={fieldConfig.placeholder || "you@example.com"}
          value={field.value as string}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
        />
      );

    case "phone":
      return (
        <Input
          type="tel"
          name={field.name}
          placeholder={fieldConfig.placeholder || "+1 (555) 000-0000"}
          value={field.value as string}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
        />
      );

    case "file":
      return (
        <Input
          type="file"
          name={field.name}
          accept={fieldConfig.accept}
          multiple={fieldConfig.multiple}
          className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[var(--surface)] file:text-[var(--foreground)] hover:file:bg-[var(--surface-hover)]"
          onChange={(e) => {
            const files = e.target.files;
            if (files) {
              field.onChange(Array.from(files).map((f) => f.name).join(", "));
            }
          }}
          onBlur={field.onBlur}
        />
      );

    case "text":
    default:
      return (
        <Input
          type="text"
          name={field.name}
          placeholder={fieldConfig.placeholder}
          minLength={fieldConfig.validation?.minLength}
          maxLength={fieldConfig.validation?.maxLength}
          value={field.value as string}
          onChange={(e) => field.onChange(e.target.value)}
          onBlur={field.onBlur}
        />
      );
  }
}

export default FormRenderer;
