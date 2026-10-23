// Single source for the care service's master data. Placeholders are tracked in docs/OFFENE-PUNKTE.md.
export const site = {
  name: "Aram",
  legalName: "Aram Pflege GmbH",
  tagline: "Ambulanter Pflegedienst",
  /** Short form for running text: "in Gronau und den umliegenden Gemeinden". */
  region: "Gronau",
  serviceArea: "Gronau, Epe und Umgebung",
  /** Places served, confirmed by the client on 2026-10-22 ("u. a."; more places nearby on request). */
  places: [
    { name: "Gronau", postalCode: "48599" },
    { name: "Gronau-Epe", postalCode: "48599" },
    { name: "Ochtrup", postalCode: "48607" },
    { name: "Heek", postalCode: "48619" },
    { name: "Ahaus", postalCode: "48683" },
  ],
  phone: {
    display: "02562\u00a08162218",
    href: "tel:+4925628162218",
  },
  email: {
    display: "info@arampflege.de",
    href: "mailto:info@arampflege.de",
  },
  address: {
    street: "Ochtruper Straße 83",
    postalCodeAndCity: "48599 Gronau (Westfalen)",
    /** Opens the location in OpenStreetMap; only requested when the visitor clicks. */
    mapUrl: "https://www.openstreetmap.org/?mlat=52.20777&mlon=7.03951#map=17/52.20777/7.03951",
  },
  register: {
    court: "Amtsgericht Coesfeld",
    number: "HRB 24086",
  },
  managingDirector: "Stephan Gabriel",
  supervisoryAuthority: {
    name: "Kreis Borken, WTG-Behörde (Heimaufsicht)",
    street: "Burloer Straße 93",
    postalCodeAndCity: "46325 Borken",
  },
  officeHours: "Mo–Fr\u00a08–16\u00a0Uhr",
  /** Office hours per day group, for the table on the contact panel. */
  officeHoursByDay: [
    { days: "Montag bis Freitag", hours: "8–16\u00a0Uhr" },
    { days: "Samstag", hours: "geschlossen" },
  ],
  /** For structured data (schema.org openingHoursSpecification). */
  openingHours: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "16:00" },
  onCallService: "24/7 erreichbar, auch am Wochenende",
  /** Confirmed by the client on 2026-10-23; also used for applications. */
  replyTime: "48 Stunden",
} as const;
