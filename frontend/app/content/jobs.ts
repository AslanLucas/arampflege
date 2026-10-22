// Job postings maintained as website content (see backend/AGENTS.md). Only real postings
// confirmed by the client go here; remove them as soon as a position is filled.
export type Job = {
  slug: string;
  title: string;
  /** e.g. "Teilzeit, 20 Stunden pro Woche" */
  scope: string;
  location: string;
  /** ISO date of publication, shown on the page */
  postedOn: string;
  tasks: string[];
  requirements: string[];
  /** Only conditions the client has confirmed; never invented benefits or salaries. */
  offer: string[];
  /** True while tasks and requirements are unreviewed drafts. */
  draft: boolean;
};

const MISSING_OFFER = "[[INHALT FEHLT: Arbeitsbedingungen, z. B. Arbeitszeiten, Dienstfahrzeug, Vergütung]]";

// Positions confirmed by the client on 2026-10-22. Applications also by e-mail to site.email.
export const jobs: Job[] = [
  {
    slug: "pflegefachkraft",
    title: "Pflegefachkraft (m/w/d)",
    scope: "Vollzeit oder Teilzeit",
    location: "Gronau und Umgebung",
    postedOn: "2026-10-22",
    tasks: [
      "Grundpflege bei unseren Patientinnen und Patienten zu Hause",
      "Behandlungspflege nach ärztlicher Verordnung, zum Beispiel Medikamentengabe, Injektionen, Wundversorgung und Kompressionsstrümpfe",
      "Beratungseinsätze nach § 37 Abs. 3 SGB XI",
      "Beratung von Pflegebedürftigen und Angehörigen",
      "Pflegedokumentation",
    ],
    requirements: [
      "Abgeschlossene Ausbildung als Pflegefachfrau oder Pflegefachmann, Gesundheits- und Krankenpflegerin oder -pfleger oder Altenpflegerin oder -pfleger",
      "[[INHALT FEHLT: Führerschein Klasse B erforderlich?]]",
    ],
    offer: ["Vollzeit oder Teilzeit", MISSING_OFFER],
    draft: true,
  },
  {
    slug: "pflegehilfskraft",
    title: "Pflegehilfskraft oder Pflegeassistenz (m/w/d)",
    scope: "Teilzeit oder Minijob",
    location: "Gronau und Umgebung",
    postedOn: "2026-10-22",
    tasks: [
      "Grundpflege: Hilfe bei der Körperpflege, beim Essen und Trinken und beim Bewegen",
      "Unterstützung im Alltag unserer Patientinnen und Patienten",
      "Rückmeldung an die Pflegefachkräfte, wenn sich etwas verändert",
    ],
    requirements: ["[[INHALT FEHLT: Erforderliche Qualifikation, z. B. Pflegebasiskurs oder Ausbildung in der Pflegeassistenz]]"],
    offer: ["Teilzeit oder Minijob", MISSING_OFFER],
    draft: true,
  },
  {
    slug: "hauswirtschaft-und-betreuung",
    title: "Hauswirtschafts- und Betreuungskraft (m/w/d)",
    scope: "Teilzeit oder Minijob",
    location: "Gronau und Umgebung",
    postedOn: "2026-10-22",
    tasks: [
      "Hilfe im Haushalt: Einkaufen, Wohnung reinigen, Wäsche und Mahlzeiten",
      "Betreuung: Gespräche, Spaziergänge und Begleitung zu Terminen",
      "Entlastung pflegender Angehöriger",
    ],
    requirements: ["[[INHALT FEHLT: Voraussetzungen, z. B. Qualifikation als Betreuungskraft nach § 53b SGB XI]]"],
    offer: ["Teilzeit oder Minijob", MISSING_OFFER],
    draft: true,
  },
];

export const INITIATIVE = "initiativ";

export function jobPath(job: Job): string {
  return `/karriere/${job.slug}`;
}

export function applyPath(slug?: string): string {
  return slug ? `/karriere/bewerben?stelle=${encodeURIComponent(slug)}` : "/karriere/bewerben";
}

export function jobBySlug(slug: string | null | undefined): Job | undefined {
  return jobs.find((job) => job.slug === slug);
}
