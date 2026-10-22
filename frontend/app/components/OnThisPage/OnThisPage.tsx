import { useEffect, useState } from "react";
import styles from "./OnThisPage.module.css";

export type PageSection = {
  id: string;
  label: string;
};

type OnThisPageProps = {
  sections: PageSection[];
};

/** Marks the section currently being read, so the list doubles as a progress indicator. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | undefined>(undefined);
  const key = ids.join(" ");

  useEffect(() => {
    const elements = key
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        const first = visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (first) {
          setActive(first.target.id);
        }
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    for (const element of elements) {
      observer.observe(element);
    }
    return () => {
      observer.disconnect();
    };
  }, [key]);

  return active;
}

export function OnThisPage({ sections }: OnThisPageProps) {
  const active = useActiveSection(sections.map((section) => section.id));

  return (
    <nav aria-labelledby="auf-dieser-seite" className={styles.nav}>
      <h2 id="auf-dieser-seite" className={styles.title}>
        Auf dieser Seite
      </h2>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`} aria-current={active === section.id ? "location" : undefined}>
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
