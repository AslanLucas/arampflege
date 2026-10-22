import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StoreProvider } from "../../store/StoreProvider";
import { formTokenHandler, jsonResponse, mockApi } from "../../test/mockApi";
import { messages } from "../forms/messages";
import { ApplicationForm } from "./ApplicationForm";

vi.mock("../../content/jobs", async (importOriginal) => {
  const original = await importOriginal<typeof import("../../content/jobs")>();
  const jobs = [
    {
      slug: "pflegefachkraft-teilzeit",
      title: "Pflegefachkraft",
      scope: "Teilzeit",
      location: "Testort",
      postedOn: "2026-10-01",
      tasks: [],
      requirements: [],
      offer: [],
      draft: false,
    },
  ];
  return { ...original, jobs, jobBySlug: (slug: string | null | undefined) => jobs.find((job) => job.slug === slug) };
});

const POST = "POST /api/applications";

async function renderForm(path = "/karriere/bewerben") {
  const Stub = createRoutesStub([
    {
      path: "/karriere/bewerben",
      Component: () => (
        <StoreProvider>
          <ApplicationForm />
        </StoreProvider>
      ),
    },
  ]);
  render(<Stub initialEntries={[path]} />);
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function fillRequired() {
  fireEvent.change(screen.getByLabelText(/Ihr Name/), { target: { value: "Erika Muster" } });
  fireEvent.change(screen.getByLabelText(/Telefonnummer/), { target: { value: "0521 123456" } });
  fireEvent.click(screen.getByLabelText("Pflegehilfskraft oder Pflegeassistenz"));
  fireEvent.click(screen.getByRole("checkbox"));
}

function chooseFile(content: BlobPart[], name: string, type: string) {
  fireEvent.change(screen.getByLabelText(/Lebenslauf/), { target: { files: [new File(content, name, { type })] } });
}

function submit() {
  fireEvent.click(screen.getByRole("button", { name: "Bewerbung senden" }));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ApplicationForm", () => {
  it("asks only for what is required and focuses the summary", async () => {
    const api = mockApi(formTokenHandler);
    await renderForm();

    submit();

    await waitFor(() => {
      expect(document.activeElement).toHaveTextContent("Bitte prüfen Sie Ihre Angaben");
    });
    for (const message of [
      messages.nameRequired,
      messages.phoneRequired,
      messages.qualificationRequired,
      messages.consentRequired,
    ]) {
      expect(screen.getByRole("link", { name: message })).toBeInTheDocument();
    }
    expect(screen.queryByRole("link", { name: messages.resumeType })).not.toBeInTheDocument();
    expect(api.count(POST)).toBe(0);
  });

  it("preselects the job from the link and sends everything as multipart form data", async () => {
    const api = mockApi({ ...formTokenHandler, [POST]: () => jsonResponse(201) });
    // In jsdom, Node's FormData cannot serialise jsdom's File, so the file is checked where the
    // form hands it over; the real upload is covered by the Playwright and backend tests.
    const append = vi.spyOn(FormData.prototype, "append");
    await renderForm("/karriere/bewerben?stelle=pflegefachkraft-teilzeit");

    expect(screen.getByLabelText("Pflegefachkraft, Teilzeit")).toBeChecked();
    fillRequired();
    chooseFile(["%PDF-1.7"], "lebenslauf.pdf", "application/pdf");
    submit();

    expect(await screen.findByRole("heading", { name: "Danke, wir haben Ihre Bewerbung erhalten" })).toBeInTheDocument();
    expect(api.calls.find((call) => call.route === POST)?.body).toMatchObject({
      position: "pflegefachkraft-teilzeit",
      name: "Erika Muster",
      phone: "0521 123456",
      email: "",
      qualification: "pflegehilfskraft",
      message: "",
      consent: "true",
      website: "",
      formToken: "test-token",
    });
    const resume = append.mock.calls.find(([name]) => name === "resume")?.[1];
    expect(resume).toBeInstanceOf(File);
    expect(resume).toMatchObject({ name: "lebenslauf.pdf", size: 8, type: "application/pdf" });
    append.mockRestore();
  });

  it("falls back to an unsolicited application for unknown job links", async () => {
    mockApi(formTokenHandler);
    await renderForm("/karriere/bewerben?stelle=gibt-es-nicht");

    expect(screen.getByLabelText("Initiativbewerbung")).toBeChecked();
  });

  it("rejects files that are too large or of the wrong type before sending", async () => {
    const api = mockApi(formTokenHandler);
    await renderForm();
    fillRequired();

    chooseFile([new Uint8Array(10 * 1024 * 1024 + 1)], "lebenslauf.pdf", "application/pdf");
    submit();
    expect(await screen.findByRole("link", { name: messages.resumeTooLarge })).toHaveAttribute(
      "href",
      "#bewerbung-lebenslauf",
    );

    chooseFile(["MZ"], "programm.exe", "application/x-msdownload");
    submit();
    expect(await screen.findByRole("link", { name: messages.resumeType })).toBeInTheDocument();
    expect(api.count(POST)).toBe(0);
  });

  it("shows the server's file check at the upload field", async () => {
    mockApi({ ...formTokenHandler, [POST]: () => jsonResponse(400, { errors: { resume: [messages.resumeType] } }) });
    await renderForm();
    fillRequired();
    chooseFile(["MZ"], "lebenslauf.pdf", "application/pdf");

    submit();

    await waitFor(() => {
      expect(screen.getByLabelText(/Lebenslauf/)).toHaveAttribute("aria-invalid", "true");
    });
    expect(screen.getByRole("link", { name: messages.resumeType })).toBeInTheDocument();
  });
});
