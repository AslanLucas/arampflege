import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { DetailList } from "../components/DetailList/DetailList";
import { PostalAddress } from "../components/PostalAddress/PostalAddress";
import { callbackLink } from "../content/navigation";
import { site } from "../content/site";
import { ContactForm } from "../features/contact/ContactForm";
import { pageMeta } from "../meta";
import { StoreProvider } from "../store/StoreProvider";
import type { Route } from "./+types/kontakt";
import { Link } from "react-router";
import styles from "./formPage.module.css";

export const meta: Route.MetaFunction = () =>
  pageMeta("Kontakt", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Kontakt() {
  return (
    <Container>
      <Breadcrumbs current="Kontakt" />
      <h1>Kontakt</h1>
      <div className={styles.contactGrid}>
        <section aria-labelledby="erreichbarkeit" className={styles.details}>
          <h2 id="erreichbarkeit" className={styles.sectionTitle}>
            Telefon, Adresse und Bürozeiten
          </h2>
          <PostalAddress />
          <DetailList
            details={[
              {
                term: "Telefon",
                description: (
                  <a href={site.phone.href} className={styles.numeric}>
                    {site.phone.display}
                  </a>
                ),
              },
              { term: "E-Mail", description: <a href={site.email.href}>{site.email.display}</a> },
              { term: "Bürozeiten", description: site.officeHours },
              { term: "Rufbereitschaft", description: site.onCallService },
            ]}
          />
          <p>
            Sie möchten lieber angerufen werden? <Link to={callbackLink.to}>{callbackLink.label}</Link>
          </p>
        </section>

        <section aria-labelledby="nachricht" className={styles.formColumn}>
          <h2 id="nachricht" className={styles.sectionTitle}>
            Schreiben Sie uns
          </h2>
          <StoreProvider>
            <ContactForm />
          </StoreProvider>
        </section>
      </div>
    </Container>
  );
}
