import type { Costs } from "../../content/services";
import { formatDate } from "../../utils/formatDate";
import styles from "./CostsInfo.module.css";

type CostsInfoProps = {
  costs: Costs | null;
};

export function CostsInfo({ costs }: CostsInfoProps) {
  if (!costs) {
    return <p>[[INHALT FEHLT: Wer bezahlt? Nur mit Quelle und Prüfdatum]]</p>;
  }

  return (
    <>
      <p>{costs.text}</p>
      <p className={styles.source}>
        Stand: <time dateTime={costs.checkedOn}>{formatDate(costs.checkedOn)}</time>
        {" · "}Quelle: {costs.source}
      </p>
    </>
  );
}
