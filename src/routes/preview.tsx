import { useEffect, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarHeart, CloudOff } from "lucide-react";

import {
  Avatar,
  BottomSheet,
  Card,
  Chip,
  EmptyState,
  Loading,
  PinnedFooter,
  PrimaryButton,
  ProgressBar,
  ScreenLayout,
  SecondaryButton,
  Skeleton,
  TabBar,
  TappableCard,
  TextInput,
  ToastMessage,
  showToast,
  type TabKey,
} from "@/components/obo";

export const Route = createFileRoute("/preview")({
  head: () => ({
    meta: [
      { title: "Design preview — One by One" },
      { name: "description", content: "Internal preview of the One by One colors, type and components." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Design preview — One by One" },
      { property: "og:description", content: "Internal preview of the One by One colors, type and components." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PreviewPage,
});

const SWATCHES = [
  { token: "text", className: "bg-text", note: "Main text" },
  { token: "text-muted", className: "bg-text-muted", note: "Helper text" },
  { token: "background", className: "bg-background", note: "Screen background" },
  { token: "surface", className: "bg-surface", note: "Cards, sheets, fields" },
  { token: "border", className: "bg-border", note: "Borders, skeletons" },
  { token: "primary", className: "bg-primary", note: "Main actions" },
  { token: "primary-pressed", className: "bg-primary-pressed", note: "Pressed main action" },
  { token: "primary-tint", className: "bg-primary-tint", note: "Selected chips" },
  { token: "accent", className: "bg-accent", note: "Illustrations only" },
  { token: "secondary", className: "bg-secondary", note: "Supporting color" },
  { token: "success-tint", className: "bg-success-tint", note: "Good news" },
  { token: "highlight-tint", className: "bg-highlight-tint", note: "Highlights" },
  { token: "error", className: "bg-error", note: "Errors" },
] as const;

const TYPE_STYLES = [
  { name: "display", className: "type-display", spec: "Fraunces 2rem / 2.5rem, 600" },
  { name: "h1", className: "type-h1", spec: "Fraunces 1.625rem / 2rem, 600" },
  { name: "h2", className: "type-h2", spec: "Inter 1.25rem / 1.75rem, 600" },
  { name: "body", className: "type-body", spec: "Inter 1rem / 1.5rem, 400" },
  { name: "body-strong", className: "type-body-strong", spec: "Inter 1rem / 1.5rem, 600" },
  { name: "small", className: "type-small", spec: "Inter 0.875rem / 1.25rem, 400" },
] as const;

const SPACING = [
  { px: 4, className: "w-1" },
  { px: 8, className: "w-2" },
  { px: 12, className: "w-3" },
  { px: 16, className: "w-4" },
  { px: 24, className: "w-6" },
  { px: 32, className: "w-8" },
  { px: 48, className: "w-12" },
] as const;

const PHOTO =
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=192&h=192&fit=crop&q=80";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-4 border-t border-border pt-8">
      <h2 className="type-h2">{title}</h2>
      {children}
    </section>
  );
}

function StateLabel({ children }: { children: ReactNode }) {
  return <p className="text-text-muted type-small">{children}</p>;
}

function Swatch({ token, className, note }: (typeof SWATCHES)[number]) {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim());
  }, [token]);
  return (
    <li className="flex items-center gap-3">
      <span aria-hidden className={`size-12 shrink-0 rounded-input border border-border ${className}`} />
      <span className="min-w-0">
        <span className="block type-body-strong">{token}</span>
        <span className="block text-text-muted type-small">
          {note}
          {value ? ` · ${value}` : ""}
        </span>
      </span>
    </li>
  );
}

