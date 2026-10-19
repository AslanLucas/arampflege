import type { ReactNode } from "react";
import styles from "./DetailList.module.css";

export type Detail = {
  term: string;
  description: ReactNode;
};

type DetailListProps = {
  details: Detail[];
};

export function DetailList({ details }: DetailListProps) {
  return (
    <dl className={styles.list}>
      {details.map(({ term, description }) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{description}</dd>
        </div>
      ))}
    </dl>
  );
}
