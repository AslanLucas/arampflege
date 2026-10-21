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
  },
  register: {
    court: "Amtsgericht Coesfeld",
    number: "HRB 24086",
  },
  officeHours: "[[INHALT FEHLT: Bürozeiten]]",
  onCallService: "[[INHALT FEHLT: Rufbereitschaft]]",
} as const;
