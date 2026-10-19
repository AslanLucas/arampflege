import type { ReactNode } from "react";
import { Link } from "react-router";
import { cx } from "../../utils/cx";
import styles from "./ButtonLink.module.css";

type ButtonLinkProps = {
  to: string;
  variant?: "primary" | "secondary";
  className?: string;
  children: ReactNode;
};

/** A link styled as a button. `to` also accepts absolute URLs such as `tel:` and `mailto:`. */
export function ButtonLink({ to, variant = "primary", className, children }: ButtonLinkProps) {
  return (
    <Link to={to} className={cx(styles.button, styles[variant], className)}>
      {children}
    </Link>
  );
}
