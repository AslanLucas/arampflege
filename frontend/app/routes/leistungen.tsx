import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { ContactPrompt } from "../components/ContactPrompt/ContactPrompt";
import { Container } from "../components/Container/Container";
import { ServiceList } from "../components/ServiceList/ServiceList";
import { services } from "../content/services";
import { pageMeta } from "../meta";
import type { Route } from "./+types/leistungen";
import styles from "./leistungen.module.css";

export const meta: Route.MetaFunction = () =>
  pageMeta("Leistungen", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Leistungen() {
  return (
    <Container>
      <Breadcrumbs current="Leistungen" />
      <h1>Leistungen</h1>
      <p className={styles.lead}>[[INHALT FEHLT: Einleitung zur Leistungsübersicht]]</p>
      <p className={styles.note}>[[INHALT FEHLT: Leistungen vom Kunden bestätigen]]</p>

      <ServiceList services={services} headingLevel="h2" />

      <section aria-labelledby="nicht-im-angebot" className={styles.limits}>
        <h2 id="nicht-im-angebot">Was wir nicht anbieten</h2>
        <p>[[INHALT FEHLT: Leistungen, die der Dienst nicht anbietet, z. B. 24-Stunden-Betreuung]]</p>
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
