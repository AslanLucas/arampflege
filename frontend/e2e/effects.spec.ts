import { expect, test } from "@playwright/test";
import { expectNoAxeViolations, isCompact, tabTo } from "./helpers";

test.describe("Effects with motion allowed", () => {
  test.use({ reducedMotion: "no-preference" });

  test("plays the background video on wide screens and can pause it", async ({ page }) => {
    test.skip(isCompact(page) && (page.viewportSize()?.width ?? 0) < 640, "No video on small screens");
    await page.goto("/");
    const video = page.locator("video");
    await expect(video).toHaveCount(1);
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime)).toBeGreaterThan(0.2);
    expect(await video.evaluate((element: HTMLVideoElement) => element.muted)).toBe(true);

    const toggle = page.getByRole("button", { name: "Video anhalten" });
    await toggle.click();
    await expect(page.getByRole("button", { name: "Video abspielen" })).toBeVisible();
    expect(await video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
    // Only the top area: further down, cards wait invisibly for their scroll fade-in.
    await expectNoAxeViolations(page, "main > div:first-child");
  });

  test("shows only the still image on small screens", async ({ page }) => {
    test.skip((page.viewportSize()?.width ?? 0) >= 640, "Small screens only");
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("video")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Video anhalten" })).toHaveCount(0);
  });

  test("turns a service card when its link receives keyboard focus", async ({ page }) => {
    test.skip(isCompact(page), "Cards turn on wide screens with a mouse");
    await page.goto("/");
    const card = page.locator("#leistungen li").first();
    const link = card.getByRole("link", { name: /Zur Leistung/ });

    await tabTo(page, () => link.evaluate((element) => element === document.activeElement), 60);

    await expect
      .poll(() => card.locator("> div").evaluate((element) => getComputedStyle(element).transform))
      .not.toBe("none");
    await expect(link).toBeFocused();
  });

  test("fades sections in when they scroll into view", async ({ page }) => {
    await page.goto("/");
    const step = page.locator("#ablauf li").first();
    await expect(step).toHaveAttribute("data-reveal", "hidden");

    await step.scrollIntoViewIfNeeded();

    await expect(step).toHaveAttribute("data-reveal", "shown");
  });

  test("highlights a place on the service area map on hover and shows the driving distance", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "desktop", "Hover needs a mouse; small screens use the list below the map");
    await page.goto("/einsatzgebiet");
    const map = page.locator("svg").filter({ has: page.locator("text", { hasText: "Ochtrup" }) });
    const ochtrup = map.locator("path").nth(2);

    await ochtrup.hover();
    await expect(page.getByText("Zeigen Sie auf einen Ort.")).toBeHidden();
    await expect(map.locator("..").getByText(/^ca\. \d+\s?km · ca\. \d+\s?Min\. mit dem Auto$/)).toBeVisible();
    await expect(page.getByRole("button", { name: /^Ochtrup/ })).toHaveAttribute("data-active", "true");
  });

  test("makes the header compact after scrolling", async ({ page }) => {
    await page.goto("/");
    const header = page.getByRole("banner");
    await expect(header).toHaveAttribute("data-scrolled", "false");

    await page.mouse.wheel(0, 600);

    await expect(header).toHaveAttribute("data-scrolled", "true");
    await expect(header.getByRole("link", { name: /anrufen$/ })).toBeInViewport();
  });
});

test.describe("Effects with reduced motion", () => {
  test("shows no video and hides no content", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    await expect(page.locator("video")).toHaveCount(0);
    await expect(page.locator("[data-reveal]")).toHaveCount(0);
  });
});
