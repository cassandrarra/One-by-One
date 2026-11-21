import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { TabScreen } from "@/components/app/tab-screen";
import { EmptyState } from "@/components/obo";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Home — One by One" },
      { name: "description", content: "See the people One by One has found for you nearby." },
      { property: "og:title", content: "Home — One by One" },
      { property: "og:description", content: "See the people One by One has found for you nearby." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const navigate = useNavigate();
  return (
    <TabScreen tab="home" title="hi,">
      <p className="type-body text-text-muted">Good to see you.</p>
      <EmptyState
        icon={Sparkles}
        message={"We're looking for people near you.\u00a0\nWe'll let you know when someone is ready to say Hello."}
        actionLabel="Tell us about you"
        onAction={() => navigate({ to: "/you" })}
      />
    </TabScreen>
  );
}
