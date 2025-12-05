"use client";

import React, { type ChangeEvent } from "react";

/**
 * Types for form fields
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

interface FieldProps {
  field: FormFieldConfig;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}

/**
 * Common input class names
 */
const getInputClasses = (error?: string) =>
  `input ${error ? "border-[var(--error)] focus:border-[var(--error)] focus:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]" : ""}`;

/**
 * Field Label Component
 */
const FieldLabel = ({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) => (
  <label
    htmlFor={htmlFor}
    className="block text-sm font-medium text-[var(--foreground)] mb-2"
  >
    {label}
    {required && <span className="text-[var(--error)] ml-1">*</span>}
  </label>
);

/**
 * Field Error Component
 */
const FieldError = ({ error }: { error?: string }) =>
  error ? <p className="mt-1.5 text-sm text-[var(--error)]">{error}</p> : null;

/**
 * Help Text Component
 */
const HelpText = ({ text }: { text?: string }) =>
  text ? (
    <p className="mt-1 text-xs text-[var(--foreground-muted)]">{text}</p>
  ) : null;

/**
 * Text Field Component
 */
export function TextField({ field, value, error, onChange }: FieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div>
      <FieldLabel
        htmlFor={field.name}
        label={field.label}
        required={field.required}
      />
      <input
        type="text"
        id={field.name}
        name={field.name}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        required={field.required}
        minLength={field.validation?.minLength}
        maxLength={field.validation?.maxLength}
        className={getInputClasses(error)}
      />
      <HelpText text={field.helpText} />
      <FieldError error={error} />
    </div>
  );
}

/**
 * Email Field Component
 */
export function EmailField({ field, value, error, onChange }: FieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div>
      <FieldLabel
        htmlFor={field.name}
        label={field.label}
        required={field.required}
      />
      <input
        type="email"
        id={field.name}
        name={field.name}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder || "you@example.com"}
        required={field.required}
        className={getInputClasses(error)}
      />
      <HelpText text={field.helpText} />
      <FieldError error={error} />
    </div>
  );
}

/**
 * Phone Field Component
 */
export function PhoneField({ field, value, error, onChange }: FieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div>
      <FieldLabel
        htmlFor={field.name}
        label={field.label}
        required={field.required}
      />
      <input
        type="tel"
        id={field.name}
        name={field.name}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder || "+1 (555) 000-0000"}
        required={field.required}
        className={getInputClasses(error)}
      />
      <HelpText text={field.helpText} />
      <FieldError error={error} />
    </div>
  );
}

/**
 * Textarea Field Component
 */
export function TextareaField({ field, value, error, onChange }: FieldProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div>
      <FieldLabel
        htmlFor={field.name}
        label={field.label}
        required={field.required}
      />
      <textarea
        id={field.name}
        name={field.name}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        required={field.required}
        rows={field.rows || 4}
        minLength={field.validation?.minLength}
        maxLength={field.validation?.maxLength}
        className={getInputClasses(error)}
      />
      <HelpText text={field.helpText} />
      <FieldError error={error} />
    </div>
  );
}

/**
 * Number Field Component
 */
export function NumberField({ field, value, error, onChange }: FieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div>
      <FieldLabel
        htmlFor={field.name}
        label={field.label}
        required={field.required}
      />
      <input
        type="number"
        id={field.name}
        name={field.name}
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        required={field.required}
        min={field.validation?.min}
        max={field.validation?.max}
        className={getInputClasses(error)}
      />
      <HelpText text={field.helpText} />
      <FieldError error={error} />
    </div>
  );
}

/**
 * Date Field Component
 */
export function DateField({ field, value, error, onChange }: FieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div>
      <FieldLabel
        htmlFor={field.name}
        label={field.label}
        required={field.required}
      />
      <input
        type="date"
        id={field.name}
        name={field.name}
        value={value}
        onChange={handleChange}
        required={field.required}
        className={getInputClasses(error)}
      />
      <HelpText text={field.helpText} />
      <FieldError error={error} />
    </div>
  );
}

