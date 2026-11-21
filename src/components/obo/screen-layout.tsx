import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";

type ScreenLayoutProps = {
  children: ReactNode;
  title?: string;
  /** Shows a back arrow when provided. */
  onBack?: () => void;
  backLabel?: string;
  /** Usually a <PinnedFooter> with the screen's one primary action. */
  footer?: ReactNode;
  /** Usually a <TabBar>. */
  tabBar?: ReactNode;
  className?: string;
};

/** Centered column (max 480px) on the background color, with 20px side padding. */
export function ScreenLayout({
  children,
  title,
  onBack,
  backLabel = "Go back",
  footer,
  tabBar,
  className,
}: ScreenLayoutProps) {
  return (
    <div className="min-h-dvh bg-background text-text">
      <div className="mx-auto flex min-h-dvh w-full max-w-app flex-col">
        {title || onBack ? (
          <header className="flex items-center gap-1 px-[20px] pt-4 pb-2">
            {onBack ? (
              <button
                type="button"
                onClick={onBack}
                aria-label={backLabel}
                className="focus-ring -ml-2.5 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-text pressed:bg-border"
              >
                <ArrowLeft aria-hidden className="size-6" />
              </button>
            ) : null}
            {title ? <h1 className="min-w-0 [overflow-wrap:anywhere] type-h1">{title}</h1> : null}
          </header>
        ) : null}
        <main className={cn("flex-1 px-[20px] pt-2 pb-6", className)}>{children}</main>
        {footer}
        {tabBar ? <div className="sticky bottom-0 z-30">{tabBar}</div> : null}
      </div>
    </div>
  );
}
