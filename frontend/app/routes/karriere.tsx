import { Container } from "../components/Container/Container";
import { pageMeta } from "../meta";
import type { Route } from "./+types/karriere";

export const meta: Route.MetaFunction = () =>
  pageMeta("Karriere", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Karriere() {
  return (
    <Container>
      <h1>Karriere</h1>
      <p>[[INHALT FEHLT: Aktuelle Stellen und Arbeitsbedingungen]]</p>
    </Container>
  );
}
