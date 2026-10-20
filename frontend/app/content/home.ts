import { site } from "./site";

export const hero = {
  eyebrow: `Ambulante Pflege in ${site.region}`,
  title: `Wir pflegen Menschen zu Hause in ${site.region} und den umliegenden Gemeinden.`,
  lead: "Rufen Sie uns an. Wir besprechen mit Ihnen, welche Unterstützung Sie brauchen und was die Pflegekasse übernimmt.",
};

export type Step = {
  title: string;
  text: string;
};

export const careProcess = {
  title: "Was passiert nach Ihrem Anruf?",
  intro: "Vier Schritte, bis die Pflege beginnt.",
  draftNote: "[[ENTWURF: Ablauf vom Kunden bestätigen]]",
  steps: [
    {
      title: "Sie rufen an oder bitten um Rückruf",
      text: "Wir sprechen kurz darüber, wer Unterstützung braucht und wobei.",
    },
    {
      title: "Wir besuchen Sie zu Hause",
      text: "Im Gespräch vor Ort klären wir, welche Hilfe passt und was die Pflegekasse übernimmt.",
    },
    {
      title: "Wir halten alles schriftlich fest",
      text: "Sie erhalten eine Vereinbarung mit den Leistungen, den Zeiten und den Kosten.",
    },
    {
      title: "Die Pflege beginnt",
      text: "Unsere Pflegekräfte kommen zu den vereinbarten Zeiten zu Ihnen.",
    },
  ] satisfies Step[],
};

export const teamTeaser = {
  eyebrow: "Ihre Ansprechperson",
  title: "Wer Sie betreut",
  photo: "Pflegedienstleitung im Büro, Querformat 5 : 4",
  name: "[[INHALT FEHLT: Name der Pflegedienstleitung]]",
  role: "Pflegedienstleitung",
  qualification: "[[INHALT FEHLT: Qualifikation der Pflegedienstleitung]]",
  text: "[[INHALT FEHLT: Zwei bis drei Sätze der Pflegedienstleitung zum Team]]",
};

export const servicesTeaser = {
  title: "Wobei wir Sie unterstützen",
  intro: "Wählen Sie eine Leistung, um zu erfahren, für wen sie gedacht ist und wer die Kosten trägt.",
};

export const careerTeaser = {
  title: `Arbeiten bei ${site.name}`,
  text: "[[INHALT FEHLT: Kurzer Hinweis auf offene Stellen und Arbeitsbedingungen]]",
};

export const callbackTeaser = {
  title: "Wir rufen Sie zurück",
  text: "Hinterlassen Sie Ihren Namen und Ihre Telefonnummer. Wir melden uns innerhalb von [[INHALT FEHLT: Rückruffrist]].",
};
