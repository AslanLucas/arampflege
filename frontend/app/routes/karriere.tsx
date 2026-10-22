import { ArrowLink } from "../components/ArrowLink/ArrowLink";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { ButtonLink } from "../components/ButtonLink/ButtonLink";
import { ContactPrompt } from "../components/ContactPrompt/ContactPrompt";
import { Container } from "../components/Container/Container";
import { EmployerPromises } from "../components/EmployerPromises/EmployerPromises";
import { JobList } from "../components/JobList/JobList";
import { careersIntro } from "../content/careers";
import { applyPath, jobs } from "../content/jobs";
import { site } from "../content/site";
import { pageMeta } from "../meta";
import type { Route } from "./+types/karriere";
import styles from "./karriere.module.css";

export const meta: Route.MetaFunction = () =>
  pageMeta(
    "Karriere",
    "Stellen bei der Aram Pflege GmbH in Gronau: Pflegefachkraft, Pflegehilfskraft, Hauswirtschafts- und Betreuungskraft.",
  );

export default function Karriere() {
  return (
    <Container className={styles.page}>
      <Breadcrumbs current="Karriere" />
      <div className={styles.intro}>
        <div>
          <h1>Karriere</h1>
          <p className={styles.lead}>{careersIntro}</p>
        </div>
        {/* Stock photo, exception from AGENTS.md (decision 2026-10-22); licence in public/images/karriere/ */}
        <picture className={styles.photo}>
          <source
            type="image/avif"
            srcSet="/images/karriere/bewerbungsgespraech-640.avif 640w, /images/karriere/bewerbungsgespraech-1064.avif 1064w"
            sizes="(min-width: 60rem) 40vw, 100vw"
          />
          <img
            src="/images/karriere/bewerbungsgespraech-640.webp"
            srcSet="/images/karriere/bewerbungsgespraech-640.webp 640w, /images/karriere/bewerbungsgespraech-1064.webp 1064w"
            sizes="(min-width: 60rem) 40vw, 100vw"
            width={1064}
            height={709}
            alt="Händedruck an einem Schreibtisch zum Abschluss eines Bewerbungsgesprächs"
            decoding="async"
          />
        </picture>
      </div>

      <div className={styles.wide}>
        <EmployerPromises />
      </div>

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
            <p>Du kannst dich jederzeit auch ohne bestimmte Stellenanzeige bei uns bewerben.</p>
            <p className={styles.action}>
              <ButtonLink to={applyPath()}>Initiativ bewerben</ButtonLink>
            </p>
          </>
        )}
      </section>

      <section aria-labelledby="so-bewerben" className={styles.section}>
        <h2 id="so-bewerben">So bewirbst du dich</h2>
        <p>
          Die Kurzbewerbung füllst du in wenigen Minuten am Smartphone aus. Ein Anschreiben brauchst du nicht. Ein
          Lebenslauf hilft uns, ist aber keine Pflicht.
        </p>
        <p>
          Du kannst deine Bewerbung auch per E-Mail schicken: <a href={site.email.href}>{site.email.display}</a>
        </p>
      </section>

      <div className={styles.prompt}>
        <ContactPrompt
          title="Sprich vorher mit uns"
          text="Du hast Fragen zu einer Stelle oder zur Arbeit bei uns? Ruf uns an."
        />
      </div>
    </Container>
  );
}
