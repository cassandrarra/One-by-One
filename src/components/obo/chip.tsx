import { forwardRef, type ButtonHTMLAttributes } from "react";
import { Check, Lock } from "lucide-react";

import { cn } from "@/lib/utils";

type ChipProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  label: string;
  selected?: boolean;
  /** Shows a lock for sensitive choices that stay private. */
  sensitive?: boolean;
};

export const Chip = forwardRef<HTMLButtonElement, ChipProps>(function Chip(
  { label, selected = false, sensitive = false, className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      aria-pressed={selected}
      className={cn(
        "focus-ring inline-flex min-h-10 max-w-full select-none items-center gap-2 rounded-full border px-4 py-1.5 text-left text-text type-body transition-colors disabled:cursor-not-allowed disabled:opacity-40",
        selected
          ? "border-primary bg-primary-tint pressed:border-primary-pressed"
          : "border-border bg-surface pressed:border-text-muted pressed:bg-border",
        className,
      )}
      {...props}
    >
      {selected ? <Check aria-hidden className="size-4 shrink-0" strokeWidth={2.5} /> : null}
      <span className="min-w-0 [overflow-wrap:anywhere]">{label}</span>
      {sensitive ? (
        <>
          <Lock aria-hidden className="size-4 shrink-0 text-text-muted" />
          <span className="sr-only">(private)</span>
        </>
      ) : null}
    </button>
  );
});
