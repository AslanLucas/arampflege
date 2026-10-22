import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { employerPromises } from "../../content/careers";
import { EmployerPromises } from "./EmployerPromises";

describe("EmployerPromises", () => {
  it("shows every confirmed promise with its heading", () => {
    render(<EmployerPromises />);
    const section = screen.getByRole("region", { name: employerPromises.title });

    for (const promise of [employerPromises.featured, ...employerPromises.items]) {
      expect(within(section).getByRole("heading", { level: 3, name: promise.title })).toBeInTheDocument();
    }
  });

  it("promises nothing the client has not confirmed", () => {
    render(<EmployerPromises />);
    const text = screen.getByRole("region", { name: employerPromises.title }).textContent;

    expect(text).not.toMatch(/Zuschl[äa]g|Fortbildung|Weiterbildung|Einarbeitung|Mentor|€|\d+\s*Euro/i);
  });
});
