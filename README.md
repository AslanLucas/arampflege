# Webseite des Pflegedienstes

Öffentliche Webseite eines ambulanten Pflegedienstes. Projektregeln stehen in [AGENTS.md](AGENTS.md), Gestaltung in [docs/DESIGN.md](docs/DESIGN.md), Texte in [docs/CONTENT.md](docs/CONTENT.md).

## Voraussetzungen

- Node.js 22.22 oder neuer
- .NET SDK 10 **mit ASP.NET Core 10** (Runtime und Targeting Pack)
- Docker mit Docker Compose

## Erste Schritte

```bash
# Datenbank (PostgreSQL 18) starten
docker compose up -d db

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
- **Frontend-Build**: `npm run build` erzeugt statisches, vorgerendertes HTML in `frontend/build/client`. `npm run preview` liefert diesen Ordner lokal aus.
- **API-Adresse im Frontend**: Standard ist `/api`. Abweichend über `VITE_API_BASE_URL` beim Build setzen.
