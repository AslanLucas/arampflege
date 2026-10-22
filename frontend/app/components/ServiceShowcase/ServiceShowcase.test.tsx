import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { servicePath, services } from "../../content/services";
import { ServiceShowcase } from "./ServiceShowcase";

function renderShowcase() {
  const Stub = createRoutesStub([{ path: "/", Component: () => <ServiceShowcase services={services} /> }]);
  render(<Stub />);
}

describe("ServiceShowcase", () => {
  it("links every service by its name and shows who pays", () => {
    renderShowcase();
    const rows = screen.getAllByRole("listitem").filter((item) => item.querySelector("h2"));

    expect(rows).toHaveLength(services.length);
    rows.forEach((row, index) => {
      const service = services[index];
      if (!service) return;
      expect(within(row).getByRole("link")).toHaveAccessibleName(service.name);
      expect(within(row).getByRole("link")).toHaveAttribute("href", servicePath(service));
      expect(within(row).getByText(service.facts[0].value)).toBeInTheDocument();
      expect(within(row).getByRole("img")).toHaveAttribute("alt", service.photoAlt);
    });
  });

  it("shows at most three highlights and never a placeholder", () => {
    renderShowcase();

    for (const list of screen.getAllByRole("list").slice(1)) {
      const items = within(list).getAllByRole("listitem");
      expect(items.length).toBeLessThanOrEqual(3);
      for (const item of items) {
        expect(item.textContent).not.toMatch(/\[\[/);
      }
    }
  });
});
