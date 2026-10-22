import { site } from "./site";

// Texts from the client (2026-10-22), lightly edited for readability. The motto is the only
// exception to the phrase rules in docs/CONTENT.md.
export const about = {
  motto: "Pflege, die von Herzen kommt.",
  lead: `Die ${site.legalName} ist ein ambulanter Pflegedienst aus Gronau. Ab Januar 2027 versorgen wir Menschen in Gronau, Epe und Umgebung in ihrem eigenen Zuhause.`,
  text: "Uns ist wichtig, dass sich unsere Patientinnen und Patienten gut aufgehoben fühlen. Wir kennen die Region, wir sind persönlich erreichbar, und wir beraten Angehörige genauso ernsthaft wie die Pflegebedürftigen selbst.",
  promises: [
    { title: "Feste Bezugspersonen", text: "Sie werden von Menschen gepflegt, die Sie kennen." },
    { title: "Verlässliche Einsatzzeiten", text: "Wir kommen zu den Zeiten, die wir mit Ihnen vereinbaren." },
    { title: "Ein Team, das sich Zeit nimmt", text: "Für die Pflege und für Ihre Fragen." },
    {
      title: "Persönlich erreichbar",
      text: `Im Büro ${site.officeHours}, in der Rufbereitschaft ${site.onCallService}.`,
    },
  ],
  team: "Unser Team besteht aus erfahrenen, examinierten Pflegefachkräften. Eine qualifizierte Pflegedienstleitung sorgt für Qualität und Sicherheit in der Versorgung.",
  teamPhoto: "Team der Aram Pflege GmbH vor dem Büro, Querformat 3 : 2",
  start: "Ab Januar 2027",
};
