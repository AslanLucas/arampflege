import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { site } from "../content/site";
import { CallbackForm } from "../features/callback/CallbackForm";
import { pageMeta } from "../meta";
import { StoreProvider } from "../store/StoreProvider";
import type { Route } from "./+types/rueckruf";
import styles from "./formPage.module.css";

export const meta: Route.MetaFunction = () =>
  pageMeta("Rückruf anfordern", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Rueckruf() {
  return (
    <Container>
      <Breadcrumbs current="Rückruf anfordern" />
      <h1>Rückruf anfordern</h1>
      <p className={styles.lead}>
        Hinterlassen Sie Ihren Namen und Ihre Telefonnummer. Wir rufen Sie innerhalb von [[INHALT FEHLT:
        Rückruffrist]] zurück.
      </p>
      <p>
        Lieber gleich sprechen? <a href={site.phone.href}>{site.phone.display} anrufen</a>
      </p>
      <div className={styles.form}>
        <StoreProvider>
          <CallbackForm />
        </StoreProvider>
      </div>
    </Container>
  );
}
