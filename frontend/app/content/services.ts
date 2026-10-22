// Services confirmed by the client on 2026-10-22. Texts are drafts written for this site and
// need professional review (docs/OFFENE-PUNKTE.md). No amounts: they change regularly (docs/CONTENT.md).

/** Who pays, with the legal basis. The check date stays open until the client approves the text. */
export type Costs = {
  text: string[];
  source: string;
  /** ISO date, e.g. "2026-10-01"; null until the client has approved the text */
  checkedOn: string | null;
};

export type Fact = {
  label: string;
  value: string;
};

export type Service = {
  slug: string;
  name: string;
  summary: string;
  /** Alt text of the photo in public/images/leistungen/<slug>-<width>.(avif|webp) */
  photoAlt: string;
  /** Key facts below the page title; the first one names who pays. */
  facts: [Fact, Fact, Fact];
  /** True while audience, scope, costs and application are unreviewed drafts. */
  draft: boolean;
  audience: string;
  scope: string[];
  costs: Costs;
  /** One entry per step; rendered as a numbered list. */
  application: string[];
};

export const services: Service[] = [
  {
    slug: "grundpflege",
    name: "Grundpflege",
    summary: "Hilfe bei der täglichen Körperpflege, beim Essen und beim Bewegen, in Ruhe und in Ihrem Tempo.",
    photoAlt: "Gefaltete weiße Handtücher, frisch bereitgelegt",
    facts: [
      { label: "Wer zahlt", value: "Pflegekasse" },
      { label: "Voraussetzung", value: "Pflegegrad" },
      { label: "Rechtsgrundlage", value: "§ 36 SGB XI" },
    ],
    draft: true,
    audience:
      "Für Menschen, die sich nicht mehr allein waschen, anziehen oder bewegen können, und für Angehörige, die diese Pflege nicht mehr allein schaffen.",
    scope: [
      "Waschen, Duschen und Baden",
      "An- und Ausziehen",
      "Mund- und Zahnpflege, Rasieren, Haarpflege",
      "Hilfe beim Aufstehen und Zubettgehen",
      "Lagern und Bewegen, damit keine Druckstellen entstehen",
      "Hilfe beim Essen und Trinken",
      "Hilfe beim Toilettengang und Versorgung bei Inkontinenz",
      "Hautpflege und Vorbeugung, zum Beispiel gegen Stürze oder Wundliegen",
    ],
    costs: {
      text: [
        "Ab Pflegegrad 2 zahlt die Pflegekasse die Grundpflege als Pflegesachleistung, bis zu einem festen Monatsbetrag je Pflegegrad. Wir rechnen diesen Betrag mit der Pflegekasse ab.",
        "Mit Pflegegrad 1 können Sie dafür den Entlastungsbetrag einsetzen.",
        "Sie können Pflegesachleistung und Pflegegeld auch kombinieren. Was über den Betrag der Pflegekasse hinausgeht, zahlen Sie selbst. Vorher erhalten Sie von uns einen Kostenvoranschlag.",
      ],
      source: "§§ 36, 38 und 45b SGB XI",
      checkedOn: null,
    },
    application: [
      "Sie beantragen bei Ihrer Pflegekasse einen Pflegegrad. Ein Anruf dort genügt.",
      "Der Medizinische Dienst besucht Sie zu Hause und schätzt ein, wie viel Hilfe Sie brauchen.",
      "Mit dem Bescheid der Pflegekasse besprechen wir mit Ihnen, welche Einsätze Sie brauchen, und schließen einen Pflegevertrag.",
    ],
  },
  {
    slug: "behandlungspflege",
    name: "Behandlungspflege",
    summary:
      "Pflege, die Ihre Ärztin oder Ihr Arzt verordnet, zum Beispiel Verbandwechsel, Injektionen oder Medikamente.",
    photoAlt: "Stethoskop und Blutdruckmessgerät auf einem Bett",
    facts: [
      { label: "Wer zahlt", value: "Krankenkasse" },
      { label: "Voraussetzung", value: "Ärztliche Verordnung" },
      { label: "Rechtsgrundlage", value: "§ 37 SGB V" },
    ],
    draft: true,
    audience:
      "Für Menschen, denen eine Ärztin oder ein Arzt Pflege zu Hause verordnet hat, zum Beispiel nach einem Krankenhausaufenthalt. Ein Pflegegrad ist dafür nicht nötig.",
    scope: [
      "Wundversorgung und Verbandwechsel, auch bei chronischen Wunden",
      "Medikamente richten und geben",
      "Injektionen, zum Beispiel Insulin oder Heparin",
      "Kompressionsstrümpfe an- und ausziehen, Kompressionsverbände anlegen",
      "Blutzucker, Blutdruck und Puls messen",
      "Katheter und Stoma versorgen",
      "Ernährung über eine Magensonde (PEG)",
      "Inhalieren und Sauerstoff geben",
    ],
    costs: {
      text: [
        "Die Krankenkasse zahlt die Behandlungspflege als häusliche Krankenpflege, wenn eine ärztliche Verordnung vorliegt und die Krankenkasse sie genehmigt. Das gilt unabhängig davon, ob Sie einen Pflegegrad haben.",
        "Erwachsene zahlen in der Regel eine gesetzliche Zuzahlung. Wer von Zuzahlungen befreit ist, zahlt nichts dazu. Für Privatversicherte gelten die Bedingungen ihres Vertrags.",
      ],
      source: "§§ 37 und 61 SGB V",
      checkedOn: null,
    },
    application: [
      "Ihre Ärztin oder Ihr Arzt stellt eine Verordnung für häusliche Krankenpflege aus.",
      "Sie geben uns die Verordnung. Wir reichen sie bei Ihrer Krankenkasse ein.",
      "Wir beginnen mit der Pflege. Die Krankenkasse rechnet direkt mit uns ab.",
    ],
  },
  {
    slug: "hauswirtschaft",
    name: "Hauswirtschaftliche Versorgung",
    summary: "Hilfe im Haushalt, wenn Einkaufen, Putzen oder Wäsche zu viel geworden sind.",
    photoAlt: "Zwei Einkaufstüten mit Äpfeln, Bananen, Brot und Kohl",
    facts: [
      { label: "Wer zahlt", value: "Pflegekasse" },
      { label: "Voraussetzung", value: "Pflegegrad" },
      { label: "Rechtsgrundlage", value: "§§ 36, 45b SGB XI" },
    ],
    draft: true,
    audience:
      "Für Menschen mit Pflegegrad, denen der Haushalt schwerfällt, und für Angehörige, die nicht alles nebenher erledigen können.",
    scope: [
      "Einkaufen und Besorgungen",
      "Wohnung reinigen, Bad und Toilette sauber halten",
      "Mahlzeiten zubereiten, Geschirr spülen",
      "Wäsche waschen, bügeln und einräumen",
      "Betten beziehen",
      "Müll entsorgen",
      "Pflanzen gießen",
    ],
    costs: {
      text: [
        "Ab Pflegegrad 2 gehört die hauswirtschaftliche Versorgung zur Pflegesachleistung der Pflegekasse.",
        "Mit jedem Pflegegrad, also auch mit Pflegegrad 1, können Sie außerdem den Entlastungsbetrag dafür einsetzen. Beides lässt sich kombinieren.",
      ],
      source: "§§ 36 und 45b SGB XI",
      checkedOn: null,
    },
    application: [
      "Voraussetzung ist ein Pflegegrad. Haben Sie noch keinen, beantragen Sie ihn bei Ihrer Pflegekasse.",
      "Wir besprechen mit Ihnen, welche Hilfe Sie im Haushalt brauchen und wie oft.",
      "[[INHALT FEHLT: Rechnet Aram den Entlastungsbetrag direkt mit der Pflegekasse ab?]]",
    ],
  },
  {
    slug: "betreuung-und-entlastung",
    name: "Betreuung und Entlastung",
    summary: "Zeit für Gespräche, Spaziergänge und Begleitung, damit der Alltag Struktur hat und Angehörige durchatmen können.",
    photoAlt: "Teekanne und zwei Tassen auf einem Tisch",
    facts: [
      { label: "Wer zahlt", value: "Pflegekasse" },
      { label: "Voraussetzung", value: "Pflegegrad" },
      { label: "Rechtsgrundlage", value: "§ 45b SGB XI" },
    ],
    draft: true,
    audience:
      "Für Menschen mit Pflegegrad, die viel allein sind, an Demenz erkrankt sind oder Begleitung im Alltag brauchen. Und für Angehörige, die regelmäßig Zeit für sich brauchen.",
    scope: [
      "Gespräche, Vorlesen, gemeinsame Spiele und Musik",
      "Spaziergänge und kleine Ausflüge",
      "Begleitung zu Arztterminen, Behörden und Besorgungen",
      "Gedächtnistraining",
      "Betreuung von Menschen mit Demenz",
      "Hilfe bei einem festen Tagesablauf",
      "Stunden, in denen pflegende Angehörige frei haben",
    ],
    costs: {
      text: [
        "Mit jedem Pflegegrad können Sie den Entlastungsbetrag der Pflegekasse für Betreuung einsetzen. Er ist für Entlastung im Alltag bestimmt. Was Sie in einem Jahr nicht nutzen, können Sie bis zum 30. Juni des folgenden Jahres nachholen.",
        "Ab Pflegegrad 2 kann Betreuung auch Teil der Pflegesachleistung sein.",
      ],
      source: "§§ 36, 45a und 45b SGB XI",
      checkedOn: null,
    },
    application: [
      "Voraussetzung ist ein Pflegegrad. Haben Sie noch keinen, beantragen Sie ihn bei Ihrer Pflegekasse.",
      "Wir lernen Sie kennen und vereinbaren, wann und wie oft wir kommen.",
      "[[INHALT FEHLT: Rechnet Aram den Entlastungsbetrag direkt mit der Pflegekasse ab?]]",
    ],
  },
  {
    slug: "verhinderungspflege",
    name: "Verhinderungspflege",
    summary: "Wir pflegen, wenn Angehörige Urlaub machen, krank sind oder eine Pause brauchen.",
    photoAlt: "Sessel an einem hellen Fenster",
    facts: [
      { label: "Wer zahlt", value: "Pflegekasse" },
      { label: "Voraussetzung", value: "Pflegegrad 2 bis 5" },
      { label: "Rechtsgrundlage", value: "§ 39 SGB XI" },
    ],
    draft: true,
    audience:
      "Für Menschen ab Pflegegrad 2, die zu Hause von Angehörigen oder anderen privaten Personen gepflegt werden, wenn diese zeitweise verhindert sind.",
    scope: [
      "Wir übernehmen die Pflege, die sonst Ihre Angehörigen leisten.",
      "Stundenweise, tageweise oder für mehrere Wochen",
      "Geplant, zum Beispiel für einen Urlaub, oder kurzfristig, zum Beispiel bei Krankheit",
      "[[INHALT FEHLT: Ab wie vielen Stunden und zu welchen Zeiten ist Verhinderungspflege bei Aram möglich?]]",
    ],
    costs: {
      text: [
        "Die Pflegekasse zahlt die Verhinderungspflege ab Pflegegrad 2, bis zu acht Wochen im Kalenderjahr. Seit Juli 2025 gibt es dafür einen gemeinsamen Jahresbetrag für Verhinderungs- und Kurzzeitpflege. Eine Mindestzeit, in der Sie vorher zu Hause gepflegt wurden, ist nicht mehr nötig.",
        "Während der Verhinderungspflege zahlt die Pflegekasse das Pflegegeld zur Hälfte weiter.",
      ],
      source: "§§ 39 und 42a SGB XI",
      checkedOn: null,
    },
    application: [
      "Sie beantragen die Verhinderungspflege bei Ihrer Pflegekasse. Das geht auch kurzfristig.",
      "Wir besprechen mit Ihnen, an welchen Tagen und zu welchen Zeiten wir kommen.",
      "Nach dem Einsatz erhalten Sie von uns eine Rechnung, die Sie bei der Pflegekasse einreichen. [[INHALT FEHLT: Oder rechnet Aram direkt mit der Pflegekasse ab?]]",
    ],
  },
  {
    slug: "pflegeberatung",
    name: "Pflegeberatung",
    summary: "Wir beraten Pflegebedürftige und Angehörige zu Hause, helfen rund um Pflegegrad und Anträge und übernehmen die Pflichtberatung für Pflegegeld.",
    photoAlt: "Aufgeschlagenes Notizbuch mit Bleistift, daneben Brille und Kaffee",
    facts: [
      { label: "Wer zahlt", value: "Pflegekasse (Beratungsbesuch)" },
      { label: "Voraussetzung", value: "Für alle mit Pflegebedarf" },
      { label: "Rechtsgrundlage", value: "§ 37 Abs. 3 SGB XI" },
    ],
    draft: true,
    audience:
      "Für Menschen, die einen Pflegegrad beantragen wollen oder schon einen haben, und für Angehörige. Wer Pflegegeld bezieht, muss regelmäßig einen Beratungsbesuch nachweisen. Diesen Besuch übernehmen wir.",
    scope: [
      "Beratungseinsatz nach § 37 Abs. 3 SGB XI, die Pflichtberatung für Menschen, die Pflegegeld beziehen",
      "Beratung von Pflegebedürftigen und Angehörigen",
      "Hilfe beim Antrag auf einen Pflegegrad",
      "Vorbereitung auf die Begutachtung durch den Medizinischen Dienst",
      "Hilfe bei einem Widerspruch gegen den Bescheid",
      "Überblick, welche Leistungen Ihnen zustehen",
      "Hilfe bei Anträgen auf Hilfsmittel",
      "Kontakt zu Sozialdiensten und Beratungsstellen",
    ],
    costs: {
      text: [
        "Den Beratungsbesuch für Menschen, die Pflegegeld beziehen, zahlt die Pflegekasse. Wie oft er nötig ist, hängt vom Pflegegrad ab. Wird er nicht nachgewiesen, kann die Pflegekasse das Pflegegeld kürzen.",
        "[[INHALT FEHLT: Ist die übrige Beratung, zum Beispiel beim Antrag auf einen Pflegegrad, bei Aram kostenlos?]]",
      ],
      source: "§ 37 Abs. 3 SGB XI",
      checkedOn: null,
    },
    application: [
      "Rufen Sie uns an oder fordern Sie einen Rückruf an. Wir vereinbaren einen Termin bei Ihnen zu Hause.",
      "Für den Beratungsbesuch brauchen wir den Namen Ihrer Pflegekasse und Ihre Versichertennummer.",
      "Nach dem Beratungsbesuch schicken wir den Nachweis an Ihre Pflegekasse.",
    ],
  },
];

