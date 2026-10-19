import { Container } from "../components/Container/Container";
import { pageMeta } from "../meta";
import type { Route } from "./+types/ueber-uns";

export const meta: Route.MetaFunction = () =>
  pageMeta("Über uns", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function UeberUns() {
  return (
    <Container>
      <h1>Über uns</h1>
      <p>[[INHALT FEHLT: Geschichte, Team und Pflegedienstleitung]]</p>
    </Container>
  );
}
