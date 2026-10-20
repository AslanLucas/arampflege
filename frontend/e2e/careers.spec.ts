import { expect, test, type Page } from "@playwright/test";
import { expectNoAxeViolations, tabTo } from "./helpers";

const pdf = { name: "lebenslauf.pdf", mimeType: "application/pdf", buffer: Buffer.from("%PDF-1.7\nTest\n%%EOF") };

async function mockApplicationApi(page: Page, status = 201, response?: unknown) {
  const captured: { body?: string; contentType?: string } = {};
  await page.route("**/api/form-tokens", (route) =>
    route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ token: "e2e-token" }) }),
  );
  await page.route("**/api/applications", async (route) => {
    captured.body = route.request().postDataBuffer()?.toString("latin1");
    captured.contentType = await route.request().headerValue("content-type") ?? undefined;
    await route.fulfill({
      status,
      contentType: "application/problem+json",
      body: response === undefined ? "" : JSON.stringify(response),
    });
  });
  return captured;
}

test.describe("Careers", () => {
  test("leads to an unsolicited application while no jobs are published", async ({ page }) => {
    await page.goto("/karriere");

    await page.getByRole("main").getByRole("link", { name: "Initiativ bewerben" }).click();

    await expect(page).toHaveURL(/\/karriere\/bewerben$/);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Kurzbewerbung");
    await expect(page.getByText("Sie bewerben sich ohne bestimmte Stellenanzeige (Initiativbewerbung).")).toBeVisible();
  });

  test("sends a short application with resume using the keyboard", async ({ page }) => {
    const captured = await mockApplicationApi(page);
    await page.goto("/karriere/bewerben");
    await page.waitForLoadState("networkidle");

    const name = page.getByLabel(/Ihr Name/);
    await tabTo(page, () => name.evaluate((element) => element === document.activeElement), 40);
    await page.keyboard.type("Erika Muster");
    await page.keyboard.press("Tab");
    await page.keyboard.type("0521 123456");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("Pflegefachkraft (Pflegefachfrau, Pflegefachmann)")).toBeFocused();
    await page.keyboard.press("Space");
    await page.keyboard.press("Tab");
    await expect(page.getByLabel(/Lebenslauf/)).toBeFocused();
    // The native file dialog cannot be driven by keyboard in tests; choose the file directly.
    await page.getByLabel(/Lebenslauf/).setInputFiles(pdf);
    await expect(page.getByText(/Ausgewählt: lebenslauf\.pdf/)).toBeVisible();
    await page.getByRole("checkbox").focus();
    await page.keyboard.press("Space");
    await tabTo(page, () => page.getByRole("button", { name: "Bewerbung senden" }).evaluate((element) => element === document.activeElement));
    await page.keyboard.press("Enter");

    await expect(page.getByRole("heading", { name: "Danke, wir haben Ihre Bewerbung erhalten" })).toBeFocused();
    expect(captured.contentType).toMatch(/^multipart\/form-data; boundary=/);
    expect(captured.body).toContain('name="position"\r\n\r\ninitiativ');
    expect(captured.body).toContain('name="qualification"\r\n\r\npflegefachkraft');
    expect(captured.body).toContain('name="resume"; filename="lebenslauf.pdf"');
    expect(captured.body).toContain("%PDF-1.7");
    await expectNoAxeViolations(page);
  });

  test("lets people remove a chosen file", async ({ page }) => {
    await mockApplicationApi(page);
    await page.goto("/karriere/bewerben");
    await page.waitForLoadState("networkidle");

    await page.getByLabel(/Lebenslauf/).setInputFiles(pdf);
    await page.getByRole("button", { name: "Datei entfernen" }).click();

    await expect(page.getByText(/Ausgewählt:/)).toBeHidden();
    await expect(page.getByLabel(/Lebenslauf/)).toBeFocused();
  });

  test("is accessible in the error state and shows the server's file check", async ({ page }) => {
    await mockApplicationApi(page, 400, {
      errors: { resume: ["Bitte laden Sie Ihren Lebenslauf als PDF, JPG oder PNG hoch."] },
    });
    await page.goto("/karriere/bewerben");
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "Bewerbung senden" }).click();
    await expect(page.getByRole("heading", { name: "Bitte prüfen Sie Ihre Angaben" })).toBeVisible();
    await expectNoAxeViolations(page);

    await page.getByLabel(/Ihr Name/).fill("Erika Muster");
    await page.getByLabel(/Telefonnummer/).fill("0521 123456");
    await page.getByLabel("Pflegehilfskraft").check();
    await page.getByLabel(/Lebenslauf/).setInputFiles(pdf);
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Bewerbung senden" }).click();

    await expect(page.getByLabel(/Lebenslauf/)).toHaveAttribute("aria-invalid", "true");
    await expect(page.getByRole("link", { name: "Bitte laden Sie Ihren Lebenslauf als PDF, JPG oder PNG hoch." })).toBeVisible();
  });
});
