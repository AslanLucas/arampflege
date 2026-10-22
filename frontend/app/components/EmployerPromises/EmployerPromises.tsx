import type { ComponentType, CSSProperties } from "react";
import { employerPromises, type EmployerPromise } from "../../content/careers";
import { useReveal } from "../../hooks/useReveal";
import { Eyebrow } from "../Eyebrow/Eyebrow";
import { CarIcon, ClockIcon, EuroIcon, HeartIcon, UsersIcon } from "../Icon/icons";
import { Reveal } from "../Reveal/Reveal";
import styles from "./EmployerPromises.module.css";

const icons: Record<EmployerPromise["icon"], ComponentType<{ size?: number }>> = {
  heart: HeartIcon,
  clock: ClockIcon,
  euro: EuroIcon,
  car: CarIcon,
  team: UsersIcon,
};

/**
 * What applicants can rely on: the most important promise as a large brand card, the others as
 * a calm list next to it (deliberately not a grid of identical cards, docs/DESIGN.md).
 */
export function EmployerPromises() {
  const listRef = useReveal<HTMLUListElement>();
  const { featured } = employerPromises;
  const FeaturedIcon = icons[featured.icon];

  return (
    <section aria-labelledby="was-dich-erwartet" className={styles.section}>
      <div className={styles.header}>
        <Eyebrow>{employerPromises.eyebrow}</Eyebrow>
        <h2 id="was-dich-erwartet">{employerPromises.title}</h2>
        <p className={styles.intro}>{employerPromises.intro}</p>
      </div>

      <div className={styles.grid}>
        <Reveal className={styles.featured}>
          <div className={styles.featuredCard} data-surface="brand">
            <span className={styles.featuredIcon} aria-hidden="true">
              <FeaturedIcon size={32} />
            </span>
            <h3 className={styles.featuredTitle}>{featured.title}</h3>
            <p className={styles.featuredText}>{featured.text}</p>
          </div>
        </Reveal>

        <ul ref={listRef} className={styles.list}>
          {employerPromises.items.map((item, index) => {
            const ItemIcon = icons[item.icon];
            return (
              <li key={item.title} className={styles.item} style={{ "--n": index } as CSSProperties}>
                <span className={styles.icon} aria-hidden="true">
                  <ItemIcon size={22} />
                </span>
                <div>
                  <h3 className={styles.title}>{item.title}</h3>
                  <p className={styles.text}>{item.text}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
