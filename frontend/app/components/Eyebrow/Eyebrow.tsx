import type { ReactNode } from "react";
import styles from "./Eyebrow.module.css";

type EyebrowProps = {
  children: ReactNode;
};

/** Short uppercase label with a leading line, placed above a heading. */
export function Eyebrow({ children }: EyebrowProps) {
  return <p className={styles.eyebrow}>{children}</p>;
}
