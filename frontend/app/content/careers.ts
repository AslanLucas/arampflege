export type Qualification = "pflegefachkraft" | "pflegehilfskraft" | "hauswirtschaft-betreuung" | "ausbildung" | "andere";

// Values must match the backend (CreateApplicationRequest.Qualification).
export const qualificationOptions: { value: Qualification; label: string }[] = [
  { value: "pflegefachkraft", label: "Pflegefachkraft (Pflegefachfrau, Pflegefachmann)" },
  { value: "pflegehilfskraft", label: "Pflegehilfskraft oder Pflegeassistenz" },
  { value: "hauswirtschaft-betreuung", label: "Hauswirtschafts- oder Betreuungskraft" },
  { value: "ausbildung", label: "In Ausbildung" },
  { value: "andere", label: "Andere Qualifikation" },
];

export const careersIntro =
  "Wir versorgen Menschen in Gronau, Epe und Umgebung zu Hause. Dafür suchen wir dich: als Pflegefachkraft, Pflegehilfskraft oder Hauswirtschafts- und Betreuungskraft in unserem Team mit einer qualifizierten Pflegedienstleitung.";

export type EmployerPromise = {
  icon: "heart" | "clock" | "euro" | "car" | "team";
  title: string;
  text: string;
};

// Only what the client confirmed on 2026-10-22: time per visit, flexible rosters, pay based on a
// collective agreement, travel costs, a small team. No bonuses, training or other benefits.
export const employerPromises = {
  eyebrow: "Arbeiten bei Aram",
  title: "Was dich bei uns erwartet",
  intro: "Wir wissen, wie anstrengend Pflege sein kann. Darauf kannst du dich bei uns verlassen.",
  featured: {
    icon: "heart",
    title: "Zeit für die Menschen, die du pflegst",
    text: "Deine Einsätze sind so geplant, dass du genug Zeit für deine Patientinnen und Patienten hast. Eine Minutentaktung gibt es bei uns nicht.",
  },
  items: [
    {
      icon: "clock",
      title: "Dienstpläne, die zu deinem Leben passen",
      text: "Wir planen mit Rücksicht auf Familie, Studium und Hobbys. Wunschdienste sind möglich.",
    },
    {
      icon: "euro",
      title: "Tariforientierte Vergütung",
      text: "Deine Bezahlung orientiert sich am Tarif. Die Einzelheiten besprechen wir im Gespräch mit dir.",
    },
    {
      icon: "car",
      title: "Fahrten zu den Einsätzen",
      text: "Du fährst nicht auf eigene Kosten. [[INHALT FEHLT: Dienstwagen oder Fahrtkostenerstattung?]]",
    },
    {
      icon: "team",
      title: "Kurze Wege im Team",
      text: "Ein kleines Team mit flachen Hierarchien und direktem Draht zur Leitung.",
    },
  ],
} satisfies { eyebrow: string; title: string; intro: string; featured: EmployerPromise; items: EmployerPromise[] };
