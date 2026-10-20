import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { FileField } from "./FileField";

function Harness({ error }: { error?: string }) {
  const [file, setFile] = useState<File | null>(null);
  return (
    <FileField
      id="cv"
      name="resume"
      label="Lebenslauf"
      requirement="optional"
      accept=".pdf"
      hint="PDF, JPG oder PNG, höchstens 10 MB."
      file={file}
      onChange={setFile}
      error={error}
    />
  );
}

describe("FileField", () => {
  it("is labelled, marked optional and describes the allowed files", () => {
    render(<Harness />);

    const input = screen.getByLabelText("Lebenslauf (optional)");
    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveAccessibleDescription("PDF, JPG oder PNG, höchstens 10 MB.");
  });

  it("shows the selected file with its size and can remove it again", () => {
    render(<Harness />);
    const input = screen.getByLabelText("Lebenslauf (optional)");

    fireEvent.change(input, {
      target: { files: [new File([new Uint8Array(2 * 1024 * 1024)], "lebenslauf.pdf", { type: "application/pdf" })] },
    });

    expect(screen.getByText("lebenslauf.pdf")).toBeInTheDocument();
    expect(screen.getByText(/Ausgewählt/)).toHaveTextContent("(2 MB)");

    fireEvent.click(screen.getByRole("button", { name: "Datei entfernen" }));

    expect(screen.queryByText("lebenslauf.pdf")).not.toBeInTheDocument();
    expect(input).toHaveFocus();
  });

  it("links an error message to the input", () => {
    render(<Harness error="Bitte laden Sie Ihren Lebenslauf als PDF, JPG oder PNG hoch." />);

    expect(screen.getByLabelText("Lebenslauf (optional)")).toHaveAccessibleDescription(
      "Fehler: Bitte laden Sie Ihren Lebenslauf als PDF, JPG oder PNG hoch. PDF, JPG oder PNG, höchstens 10 MB.",
    );
  });
});
