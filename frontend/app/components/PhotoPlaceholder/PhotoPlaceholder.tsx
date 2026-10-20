import styles from "./PhotoPlaceholder.module.css";

type PhotoPlaceholderProps = {
  motif: string;
  /** Where the motif label sits, so overlapping elements do not cover it. */
  labelPosition?: "top" | "bottom";
  ratio: "3 / 2" | "4 / 3" | "4 / 5" | "5 / 4";
};

/** Keeps the final image's aspect ratio until the real photo is delivered. */
export function PhotoPlaceholder({ motif, ratio, labelPosition = "bottom" }: PhotoPlaceholderProps) {
  return (
    <div className={styles.placeholder} data-label={labelPosition} style={{ aspectRatio: ratio }}>
      <p>[[FOTO: {motif}]]</p>
    </div>
  );
}
