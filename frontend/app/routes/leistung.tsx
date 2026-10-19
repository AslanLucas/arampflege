import { useLocation } from "react-router";
import { Container } from "../components/Container/Container";
import { services, type Service } from "../content/services";
import { pageMeta } from "../meta";
import type { Route } from "./+types/leistung";

// routes.ts registers this module once per service, so every path has a matching service.
function serviceAt(pathname: string): Service {
  const slug = pathname.split("/").filter(Boolean).pop();
  const service = services.find((candidate) => candidate.slug === slug);
  if (!service) {
    throw new Error(`No service for path ${pathname}`);
  }
  return service;
}

export const meta: Route.MetaFunction = ({ location }) =>
  pageMeta(serviceAt(location.pathname).name, "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Leistung() {
  const service = serviceAt(useLocation().pathname);

  return (
    <Container>
      <h1>{service.name}</h1>
      <p>{service.summary}</p>
      <h2>Für wen diese Leistung gedacht ist</h2>
      <p>[[INHALT FEHLT: Für wen?]]</p>
      <h2>Was wir übernehmen</h2>
      <p>[[INHALT FEHLT: Was genau?]]</p>
      <h2>Wer die Kosten trägt</h2>
      <p>[[INHALT FEHLT: Wer bezahlt? Nur mit Quelle und Prüfdatum]]</p>
      <h2>So beantragen Sie die Leistung</h2>
      <p>[[INHALT FEHLT: Wie beantrage ich das?]]</p>
    </Container>
  );
}
