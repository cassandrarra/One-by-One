import { cn } from "@/lib/utils";

type ProgressBarProps = {
  value: number;
  max?: number;
  label?: string;
  className?: string;
};

/** Thin progress line for onboarding. */
export function ProgressBar({ value, max = 100, label = "Progress", className }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      className={cn("h-1 w-full overflow-hidden rounded-full bg-border", className)}
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
