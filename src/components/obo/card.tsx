import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const base = "rounded-card border border-border bg-surface p-4 text-text";

/** Flat surface with a 1px border and 16px radius. */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(base, className)} {...props} />;
}

/** Card that responds to a tap. Put only inline/span content inside. */
export const TappableCard = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  function TappableCard({ className, type = "button", ...props }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          base,
          "focus-ring block w-full text-left transition-colors pressed:border-text-muted pressed:bg-background disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
        {...props}
      />
    );
  },
);
