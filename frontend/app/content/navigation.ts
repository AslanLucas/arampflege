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

export const callbackLink: NavigationItem = { label: "Rückruf anfordern", to: "/rueckruf" };

/** Eye-catching header action; the first consultation is free (confirmed 2026-10-22) and starts with a callback. */
export const firstConsultationLink: NavigationItem = { label: "Kostenloses Erstgespräch", to: callbackLink.to };
