import { CircleUser, HeartHandshake, Home, Users, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type TabKey = "home" | "connections" | "community" | "you";

export const TABS: ReadonlyArray<{ key: TabKey; label: string; icon: LucideIcon }> = [
  { key: "home", label: "Home", icon: Home },
  { key: "connections", label: "Connections", icon: HeartHandshake },
  { key: "community", label: "Community", icon: Users },
  { key: "you", label: "You", icon: CircleUser },
];

type TabBarProps = {
  active: TabKey;
  onSelect: (key: TabKey) => void;
  /** Preview only: force a tab to look pressed or focused. */
  demoState?: Partial<Record<TabKey, "pressed" | "focus">>;
  className?: string;
};

export function TabBar({ active, onSelect, demoState, className }: TabBarProps) {
  return (
    <nav
      aria-label="Main"
      className={cn(
        "w-full border-t border-border bg-surface pb-[env(safe-area-inset-bottom)]",
        className,
      )}
    >
      <ul className="flex">
        {TABS.map(({ key, label, icon: Icon }) => {
          const isActive = key === active;
          const forced = demoState?.[key];
          return (
            <li key={key} className="min-w-0 flex-1">
              <button
                type="button"
                onClick={() => onSelect(key)}
                aria-current={isActive ? "page" : undefined}
                data-pressed={forced === "pressed" ? "" : undefined}
                data-focus={forced === "focus" ? "" : undefined}
                className={cn(
                  "focus-ring flex min-h-14 [--focus-offset:-4px] w-full flex-col items-center justify-center gap-1 rounded-md px-0.5 py-2 text-center type-small transition-colors",
                  isActive
                    ? "font-semibold text-primary pressed:text-primary-pressed"
                    : "text-text-muted pressed:text-text",
                )}
              >
                <Icon aria-hidden className="size-6 shrink-0" strokeWidth={isActive ? 2.25 : 1.75} />
                <span className="max-w-full hyphens-auto [overflow-wrap:anywhere]">{label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
