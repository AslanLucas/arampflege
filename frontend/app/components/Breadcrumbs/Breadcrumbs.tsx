import { Link } from "react-router";
import type { NavigationItem } from "../../content/navigation";
import styles from "./Breadcrumbs.module.css";

type BreadcrumbsProps = {
  /** Pages above the current one; the start page is added automatically. */
  trail?: NavigationItem[];
  current: string;
};

export function Breadcrumbs({ trail = [], current }: BreadcrumbsProps) {
  return (
    <nav aria-label="Sie sind hier" className={styles.breadcrumbs}>
      <ol className={styles.list}>
        {[{ label: "Start", to: "/" }, ...trail].map((item) => (
          <li key={item.to} className={styles.item}>
            <Link to={item.to}>{item.label}</Link>
          </li>
        ))}
        <li className={styles.item}>
          <span aria-current="page">{current}</span>
        </li>
      </ol>
    </nav>
  );
}
