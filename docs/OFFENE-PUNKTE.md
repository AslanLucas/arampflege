# Offene Punkte (vom Kunden zu liefern)

Agenten tragen hier jeden `[[INHALT FEHLT: …]]`-Platzhalter ein. Erledigte Punkte werden abgehakt, nicht gelöscht.

Format: `- [ ] Bereich – Beschreibung – Datei/Seite`

## Stammdaten
- [x] Allgemein – Name des Pflegedienstes (Aram) und Logo als Bilddatei – global
- [x] Allgemein – Firmenname und Rechtsform: Aram Pflege GmbH – global
- [ ] Allgemein – Logo als Vektordatei (SVG), dazu eine Variante nur mit Bildzeichen; Slogan im Logo mit kleinem „a“ („Ihr ambulanter Pflegedienst“) – global, Favicon
- [x] Allgemein – Geschäftsanschrift (Ochtruper Straße 83, 48599 Gronau (Westfalen)) und E-Mail (info@arampflege.de) – `frontend/app/content/site.ts`
- [x] Allgemein – Bürozeiten (Mo–Fr 8–18 Uhr, Sa 9–13 Uhr) und Rufbereitschaft (24/7, auch am Wochenende) – `frontend/app/content/site.ts`
- [ ] Allgemein – Telefonnummer – Header, Footer, Kontaktleiste, Kontakt (`frontend/app/content/site.ts`)
- [ ] Allgemein – Bürozeiten an Feiertagen (derzeit nicht genannt) – `site.officeHoursByDay`
- [x] Allgemein – Einsatzgebiet grob: Gronau (Westfalen) und Umgebung – global
- [ ] Allgemein – Einsatzgebiet genau: welche Orte und Postleitzahlen gehören zur „Umgebung“? – `/einsatzgebiet`
- [ ] Allgemein – Aus dem Logo abgeleitete Markenfarben (Himbeerrot #AA1A4B, Weinrot) und die gewählten Schriften bestätigen – `tokens.css`, `docs/DESIGN.md`

## Rechtliches
- [x] Recht – Impressum: Firma, Anschrift, E-Mail, Registereintrag (Amtsgericht Coesfeld, HRB 24086) – `/impressum`
- [ ] Recht – Impressum ergänzen: Geschäftsführung (vertretungsberechtigt), Telefon, USt-IdNr. falls vorhanden, zuständige Aufsichtsbehörde, IK-Nummer falls gewünscht; danach rechtlich prüfen lassen – `/impressum`
- [ ] Recht – Datenschutzerklärung (vom Kunden bzw. Datenschutzbeauftragten freigegeben) – Datenschutz
- [ ] Recht – Erklärung zur Barrierefreiheit – Barrierefreiheit
- [ ] Recht – Einwilligungen für Teamfotos – Über uns
- [ ] Recht – **Blockiert den Livegang:** Einwilligungstext für Kontakt- und Rückrufformular (Gesundheitsdaten, Art. 9 DSGVO), freigegeben vom Datenschutzbeauftragten; danach Versionskennung in `Consent.CurrentVersion` setzen (derzeit „entwurf“) – `frontend/app/features/forms/FormNotices.tsx`, `backend/src/Pflege.Api/Features/Forms/Consent.cs`
- [ ] Recht – Löschfrist für Kontakt- und Rückrufanfragen (lokal Platzhalter 90 Tage) – `Retention:RequestRetentionDays`, Datenschutzhinweis an den Formularen
- [ ] Recht – Löschfrist für Bewerbungen und Lebensläufe nach Abschluss des Verfahrens (lokal Platzhalter 180 Tage ab Eingang) – `Retention:ApplicationRetentionDays`

## Inhalte
- [x] Leistungen – Angebot bestätigt (2026-10-22): Grundpflege, Behandlungspflege, Hauswirtschaftliche Versorgung, Betreuung und Entlastung, Verhinderungspflege, Pflegeberatung inkl. Beratungsbesuche – `frontend/app/content/services.ts`
- [ ] Leistungen – Alle Leistungstexte fachlich prüfen (Für wen, Was wir übernehmen, Wer die Kosten trägt, So beantragen Sie die Leistung) und Prüfdatum freigeben; erst dann den Entwurfshinweis entfernen – `frontend/app/content/services.ts`
- [ ] Leistungen – „Wer zahlt was?“ und „Noch kein Pflegegrad?“ fachlich prüfen – `/leistungen`
- [ ] Leistungen – Rechnet Aram den Entlastungsbetrag und die Verhinderungspflege direkt mit der Pflegekasse ab? – `frontend/app/content/services.ts`
- [ ] Leistungen – Ist die Pflegeberatung (über den Beratungsbesuch hinaus) kostenlos? – Pflegeberatung
- [ ] Leistungen – Verhinderungspflege: ab wie vielen Stunden und zu welchen Zeiten? – Verhinderungspflege
- [ ] Leistungen – Was der Dienst nicht anbietet (z. B. Palliativpflege, 24-Stunden-Betreuung) – `/leistungen`
- [ ] Leistungen – Rechtliche Angaben vor dem Livegang gegen den aktuellen Gesetzesstand prüfen, besonders Verhinderungspflege (gemeinsamer Jahresbetrag seit Juli 2025, bis zu acht Wochen) und die Häufigkeit der Beratungsbesuche – `frontend/app/content/services.ts`
- [ ] Start – Ablauf der Versorgung: Entwurf mit vier Schritten bestätigen oder korrigieren – `frontend/app/content/home.ts`
- [ ] Team – Namen, Funktionen und Fotos der Pflegedienstleitung und Ansprechpartner – Über uns, Start
- [ ] Team – Name, Qualifikation und zwei bis drei Sätze der Pflegedienstleitung für die Startseite – `frontend/app/content/home.ts`
- [ ] Karriere – Aktuelle Stellen, Arbeitsbedingungen, Gehalt (falls veröffentlicht) – Karriere
- [ ] Karriere – Kurzer Hinweis auf offene Stellen für die Startseite – `frontend/app/content/home.ts`
- [ ] Karriere – Einleitung der Karriereseite – `frontend/app/content/careers.ts`
- [ ] Karriere – Aktuelle Stellen mit Titel, Umfang, Ort, Datum, Aufgaben, Voraussetzungen und bestätigten Arbeitsbedingungen – `frontend/app/content/jobs.ts`
- [ ] Karriere – Qualifikationsoptionen im Bewerbungsformular bestätigen (Pflegefachkraft, Pflegehilfskraft, in Ausbildung, andere) – `frontend/app/content/careers.ts`
- [ ] Karriere – Frist für die Rückmeldung auf Bewerbungen – Bestätigung im Bewerbungsformular
- [ ] Kontakt – Zusage, in welcher Frist Rückrufe erfolgen – Startseite, `/rueckruf`, Bestätigung im Rückrufformular
- [ ] Kontakt – Zusage, in welcher Frist auf Nachrichten geantwortet wird – `site.replyTime`: Kontakt-Karten (E-Mail), `/kontakt`, Bestätigung im Kontaktformular
- [x] Kontakt – Rufbereitschaft rund um die Uhr erreichbar, auch am Wochenende (bestätigt 2026-10-21) – Kontakt-Karten
- [ ] Kontakt – Ist das erste Beratungsgespräch kostenlos? Erst dann darf es so auf der Seite stehen – `/kontakt`
- [ ] Kontakt – Optional: Hinweise zu Parkplätzen und barrierefreiem Zugang zum Büro – Kontakt-Karten (Adresse)
- [ ] Kontakt – Welcher Messenger für Angehörige? Vorher mit dem Datenschutzbeauftragten klären, ob er für Gesundheitsdaten zulässig ist – derzeit nirgends auf der Seite genannt; bei Bedarf in den Kontakt-Karten ergänzen
- [x] Einsatzgebiet – Startseiten-Abschnitt „Kommen wir auch zu Ihnen?“ nennt Gronau (Westfalen) und Umgebung – `frontend/app/content/home.ts`
- [ ] Alle Seiten – Kurzbeschreibung für Suchergebnisse (Meta-Description, max. 160 Zeichen) je Seite – `frontend/app/routes/*.tsx`
- [ ] Fotos – Team, Fahrzeuge, Büro, Einsatzgebiet; zuerst: Pflegedienstleitung im Büro, Querformat 5 : 4 (Startseite) – global
- [ ] Videos – Eigene kurze Clips für den oberen Bereich (3–4 Clips à 6–10 Sekunden, Querformat, ruhige Alltagsszenen; Personen nur mit schriftlicher Einwilligung); ersetzen die lizenzfreien Übergangsvideos – `frontend/public/videos/`

## Betrieb
- [ ] Betrieb – **Blockiert den Livegang:** Wie liest der Pflegedienst eingegangene Anfragen, Bewerbungen und Lebensläufe? Lebensläufe liegen verschlüsselt auf dem Server und dürfen nicht unverschlüsselt per Mail verschickt werden. Die Benachrichtigungs-Mail enthält bewusst nur die Vorgangsnummer. Optionen: verschlüsselter Mailversand (S/MIME oder PGP) mit Inhalt oder ein geschützter Lesezugang – mit Kunde abstimmen – Backend
- [ ] Betrieb – Empfangspostfach für Benachrichtigungen und SMTP-Zugang eines EU-Anbieters – `Smtp:*` als Umgebungsvariablen
- [ ] Betrieb – Prüfung hochgeladener Dateien auf Schadsoftware (z. B. ClamAV) gewünscht? Derzeit werden nur Typ (Magic Bytes) und Größe geprüft – Backend