export type Payer = {
  name: string;
  basis: string;
  text: string;
};

/** "Wer zahlt was?" on the overview page; no amounts, see docs/CONTENT.md. */
export const payers: Payer[] = [
  {
    name: "Pflegekasse",
    basis: "SGB XI",
    text: "Zahlt ab Pflegegrad 2 Grundpflege, Hilfe im Haushalt und Betreuung bis zu einem festen Monatsbetrag je Pflegegrad, dazu Verhinderungspflege und den Beratungsbesuch für Pflegegeld.",
  },
  {
    name: "Krankenkasse",
    basis: "SGB V",
    text: "Zahlt Behandlungspflege, wenn Ihre Ärztin oder Ihr Arzt sie verordnet. Ein Pflegegrad ist dafür nicht nötig. Meist fällt eine gesetzliche Zuzahlung an.",
  },
  {
    name: "Entlastungsbetrag",
    basis: "§ 45b SGB XI",
    text: "Steht allen mit Pflegegrad zu, auch mit Pflegegrad 1. Sie können ihn für Betreuung und Hilfe im Haushalt einsetzen.",
  },
  {
    name: "Selbst zahlen",
    basis: "Privat",
    text: "Für Hilfe ohne Pflegegrad oder über den Betrag der Kasse hinaus. Reicht Ihr Geld nicht, kann das Sozialamt Hilfe zur Pflege zahlen.",
  },
];

