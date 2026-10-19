// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("./tokens.css", import.meta.url), "utf8");

const colors = new Map(
  [...css.matchAll(/--color-([\w-]+):\s*(#[0-9a-f]{6})/gi)].map(
    ([, name = "", hex = ""]) => [name, hex] as const,
  ),
);

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

const backgrounds = ["bg", "surface", "surface-alt"];

// Minimum ratios from docs/DESIGN.md and WCAG 2.2.
const requirements: { purpose: string; foregrounds: string[]; backgrounds: string[]; min: number }[] = [
  { purpose: "body text (AAA)", foregrounds: ["text", "text-muted"], backgrounds, min: 7 },
  { purpose: "links (AA)", foregrounds: ["primary", "primary-hover"], backgrounds, min: 4.5 },
  { purpose: "status messages (AA)", foregrounds: ["error", "success"], backgrounds, min: 4.5 },
  {
    purpose: "button label on primary (AA)",
    foregrounds: ["surface"],
    backgrounds: ["primary", "primary-hover"],
    min: 4.5,
  },
  {
    purpose: "form borders, focus ring, accent lines (non-text)",
    foregrounds: ["border-strong", "focus", "accent"],
    backgrounds,
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
