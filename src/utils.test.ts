// Starter test — verifies the vitest runner is correctly wired.
// This file intentionally covers no application logic yet; it exists so
// `vitest run` exits 0 and CI goes green from the first PR.
// Delete this file once real utility functions exist under src/ and replace
// it with tests that cover actual business logic.
import { describe, it, expect } from "vitest";

describe("vitest scaffold", () => {
  it("true is true", () => {
    expect(true).toBe(true);
  });

  it("basic arithmetic works in this environment", () => {
    expect(1 + 1).toBe(2);
  });
});
