import type { ComponentType } from "react";
import { Link } from "react-router";
import { servicePath, type Service } from "../../content/services";
import { useReveal } from "../../hooks/useReveal";
import {
  ArrowRightIcon,
  CalendarClockIcon,
  ClipboardCheckIcon,
  HouseIcon,
  MessagesSquareIcon,
  RotateIcon,
  ShowerHeadIcon,
  SyringeIcon,
} from "../Icon/icons";
import styles from "./ServiceCards.module.css";

const icons: Partial<Record<string, ComponentType<{ size?: number }>>> = {
  grundpflege: ShowerHeadIcon,
  behandlungspflege: SyringeIcon,
  verhinderungspflege: CalendarClockIcon,
  "entlastung-und-hauswirtschaft": HouseIcon,
  beratungsbesuche: ClipboardCheckIcon,
  pflegeberatung: MessagesSquareIcon,
};

type ServiceCardProps = {
  service: Service;
  index: number;
};

/**
 * Flip card: name on the front, explanation and link on the back. It turns on hover and
 * when its link receives keyboard focus. Without a fine pointer or with "reduce motion"
 * both sides are shown one below the other. Screen readers always read both sides.
 */
function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useReveal<HTMLLIElement>(index * 80);
  const Icon = icons[service.slug] ?? ClipboardCheckIcon;

  return (
    <li ref={ref} className={styles.card}>
      <div className={styles.inner}>
        <div className={styles.front}>
          <span className={styles.number} aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className={styles.icon} aria-hidden="true">
            <Icon size={28} />
          </span>
          <h3 className={styles.name}>{service.name}</h3>
          <span className={styles.flipHint} aria-hidden="true">
            <RotateIcon size={18} />
          </span>
        </div>
        <div className={styles.back} data-surface="brand">
          <p className={styles.summary}>{service.summary}</p>
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
