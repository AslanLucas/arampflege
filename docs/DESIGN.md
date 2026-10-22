# Designrichtlinien

## Haltung

Die Seite soll aussehen, als hätte ein sehr gutes Designstudio sie für genau diesen Pflegedienst gebaut. Sie soll nicht nach Template und nicht nach SaaS-Landingpage aussehen.

Die vier Leitbegriffe, in dieser Rangfolge:

1. **Vertrauenswürdig**: Alles wirkt echt, überprüfbar und ehrlich.
2. **Leserlich und übersichtlich**: Jede Person findet in Sekunden, was sie sucht, auch mit schlechten Augen am Smartphone.
3. **Sehr hochwertig**: Die Qualität zeigt sich in Sorgfalt und Präzision, nicht in Effekten.
4. **Vertrauensvoll und warm**: Die Seite wirkt menschlich und zugewandt, nicht klinisch und nicht kühl.

Wenn Hochwertigkeit und Lesbarkeit kollidieren, gewinnt die Lesbarkeit.

**Vergleichsmaßstäbe:** Hochwertige Editorial-Gestaltung, wie sie gute Buchverlage, Privatkliniken, renommierte Kanzleien oder Stiftungen verwenden. Davon übernehmen wir die Ruhe, die Typografie und die Präzision, aber ohne Kälte und ohne Luxus-Gesten. Start-up-, Tech- und Agentur-Showcase-Seiten sind kein Vorbild.

Der Inhalt bestimmt das Layout. Eine Sektion mit Öffnungszeiten sieht anders aus als eine Sektion mit Leistungen oder mit dem Team.

---

## Hochwertigkeit

Hochwertig heißt hier: **wenige Elemente, perfekt ausgeführt.** Den Unterschied zum Template machen Details, die niemand bewusst bemerkt, die aber jeder spürt.

### Typografie als Hauptgestaltungsmittel
- Die Schrift trägt die Gestaltung, nicht Grafiken. Überschriften in der modernen Sans (Plus Jakarta Sans) mit großzügigem Größenkontrast zum Fließtext.
- Echte typografische Zeichen: „deutsche Anführungszeichen“, Gedankenstrich – statt Bindestrich, Halbgeviert für Zeiträume (8–16 Uhr), geschütztes Leerzeichen zwischen Zahl und Einheit sowie in Telefonnummern.
- `text-wrap: balance` für Überschriften, `text-wrap: pretty` für Absätze, `hyphens: auto` mit `lang="de"`. Keine einzelnen Wörter in der letzten Zeile einer Überschrift.
- Tabellenziffern (`font-variant-numeric: tabular-nums`) für Zeiten, Telefonnummern und Tabellen.
- Versalien nur für kurze Labels, dann mit leicht erhöhter Laufweite (`letter-spacing: 0.06em`).

### Weißraum und Raster
- Großzügiger Weißraum ist das wichtigste Qualitätsmerkmal. Sektionen bekommen mindestens `--space-8` (64 px) Abstand, auf Desktop `--space-9` (96 px).
- 12-Spalten-Raster auf Desktop. Text sitzt bewusst auf dem Raster, z. B. Spalte 2–8, Bild Spalte 8–12. Kein „alles mittig auf voller Breite“.
- Vertikaler Rhythmus: Alle Abstände stammen aus der Abstandsskala, es gibt keine Zufallswerte.

### Details
- Feine Linien (1 px, `--color-border`) statt Schatten und Kästen, um Bereiche zu gliedern.
- Einheitliche Bildformate: Hochformat 4 : 5 (oberer Bereich, Porträts), Querformat 5 : 4 und 3 : 2. Einheitliche Bildbearbeitung (gleiche Farbstimmung, natürliches Licht, keine Filter).
- Saubere Zustände für alles Interaktive: Hover, Fokus, Aktiv, Deaktiviert, Laden und Fehler sind gestaltet, nicht dem Browser überlassen.
- Pixelgenaue Ausrichtung: Text, Bilder und Linien beginnen auf denselben Kanten.
- Favicon, Social-Preview-Bild (`og:image`), 404-Seite und Druckansicht (`@media print`) sind gestaltet.

