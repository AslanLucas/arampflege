# Webseite [[PFLEGEDIENST-NAME]] – Ambulanter Pflegedienst

Diese Datei gilt für das gesamte Repository. Unterordner haben eigene `AGENTS.md`, die diese ergänzen.

## Zweck der Seite

Öffentliche Webseite eines ambulanten Pflegedienstes in [[ORT/REGION]]. Ziele in dieser Reihenfolge:

1. **Pflegeanfragen**: Anruf, Rückrufwunsch, Kontaktformular
2. **Bewerbungen** von Pflegefach- und Pflegehilfskräften
3. **Vertrauen** bei Angehörigen, Hausarztpraxen und Klinik-Sozialdiensten

Jede Seite und jede Komponente muss mindestens einem dieser Ziele dienen. Was keinem dient, wird nicht gebaut.

## Anspruch

Die Seite soll **sehr hochwertig** aussehen und dabei **leserlich, übersichtlich, vertrauenswürdig und vertrauensvoll** wirken. Hochwertig bedeutet Sorgfalt im Detail, nicht Effekte. Wenn Hochwertigkeit und Lesbarkeit kollidieren, gewinnt die Lesbarkeit. Was das konkret bedeutet, steht in `docs/DESIGN.md` (Abschnitte „Hochwertigkeit“, „Leserlichkeit und Übersichtlichkeit“, „Vertrauen“).

## Zielgruppen

- **Angehörige (45–70 Jahre)**: oft unter Zeitdruck, meist am Smartphone. Sie wollen in wenigen Sekunden wissen: Was bietet ihr an? Fahrt ihr zu uns? Wie erreiche ich euch?
- **Pflegebedürftige selbst**: teils eingeschränkte Sehkraft oder Feinmotorik.
- **Pflegekräfte auf Jobsuche**: fast ausschließlich mobil, wenig Geduld für lange Formulare.
- **Sozialdienste von Kliniken und Arztpraxen**: brauchen schnell Ansprechpartner, Erreichbarkeit und Einsatzgebiet.

## Stack

| Bereich  | Technik |
|----------|---------|
| Frontend | React 19, TypeScript (strict), Redux Toolkit + RTK Query, React Router (Framework Mode mit Prerendering), Vite, CSS Modules |
| Backend  | ASP.NET Core auf .NET 10 (LTS), EF Core, PostgreSQL |
| Betrieb  | Docker, Hosting ausschließlich in der EU |

Details stehen in `frontend/AGENTS.md` und `backend/AGENTS.md`.

## Verbindliche Dokumente

- `docs/DESIGN.md`: **vor jeder UI-Arbeit lesen.** Enthält die Liste verbotener Gestaltungsmuster.
- `docs/CONTENT.md`: **vor jedem sichtbaren Text lesen.** Tonalität, verbotene Floskeln, Fachbegriffe.
- `docs/OFFENE-PUNKTE.md`: Liste fehlender Inhalte vom Kunden. Pflegen, nicht ignorieren.

## Grundregeln

1. **Nichts erfinden.** Keine Kundenstimmen, Bewertungen, Zahlen („über 500 zufriedene Kunden“), Auszeichnungen, Siegel, Teamnamen, Preise oder Leistungsbeträge. Fehlt Inhalt, setze `[[INHALT FEHLT: kurze Beschreibung]]` und trage den Punkt in `docs/OFFENE-PUNKTE.md` ein.
2. **Keine Stockfotos und keine KI-generierten Bilder von Menschen.** Bildplatzhalter benennen das benötigte Motiv, z. B. `[[FOTO: Pflegekraft beim Hausbesuch, Querformat]]`.
3. **Datenschutz vor Komfort.** Keine Requests an Drittanbieter ohne Einwilligung. Das gilt für Fonts, Karten, Videos, Analytics, Captchas und CDNs.
4. **Barrierefreiheit nach WCAG 2.2 AA ist Pflicht** (Barrierefreiheitsstärkungsgesetz), keine Kür.
5. **Keine neue Abhängigkeit ohne Begründung** im Commit. Erst prüfen, ob es mit Plattformmitteln geht.
6. **Bei rechtlichen und pflegefachlichen Aussagen fragen statt raten.** Das betrifft Impressum, Datenschutz und Leistungen nach SGB V/SGB XI.
7. **Sprache:** Oberfläche und Inhalte auf Deutsch. Code, Bezeichner, Commits und Kommentare auf Englisch.

## Befehle

```bash
# Datenbank lokal
docker compose up -d db

# Frontend
cd frontend
npm ci
npm run dev          # Entwicklungsserver
npm run lint
npm run typecheck
npm test             # Vitest
npm run test:e2e     # Playwright inkl. axe-Checks
npm run build        # inkl. Prerendering

# Backend
cd backend
dotnet build
dotnet test
dotnet run --project src/Pflege.Api
```

## Definition of Done

Eine Aufgabe ist erst fertig, wenn:

- Lint, Typecheck und alle Tests grün sind
- die Seite bei 360 px Breite und bei 200 % Zoom ohne horizontales Scrollen funktioniert
- alles nur mit der Tastatur bedienbar ist und der Fokus jederzeit sichtbar ist
- Playwright/axe keine Verstöße meldet
- Lighthouse (mobil) für Performance mindestens 90 und für Accessibility, Best Practices und SEO jeweils 100 erreicht
- keine Regel aus „Verboten“ in `docs/DESIGN.md` oder `docs/CONTENT.md` verletzt ist

## Arbeitsweise

- Vor größeren Features zuerst einen kurzen Plan schreiben und bestätigen lassen.
- Kleine, in sich geschlossene Commits, ein Feature pro Commit.
- Bestehende Komponenten wiederverwenden, bevor neue entstehen.
- Wenn eine Vorgabe dieser Dateien einem Wunsch widerspricht: nachfragen, nicht stillschweigend abweichen.
