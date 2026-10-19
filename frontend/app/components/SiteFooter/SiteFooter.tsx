import { Link } from "react-router";
import { callbackLink, legalNavigation, mainNavigation } from "../../content/navigation";
import { site } from "../../content/site";
import { Container } from "../Container/Container";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <Container className={styles.grid}>
        <section aria-labelledby="footer-kontakt" className={styles.contact}>
          <h2 id="footer-kontakt" className={styles.heading}>
            So erreichen Sie uns
          </h2>
          <address className={styles.address}>
            <p>
              {site.name}
              <br />
              {site.address.street}
              <br />
              {site.address.postalCodeAndCity}
            </p>
            <dl className={styles.details}>
              <div>
                <dt>Telefon</dt>
                <dd>
                  <a href={site.phone.href} className={styles.numeric}>
                    {site.phone.display}
                  </a>
                </dd>
              </div>
              <div>
                <dt>E-Mail</dt>
                <dd>
                  <a href={site.email.href}>{site.email.display}</a>
                </dd>
              </div>
              <div>
                <dt>Bürozeiten</dt>
                <dd>{site.officeHours}</dd>
              </div>
              <div>
                <dt>Rufbereitschaft</dt>
                <dd>{site.onCallService}</dd>
              </div>
            </dl>
          </address>
          <p>
            <Link to={callbackLink.to}>{callbackLink.label}</Link>
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