### Fotografie
- Hochwertigkeit steht und fällt mit den Fotos. Empfehlung an den Kunden: **ein professionelles Shooting** mit dem echten Team im echten Alltag (Hausbesuch, Dienstfahrzeug, Büro, Teambesprechung).
- Bis dahin Platzhalter verwenden (`[[FOTO: …]]`). Ein schlechtes Foto ist schlechter als kein Foto.

---

## Leserlichkeit und Übersichtlichkeit

- Fließtext 18 px, Zeilenhöhe 1,6, Zeilenlänge maximal 68 Zeichen.
- **Fließtextkontrast mindestens 7 : 1** (WCAG AAA), weil viele Leser älter sind. Für Überschriften und UI genügt AA.
- Kein grauer Text auf grauem Grund, kein Text auf Fotos ohne vollflächig deckenden Hintergrund.
- Kurze Absätze mit höchstens vier Zeilen auf Mobilgeräten. Zwischenüberschriften spätestens nach drei Absätzen.
- **Eine Hauptaktion pro Sektion.** Zwei gleich starke Buttons nebeneinander sind verboten.
- Gleiche Dinge stehen immer an der gleichen Stelle: Telefon oben rechts, Kontakt am Seitenende und Navigation in derselben Reihenfolge.
- Unterseiten zeigen eine Brotkrumennavigation. Lange Seiten beginnen mit einer kurzen Sprungliste („Auf dieser Seite“).
- Links sind als Links erkennbar (unterstrichen im Fließtext), nicht nur durch Farbe.
- Die wichtigste Information jeder Seite steht ohne Scrollen sichtbar im oberen Bereich, auch bei 360 px Breite.

---

## Vertrauen

Vertrauen entsteht durch **Überprüfbarkeit**, nicht durch Behauptungen. Jedes Vertrauenselement muss echt sein (siehe Grundregel 1 in `AGENTS.md`).

### Was Vertrauen schafft
- **Echte Menschen mit Namen**: Pflegedienstleitung und feste Ansprechpartnerin mit Foto, Funktion und Qualifikation, nur mit Einwilligung.
- **Erreichbarkeit transparent**: Bürozeiten, Rufbereitschaft und die Antwortzeit auf Rückrufwünsche werden genau genannt.
- **Wer steckt dahinter**: Inhaber oder Träger, Standort mit Adresse und Foto des Büros, Gründungsjahr, sofern vorhanden.
- **Nachweise nur, wenn echt**: Versorgungsvertrag mit den Pflegekassen, Mitgliedschaften (z. B. Verbände) und Qualitätsprüfungen, jeweils nur nach Bestätigung durch den Kunden.
- **Ablauf erklären**: „Was passiert nach Ihrem Anruf?“ in wenigen, nummerierten Schritten. Das nimmt Unsicherheit.
- **Kosten ehrlich erklären**: Was übernimmt die Kasse, was nicht, und wie erfährt man den eigenen Anteil. Nur mit vom Kunden geprüften Inhalten.
- **Datenschutz sichtbar**: Direkt am Formular ein kurzer Satz, was mit den Daten passiert, mit Link zur Datenschutzerklärung.
- **Aktualität**: Stellenanzeigen mit Datum. Veraltete Inhalte werden entfernt.
- **Technische Sorgfalt**: keine kaputten Links, keine Fehlermeldungen, schnelle Ladezeit. Auch das wird als Seriosität wahrgenommen.

### Was Vertrauen zerstört
- Pop-ups, Chat-Widgets, Newsletter-Overlays
- Cookie-Banner mit hervorgehobenem „Alle akzeptieren“ und verstecktem „Ablehnen“. Wenn ein Banner nötig ist, sind beide Optionen gleichwertig gestaltet.
- Künstliche Dringlichkeit („Nur noch wenige Plätze frei!“)
- Fehlende oder schwer auffindbare Pflichtangaben (Impressum, Datenschutz)
- Generische Bilder, die erkennbar nicht den echten Dienst zeigen
- Übertriebene Versprechen und Superlative

### Vertrauensvoll und warm, ohne kitschig zu sein
- Wärme entsteht durch das warme Off-White, das Himbeerrot aus dem Logo, die Serifenschrift, echte Gesichter und eine zugewandte Sprache.
- Keine Herzen, Hände, Blätter oder Puzzleteile als Symbole. Ausnahme ist das Logo des Kunden selbst (Herz mit zwei Personen); sein Motiv wird nirgends als Gestaltungselement wiederholt.
- Keine Pastell-Kinderfarben. Die Seite richtet sich an Erwachsene in einer ernsten Lebenslage.

