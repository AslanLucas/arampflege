import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { site } from "../content/site";
import { pageMeta } from "../meta";
import type { Route } from "./+types/einsatzgebiet";

export const meta: Route.MetaFunction = () =>
  pageMeta("Einsatzgebiet", `Ambulante Pflege von ${site.legalName} in ${site.serviceArea}.`);

export default function Einsatzgebiet() {
  return (
    <Container>
      <Breadcrumbs current="Einsatzgebiet" />
      <h1>Einsatzgebiet</h1>
      <p>Wir pflegen Menschen in {site.serviceArea}.</p>
      <p>[[INHALT FEHLT: Genaue Orte und Postleitzahlen im Umland]]</p>
      <p>
        Wenn Sie nicht sicher sind, ob wir zu Ihnen kommen, rufen Sie uns an:{" "}
        <a href={site.phone.href}>{site.phone.display}</a>
      </p>
    </Container>
  );
}
