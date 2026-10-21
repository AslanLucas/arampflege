import { AreaIllustration } from "../components/AreaIllustration/AreaIllustration";
import { ContactPanel } from "../components/ContactPanel/ContactPanel";
import { ArrowLink } from "../components/ArrowLink/ArrowLink";
import { ButtonLink } from "../components/ButtonLink/ButtonLink";
import { Container } from "../components/Container/Container";
import { Eyebrow } from "../components/Eyebrow/Eyebrow";
import { HeroVideo } from "../components/HeroVideo/HeroVideo";
import { OnlineTiles } from "../components/OnlineTiles/OnlineTiles";
import { PhoneIcon } from "../components/Icon/icons";
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
  heroChips,
  onlineServices,
  servicesTeaser,
  teamTeaser,
} from "../content/home";
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

const heroClips = ["/videos/stimmung-1.mp4", "/videos/stimmung-2.mp4", "/videos/stimmung-3.mp4"];

export default function Home() {
  return (
    <>
      <div className={styles.hero} data-surface="brand">
        <HeroVideo clips={heroClips} poster="/videos/stimmung-1-poster.webp" />
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
              <ArrowLink to={callbackLink.to}>{callbackLink.label}</ArrowLink>
            </div>
            <ul className={styles.heroChips} aria-label="Online bei Aram">
              {heroChips.map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
          </div>
          <div className={styles.callbackCard}>
            <p className={styles.cardLabel}>Rückruf</p>
            <p className={styles.cardText}>Wir melden uns innerhalb von [[INHALT FEHLT: Rückruffrist]].</p>
          </div>
        </Container>
      </div>

      <Container className={styles.availability}>
        <dl className={styles.availabilityList} aria-label="Erreichbarkeit">
          <div>
            <dt>Bürozeiten</dt>
            <dd>{site.officeHours}</dd>
          </div>
          <div>
            <dt>Rufbereitschaft</dt>
            <dd>{site.onCallService}</dd>
          </div>
          <div>
            <dt>Einsatzgebiet</dt>
            <dd>{site.serviceArea}</dd>
          </div>
        </dl>
      </Container>

      <Section id="leistungen" title={servicesTeaser.title} intro={<p>{servicesTeaser.intro}</p>}>
        <p className={styles.note}>[[INHALT FEHLT: Leistungen vom Kunden bestätigen]]</p>
        <ServiceCards services={services} />
        <p className={styles.sectionAction}>
          <ArrowLink to="/leistungen">Alle Leistungen im Überblick</ArrowLink>
        </p>
      </Section>

      <Section id="einsatzgebiet" title={areaTeaser.title} className={styles.areaGrid}>
        {(heading) => (
          <>
            <Reveal className={styles.areaMedia}>
              <AreaIllustration />
            </Reveal>
            <div className={styles.areaText}>
              <Eyebrow>{areaTeaser.eyebrow}</Eyebrow>
              {heading}
              <p className={styles.areaLead}>{areaTeaser.text}</p>
              <p className={styles.places}>{areaTeaser.places}</p>
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
        intro={
          <p>
            {careProcess.intro} {careProcess.draftNote}
          </p>
        }
      >
        <StepList steps={careProcess.steps} />
        <p className={styles.sectionAction}>
          <ButtonLink to={callbackLink.to}>{callbackLink.label}</ButtonLink>
        </p>
      </Section>

      <Section id="online" title={onlineServices.title} intro={<p>{onlineServices.intro}</p>}>
        <OnlineTiles tiles={onlineServices.tiles} />
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
              <p className={styles.personName}>{teamTeaser.name}</p>
              <p className={styles.personRole}>
                {teamTeaser.role}, {teamTeaser.qualification}
              </p>
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
                <ButtonLink to="/kontakt">Nachricht schreiben</ButtonLink>
                <ArrowLink to={callbackLink.to}>{callbackLink.label}</ArrowLink>
              </div>
            </div>
            <ContactPanel />
          </>
        )}
      </Section>
    </>
  );
}
