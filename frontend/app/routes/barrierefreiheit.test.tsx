import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { site } from "../content/site";
import Barrierefreiheit from "./barrierefreiheit";

function renderPage() {
  const Stub = createRoutesStub([{ path: "/barrierefreiheit", Component: Barrierefreiheit }]);
  render(<Stub initialEntries={["/barrierefreiheit"]} />);
}

describe("Barrierefreiheit", () => {
  it("names the applied standards and the conformance status", () => {
    renderPage();
    const standards = screen.getByRole("region", { name: "Angewandte Standards" });
    expect(standards).toHaveTextContent("WCAG) 2.2, Konformitätsstufe AA");
    expect(standards).toHaveTextContent("EN 301 549");
    expect(screen.getByRole("region", { name: "Stand der Vereinbarkeit" })).toHaveTextContent("teilweise vereinbar");
  });

  it("lists the known barriers and the exemptions", () => {
    renderPage();
    const barriers = screen.getByRole("region", { name: "Bekannte Barrieren" });
    expect(within(barriers).getAllByRole("listitem").length).toBeGreaterThanOrEqual(5);
    expect(screen.getByRole("region", { name: "Ausnahmen" })).toHaveTextContent("Kleinstunternehmen");
  });

  it("offers feedback contact, market surveillance and conciliation", () => {
    renderPage();
    const feedback = screen.getByRole("region", { name: "Barrieren melden" });
    expect(within(feedback).getByRole("link", { name: site.email.display })).toHaveAttribute("href", site.email.href);
    const enforcement = screen.getByRole("region", { name: "Marktüberwachung und Schlichtung" });
    expect(enforcement).toHaveTextContent("Marktüberwachungsstelle der Länder");
    expect(enforcement).toHaveTextContent("Schlichtungsstelle nach dem Behindertengleichstellungsgesetz");
  });

  it("lets every entry of the contents jump to its heading", () => {
    renderPage();
    const links = within(screen.getByRole("navigation", { name: "Inhalt" })).getAllByRole("link");
    for (const link of links) {
      const id = link.getAttribute("href")?.slice(1) ?? "";
      expect(document.getElementById(id), id).toHaveTextContent(link.textContent);
    }
  });
});
