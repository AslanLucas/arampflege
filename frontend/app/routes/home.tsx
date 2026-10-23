import { Link } from "react-router";
import { ContactPanel } from "../components/ContactPanel/ContactPanel";
import { ServiceAreaMap } from "../components/ServiceAreaMap/ServiceAreaMap";
import { ArrowLink } from "../components/ArrowLink/ArrowLink";
import { ButtonLink } from "../components/ButtonLink/ButtonLink";
import { Container } from "../components/Container/Container";
import { Eyebrow } from "../components/Eyebrow/Eyebrow";
import { HeroVideo } from "../components/HeroVideo/HeroVideo";
import { ArrowRightIcon, PhoneIcon } from "../components/Icon/icons";
import { PhotoPlaceholder } from "../components/PhotoPlaceholder/PhotoPlaceholder";
import { Reveal } from "../components/Reveal/Reveal";
import { Section } from "../components/Section/Section";
import { ServiceCards } from "../components/ServiceCards/ServiceCards";
import { StepList } from "../components/StepList/StepList";
import {
  areaTeaser,
  contactTeaser,
  careerTeaser,
  careProcess,
  hero,
  servicesTeaser,
  teamTeaser,
} from "../content/home";
import { contactFormLink, firstConsultationLink } from "../content/navigation";
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

const heroClips = ["/videos/pflege-1.mp4", "/videos/pflege-2.mp4", "/videos/pflege-3.mp4"];

export default function Home() {
  return (
    <>
      <div className={styles.hero} data-surface="brand">
        <HeroVideo clips={heroClips} poster="/videos/pflege-1-poster.webp" />
        <Container className={styles.heroGrid}>
          <div className={styles.heroText}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className={styles.heroTitle}>{hero.title}</h1>
            <p className={styles.lead}>{hero.lead}</p>
            <div className={styles.actions}>
              <ButtonLink to={site.phone.href} variant="inverse" size="large">
                <PhoneIcon />
                {site.phone.display} anrufen
              </ButtonLink>
              <Link to={firstConsultationLink.to} className={styles.consult}>
                {hero.consultation}
                <ArrowRightIcon size={18} />
              </Link>
            </div>
            <dl className={styles.availabilityList} aria-label="Erreichbarkeit">
              <div>
                <dt>Bürozeiten</dt>
                <dd>{site.officeHours}</dd>
              </div>
              <div>
                <dt>Rufbereitschaft</dt>
                <dd>{site.onCallService}</dd>
              </div>
            </dl>
          </div>
          {/* Decorative: the header already names Aram. Only on wide screens, where the space is free. */}
          <div className={styles.heroLogo} aria-hidden="true">
            <img src="/images/logo-aram-320.png" width={320} height={320} alt="" className={styles.heroLogoImage} />
          </div>
        </Container>
      </div>

      <Section id="leistungen" title={servicesTeaser.title} intro={<p>{servicesTeaser.intro}</p>}>
        <ServiceCards services={services} />
        <p className={styles.sectionAction}>
          <ArrowLink to="/leistungen">Alle Leistungen im Überblick</ArrowLink>
        </p>
      </Section>

      <Section id="einsatzgebiet" title={areaTeaser.title} className={styles.areaGrid}>
        {(heading) => (
          <>
            <div className={styles.areaMedia}>
              <ServiceAreaMap listPosition="hidden" />
            </div>
            <div className={styles.areaText}>
              <Eyebrow>{areaTeaser.eyebrow}</Eyebrow>
              {heading}
              <p className={styles.areaLead}>{areaTeaser.text}</p>
              <p>{areaTeaser.note}</p>
              <div className={styles.areaActions}>
                <ButtonLink to="/einsatzgebiet">Einsatzgebiet ansehen</ButtonLink>
                <a href={site.phone.href} className={styles.areaPhone}>
                  {site.phone.display} anrufen
                </a>
              </div>
            </div>
          </>
        )}
      </Section>

      <Section
        id="ablauf"
        title={careProcess.title}
        tone="alt"
      >
        <StepList steps={careProcess.steps} />
        <p className={styles.sectionAction}>
          <ButtonLink to={firstConsultationLink.to}>{firstConsultationLink.label}</ButtonLink>
        </p>
      </Section>

      <Section id="team" title={teamTeaser.title} className={styles.teamGrid}>
        {(heading) => (
          <>
            <Reveal className={styles.teamPhoto}>
              <PhotoPlaceholder motif={teamTeaser.photo} ratio="5 / 4" />
            </Reveal>
            <Reveal className={styles.teamText} delayMs={120}>
              <Eyebrow>{teamTeaser.eyebrow}</Eyebrow>
              {heading}
              <p className={styles.teamQuote}>{teamTeaser.text}</p>
              <p className={styles.teamDetail}>{teamTeaser.detail}</p>
              <ArrowLink to="/ueber-uns">Unser Team kennenlernen</ArrowLink>
            </Reveal>
          </>
        )}
      </Section>

      <Section id="karriere" title={careerTeaser.title} flushTop>
        {(heading) => (
          <Reveal>
            <div className={styles.careerPanel} data-surface="brand">
            <div className={styles.careerText}>
              <Eyebrow>Karriere</Eyebrow>
              {heading}
              <p>{careerTeaser.text}</p>
            </div>
            <ButtonLink to="/karriere" variant="inverse">
              Offene Stellen ansehen
            </ButtonLink>
            </div>
          </Reveal>
        )}
      </Section>

      <Section id="kontakt" title={contactTeaser.title} tone="alt" className={styles.contactGrid}>
        {(heading) => (
          <>
            <div className={styles.contactText}>
              <Eyebrow>{contactTeaser.eyebrow}</Eyebrow>
              {heading}
              <p className={styles.contactLead}>{contactTeaser.text}</p>
              <div className={styles.contactActions}>
                <ButtonLink to={contactFormLink.to}>{contactFormLink.label}</ButtonLink>
              </div>
            </div>
            <ContactPanel />
          </>
        )}
      </Section>
    </>
  );
}
