import type { RefObject } from "react";
import styles from "./Form.module.css";

export type SummaryEntry = {
  fieldId?: string;
  message: string;
};

type ErrorSummaryProps = {
  entries: SummaryEntry[];
  ref: RefObject<HTMLDivElement | null>;
};

/** Receives focus after a failed submit and links each error to its field. */
export function ErrorSummary({ entries, ref }: ErrorSummaryProps) {
  if (entries.length === 0) {
    return null;
  }

  return (
    <div ref={ref} tabIndex={-1} className={styles.summary}>
      <h2 className={styles.summaryTitle}>
        Bitte prüfen Sie Ihre Angaben
      </h2>
      <ul className={styles.summaryList}>
        {entries.map(({ fieldId, message }) => (
          <li key={`${fieldId ?? "form"}-${message}`}>
            {fieldId ? (
              <a
                href={`#${fieldId}`}
                onClick={(event) => {
                  event.preventDefault();
                  const field = document.getElementById(fieldId);
                  field?.focus();
                  field?.scrollIntoView({ block: "center" });
                }}
              >
                {message}
              </a>
            ) : (
              message
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
