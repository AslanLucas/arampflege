import type { ReactNode } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { PostalAddress } from "../components/PostalAddress/PostalAddress";
import { site } from "../content/site";
import { pageMeta } from "../meta";
import type { Route } from "./+types/datenschutz";
import styles from "./datenschutz.module.css";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    "Datenschutzerklärung",
    `Welche Daten die ${site.legalName} auf dieser Webseite verarbeitet, wofür und welche Rechte Sie haben.`,
  );

// Describes what the site really does (no cookies, no tracking, self-hosted assets, forms with
// automatic deletion). Placeholders and the pending legal review are tracked in docs/OFFENE-PUNKTE.md.
const sections = [
  { id: "verantwortlicher", title: "Verantwortlicher" },
  { id: "datenschutzbeauftragter", title: "Datenschutzbeauftragter" },
  { id: "ueberblick", title: "Das Wichtigste auf einen Blick" },
  { id: "hosting", title: "Bereitstellung der Webseite und Server-Logdateien" },
  { id: "inhalte", title: "Schriften, Bilder, Videos und Links" },
  { id: "kontaktformular", title: "Kontaktformular" },
  { id: "telefon-email", title: "Kontakt per Telefon und E-Mail" },
  { id: "bewerbungen", title: "Bewerbungen" },
  { id: "spamschutz", title: "Schutz vor Missbrauch der Formulare" },
  { id: "empfaenger", title: "Empfänger und Übermittlung in Drittländer" },
  { id: "pflicht", title: "Pflicht zur Angabe, keine automatisierten Entscheidungen" },
  { id: "rechte", title: "Ihre Rechte" },
  { id: "beschwerde", title: "Beschwerderecht bei der Aufsichtsbehörde" },
  { id: "verschluesselung", title: "Verschlüsselung" },
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

export default function Datenschutz() {
  const { requestDays, applicationDays } = site.retention;

  return (
    <Container className={styles.page}>
      <Breadcrumbs current="Datenschutzerklärung" />
      <h1>Datenschutzerklärung</h1>
      <p className={styles.lead}>
        Wir nehmen den Schutz Ihrer Daten ernst. Hier erklären wir, welche personenbezogenen Daten wir auf dieser
        Webseite verarbeiten, wofür, auf welcher Rechtsgrundlage und wie lange. Grundlage ist die
        Datenschutz-Grundverordnung (DSGVO).
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

      <Section id="verantwortlicher">
        <p>Verantwortlich für die Datenverarbeitung auf dieser Webseite ist:</p>
        <PostalAddress />
        <p>
          Vertreten durch den Geschäftsführer {site.managingDirector}
          <br />
          Telefon: <a href={site.phone.href}>{site.phone.display}</a>
          <br />
          E-Mail: <a href={site.email.href}>{site.email.display}</a>
        </p>
      </Section>

      <Section id="datenschutzbeauftragter">
        <p>
          Wir haben einen externen Datenschutzbeauftragten benannt. Sie erreichen ihn unter:
          <br />
          [[INHALT FEHLT: Name und Kontaktdaten des externen Datenschutzbeauftragten]]
        </p>
        <p>Bitte schreiben Sie dazu „Datenschutz“ in den Betreff.</p>
      </Section>

      <Section id="ueberblick">
        <ul>
          <li>Wir setzen keine Cookies und speichern nichts in Ihrem Browser.</li>
          <li>Wir verwenden keine Analyse- oder Tracking-Werkzeuge und keine Werbung.</li>
          <li>
            Schriften, Bilder, Videos und die Karte liefern wir von unserem eigenen Server aus. Beim Aufruf der Seite
            werden keine Daten an andere Anbieter übertragen.
          </li>
          <li>
            Angaben aus den Formularen verwenden wir nur, um Ihre Anfrage oder Bewerbung zu bearbeiten, und löschen sie
            automatisch nach {requestDays} beziehungsweise {applicationDays} Tagen.
          </li>
        </ul>
      </Section>

      <Section id="hosting">
        <p>
          Unsere Webseite liegt bei einem Hosting-Anbieter mit Sitz und Rechenzentrum in der Europäischen Union:
          <br />
          [[INHALT FEHLT: Name und Anschrift des Hosting-Anbieters]]
        </p>
        <p>
          Mit dem Anbieter haben wir einen Vertrag über die Auftragsverarbeitung nach Art. 28 DSGVO geschlossen. Er
          verarbeitet die Daten nur nach unserer Weisung.
        </p>
        <p>
          Beim Aufruf der Seite überträgt Ihr Browser technisch notwendige Daten an den Server. Dabei werden in
          Protokolldateien gespeichert:
        </p>
        <ul>
          <li>IP-Adresse</li>
          <li>Datum und Uhrzeit des Abrufs</li>
          <li>aufgerufene Seite oder Datei</li>
          <li>übertragene Datenmenge und Statuscode</li>
          <li>Browser und Betriebssystem</li>
          <li>die zuvor besuchte Seite (Referrer), wenn Ihr Browser sie mitsendet</li>
        </ul>
        <p>
          Wir brauchen diese Daten, um die Seite sicher und stabil auszuliefern und Angriffe zu erkennen.
          Rechtsgrundlage ist unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO. Die Protokolldateien werden
          nach [[INHALT FEHLT: Speicherdauer der Server-Logdateien beim Hosting-Anbieter]] gelöscht. Wir führen sie nicht
          mit anderen Daten zusammen.
        </p>
      </Section>

      <Section id="inhalte">
        <p>
          Schriften, Fotos, Videos, Animationen und das Kartenbild liegen auf unserem eigenen Server. Ihr Browser lädt
          sie von dort, ohne Daten an Google, Kartendienste oder andere Anbieter zu senden.
        </p>
        <p>
          Die Seite enthält Links zu anderen Angeboten, zum Beispiel „In Google Maps öffnen“ oder den Hinweis auf die
          Webagentur Eulah IT. Erst wenn Sie einen solchen Link anklicken, verlassen Sie unsere Seite. Dann gilt die
          Datenschutzerklärung des jeweiligen Anbieters.
        </p>
      </Section>

      <Section id="kontaktformular">
        <p>Wenn Sie uns über das Kontaktformular schreiben, verarbeiten wir:</p>
        <ul>
          <li>Ihren Namen</li>
          <li>Ihre Telefonnummer und/oder E-Mail-Adresse</li>
          <li>das gewählte Thema, wenn Sie eines auswählen</li>
          <li>Ihre Nachricht</li>
          <li>den Zeitpunkt der Anfrage und Ihrer Einwilligung</li>
        </ul>
        <p>
          Wir verwenden diese Angaben, um Ihre Anfrage zu beantworten und gegebenenfalls eine Versorgung vorzubereiten.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anfrage vor einem Vertrag) und, falls Sie keinen Vertrag
          anstreben, unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO, Ihre Anfrage zu beantworten.
        </p>
        <p>
          Ihre Nachricht kann Angaben zur Gesundheit enthalten. Diese besonders geschützten Daten verarbeiten wir nur
          mit Ihrer ausdrücklichen Einwilligung nach Art. 9 Abs. 2 lit. a DSGVO, die Sie mit dem Häkchen im Formular
          erteilen. Bitte schreiben Sie nur das Nötigste; Einzelheiten besprechen wir persönlich mit Ihnen.
        </p>
        <p>
          Sie können Ihre Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen, zum Beispiel per E-Mail an{" "}
          <a href={site.email.href}>{site.email.display}</a>. Die bis dahin erfolgte Verarbeitung bleibt rechtmäßig.
        </p>
        <p>
          Die Angaben werden in unserer Datenbank gespeichert und nach {requestDays} Tagen automatisch gelöscht. Kommt
          ein Pflegevertrag zustande, übernehmen wir die nötigen Angaben in Ihre Kundenakte; dafür gelten die
          gesetzlichen Aufbewahrungsfristen.
        </p>
        <p>
          Über eine neue Anfrage informiert uns eine E-Mail. Sie enthält nur eine Vorgangsnummer und keine Angaben aus
          Ihrer Anfrage.
        </p>
      </Section>

      <Section id="telefon-email">
        <p>
          Wenn Sie uns anrufen oder eine E-Mail schreiben, verarbeiten wir Ihre Angaben, um Ihr Anliegen zu bearbeiten.
          Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn es um einen Vertrag oder dessen Anbahnung geht, sonst
          unser berechtigtes Interesse nach Art. 6 Abs. 1 lit. f DSGVO, Anfragen zu beantworten. Angaben zur Gesundheit
          verarbeiten wir nach Art. 9 Abs. 2 lit. h DSGVO, soweit sie für die Versorgung nötig sind.
        </p>
        <p>
          E-Mails empfangen wir über unseren E-Mail-Anbieter [[INHALT FEHLT: Name und Anschrift des E-Mail-Anbieters]],
          mit dem ein Vertrag über die Auftragsverarbeitung besteht. Wir löschen die Angaben, sobald sie für die
          Bearbeitung nicht mehr nötig sind und keine gesetzlichen Aufbewahrungsfristen entgegenstehen.
        </p>
      </Section>

      <Section id="bewerbungen">
        <p>Wenn Sie sich über unser Bewerbungsformular bewerben, verarbeiten wir:</p>
        <ul>
          <li>die gewünschte Stelle oder den Hinweis „Initiativbewerbung“</li>
          <li>Ihren Namen und Ihre Telefonnummer</li>
          <li>Ihre E-Mail-Adresse, wenn Sie sie angeben</li>
          <li>Ihre Qualifikation</li>
          <li>Ihre Nachricht und Ihren Lebenslauf, wenn Sie beides angeben</li>
          <li>den Zeitpunkt der Bewerbung und Ihrer Einwilligung</li>
        </ul>
        <p>
          Wir verwenden diese Angaben, um über die Einstellung zu entscheiden. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
          DSGVO (Anbahnung eines Beschäftigungsverhältnisses). Enthält Ihre Bewerbung
          freiwillig besondere Kategorien von Daten, etwa zur Gesundheit oder einer Schwerbehinderung, verarbeiten wir
          sie auf Grundlage Ihrer Einwilligung nach Art. 9 Abs. 2 lit. a DSGVO.
        </p>
        <p>
          Ihren Lebenslauf speichern wir verschlüsselt. Einsehen können ihn nur die Personen, die über Ihre Bewerbung
          entscheiden.
        </p>
        <p>
          Kommt kein Arbeitsverhältnis zustande, löschen wir Ihre Bewerbung samt Lebenslauf automatisch nach{" "}
          {applicationDays} Tagen. So können wir auf mögliche Ansprüche nach dem Allgemeinen Gleichbehandlungsgesetz
          (AGG) reagieren. Stellen wir Sie ein, übernehmen wir die nötigen Angaben in Ihre Personalakte.
        </p>
        <p>
          Sie können Ihre Bewerbung und Ihre Einwilligung jederzeit zurückziehen, zum Beispiel per E-Mail an{" "}
          <a href={site.email.href}>{site.email.display}</a>.
        </p>
      </Section>

      <Section id="spamschutz">
        <p>Damit die Formulare nicht von automatischen Programmen missbraucht werden, verwenden wir:</p>
        <ul>
          <li>ein für Menschen unsichtbares Feld, das nur automatische Programme ausfüllen,</li>
          <li>
            einen verschlüsselten Zeitstempel, mit dem der Server prüft, dass ein Formular nicht in weniger als drei
            Sekunden abgeschickt wurde,
          </li>
          <li>
            eine Begrenzung der Anfragen je IP-Adresse. Die IP-Adresse wird dafür nur kurz im Arbeitsspeicher gehalten
            und nicht gespeichert.
          </li>
        </ul>
        <p>
          Wir verwenden dafür keine Cookies und keine Dienste anderer Anbieter wie Captchas. Rechtsgrundlage ist unser
          berechtigtes Interesse an sicheren Formularen nach Art. 6 Abs. 1 lit. f DSGVO.
        </p>
      </Section>

      <Section id="empfaenger">
        <p>
          Ihre Angaben sehen bei uns nur die Mitarbeitenden, die sie für die Bearbeitung brauchen. Unser Hosting-Anbieter
          und unser E-Mail-Anbieter verarbeiten Daten als Auftragsverarbeiter nach unserer Weisung. Darüber hinaus geben
          wir Ihre Daten nur weiter, wenn Sie eingewilligt haben oder wir gesetzlich dazu verpflichtet sind.
        </p>
        <p>Wir übermitteln keine Daten in Länder außerhalb der Europäischen Union oder des Europäischen Wirtschaftsraums.</p>
      </Section>

      <Section id="pflicht">
        <p>
          Sie müssen uns keine Daten geben. Ohne Ihre Kontaktdaten können wir eine Anfrage oder Bewerbung allerdings
          nicht bearbeiten.
        </p>
        <p>Wir treffen keine automatisierten Entscheidungen und erstellen keine Profile nach Art. 22 DSGVO.</p>
      </Section>

      <Section id="rechte">
        <p>Sie haben gegenüber uns jederzeit das Recht auf:</p>
        <ul>
          <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
          <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
          <li>Löschung Ihrer Daten (Art. 17 DSGVO)</li>
          <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
          <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
          <li>Widerruf einer Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
        </ul>
        <div className={styles.highlight}>
          <h3>Widerspruchsrecht</h3>
          <p>
            Verarbeiten wir Ihre Daten auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO), können
            Sie dieser Verarbeitung aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit widersprechen
            (Art. 21 DSGVO). Wir verarbeiten die Daten dann nicht mehr, es sei denn, wir können zwingende schutzwürdige
            Gründe nachweisen.
          </p>
        </div>
        <p>
          Für alle Anliegen genügt eine formlose Nachricht an <a href={site.email.href}>{site.email.display}</a> oder an
          unsere Anschrift.
        </p>
      </Section>

      <Section id="beschwerde">
        <p>
          Sie können sich bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO). Für uns zuständig ist:
        </p>
        <p>
          Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen
          <br />
          Kavalleriestraße 2–4
          <br />
          40213 Düsseldorf
          <br />
          Telefon: <a href="tel:+492113842400">0211 38424-0</a>
          <br />
          E-Mail: <a href="mailto:poststelle@ldi.nrw.de">poststelle@ldi.nrw.de</a>
        </p>
      </Section>

      <Section id="verschluesselung">
        <p>
          Die Seite und alle Formulare werden verschlüsselt übertragen (TLS). Sie erkennen das an „https://“ und dem
          Schloss-Symbol in der Adresszeile Ihres Browsers.
        </p>
      </Section>

      <p className={styles.stand}>Stand: Oktober 2026</p>
    </Container>
  );
}
