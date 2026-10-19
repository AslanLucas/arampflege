import { expect, test } from "@playwright/test";
import { callbackLink, legalNavigation, mainNavigation } from "../app/content/navigation";
import { expectNoAxeViolations, expectNoHorizontalScroll, isCompact, tabTo } from "./helpers";

const pages = [
  "/",
  ...mainNavigation.map((item) => item.to),
  callbackLink.to,
  ...legalNavigation.map((item) => item.to),
];

for (const path of pages) {
  test(`${path} is accessible, has one h1 and does not scroll horizontally`, async ({ page }, testInfo) => {
    await page.goto(path);

    await expectNoAxeViolations(page);
    await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
    await expectNoHorizontalScroll(page);

    if (testInfo.project.name === "desktop") {
      // 200 % zoom on a 1280 px wide window leaves a 640 CSS px wide viewport.
      await page.setViewportSize({ width: 640, height: 400 });
      await expectNoHorizontalScroll(page);
    }
  });
}

test("unknown pages show a 404 message with a way back", async ({ page }) => {
  const response = await page.goto("/gibt-es-nicht");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Diese Seite gibt es nicht.");
  await expect(page.getByRole("main").getByRole("link", { name: "Zur Startseite" })).toBeVisible();
  await expectNoAxeViolations(page);
});

test.describe("Header", () => {
  test("shows the phone number without scrolling", async ({ page }) => {
    await page.goto("/");

    const phone = page.getByRole("banner").getByRole("link", { name: /anrufen$/ });
    await expect(phone).toBeInViewport();
    await expect(phone).toHaveAttribute("href", /^tel:/);
  });

  test("offers a skip link as the first focusable element", async ({ page }) => {
    await page.goto("/kontakt");
    await page.keyboard.press("Tab");

    const skipLink = page.getByRole("link", { name: "Zum Inhalt springen" });
    await expect(skipLink).toBeFocused();
    await expect(skipLink).toBeVisible();

    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#inhalt$/);
  });

  test("marks the current page in the navigation", async ({ page }) => {
    await page.goto("/karriere");

    await expect(
      page
        .getByRole("navigation", { name: "Hauptnavigation", includeHidden: true })
        .getByRole("link", { name: "Karriere", includeHidden: true }),
    ).toHaveAttribute("aria-current", "page");
  });

  test("shows the navigation directly on wide screens", async ({ page }) => {
    test.skip(isCompact(page), "Wide screens only");
    await page.goto("/");

    await expect(page.getByRole("button", { name: "Menü" })).toBeHidden();
    await expect(
      page.getByRole("navigation", { name: "Hauptnavigation" }).getByRole("link", { name: "Leistungen" }),
    ).toBeVisible();
  });

  test("menu works with the keyboard only", async ({ page }) => {
    test.skip(!isCompact(page), "Menu button exists below 960 px only");
    await page.goto("/");
    const menuButton = page.getByRole("button", { name: "Menü" });
    const navigation = page.getByRole("navigation", { name: "Hauptnavigation" });

    await expect(navigation.getByRole("link", { name: "Leistungen" })).toBeHidden();
    await tabTo(page, () => menuButton.evaluate((element) => element === document.activeElement));

    await page.keyboard.press("Enter");
    await expect(menuButton).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Tab");
    await expect(navigation.getByRole("link", { name: "Leistungen" })).toBeFocused();

    await page.keyboard.press("Escape");
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
    await expect(menuButton).toBeFocused();

    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/\/leistungen$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Leistungen");
    await expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  test("without JavaScript the menu leads to the footer navigation", async ({ browser, baseURL }) => {
    const context = await browser.newContext({
      javaScriptEnabled: false,
      baseURL,
      viewport: { width: 360, height: 740 },
    });
    const page = await context.newPage();
    await page.goto("/");

    await expect(page.getByRole("link", { name: "Menü" })).toHaveAttribute("href", "#seitennavigation");
    await expect(
      page.getByRole("navigation", { name: "Seiten" }).getByRole("link", { name: "Kontakt" }),
    ).toBeAttached();
    await context.close();
  });
});

test.describe("Mobile contact bar", () => {
  test("offers call and callback on small screens without covering the page end", async ({ page }) => {
    test.skip(!isCompact(page), "Contact bar exists below 960 px only");
    await page.goto("/");
    const bar = page.getByRole("complementary", { name: "Schnellkontakt" });

    await expect(bar.getByRole("link", { name: "Anrufen" })).toHaveAttribute("href", /^tel:/);
    await expect(bar.getByRole("link", { name: "Rückruf anfordern" })).toHaveAttribute("href", "/rueckruf");

    await page.evaluate(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    });
    const lastFooterLink = page.getByRole("contentinfo").getByRole("link").last();
    const linkBox = await lastFooterLink.boundingBox();
    const barBox = await bar.boundingBox();
    expect(linkBox && barBox && linkBox.y + linkBox.height <= barBox.y).toBe(true);
  });

  test("is hidden on wide screens", async ({ page }) => {
    test.skip(isCompact(page), "Wide screens only");
    await page.goto("/");

    await expect(page.getByRole("complementary", { name: "Schnellkontakt" })).toBeHidden();
  });
});
