import { Link } from "react-router";
import { serviceHighlights, servicePath, type Service } from "../../content/services";
import { useReveal } from "../../hooks/useReveal";
import { ArrowRightIcon, CheckIcon } from "../Icon/icons";
import { ServicePhoto } from "../ServicePhoto/ServicePhoto";
import styles from "./ServiceShowcase.module.css";

type ShowcaseItemProps = {
  service: Service;
};

function ShowcaseItem({ service }: ShowcaseItemProps) {
  const ref = useReveal<HTMLLIElement>();
  const [payer] = service.facts;

  return (
    <li ref={ref} className={styles.item}>
      <div className={styles.media}>
        <ServicePhoto service={service} sizes="(min-width: 60rem) 45vw, 100vw" className={styles.photo} />
      </div>
      <div className={styles.body}>
        <p className={styles.payer}>
          <span className="visually-hidden">{payer.label}: </span>
          {payer.value}
        </p>
        <h2 className={styles.name}>
          <Link to={servicePath(service)} className={styles.link}>
            {service.name}
          </Link>
        </h2>
        <p className={styles.summary}>{service.summary}</p>
        <ul className={styles.highlights}>
          {serviceHighlights(service).map((item) => (
            <li key={item}>
              <span className={styles.check} aria-hidden="true">
                <CheckIcon size={16} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <span className={styles.more} aria-hidden="true">
          Mehr erfahren
          <ArrowRightIcon size={18} />
        </span>
      </div>
    </li>
  );
}

type ServiceShowcaseProps = {
  services: Service[];
};

/**
 * One large row per service, photo and text alternating sides on wide screens.
 * The whole row is clickable; the service name stays the link's accessible name.
 */
export function ServiceShowcase({ services }: ServiceShowcaseProps) {
  return (
    <ol className={styles.list}>
      {services.map((service) => (
        <ShowcaseItem key={service.slug} service={service} />
      ))}
    </ol>
  );
}
