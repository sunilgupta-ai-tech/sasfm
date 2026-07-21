"use client";

import React, { forwardRef } from "react";

const fieldBaseClass =
  "mt-1.5 w-full rounded-md border border-line bg-paper px-3.5 py-2.5 text-sm text-ink placeholder:text-slate/50 outline-none transition-colors focus:border-teal focus:ring-1 focus:ring-teal disabled:opacity-60 disabled:cursor-not-allowed";

function FieldWrapper({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">
        {label}
        {required && <span className="text-amber-dark"> *</span>}
      </span>
      {children}
      {hint && (
        <span className="mt-1 block text-xs text-slate/70">
          {hint}
        </span>
      )}
    </label>
  );
}

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  hint?: string;
};

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, hint, required, className = "", ...props }, ref) => (
    <FieldWrapper label={label} hint={hint} required={required}>
      <input
        ref={ref}
        required={required}
        className={`${fieldBaseClass} ${className}`}
        {...props}
      />
    </FieldWrapper>
  )
);

TextInput.displayName = "TextInput";

type TextareaFieldProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    hint?: string;
  };

export const TextareaField = forwardRef<
  HTMLTextAreaElement,
  TextareaFieldProps
>(({ label, hint, required, className = "", ...props }, ref) => (
  <FieldWrapper label={label} hint={hint} required={required}>
    <textarea
      ref={ref}
      required={required}
      className={`${fieldBaseClass} resize-y ${className}`}
      {...props}
    />
  </FieldWrapper>
));

TextareaField.displayName = "TextareaField";

type SelectFieldProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    label: string;
    hint?: string;
  };

export const SelectField = forwardRef<
  HTMLSelectElement,
  SelectFieldProps
>(({ label, hint, required, className = "", children, ...props }, ref) => (
  <FieldWrapper label={label} hint={hint} required={required}>
    <select
      ref={ref}
      required={required}
      className={`${fieldBaseClass} ${className}`}
      {...props}
    >
      {children}
    </select>
  </FieldWrapper>
));

SelectField.displayName = "SelectField";

export function CheckboxField({
  label,
  description,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  description?: string;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        className="mt-0.5 h-4 w-4 rounded accent-ink shrink-0"
        {...props}
      />
      <span>
        <span className="block text-sm font-medium text-ink">
          {label}
        </span>
        {description && (
          <span className="block text-xs text-slate/70">
            {description}
          </span>
        )}
      </span>
    </label>
  );
}