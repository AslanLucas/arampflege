import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./home";

describe("Home", () => {
  it("renders exactly one level-one heading inside main", () => {
    render(<Home />);

    expect(screen.getByRole("main")).toContainElement(
      screen.getByRole("heading", { level: 1 }),
    );
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });
});
