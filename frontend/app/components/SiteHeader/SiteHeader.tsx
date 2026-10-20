import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { mainNavigation } from "../../content/navigation";
import { useHydrated } from "../../hooks/useHydrated";
import { site } from "../../content/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "../Icon/icons";
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
    <header className={styles.header}>
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

        <a href={site.phone.href} className={styles.phone}>
          <span className={styles.phoneIcon} aria-hidden="true">
            <PhoneIcon />
          </span>
          <span className={styles.phoneText}>
            <span className={styles.phoneLabel}>Telefon</span>
            <span className={styles.phoneNumber}>
              {site.phone.display}
              <span className="visually-hidden"> anrufen</span>
            </span>
          </span>
        </a>

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
