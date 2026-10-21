import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { services } from "../content/services";
import Home from "./home";

function renderHome() {
  const Stub = createRoutesStub([{ path: "/", Component: Home }]);
  render(<Stub initialEntries={["/"]} />);
}

describe("Home", () => {
  it("renders exactly one level-one heading", () => {
    renderHome();

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("offers the phone call as the main action in the top area", () => {
    renderHome();

    const [firstCall] = screen.getAllByRole("link", { name: /anrufen$/ });
    expect(firstCall?.closest("[data-surface]")).not.toBeNull();
    expect(firstCall).toHaveAttribute(
      "href",
      expect.stringMatching(/^tel:/),
    );
  });

  it("links every service to its own page", () => {
    renderHome();
    const section = screen.getByRole("region", { name: "Wobei wir Sie unterstützen" });

    for (const service of services) {
      expect(within(section).getByRole("link", { name: `Zur Leistung ${service.name}` })).toHaveAttribute(
        "href",
        `/leistungen/${service.slug}`,
      );
    }
  });

  it("shows the care process as an ordered list", () => {
    renderHome();
    const section = screen.getByRole("region", { name: "Was passiert nach Ihrem Anruf?" });

    expect(within(section).getByRole("list")).toBeInstanceOf(HTMLOListElement);
    expect(within(section).getAllByRole("listitem")).toHaveLength(4);
  });

  it("labels every section with its heading", () => {
    renderHome();

    for (const name of [
      "Wobei wir Sie unterstützen",
      "Was passiert nach Ihrem Anruf?",
      "Wer Sie betreut",
      "Arbeiten bei Aram",
      "Sprechen Sie mit uns",
    ]) {
      expect(screen.getByRole("region", { name })).toBeInTheDocument();
    }
  });

  it("answers whether we come to the visitor and links to the service area", () => {
    renderHome();
    const section = screen.getByRole("region", { name: "Kommen wir auch zu Ihnen?" });

    expect(within(section).getByRole("link", { name: "Einsatzgebiet ansehen" })).toHaveAttribute(
      "href",
      "/einsatzgebiet",
    );
    const illustration = section.querySelector("svg");
    expect(illustration).toHaveAttribute("aria-hidden", "true");
  });

  it("claims no digital services the client has not confirmed", () => {
    renderHome();
    const text = document.body.textContent;

    expect(text).not.toMatch(/Pflegedokumentation|Online-Termin|Termin online|App für/i);
  });

  it("links every online service tile to its destination", () => {
    renderHome();
    const section = screen.getByRole("region", { name: "Vieles erledigen Sie bei uns online" });

    for (const [name, href] of [
      ["Rückruf anfordern", "/rueckruf"],
      ["Zum Kontaktformular", "/kontakt"],
      ["E-Mail schreiben", "mailto:info@arampflege.de"],
      ["Zur Kurzbewerbung", "/karriere/bewerben"],
      ["Zur Datenschutzerklärung", "/datenschutz"],
    ]) {
      expect(within(section).getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });
});
