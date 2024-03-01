import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";

installGlobals();

export default defineConfig({
  plugins: [
    !process.env.VITEST &&
      remix({
        ignoredRouteFiles: ["**/?(*.)+(spec|test).[tj]s?(x)"],
      }),
  ],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setup-test.ts",
  },
});
