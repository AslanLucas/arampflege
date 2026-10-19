import styles from "./Form.module.css";

type SubmitButtonProps = {
  label: string;
  busy: boolean;
  /** Without JavaScript the form cannot be sent; the button stays disabled until hydration. */
  ready: boolean;
};

export function SubmitButton({ label, busy, ready }: SubmitButtonProps) {
  return (
    <button type="submit" className={styles.submit} aria-busy={busy} disabled={!ready}>
      {busy ? "Wird gesendet …" : label}
    </button>
  );
}