---

## Verboten

Diese Muster lassen eine Seite sofort generisch oder KI-generiert wirken. Sie werden nicht verwendet, auch nicht „nur ein bisschen“.

### Layout
- Hero mit zentrierter Riesenüberschrift, Untertitel, zwei Buttons nebeneinander und Verlauf oder Blob im Hintergrund
- Raster aus 3, 4 oder 6 identischen Karten mit Icon oben, Überschrift und zwei Zeilen Text (Ausnahme: die Drehkarten der Leistungen, siehe „Effekte“)
- Jede Sektion zentriert, gleich hoch und mit gleichem Abstand übereinandergestapelt
- Bento-Grids, Karten in Karten, Glow; Glassmorphism und Blur nur beim mitlaufenden Header (siehe „Effekte“)
- Pill-Badges über Überschriften („Unser Versprechen“, „Warum wir?“); runde Chips nur als kurze Status-Hinweise mit wahrer Aussage, nie als Button
- Statistikleisten mit hochzählenden Zahlen
- Testimonial-Karussells, Logo-Laufbänder, Slider jeder Art
- Dark Mode als Standard

### Farbe und Oberfläche
- Farbverläufe als Hintergrund, auf Buttons oder auf Text
- Lila, Indigo und Violett sowie Cyan-zu-Blau-Verläufe
- Klischee-Krankenhaus-Türkis als Hauptfarbe
- Schatten als alleiniges Gestaltungsmittel ohne Linie oder Fläche
- Unschärfe (`backdrop-filter`) über bewegtem Bild, z. B. über dem Hintergrundvideo: zu teuer auf schwachen Geräten

### Icons und Bilder
- Emojis als Icons oder Aufzählungszeichen
- Ein Icon vor jeder Überschrift
- Sparkle-, Stern- oder Zauberstab-Symbole
- Stockfotos (lächelnde Seniorin mit Pflegerin im weißen Kittel, Händehalten in Nahaufnahme)
- KI-generierte Menschen oder Illustrationen im „Corporate Memphis“-Stil (Ausnahme: die zwei Lottie-Szenen unter „Effekte“)
- 3D-Illustrationen

### Bewegung
- Parallax-Effekte
- Karussells und Slider jeder Art
- Videos mit Ton oder ohne Pause-Knopf; Animationen, die sich endlos wiederholen (außer dem Hintergrundvideo)
- Animationsbibliotheken (Ausnahme: `lottie-web` im Light-Build, nur für `LottieScene`)
- Jede Bewegung, die bei `prefers-reduced-motion: reduce` weiterläuft

### Typografie
- Ausschließlich Inter bzw. system-ui ohne gestalterische Entscheidung
- Alles fett, sehr große Überschriften mit enger Laufweite
- Überschriften in englischer Title Case. Im Deutschen gilt normale Satzschreibung.

---

## Stattdessen

- **Inhaltsgetriebene, teils asymmetrische Layouts**: Text links, Bild rechts mit unterschiedlicher Breite; einfache Listen; Tabellen für Zeiten und Kosten; Karte für das Einsatzgebiet.
- **Linksbündiger Text**, Zeilenlänge maximal 68 Zeichen (`max-width: 68ch`).
- **Echte Fotos**: das echte Team, die Dienstfahrzeuge, das Büro, Orte im Einsatzgebiet. Personen mit Namen und Funktion, nur mit schriftlicher Einwilligung.
- **Konkretheit sichtbar machen**: Telefonnummer, Bürozeiten, Rufbereitschaft, Einsatzorte mit Namen, feste Ansprechpartnerin mit Foto.
- **Farbe zur Orientierung, nicht zur Dekoration**: eine Hauptfarbe, ein sparsamer Akzent, viel ruhige Fläche.
- **Icons nur mit Bedeutung**: Telefon, E-Mail, Pfeil, Download, externer Link. Eine Icon-Familie mit einheitlicher Strichstärke.
- **Bewegung mit Zurückhaltung**: Rückmeldungen (Hover, Fokus) 150–250 ms, Einblendungen höchstens 700 ms. `prefers-reduced-motion` wird immer respektiert.

---

## Digitale Formsprache (Entscheidung 2026-10-21)

Die Seite soll wie ein neuer, digital aufgestellter Pflegedienst wirken. Dafür:

