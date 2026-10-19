# Backend

Ergänzt die `AGENTS.md` im Repository-Root.

## Zweck

Das Backend ist bewusst schlank. Es stellt nur bereit, was die öffentliche Seite braucht:

- Kontaktanfragen und Rückrufwünsche entgegennehmen
- Kurzbewerbungen inklusive Lebenslauf-Upload entgegennehmen
- Stellenanzeigen ausliefern
- Benachrichtigung des Pflegedienstes per E-Mail

Kein CMS, keine Benutzerverwaltung und kein Admin-Bereich ohne ausdrücklichen Auftrag.

## Stack

- ASP.NET Core auf **.NET 10**, Minimal APIs mit `MapGroup` je Feature
- EF Core mit Npgsql (PostgreSQL), Migrationen im Repository
- `Microsoft.AspNetCore.OpenApi` für die API-Beschreibung
- FluentValidation **oder** die eingebaute Validierung von .NET 10, projektweit nur eine Variante
- Tests: xUnit, `WebApplicationFactory`, Testcontainers für PostgreSQL
- `Nullable` aktiviert, `TreatWarningsAsErrors` an

## Struktur

```
backend/
  src/
    Pflege.Api/
      Features/
        Contact/
          ContactEndpoints.cs
          CreateContactRequest.cs
          CreateContactValidator.cs
          ContactRequest.cs        # Entity
        Callback/
        Applications/
        Jobs/
      Infrastructure/
        Persistence/AppDbContext.cs
        Email/
        Storage/                   # Datei-Ablage für Bewerbungsunterlagen
      Program.cs
  tests/
    Pflege.Api.Tests/
```

Vertical Slices nach Feature. Keine Repository-Schicht über EF Core, keine Abstraktion ohne zweiten Anwendungsfall.

## API-Konventionen

- Basis-Pfad `/api`, Ressourcen auf Englisch und im Plural: `/api/contact-requests`, `/api/callback-requests`, `/api/applications`, `/api/jobs`
- Fehler als **`ProblemDetails`** (RFC 9457) mit `errors`-Objekt je Feld, damit das Frontend Fehler direkt am Feld anzeigen kann
- Fehlermeldungen für Nutzer auf Deutsch und gemäß `docs/CONTENT.md`; technische Logmeldungen auf Englisch
- Request- und Response-DTOs als `record`, Entities nie direkt nach außen geben
- `CancellationToken` in allen asynchronen Endpunkten durchreichen

## Sicherheit

- Rate Limiting (`Microsoft.AspNetCore.RateLimiting`) auf allen POST-Endpunkten
- Honeypot-Feld und Mindest-Ausfüllzeit serverseitig prüfen
- CORS nur für die eigene Domain
- Security-Header: HSTS, `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`
- Datei-Uploads: nur PDF, JPG, PNG; maximal 10 MB; Typ über Magic Bytes prüfen, nicht über Dateiendung; zufällige Dateinamen; Ablage außerhalb des Web-Roots
- Secrets ausschließlich über Umgebungsvariablen bzw. User Secrets, nie im Repository

## Datenschutz (DSGVO)

Kontaktanfragen können Gesundheitsdaten enthalten (Art. 9 DSGVO). Deshalb gilt:

- **Datensparsamkeit**: Nur Felder speichern, die das Formular wirklich braucht. Keine IP-Adressen dauerhaft speichern.
- **Löschfristen**: Kontakt- und Rückrufanfragen nach [[INHALT FEHLT: Frist vom Kunden]] löschen, Bewerbungen nach Abschluss des Verfahrens plus [[INHALT FEHLT: Frist]]. Umsetzung als Hintergrunddienst (`BackgroundService`), mit Test.
- **E-Mail-Benachrichtigung ohne Inhalte**: Die Mail an den Pflegedienst enthält nur den Hinweis auf eine neue Anfrage und keine Gesundheitsdaten im Klartext, sofern kein verschlüsselter Versand eingerichtet ist. Abstimmung mit dem Kunden.
- **Logging**: Keine personenbezogenen Daten in Logs. Strukturiertes Logging mit IDs statt Namen.
- Einwilligung zur Datenverarbeitung wird mit Zeitstempel und Version des Datenschutztextes gespeichert.

## Datenbank

- Tabellen- und Spaltennamen in `snake_case` (Npgsql-Namenskonvention)
- Jede Änderung als EF-Core-Migration mit sprechendem Namen
- `CreatedAt` als `DateTimeOffset` in UTC

## Tests

- Jeder Endpunkt hat Integrationstests für Erfolgsfall, Validierungsfehler und Rate Limit.
- Upload-Tests mit gefälschter Dateiendung.
- Test für die Löschfristen-Logik.
