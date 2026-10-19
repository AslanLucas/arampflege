import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => [
  { title: "[[PFLEGEDIENST-NAME]] – Ambulante Pflege in [[ORT/REGION]]" },
  {
    name: "description",
    content: "[[INHALT FEHLT: Kurzbeschreibung der Startseite für Suchergebnisse]]",
  },
];

export default function Home() {
  return (
    <main>
      <h1>[[PFLEGEDIENST-NAME]]</h1>
    </main>
  );
}
