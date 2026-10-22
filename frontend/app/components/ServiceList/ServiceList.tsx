import { Link } from "react-router";
import { servicePath, type Service } from "../../content/services";
import { ArrowRightIcon } from "../Icon/icons";
import { ServicePhoto } from "../ServicePhoto/ServicePhoto";
import styles from "./ServiceList.module.css";

type ServiceListProps = {
  services: Service[];
  /** Heading level of the service names, depending on the surrounding page. */
  headingLevel: "h2" | "h3";
  /** Small photo at the start of each row. */
  showPhotos?: boolean;
};

/** Numbered rows; the whole row is clickable while the name stays the link's accessible name. */
export function ServiceList({ services, headingLevel: Heading, showPhotos = false }: ServiceListProps) {
  return (
    <ul className={styles.list}>
      {services.map((service, index) => (
        <li key={service.slug} className={styles.item}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          {showPhotos && (
            <span className={styles.thumb} aria-hidden="true">
              <ServicePhoto service={service} sizes="7rem" className={styles.thumbPhoto} />
            </span>
          )}
          <Heading className={styles.name}>
            <Link to={servicePath(service)} className={styles.link}>
              {service.name}
            </Link>
          </Heading>
          <p className={styles.summary}>{service.summary}</p>
          <span className={styles.arrow} aria-hidden="true">
            <ArrowRightIcon size={18} />
          </span>
        </li>
      ))}
    </ul>
  );
}
