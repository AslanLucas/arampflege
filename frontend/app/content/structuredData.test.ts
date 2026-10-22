import { describe, expect, it } from "vitest";
import { site } from "./site";
import { localBusiness, toJsonLd } from "./structuredData";

describe("structured data", () => {
  it("describes the business with real contact data only", () => {
    const data = JSON.parse(toJsonLd(localBusiness)) as typeof localBusiness;

    expect(data.name).toBe("Aram Pflege GmbH");
    expect(data.telephone).toBe("+4925628162218");
    expect(data.address).toMatchObject({ postalCode: "48599", addressLocality: "Gronau (Westfalen)" });
    expect(data.areaServed.map((place) => place.name)).toEqual(site.places.map((place) => place.name));
    expect(JSON.stringify(data)).not.toMatch(/\[\[/);
  });

  it("cannot break out of the script element", () => {
    expect(toJsonLd({ text: "</script><script>alert(1)</script>" })).not.toContain("</script>");
  });
});
