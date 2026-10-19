import { Container } from "../components/Container/Container";
import { pageMeta } from "../meta";
import type { Route } from "./+types/impressum";

export const meta: Route.MetaFunction = () =>
  pageMeta("Impressum", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Impressum() {
  return (
    <Container>
      <h1>Impressum</h1>
      <p>[[INHALT FEHLT: Impressum vom Kunden]]</p>
    </Container>
  );
}
