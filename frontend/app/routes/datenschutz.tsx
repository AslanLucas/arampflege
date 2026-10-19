import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { pageMeta } from "../meta";
import type { Route } from "./+types/datenschutz";

export const meta: Route.MetaFunction = () =>
  pageMeta("Datenschutzerklärung", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Datenschutz() {
  return (
    <Container>
      <Breadcrumbs current="Datenschutzerklärung" />
      <h1>Datenschutzerklärung</h1>
      <p>[[INHALT FEHLT: Datenschutzerklärung, vom Kunden freigegeben]]</p>
    </Container>
  );
}
