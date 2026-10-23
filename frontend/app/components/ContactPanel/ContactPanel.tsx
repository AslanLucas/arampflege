import type { ReactNode } from "react";
import { site } from "../../content/site";
import { ArrowLink } from "../ArrowLink/ArrowLink";
import { ClockIcon, MailIcon, MapPinIcon, PhoneIcon } from "../Icon/icons";
import { PostalAddress } from "../PostalAddress/PostalAddress";
import styles from "./ContactPanel.module.css";

function CardTitle({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <h3 className={styles.cardTitle}>
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
      {children}
    </h3>
  );
}

/** Every way to reach the office, stacked as cards; the static map needs no third-party request. */
export function ContactPanel() {
  return (
    <div className={styles.panel}>
      <div className={styles.phoneCard} data-surface="brand">
        <CardTitle icon={<PhoneIcon size={18} />}>Telefon</CardTitle>
        <a href={site.phone.href} className={styles.bigPhone}>
          {site.phone.display}
          {" "}
          <span className="visually-hidden">anrufen</span>
        </a>
        <p className={styles.cardText}>Rufbereitschaft: {site.onCallService}</p>
      </div>

      <div className={styles.card}>
        <CardTitle icon={<MailIcon size={18} />}>E-Mail</CardTitle>
        <a href={site.email.href} className={styles.value}>
          {site.email.display}
        </a>
        <p className={styles.cardText}>Antwort innerhalb von {site.replyTime}</p>
      </div>

      <div className={styles.card}>
        <CardTitle icon={<MapPinIcon size={18} />}>Adresse</CardTitle>
        <PostalAddress />
        <figure className={styles.map}>
          <div className={styles.mapFrame}>
            <picture>
              <source srcSet="/images/karte-standort.avif" type="image/avif" />
              <img
                src="/images/karte-standort.webp"
                width={960}
                height={480}
                loading="lazy"
                decoding="async"
                alt={`Stadtplan von Gronau mit dem Standort ${site.address.street}`}
                className={styles.mapImage}
              />
            </picture>
            <span className={styles.pin} aria-hidden="true">
              <MapPinIcon size={36} />
            </span>
          </div>
          <figcaption className={styles.attribution}>
            Kartendaten ©{" "}
            <a href="https://www.openstreetmap.org/copyright">OpenStreetMap-Mitwirkende</a>
          </figcaption>
        </figure>
        <a href={site.address.mapUrl} className={styles.mapLink}>
          In Google Maps öffnen
        </a>
      </div>

      <div className={styles.card}>
        <CardTitle icon={<ClockIcon size={18} />}>Bürozeiten</CardTitle>
        <table className={styles.hours}>
          <tbody>
            {site.officeHoursByDay.map(({ days, hours }) => (
              <tr key={days}>
                <th scope="row">{days}</th>
                <td>{hours}</td>
              </tr>
            ))}
            <tr>
              <th scope="row">Rufbereitschaft</th>
              <td>{site.onCallService}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className={styles.area}>
        <p>
          Wir sind für Sie da in <strong>{site.serviceArea}</strong>.
        </p>
        <ArrowLink to="/einsatzgebiet">Einsatzgebiet ansehen</ArrowLink>
      </div>
    </div>
  );
}
