import { ArrowLink } from "../components/ArrowLink/ArrowLink";
import { ButtonLink } from "../components/ButtonLink/ButtonLink";
import { Container } from "../components/Container/Container";
import { DetailList } from "../components/DetailList/DetailList";
import { PhoneIcon } from "../components/Icon/icons";
import { PhotoPlaceholder } from "../components/PhotoPlaceholder/PhotoPlaceholder";
import { PostalAddress } from "../components/PostalAddress/PostalAddress";
import { Section } from "../components/Section/Section";
import { ServiceList } from "../components/ServiceList/ServiceList";
import { StepList } from "../components/StepList/StepList";
import { callbackTeaser, careerTeaser, careProcess, hero, teamTeaser } from "../content/home";
import { callbackLink } from "../content/navigation";
import { services } from "../content/services";
import { site } from "../content/site";
import type { Route } from "./+types/home";
import styles from "./home.module.css";

export const meta: Route.MetaFunction = () => [
  { title: `${site.name} – Ambulante Pflege in ${site.region}` },
  {
    name: "description",
    content: "[[INHALT FEHLT: Kurzbeschreibung der Startseite für Suchergebnisse]]",
  },
];

export default function Home() {
  return (
    <>
      <Container className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>{hero.title}</h1>
          <p className={styles.lead}>{hero.lead}</p>
          <div className={styles.actions}>
            <ButtonLink to={site.phone.href}>
              <PhoneIcon />
              {site.phone.display} anrufen
            </ButtonLink>
            <ArrowLink to={callbackLink.to}>{callbackLink.label}</ArrowLink>
          </div>
        </div>
        <div className={styles.aside}>
          <h2 className={styles.asideTitle}>Wann Sie uns erreichen</h2>
          <DetailList
            details={[
              { term: "Bürozeiten", description: site.officeHours },
              { term: "Rufbereitschaft", description: site.onCallService },
            ]}
          />
        </div>
      </Container>

      <Section id="leistungen" title="Wobei wir Sie unterstützen">
        <p className={styles.note}>[[INHALT FEHLT: Leistungen vom Kunden bestätigen]]</p>
        <ServiceList services={services} headingLevel="h3" />
        <p className={styles.sectionAction}>
          <ArrowLink to="/leistungen">Alle Leistungen im Überblick</ArrowLink>
        </p>
      </Section>

      <Section id="ablauf" title={careProcess.title} className={styles.processGrid}>
        {(heading) => (
          <>
            <div className={styles.processIntro}>
              {heading}
              <p className={styles.note}>{careProcess.draftNote}</p>
            </div>
            <div className={styles.processSteps}>
              <StepList steps={careProcess.steps} />
              <p className={styles.sectionAction}>
                <ArrowLink to={callbackLink.to}>{callbackLink.label}</ArrowLink>
              </p>
            </div>
          </>
        )}
      </Section>

      <Section id="team" title={teamTeaser.title} className={styles.teamGrid}>
        {(heading) => (
          <>
            <div className={styles.teamPhoto}>
              <PhotoPlaceholder motif={teamTeaser.photo} ratio="3 / 2" />
            </div>
            <div className={styles.teamText}>
              {heading}
              <p className={styles.personName}>{teamTeaser.name}</p>
              <p className={styles.personRole}>
                {teamTeaser.role}, {teamTeaser.qualification}
              </p>
              <p>{teamTeaser.text}</p>
              <ArrowLink to="/ueber-uns">Unser Team auf der Seite Über uns</ArrowLink>
            </div>
          </>
        )}
      </Section>

      <Section id="karriere" title={careerTeaser.title} tone="alt" className={styles.careerGrid}>
        {(heading) => (
          <>
            <div className={styles.careerText}>
              {heading}
              <p>{careerTeaser.text}</p>
            </div>
            <div className={styles.careerAction}>
              <ButtonLink to="/karriere" variant="secondary">
                Offene Stellen ansehen
              </ButtonLink>
            </div>
          </>
        )}
      </Section>

      <Section id="kontakt" title={callbackTeaser.title} className={styles.contactGrid}>
        {(heading) => (
          <>
            <div className={styles.contactText}>
              {heading}
              <p>{callbackTeaser.text}</p>
              <ButtonLink to={callbackLink.to}>{callbackLink.label}</ButtonLink>
              <p className={styles.contactPhone}>
                Oder rufen Sie direkt an: <a href={site.phone.href}>{site.phone.display}</a>
              </p>
            </div>
            <div className={styles.aside}>
              <h3 className={styles.asideTitle}>Unser Büro</h3>
              <PostalAddress />
            </div>
          </>
        )}
      </Section>
    </>
  );
}
