import { expect, test, type Page } from "@playwright/test";
import { expectNoAxeViolations, tabTo } from "./helpers";

type Captured = { body: unknown };

async function mockFormApi(page: Page, path: string, status = 201, response?: unknown): Promise<Captured> {
  const captured: Captured = { body: undefined };
  await page.route("**/api/form-tokens", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "e2e-token" }) }),
  );
  await page.route(`**${path}`, async (route) => {
    captured.body = route.request().postDataJSON();
    await route.fulfill({
      status,
      contentType: "application/problem+json",
      body: response === undefined ? "" : JSON.stringify(response),
    });
  });
  return captured;
}

async function focused(page: Page, locator: ReturnType<Page["getByLabel"]>) {
  await tabTo(page, () => locator.evaluate((element) => element === document.activeElement), 40);
}

test.describe("Contact form", () => {
  test("can be filled in and sent with the keyboard only", async ({ page }) => {
    const captured = await mockFormApi(page, "/api/contact-requests");
    await page.goto("/kontakt");
    await page.waitForLoadState("networkidle");

    await focused(page, page.getByLabel(/Ihr Name/));
    await page.keyboard.type("Erika Muster");
    await focused(page, page.getByLabel(/Telefonnummer/));
    await page.keyboard.type("0521 123456");
    await focused(page, page.getByLabel(/Ihre Nachricht/));
    await page.keyboard.type("Wir brauchen Hilfe bei der Grundpflege.");
    await focused(page, page.getByRole("checkbox"));
    await page.keyboard.press("Space");
    await expect(page.getByRole("checkbox")).toBeChecked();
    await focused(page, page.getByRole("button", { name: "Nachricht senden" }));
    await page.keyboard.press("Enter");

    await expect(page.getByRole("heading", { name: "Danke, wir haben Ihre Nachricht erhalten" })).toBeFocused();
    expect(captured.body).toMatchObject({
      name: "Erika Muster",
      phone: "0521 123456",
      consent: true,
      website: "",
      formToken: "e2e-token",
    });
    await expectNoAxeViolations(page);
  });

  test("shows an accessible error summary that leads to the fields", async ({ page }) => {
    await mockFormApi(page, "/api/contact-requests");
    await page.goto("/kontakt");
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "Nachricht senden" }).click();

    await expect(page.getByRole("heading", { name: "Bitte prüfen Sie Ihre Angaben" })).toBeVisible();
    await expect(page.locator(":focus")).toContainText("Bitte prüfen Sie Ihre Angaben");
    await expect(page.getByLabel(/Ihr Name/)).toHaveAttribute("aria-invalid", "true");
    await expectNoAxeViolations(page);

    await page.getByRole("link", { name: "Bitte schreiben Sie uns kurz, worum es geht." }).click();
    await expect(page.getByLabel(/Ihre Nachricht/)).toBeFocused();
  });

  test("shows server errors at the field", async ({ page }) => {
    await mockFormApi(page, "/api/contact-requests", 400, {
      errors: { phone: ["Bitte geben Sie eine Telefonnummer nur mit Ziffern an, zum Beispiel 0521 123456."] },
    });
    await page.goto("/kontakt");
    await page.waitForLoadState("networkidle");
    await page.getByLabel(/Ihr Name/).fill("Erika Muster");
    await page.getByLabel(/Telefonnummer/).fill("0521 123456");
    await page.getByLabel(/Ihre Nachricht/).fill("Bitte melden Sie sich.");
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: "Nachricht senden" }).click();

    await expect(page.getByLabel(/Telefonnummer/)).toHaveAccessibleDescription(/Telefonnummer nur mit Ziffern/);
  });

  test("offers the phone number when JavaScript is unavailable", async ({ browser, baseURL, request }) => {
    // Chromium in Playwright keeps <noscript> hidden even with JavaScript off, so check the shipped HTML.
    const html = await (await request.get("/kontakt")).text();
    expect(html).toMatch(/<noscript><p>Zum Absenden des Formulars wird JavaScript benötigt\..*?href="tel:/);

    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage();
    await page.goto("/kontakt");
    await expect(page.getByRole("button", { name: "Nachricht senden" })).toBeDisabled();
    await context.close();
  });

  test("sends a message and confirms it", async ({ page }) => {
    const captured = await mockFormApi(page, "/api/contact-requests");
    await page.goto("/kontakt");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(/Ihr Name/).fill("Erika Muster");
    await page.getByLabel(/E-Mail-Adresse/).fill("erika@beispiel.de");
    await page.getByLabel(/Wie können wir Ihnen helfen/).selectOption({ label: "Grundpflege" });
    await page.getByLabel(/Ihre Nachricht/).fill("Bitte melden Sie sich bei mir.");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Nachricht senden" }).click();

    await expect(page.getByRole("heading", { name: "Danke, wir haben Ihre Nachricht erhalten" })).toBeFocused();
    expect(captured.body).toMatchObject({ email: "erika@beispiel.de", topic: "grundpflege", formToken: "e2e-token" });
  });

  test("shows the self-hosted map without requests to third parties", async ({ page, baseURL }) => {
    const foreignRequests: string[] = [];
    page.on("request", (request) => {
      if (new URL(request.url()).origin !== baseURL && !request.url().startsWith("data:")) {
        foreignRequests.push(request.url());
      }
    });
    await page.goto("/kontakt");

    const map = page.getByRole("img", { name: /Stadtplan von Gronau/ });
    await map.scrollIntoViewIfNeeded();
    await expect(map).toHaveJSProperty("complete", true);
    expect(await map.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBe(960);
    await page.waitForLoadState("networkidle");
    expect(foreignRequests).toEqual([]);
  });

  test("is accessible in the error state", async ({ page }) => {
    await mockFormApi(page, "/api/contact-requests");
    await page.goto("/kontakt");
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "Nachricht senden" }).click();

    await expect(page.getByRole("heading", { name: "Bitte prüfen Sie Ihre Angaben" })).toBeVisible();
    await expectNoAxeViolations(page);
  });
});
