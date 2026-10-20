import { defineConfig, devices } from "@playwright/test";

const port = 4173;
const baseURL = `http://127.0.0.1:${String(port)}`;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL,
    locale: "de-DE",
    // Stable layout for most tests; e2e/effects.spec.ts turns motion back on.
    reducedMotion: "reduce",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "desktop",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "tablet-768",
      use: { ...devices["Pixel 7"], viewport: { width: 768, height: 1024 } },
    },
    {
      name: "mobile-360",
      use: { ...devices["Pixel 7"], viewport: { width: 360, height: 740 } },
    },
  ],
  webServer: {
    command: `npm run build && npm run preview -- --port ${String(port)}`,
    url: baseURL,
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
