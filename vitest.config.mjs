import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
  test: {
    include: ["**/__tests__/**/*.{ts,tsx}", "**/*.test.{ts,tsx}"],
    exclude: ["node_modules", ".next", "app/**"],
    environment: "happy-dom",
    globals: true,
    setupFiles: ["tests/setup.ts"],
    coverage: {
      provider: "v8",
      include: ["components/**", "lib/**"],
      exclude: ["**/*.test.{ts,tsx}", "tests/**"],
      reporter: ["text", "lcov"],
      thresholds: {
        // Starter gate: covers the 7 most-used components + lib/utils.
        // The remaining ~12 untested components (dialog, dropdown, form, etc.)
        // currently bring the overall % down. Raise these thresholds as more
        // component tests are added; do NOT lower them.
        lines: 20,
        functions: 22,
        branches: 10,
      },
    },
  },
});
