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

test.describe("Callback form", () => {
  test("can be filled in and sent with the keyboard only", async ({ page }) => {
    const captured = await mockFormApi(page, "/api/callback-requests");
    await page.goto("/rueckruf");
    await page.waitForLoadState("networkidle");

    await focused(page, page.getByLabel(/Ihr Name/));
    await page.keyboard.type("Erika Muster");
    await page.keyboard.press("Tab");
    await page.keyboard.type("0521 123456");
    await page.keyboard.press("Tab");
    await page.keyboard.type("33602 Bielefeld");
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Vormittags")).toBeFocused();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByLabel("Nachmittags")).toBeChecked();
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await expect(page.getByRole("checkbox")).toBeChecked();
    await focused(page, page.getByRole("button", { name: "Rückruf anfordern" }));
    await page.keyboard.press("Enter");

    const confirmation = page.getByRole("heading", { name: "Danke, wir haben Ihre Rückrufbitte erhalten" });
    await expect(confirmation).toBeFocused();
    expect(captured.body).toMatchObject({
      name: "Erika Muster",
      phone: "0521 123456",
      location: "33602 Bielefeld",
      preferredTime: "afternoon",
      consent: true,
      website: "",
      formToken: "e2e-token",
    });
    await expectNoAxeViolations(page);
  });

  test("shows an accessible error summary that leads to the fields", async ({ page }) => {
    await mockFormApi(page, "/api/callback-requests");
    await page.goto("/rueckruf");
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "Rückruf anfordern" }).click();

    await expect(page.getByRole("heading", { name: "Bitte prüfen Sie Ihre Angaben" })).toBeVisible();
    await expect(page.locator(":focus")).toContainText("Bitte prüfen Sie Ihre Angaben");
    await expect(page.getByLabel(/Ihr Name/)).toHaveAttribute("aria-invalid", "true");
    await expectNoAxeViolations(page);

    await page.getByRole("link", { name: "Bitte geben Sie Ihre Telefonnummer an." }).click();
    await expect(page.getByLabel(/Telefonnummer/)).toBeFocused();
  });

  test("shows server errors at the field", async ({ page }) => {
    await mockFormApi(page, "/api/callback-requests", 400, {
      errors: { phone: ["Bitte geben Sie eine Telefonnummer nur mit Ziffern an, zum Beispiel 0521 123456."] },
    });
    await page.goto("/rueckruf");
    await page.waitForLoadState("networkidle");
    await page.getByLabel(/Ihr Name/).fill("Erika Muster");
    await page.getByLabel(/Telefonnummer/).fill("0521 123456");
    await page.getByLabel(/Postleitzahl oder Ort/).fill("Bielefeld");
    await page.getByLabel("Zu jeder Zeit").check();
    await page.getByRole("checkbox").check();

    await page.getByRole("button", { name: "Rückruf anfordern" }).click();

    await expect(page.getByLabel(/Telefonnummer/)).toHaveAccessibleDescription(
      /Telefonnummer nur mit Ziffern/,
    );
  });

  test("offers the phone number when JavaScript is unavailable", async ({ browser, baseURL, request }) => {
    // Chromium in Playwright keeps <noscript> hidden even with JavaScript off, so check the shipped HTML.
    const html = await (await request.get("/rueckruf")).text();
    expect(html).toMatch(/<noscript><p>Zum Absenden des Formulars wird JavaScript benötigt\..*?href="tel:/);

    const context = await browser.newContext({ javaScriptEnabled: false, baseURL });
    const page = await context.newPage();
    await page.goto("/rueckruf");
    await expect(page.getByRole("button", { name: "Rückruf anfordern" })).toBeDisabled();
    await context.close();
  });
});

test.describe("Contact form", () => {
  test("sends a message and confirms it", async ({ page }) => {
    const captured = await mockFormApi(page, "/api/contact-requests");
    await page.goto("/kontakt");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(/Ihr Name/).fill("Erika Muster");
    await page.getByLabel(/E-Mail-Adresse/).fill("erika@beispiel.de");
    await page.getByLabel(/Ihre Nachricht/).fill("Bitte rufen Sie mich zurück.");
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Nachricht senden" }).click();

    await expect(page.getByRole("heading", { name: "Danke, wir haben Ihre Nachricht erhalten" })).toBeFocused();
    expect(captured.body).toMatchObject({ email: "erika@beispiel.de", formToken: "e2e-token" });
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
