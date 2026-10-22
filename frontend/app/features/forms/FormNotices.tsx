import { Link } from "react-router";
import { site } from "../../content/site";
import styles from "../../components/Form/Form.module.css";

/** "sie" everywhere, "du" on the careers pages (docs/CONTENT.md). */
type Address = "sie" | "du";

type NoticeProps = {
  address?: Address;
};

/** Short note at every form about what happens with the data (docs/DESIGN.md, "Vertrauen"). */
export function PrivacyNotice({ address = "sie" }: NoticeProps) {
  return (
    <p className={styles.privacy}>
      {address === "du"
        ? "Wir verwenden deine Angaben nur, um deine Bewerbung zu bearbeiten, und löschen sie nach "
        : "Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu bearbeiten, und löschen sie nach "}
      [[INHALT FEHLT: Löschfrist]]. Mehr dazu in unserer <Link to="/datenschutz">Datenschutzerklärung</Link>.
    </p>
  );
}

export const CONSENT_LABEL = "[[INHALT FEHLT: Einwilligungstext vom Kunden bzw. Datenschutzbeauftragten]]";

/** Forms need JavaScript to send; without it the phone number is the alternative. */
export function NoScriptNotice({ address = "sie" }: NoticeProps) {
  return (
    <noscript>
      <p>
        Zum Absenden des Formulars wird JavaScript benötigt.{" "}
        {address === "du" ? "Du erreichst uns telefonisch:" : "Sie erreichen uns telefonisch:"}{" "}
        <a href={site.phone.href}>{site.phone.display} anrufen</a>
      </p>
    </noscript>
  );
}
