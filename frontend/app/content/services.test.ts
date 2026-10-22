// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { payers, services } from "./services";

describe("services content", () => {
  it("uses unique slugs", () => {
    const slugs = services.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("names a legal source for every cost text and a valid date once checked", () => {
    for (const { name, costs, draft } of services) {
      expect(costs.source.trim(), name).not.toBe("");
      if (costs.checkedOn === null) {
        expect(draft, `${name} is unchecked and must be marked as draft`).toBe(true);
      } else {
        expect(costs.checkedOn, name).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(Number.isNaN(Date.parse(costs.checkedOn)), name).toBe(false);
      }
    }
  });

  it("publishes no amounts until the client has checked them", () => {
    const unchecked = [
      ...services.filter(({ costs }) => costs.checkedOn === null).flatMap(({ costs }) => costs.text),
      ...payers.map((payer) => payer.text),
    ];
    for (const text of unchecked) {
      expect(text).not.toMatch(/€|Euro|\d+\s*%/);
    }
  });

  it("matches the contact topics the backend accepts", () => {
    const source = readFileSync(
      new URL("../../../backend/src/Pflege.Api/Features/Contact/CreateContactRequest.cs", import.meta.url),
      "utf8",
    );
    const allowed = /\[AllowedValues\(([\s\S]*?)ErrorMessage/.exec(source)?.[1] ?? "";
    const topics = [...allowed.matchAll(/"([a-z-]+)"/g)].map((match) => match[1]);

    expect(topics).toEqual([...services.map((service) => service.slug), "sonstiges"]);
  });
});
