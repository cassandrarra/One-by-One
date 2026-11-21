import type { ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";

import { ScreenLayout, TabBar, type TabKey } from "@/components/obo";

const TAB_PATHS = {
  home: "/home",
  connections: "/connections",
  community: "/community",
  you: "/you",
} as const satisfies Record<TabKey, string>;

/** A main page with its title and the bottom tab bar. */
export function TabScreen({ tab, title, children }: { tab: TabKey; title: string; children: ReactNode }) {
  const navigate = useNavigate();
  return (
    <ScreenLayout
      title={title}
      tabBar={<TabBar active={tab} onSelect={(key) => navigate({ to: TAB_PATHS[key] })} />}
    >
      {children}
    </ScreenLayout>
  );
}
