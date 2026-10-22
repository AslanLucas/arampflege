import { site } from "./site";

/** schema.org description of the care service for search engines; real data only (frontend/AGENTS.md). */
export const localBusiness = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  name: site.legalName,
  description: `${site.tagline} in ${site.serviceArea}`,
  telephone: site.phone.href.replace("tel:", ""),
  email: site.email.display,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    postalCode: site.address.postalCodeAndCity.split(" ")[0],
    addressLocality: site.address.postalCodeAndCity.split(" ").slice(1).join(" "),
    addressCountry: "DE",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: site.openingHours.days,
    opens: site.openingHours.opens,
    closes: site.openingHours.closes,
  },
  areaServed: site.places.map((place) => ({ "@type": "City", name: place.name })),
};

/** JSON for a script element; "<" is escaped so the content can never close the element. */
export function toJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
