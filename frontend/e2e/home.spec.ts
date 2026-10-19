import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test.describe("Home page", () => {
  test("has no detectable accessibility violations", async ({ page }) => {
    await page.goto("/");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
      .analyze();

    expect(results.violations).toEqual([]);
  });

  test("declares German and has exactly one h1", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("html")).toHaveAttribute("lang", "de");
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
  });

  test("is prerendered and works without JavaScript", async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage();
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await context.close();
  });

  test("does not scroll horizontally", async ({ page }) => {
    await page.goto("/");

    await expectNoHorizontalScroll(page);
  });

  test("does not scroll horizontally at 200 % zoom", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Zoom is simulated from the 1280 px viewport");

    // 200 % zoom on a 1280 px wide window leaves a 640 CSS px wide viewport.
    await page.setViewportSize({ width: 640, height: 400 });
    await page.goto("/");

    await expectNoHorizontalScroll(page);
  });
});