/** "Noch kein Pflegegrad?" on the overview page. */
export const careGradeSteps = [
  {
    title: "Antrag stellen",
    text: "Rufen Sie Ihre Pflegekasse an. Sie finden sie bei Ihrer Krankenkasse. Leistungen gibt es ab dem Monat, in dem Sie den Antrag stellen.",
  },
  {
    title: "Begutachtung",
    text: "Der Medizinische Dienst besucht Sie zu Hause und schätzt ein, wie selbstständig Sie im Alltag sind. Privatversicherte besucht Medicproof.",
  },
  {
    title: "Bescheid",
    text: "Die Pflegekasse teilt Ihnen den Pflegegrad schriftlich mit. Sind Sie nicht einverstanden, können Sie Widerspruch einlegen.",
  },
  {
    title: "Pflege beginnen",
    text: "Wir besprechen mit Ihnen, welche Leistungen passen, und schließen einen Pflegevertrag. Behandlungspflege ist auch ohne Pflegegrad möglich.",
  },
];

/** Up to three scope items for teasers; placeholders stay on the detail page. */
export function serviceHighlights(service: Service): string[] {
  return service.scope.filter((item) => !item.startsWith("[[")).slice(0, 3);
}

export function servicePath(service: Service): string {
  return `/leistungen/${service.slug}`;
}

export function serviceBySlug(slug: string | undefined): Service | undefined {
  return services.find((service) => service.slug === slug);
}
