import type { CSSProperties, ReactNode } from "react";
import { useLocation } from "react-router";
import { ArrowLink } from "../components/ArrowLink/ArrowLink";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { ButtonLink } from "../components/ButtonLink/ButtonLink";
import { ContactPrompt } from "../components/ContactPrompt/ContactPrompt";
import { Container } from "../components/Container/Container";
import { CostsInfo } from "../components/CostsInfo/CostsInfo";
import { Eyebrow } from "../components/Eyebrow/Eyebrow";
import { LottieScene } from "../components/LottieScene/LottieScene";
import { CheckIcon, PhoneIcon } from "../components/Icon/icons";
import { OnThisPage, type PageSection } from "../components/OnThisPage/OnThisPage";
import { ServiceList } from "../components/ServiceList/ServiceList";
import { ServicePhoto } from "../components/ServicePhoto/ServicePhoto";
import { contactFormLink } from "../content/navigation";
import { serviceBySlug, services, type Service } from "../content/services";
import { site } from "../content/site";
import { useReveal } from "../hooks/useReveal";
import { pageMeta } from "../meta";
import type { Route } from "./+types/leistung";
import styles from "./leistung.module.css";

const DRAFT_NOTE = "[[ENTWURF: vom Kunden fachlich prüfen]]";

const sections = {
  audience: { id: "fuer-wen", label: "Für wen diese Leistung gedacht ist" },
  scope: { id: "leistungsumfang", label: "Was wir übernehmen" },
  costs: { id: "kosten", label: "Wer die Kosten trägt" },
  application: { id: "antrag", label: "So beantragen Sie die Leistung" },
} satisfies Record<string, PageSection>;

// routes.ts registers this module once per service, so every path has a matching service.
function serviceAt(pathname: string): Service {
  const service = serviceBySlug(pathname.split("/").filter(Boolean).pop());
  if (!service) {
    throw new Error(`No service for path ${pathname}`);
  }
  return service;
}

export const meta: Route.MetaFunction = ({ location }) => {
  const service = serviceAt(location.pathname);
  return pageMeta(service.name, `${service.summary} Ambulante Pflege in ${site.serviceArea}.`);
};

type ContentSectionProps = {
  section: PageSection;
  draft: boolean;
  children: ReactNode;
};

function ContentSection({ section, draft, children }: ContentSectionProps) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-titel`} className={styles.section}>
      <h2 id={`${section.id}-titel`}>{section.label}</h2>
      {draft && <p className={styles.note}>{DRAFT_NOTE}</p>}
      {children}
    </section>
  );
}

/** Scope as a checklist whose items appear one after another. */
function ScopeList({ items }: { items: string[] }) {
  const ref = useReveal<HTMLUListElement>();
  return (
    <ul ref={ref} className={styles.checks}>
      {items.map((item, index) => (
        <li key={item} style={{ "--n": index } as CSSProperties}>
          <span className={styles.check} aria-hidden="true">
            <CheckIcon size={16} />
          </span>
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Application steps on a vertical line that draws itself when it scrolls into view. */
function Timeline({ steps }: { steps: string[] }) {
  const ref = useReveal<HTMLOListElement>();
  return (
    <ol ref={ref} className={styles.timeline}>
      {steps.map((step, index) => (
        <li key={step} style={{ "--n": index } as CSSProperties}>
          {step}
        </li>
      ))}
    </ol>
  );
}

export default function Leistung() {
  const service = serviceAt(useLocation().pathname);
  const position = services.indexOf(service) + 1;
  const otherServices = services.filter((candidate) => candidate.slug !== service.slug);

  return (
    <>
      <div className={styles.hero}>
        <Container className={styles.heroGrid}>
          <div className={styles.heroText}>
            <Breadcrumbs trail={[{ label: "Leistungen", to: "/leistungen" }]} current={service.name} />
            <Eyebrow>{`Leistung ${String(position)} von ${String(services.length)}`}</Eyebrow>
            <h1 className={styles.title}>{service.name}</h1>
            <p className={styles.lead}>{service.summary}</p>
            <div className={styles.actions}>
              <ButtonLink to={site.phone.href}>
                <PhoneIcon />
                {site.phone.display} anrufen
              </ButtonLink>
              <ArrowLink to={contactFormLink.to}>{contactFormLink.label}</ArrowLink>
            </div>
          </div>
          {service.heroAnimation ? (
            <LottieScene {...service.heroAnimation} className={styles.heroScene} />
          ) : (
            <div className={styles.heroMedia}>
              <ServicePhoto service={service} sizes="(min-width: 60rem) 45vw, 100vw" priority className={styles.heroPhoto} />
            </div>
          )}
        </Container>
      </div>

      <Container>
        <dl className={styles.facts} aria-label="Auf einen Blick">
          {service.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        <div className={styles.layout}>
          <aside className={styles.sidebar}>
            <OnThisPage sections={Object.values(sections)} />
          </aside>

          <div className={styles.content}>
            <ContentSection section={sections.audience} draft={service.draft}>
              <p className={styles.audience}>{service.audience}</p>
            </ContentSection>

            <ContentSection section={sections.scope} draft={service.draft}>
              <ScopeList items={service.scope} />
            </ContentSection>

            <ContentSection section={sections.costs} draft={service.draft}>
              <div className={styles.costs}>
                <CostsInfo costs={service.costs} />
              </div>
            </ContentSection>

            <ContentSection section={sections.application} draft={service.draft}>
              <Timeline steps={service.application} />
            </ContentSection>

            <div className={styles.prompt}>
              <ContactPrompt
                title={`Sprechen Sie mit uns über ${service.name}`}
                text="Rufen Sie uns an. Wir klären mit Ihnen, welche Unterstützung passt und wer die Kosten trägt."
              />
            </div>
          </div>
        </div>

        <section aria-labelledby="weitere-leistungen" className={styles.more}>
          <h2 id="weitere-leistungen">Weitere Leistungen</h2>
          <ServiceList services={otherServices} headingLevel="h3" showPhotos />
        </section>
      </Container>
    </>
  );
}
