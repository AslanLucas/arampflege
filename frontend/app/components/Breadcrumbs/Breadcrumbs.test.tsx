import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { Breadcrumbs } from "./Breadcrumbs";

describe("Breadcrumbs", () => {
  it("links the start page and the trail and marks the current page", () => {
    const Stub = createRoutesStub([
      {
        path: "/",
        Component: () => (
          <Breadcrumbs trail={[{ label: "Leistungen", to: "/leistungen" }]} current="Grundpflege" />
        ),
      },
    ]);
    render(<Stub />);

    const nav = screen.getByRole("navigation", { name: "Sie sind hier" });
    const items = within(nav).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(within(nav).getByRole("link", { name: "Start" })).toHaveAttribute("href", "/");
    expect(within(nav).getByRole("link", { name: "Leistungen" })).toHaveAttribute("href", "/leistungen");
    expect(within(nav).queryByRole("link", { name: "Grundpflege" })).not.toBeInTheDocument();
    expect(within(nav).getByText("Grundpflege")).toHaveAttribute("aria-current", "page");
  });
});
