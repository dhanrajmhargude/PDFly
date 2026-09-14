"use client";

import { cn } from "@/lib/utlis/cn";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  label,
  className,
}: SelectProps) {
  return (
    <label className={cn("block w-full", className)}>
        {label ? (
            <span className="font-mono text-black/90 uppercase  mb-2.5 block text-sm font-medium text-text-primary">
                {label}
            </span>
        ) : null}
        <select
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full rounded border border-dashed border-black/40 bg-white px-3 py-2 font-mono text-sm text-black transition-all duration-150 ease-out focus:border-black focus:outline-none focus:ring-0 cursor-pointer ">
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </label>
  );
}
