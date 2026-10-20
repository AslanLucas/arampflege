import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { site } from "../content/site";
import { ApplicationForm } from "../features/application/ApplicationForm";
import { pageMeta } from "../meta";
import { StoreProvider } from "../store/StoreProvider";
import type { Route } from "./+types/bewerben";
import styles from "./formPage.module.css";

export const meta: Route.MetaFunction = () =>
  pageMeta("Kurzbewerbung", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Bewerben() {
  return (
    <Container>
      <Breadcrumbs trail={[{ label: "Karriere", to: "/karriere" }]} current="Kurzbewerbung" />
      <h1>Kurzbewerbung</h1>
      <p className={styles.lead}>Ein Anschreiben brauchen Sie nicht. Das Formular dauert nur wenige Minuten.</p>
      <p>
        Lieber persönlich sprechen? <a href={site.phone.href}>{site.phone.display} anrufen</a>
      </p>
      <div className={styles.form}>
        <StoreProvider>
          <ApplicationForm />
        </StoreProvider>
      </div>
    </Container>
  );
}
