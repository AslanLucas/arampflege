import { Link } from "react-router";
import { servicePath, type Service } from "../../content/services";
import { ArrowRightIcon } from "../Icon/icons";
import styles from "./ServiceList.module.css";

type ServiceListProps = {
  services: Service[];
  /** Heading level of the service names, depending on the surrounding page. */
  headingLevel: "h2" | "h3";
};

export function ServiceList({ services, headingLevel: Heading }: ServiceListProps) {
  return (
    <ul className={styles.list}>
      {services.map((service) => (
        <li key={service.slug} className={styles.item}>
          <Heading className={styles.name}>
            <Link to={servicePath(service)} className={styles.link}>
              {service.name}
              <ArrowRightIcon size={20} />
            </Link>
          </Heading>
          <p className={styles.summary}>{service.summary}</p>
        </li>
      ))}
    </ul>
  );
}
