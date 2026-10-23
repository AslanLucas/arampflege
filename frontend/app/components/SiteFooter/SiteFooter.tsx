import { Link } from "react-router";
import { contactFormLink, legalNavigation, mainNavigation } from "../../content/navigation";
import { site } from "../../content/site";
import { Container } from "../Container/Container";
import { DetailList } from "../DetailList/DetailList";
import { PostalAddress } from "../PostalAddress/PostalAddress";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} data-surface="brand">
      <Container className={styles.grid}>
        <section aria-labelledby="footer-kontakt" className={styles.contact}>
          <p className={styles.wordmark}>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.tagline}>{site.tagline}</span>
          </p>
          <h2 id="footer-kontakt" className={styles.heading}>
            So erreichen Sie uns
          </h2>
          <PostalAddress />
          <DetailList
            details={[
              {
                term: "Telefon",
                description: (
                  <a href={site.phone.href} className={styles.numeric}>
                    {site.phone.display}
                  </a>
                ),
              },
              { term: "E-Mail", description: <a href={site.email.href}>{site.email.display}</a> },
              { term: "Bürozeiten", description: site.officeHours },
              { term: "Rufbereitschaft", description: site.onCallService },
            ]}
          />
          <p>
            <Link to={contactFormLink.to}>{contactFormLink.label}</Link>
          </p>
        </section>

        <nav id="seitennavigation" aria-labelledby="footer-seiten" className={styles.pages}>
          <h2 id="footer-seiten" className={styles.heading}>
            Seiten
          </h2>
          <ul className={styles.list}>
            {mainNavigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-rechtliches" className={styles.legal}>
          <h2 id="footer-rechtliches" className={styles.heading}>
            Rechtliches
          </h2>
          <ul className={styles.list}>
            {legalNavigation.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
