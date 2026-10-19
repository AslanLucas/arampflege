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
- [ ] Recht – **Blockiert den Livegang:** Einwilligungstext für Kontakt- und Rückrufformular (Gesundheitsdaten, Art. 9 DSGVO), freigegeben vom Datenschutzbeauftragten; danach Versionskennung in `Consent.CurrentVersion` setzen (derzeit „entwurf“) – `frontend/app/features/forms/FormNotices.tsx`, `backend/src/Pflege.Api/Features/Forms/Consent.cs`
- [ ] Recht – Löschfrist für Kontakt- und Rückrufanfragen (lokal Platzhalter 90 Tage) – `Retention:RequestRetentionDays`, Datenschutzhinweis an den Formularen

## Inhalte
- [ ] Leistungen – Welche Leistungen werden angeboten, mit fachlicher Freigabe; vorläufige Liste aus DESIGN.md steht auf Start und Leistungen – `frontend/app/content/services.ts`
- [ ] Leistungen – Kurzbeschreibung für „Entlastungsleistungen und Hauswirtschaft“ und „Pflegeberatung“ – `frontend/app/content/services.ts`
- [ ] Leistungen – Entwürfe „Für wen“ und „Was wir übernehmen“ fachlich prüfen: Grundpflege, Behandlungspflege, Verhinderungspflege, Beratungsbesuche – `frontend/app/content/services.ts`
- [ ] Leistungen – „Für wen“ und „Was wir übernehmen“ für Entlastungsleistungen und Hauswirtschaft sowie Pflegeberatung – `frontend/app/content/services.ts`
- [ ] Leistungen – Je Leistung „Wer die Kosten trägt“ mit Quelle und Prüfdatum sowie „So beantragen Sie die Leistung“ – `frontend/app/content/services.ts`
- [ ] Leistungen – Einleitung der Leistungsübersicht – `/leistungen`
- [ ] Leistungen – Was der Dienst nicht anbietet (z. B. 24-Stunden-Betreuung) – `/leistungen`
- [ ] Start – Ablauf der Versorgung: Entwurf mit vier Schritten bestätigen oder korrigieren – `frontend/app/content/home.ts`
- [ ] Team – Namen, Funktionen und Fotos der Pflegedienstleitung und Ansprechpartner – Über uns, Start
- [ ] Team – Name, Qualifikation und zwei bis drei Sätze der Pflegedienstleitung für die Startseite – `frontend/app/content/home.ts`
- [ ] Karriere – Aktuelle Stellen, Arbeitsbedingungen, Gehalt (falls veröffentlicht) – Karriere
- [ ] Karriere – Kurzer Hinweis auf offene Stellen für die Startseite – `frontend/app/content/home.ts`
- [ ] Kontakt – Zusage, in welcher Frist Rückrufe erfolgen – Startseite, `/rueckruf`, Bestätigung im Rückrufformular
- [ ] Kontakt – Zusage, in welcher Frist auf Nachrichten geantwortet wird – Bestätigung im Kontaktformular
- [ ] Alle Seiten – Kurzbeschreibung für Suchergebnisse (Meta-Description, max. 160 Zeichen) je Seite – `frontend/app/routes/*.tsx`
- [ ] Fotos – Team, Fahrzeuge, Büro, Einsatzgebiet; zuerst: Pflegedienstleitung im Büro, Querformat 3 : 2 (Startseite) – global

## Betrieb
- [ ] Betrieb – **Blockiert den Livegang:** Wie liest der Pflegedienst eingegangene Anfragen? Die Benachrichtigungs-Mail enthält bewusst nur die Vorgangsnummer. Optionen: verschlüsselter Mailversand (S/MIME oder PGP) mit Inhalt oder ein geschützter Lesezugang – mit Kunde abstimmen – Backend
- [ ] Betrieb – Empfangspostfach für Benachrichtigungen und SMTP-Zugang eines EU-Anbieters – `Smtp:*` als Umgebungsvariablen
