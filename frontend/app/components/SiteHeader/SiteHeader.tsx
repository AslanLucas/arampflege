import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { firstConsultationLink, mainNavigation } from "../../content/navigation";
import { useHydrated } from "../../hooks/useHydrated";
import { site } from "../../content/site";
import { ArrowRightIcon, CloseIcon, MenuIcon, MessagesSquareIcon } from "../Icon/icons";
import { Container } from "../Container/Container";
import styles from "./SiteHeader.module.css";

const NAVIGATION_ID = "hauptnavigation";

export function SiteHeader() {
  const hydrated = useHydrated();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLocationKey, setMenuLocationKey] = useState(location.key);
  const menuButton = useRef<HTMLButtonElement>(null);

  // Every navigation closes the menu.
  if (menuLocationKey !== location.key) {
    setMenuLocationKey(location.key);
    setMenuOpen(false);
  }

  // Compact, translucent header once the page is scrolled; state lives in a data attribute.
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const element = header.current;
    if (!element) {
      return;
    }
    const update = () => {
      element.dataset.scrolled = String(window.scrollY > 8);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  return (
    <header ref={header} className={styles.header}>
      <Container className={styles.bar}>
        <Link to="/" className={styles.logo}>
          <img
            src="/images/logo-aram-160.png"
            srcSet="/images/logo-aram-160.png 1x, /images/logo-aram-320.png 2x"
            width={64}
            height={64}
            alt=""
            className={styles.logoMark}
          />
          <span className={styles.wordmark}>
            <span className={styles.name}>{site.name}</span>
            <span className={styles.tagline}>{site.tagline}</span>
          </span>
        </Link>

        {/* Small screens: the number itself; from 40rem the free first consultation takes its place */}
        <a href={site.phone.href} className={styles.phone}>
          {site.phone.display}
          {" "}
          <span className="visually-hidden">anrufen</span>
        </a>
        <Link to={firstConsultationLink.to} className={styles.consult}>
          <span className={styles.consultShine} aria-hidden="true" />
          <MessagesSquareIcon size={20} />
          {firstConsultationLink.label}
          <ArrowRightIcon size={18} />
        </Link>

        {hydrated ? (
          <button
            ref={menuButton}
            type="button"
            className={styles.menuButton}
            aria-expanded={menuOpen}
            aria-controls={NAVIGATION_ID}
            onClick={() => {
              setMenuOpen((open) => !open);
            }}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
            Menü
          </button>
        ) : (
          <a href="#seitennavigation" className={styles.menuButton}>
            <MenuIcon />
            Menü
          </a>
        )}

        <nav id={NAVIGATION_ID} aria-label="Hauptnavigation" className={styles.nav} data-open={menuOpen}>
          <ul className={styles.navList}>
            {mainNavigation.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} className={styles.navLink}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
