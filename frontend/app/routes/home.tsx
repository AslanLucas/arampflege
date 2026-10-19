import { Container } from "../components/Container/Container";
import { site } from "../content/site";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => [
  { title: `${site.name} – Ambulante Pflege in ${site.region}` },
  {
    name: "description",
    content: "[[INHALT FEHLT: Kurzbeschreibung der Startseite für Suchergebnisse]]",
  },
];

export default function Home() {
  return (
    <Container>
      <h1>{site.name}</h1>
    </Container>
  );
}
