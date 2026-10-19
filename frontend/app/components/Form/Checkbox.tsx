import type { ReactNode } from "react";
import { ErrorMessage } from "./FieldShell";
import styles from "./Form.module.css";

type CheckboxProps = {
  id: string;
  name: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: ReactNode;
  error?: string;
};

export function Checkbox({ id, name, checked, onChange, children, error }: CheckboxProps) {
  const errorId = `${id}-fehler`;

  return (
    <div className={styles.field} data-invalid={Boolean(error)}>
      <ErrorMessage id={errorId} error={error} />
      <div className={styles.option}>
        <input
          id={id}
          type="checkbox"
          name={name}
          checked={checked}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          onChange={(event) => {
            onChange(event.target.checked);
          }}
        />
        <label htmlFor={id}>{children}</label>
      </div>
    </div>
  );
}
