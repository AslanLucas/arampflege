import { Container } from "../components/Container/Container";
import { pageMeta } from "../meta";
import type { Route } from "./+types/leistungen";

export const meta: Route.MetaFunction = () =>
  pageMeta("Leistungen", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Leistungen() {
  return (
    <Container>
      <h1>Leistungen</h1>
      <p>[[INHALT FEHLT: Übersicht der Leistungen mit fachlicher Freigabe]]</p>
    </Container>
  );
}
