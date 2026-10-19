import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CostsInfo } from "./CostsInfo";

describe("CostsInfo", () => {
  it("shows a placeholder while no checked information exists", () => {
    render(<CostsInfo costs={null} />);

    expect(screen.getByText(/INHALT FEHLT/)).toBeInTheDocument();
  });

  it("always shows source and check date next to the cost information", () => {
    render(
      <CostsInfo
        costs={{ text: "Beispieltext zu den Kosten.", source: "Beispielquelle", checkedOn: "2026-10-01" }}
      />,
    );

    expect(screen.getByText("Beispieltext zu den Kosten.")).toBeInTheDocument();
    expect(screen.getByText(/Quelle: Beispielquelle/)).toBeInTheDocument();
    expect(screen.getByText("01.10.2026")).toHaveAttribute("dateTime", "2026-10-01");
  });
});
