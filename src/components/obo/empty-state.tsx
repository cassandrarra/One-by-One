import type { LucideIcon } from "lucide-react";

import { SecondaryButton } from "./button";

type EmptyStateProps = {
  icon: LucideIcon;
  message: string;
  actionLabel: string;
  onAction: () => void;
};

/** Icon, one sentence, one action. Also used for error states. */
export function EmptyState({ icon: Icon, message, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-primary-tint text-text">
        <Icon aria-hidden className="size-7" />
      </span>
      <p className="max-w-80 text-text type-body">{message}</p>
      <SecondaryButton onClick={onAction}>{actionLabel}</SecondaryButton>
    </div>
  );
}
