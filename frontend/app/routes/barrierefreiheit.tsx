import type { ReactNode } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { PostalAddress } from "../components/PostalAddress/PostalAddress";
import { site } from "../content/site";
import { pageMeta } from "../meta";
import type { Route } from "./+types/barrierefreiheit";
import styles from "./legalPage.module.css";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    "Erklärung zur Barrierefreiheit",
    `Wie barrierefrei die Webseite der ${site.legalName} ist, welche Barrieren es noch gibt und wie Sie uns erreichen.`,
  );

// Self-assessment of 2026-10-23 against WCAG 2.2 AA. Keep the known barriers in sync with the
// site; legal review and the yearly check of the micro-enterprise status are in docs/OFFENE-PUNKTE.md.
const CHECKED_ON = "23. Oktober 2026";

const sections = [
  { id: "geltungsbereich", title: "Geltungsbereich" },
  { id: "rechtsrahmen", title: "Rechtlicher Rahmen" },
  { id: "standards", title: "Angewandte Standards" },
  { id: "stand", title: "Stand der Vereinbarkeit" },
  { id: "pruefung", title: "So haben wir geprüft" },
  { id: "umsetzung", title: "Was die Webseite bietet" },
  { id: "barrieren", title: "Bekannte Barrieren" },
  { id: "ausnahmen", title: "Ausnahmen" },
  { id: "feedback", title: "Barrieren melden" },
  { id: "durchsetzung", title: "Marktüberwachung und Schlichtung" },
] as const;

type SectionId = (typeof sections)[number]["id"];

function Section({ id, children }: { id: SectionId; children: ReactNode }) {
  const section = sections.find((candidate) => candidate.id === id);
  return (
    <section aria-labelledby={`${id}-titel`} className={styles.section}>
      <h2 id={`${id}-titel`}>{section?.title}</h2>
      {children}
    </section>
  );
}

