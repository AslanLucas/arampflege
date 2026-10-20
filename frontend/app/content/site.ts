// Single source for the care service's master data. Placeholders are tracked in docs/OFFENE-PUNKTE.md.
export const site = {
  name: "Aram",
  tagline: "Ambulanter Pflegedienst",
  region: "[[ORT/REGION]]",
  phone: {
    display: "[[TELEFON]]",
    href: "tel:[[TELEFON]]",
  },
  email: {
    display: "[[E-MAIL]]",
    href: "mailto:[[E-MAIL]]",
  },
  address: {
    street: "[[STRASSE UND HAUSNUMMER]]",
    postalCodeAndCity: "[[PLZ ORT]]",
  },
  officeHours: "[[INHALT FEHLT: Bürozeiten]]",
  onCallService: "[[INHALT FEHLT: Rufbereitschaft]]",
} as const;