/**
 * Select Field Component
 */
export function SelectField({ field, value, error, onChange }: FieldProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div>
      <FieldLabel
        htmlFor={field.name}
        label={field.label}
        required={field.required}
      />
      <select
        id={field.name}
        name={field.name}
        value={value}
        onChange={handleChange}
        required={field.required}
        className={getInputClasses(error)}
      >
        <option value="">Select an option</option>
        {field.options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <HelpText text={field.helpText} />
      <FieldError error={error} />
    </div>
  );
}

/**
 * Radio Field Component
 */
export function RadioField({ field, value, error, onChange }: FieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field.name, e.target.value);
  };

  return (
    <div>
      <span className="block text-sm font-medium text-[var(--foreground)] mb-2">
        {field.label}
        {field.required && <span className="text-[var(--error)] ml-1">*</span>}
      </span>
      <div className="space-y-2">
        {field.options?.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-3 cursor-pointer"
          >
            <input
              type="radio"
              name={field.name}
              value={option.value}
              checked={value === option.value}
              onChange={handleChange}
              required={field.required}
              className="w-4 h-4 text-[var(--accent-violet)] border-[var(--border)] focus:ring-[var(--accent-violet)]"
            />
            <span className="text-sm text-[var(--foreground)]">
              {option.label}
            </span>
          </label>
        ))}
      </div>
      <HelpText text={field.helpText} />
      <FieldError error={error} />
    </div>
  );
}

/**
 * Checkbox Field Component
 */
export function CheckboxField({ field, value, error, onChange }: FieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(field.name, e.target.checked ? "true" : "false");
  };

  return (
    <div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          id={field.name}
          name={field.name}
          checked={value === "true"}
          onChange={handleChange}
          required={field.required}
          className="mt-0.5 w-4 h-4 text-[var(--accent-violet)] border-[var(--border)] rounded focus:ring-[var(--accent-violet)]"
        />
        <span className="text-sm text-[var(--foreground)]">
          {field.label}
          {field.required && <span className="text-[var(--error)] ml-1">*</span>}
        </span>
      </label>
      <HelpText text={field.helpText} />
      <FieldError error={error} />
    </div>
  );
}

/**
 * File Field Component
 */
export function FileField({ field, value, error, onChange }: FieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Store file name(s) for display
      const fileNames = Array.from(files)
        .map((f) => f.name)
        .join(", ");
      onChange(field.name, fileNames);
    }
  };

  return (
    <div>
      <FieldLabel
        htmlFor={field.name}
        label={field.label}
        required={field.required}
      />
      <input
        type="file"
        id={field.name}
        name={field.name}
        onChange={handleChange}
        required={field.required}
        accept={field.accept}
        multiple={field.multiple}
        className="block w-full text-sm text-[var(--foreground-muted)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[var(--surface)] file:text-[var(--foreground)] hover:file:bg-[var(--surface-hover)] cursor-pointer"
      />
      {value && (
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">
          Selected: {value}
        </p>
      )}
      <HelpText text={field.helpText} />
      <FieldError error={error} />
    </div>
  );
}

/**
 * Dynamic Field Component - Renders the appropriate field based on type
 */
export function FormField({
  field,
  value,
  error,
  onChange,
}: FieldProps): React.JSX.Element {
  const fieldComponents: Record<string, typeof TextField> = {
    text: TextField,
    email: EmailField,
    phone: PhoneField,
    textarea: TextareaField,
    number: NumberField,
    date: DateField,
    select: SelectField,
    radio: RadioField,
    checkbox: CheckboxField,
    file: FileField,
  };

  const FieldComponent = fieldComponents[field.type] || TextField;

  return (
    <FieldComponent
      field={field}
      value={value}
      error={error}
      onChange={onChange}
    />
  );
}
