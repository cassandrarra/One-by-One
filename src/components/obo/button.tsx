import { forwardRef, type ButtonHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const base =
  "focus-ring inline-flex min-h-13 w-full select-none items-center justify-center gap-2 rounded-full px-6 py-3 text-center type-body-strong transition-colors disabled:cursor-not-allowed disabled:opacity-40";

/** Full-width, 52px, primary fill with white text. One per screen. */
export const PrimaryButton = forwardRef<HTMLButtonElement, ButtonProps>(function PrimaryButton(
  { className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(base, "bg-primary text-on-primary pressed:bg-primary-pressed", className)}
      {...props}
    />
  );
});

/** Surface fill, border, text color. */
export const SecondaryButton = forwardRef<HTMLButtonElement, ButtonProps>(function SecondaryButton(
  { className, type = "button", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        base,
        "border border-border bg-surface text-text pressed:border-text-muted pressed:bg-border",
        className,
      )}
      {...props}
    />
  );
});