- **Erreichbarkeit im oberen Bereich**: Bürozeiten und Rufbereitschaft stehen über dem Video direkt unter „Anrufen“ und „Rückruf anfordern“.
- **Karte des Einsatzgebiets** (`ServiceAreaMap`, Entscheidung 2026-10-22, ersetzt die Lupen-Grafik): echte Umrisse von Gronau, Gronau-Epe, Ochtrup, Heek und Ahaus aus OpenStreetMap, einmalig mit `frontend/scripts/service-area-map.py` erzeugt (dazu Fahrstrecke und Fahrzeit vom Büro über OSRM, als feste Werte gespeichert). Beim Zeigen hebt sich der Ort an, die Route vom Standort zeichnet sich, das Standort-Schild zeigt Entfernung und Fahrzeit. Die Liste unter der Karte ist die zugängliche Fassung für Tastatur, Touch und Screenreader; die Karte selbst ist dekorativ. Keine Anfragen an Kartendienste beim Seitenaufruf.
- **Kontakt-Karten** (`ContactPanel`, Entscheidung 2026-10-21): Telefon (hervorgehoben in Markenfarbe), E-Mail und Rückruf, Adresse mit Karte, Bürozeiten als Tabelle, Hinweis aufs Einsatzgebiet. Die Karten stehen untereinander, nur E-Mail und Rückruf teilen sich eine Zeile. Auf `/kontakt` neben dem Formular, auf der Startseite neben kurzem Text mit Buttons zum Formular und zum Rückruf, dort ohne Formular (JS-Budget).
- **Statisches Kartenbild**: einmalig mit `frontend/scripts/static-map.py` aus OpenStreetMap-Kacheln erzeugt und selbst ausgeliefert (AVIF/WebP), Pin als SVG darüber, Quellenangabe „© OpenStreetMap-Mitwirkende“ und Link „In Karten-App öffnen“. Keine eingebettete Karte, keine Anfragen an Kartendienste beim Seitenaufruf.
- **Was dich bei uns erwartet** (`EmployerPromises`, Karriereseite, Entscheidung 2026-10-22): der wichtigste Punkt als große Karte in Markenfarbe, die übrigen als ruhige Liste mit Symbol und Trennlinien daneben, versetzt einblendend. Bewusst kein Raster gleicher Karten. Nur vom Kunden bestätigte Zusagen.
- Digitale Angebote werden nur genannt, wenn sie bestätigt sind (`docs/CONTENT.md`).

## Effekte (Entscheidung 2026-10-20)

Auf Wunsch des Kunden ist die Seite lebendiger. Diese Effekte sind erlaubt, jeweils nur mit den genannten Bedingungen:

