import { describe, expect, it } from "vitest";
import { services } from "./services";

describe("services content", () => {
  it("uses unique slugs", () => {
    const slugs = services.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("publishes costs only with a source and a valid check date", () => {
    for (const { name, costs } of services) {
      if (costs) {
        expect(costs.source.trim(), name).not.toBe("");
        expect(costs.checkedOn, name).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(Number.isNaN(Date.parse(costs.checkedOn)), name).toBe(false);
      }
    }
  });
});
