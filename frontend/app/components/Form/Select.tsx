import { FieldShell, type Requirement } from "./FieldShell";
import styles from "./Form.module.css";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  id: string;
  name: string;
  label: string;
  options: Option[];
  /** Text of the empty first option, which is selected until the visitor picks one. */
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  requirement: Requirement;
  error?: string;
};

export function Select({ id, name, label, options, placeholder, value, onChange, requirement, error }: SelectProps) {
  return (
    <FieldShell id={id} label={label} requirement={requirement} error={error}>
      {(control) => (
        <select
          {...control}
          className={styles.select}
          name={name}
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </FieldShell>
  );
}
