import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PinnedFooterProps = {
  children: ReactNode;
  /** Sticks to the bottom of the screen. Set false to show it in place (e.g. on /preview). */
  pinned?: boolean;
  className?: string;
};

/** Holds the screen's one primary action, pinned to the bottom with safe-area padding. */
export function PinnedFooter({ children, pinned = true, className }: PinnedFooterProps) {
  return (
    <div
      className={cn(
        pinned && "sticky bottom-0 z-30",
        "w-full bg-background px-[20px] pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-soft",
        className,
      )}
    >
      {children}
    </div>
  );
}
