import styles from "./OnThisPage.module.css";

export type PageSection = {
  id: string;
  label: string;
};

type OnThisPageProps = {
  sections: PageSection[];
};

export function OnThisPage({ sections }: OnThisPageProps) {
  return (
    <nav aria-labelledby="auf-dieser-seite" className={styles.nav}>
      <h2 id="auf-dieser-seite" className={styles.title}>
        Auf dieser Seite
      </h2>
      <ul className={styles.list}>
        {sections.map((section) => (
          <li key={section.id}>
            <a href={`#${section.id}`}>{section.label}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
