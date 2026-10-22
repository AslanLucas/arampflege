import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CostsInfo } from "./CostsInfo";

describe("CostsInfo", () => {
  it("shows a placeholder for the check date until the client has approved the text", () => {
    render(<CostsInfo costs={{ text: ["Erster Absatz.", "Zweiter Absatz."], source: "§ 36 SGB XI", checkedOn: null }} />);

    expect(screen.getByText("Erster Absatz.")).toBeInTheDocument();
    expect(screen.getByText("Zweiter Absatz.")).toBeInTheDocument();
    expect(screen.getByText(/Quelle: § 36 SGB XI · Stand: \[\[INHALT FEHLT/)).toBeInTheDocument();
  });

  it("always shows source and check date next to the cost information", () => {
    render(<CostsInfo costs={{ text: ["Beispieltext zu den Kosten."], source: "Beispielquelle", checkedOn: "2026-10-01" }} />);

    expect(screen.getByText(/Quelle: Beispielquelle/)).toBeInTheDocument();
    expect(screen.getByText("01.10.2026")).toHaveAttribute("dateTime", "2026-10-01");
  });
});
