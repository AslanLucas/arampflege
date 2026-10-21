import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { ContactPanel } from "../components/ContactPanel/ContactPanel";
import { Container } from "../components/Container/Container";
import { Eyebrow } from "../components/Eyebrow/Eyebrow";
import { site } from "../content/site";
import { ContactForm } from "../features/contact/ContactForm";
import { pageMeta } from "../meta";
import { StoreProvider } from "../store/StoreProvider";
import type { Route } from "./+types/kontakt";
import styles from "./formPage.module.css";

export const meta: Route.MetaFunction = () =>
  pageMeta("Kontakt", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Kontakt() {
  return (
    <Container>
      <Breadcrumbs current="Kontakt" />
      <header className={styles.pageIntro}>
        <Eyebrow>Kontakt</Eyebrow>
        <h1>Sprechen Sie mit uns</h1>
        <p className={styles.lead}>
          Rufen Sie an oder schreiben Sie uns. Wir besprechen mit Ihnen, welche Unterstützung Sie brauchen.
        </p>
      </header>
      <div className={styles.contactGrid}>
        <section aria-labelledby="erreichbarkeit" className={styles.details}>
          <h2 id="erreichbarkeit" className={styles.columnTitle}>
            Telefon, E-Mail und Adresse
          </h2>
          <ContactPanel />
        </section>

        <section aria-labelledby="nachricht" className={styles.formCard}>
          <h2 id="nachricht" className={styles.sectionTitle}>
            Schreiben Sie uns
          </h2>
          <p className={styles.formIntro}>
            Schreiben Sie kurz, worum es geht. Wir melden uns innerhalb von {site.replyTime}.
          </p>
          <StoreProvider>
            <ContactForm />
          </StoreProvider>
        </section>
      </div>
    </Container>
  );
}
