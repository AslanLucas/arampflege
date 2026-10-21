import { Breadcrumbs } from "../components/Breadcrumbs/Breadcrumbs";
import { Container } from "../components/Container/Container";
import { DetailList } from "../components/DetailList/DetailList";
import { PostalAddress } from "../components/PostalAddress/PostalAddress";
import { site } from "../content/site";
import { pageMeta } from "../meta";
import type { Route } from "./+types/impressum";

export const meta: Route.MetaFunction = () =>
  pageMeta("Impressum", `Impressum der ${site.legalName}, ${site.address.postalCodeAndCity}.`);

export default function Impressum() {
  return (
    <Container>
      <Breadcrumbs current="Impressum" />
      <h1>Impressum</h1>
      <p>[[ENTWURF: Impressum vom Kunden bzw. rechtlich prüfen lassen]]</p>

      <h2>Anbieter</h2>
      <PostalAddress />

      <DetailList
        details={[
          { term: "Vertreten durch", description: "[[INHALT FEHLT: Geschäftsführung]]" },
          {
            term: "Telefon",
            description: <a href={site.phone.href}>{site.phone.display}</a>,
          },
          {
            term: "E-Mail",
            description: <a href={site.email.href}>{site.email.display}</a>,
          },
          { term: "Registergericht", description: site.register.court },
          { term: "Registernummer", description: site.register.number },
          { term: "Umsatzsteuer-Identifikationsnummer", description: "[[INHALT FEHLT: USt-IdNr., falls vorhanden]]" },
          { term: "Zuständige Aufsichtsbehörde", description: "[[INHALT FEHLT: Aufsichtsbehörde, falls erforderlich]]" },
        ]}
      />
    </Container>
  );
}