function PreviewPage() {
  const [interests, setInterests] = useState<string[]>(["Morning walks"]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [spot, setSpot] = useState("Corner café");
  const [tab, setTab] = useState<TabKey>("home");

  const toggle = (label: string) =>
    setInterests((prev) => (prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]));

  return (
    <ScreenLayout
      title="Design preview"
      onBack={() => window.history.back()}
      className="flex flex-col gap-8"
    >
      <p className="text-text-muted type-body">
        Every shared piece of One by One, in each of its states. This page isn't linked anywhere.
      </p>

      <Section title="Colors">
        <ul className="flex flex-col gap-3">
          {SWATCHES.map((s) => (
            <Swatch key={s.token} {...s} />
          ))}
        </ul>
      </Section>

      <Section title="Type scale">
        <div className="flex flex-col gap-4">
          {TYPE_STYLES.map((t) => (
            <div key={t.name}>
              <p className={t.className}>Say hello, one by one</p>
              <StateLabel>
                {t.name} · {t.spec}
              </StateLabel>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Spacing and shape">
        <ul className="flex flex-col gap-2">
          {SPACING.map((s) => (
            <li key={s.px} className="flex items-center gap-3">
              <span aria-hidden className={`h-4 rounded-sm bg-primary-tint ${s.className}`} />
              <span className="type-small">{s.px}px</span>
            </li>
          ))}
        </ul>
        <StateLabel>Screen side padding 20px · inputs 12px radius · cards and sheets 16px · buttons and chips fully rounded</StateLabel>
      </Section>

      <Section title="Primary button">
        <StateLabel>Default</StateLabel>
        <PrimaryButton onClick={() => showToast("You tapped the primary button.")}>Plan a Hello</PrimaryButton>
        <StateLabel>Pressed</StateLabel>
        <PrimaryButton data-pressed="">Plan a Hello</PrimaryButton>
        <StateLabel>Keyboard focus</StateLabel>
        <PrimaryButton data-focus="">Plan a Hello</PrimaryButton>
        <StateLabel>Disabled</StateLabel>
        <PrimaryButton disabled>Plan a Hello</PrimaryButton>
      </Section>

      <Section title="Secondary button">
        <StateLabel>Default</StateLabel>
        <SecondaryButton>Maybe later</SecondaryButton>
        <StateLabel>Pressed</StateLabel>
        <SecondaryButton data-pressed="">Maybe later</SecondaryButton>
        <StateLabel>Keyboard focus</StateLabel>
        <SecondaryButton data-focus="">Maybe later</SecondaryButton>
        <StateLabel>Disabled</StateLabel>
        <SecondaryButton disabled>Maybe later</SecondaryButton>
      </Section>

      <Section title="Pinned footer">
        <StateLabel>Shown in place here; on real screens it sticks to the bottom.</StateLabel>
        <div className="overflow-hidden rounded-card border border-border">
          <div className="bg-background p-5 text-text-muted type-small">Screen content…</div>
          <PinnedFooter pinned={false}>
            <PrimaryButton>Continue</PrimaryButton>
          </PinnedFooter>
        </div>
      </Section>

      <Section title="Chips">
        <StateLabel>Try it — tap to choose</StateLabel>
        <div className="flex flex-wrap gap-2">
          {["Morning walks", "Book club", "Gardening", "New to town"].map((label) => (
            <Chip key={label} label={label} selected={interests.includes(label)} onClick={() => toggle(label)} />
          ))}
          <Chip
            label="Going through a divorce"
            sensitive
            selected={interests.includes("Going through a divorce")}
            onClick={() => toggle("Going through a divorce")}
          />
        </div>
        <StateLabel>Not selected: default, pressed, focus, disabled</StateLabel>
        <div className="flex flex-wrap gap-2">
          <Chip label="Gardening" />
          <Chip label="Gardening" data-pressed="" />
          <Chip label="Gardening" data-focus="" />
          <Chip label="Gardening" disabled />
        </div>
        <StateLabel>Selected: default, pressed, focus, disabled</StateLabel>
        <div className="flex flex-wrap gap-2">
          <Chip label="Gardening" selected />
          <Chip label="Gardening" selected data-pressed="" />
          <Chip label="Gardening" selected data-focus="" />
          <Chip label="Gardening" selected disabled />
        </div>
        <StateLabel>Private (lock): not selected, selected, focus, disabled</StateLabel>
        <div className="flex flex-wrap gap-2">
          <Chip label="Caring for a parent" sensitive />
          <Chip label="Caring for a parent" sensitive selected />
          <Chip label="Caring for a parent" sensitive data-focus="" />
          <Chip label="Caring for a parent" sensitive disabled />
        </div>
      </Section>

      <Section title="Cards">
        <StateLabel>Plain card</StateLabel>
        <Card>
          <p className="type-body-strong">Your next Hello</p>
          <p className="text-text-muted type-body">Thursday at the library garden</p>
        </Card>
        {(["Default", "Pressed", "Keyboard focus", "Disabled"] as const).map((state) => (
          <div key={state} className="flex flex-col gap-2">
            <StateLabel>Tappable · {state.toLowerCase()}</StateLabel>
            <TappableCard
              disabled={state === "Disabled"}
              {...(state === "Pressed" ? { "data-pressed": "" } : {})}
              {...(state === "Keyboard focus" ? { "data-focus": "" } : {})}
            >
              <span className="flex items-center gap-3">
                <Avatar name="Maren" size={40} />
                <span className="min-w-0">
                  <span className="block type-body-strong">Maren</span>
                  <span className="block text-text-muted type-small">Loves morning walks and mysteries</span>
                </span>
              </span>
            </TappableCard>
          </div>
        ))}
      </Section>

      <Section title="Text input">
        <TextInput label="First name" placeholder="Your first name" />
        <TextInput
          label="Neighborhood"
          defaultValue="Riverside"
          helperText="Only the general area is shown to others."
        />
        <TextInput label="Keyboard focus" data-focus="" defaultValue="Showing the focus outline" />
        <TextInput label="Email" defaultValue="maren@" error="Please add the full email address." />
        <TextInput label="Disabled" disabled defaultValue="Can't be changed" />
      </Section>

      <Section title="Avatar">
        <StateLabel>Initial (no photo): 40, 64, 96</StateLabel>
        <div className="flex flex-wrap items-end gap-4">
          <Avatar name="Maren" size={40} />
          <Avatar name="Maren" size={64} />
          <Avatar name="Maren" size={96} />
        </div>
        <StateLabel>With photo: 40, 64, 96</StateLabel>
        <div className="flex flex-wrap items-end gap-4">
          <Avatar name="Dana" src={PHOTO} size={40} />
          <Avatar name="Dana" src={PHOTO} size={64} />
          <Avatar name="Dana" src={PHOTO} size={96} />
        </div>
      </Section>

      <Section title="Bottom sheet">
        <StateLabel>Swipe down, tap outside, or press Escape to close.</StateLabel>
        <SecondaryButton onClick={() => setSheetOpen(true)}>Open the sheet</SecondaryButton>
        <BottomSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          title="Pick a spot for your Hello"
          description="All spots are public and easy to find."
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap gap-2">
              {["Corner café", "Library garden", "Farmers market"].map((label) => (
                <Chip key={label} label={label} selected={spot === label} onClick={() => setSpot(label)} />
              ))}
            </div>
            <PrimaryButton
              onClick={() => {
                setSheetOpen(false);
                showToast(`${spot} it is.`);
              }}
            >
              Choose this spot
            </PrimaryButton>
          </div>
        </BottomSheet>
      </Section>

      <Section title="Toast">
        <StateLabel>How it looks</StateLabel>
        <ToastMessage message="Saved. You can change this anytime." />
        <StateLabel>Shows at the bottom and goes away after 3 seconds.</StateLabel>
        <SecondaryButton onClick={() => showToast("Saved. You can change this anytime.")}>
          Show a toast
        </SecondaryButton>
      </Section>

      <Section title="Empty and error states">
        <Card>
          <EmptyState
            icon={CalendarHeart}
            message="You don't have any Hellos planned yet."
            actionLabel="See who's nearby"
            onAction={() => showToast("This will open the people nearby.")}
          />
        </Card>
        <Card>
          <EmptyState
            icon={CloudOff}
            message="This didn't load. It's not you — let's try again."
            actionLabel="Try again"
            onAction={() => showToast("Trying again…")}
          />
        </Card>
      </Section>

      <Section title="Skeleton">
        <StateLabel>Shimmer stops when reduced motion is on.</StateLabel>
        <Loading>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Skeleton shape="circle" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="w-2/3" />
                <Skeleton className="w-1/2" />
              </div>
            </div>
            <Skeleton shape="block" />
          </div>
        </Loading>
      </Section>

      <Section title="Progress bar">
        <StateLabel>Step 1 of 4</StateLabel>
        <ProgressBar value={1} max={4} label="Step 1 of 4" />
        <StateLabel>Step 3 of 4</StateLabel>
        <ProgressBar value={3} max={4} label="Step 3 of 4" />
        <StateLabel>Done</StateLabel>
        <ProgressBar value={4} max={4} label="All steps done" />
      </Section>

      <Section title="Tab bar">
        <StateLabel>Try it — tap a tab</StateLabel>
        <div className="rounded-card border border-border bg-surface p-1">
          <TabBar active={tab} onSelect={setTab} />
        </div>
        <StateLabel>Pressed (Community) and keyboard focus (You)</StateLabel>
        <div className="rounded-card border border-border bg-surface p-1">
          <TabBar active="home" onSelect={() => {}} demoState={{ community: "pressed", you: "focus" }} />
        </div>
      </Section>

      <Section title="Screen layout">
        <StateLabel>
          This page is a screen layout: centered column up to 480px, background color, 20px side
          padding, back arrow and title.
        </StateLabel>
      </Section>
    </ScreenLayout>
  );
}
