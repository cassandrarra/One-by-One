import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  shape?: "line" | "circle" | "block";
};

/** Loading shape in the border color. Shimmer turns off with reduced motion. */
export function Skeleton({ shape = "line", className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "shimmer bg-border",
        shape === "line" && "h-4 w-full rounded-full",
        shape === "circle" && "size-16 rounded-full",
        shape === "block" && "h-24 w-full rounded-card",
        className,
      )}
      {...props}
    />
  );
}

/** Wraps skeletons so screen readers hear one "Loading" message. */
export function Loading({ children, label = "Loading" }: { children: ReactNode; label?: string }) {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">{label}</span>
      {children}
    </div>
  );
}
