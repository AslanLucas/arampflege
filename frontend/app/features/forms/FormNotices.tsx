import { Link } from "react-router";
import { site } from "../../content/site";
import styles from "../../components/Form/Form.module.css";

/** Short note at every form about what happens with the data (docs/DESIGN.md, "Vertrauen"). */
export function PrivacyNotice() {
  return (
    <p className={styles.privacy}>
      Wir verwenden Ihre Angaben nur, um Ihre Anfrage zu bearbeiten, und löschen sie nach [[INHALT FEHLT:
      Löschfrist]]. Mehr dazu in unserer <Link to="/datenschutz">Datenschutzerklärung</Link>.
    </p>
  );
}

export const CONSENT_LABEL = "[[INHALT FEHLT: Einwilligungstext vom Kunden bzw. Datenschutzbeauftragten]]";

/** Forms need JavaScript to send; without it the phone number is the alternative. */
export function NoScriptNotice() {
  return (
    <noscript>
      <p>
        Zum Absenden des Formulars wird JavaScript benötigt. Sie erreichen uns telefonisch:{" "}
        <a href={site.phone.href}>{site.phone.display} anrufen</a>
      </p>
    </noscript>
  );
}