| Effekt | Bedingungen |
|--------|-------------|
| Hintergrundvideo im oberen Bereich (`HeroVideo`) | Ohne Ton, mehrere kurze Clips nacheinander, darüber die Markenfarbe mit 80 % Deckkraft (Text mind. 7 : 1 auch über weißen Bildstellen), sichtbarer Pause-Knopf (WCAG 2.2.2). Nur ab 640 px, ohne „Bewegung reduzieren“ und ohne Datensparmodus; sonst ein Standbild. Lädt erst nach der Seite. |
| Drehkarten der Leistungen (`ServiceCards`) | Vorne Foto der Leistung (läuft nach unten aus), Symbol auf der Kante, Name und Kostenträger als Status-Chip; hinten Kurztext, bis zu drei Beispiele und Link. Drehen bei Hover und bei Tastaturfokus auf dem Link. Beide Seiten sind immer im DOM und werden vorgelesen. Bei Touch-Geräten, unter 640 px und bei „Bewegung reduzieren“ stehen beide Seiten ohne Drehung untereinander. |
| Einblenden beim Scrollen (`useReveal`) | Nur Elemente, die beim Laden unterhalb des sichtbaren Bereichs liegen; ohne JavaScript und bei „Bewegung reduzieren“ ist alles sofort sichtbar. |
| Animierte Ablauf-Schritte | Linie zeichnet sich, Ziffer erscheint, Schritte versetzt; gleiche Bedingungen wie das Einblenden. |
| Erstgespräch-Button im Header (Entscheidung 2026-10-22) | Ab 640 px ersetzt „Kostenloses Erstgespräch“ (führt zum Rückrufformular) die Telefonnummer oben rechts; darunter bleibt die Nummer, dazu kommt die Kontaktleiste unten. Verlauf in Markenfarben, Ring pulsiert nach dem Laden dreimal, ein Lichtschimmer läuft zweimal (zusammen unter 5 s, WCAG 2.2.2); beim Darüberfahren pulsiert der Ring weiter. Bei „Bewegung reduzieren“ steht alles still. |
| Mitlaufender Header | Wird beim Scrollen kompakter und leicht durchscheinend mit Unschärfe (Deckkraft 88 %). In niedrigen Fenstern (unter 544 px Höhe, z. B. bei Zoom) läuft er nicht mit. `scroll-padding` hält fokussierte Elemente frei. |
| Hover | Buttons heben sich leicht an, Pfeile gleiten, Karten bekommen einen dezenten Schatten, Fotos zoomen leicht. |
| Leistungsübersicht (`ServiceShowcase`, Entscheidung 2026-10-22) | Eine große Zeile pro Leistung, Foto und Text im Wechsel links und rechts; das Foto gleitet von seiner Seite herein. Die ganze Zeile ist anklickbar, der Leistungsname bleibt der Linkname. Oben eine Collage aus drei Fotos, die sich beim Laden einmal auffächert. |
| Illustrierte Szenen (`LottieScene`, Entscheidung 2026-10-22 auf Wunsch des Kunden) | Genau zwei Szenen: Spaziergang mit Rollstuhl auf „Über uns“ neben dem Leitsatz, Beratungsgespräch statt Foto oben auf „Pflegeberatung“. In Markenfarben umgefärbt (`frontend/scripts/prepare-lottie.py`), Hauttöne bleiben. Rein dekorativ (`aria-hidden`). Der Player lädt erst, wenn die Szene sichtbar wird, spielt einmal höchstens 5 s (WCAG 2.2.2, keine Schleife) und noch einmal beim Darüberfahren. Bei „Bewegung reduzieren“ nur das erste Bild. Keine weiteren Szenen ohne neue Entscheidung. |
| Leistungsseiten | Kopfbereich mit Foto, Eckdaten-Karte (Wer zahlt, Voraussetzung, Rechtsgrundlage), mitlaufende Seitennavigation, die den aktuellen Abschnitt markiert (`aria-current="location"`), Leistungsumfang als Liste mit Haken, die nacheinander erscheint, Antragsschritte als Zeitleiste, deren Linie sich zeichnet. Gleiche Bedingungen wie das Einblenden. |

Das Hintergrundvideo zeigt übergangsweise drei lizenzfreie Pflegeszenen mit Personen von Pexels (Entscheidung 2026-10-22 auf Wunsch des Kunden, `frontend/public/videos/LICENSES.txt`), bis eigene Aufnahmen vorliegen. Ebenso zeigen die Leistungsseiten übergangsweise lizenzfreie Fotos von Gegenständen und Räumen ohne Personen (`frontend/public/images/leistungen/LICENSES.txt`). Gestellte Pflegeszenen aus Bildarchiven bleiben verboten. Ausnahmen mit Personen (Entscheidung 2026-10-22, auf Wunsch des Kunden): das Hintergrundvideo (siehe oben) und das gelieferte Foto eines Bewerbungsgesprächs oben auf `/karriere` (`frontend/public/images/karriere/LICENSES.txt`); es soll durch ein eigenes Foto ersetzt werden.

---

## Design-Tokens

Die Farben sind aus dem Logo von Aram abgeleitet (Himbeerrot `#AA1A4B`) und mit dem Kunden noch zu bestätigen. Alle Tokens liegen in `frontend/app/styles/tokens.css`. In Komponenten sind keine Hex-Werte erlaubt, nur Tokens.

### Farben

