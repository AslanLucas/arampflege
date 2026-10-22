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
  eyebrow: "Über uns",
  title: "Wer Sie betreut",
  photo: "Pflegedienstleitung im Büro, Querformat 5 : 4",
  text: "Unser Team besteht aus erfahrenen, examinierten Pflegefachkräften. Eine qualifizierte Pflegedienstleitung sorgt für Qualität und Sicherheit in der Versorgung.",
  detail: "Feste Bezugspersonen, verlässliche Einsatzzeiten und ein Team, das sich Zeit nimmt.",
};

export const areaTeaser = {
  eyebrow: "Einsatzgebiet",
  title: "Kommen wir auch zu Ihnen?",
  text: `Wir pflegen Menschen in ${site.region} und den umliegenden Gemeinden.`,
  note: "Wenn Ihr Ort nicht dabei ist, rufen Sie uns trotzdem an. Wir sagen Ihnen, ob wir Sie versorgen können.",
};

export const servicesTeaser = {
  title: "Wobei wir Sie unterstützen",
  intro: "Wählen Sie eine Leistung, um zu erfahren, für wen sie gedacht ist und wer die Kosten trägt.",
};

export const careerTeaser = {
  title: `Arbeiten bei ${site.name}`,
  text: "Wir suchen Pflegefachkräfte in Vollzeit oder Teilzeit sowie Pflegehilfskräfte, Hauswirtschafts- und Betreuungskräfte in Teilzeit oder als Minijob.",
};

export const contactTeaser = {
  eyebrow: "Kontakt",
  title: "Sprechen Sie mit uns",
  text: "Rufen Sie an, schreiben Sie uns oder lassen Sie sich zurückrufen. Wir besprechen mit Ihnen, welche Unterstützung Sie brauchen und was die Pflegekasse übernimmt.",
};
