import { createFileRoute } from "@tanstack/react-router";
import { Coffee, MapPin, Users } from "lucide-react";

import { PinnedFooter, PrimaryButton, ScreenLayout, showToast } from "@/components/obo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "One by One — meet people nearby, in person" },
      {
        name: "description",
        content: "One by One matches you with compatible people nearby and helps you say Hello at a public spot within 30 days.",
      },
      { property: "og:title", content: "One by One — meet people nearby, in person" },
      {
        property: "og:description",
        content: "Find compatible people nearby and say Hello in person, at a public spot, within 30 days.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Welcome,
});

const POINTS = [
  { icon: Users, text: "We match you with a few people nearby who share your stage of life." },
  { icon: MapPin, text: "You say Hello in person, at a public spot you both choose." },
  { icon: Coffee, text: "No pressure. Take it one person at a time, at your own pace." },
];

function Welcome() {
  return (
    <ScreenLayout
      footer={
        <PinnedFooter>
          <PrimaryButton onClick={() => showToast("Sign up is coming soon.")}>Get started</PrimaryButton>
        </PinnedFooter>
      }
    >
      <div className="flex flex-col gap-8 pt-12">
        <div className="flex flex-col gap-3">
          <p className="type-small text-text-muted">One by One</p>
          <h1 className="type-display">New friends, one Hello at a time.</h1>
          <p className="type-body text-text-muted">
            Meet compatible people near you, in person, within 30 days.
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          {POINTS.map(({ icon: Icon, text }) => (
            <li key={text} className="flex items-start gap-3">
              <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-primary-tint text-text">
                <Icon aria-hidden className="size-5" />
              </span>
              <span className="type-body pt-2">{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </ScreenLayout>
  );
}
