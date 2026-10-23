import { firstConsultationLink } from "../../content/navigation";
import { site } from "../../content/site";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { PhoneIcon } from "../Icon/icons";
import styles from "./MobileContactBar.module.css";

export function MobileContactBar() {
  return (
    <>
      {/* Reserves the bar's height so it never covers the end of the page. */}
      <div className={styles.spacer} aria-hidden="true" />
      <aside aria-label="Schnellkontakt" className={styles.bar}>
        <ButtonLink to={site.phone.href} variant="primary">
          <PhoneIcon />
          Anrufen
        </ButtonLink>
        <ButtonLink to={firstConsultationLink.to} variant="secondary">
          {firstConsultationLink.label}
        </ButtonLink>
      </aside>
    </>
  );
}
