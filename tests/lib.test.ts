import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// cn() — the tailwind-merge + clsx helper used by every component.
// Correct behavior matters: a wrong merge silently drops class overrides.
// ---------------------------------------------------------------------------

describe("cn()", () => {
  it("merges two class strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deduplicates conflicting tailwind utilities (last wins)", () => {
    // tailwind-merge: px-2 px-4 → px-4
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("ignores falsy values (undefined, false, null)", () => {
    expect(cn("base", undefined, false, null, "extra")).toBe("base extra");
  });

  it("handles conditional objects (clsx syntax)", () => {
    expect(cn("base", { active: true, disabled: false })).toBe("base active");
  });

  it("returns empty string when no classes are provided", () => {
    expect(cn()).toBe("");
  });

  it("merges background-color conflicts correctly", () => {
    expect(cn("bg-primary", "bg-secondary")).toBe("bg-secondary");
  });

  it("preserves non-conflicting utility classes", () => {
    const result = cn("flex", "items-center", "gap-2");
    expect(result).toContain("flex");
    expect(result).toContain("items-center");
    expect(result).toContain("gap-2");
  });
});
