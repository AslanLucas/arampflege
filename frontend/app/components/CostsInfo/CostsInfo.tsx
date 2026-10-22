import type { Costs } from "../../content/services";
import { formatDate } from "../../utils/formatDate";
import styles from "./CostsInfo.module.css";

type CostsInfoProps = {
  costs: Costs;
};

/** Cost information always shows its legal source and the date the client checked it. */
export function CostsInfo({ costs }: CostsInfoProps) {
  return (
    <>
      {costs.text.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p className={styles.source}>
        Quelle: {costs.source}
        {" · "}Stand:{" "}
        {costs.checkedOn ? (
          <time dateTime={costs.checkedOn}>{formatDate(costs.checkedOn)}</time>
        ) : (
          "[[INHALT FEHLT: Prüfdatum, vom Kunden freigegeben]]"
        )}
      </p>
    </>
  );
}
