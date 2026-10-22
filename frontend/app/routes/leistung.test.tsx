import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { servicePath, services } from "../content/services";
import Leistung from "./leistung";

const behandlungspflege = services.find((service) => service.slug === "behandlungspflege");

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

  it("marks every section of an unreviewed service as a draft", () => {
    renderService("/leistungen/behandlungspflege");
    expect(behandlungspflege?.draft).toBe(true);
    expect(screen.getAllByText(/ENTWURF/)).toHaveLength(4);
  });

  it("shows how to apply as numbered steps and names the legal source of the costs", () => {
    renderService("/leistungen/behandlungspflege");

    const application = screen.getByRole("region", { name: "So beantragen Sie die Leistung" });
    expect(within(within(application).getByRole("list")).getAllByRole("listitem")).toHaveLength(
      behandlungspflege?.application.length ?? -1,
    );
    const costs = screen.getByRole("region", { name: "Wer die Kosten trägt" });
    expect(within(costs).getByText(/Quelle: §§ 37 und 61 SGB V/)).toBeInTheDocument();
  });

  it("shows the key facts and the service photo at the top", () => {
    renderService("/leistungen/behandlungspflege");

    const facts = screen.getByLabelText("Auf einen Blick");
    for (const fact of behandlungspflege?.facts ?? []) {
      expect(within(facts).getByText(fact.value)).toBeInTheDocument();
    }
    expect(screen.getByRole("img", { name: behandlungspflege?.photoAlt })).toHaveAttribute("loading", "eager");
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
