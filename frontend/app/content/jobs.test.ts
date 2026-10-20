import { describe, expect, it } from "vitest";
import { INITIATIVE, jobs } from "./jobs";

describe("jobs content", () => {
  it("uses unique slugs that the API accepts", () => {
    const slugs = jobs.map((job) => job.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9-]{1,80}$/);
      expect(slug).not.toBe(INITIATIVE);
    }
  });

  it("dates every posting", () => {
    for (const { slug, postedOn } of jobs) {
      expect(postedOn, slug).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(Number.isNaN(Date.parse(postedOn)), slug).toBe(false);
    }
  });
});
