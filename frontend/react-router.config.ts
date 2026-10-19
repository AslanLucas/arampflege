import type { Config } from "@react-router/dev/config";

export default {
  appDirectory: "app",
  ssr: false,
  prerender: ["/"],
} satisfies Config;
