# Offene Punkte (vom Kunden zu liefern)

Agenten tragen hier jeden `[[INHALT FEHLT: …]]`-Platzhalter ein. Erledigte Punkte werden abgehakt, nicht gelöscht.

Format: `- [ ] Bereich – Beschreibung – Datei/Seite`

## Stammdaten
- [x] Allgemein – Name des Pflegedienstes (Aram) und Logo als Bilddatei – global
- [x] Allgemein – Firmenname und Rechtsform: Aram Pflege GmbH – global
- [ ] Allgemein – Logo als Vektordatei (SVG), dazu eine Variante nur mit Bildzeichen; Slogan im Logo mit kleinem „a“ („Ihr ambulanter Pflegedienst“) – global, Favicon
- [x] Allgemein – Geschäftsanschrift (Ochtruper Straße 83, 48599 Gronau (Westfalen)) und E-Mail (info@arampflege.de) – `frontend/app/content/site.ts`
- [x] Allgemein – Bürozeiten (Mo–Fr 8–16 Uhr, bestätigt 2026-10-22) und Rufbereitschaft (24/7, auch am Wochenende) – `frontend/app/content/site.ts`
- [x] Allgemein – Telefonnummer 02562 8162218 – `frontend/app/content/site.ts`
- [ ] Allgemein – Bürozeiten an Feiertagen (derzeit nicht genannt) – `site.officeHoursByDay`
- [x] Allgemein – Einsatzgebiet grob: Gronau (Westfalen) und Umgebung – global
- [x] Allgemein – Einsatzgebiet genau: Gronau, Gronau-Epe, Ochtrup, Heek, Ahaus u. a. (bestätigt 2026-10-22; Postleitzahlen ergänzt) – `site.places`
- [ ] Allgemein – Aus dem Logo abgeleitete Markenfarben (Himbeerrot #AA1A4B, Weinrot) und die gewählten Schriften bestätigen – `tokens.css`, `docs/DESIGN.md`

## Rechtliches
- [x] Recht – Impressum: Firma, Anschrift, E-Mail, Registereintrag (Amtsgericht Coesfeld, HRB 24086) – `/impressum`
- [x] Recht – Impressum ergänzt: Geschäftsführer Stephan Gabriel, Telefon, Aufsichtsbehörde Kreis Borken (WTG-Behörde); keine USt-IdNr. (umsatzsteuerfreie Pflegeleistungen) – `/impressum`
- [ ] Recht – Impressum rechtlich prüfen lassen; IK-Nummer angeben, falls gewünscht – `/impressum`
- [ ] Recht – Datenschutzerklärung (vom Kunden bzw. Datenschutzbeauftragten freigegeben) – Datenschutz
- [ ] Recht – Erklärung zur Barrierefreiheit – Barrierefreiheit
- [ ] Recht – Einwilligungen für Teamfotos – Über uns
- [ ] Recht – **Blockiert den Livegang:** Quelle und Lizenz des Fotos auf `/karriere` (Handschlag im Bewerbungsgespräch) nachweisen; besser durch ein eigenes Foto des Teams ersetzen – `frontend/public/images/karriere/LICENSES.txt`
- [ ] Recht – **Vor dem Livegang:** Quelle und Lizenz der zwei Lottie-Animationen („Helping the needy“, „Helping Doctor to aged people“) nachweisen; kommerzielle Nutzung und Umfärben müssen erlaubt sein – `frontend/public/animations/LICENSES.txt`
- [ ] Recht – **Blockiert den Livegang:** Einwilligungstext für das Kontaktformular (Gesundheitsdaten, Art. 9 DSGVO), freigegeben vom Datenschutzbeauftragten; danach Versionskennung in `Consent.CurrentVersion` setzen (derzeit „entwurf“) – `frontend/app/features/forms/FormNotices.tsx`, `backend/src/Pflege.Api/Features/Forms/Consent.cs`
- [ ] Recht – Löschfrist für Kontaktanfragen (lokal Platzhalter 90 Tage) – `Retention:RequestRetentionDays`, Datenschutzhinweis an den Formularen
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
- [x] Über uns – Text, Leitsatz und Start ab Januar 2027 (geliefert 2026-10-22) – `frontend/app/content/about.ts`
- [ ] Team – Namen, Funktionen und Fotos der Pflegedienstleitung und Ansprechpartner – Über uns, Start
- [ ] Team – Name und Foto der Pflegedienstleitung für die Startseite (Text zum Team liegt vor) – `frontend/app/content/home.ts`
- [x] Karriere – Hinweis auf offene Stellen für die Startseite – `frontend/app/content/home.ts`
- [x] Karriere – Einleitung der Karriereseite – `frontend/app/content/careers.ts`
- [x] Karriere – Drei Stellen mit Titel und Umfang (bestätigt 2026-10-22) – `frontend/app/content/jobs.ts`
- [ ] Karriere – Entwürfe für Aufgaben und Voraussetzungen prüfen; Führerschein nötig?; Qualifikation für Pflegehilfskraft und Betreuungskraft; Arbeitsbedingungen (Arbeitszeiten, Dienstfahrzeug, Vergütung, falls veröffentlicht) – `frontend/app/content/jobs.ts`
- [ ] Karriere – Qualifikationsoptionen im Bewerbungsformular bestätigen (Pflegefachkraft, Pflegehilfskraft oder Pflegeassistenz, Hauswirtschafts- oder Betreuungskraft, in Ausbildung, andere) – `frontend/app/content/careers.ts`
- [x] Karriere – Frist für die Rückmeldung auf Bewerbungen: 48 Stunden (bestätigt 2026-10-23) – Bestätigung im Bewerbungsformular
- [ ] Karriere – Dienstwagen oder Fahrtkostenerstattung? – „Was dich bei uns erwartet“ (`frontend/app/content/careers.ts`)
- [ ] Karriere – Weitere Zusagen nur nach Bestätigung, z. B. Zuschläge, Einarbeitung mit fester Ansprechperson, bezahlte Fortbildung – `frontend/app/content/careers.ts`
- [x] Kontakt – Zusage, in welcher Frist Rückrufe erfolgen – entfallen: Rückruf wurde am 2026-10-23 auf Wunsch des Kunden entfernt
- [x] Kontakt – Zusage, in welcher Frist auf Nachrichten geantwortet wird: 48 Stunden (bestätigt 2026-10-23) – `site.replyTime`: Kontakt-Karten (E-Mail), `/kontakt`, Bestätigung im Kontaktformular
- [x] Kontakt – Rufbereitschaft rund um die Uhr erreichbar, auch am Wochenende (bestätigt 2026-10-21) – Kontakt-Karten
- [x] Kontakt – Das erste Beratungsgespräch ist kostenlos (bestätigt 2026-10-22) – Startseite oben
- [ ] Kontakt – Optional: Hinweise zu Parkplätzen und barrierefreiem Zugang zum Büro – Kontakt-Karten (Adresse)
- [ ] Kontakt – Welcher Messenger für Angehörige? Vorher mit dem Datenschutzbeauftragten klären, ob er für Gesundheitsdaten zulässig ist – derzeit nirgends auf der Seite genannt; bei Bedarf in den Kontakt-Karten ergänzen
- [x] Einsatzgebiet – Startseiten-Abschnitt „Kommen wir auch zu Ihnen?“ nennt Gronau (Westfalen) und Umgebung – `frontend/app/content/home.ts`
- [ ] Alle Seiten – Kurzbeschreibung für Suchergebnisse (Meta-Description, max. 160 Zeichen) je Seite – `frontend/app/routes/*.tsx`
- [ ] Fotos – Team, Fahrzeuge, Büro, Einsatzgebiet; zuerst: Pflegedienstleitung im Büro, Querformat 5 : 4 (Startseite) – global
- [ ] Fotos – Eigene Fotos je Leistung (Querformat 3 : 2, z. B. Pflegematerial im Dienstwagen, Büro, Einsatz ohne erkennbare Patienten); ersetzen die lizenzfreien Übergangsfotos – `frontend/public/images/leistungen/`
- [ ] Videos – Eigene kurze Clips für den oberen Bereich (3–4 Clips à 6–10 Sekunden, Querformat, ruhige Alltagsszenen; Personen nur mit schriftlicher Einwilligung); ersetzen die lizenzfreien Übergangsvideos – `frontend/public/videos/`

## Betrieb
- [ ] Betrieb – **Blockiert den Livegang:** Wie liest der Pflegedienst eingegangene Anfragen, Bewerbungen und Lebensläufe? Lebensläufe liegen verschlüsselt auf dem Server und dürfen nicht unverschlüsselt per Mail verschickt werden. Die Benachrichtigungs-Mail enthält bewusst nur die Vorgangsnummer. Optionen: verschlüsselter Mailversand (S/MIME oder PGP) mit Inhalt oder ein geschützter Lesezugang – mit Kunde abstimmen – Backend
- [ ] Betrieb – Empfangspostfach für Benachrichtigungen und SMTP-Zugang eines EU-Anbieters – `Smtp:*` als Umgebungsvariablen
- [ ] Betrieb – Prüfung hochgeladener Dateien auf Schadsoftware (z. B. ClamAV) gewünscht? Derzeit werden nur Typ (Magic Bytes) und Größe geprüft – Backend
