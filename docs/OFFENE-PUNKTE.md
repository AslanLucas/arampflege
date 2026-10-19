# Offene Punkte (vom Kunden zu liefern)

Agenten tragen hier jeden `[[INHALT FEHLT: …]]`-Platzhalter ein. Erledigte Punkte werden abgehakt, nicht gelöscht.

Format: `- [ ] Bereich – Beschreibung – Datei/Seite`

## Stammdaten
- [ ] Allgemein – Name des Pflegedienstes, Rechtsform, Logo (SVG), daraus auch Favicon – global
- [ ] Allgemein – Adresse, Telefon, E-Mail, Bürozeiten, Rufbereitschaft – Header, Footer, Kontaktleiste, Kontakt (`frontend/app/content/site.ts`)
- [ ] Allgemein – Einsatzgebiet: Orte und Postleitzahlen – Einsatzgebiet
- [ ] Allgemein – Markenfarben und Schriften (falls vorhanden) – `tokens.css`

## Rechtliches
- [ ] Recht – Impressum (Inhaber, Registereintrag, zuständige Aufsichtsbehörde, IK-Nummer falls gewünscht) – Impressum
- [ ] Recht – Datenschutzerklärung (vom Kunden bzw. Datenschutzbeauftragten freigegeben) – Datenschutz
- [ ] Recht – Erklärung zur Barrierefreiheit – Barrierefreiheit
- [ ] Recht – Einwilligungen für Teamfotos – Über uns

## Inhalte
- [ ] Leistungen – Welche Leistungen werden angeboten, mit fachlicher Freigabe; vorläufige Liste aus DESIGN.md steht auf Start und Leistungen – `frontend/app/content/services.ts`
- [ ] Leistungen – Kurzbeschreibung für „Entlastungsleistungen und Hauswirtschaft“ und „Pflegeberatung“ – `frontend/app/content/services.ts`
- [ ] Leistungen – Je Unterseite: Für wen? Was genau? Wer bezahlt (mit Quelle und Prüfdatum)? Wie beantragen? – `/leistungen/…`
- [ ] Start – Ablauf der Versorgung: Entwurf mit vier Schritten bestätigen oder korrigieren – `frontend/app/content/home.ts`
- [ ] Team – Namen, Funktionen und Fotos der Pflegedienstleitung und Ansprechpartner – Über uns, Start
- [ ] Team – Name, Qualifikation und zwei bis drei Sätze der Pflegedienstleitung für die Startseite – `frontend/app/content/home.ts`
- [ ] Karriere – Aktuelle Stellen, Arbeitsbedingungen, Gehalt (falls veröffentlicht) – Karriere
- [ ] Karriere – Kurzer Hinweis auf offene Stellen für die Startseite – `frontend/app/content/home.ts`
- [ ] Kontakt – Zusage, in welcher Frist Rückrufe erfolgen – Formulare, Startseite (Sektion „Wir rufen Sie zurück“)
- [ ] Alle Seiten – Kurzbeschreibung für Suchergebnisse (Meta-Description, max. 160 Zeichen) je Seite – `frontend/app/routes/*.tsx`
- [ ] Fotos – Team, Fahrzeuge, Büro, Einsatzgebiet; zuerst: Pflegedienstleitung im Büro, Querformat 3 : 2 (Startseite) – global
