import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { servicePath, services } from "../content/services";
import Leistung from "./leistung";

const behandlungspflege = services.find((service) => service.slug === "behandlungspflege");
const pflegeberatung = services.find((service) => service.slug === "pflegeberatung");

function renderService(path: string) {
  const Stub = createRoutesStub([{ path: "/leistungen/:slug", Component: Leistung }]);
  render(<Stub initialEntries={[path]} />);
}

describe("Leistung", () => {
  it("renders the service name as the only h1", () => {
    renderService("/leistungen/behandlungspflege");

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Behandlungspflege");
  });

  it("links every jump list entry to an existing section", () => {
    renderService("/leistungen/behandlungspflege");
    const jumpList = screen.getByRole("navigation", { name: "Auf dieser Seite" });

    const links = within(jumpList).getAllByRole("link");
    expect(links).toHaveLength(4);
    for (const link of links) {
      const id = link.getAttribute("href")?.slice(1) ?? "";
      expect(document.getElementById(id), id).toHaveAccessibleName(link.textContent);
    }
  });

  it("marks drafts only on services with draft content", () => {
    renderService("/leistungen/behandlungspflege");
    expect(behandlungspflege?.draft).toBe(true);
    expect(screen.getAllByText(/ENTWURF/)).toHaveLength(2);
  });

  it("shows no draft note on services without draft content", () => {
    renderService("/leistungen/pflegeberatung");
    expect(pflegeberatung?.draft).toBe(false);
    expect(screen.queryByText(/ENTWURF/)).not.toBeInTheDocument();
  });

  it("links all other services but not the current one", () => {
    renderService("/leistungen/behandlungspflege");
    const more = screen.getByRole("region", { name: "Weitere Leistungen" });

    expect(within(more).getAllByRole("link")).toHaveLength(services.length - 1);
    expect(
      within(more).queryByRole("link", { name: "Behandlungspflege" }),
    ).not.toBeInTheDocument();
    for (const service of services.filter((candidate) => candidate.slug !== "behandlungspflege")) {
      expect(within(more).getByRole("link", { name: service.name })).toHaveAttribute(
        "href",
        servicePath(service),
      );
    }
  });
});
