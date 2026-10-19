import type { ReactNode } from "react";
import { useLocation } from "react-router";
import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { ContactPrompt } from "../components/ContactPrompt/ContactPrompt";
import { Container } from "../components/Container/Container";
import { CostsInfo } from "../components/CostsInfo/CostsInfo";
import { OnThisPage, type PageSection } from "../components/OnThisPage/OnThisPage";
import { ServiceList } from "../components/ServiceList/ServiceList";
import { serviceBySlug, services, type Service } from "../content/services";
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

export const meta: Route.MetaFunction = ({ location }) =>
  pageMeta(serviceAt(location.pathname).name, "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

type ContentSectionProps = {
  section: PageSection;
  children: ReactNode;
};

function ContentSection({ section, children }: ContentSectionProps) {
  return (
    <section id={section.id} aria-labelledby={`${section.id}-titel`} className={styles.section}>
      <h2 id={`${section.id}-titel`}>{section.label}</h2>
      {children}
    </section>
  );
}

export default function Leistung() {
  const service = serviceAt(useLocation().pathname);
  const otherServices = services.filter((candidate) => candidate.slug !== service.slug);

  return (
    <Container>
      <div className={styles.content}>
        <Breadcrumbs trail={[{ label: "Leistungen", to: "/leistungen" }]} current={service.name} />
        <h1>{service.name}</h1>
        <p className={styles.lead}>{service.summary}</p>

        <OnThisPage sections={Object.values(sections)} />

        <ContentSection section={sections.audience}>
          {service.draft && <p className={styles.note}>{DRAFT_NOTE}</p>}
          <p>{service.audience}</p>
        </ContentSection>

        <ContentSection section={sections.scope}>
          {service.draft && <p className={styles.note}>{DRAFT_NOTE}</p>}
          <ul>
            {service.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </ContentSection>

        <ContentSection section={sections.costs}>
          <CostsInfo costs={service.costs} />
        </ContentSection>

        <ContentSection section={sections.application}>
          <p>{service.application}</p>
        </ContentSection>

        <ContactPrompt
          title={`Sprechen Sie mit uns über ${service.name}`}
          text="Rufen Sie uns an. Wir klären mit Ihnen, welche Unterstützung passt und wer die Kosten trägt."
        />
      </div>

      <section aria-labelledby="weitere-leistungen" className={styles.more}>
        <h2 id="weitere-leistungen">Weitere Leistungen</h2>
        <ServiceList services={otherServices} headingLevel="h3" />
      </section>
    </Container>
  );
}
