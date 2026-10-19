import { site } from "../../content/site";
import styles from "./PostalAddress.module.css";

export function PostalAddress() {
  return (
    <address className={styles.address}>
      {site.name}
      <br />
      {site.address.street}
      <br />
      {site.address.postalCodeAndCity}
    </address>
  );
}
