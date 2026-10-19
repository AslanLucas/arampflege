import { Container } from "../components/Container/Container";
import { ServiceList } from "../components/ServiceList/ServiceList";
import { services } from "../content/services";
import { pageMeta } from "../meta";
import type { Route } from "./+types/leistungen";

export const meta: Route.MetaFunction = () =>
  pageMeta("Leistungen", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Leistungen() {
  return (
    <Container>
      <h1>Leistungen</h1>
      <p>[[INHALT FEHLT: Leistungen vom Kunden bestätigen, Einleitung zur Übersicht]]</p>
      <ServiceList services={services} headingLevel="h2" />
    </Container>
  );
}
