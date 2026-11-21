import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { HeartHandshake } from "lucide-react";

import { TabScreen } from "@/components/app/tab-screen";
import { EmptyState } from "@/components/obo";

export const Route = createFileRoute("/connections")({
  head: () => ({
    meta: [
      { title: "Connections — One by One" },
      { name: "description", content: "The people you've agreed to say Hello to, all in one place." },
      { property: "og:title", content: "Connections — One by One" },
      { property: "og:description", content: "The people you've agreed to say Hello to, all in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ConnectionsPage,
});

function ConnectionsPage() {
  const navigate = useNavigate();
  return (
    <TabScreen tab="connections" title="Connections">
      <EmptyState
        icon={HeartHandshake}
        message="No connections yet. When you and someone both want to say Hello, they'll show up here."
        actionLabel="Go to Home"
        onAction={() => navigate({ to: "/home" })}
      />
    </TabScreen>
  );
}
