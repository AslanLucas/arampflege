import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { pageMeta } from "../meta";
import type { Route } from "./+types/kontakt";

export const meta: Route.MetaFunction = () =>
  pageMeta("Kontakt", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Kontakt() {
  return (
    <Container>
      <Breadcrumbs current="Kontakt" />
      <h1>Kontakt</h1>
      <p>[[INHALT FEHLT: Kontaktseite mit Bürozeiten, Rufbereitschaft und Formular]]</p>
    </Container>
  );
}
