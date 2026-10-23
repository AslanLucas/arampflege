import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { site } from "../content/site";
import Datenschutz from "./datenschutz";

function renderPage() {
  const Stub = createRoutesStub([{ path: "/datenschutz", Component: Datenschutz }]);
  render(<Stub initialEntries={["/datenschutz"]} />);
}

describe("Datenschutz", () => {
  it("names the controller with address and contact", () => {
    renderPage();
    const controller = screen.getByRole("region", { name: "Verantwortlicher" });
    expect(within(controller).getByText(site.address.street, { exact: false })).toBeInTheDocument();
    expect(within(controller).getByRole("link", { name: site.email.display })).toHaveAttribute("href", site.email.href);
  });

  it("states both retention periods and the rights of data subjects", () => {
    renderPage();
    expect(screen.getByRole("region", { name: "Kontaktformular" })).toHaveTextContent(
      `nach ${String(site.retention.requestDays)} Tagen automatisch gelöscht`,
    );
    expect(screen.getByRole("region", { name: "Bewerbungen" })).toHaveTextContent(
      `automatisch nach ${String(site.retention.applicationDays)} Tagen`,
    );
    expect(screen.getByRole("heading", { name: "Widerspruchsrecht" })).toBeInTheDocument();
    expect(screen.getByRole("region", { name: "Beschwerderecht bei der Aufsichtsbehörde" })).toHaveTextContent(
      "Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen",
    );
  });

  it("lets every entry of the contents jump to its heading", () => {
    renderPage();
    const links = within(screen.getByRole("navigation", { name: "Inhalt" })).getAllByRole("link");
    expect(links.length).toBeGreaterThan(10);
    for (const link of links) {
      const id = link.getAttribute("href")?.slice(1) ?? "";
      expect(document.getElementById(id), id).toHaveTextContent(link.textContent);
    }
  });
});
