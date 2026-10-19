import { defineConfig } from "vitest/config";

// Separate from vite.config.ts: the React Router plugin must not run inside Vitest.
export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["app/**/*.test.{ts,tsx}"],
    setupFiles: ["./vitest.setup.ts"],
    // fetch in Node needs absolute URLs; the app itself uses the relative default "/api".
    env: { VITE_API_BASE_URL: "http://localhost/api" },
  },
});
