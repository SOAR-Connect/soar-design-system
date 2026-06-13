import { defineConfig } from "vitest/config";

// Mirrors the pattern used in soarconnect_whitelabel/packages/*.
// No source to cover yet — add components under src/ or lib/ as the repo grows.
// Threshold is 0 to start; raise it as component logic accumulates.
export default defineConfig({
  test: {
    include: ["src/**/*.test.{ts,tsx}", "tests/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      include: ["src/**", "lib/**"],
      reporter: ["text", "lcov"],
      thresholds: {
        statements: 0,
        branches: 0,
        functions: 0,
        lines: 0,
      },
    },
  },
});
