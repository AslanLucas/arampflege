import { ErrorMessage, RequirementMarker, type Requirement } from "./FieldShell";
import styles from "./Form.module.css";

type Option<Value extends string> = {
  value: Value;
  label: string;
};

type RadioGroupProps<Value extends string> = {
  id: string;
  name: string;
  legend: string;
  options: Option<Value>[];
  value: Value | "";
  onChange: (value: Value) => void;
  requirement: Requirement;
  error?: string;
};

/** The first option's id equals `id`, so the error summary can link to the group. */
export function RadioGroup<Value extends string>({
  id,
  name,
  legend,
  options,
  value,
  onChange,
  requirement,
  error,
}: RadioGroupProps<Value>) {
  const errorId = `${id}-fehler`;

  return (
    <fieldset className={styles.fieldset} data-invalid={Boolean(error)}>
      <legend className={styles.label}>
        {legend}
        <RequirementMarker requirement={requirement} />
      </legend>
      <ErrorMessage id={errorId} error={error} />
      <div className={styles.options}>
        {options.map((option, index) => {
          const optionId = index === 0 ? id : `${id}-${option.value}`;
          return (
            <div key={option.value} className={styles.option}>
              <input
                id={optionId}
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                aria-describedby={error ? errorId : undefined}
                onChange={() => {
                  onChange(option.value);
                }}
              />
              <label htmlFor={optionId}>{option.label}</label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
