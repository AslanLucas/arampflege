import AxeBuilder from "@axe-core/playwright";
import { expect, type Page } from "@playwright/test";

export async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

/** Runs axe on the page, or only inside `include` (a CSS selector) when given. */
export async function expectNoAxeViolations(page: Page, include?: string) {
  let builder = new AxeBuilder({ page }).withTags([
    "wcag2a",
    "wcag2aa",
    "wcag21a",
    "wcag21aa",
    "wcag22aa",
    "best-practice",
  ]);
  if (include) {
    builder = builder.include(include);
  }
  const results = await builder.analyze();
  expect(results.violations).toEqual([]);
}

/** Presses Tab until `target` has focus, so only the keyboard is used to reach it. */
export async function tabTo(page: Page, isTarget: () => Promise<boolean>, maxPresses = 30) {
  for (let press = 0; press < maxPresses; press++) {
    await page.keyboard.press("Tab");
    if (await isTarget()) {
      return;
    }
  }
  throw new Error(`Target not reached after ${String(maxPresses)} Tab presses`);
}

/** The menu button only exists below the 960 px breakpoint. */
export function isCompact(page: Page) {
  return (page.viewportSize()?.width ?? 0) < 960;
}
