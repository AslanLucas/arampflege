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

export const areaTeaser = {
  eyebrow: "Einsatzgebiet",
  title: "Kommen wir auch zu Ihnen?",
  text: `Wir pflegen Menschen in ${site.region} und den umliegenden Gemeinden.`,
  places: site.serviceArea,
  note: "Wenn Ihr Ort nicht dabei ist, rufen Sie uns trotzdem an. Wir sagen Ihnen, ob wir Sie versorgen können.",
};

export const servicesTeaser = {
  title: "Wobei wir Sie unterstützen",
  intro: "Wählen Sie eine Leistung, um zu erfahren, für wen sie gedacht ist und wer die Kosten trägt.",
};

export const careerTeaser = {
  title: `Arbeiten bei ${site.name}`,
  text: "[[INHALT FEHLT: Kurzer Hinweis auf offene Stellen und Arbeitsbedingungen]]",
};

export const contactTeaser = {
  eyebrow: "Kontakt",
  title: "Sprechen Sie mit uns",
  text: "Rufen Sie an, schreiben Sie uns oder lassen Sie sich zurückrufen. Wir besprechen mit Ihnen, welche Unterstützung Sie brauchen und was die Pflegekasse übernimmt.",
};

export type OnlineTile = {
  id: string;
  icon: "phoneCall" | "message" | "mail" | "fileUp" | "shield";
  chip: string;
  title: string;
  text: string;
  to: string;
  linkLabel: string;
  featured?: boolean;
};

// Only services the client confirmed or the website itself provides (docs/CONTENT.md).
export const onlineServices = {
  title: "Vieles erledigen Sie bei uns online",
  intro: "Rückruf, Nachricht oder Bewerbung: zu jeder Tageszeit und in wenigen Minuten.",
  tiles: [
    {
      id: "rueckruf",
      icon: "phoneCall",
      chip: "In wenigen Minuten",
      title: "Rückruf anfordern",
      text: "Name und Telefonnummer genügen. Wir rufen Sie innerhalb von [[INHALT FEHLT: Rückruffrist]] zurück.",
      to: "/rueckruf",
      linkLabel: "Rückruf anfordern",
      featured: true,
    },
    {
      id: "nachricht",
      icon: "message",
      chip: "Kontaktformular",
      title: "Nachricht schreiben",
      text: "Schreiben Sie uns Ihr Anliegen, auch abends oder am Wochenende.",
      to: "/kontakt",
      linkLabel: "Zum Kontaktformular",
    },
    {
      id: "digital",
      icon: "mail",
      chip: "Digital erreichbar",
      title: "Per E-Mail oder Messenger",
      text: `Schreiben Sie uns an ${site.email.display} oder über [[INHALT FEHLT: Messenger]].`,
      to: site.email.href,
      linkLabel: "E-Mail schreiben",
    },
    {
      id: "bewerbung",
      icon: "fileUp",
      chip: "Karriere",
      title: "In wenigen Minuten bewerben",
      text: "Kurzbewerbung vom Smartphone, ohne Anschreiben. Ein Foto vom Lebenslauf genügt.",
      to: "/karriere/bewerben",
      linkLabel: "Zur Kurzbewerbung",
    },
    {
      id: "datenschutz",
      icon: "shield",
      chip: "Datenschutz",
      title: "Ihre Daten sind geschützt",
      text: "Ihre Angaben werden verschlüsselt übertragen. Diese Webseite nutzt keine Tracking-Cookies und keine Analyse-Dienste.",
      to: "/datenschutz",
      linkLabel: "Zur Datenschutzerklärung",
    },
  ] satisfies OnlineTile[],
};

export const heroChips = ["Rückruf online", "Bewerbung in Minuten", "Ohne Tracking"];
