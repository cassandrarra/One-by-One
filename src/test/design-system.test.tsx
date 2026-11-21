import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { describe, expect, it, vi } from "vitest";

import { routeTree } from "@/routeTree.gen";

const toastCustom = vi.fn();
vi.mock("sonner", () => ({ toast: { custom: (...args: unknown[]) => toastCustom(...args) }, Toaster: () => null }));

const HEX = /#[0-9a-fA-F]{3,8}\b/;

function filesIn(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? filesIn(full) : /\.(tsx?|css)$/.test(entry.name) ? [full] : [];
  });
}

describe("One by One design system", () => {
  it("has no hex color codes in shared component files", () => {
    const files = filesIn(path.resolve(__dirname, "../components/obo"));
    expect(files.length).toBeGreaterThan(0);
    const offenders = files.filter((f) => HEX.test(readFileSync(f, "utf8")));
    expect(offenders).toEqual([]);
  });

  it("has no hex color codes in the preview page", () => {
    const src = readFileSync(path.resolve(__dirname, "../routes/preview.tsx"), "utf8");
    expect(HEX.test(src)).toBe(false);
  });

  it("defines the primary color once, in the theme file", () => {
    const css = readFileSync(path.resolve(__dirname, "../styles.css"), "utf8");
    expect(css.match(/--primary:\s*#b8412e;/gi)).toHaveLength(1);
  });

  it("dismisses toasts after 3 seconds", async () => {
    const { showToast } = await import("@/components/obo/toast");
    showToast("Saved.");
    expect(toastCustom).toHaveBeenCalledWith(expect.any(Function), { duration: 3000 });
  });

  it("serves the /preview page", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });
    expect(router.matchRoutes("/preview").at(-1)?.routeId).toBe("/preview");
  });
});
