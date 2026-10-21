import { expect, test } from "@playwright/test";
import { expectNoHorizontalScroll, tabTo } from "./helpers";

test.describe("Home page", () => {
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
        headingLoaded: document.fonts.check('500 1rem "Plus Jakarta Sans"'),
      };
    });
    expect(families.body).toMatch(/^"Atkinson Hyperlegible Next"/);
    expect(families.heading).toMatch(/^"Plus Jakarta Sans"/);
    expect(families.headingLoaded).toBe(true);

    for (const file of [
      "atkinson-hyperlegible-next-latin-400-normal",
      "atkinson-hyperlegible-next-latin-600-normal",
      "plus-jakarta-sans-latin-500-normal",
      "plus-jakarta-sans-latin-700-normal",
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

  test("shows the statement and the call action without scrolling", async ({ page }) => {
    await page.goto("/");

    const heading = page.getByRole("heading", { level: 1 });
    const call = page.getByRole("main").getByRole("link", { name: /anrufen$/ }).first();
    await expect(heading).toBeInViewport({ ratio: 1 });
    await expect(call).toBeInViewport({ ratio: 1 });

    const contactBar = page.getByRole("complementary", { name: "Schnellkontakt" });
    if (await contactBar.isVisible()) {
      const callBox = await call.boundingBox();
      const barBox = await contactBar.boundingBox();
      expect(callBox && barBox && callBox.y + callBox.height <= barBox.y).toBe(true);
    }
  });

  test("reaches the main action with the keyboard only", async ({ page }) => {
    await page.goto("/");
    const call = page.getByRole("main").getByRole("link", { name: /anrufen$/ }).first();

    await tabTo(page, () => call.evaluate((element) => element === document.activeElement));

    await expect(call).toBeFocused();
    await expect(call).toHaveAttribute("href", /^tel:/);
  });
});
