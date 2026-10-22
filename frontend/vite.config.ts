import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  build: {
    // One stylesheet for all pages (about 10 KB gzip) instead of up to a dozen render-blocking requests
    cssCodeSplit: false,
  },
  server: {
    proxy: {
      "/api": process.env.API_PROXY_TARGET ?? "http://localhost:5080",
    },
  },
});
