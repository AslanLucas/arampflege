export type Qualification = "pflegefachkraft" | "pflegehilfskraft" | "ausbildung" | "andere";

// Values must match the backend (CreateApplicationRequest.Qualification).
export const qualificationOptions: { value: Qualification; label: string }[] = [
  { value: "pflegefachkraft", label: "Pflegefachkraft (Pflegefachfrau, Pflegefachmann)" },
  { value: "pflegehilfskraft", label: "Pflegehilfskraft" },
  { value: "ausbildung", label: "In Ausbildung" },
  { value: "andere", label: "Andere Qualifikation" },
];

export const careersIntro = "[[INHALT FEHLT: Einleitung der Karriereseite, z. B. wen der Dienst sucht und wie das Team arbeitet]]";
