import { useState, type ReactNode } from "react";
import { Provider } from "react-redux";
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
import { makeStore } from "./store/store";
import "./styles/tokens.css";
import "./styles/base.css";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <html lang="de">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [store] = useState(makeStore);

  return (
    <Provider store={store}>
      <Outlet />
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;

  return (
    <main>
      <title>{notFound ? "Seite nicht gefunden" : "Fehler"}</title>
      <h1>{notFound ? "Diese Seite gibt es nicht." : "Die Seite konnte nicht geladen werden."}</h1>
      <p>
        <Link to="/">Zur Startseite</Link>
      </p>
      {import.meta.env.DEV && error instanceof Error && <pre>{error.stack}</pre>}
    </main>
  );
}
