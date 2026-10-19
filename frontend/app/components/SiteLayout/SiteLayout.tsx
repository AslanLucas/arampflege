import type { ReactNode } from "react";
import { MobileContactBar } from "../MobileContactBar/MobileContactBar";
import { SiteFooter } from "../SiteFooter/SiteFooter";
import { SiteHeader } from "../SiteHeader/SiteHeader";
import { SkipLink } from "../SkipLink/SkipLink";
import styles from "./SiteLayout.module.css";

const MAIN_ID = "inhalt";

type SiteLayoutProps = {
  children: ReactNode;
};

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className={styles.page}>
      <SkipLink targetId={MAIN_ID} />
      <SiteHeader />
      <main id={MAIN_ID} className={styles.main}>
        {children}
      </main>
      <SiteFooter />
      <MobileContactBar />
    </div>
  );
}
