import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One by One" },
      { name: "description", content: "A simple page that says one by one." },
      { property: "og:title", content: "One by One" },
      { property: "og:description", content: "A simple page that says one by one." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background">
      <h1 className="text-2xl text-foreground">one by one</h1>
    </main>
  );
}
