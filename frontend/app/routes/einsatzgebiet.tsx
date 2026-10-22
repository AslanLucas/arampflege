import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { ContactPrompt } from "../components/ContactPrompt/ContactPrompt";
import { Container } from "../components/Container/Container";
import { Eyebrow } from "../components/Eyebrow/Eyebrow";
import { ServiceAreaMap } from "../components/ServiceAreaMap/ServiceAreaMap";
import { site } from "../content/site";
import { pageMeta } from "../meta";
import type { Route } from "./+types/einsatzgebiet";
import styles from "./einsatzgebiet.module.css";

const placeNames = site.places.map((place) => place.name).join(", ");

export const meta: Route.MetaFunction = () =>
  pageMeta("Einsatzgebiet", `Ambulante Pflege von ${site.legalName} in ${placeNames} und Umgebung.`);

export default function Einsatzgebiet() {
  return (
    <>
      <div className={styles.hero}>
        <Container>
          <Breadcrumbs current="Einsatzgebiet" />
          <Eyebrow>Kommen wir auch zu Ihnen?</Eyebrow>
          <h1 className={styles.title}>Einsatzgebiet</h1>
          <p className={styles.lead}>
            Wir pflegen Menschen zu Hause in Gronau und <span className={styles.nowrap}>Gronau-Epe</span> sowie in den umliegenden Orten.
          </p>
        </Container>
      </div>

      <Container>
        <section aria-labelledby="orte" className={styles.section}>
          <h2 id="orte">Hier sind wir für Sie da</h2>
          <div className={styles.map}>
            <ServiceAreaMap />
          </div>
          <p className={styles.note}>
            Wir versorgen auch weitere Orte in der Umgebung. Rufen Sie uns an, dann sagen wir Ihnen, ob wir zu Ihnen
            kommen: <a href={site.phone.href}>{site.phone.display}</a>
          </p>
        </section>

        <div className={styles.prompt}>
          <ContactPrompt
            title="Sprechen Sie mit uns über Ihre Pflege"
            text="Rufen Sie uns an. Wir klären mit Ihnen, welche Unterstützung Sie brauchen und wann wir kommen können."
          />
        </div>
      </Container>
    </>
  );
}