```css
:root {
  /* Helle Flächen */
  --color-bg:              #FBF8F5; /* warmes Off-White */
  --color-surface:         #FFFFFF;
  --color-surface-alt:     #F6EAEE; /* zartes Rosé für abgesetzte Sektionen, kein Pastell-Kinderrosa */
  --color-text:            #241A1E; /* ca. 16 : 1 */
  --color-text-muted:      #4A3F43; /* mind. 7 : 1 auf allen hellen Flächen */
  --color-border:          #E6DCDF; /* nur dekorative Linien */
  --color-border-strong:   #857479; /* Ränder von Formularfeldern, mind. 3 : 1 (WCAG 1.4.11) */

  /* Marke */
  --color-primary:         #AA1A4B; /* Himbeerrot aus dem Logo: Buttons, Ziffern, Linien */
  --color-primary-hover:   #8C1540;
  --color-link:            #931541; /* Links im Fließtext, mind. 7 : 1 */
  --color-link-hover:      #7A1236;
  --color-brand-deep:      #5E0F2E; /* dunkle Markenflächen: oberer Bereich, Kontakt */
  --color-brand-darkest:   #3F0A20; /* Footer */
  --color-on-brand:        #FBF8F5; /* Text auf Markenflächen */
  --color-on-brand-muted:  #F3D9E2;

  /* Status und Fokus */
  --color-focus:           #0B57D0;
  --color-focus-on-brand:  #FBF8F5; /* auf dunklen Markenflächen ist Blau zu dunkel */
  --color-error:           #B3261E;
  --color-success:         #2E6B34;
}
```

Regeln:
- Fließtext und Links im Fließtext erreichen mindestens 7 : 1, große Schrift und UI-Elemente mindestens 3 : 1. Die Kontraste aller Token-Paare prüft `frontend/app/styles/tokens.test.ts` automatisch.
- Dunkle Markenflächen tragen `data-surface="brand"`: Links und Fokusrahmen werden dort automatisch hell.
- Auf der himbeerroten Fläche steht Text in Weiß (7,1 : 1), nicht in Off-White (6,7 : 1).
- `--color-border` ist zu hell für Formularfelder. Ränder von Eingabefeldern verwenden `--color-border-strong`.
- Fehler und Marke liegen farblich nah beieinander. Information wird deshalb nie nur über Farbe vermittelt, Fehler immer zusätzlich mit Text („Fehler: …“).
- Keine Verläufe, auch nicht aus den Logofarben.

### Logo

- Bis zur Vektordatei vom Kunden wird eine aufbereitete Bilddatei mit transparentem Hintergrund verwendet (`frontend/public/images/logo-aram-*.png`, Favicons in `frontend/public/`).
- Im Header steht neben dem Bildzeichen der Schriftzug „Aram“ als Text, weil der Schriftzug im Logo bei kleiner Größe nicht lesbar ist.

### Typografie

- **Überschriften**: *Plus Jakarta Sans*, eine moderne, runde Sans passend zur Logo-Schrift (Entscheidung 2026-10-21, ersetzt Source Serif 4)
- **Fließtext**: *Atkinson Hyperlegible Next*, auf Lesbarkeit für Menschen mit eingeschränkter Sehkraft ausgelegt
- **Schnitte**: Plus Jakarta Sans 500 und 700, Atkinson Hyperlegible Next 400 und 600
- Maximal zwei Familien und vier Schnitte, **selbst gehostet** als WOFF2 unter `public/fonts/`, mit `font-display: swap`
- Grundschriftgröße **18 px** (`1.125rem`), Zeilenhöhe 1,6, wegen der älteren Zielgruppe
- Skala mit Faktor 1,25 für kleine Überschriften; Seiten- und Sektionsüberschriften größer und fluid, die große Aussage der Startseite höchstens 64 px (`--font-size-display`). Große Überschriften mit höchstens −0,01 em Laufweite, sonst normal.
- Große Überschriften (h1, h2) mit Gewicht 500, kleine Überschriften (h3, h4) 700, Fließtext 400, Hervorhebungen 600 (sparsam)

### Abstände, Raster, Formen

- Abstandsskala: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128 px (`--space-1` bis `--space-10`)
- Breakpoints: Basis 360 px, dann 640, 960 und 1280 px. Container maximal 1280 px.
- Eckenradius: 10 px für Buttons und Formularfelder (`--radius-control`), 16 px für Karten, Kacheln, Panels und Bilder (`--radius-card`). Kreise für Symbol-Schaltflächen, voll gerundete Form nur für Status-Chips (`--radius-pill`). Keine Pill-Buttons.
- Schatten: weich (`--shadow-card`) für Karten und Kacheln, stärker (`--shadow-raised`) nur bei Hover und für die Karte über dem Video.
- Schatten: standardmäßig keiner. Höchstens ein dezenter Schatten für Dropdowns und Overlays.

---

## Komponentenregeln

