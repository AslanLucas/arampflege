import { ArrowLink } from "../components/ArrowLink/ArrowLink";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { ButtonLink } from "../components/ButtonLink/ButtonLink";
import { ContactPrompt } from "../components/ContactPrompt/ContactPrompt";
import { Container } from "../components/Container/Container";
import { JobList } from "../components/JobList/JobList";
import { careersIntro } from "../content/careers";
import { applyPath, jobs } from "../content/jobs";
import { pageMeta } from "../meta";
import type { Route } from "./+types/karriere";
import styles from "./karriere.module.css";

export const meta: Route.MetaFunction = () =>
  pageMeta("Karriere", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Karriere() {
  return (
    <Container className={styles.page}>
      <Breadcrumbs current="Karriere" />
      <h1>Karriere</h1>
      <p className={styles.lead}>{careersIntro}</p>

      <section aria-labelledby="offene-stellen" className={styles.section}>
        <h2 id="offene-stellen">Offene Stellen</h2>
        {jobs.length > 0 ? (
          <>
            <JobList jobs={jobs} />
            <p className={styles.action}>
              <ArrowLink to={applyPath()}>Initiativ bewerben</ArrowLink>
            </p>
          </>
        ) : (
          <>
            <p>[[INHALT FEHLT: aktuelle Stellen]]</p>
            <p>Sie können sich jederzeit auch ohne bestimmte Stellenanzeige bei uns bewerben.</p>
            <p className={styles.action}>
              <ButtonLink to={applyPath()}>Initiativ bewerben</ButtonLink>
            </p>
          </>
        )}
      </section>

      <section aria-labelledby="so-bewerben" className={styles.section}>
        <h2 id="so-bewerben">So bewerben Sie sich</h2>
        <p>
          Die Kurzbewerbung füllen Sie in wenigen Minuten am Smartphone aus. Ein Anschreiben brauchen Sie nicht. Ein
          Lebenslauf hilft uns, ist aber keine Pflicht.
        </p>
      </section>

      <div className={styles.prompt}>
        <ContactPrompt
          title="Sprechen Sie vorher mit uns"
          text="Sie haben Fragen zu einer Stelle oder zur Arbeit bei uns? Rufen Sie uns an."
        />
      </div>
    </Container>
  );
}
