// Single source for the care service's master data. Placeholders are tracked in docs/OFFENE-PUNKTE.md.
export const site = {
  name: "Aram",
  legalName: "Aram Pflege GmbH",
  tagline: "Ambulanter Pflegedienst",
  /** Short form for running text: "in Gronau und den umliegenden Gemeinden". */
  region: "Gronau",
  serviceArea: "Gronau (Westfalen) und Umgebung",
  phone: {
    display: "[[TELEFON]]",
    href: "tel:[[TELEFON]]",
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
  officeHours: "Mo–Fr\u00a08–18\u00a0Uhr, Sa\u00a09–13\u00a0Uhr",
  /** Office hours per day group, for the table on the contact panel. */
  officeHoursByDay: [
    { days: "Montag bis Freitag", hours: "8–18\u00a0Uhr" },
    { days: "Samstag", hours: "9–13\u00a0Uhr" },
    { days: "Sonntag", hours: "geschlossen" },
  ],
  onCallService: "24/7 erreichbar, auch am Wochenende",
  replyTime: "[[INHALT FEHLT: Antwortfrist]]",
} as const;
