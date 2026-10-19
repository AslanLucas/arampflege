import type { ReactNode } from "react";
import { FieldShell, type Requirement } from "./FieldShell";
import styles from "./Form.module.css";

type TextAreaProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  requirement: Requirement;
  hint?: ReactNode;
  error?: string;
  maxLength?: number;
};

export function TextArea({ id, name, label, value, onChange, requirement, hint, error, maxLength }: TextAreaProps) {
  return (
    <FieldShell id={id} label={label} requirement={requirement} hint={hint} error={error}>
      {(control) => (
        <textarea
          {...control}
          className={styles.textarea}
          name={name}
          rows={6}
          value={value}
          maxLength={maxLength}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      )}
    </FieldShell>
  );
}
