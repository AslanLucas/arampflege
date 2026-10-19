import { Container } from "../components/Container/Container";
import { pageMeta } from "../meta";
import type { Route } from "./+types/einsatzgebiet";

export const meta: Route.MetaFunction = () =>
  pageMeta("Einsatzgebiet", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Einsatzgebiet() {
  return (
    <Container>
      <h1>Einsatzgebiet</h1>
      <p>[[INHALT FEHLT: Orte und Postleitzahlen im Einsatzgebiet]]</p>
    </Container>
  );
}
