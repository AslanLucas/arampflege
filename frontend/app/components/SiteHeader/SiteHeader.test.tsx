import { fireEvent, render, screen } from "@testing-library/react";
import { createRoutesStub, Outlet } from "react-router";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./SiteHeader";

function renderHeader() {
  const Stub = createRoutesStub([
    {
      Component: () => (
        <>
          <SiteHeader />
          <Outlet />
        </>
      ),
      children: [
        { path: "/", Component: () => <h1>Start</h1> },
        { path: "/kontakt", Component: () => <h1>Kontakt</h1> },
      ],
    },
  ]);
  render(<Stub initialEntries={["/"]} />);
  return screen.getByRole("button", { name: "Menü" });
}

describe("SiteHeader", () => {
  it("shows the phone number as a call link", () => {
    renderHeader();

    expect(screen.getByRole("link", { name: /anrufen$/ })).toHaveAttribute(
      "href",
      expect.stringMatching(/^tel:/),
    );
  });

  it("opens and closes the menu with the menu button", () => {
    const menuButton = renderHeader();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveAttribute("aria-controls", "hauptnavigation");

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("closes the menu on Escape and returns focus to the menu button", () => {
    const menuButton = renderHeader();
    fireEvent.click(menuButton);
    screen.getByRole("link", { name: "Leistungen" }).focus();

    fireEvent.keyDown(document, { key: "Escape" });

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
    expect(menuButton).toHaveFocus();
  });

  it("closes the menu after navigating", async () => {
    const menuButton = renderHeader();
    fireEvent.click(menuButton);

    fireEvent.click(screen.getByRole("link", { name: "Kontakt" }));

    expect(await screen.findByRole("heading", { name: "Kontakt" })).toBeInTheDocument();
    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("marks the current page in the navigation", async () => {
    renderHeader();
    fireEvent.click(screen.getByRole("link", { name: "Kontakt" }));
    await screen.findByRole("heading", { name: "Kontakt" });

    expect(screen.getByRole("link", { name: "Kontakt" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Leistungen" })).not.toHaveAttribute("aria-current");
  });
});
