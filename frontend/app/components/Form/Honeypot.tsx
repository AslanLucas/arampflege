import styles from "./Form.module.css";

type HoneypotProps = {
  value: string;
  onChange: (value: string) => void;
};

/** Hidden from people and assistive technology; bots fill it in and are discarded by the API. */
export function Honeypot({ value, onChange }: HoneypotProps) {
  return (
    <div className={styles.honeypot} aria-hidden="true">
      <label htmlFor="website">Bitte dieses Feld leer lassen</label>
      <input
        id="website"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
      />
    </div>
  );
}
