import type { CSSProperties } from "react";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { ContactPrompt } from "../components/ContactPrompt/ContactPrompt";
import { Container } from "../components/Container/Container";
import { Eyebrow } from "../components/Eyebrow/Eyebrow";
import { CheckIcon } from "../components/Icon/icons";
import { LottieScene } from "../components/LottieScene/LottieScene";
import { PhotoPlaceholder } from "../components/PhotoPlaceholder/PhotoPlaceholder";
import { Reveal } from "../components/Reveal/Reveal";
import { about } from "../content/about";
import { site } from "../content/site";
import { useReveal } from "../hooks/useReveal";
import { cx } from "../utils/cx";
import { pageMeta } from "../meta";
import type { Route } from "./+types/ueber-uns";
import styles from "./ueber-uns.module.css";

export const meta: Route.MetaFunction = () =>
  pageMeta("Über uns", `${site.legalName}: ambulanter Pflegedienst aus Gronau für Gronau, Epe und Umgebung.`);

function Promises() {
  const ref = useReveal<HTMLUListElement>();
  return (
    <ul ref={ref} className={styles.promises}>
      {about.promises.map((promise, index) => (
        <li key={promise.title} style={{ "--n": index } as CSSProperties}>
          <span className={styles.check} aria-hidden="true">
            <CheckIcon size={18} />
          </span>
          <h3 className={styles.promiseTitle}>{promise.title}</h3>
          <p className={styles.promiseText}>{promise.text}</p>
        </li>
      ))}
    </ul>
  );
}

export default function UeberUns() {
  return (
    <>
      <div className={styles.hero}>
        <Container className={styles.heroGrid}>
          <div>
            <Breadcrumbs current="Über uns" />
            <Eyebrow>{about.start} in Gronau</Eyebrow>
            <h1 className={styles.title}>Über uns</h1>
            <figure className={styles.motto}>
              <blockquote>
                <p>„{about.motto}“</p>
              </blockquote>
              <figcaption>Leitsatz der {site.legalName}</figcaption>
            </figure>
          </div>
          <LottieScene src="/animations/rollstuhl-spaziergang.json" width={500} height={350} className={styles.scene} />
        </Container>
      </div>

      <Container>
        <section aria-labelledby="wer-wir-sind" className={styles.intro}>
          <div>
            <h2 id="wer-wir-sind">Wer wir sind</h2>
            <p className={styles.lead}>{about.lead}</p>
            <p>{about.text}</p>
          </div>
          <div className={styles.logo} aria-hidden="true">
            <img src="/images/logo-aram-320.png" width={320} height={320} loading="lazy" alt="" />
          </div>
        </section>

        <section aria-labelledby="worauf-verlassen" className={styles.section}>
          <h2 id="worauf-verlassen">Worauf Sie sich verlassen können</h2>
          <Promises />
        </section>

        <section aria-labelledby="unser-team" className={cx(styles.section, styles.teamGrid)}>
          <Reveal className={styles.teamPhoto}>
            <PhotoPlaceholder motif={about.teamPhoto} ratio="3 / 2" />
          </Reveal>
          <div>
            <h2 id="unser-team">Unser Team</h2>
            <p className={styles.lead}>{about.team}</p>
          </div>
        </section>

        <div className={styles.prompt}>
          <ContactPrompt
            title="Lernen Sie uns kennen"
            text="Rufen Sie uns an. Wir nehmen uns Zeit für Ihre Fragen und besprechen mit Ihnen, welche Unterstützung Sie brauchen."
          />
        </div>
      </Container>
    </>
  );
}
