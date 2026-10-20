import type { ReactNode } from "react";
import { cx } from "../../utils/cx";
import { Container } from "../Container/Container";
import styles from "./Section.module.css";

type SectionProps = {
  id: string;
  /** Rendered as the section's h2. */
  title: string;
  /** Short text next to the heading on wide screens, below it on small ones. */
  intro?: ReactNode;
  tone?: "plain" | "alt" | "brand";
  /** No top padding, for a section that continues the one before it. */
  flushTop?: boolean;
  className?: string;
  children: ReactNode | ((heading: ReactNode) => ReactNode);
};

/**
 * A page section labelled by its h2. Pass a render function as children to
 * position the heading inside the section's own layout.
 */
export function Section({ id, title, intro, tone = "plain", flushTop = false, className, children }: SectionProps) {
  const headingId = `${id}-titel`;
  const heading = (
    <h2 id={headingId} className={styles.heading}>
      {title}
    </h2>
  );

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cx(styles.section, styles[tone], flushTop && styles.flushTop)}
      data-surface={tone === "brand" ? "brand" : undefined}
    >
      <Container className={className}>
        {typeof children === "function" ? (
          children(heading)
        ) : (
          <>
            {intro ? (
              <div className={styles.header}>
                {heading}
                <div className={styles.intro}>{intro}</div>
              </div>
            ) : (
              heading
            )}
            {children}
          </>
        )}
      </Container>
    </section>
  );
}
