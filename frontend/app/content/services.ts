// Provisional list from docs/DESIGN.md, not yet confirmed by the client (see docs/OFFENE-PUNKTE.md).
export type Service = {
  slug: string;
  name: string;
  summary: string;
};

export const services: Service[] = [
  {
    slug: "grundpflege",
    name: "Grundpflege",
    summary: "Hilfe bei Körperpflege, Ernährung und Mobilität.",
  },
  {
    slug: "behandlungspflege",
    name: "Behandlungspflege",
    summary:
      "Ärztlich verordnete Pflege, zum Beispiel Medikamentengabe, Verbandwechsel oder Injektionen.",
  },
  {
    slug: "verhinderungspflege",
    name: "Verhinderungspflege",
    summary: "Ersatzpflege, wenn die private Pflegeperson verhindert ist.",
  },
  {
    slug: "entlastung-und-hauswirtschaft",
    name: "Entlastungsleistungen und Hauswirtschaft",
    summary: "[[INHALT FEHLT: Kurzbeschreibung Entlastungsleistungen und Hauswirtschaft]]",
  },
  {
    slug: "beratungsbesuche",
    name: "Beratungsbesuche nach § 37 Abs. 3 SGB XI",
    summary: "Pflichtberatung für Menschen, die Pflegegeld beziehen.",
  },
  {
    slug: "pflegeberatung",
    name: "Pflegeberatung",
    summary: "[[INHALT FEHLT: Kurzbeschreibung Pflegeberatung]]",
  },
];

export function servicePath(service: Service): string {
  return `/leistungen/${service.slug}`;
}
