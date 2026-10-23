import { contactFormLink } from "../../content/navigation";
import { site } from "../../content/site";
import { ArrowLink } from "../ArrowLink/ArrowLink";
import { ButtonLink } from "../ButtonLink/ButtonLink";
import { PhoneIcon } from "../Icon/icons";
import styles from "./ContactPrompt.module.css";

type ContactPromptProps = {
  title: string;
  text: string;
};

/** Closing call to action of a content page: phone call first, a message as the alternative. */
export function ContactPrompt({ title, text }: ContactPromptProps) {
  return (
    <section aria-labelledby="kontakt-aufnehmen" className={styles.prompt}>
      <h2 id="kontakt-aufnehmen" className={styles.title}>
        {title}
      </h2>
      <p>{text}</p>
      <div className={styles.actions}>
        <ButtonLink to={site.phone.href}>
          <PhoneIcon />
          {site.phone.display} anrufen
        </ButtonLink>
        <ArrowLink to={contactFormLink.to}>{contactFormLink.label}</ArrowLink>
      </div>
    </section>
  );
}
