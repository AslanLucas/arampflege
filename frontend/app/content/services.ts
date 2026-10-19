// Provisional list from docs/DESIGN.md, not yet confirmed by the client (see docs/OFFENE-PUNKTE.md).
// Drafts are based on the term explanations in docs/CONTENT.md and need professional review.

/** Costs are only published with a source and the date it was checked (docs/CONTENT.md). */
export type Costs = {
  text: string;
  source: string;
  /** ISO date, e.g. "2026-10-01" */
  checkedOn: string;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  /** True while audience and scope are unreviewed drafts. */
  draft: boolean;
  audience: string;
  scope: string[];
  costs: Costs | null;
  application: string;
};

const MISSING_APPLICATION = "[[INHALT FEHLT: Wie beantragen Sie die Leistung?]]";

export const services: Service[] = [
  {
    slug: "grundpflege",
    name: "Grundpflege",
    summary: "Hilfe bei Körperpflege, Ernährung und Mobilität.",
    draft: true,
    audience: "Für Menschen, die im Alltag Hilfe beim Waschen, beim Essen oder beim Bewegen brauchen.",
    scope: [
      "Körperpflege, zum Beispiel Waschen und Duschen",
      "Ernährung, zum Beispiel Hilfe beim Essen und Trinken",
      "Mobilität, zum Beispiel Aufstehen, Gehen und Umlagern",
    ],
    costs: null,
    application: MISSING_APPLICATION,
  },
  {
    slug: "behandlungspflege",
    name: "Behandlungspflege",
    summary:
      "Ärztlich verordnete Pflege, zum Beispiel Medikamentengabe, Verbandwechsel oder Injektionen.",
    draft: true,
    audience: "Für Menschen, denen eine Ärztin oder ein Arzt Pflege zu Hause verordnet hat.",
    scope: [
      "Medikamentengabe",
      "Verbandwechsel",
      "Injektionen",
      "[[INHALT FEHLT: weitere Leistungen der Behandlungspflege]]",
    ],
    costs: null,
    application: MISSING_APPLICATION,
  },
  {
    slug: "verhinderungspflege",
    name: "Verhinderungspflege",
    summary: "Ersatzpflege, wenn die private Pflegeperson verhindert ist.",
    draft: true,
    audience:
      "Für pflegebedürftige Menschen, deren private Pflegeperson zeitweise verhindert ist, zum Beispiel durch Urlaub oder Krankheit.",
    scope: [
      "Wir übernehmen die Pflege, die sonst die private Pflegeperson leistet.",
      "[[INHALT FEHLT: Umfang und mögliche Zeiten der Verhinderungspflege]]",
    ],
    costs: null,
    application: MISSING_APPLICATION,
  },
  {
    slug: "entlastung-und-hauswirtschaft",
    name: "Entlastungsleistungen und Hauswirtschaft",
    summary: "[[INHALT FEHLT: Kurzbeschreibung Entlastungsleistungen und Hauswirtschaft]]",
    draft: false,
    audience: "[[INHALT FEHLT: Für wen?]]",
    scope: ["[[INHALT FEHLT: Was genau?]]"],
    costs: null,
    application: MISSING_APPLICATION,
  },
  {
    slug: "beratungsbesuche",
    name: "Beratungsbesuche nach § 37 Abs. 3 SGB XI",
    summary: "Pflichtberatung für Menschen, die Pflegegeld beziehen.",
    draft: true,
    audience: "Für Menschen, die Pflegegeld beziehen. Für sie ist die Beratung vorgeschrieben.",
    scope: [
      "Wir besuchen Sie zu Hause und sprechen mit Ihnen über Ihre Pflegesituation.",
      "[[INHALT FEHLT: Ablauf und Inhalt des Beratungsbesuchs]]",
    ],
    costs: null,
    application: MISSING_APPLICATION,
  },
  {
    slug: "pflegeberatung",
    name: "Pflegeberatung",
    summary: "[[INHALT FEHLT: Kurzbeschreibung Pflegeberatung]]",
    draft: false,
    audience: "[[INHALT FEHLT: Für wen?]]",
    scope: ["[[INHALT FEHLT: Was genau?]]"],
    costs: null,
    application: MISSING_APPLICATION,
  },
];

export function servicePath(service: Service): string {
  return `/leistungen/${service.slug}`;
}

export function serviceBySlug(slug: string | undefined): Service | undefined {
  return services.find((service) => service.slug === slug);
}
