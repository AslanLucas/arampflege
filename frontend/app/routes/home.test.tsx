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

    expect(screen.getByRole("link", { name: /anrufen$/ })).toHaveAttribute(
      "href",
      expect.stringMatching(/^tel:/),
    );
  });

  it("links every service to its own page", () => {
    renderHome();
    const section = screen.getByRole("region", { name: "Wobei wir Sie unterstützen" });

    for (const service of services) {
      expect(within(section).getByRole("link", { name: service.name })).toHaveAttribute(
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
      "Arbeiten bei uns",
      "Wir rufen Sie zurück",
    ]) {
      expect(screen.getByRole("region", { name })).toBeInTheDocument();
    }
  });
});
