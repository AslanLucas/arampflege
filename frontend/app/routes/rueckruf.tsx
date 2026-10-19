import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { site } from "../content/site";
import { pageMeta } from "../meta";
import type { Route } from "./+types/rueckruf";

export const meta: Route.MetaFunction = () =>
  pageMeta("Rückruf anfordern", "[[INHALT FEHLT: Kurzbeschreibung für Suchergebnisse]]");

export default function Rueckruf() {
  return (
    <Container>
      <Breadcrumbs current="Rückruf anfordern" />
      <h1>Rückruf anfordern</h1>
      <p>[[FORMULAR: Rückrufbitte mit Name, Telefon, PLZ/Ort und Wunschzeit]]</p>
      <p>
        Sie erreichen uns auch telefonisch: <a href={site.phone.href}>{site.phone.display} anrufen</a>
      </p>
    </Container>
  );
}
