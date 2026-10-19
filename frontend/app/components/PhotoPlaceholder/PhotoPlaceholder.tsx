import styles from "./PhotoPlaceholder.module.css";

type PhotoPlaceholderProps = {
  motif: string;
  ratio: "3 / 2" | "4 / 3";
};

/** Keeps the final image's aspect ratio until the real photo is delivered. */
export function PhotoPlaceholder({ motif, ratio }: PhotoPlaceholderProps) {
  return (
    <div className={styles.placeholder} style={{ aspectRatio: ratio }}>
      <p>[[FOTO: {motif}]]</p>
    </div>
  );
}
