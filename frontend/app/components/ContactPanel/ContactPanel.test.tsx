import { render, screen, within } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { describe, expect, it } from "vitest";
import { site } from "../../content/site";
import { ContactPanel } from "./ContactPanel";

function renderPanel() {
  const Stub = createRoutesStub([{ path: "/", Component: ContactPanel }]);
  render(<Stub />);
}

describe("ContactPanel", () => {
  it("links every way to reach the office", () => {
    renderPanel();

    expect(screen.getByRole("link", { name: `${site.phone.display} anrufen` })).toHaveAttribute("href", site.phone.href);
    expect(screen.getByRole("link", { name: site.email.display })).toHaveAttribute("href", site.email.href);
    expect(screen.getByRole("link", { name: "Einsatzgebiet ansehen" })).toHaveAttribute("href", "/einsatzgebiet");
    expect(screen.getByText(site.address.street, { exact: false })).toBeInTheDocument();
  });

  it("shows a self-hosted map with attribution and a link to a map app", () => {
    renderPanel();

    const map = screen.getByRole("figure");
    expect(within(map).getByRole("img")).toHaveAttribute("src", "/images/karte-standort.webp");
    expect(within(map).getByRole("link", { name: "OpenStreetMap-Mitwirkende" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "In Google Maps öffnen" })).toHaveAttribute("href", site.address.mapUrl);
  });

  it("lists the office hours as a table with a row header per day", () => {
    renderPanel();

    const rows = within(screen.getByRole("table")).getAllByRole("rowheader").map((cell) => cell.textContent);
    expect(rows).toEqual([...site.officeHoursByDay.map(({ days }) => days), "Rufbereitschaft"]);
  });
});
