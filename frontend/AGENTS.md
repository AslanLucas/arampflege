# Frontend

Ergänzt die `AGENTS.md` im Repository-Root. Vor UI-Arbeit `docs/DESIGN.md`, vor Texten `docs/CONTENT.md` lesen.

## Stack

- React 19 mit TypeScript im `strict`-Modus, kein `any` ohne Kommentar mit Begründung
- React Router im Framework Mode mit **Prerendering** aller öffentlichen Seiten (SEO, Performance, funktioniert ohne JavaScript)
- Redux Toolkit für globalen Client-Zustand, **RTK Query** für alle API-Aufrufe
- Vite als Build-Tool
- CSS Modules und CSS Custom Properties. Kein Tailwind, keine UI-Bibliothek (MUI, Chakra, shadcn usw.), keine CSS-in-JS-Lösung.
- Tests: Vitest + React Testing Library, Playwright + `@axe-core/playwright`

## Ordnerstruktur

```
frontend/
  app/
    routes/            # eine Datei pro Route, nur Komposition und Meta-Daten
    components/        # wiederverwendbare UI-Bausteine, je Ordner: Komponente, CSS Module, Test
    features/          # fachliche Bereiche mit eigener Logik (contact, careers, callback)
      contact/
        ContactForm.tsx
        ContactForm.module.css
        contactApi.ts  # RTK-Query-Endpoints
        contactSlice.ts (nur falls Client-Zustand nötig)
    store/
      store.ts
      api.ts           # createApi-Basis, baseUrl aus Env
    content/           # Texte und strukturierte Inhalte (Leistungen, Orte) als TS-Objekte
    styles/
      tokens.css
      base.css         # Reset, Typografie, Fokus
  public/
    fonts/             # selbst gehostete WOFF2
    images/
```

## Redux-Regeln

- Server-Daten (Stellenanzeigen, Formular-Submits) laufen **nur über RTK Query**. Server-Daten werden nicht in eigenen Slices dupliziert.
- Slices nur für echten globalen UI-Zustand, z. B. Cookie-Einwilligung oder geöffnetes Mobilmenü, wenn mehrere Komponenten es brauchen.
- Lokaler Zustand (Formularfelder, Toggle einer Komponente) bleibt in `useState`. Redux ist kein Ersatz für Komponentenzustand.
- Typisierte Hooks `useAppDispatch` und `useAppSelector` verwenden.
- Statische Inhalte (Leistungen, Einsatzorte) kommen aus `app/content/`, nicht aus dem Store und nicht aus der API.

## Komponenten

- Funktionskomponenten, benannte Exporte, Props als `type`.
- **Semantisches HTML zuerst**: `<button>` für Aktionen, `<a>` für Navigation, `<nav>`, `<main>`, `<header>`, `<footer>`, korrekte Überschriftenhierarchie mit genau einer `<h1>` pro Seite.
- ARIA nur, wenn natives HTML nicht reicht.
- Keine Komponente ohne realen Einsatzzweck auf einer Seite.
- Bilder: `<img>` mit `width`/`height`, `loading="lazy"` außer oberhalb des Falzes, AVIF/WebP mit Fallback, aussagekräftiges `alt` (dekorative Bilder `alt=""`).
- Icons als inline-SVG-Komponenten aus **einer** Familie (z. B. Lucide, nur einzelne Icons importieren), `aria-hidden="true"` wenn dekorativ.

## Formulare

- Clientseitige Validierung nur als Komfort; maßgeblich ist die Validierung im Backend.
- Fehler vom Backend (`ProblemDetails`) werden den Feldern zugeordnet und angezeigt.
- Doppel-Submit verhindern, Ladezustand am Button anzeigen (`aria-busy`).
- Spam-Schutz ohne Drittanbieter: Honeypot-Feld und Zeitprüfung, kein reCAPTCHA.
- Formulare müssen ohne JavaScript zumindest eine Telefonnummer als Alternative anbieten.

## SEO und Meta

- Jede Route definiert `title` und `description` (unter 60 bzw. 160 Zeichen) über `meta()`.
- Strukturierte Daten als JSON-LD: `LocalBusiness` bzw. `MedicalBusiness` mit Adresse, Telefon und Öffnungszeiten, **nur mit echten Daten**.
- `sitemap.xml` und `robots.txt` werden beim Build erzeugt.
- Saubere deutsche URLs: `/leistungen/behandlungspflege`, `/karriere`, `/kontakt`.

## Datenschutz im Frontend

- Keine externen Requests beim Seitenaufruf. Fonts, Icons und Bilder werden lokal ausgeliefert.
- Keine Cookies und kein `localStorage` ohne Einwilligung, außer technisch notwendig.
- Kein Analytics standardmäßig. Falls gewünscht: selbst gehostetes, cookieloses Tool nach Absprache.
- Karten nur als statisches Bild mit Link „In Karten-App öffnen“.

## Performance

- JavaScript-Budget: initial unter 120 KB (gzip) pro Route.
- Keine Animationsbibliotheken (Framer Motion o. ä.).
- Routen per Code-Splitting laden.

## Tests

- Jede Komponente mit Interaktion hat einen RTL-Test, der über Rollen und Labels selektiert (`getByRole`, `getByLabelText`), nicht über Klassen oder Test-IDs.
- Jede Seite hat einen Playwright-Test mit axe-Prüfung und einen Test nur mit Tastatur für die Hauptaktion.
- Visuelle Prüfung bei 360, 768 und 1280 px.
