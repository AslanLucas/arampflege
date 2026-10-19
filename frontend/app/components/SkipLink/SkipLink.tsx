import styles from "./SkipLink.module.css";

type SkipLinkProps = {
  targetId: string;
};

export function SkipLink({ targetId }: SkipLinkProps) {
  return (
    <a href={`#${targetId}`} className={styles.skipLink}>
      Zum Inhalt springen
    </a>
  );
}
