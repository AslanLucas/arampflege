import type { ReactNode } from "react";
import styles from "./Form.module.css";

export type Requirement = "required" | "optional" | "none";

export type ControlProps = {
  id: string;
  "aria-invalid": boolean;
  "aria-describedby": string | undefined;
};

type FieldShellProps = {
  id: string;
  label: string;
  requirement: Requirement;
  hint?: ReactNode;
  error?: string;
  /** Id of a description outside the field, e.g. a hint shared by a group of fields. */
  describedBy?: string;
  children: (control: ControlProps) => ReactNode;
};

export function RequirementMarker({ requirement }: { requirement: Requirement }) {
  if (requirement === "none") {
    return null;
  }
  return <span className={styles.requirement}> ({requirement === "required" ? "Pflichtangabe" : "optional"})</span>;
}

export function ErrorMessage({ id, error }: { id: string; error?: string }) {
  if (!error) {
    return null;
  }
  return (
    <p id={id} className={styles.error}>
      <span className="visually-hidden">Fehler:</span> {error}
    </p>
  );
}

/** Label above the control, then hint and error, all linked via aria-describedby. */
export function FieldShell({ id, label, requirement, hint, error, describedBy, children }: FieldShellProps) {
  const hintId = hint ? `${id}-hinweis` : undefined;
  const errorId = error ? `${id}-fehler` : undefined;
  const descriptionIds = [errorId, hintId, describedBy].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.field} data-invalid={Boolean(error)}>
      <label htmlFor={id} className={styles.label}>
        {label}
        <RequirementMarker requirement={requirement} />
      </label>
      {hint && (
        <p id={hintId} className={styles.hint}>
          {hint}
        </p>
      )}
      <ErrorMessage id={`${id}-fehler`} error={error} />
      {children({ id, "aria-invalid": Boolean(error), "aria-describedby": descriptionIds })}
    </div>
  );
}
