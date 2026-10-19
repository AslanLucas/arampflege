import type { ReactNode } from "react";
import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { Route } from "./+types/root";
import { Container } from "./components/Container/Container";
import { SiteLayout } from "./components/SiteLayout/SiteLayout";
import { site } from "./content/site";
import "./styles/fonts.css";
import "./styles/tokens.css";
import "./styles/base.css";

export const links: Route.LinksFunction = () =>
  [
    "/fonts/atkinson-hyperlegible-next-latin-400-normal.woff2",
    "/fonts/source-serif-4-latin-600-normal.woff2",
  ].map((href) => ({
    rel: "preload",
    href,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  }));

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <Meta />
        <Links />
      </head>
      <body>
        <SiteLayout>{children}</SiteLayout>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <Container>
      <title>{notFound ? `Seite nicht gefunden – ${site.name}` : `Fehler – ${site.name}`}</title>
      <h1>{notFound ? "Diese Seite gibt es nicht." : "Die Seite konnte nicht geladen werden."}</h1>
      <p>
        <Link to="/">Zur Startseite</Link> oder <a href={site.phone.href}>{site.phone.display} anrufen</a>.
      </p>
      {import.meta.env.DEV && error instanceof Error && <pre>{error.stack}</pre>}
    </Container>
  );
}
