# Webseite des Pflegedienstes

Öffentliche Webseite eines ambulanten Pflegedienstes. Projektregeln stehen in [AGENTS.md](AGENTS.md), Gestaltung in [docs/DESIGN.md](docs/DESIGN.md), Texte in [docs/CONTENT.md](docs/CONTENT.md).

## Voraussetzungen

- Node.js 22.22 oder neuer
- .NET SDK 10 **mit ASP.NET Core 10** (Runtime und Targeting Pack)
- Docker mit Docker Compose

## Erste Schritte

```bash
# Datenbank (PostgreSQL 18) und Mailpit starten
docker compose up -d db mail

# Backend: http://localhost:5080, Health-Check unter /api/health
cd backend
dotnet run --project src/Pflege.Api

# Frontend: http://localhost:5173, /api wird an das Backend weitergeleitet
cd frontend
npm ci
npx playwright install chromium   # einmalig für die E2E-Tests
npm run dev
```

Alle weiteren Befehle (Lint, Tests, Build) stehen in [AGENTS.md](AGENTS.md#befehle).

## Hinweise

- **Datenbank-Port 5433**: Der Container ist auf dem Host unter Port 5433 erreichbar, damit er nicht mit einer lokal installierten PostgreSQL kollidiert. Port und Zugangsdaten lassen sich über eine `.env` ändern (Vorlage: [.env.example](.env.example)). Bei Änderungen auch den Connection String in `backend/src/Pflege.Api/appsettings.Development.json` anpassen.
- **Zugangsdaten**: Die Werte in `.env.example` und `appsettings.Development.json` gelten nur für die lokale Entwicklung. Produktiv wird der Connection String ausschließlich über die Umgebungsvariable `ConnectionStrings__Default` gesetzt.
- **Backend-Tests** starten über Testcontainers eine eigene PostgreSQL. Docker muss dafür laufen.
- **Migrationen** laufen in der Entwicklung beim Start der API automatisch (`Database:MigrateOnStartup`). Neue Migration: `cd backend && dotnet ef migrations add <Name> --project src/Pflege.Api --output-dir Infrastructure/Persistence/Migrations`.
- **E-Mails** landen in der Entwicklung in Mailpit: http://localhost:8025. Dort ist sichtbar, was der Pflegedienst bei neuen Anfragen erhält.
- **Lebensläufe** liegen lokal verschlüsselt unter `backend/.data/application-files` (nicht im Repository).
- **Formulare** holen beim Öffnen ein Zeit-Token von `/api/form-tokens`. Wer schneller als 3 Sekunden absendet oder das versteckte Feld ausfüllt, bekommt eine Bestätigung, gespeichert wird aber nichts.
- **Frontend-Build**: `npm run build` erzeugt statisches, vorgerendertes HTML in `frontend/build/client`. `npm run preview` liefert diesen Ordner lokal aus.
- **API-Adresse im Frontend**: Standard ist `/api`. Abweichend über `VITE_API_BASE_URL` beim Build setzen.

## Konfiguration für den Betrieb

Die API startet nur, wenn diese Werte gesetzt sind (Umgebungsvariablen, nie im Repository):

| Variable | Zweck |
|----------|-------|
| `ConnectionStrings__Default` | PostgreSQL-Verbindung |
| `Smtp__Host`, `Smtp__Port`, `Smtp__Security`, `Smtp__UserName`, `Smtp__Password` | Mailversand (`Security`: `StartTls` oder `SslOnConnect`) |
| `Smtp__From`, `Smtp__To` | Absender und Empfangspostfach des Pflegedienstes |
| `Retention__RequestRetentionDays` | Löschfrist für Anfragen in Tagen |
| `Retention__ApplicationRetentionDays` | Löschfrist für Bewerbungen und Lebensläufe in Tagen |
| `Storage__ApplicationFilesPath` | Verzeichnis für hochgeladene Lebensläufe, außerhalb des Web-Roots |

Außerdem: `DataProtection__KeysPath` auf ein dauerhaftes, gesichertes Verzeichnis setzen. Davon hängen nicht nur die Formular-Tokens ab: Mit diesen Schlüsseln sind die **Lebensläufe verschlüsselt**. Geht der Schlüsselbund verloren, sind die Dateien nicht mehr lesbar; er gehört deshalb ins Backup, aber getrennt von den Dateien selbst. Läuft die API hinter einem Reverse Proxy, dessen IP unter `ForwardedHeaders__KnownProxies__0` eintragen, sonst teilen sich alle Besucher ein Rate Limit.
