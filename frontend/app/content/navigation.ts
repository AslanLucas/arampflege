export type NavigationItem = {
  label: string;
  to: string;
};

export const mainNavigation: NavigationItem[] = [
  { label: "Leistungen", to: "/leistungen" },
  { label: "Einsatzgebiet", to: "/einsatzgebiet" },
  { label: "Über uns", to: "/ueber-uns" },
  { label: "Karriere", to: "/karriere" },
  { label: "Kontakt", to: "/kontakt" },
];

export const legalNavigation: NavigationItem[] = [
  { label: "Impressum", to: "/impressum" },
  { label: "Datenschutz", to: "/datenschutz" },
  { label: "Barrierefreiheit", to: "/barrierefreiheit" },
];

/** The contact form on /kontakt; its heading carries this anchor. */
export const contactFormLink: NavigationItem = { label: "Nachricht schreiben", to: "/kontakt#nachricht" };

/** Eye-catching action; the first consultation is free (confirmed 2026-10-22) and starts with a message. */
export const firstConsultationLink: NavigationItem = { label: "Kostenloses Erstgespräch", to: contactFormLink.to };
