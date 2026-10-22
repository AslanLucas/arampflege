import { ArrowLink } from "../components/ArrowLink/ArrowLink";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { ContactPrompt } from "../components/ContactPrompt/ContactPrompt";
import { Container } from "../components/Container/Container";
import { ServiceList } from "../components/ServiceList/ServiceList";
import { StepList } from "../components/StepList/StepList";
import { callbackLink } from "../content/navigation";
import { careGradeSteps, payers, services } from "../content/services";
import { site } from "../content/site";
import { pageMeta } from "../meta";
import type { Route } from "./+types/leistungen";
import styles from "./leistungen.module.css";

const DRAFT_NOTE = "[[ENTWURF: vom Kunden fachlich prüfen]]";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    "Leistungen",
    `Grundpflege, Behandlungspflege, Hilfe im Haushalt, Betreuung, Verhinderungspflege und Pflegeberatung in ${site.serviceArea}.`,
  );

export default function Leistungen() {
  return (
    <Container>
      <Breadcrumbs current="Leistungen" />
      <h1>Leistungen</h1>
      <p className={styles.lead}>
        Wir pflegen, versorgen und begleiten Sie zu Hause. Hier sehen Sie, was wir übernehmen, wer die Kosten trägt
        und wie Sie die Leistung beantragen.
      </p>

      <ServiceList services={services} headingLevel="h2" />

      <section aria-labelledby="kostentraeger" className={styles.block}>
        <h2 id="kostentraeger">Wer zahlt was?</h2>
        <p className={styles.note}>{DRAFT_NOTE}</p>
        <p className={styles.intro}>
          Die meisten Leistungen zahlt die Pflegekasse oder die Krankenkasse. Die aktuellen Beträge für Ihren
          Pflegegrad besprechen wir persönlich mit Ihnen.
        </p>
        <ul className={styles.payers}>
          {payers.map((payer) => (
            <li key={payer.name} className={styles.payer}>
              <h3 className={styles.payerName}>{payer.name}</h3>
              <p className={styles.payerBasis}>{payer.basis}</p>
              <p className={styles.payerText}>{payer.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="pflegegrad" className={styles.block}>
        <h2 id="pflegegrad">Noch kein Pflegegrad?</h2>
        <p className={styles.note}>{DRAFT_NOTE}</p>
        <p className={styles.intro}>
          Für die meisten Leistungen der Pflegekasse brauchen Sie einen Pflegegrad. So kommen Sie dazu. Wir helfen
          Ihnen gern beim Antrag.
        </p>
        <StepList steps={careGradeSteps} />
        <p className={styles.action}>
          <ArrowLink to={callbackLink.to}>{callbackLink.label}</ArrowLink>
        </p>
      </section>

      <section aria-labelledby="nicht-im-angebot" className={styles.limits}>
        <h2 id="nicht-im-angebot">Was wir nicht anbieten</h2>
        <p>[[INHALT FEHLT: Leistungen, die der Dienst nicht anbietet, z. B. Palliativpflege oder 24-Stunden-Betreuung]]</p>
      </section>

      <div className={styles.prompt}>
        <ContactPrompt
          title="Wir beraten Sie, welche Leistungen passen"
          text="Rufen Sie uns an. Wir klären mit Ihnen, welche Unterstützung Sie brauchen und wer die Kosten trägt."
        />
      </div>
    </Container>
  );
}
