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
