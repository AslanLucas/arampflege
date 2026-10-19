import { Container } from "../components/Container/Container";
import { pageMeta } from "../meta";
import type { Route } from "./+types/barrierefreiheit";

export const meta: Route.MetaFunction = () =>
  pageMeta("Erklärung zur Barrierefreiheit", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Barrierefreiheit() {
  return (
    <Container>
      <h1>Erklärung zur Barrierefreiheit</h1>
      <p>[[INHALT FEHLT: Erklärung zur Barrierefreiheit]]</p>
    </Container>
  );
}
