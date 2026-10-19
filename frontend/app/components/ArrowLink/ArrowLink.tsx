import type { ReactNode } from "react";
import { Link } from "react-router";
import { ArrowRightIcon } from "../Icon/icons";
import styles from "./ArrowLink.module.css";

type ArrowLinkProps = {
  to: string;
  children: ReactNode;
};

export function ArrowLink({ to, children }: ArrowLinkProps) {
  return (
    <Link to={to} className={styles.link}>
      {children}
      <ArrowRightIcon size={18} />
    </Link>
  );
}
