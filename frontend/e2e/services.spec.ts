import { expect, test } from "@playwright/test";
import { servicePath, services } from "../app/content/services";
import { tabTo } from "./helpers";

const service = services.find((candidate) => candidate.slug === "behandlungspflege") ?? services[0];
if (!service) {
  throw new Error("No services defined");
}

test.describe("Service pages", () => {
  test("the overview links to every service page", async ({ page }) => {
    await page.goto("/leistungen");

    for (const { name, slug } of services) {
      await expect(page.getByRole("main").getByRole("link", { name }).first()).toHaveAttribute(
        "href",
        `/leistungen/${slug}`,
      );
    }
  });

  test("loads the service photos from our own server only", async ({ page, baseURL }) => {
    const foreignRequests: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).origin !== baseURL && !request.url().startsWith("data:")) {
        foreignRequests.push(request.url());
      }
    });
    await page.goto("/leistungen");

    const photo = page.getByRole("img", { name: services[0]?.photoAlt });
    await photo.scrollIntoViewIfNeeded();
    await expect(photo).toHaveJSProperty("complete", true);
    expect(await photo.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
    await page.waitForLoadState("networkidle");
    expect(foreignRequests).toEqual([]);
  });

  test("the jump list leads to its section", async ({ page }) => {
    await page.goto(servicePath(service));

    await page
      .getByRole("navigation", { name: "Auf dieser Seite" })
      .getByRole("link", { name: "Wer die Kosten trägt" })
      .click();

    await expect(page).toHaveURL(/#kosten$/);
    await expect(page.getByRole("heading", { name: "Wer die Kosten trägt" })).toBeInViewport();
  });

  test("breadcrumbs lead back to the overview", async ({ page }) => {
    await page.goto(servicePath(service));

    await page.getByRole("navigation", { name: "Sie sind hier" }).getByRole("link", { name: "Leistungen" }).click();

    await expect(page).toHaveURL(/\/leistungen$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Leistungen");
  });

  test("reaches the call action with the keyboard only", async ({ page }) => {
    await page.goto(servicePath(service));
    const call = page
      .getByRole("region", { name: `Sprechen Sie mit uns über ${service.name}` })
      .getByRole("link", { name: /anrufen$/ });

    await tabTo(page, () => call.evaluate((element) => element === document.activeElement), 40);

    await expect(call).toBeFocused();
    await expect(call).toHaveAttribute("href", /^tel:/);
  });
});