export default function Barrierefreiheit() {
  return (
    <Container className={styles.page}>
      <Breadcrumbs current="Erklärung zur Barrierefreiheit" />
      <h1>Erklärung zur Barrierefreiheit</h1>
      <p className={styles.lead}>
        Unsere Webseite soll für alle Menschen gut nutzbar sein, auch mit eingeschränktem Sehen, Hören oder
        Bewegen und mit Hilfsmitteln wie Screenreadern oder Vergrößerung. Hier beschreiben wir, wie weit uns das
        gelingt, wo es noch Barrieren gibt und wie Sie uns Probleme melden können.
      </p>

      <nav aria-labelledby="inhalt-titel" className={styles.toc}>
        <h2 id="inhalt-titel" className={styles.tocTitle}>
          Inhalt
        </h2>
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}-titel`}>{section.title}</a>
            </li>
          ))}
        </ol>
      </nav>

      <Section id="geltungsbereich">
        <p>
          Diese Erklärung gilt für die Webseite der {site.legalName} mit allen Unterseiten, einschließlich des
          Kontaktformulars und des Bewerbungsformulars. Sie gilt nicht für fremde Webseiten, auf die wir verlinken.
        </p>
      </Section>

      <Section id="rechtsrahmen">
        <p>
          Das Barrierefreiheitsstärkungsgesetz (BFSG) und die zugehörige Verordnung (BFSGV) verpflichten seit dem 28. Juni
          2025 bestimmte Unternehmen, ihre Produkte und Dienstleistungen barrierefrei anzubieten.
        </p>
        <p>
          Die {site.legalName} ist ein Kleinstunternehmen im Sinne des BFSG: Sie beschäftigt weniger als zehn Personen
          und hat einen Jahresumsatz beziehungsweise eine Jahresbilanzsumme von höchstens zwei Millionen Euro. Für
          Kleinstunternehmen, die Dienstleistungen anbieten, gelten die Anforderungen des BFSG nicht (§ 3 Abs. 3 BFSG).
        </p>
        <p>
          Wir setzen die Anforderungen trotzdem freiwillig um, weil viele unserer Besucherinnen und Besucher auf eine
          barrierefreie Seite angewiesen sind. Diese Erklärung orientiert sich an den Informationen, die Anlage 3 der
          BFSGV vorsieht.
        </p>
      </Section>

      <Section id="standards">
        <p>Grundlage für Gestaltung und Prüfung sind:</p>
        <ul>
          <li>Web Content Accessibility Guidelines (WCAG) 2.2, Konformitätsstufe AA</li>
          <li>
            die europäische Norm EN 301 549 V3.2.1, die für Webseiten auf die WCAG verweist und als harmonisierte
            Norm für das BFSG gilt
          </li>
        </ul>
        <p>
          Die Barrierefreie-Informationstechnik-Verordnung (BITV 2.0) gilt nur für öffentliche Stellen und damit nicht
          für uns. Sie verweist auf dieselben Anforderungen.
        </p>
      </Section>

      <Section id="stand">
        <p>
          Diese Webseite ist mit den Anforderungen der WCAG 2.2 Stufe AA <strong>teilweise vereinbar</strong>. Die
          Gründe stehen unter <a href="#barrieren-titel">Bekannte Barrieren</a>.
        </p>
      </Section>

      <Section id="pruefung">
        <p>Die Erklärung beruht auf einer Selbstbewertung vom {CHECKED_ON}. Dabei haben wir:</p>
        <ul>
          <li>
            jede Seite automatisch mit dem Prüfwerkzeug axe-core getestet, in Ansichten für Computer, Tablet und
            Smartphone (1280, 768 und 360 Pixel breit),
          </li>
          <li>geprüft, dass jede Seite bei 200 % Vergrößerung ohne waagerechtes Scrollen funktioniert,</li>
          <li>die wichtigsten Abläufe nur mit der Tastatur bedient, zum Beispiel Menü, Anruf und Formulare,</li>
          <li>die Seiten zusätzlich mit Google Lighthouse auf Barrierefreiheit geprüft.</li>
        </ul>
        <p>
          Eine Prüfung durch eine unabhängige Prüfstelle und Tests mit Menschen, die Screenreader oder andere
          Hilfsmittel nutzen, haben noch nicht stattgefunden. Automatische Tests finden nicht alle Barrieren.
        </p>
      </Section>

      <Section id="umsetzung">
        <ul>
          <li>Alle Funktionen lassen sich mit der Tastatur bedienen. Der Fokus ist jederzeit gut sichtbar.</li>
          <li>Ein Link „Zum Inhalt springen“ führt an der Navigation vorbei direkt zum Inhalt.</li>
          <li>Jede Seite hat eine klare Überschriftenstruktur und benannte Bereiche für Screenreader.</li>
          <li>Texte und Bedienelemente haben ausreichende Farbkontraste.</li>
          <li>
            Sie können die Seite stark vergrößern. Der Inhalt passt sich an, ohne dass Sie seitlich scrollen müssen.
          </li>
          <li>Schaltflächen und Links sind groß genug, um sie auch mit eingeschränkter Feinmotorik zu treffen.</li>
          <li>
            Bilder haben Textbeschreibungen. Rein schmückende Bilder und Animationen werden von Screenreadern übersprungen.
          </li>
          <li>
            Das Hintergrundvideo auf der Startseite hat keinen Ton und lässt sich jederzeit anhalten. Animationen laufen
            höchstens fünf Sekunden.
          </li>
          <li>
            Wenn Sie in Ihrem Gerät „Bewegung reduzieren“ eingestellt haben, zeigen wir keine Animationen und kein Video.
          </li>
          <li>
            Formularfelder sind beschriftet. Fehler werden am Feld und in einer Übersicht genannt, die direkt zum
            jeweiligen Feld führt.
          </li>
          <li>
            Die Formulare setzen Sie nicht unter Zeitdruck: Ein geöffnetes Formular bleibt 24 Stunden gültig.
          </li>
          <li>
            Die Karte unseres Einsatzgebiets gibt es zusätzlich als Liste der Orte mit Postleitzahl: auf der Seite
            „Einsatzgebiet“ sichtbar neben der Karte, auf der Startseite für Screenreader.
          </li>
          <li>Die Sprache der Seite ist als Deutsch festgelegt, damit Vorlesefunktionen richtig aussprechen.</li>
        </ul>
      </Section>

      <Section id="barrieren">
        <p>Folgende Inhalte sind noch nicht oder nicht vollständig barrierefrei:</p>
        <ul>
          <li>
            <strong>Keine Leichte Sprache und keine Gebärdensprache:</strong> Wir bieten bisher keine Texte in Leichter
            Sprache und keine Videos in Deutscher Gebärdensprache an. Wir schreiben aber möglichst einfach und erklären
            Fachbegriffe.
          </li>
          <li>
            <strong>Karte des Einsatzgebiets:</strong> Die ungefähre Fahrstrecke zu einem Ort erscheint nur, wenn Sie mit
            der Maus auf die Karte zeigen. Alle Orte stehen zusätzlich in einer Liste; die Entfernung
            nennen wir Ihnen gern am Telefon.
          </li>
          <li>
            <strong>Nicht mit Hilfsmitteln durch Betroffene getestet:</strong> Deshalb können Barrieren bestehen, die uns
            noch nicht bekannt sind. Bitte melden Sie uns solche Probleme.
          </li>
        </ul>
        <p>
          Alle Inhalte erhalten Sie auf Wunsch auch persönlich, telefonisch oder per Post. Rufen Sie uns an:{" "}
          <a href={site.phone.href}>{site.phone.display}</a>.
        </p>
      </Section>

      <Section id="ausnahmen">
        <ul>
          <li>
            <strong>Kleinstunternehmen:</strong> Die Pflichten des BFSG gelten für uns als Kleinstunternehmen nicht
            (siehe <a href="#rechtsrahmen-titel">Rechtlicher Rahmen</a>). Die freiwillige Umsetzung ändert daran nichts.
          </li>
          <li>
            <strong>Inhalte anderer Anbieter:</strong> Für Seiten, auf die wir nur verlinken, zum Beispiel Google Maps
            oder die Seite unserer Webagentur, sind deren Anbieter verantwortlich.
          </li>
        </ul>
        <p>Darüber hinaus berufen wir uns auf keine Ausnahme, auch nicht auf eine unverhältnismäßige Belastung.</p>
      </Section>

      <Section id="feedback">
        <p>
          Ist Ihnen eine Barriere aufgefallen, oder brauchen Sie einen Inhalt in einer anderen Form? Schreiben Sie uns
          oder rufen Sie an. Wir antworten innerhalb von {site.replyTime}.
        </p>
        <PostalAddress />
        <p>
          Telefon: <a href={site.phone.href}>{site.phone.display}</a>
          <br />
          E-Mail: <a href={site.email.href}>{site.email.display}</a>
        </p>
      </Section>

      <Section id="durchsetzung">
        <p>
          Sind Sie mit unserer Antwort nicht zufrieden, können Sie sich an die zuständige Marktüberwachungsbehörde
          wenden:
        </p>
        <p>
          Marktüberwachungsstelle der Länder für die Barrierefreiheit von Produkten und Dienstleistungen (MLBF AöR)
          <br />
          Carl-Miller-Straße 6
          <br />
          39112 Magdeburg
          <br />
          Telefon: <a href="tel:+4939128923023">0391 28923023</a>
          <br />
          E-Mail: <a href="mailto:kontakt@mlbf-barrierefrei.de">kontakt@mlbf-barrierefrei.de</a>
        </p>
        <p>
          Verbraucherinnen und Verbraucher können außerdem ein Schlichtungsverfahren beantragen (§ 34 BFSG):
        </p>
        <p>
          Schlichtungsstelle nach dem Behindertengleichstellungsgesetz bei dem Beauftragten der Bundesregierung für die
          Belange von Menschen mit Behinderungen
          <br />
          Mauerstraße 53
          <br />
          10117 Berlin
          <br />
          Telefon: <a href="tel:+4930185272805">030 18527-2805</a>
          <br />
          E-Mail: <a href="mailto:info@schlichtungsstelle-bgg.de">info@schlichtungsstelle-bgg.de</a>
        </p>
      </Section>

      <p className={styles.stand}>
        Erstellt am {CHECKED_ON}. Zuletzt geprüft am {CHECKED_ON}.
      </p>
    </Container>
  );
}
