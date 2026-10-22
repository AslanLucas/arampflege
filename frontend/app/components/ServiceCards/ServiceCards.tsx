import type { ComponentType } from "react";
import { Link } from "react-router";
import { serviceHighlights, servicePath, type Service } from "../../content/services";
import { useReveal } from "../../hooks/useReveal";
import {
  ArrowRightIcon,
  CalendarClockIcon,
  CheckIcon,
  ClipboardCheckIcon,
  HouseIcon,
  MessagesSquareIcon,
  RotateIcon,
  ShowerHeadIcon,
  SyringeIcon,
  UsersIcon,
} from "../Icon/icons";
import { ServicePhoto } from "../ServicePhoto/ServicePhoto";
import styles from "./ServiceCards.module.css";

const icons: Partial<Record<string, ComponentType<{ size?: number }>>> = {
  grundpflege: ShowerHeadIcon,
  behandlungspflege: SyringeIcon,
  verhinderungspflege: CalendarClockIcon,
  hauswirtschaft: HouseIcon,
  "betreuung-und-entlastung": UsersIcon,
  pflegeberatung: MessagesSquareIcon,
};

type ServiceCardProps = {
  service: Service;
  index: number;
};

/**
 * Flip card: photo, name and payer on the front, explanation, examples and link on the back. It turns on hover and
 * when its link receives keyboard focus. Without a fine pointer or with "reduce motion"
 * both sides are shown one below the other. Screen readers always read both sides.
 */
function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useReveal<HTMLLIElement>(index * 80);
  const Icon = icons[service.slug] ?? ClipboardCheckIcon;
  const [payer] = service.facts;

  return (
    <li ref={ref} className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <div className={styles.media}>
            <ServicePhoto service={service} sizes="(min-width: 60rem) 30vw, (min-width: 40rem) 45vw, 100vw" className={styles.photo} />
            <span className={styles.flipHint} aria-hidden="true">
              <RotateIcon size={18} />
            </span>
          </div>
          <span className={styles.icon} aria-hidden="true">
            <Icon size={26} />
          </span>
          <div className={styles.frontText}>
            <h3 className={styles.name}>{service.name}</h3>
            <p className={styles.payer}>
              <span className="visually-hidden">{payer.label}: </span>
              {payer.value}
            </p>
          </div>
        </div>
        <div className={styles.back} data-surface="brand">
          <p className={styles.summary}>{service.summary}</p>
          <ul className={styles.highlights}>
            {serviceHighlights(service).map((item) => (
              <li key={item}>
                <CheckIcon size={16} />
                {item}
              </li>
            ))}
          </ul>
          <Link to={servicePath(service)} className={styles.link}>
            Zur Leistung{" "}
            <span className="visually-hidden">{service.name}</span>
            <ArrowRightIcon size={18} />
          </Link>
        </div>
      </div>
    </li>
  );
}

type ServiceCardsProps = {
  services: Service[];
};

export function ServiceCards({ services }: ServiceCardsProps) {
  return (
    <ul className={styles.grid}>
      {services.map((service, index) => (
        <ServiceCard key={service.slug} service={service} index={index} />
      ))}
    </ul>
  );
}
