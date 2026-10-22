import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { serviceAreaMap } from "../../content/serviceAreaMap";
import { site } from "../../content/site";
import { ServiceAreaMap } from "./ServiceAreaMap";

describe("ServiceAreaMap", () => {
  it("lists every confirmed place with its postal code but without distances", () => {
    render(<ServiceAreaMap />);
    const list = screen.getByRole("list", { name: "Orte und Entfernungen vom Büro" });

    expect(serviceAreaMap.regions.map((region) => region.name)).toEqual(site.places.map((place) => place.name));
    for (const region of serviceAreaMap.regions) {
      const button = within(list).getByRole("button", { name: new RegExp(`^${region.name}(?!-)`) });
      expect(button).toHaveTextContent(region.postalCode);
      expect(button).not.toHaveTextContent(/km|Min\./);
    }
  });

  it("highlights a place on the map when its button is focused or the shape is hovered", () => {
    const { container } = render(<ServiceAreaMap />);
    const shapes = container.querySelectorAll("svg > g:first-child > path");
    const heek = screen.getByRole("button", { name: /^Heek/ });

    fireEvent.focus(heek);
    expect(heek).toHaveAttribute("data-active", "true");
    expect(shapes[3]).toHaveAttribute("data-active", "true");

    fireEvent.blur(heek);
    fireEvent.pointerEnter(shapes.item(4));
    expect(screen.getByRole("button", { name: /^Ahaus/ })).toHaveAttribute("data-active", "true");
  });

  it("keeps a place selected after a click until it is clicked again", () => {
    render(<ServiceAreaMap />);
    const ochtrup = screen.getByRole("button", { name: /^Ochtrup/ });

    fireEvent.click(ochtrup);
    expect(ochtrup).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(ochtrup);
    expect(ochtrup).toHaveAttribute("aria-pressed", "false");
  });

  it("keeps the map itself out of the accessibility tree and credits the map data", () => {
    const { container } = render(<ServiceAreaMap />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(screen.getByRole("link", { name: "OpenStreetMap-Mitwirkende" })).toBeInTheDocument();
  });

  it("shows a pin for every place in both layouts", () => {
    for (const listPosition of ["below", "side"] as const) {
      const { container, unmount } = render(<ServiceAreaMap listPosition={listPosition} />);
      expect(container.querySelectorAll("ul button svg")).toHaveLength(serviceAreaMap.regions.length);
      unmount();
    }
  });
});
