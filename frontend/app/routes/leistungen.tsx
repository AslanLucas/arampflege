import type { CSSProperties } from "react";
import { ArrowLink } from "../components/ArrowLink/ArrowLink";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { ContactPrompt } from "../components/ContactPrompt/ContactPrompt";
import { Container } from "../components/Container/Container";
import { Eyebrow } from "../components/Eyebrow/Eyebrow";
import { ServicePhoto } from "../components/ServicePhoto/ServicePhoto";
import { ServiceShowcase } from "../components/ServiceShowcase/ServiceShowcase";
import { StepList } from "../components/StepList/StepList";
import { contactFormLink } from "../content/navigation";
import { careGradeSteps, payers, serviceBySlug, services, type Payer, type Service } from "../content/services";
import { site } from "../content/site";
import { useReveal } from "../hooks/useReveal";
import { pageMeta } from "../meta";
import type { Route } from "./+types/leistungen";
import styles from "./leistungen.module.css";

const DRAFT_NOTE = "[[ENTWURF: vom Kunden fachlich prüfen]]";

const collage = ["grundpflege", "betreuung-und-entlastung", "hauswirtschaft"]
  .map((slug) => serviceBySlug(slug))
  .filter((service): service is Service => service !== undefined);

export const meta: Route.MetaFunction = () =>
  pageMeta(
    "Leistungen",
    `Grundpflege, Behandlungspflege, Hilfe im Haushalt, Betreuung, Verhinderungspflege und Pflegeberatung in ${site.serviceArea}.`,
  );

function PayerCard({ payer, index }: { payer: Payer; index: number }) {
  const ref = useReveal<HTMLLIElement>(index * 100);
  return (
    <li ref={ref} className={styles.payer}>
      <h3 className={styles.payerName}>{payer.name}</h3>
      <p className={styles.payerBasis}>{payer.basis}</p>
      <p className={styles.payerText}>{payer.text}</p>
    </li>
  );
}

export default function Leistungen() {
  return (
    <>
      <div className={styles.hero}>
        <Container className={styles.heroGrid}>
          <div className={styles.heroText}>
            <Breadcrumbs current="Leistungen" />
            <Eyebrow>{`${String(services.length)} Leistungen, ein Team`}</Eyebrow>
            <h1 className={styles.title}>Leistungen</h1>
            <p className={styles.lead}>
              Wir pflegen, versorgen und begleiten Sie zu Hause. Hier sehen Sie, was wir übernehmen, wer die Kosten
              trägt und wie Sie die Leistung beantragen.
            </p>
            <p className={styles.heroLinks}>
              <ArrowLink to="#kostentraeger">Wer zahlt was?</ArrowLink>
              <ArrowLink to="#pflegegrad">Noch kein Pflegegrad?</ArrowLink>
            </p>
          </div>
          <div className={styles.collage} aria-hidden="true">
            {collage.map((service, index) => (
              <div key={service.slug} className={styles.collageItem} style={{ "--i": index } as CSSProperties}>
                <ServicePhoto service={service} sizes="(min-width: 60rem) 22vw, 45vw" className={styles.collagePhoto} />
              </div>
            ))}
          </div>
        </Container>
      </div>

      <Container>
        <section aria-label="Unsere Leistungen" className={styles.services}>
          <ServiceShowcase services={services} />
        </section>

        <section id="kostentraeger" aria-labelledby="kostentraeger-titel" className={styles.block}>
          <h2 id="kostentraeger-titel">Wer zahlt was?</h2>
          <p className={styles.note}>{DRAFT_NOTE}</p>
          <p className={styles.intro}>
            Die meisten Leistungen zahlt die Pflegekasse oder die Krankenkasse. Die aktuellen Beträge für Ihren
            Pflegegrad besprechen wir persönlich mit Ihnen.
          </p>
          <ul className={styles.payers}>
            {payers.map((payer, index) => (
              <PayerCard key={payer.name} payer={payer} index={index} />
            ))}
          </ul>
        </section>

        <section id="pflegegrad" aria-labelledby="pflegegrad-titel" className={styles.block}>
          <h2 id="pflegegrad-titel">Noch kein Pflegegrad?</h2>
          <p className={styles.note}>{DRAFT_NOTE}</p>
          <p className={styles.intro}>
            Für die meisten Leistungen der Pflegekasse brauchen Sie einen Pflegegrad. So kommen Sie dazu. Wir helfen
            Ihnen gern beim Antrag.
          </p>
          <StepList steps={careGradeSteps} />
          <p className={styles.action}>
            <ArrowLink to={contactFormLink.to}>{contactFormLink.label}</ArrowLink>
          </p>
        </section>

        <section aria-labelledby="nicht-im-angebot" className={styles.limits}>
          <h2 id="nicht-im-angebot">Was wir nicht anbieten</h2>
          <p>
            [[INHALT FEHLT: Leistungen, die der Dienst nicht anbietet, z. B. Palliativpflege oder 24-Stunden-Betreuung]]
          </p>
        </section>

        <div className={styles.prompt}>
          <ContactPrompt
            title="Wir beraten Sie, welche Leistungen passen"
            text="Rufen Sie uns an. Wir klären mit Ihnen, welche Unterstützung Sie brauchen und wer die Kosten trägt."
          />
        </div>
      </Container>
    </>
  );
}
