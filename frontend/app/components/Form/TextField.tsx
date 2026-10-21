import type { HTMLInputAutoCompleteAttribute, ReactNode } from "react";
import { FieldShell, type Requirement } from "./FieldShell";
import styles from "./Form.module.css";

type TextFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  requirement: Requirement;
  type?: "text" | "tel" | "email";
  autoComplete?: HTMLInputAutoCompleteAttribute;
  hint?: ReactNode;
  error?: string;
  describedBy?: string;
  maxLength?: number;
};

export function TextField({
  id,
  name,
  label,
  value,
  onChange,
  requirement,
  type = "text",
  autoComplete,
  hint,
  error,
  describedBy,
  maxLength,
}: TextFieldProps) {
  return (
    <FieldShell
      id={id}
      label={label}
      requirement={requirement}
      hint={hint}
      error={error}
      describedBy={describedBy}
    >
      {(control) => (
        <input
          {...control}
          className={styles.input}
          name={name}
          type={type}
          value={value}
          autoComplete={autoComplete}
          maxLength={maxLength}
          spellCheck={type === "text" ? undefined : false}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        />
      )}
    </FieldShell>
  );
}
