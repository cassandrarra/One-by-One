import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Users } from "lucide-react";

import { TabScreen } from "@/components/app/tab-screen";
import { EmptyState } from "@/components/obo";

export const Route = createFileRoute("/community")({
  head: () => ({
    meta: [
      { title: "Community — One by One" },
      { name: "description", content: "Small group Hellos happening near you." },
      { property: "og:title", content: "Community — One by One" },
      { property: "og:description", content: "Small group Hellos happening near you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CommunityPage,
});

function CommunityPage() {
  const navigate = useNavigate();
  return (
    <TabScreen tab="community" title="Community">
      <EmptyState
        icon={Users}
        message="Small group Hellos near you will show up here. Nothing planned just yet."
        actionLabel="Go to Home"
        onAction={() => navigate({ to: "/home" })}
      />
    </TabScreen>
  );
}