### Header
- Logo links. Die **Telefonnummer ist immer sichtbar** als `tel:`-Link, auch auf Mobilgeräten.
- Höchstens sechs Navigationspunkte. Mobil gibt es ein Menü mit echtem `<button>`, `aria-expanded` und Fokus-Management.

### Mobile Kontaktleiste
- Auf Mobilgeräten eine feste Leiste unten mit „Anrufen“ und „Rückruf anfordern“
- Verdeckt keinen Inhalt (Platz am Seitenende reservieren) und berücksichtigt `env(safe-area-inset-bottom)`

### Buttons und Links
- Drei Varianten: primär, sekundär und Textlink
- Mindestens 44 × 44 px Klickfläche
- Beschriftungen sagen, was passiert: „Rückruf anfordern“, „Stelle ansehen“. Nicht: „Jetzt starten“, „Mehr erfahren“, „Los geht’s“.

### Formulare
- Sichtbares Label über jedem Feld. Placeholder ersetzen niemals Labels.
- Pflichtfelder werden im Label gekennzeichnet; optionale Felder sind als „optional“ markiert.
- Fehlermeldungen stehen direkt am Feld, sind konkret und per `aria-describedby` verknüpft. Nach dem Absenden geht der Fokus auf die Fehlerzusammenfassung.
- So wenige Felder wie möglich. Eine Rückrufbitte braucht Name, Telefon, PLZ/Ort und eine Wunschzeit.
- Erfolgsmeldung mit nächstem Schritt: „Wir rufen Sie innerhalb eines Werktags zurück.“ (nur wenn der Kunde das bestätigt hat)

### Fokus
- Sichtbarer Fokusrahmen: `outline: 3px solid var(--color-focus); outline-offset: 2px;`
- Niemals `outline: none` ohne gleichwertigen Ersatz

---

## Seitenstruktur

| Seite | Kerninhalt |
|-------|------------|
| Start | Oberer Bereich: ein Satz, was der Dienst macht und wo, dazu Telefon und Rückruf. Danach Leistungen als verlinkte Liste, Ablauf der Versorgung, Team-Ausschnitt mit echtem Foto, Karriere-Hinweis, Kontakt. |
| Leistungen | Eine Übersicht und eine Unterseite je Leistung. Jede Unterseite beantwortet: Für wen? Was genau? Wer bezahlt? Wie beantrage ich das? |
| Einsatzgebiet | Liste der Orte und Postleitzahlen, statisches Kartenbild ohne Google-Maps-Einbettung |
| Über uns | Geschichte, Team mit Namen und Funktion, Pflegedienstleitung |
| Karriere | Stellenanzeigen und Kurzbewerbung ohne Anschreiben, mobil in unter zwei Minuten ausfüllbar |
| Kontakt | Telefon, E-Mail, Adresse, Bürozeiten, Rufbereitschaft, Formular |
| Ratgeber (optional) | z. B. „Pflegegrad beantragen“ und „Was zahlt die Pflegekasse?“, nur mit vom Kunden geprüften Inhalten |
| Pflichtseiten | Impressum, Datenschutzerklärung, Erklärung zur Barrierefreiheit |

Leistungsunterseiten (mit dem Kunden abstimmen):
Grundpflege, Behandlungspflege, Verhinderungspflege, Entlastungsleistungen und Hauswirtschaft, Beratungsbesuche nach § 37 Abs. 3 SGB XI, Pflegeberatung.

---

## Selbstprüfung vor jedem UI-Commit

1. Würde ein Besucher diese Sektion für ein Template halten? Wenn ja: neu gestalten.
2. Steht hier etwas Konkretes über *diesen* Pflegedienst, das auf keiner anderen Pflegeseite stehen könnte?
3. Ist jedes Icon, jede Farbe und jede Bewegung begründet?
4. **Hochwertig:** Stimmen Abstände, Ausrichtung, typografische Zeichen und alle Zustände? Würde die Sektion in einem gedruckten Jahresbericht bestehen?
5. **Leserlich:** Kann eine 70-jährige Person den Text am Smartphone ohne Zoomen lesen? Ist die Hauptaktion sofort erkennbar?
6. **Vertrauenswürdig:** Ist jede Aussage überprüfbar und echt? Gibt es irgendetwas, das nach Werbetrick aussieht?
7. Funktioniert es bei 360 px, bei 200 % Zoom und nur mit Tastatur?
