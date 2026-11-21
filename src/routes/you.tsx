import { createFileRoute } from "@tanstack/react-router";
import { CircleUser } from "lucide-react";

import { TabScreen } from "@/components/app/tab-screen";
import { EmptyState, showToast } from "@/components/obo";

export const Route = createFileRoute("/you")({
  head: () => ({
    meta: [
      { title: "You — One by One" },
      { name: "description", content: "Your profile and settings on One by One." },
      { property: "og:title", content: "You — One by One" },
      { property: "og:description", content: "Your profile and settings on One by One." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: YouPage,
});

function YouPage() {
  return (
    <TabScreen tab="you" title="You">
      <EmptyState
        icon={CircleUser}
        message="Add a photo and a few words about you, so people know who they're saying Hello to."
        actionLabel="Set up your profile"
        onAction={() => showToast("Profile setup is coming soon.")}
      />
    </TabScreen>
  );
}
