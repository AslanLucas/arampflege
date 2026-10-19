import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Container } from "../Container/Container";
import styles from "./Section.module.css";

type SectionProps = {
  id: string;
  /** Rendered as the section's h2. */
  title: string;
  tone?: "plain" | "alt";
  className?: string;
  children: ReactNode | ((heading: ReactNode) => ReactNode);
};

/**
 * A page section labelled by its h2. Pass a render function as children to
 * position the heading inside the section's own layout.
 */
export function Section({ id, title, tone = "plain", className, children }: SectionProps) {
  const headingId = `${id}-titel`;
  const heading = (
    <h2 id={headingId} className={styles.heading}>
      {title}
    </h2>
  );

  return (
    <section id={id} aria-labelledby={headingId} className={cx(styles.section, styles[tone])}>
      <Container className={className}>
        {typeof children === "function" ? (
          children(heading)
        ) : (
          <>
            {heading}
            {children}
          </>
        )}
      </Container>
    </section>
  );
}
