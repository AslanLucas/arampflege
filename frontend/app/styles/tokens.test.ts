// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const file = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");
// Only the global defaults; scoped overrides (e.g. on brand surfaces) are checked as their own tokens.
const rootStart = file.indexOf(":root {");
const css = file.slice(rootStart, file.indexOf("\n}", rootStart));

const colors = new Map(
  [...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map(
    ([, name = "", hex = ""]) => [name, hex] as const,
  ),
);

for (const [, name = "", target = ""] of css.matchAll(/--color-([\w-]+):\s*var\(--color-([\w-]+)\)/g)) {
  const hex = colors.get(target);
  if (hex) {
    colors.set(name, hex);
  }
}

function color(name: string): string {
  const hex = colors.get(name);
  if (!hex) {
    throw new Error(`Missing token --color-${name}`);
  }
  return hex;
}

function relativeLuminance(hex: string): number {
  const [r = 0, g = 0, b = 0] = [1, 3, 5].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(foreground: string, background: string): number {
  const [lighter, darker] = [relativeLuminance(color(foreground)), relativeLuminance(color(background))].sort(
    (a, b) => b - a,
  ) as [number, number];
  return (lighter + 0.05) / (darker + 0.05);
}

const light = ["bg", "surface", "surface-alt"];
const brand = ["brand-deep", "brand-darkest"];

// Minimum ratios from docs/DESIGN.md and WCAG 2.2.
const requirements: { purpose: string; foregrounds: string[]; backgrounds: string[]; min: number }[] = [
  { purpose: "body text (AAA)", foregrounds: ["text", "text-muted"], backgrounds: light, min: 7 },
  { purpose: "links in running text (AAA)", foregrounds: ["link", "link-hover"], backgrounds: light, min: 7 },
  { purpose: "brand-coloured text such as numbers (AA)", foregrounds: ["primary"], backgrounds: light, min: 4.5 },
  { purpose: "status messages (AA)", foregrounds: ["error", "success"], backgrounds: light, min: 4.5 },
  {
    purpose: "button label on primary (AA)",
    foregrounds: ["surface", "on-brand"],
    backgrounds: ["primary", "primary-hover"],
    min: 4.5,
  },
  { purpose: "text on dark brand surfaces (AAA)", foregrounds: ["on-brand", "on-brand-muted"], backgrounds: brand, min: 7 },
  { purpose: "inverted button label (AAA)", foregrounds: ["brand-deep"], backgrounds: ["on-brand"], min: 7 },
  {
    purpose: "form borders, focus ring, accent lines (non-text)",
    foregrounds: ["border-strong", "focus", "accent"],
    backgrounds: light,
    min: 3,
  },
  {
    purpose: "focus ring on brand surfaces (non-text)",
    foregrounds: ["focus-on-brand"],
    backgrounds: [...brand, "primary"],
    min: 3,
  },
];

describe("color tokens", () => {
  for (const { purpose, foregrounds, backgrounds: bgs, min } of requirements) {
    for (const foreground of foregrounds) {
      for (const background of bgs) {
        it(`${purpose}: ${foreground} on ${background} reaches ${String(min)} : 1`, () => {
          expect(contrast(foreground, background)).toBeGreaterThanOrEqual(min);
        });
      }
    }
  }
});
