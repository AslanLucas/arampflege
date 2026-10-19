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
- Die Schrift trägt die Gestaltung, nicht Grafiken. Überschriften in der Serifenschrift mit großzügigem Größenkontrast zum Fließtext.
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
- Einheitliche Bildformate (z. B. 4 : 3 und 3 : 2), einheitliche Bildbearbeitung (gleiche Farbstimmung, natürliches Licht, keine Filter).
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
- Wärme entsteht durch das warme Off-White, die Serifenschrift, echte Gesichter und eine zugewandte Sprache.
- Keine Herzen, Hände, Blätter oder Puzzleteile als Symbole.
- Keine Pastell-Kinderfarben. Die Seite richtet sich an Erwachsene in einer ernsten Lebenslage.

---

## Verboten

Diese Muster lassen eine Seite sofort generisch oder KI-generiert wirken. Sie werden nicht verwendet, auch nicht „nur ein bisschen“.

### Layout
- Hero mit zentrierter Riesenüberschrift, Untertitel, zwei Buttons nebeneinander und Verlauf oder Blob im Hintergrund
- Raster aus 3, 4 oder 6 identischen Karten mit Icon oben, Überschrift und zwei Zeilen Text
- Jede Sektion zentriert, gleich hoch und mit gleichem Abstand übereinandergestapelt
- Bento-Grids, Karten in Karten, Glassmorphism, Blur-Effekte, Glow
- Pill-Badges über Überschriften („Unser Versprechen“, „Warum wir?“)
- Statistikleisten mit hochzählenden Zahlen
- Testimonial-Karussells, Logo-Laufbänder, Slider jeder Art
- Dark Mode als Standard

### Farbe und Oberfläche
- Farbverläufe als Hintergrund, auf Buttons oder auf Text
- Lila, Indigo und Violett sowie Cyan-zu-Blau-Verläufe
- Klischee-Krankenhaus-Türkis als Hauptfarbe
- Überall große Eckenradien mit weichen Schatten
- Schatten als Standard-Gestaltungsmittel. Für Abgrenzung werden Linien und Flächen verwendet.

### Icons und Bilder
- Emojis als Icons oder Aufzählungszeichen
- Ein Icon vor jeder Überschrift
- Sparkle-, Stern- oder Zauberstab-Symbole
- Stockfotos (lächelnde Seniorin mit Pflegerin im weißen Kittel, Händehalten in Nahaufnahme)
- KI-generierte Menschen oder Illustrationen im „Corporate Memphis“-Stil
- 3D-Illustrationen

### Bewegung
- Einblend-Animationen beim Scrollen
- Parallax-Effekte
- Automatisch startende Animationen, Videos oder Karussells

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
- **Bewegung nur als Rückmeldung**: Hover- und Fokuszustände mit höchstens 150 ms. `prefers-reduced-motion` wird respektiert.

---

## Design-Tokens

Die folgenden Werte sind Startwerte. Sie werden mit dem Logo und der Marke des Kunden abgestimmt. Alle Tokens liegen in `frontend/app/styles/tokens.css`. In Komponenten sind keine Hex-Werte erlaubt, nur Tokens.

### Farben

```css
:root {
  --color-bg:            #FBF8F3; /* warmes Off-White */
  --color-surface:       #FFFFFF;
  --color-surface-alt:   #F2EDE4; /* abgesetzte Sektionen */
  --color-text:          #1F2421; /* ca. 15 : 1 auf --color-bg */
  --color-text-muted:    #3F4642; /* mind. 7 : 1 auf --color-bg (AAA für Fließtext) */
  --color-border:        #DDD6CB;
  --color-primary:       #2F5D50; /* tiefes Grün: Links, Buttons */
  --color-primary-hover: #244A40;
  --color-accent:        #B5652E; /* Terrakotta: nur Linien, kleine Flächen */
  --color-focus:         #0B57D0;
  --color-error:         #B3261E;
  --color-success:       #2E6B34;
}
```

Regeln:
- Fließtext erreicht mindestens 4,5 : 1 Kontrast, große Schrift und UI-Elemente mindestens 3 : 1. Jede Farbkombination wird vor der Verwendung geprüft.
- Die Akzentfarbe wird nicht für Fließtext verwendet.
- Information wird nie nur über Farbe vermittelt, bei Fehlern immer zusätzlich mit Text.

### Typografie

- **Überschriften**: eine Serifenschrift mit Charakter, z. B. *Source Serif 4*
- **Fließtext**: eine auf Lesbarkeit ausgelegte Sans, z. B. *Atkinson Hyperlegible Next* oder *Source Sans 3*
- Maximal zwei Familien und vier Schnitte, **selbst gehostet** als WOFF2 unter `public/fonts/`, mit `font-display: swap`
- Grundschriftgröße **18 px** (`1.125rem`), Zeilenhöhe 1,6, wegen der älteren Zielgruppe
- Skala mit Faktor 1,25, H1 fluid: `clamp(2rem, 1.4rem + 2.5vw, 3rem)`
- Überschriften in Gewicht 600, Fließtext 400, Hervorhebungen 600 (sparsam)

### Abstände, Raster, Formen

- Abstandsskala: 4, 8, 12, 16, 24, 32, 48, 64, 96 px (`--space-1` bis `--space-9`)
- Breakpoints: Basis 360 px, dann 640, 960 und 1200 px. Container maximal 1200 px.
- Eckenradius: 4 px für Buttons und Formularfelder, 0 bis 6 px für Bilder. Keine Pill-Buttons.
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
