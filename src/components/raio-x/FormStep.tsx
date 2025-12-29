"use client";

import { ReactNode } from "react";

interface FormStepProps {
  title: string;
  description: string;
  children: ReactNode;
  isActive: boolean;
}

export default function FormStep({
  title,
  description,
  children,
  isActive,
}: FormStepProps) {
  if (!isActive) return null;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-2">
          {title}
        </h2>
        <p className="text-[var(--muted-foreground)]">{description}</p>
      </div>
      <div className="space-y-6">{children}</div>
    </div>
  );
}

// Componente de campo do formulário
interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: ReactNode;
  hint?: string;
}

export function FormField({
  label,
  required = false,
  error,
  children,
  hint,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-[var(--foreground)]">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
      {hint && !error && (
        <p className="text-xs text-[var(--muted)]">{hint}</p>
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

// Input de texto
interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number" | "email";
  min?: number;
  max?: number;
}

export function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  max,
}: TextInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      min={min}
      max={max}
      className="w-full px-4 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[var(--brasil-azul)] focus:border-transparent transition-all"
    />
  );
}

// Select
interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export function SelectInput({
  value,
  onChange,
  options,
  placeholder = "Selecione...",
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 rounded-xl border border-[var(--card-border)] bg-[var(--background)] text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--brasil-azul)] focus:border-transparent transition-all appearance-none cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23737373'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 1rem center",
        backgroundSize: "1.5rem",
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

// Radio Group
interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  columns?: 1 | 2 | 3;
}

export function RadioGroup({
  value,
  onChange,
  options,
  columns = 1,
}: RadioGroupProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-3`}>
      {options.map((option) => (
        <label
          key={option.value}
          className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
            value === option.value
              ? "border-[var(--brasil-azul)] bg-[var(--brasil-azul)]/5"
              : "border-[var(--card-border)] hover:border-[var(--brasil-azul)]/50"
          }`}
        >
          <input
            type="radio"
            checked={value === option.value}
            onChange={() => onChange(option.value)}
            className="mt-1 w-4 h-4 text-[var(--brasil-azul)] border-[var(--card-border)] focus:ring-[var(--brasil-azul)]"
          />
          <div>
            <span className="font-medium text-[var(--foreground)]">
              {option.label}
            </span>
            {option.description && (
              <p className="text-sm text-[var(--muted)] mt-1">
                {option.description}
              </p>
            )}
          </div>
        </label>
      ))}
    </div>
  );
}

// Checkbox
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
}

export function Checkbox({
  checked,
  onChange,
  label,
  description,
}: CheckboxProps) {
  return (
    <label className="flex items-start gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-5 h-5 rounded text-[var(--brasil-azul)] border-[var(--card-border)] focus:ring-[var(--brasil-azul)]"
      />
      <div>
        <span className="font-medium text-[var(--foreground)]">{label}</span>
        {description && (
          <p className="text-sm text-[var(--muted)] mt-1">{description}</p>
        )}
      </div>
    </label>
  );
}

// Number Stepper
interface NumberStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
}

export function NumberStepper({
  value,
  onChange,
  min = 0,
  max = 100,
  label,
}: NumberStepperProps) {
  const decrement = () => {
    if (value > min) onChange(value - 1);
  };

  const increment = () => {
    if (value < max) onChange(value + 1);
  };

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={decrement}
        disabled={value <= min}
        className="w-10 h-10 rounded-full bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] text-[var(--foreground)] font-bold flex items-center justify-center hover:bg-[var(--brasil-azul)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        −
      </button>
      <div className="text-center min-w-[60px]">
        <span className="text-2xl font-bold text-[var(--foreground)]">
          {value}
        </span>
        {label && (
          <p className="text-xs text-[var(--muted)]">{label}</p>
        )}
      </div>
      <button
        type="button"
        onClick={increment}
        disabled={value >= max}
        className="w-10 h-10 rounded-full bg-[var(--neutral-100)] dark:bg-[var(--neutral-800)] text-[var(--foreground)] font-bold flex items-center justify-center hover:bg-[var(--brasil-azul)] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        +
      </button>
    </div>
  );
}

