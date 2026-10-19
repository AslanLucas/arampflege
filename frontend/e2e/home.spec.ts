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

  test("loads nothing from third parties", async ({ page, baseURL }) => {
    const foreignRequests: string[] = [];
    page.on("request", (request) => {
      const { origin } = new URL(request.url());
      if (origin !== baseURL && !request.url().startsWith("data:")) {
        foreignRequests.push(request.url());
      }
    });

    await page.goto("/");
    await page.waitForLoadState("networkidle");

    expect(foreignRequests).toEqual([]);
  });

  test("uses the self-hosted fonts", async ({ page, request }) => {
    await page.goto("/");

    const families = await page.evaluate(async () => {
      await document.fonts.ready;
      const heading = document.querySelector("h1");
      return {
        body: getComputedStyle(document.body).fontFamily,
        heading: heading ? getComputedStyle(heading).fontFamily : "",
        headingLoaded: document.fonts.check('600 1rem "Source Serif 4"'),
      };
    });
    expect(families.body).toMatch(/^"Atkinson Hyperlegible Next"/);
    expect(families.heading).toMatch(/^"Source Serif 4"/);
    expect(families.headingLoaded).toBe(true);

    for (const file of [
      "atkinson-hyperlegible-next-latin-400-normal",
      "atkinson-hyperlegible-next-latin-400-italic",
      "atkinson-hyperlegible-next-latin-600-normal",
      "source-serif-4-latin-600-normal",
    ]) {
      const response = await request.get(`/fonts/${file}.woff2`);
      expect(response.status(), file).toBe(200);
      expect(response.headers()["content-type"], file).toBe("font/woff2");
    }
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
