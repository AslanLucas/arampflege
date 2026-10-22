import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { servicePath, services } from "../../content/services";
import { ServiceCards } from "./ServiceCards";

function renderCards() {
  const Stub = createRoutesStub([{ path: "/", Component: () => <ServiceCards services={services} /> }]);
  render(<Stub />);
}

describe("ServiceCards", () => {
  it("shows photo, name, payer and a link for every service", () => {
    renderCards();
    const cards = screen.getAllByRole("listitem").filter((item) => item.querySelector("h3"));

    expect(cards).toHaveLength(services.length);
    cards.forEach((card, index) => {
      const service = services[index];
      if (!service) return;
      expect(within(card).getByRole("heading", { level: 3 })).toHaveTextContent(service.name);
      expect(within(card).getByRole("img")).toHaveAttribute("alt", service.photoAlt);
      expect(within(card).getByText(service.facts[0].value)).toBeInTheDocument();
      expect(within(card).getByRole("link", { name: `Zur Leistung ${service.name}` })).toHaveAttribute(
        "href",
        servicePath(service),
      );
    });
  });

  it("lists examples on the back without placeholders", () => {
    renderCards();

    for (const card of screen.getAllByRole("listitem").filter((item) => item.querySelector("h3"))) {
      const examples = within(card).getAllByRole("listitem");
      expect(examples.length).toBeGreaterThan(0);
      expect(examples.length).toBeLessThanOrEqual(3);
      for (const example of examples) {
        expect(example.textContent).not.toMatch(/\[\[/);
      }
    }
  });
});
