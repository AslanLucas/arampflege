import type { Costs } from "../../content/services";
import styles from "./CostsInfo.module.css";

const dateFormat = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

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
        Stand: <time dateTime={costs.checkedOn}>{dateFormat.format(new Date(costs.checkedOn))}</time>
        {" · "}Quelle: {costs.source}
      </p>
    </>
  );
}
