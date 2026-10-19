import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { pageMeta } from "../meta";
import type { Route } from "./+types/karriere";

export const meta: Route.MetaFunction = () =>
  pageMeta("Karriere", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Karriere() {
  return (
    <Container>
      <Breadcrumbs current="Karriere" />
      <h1>Karriere</h1>
      <p>[[INHALT FEHLT: Aktuelle Stellen und Arbeitsbedingungen]]</p>
    </Container>
  );
}
