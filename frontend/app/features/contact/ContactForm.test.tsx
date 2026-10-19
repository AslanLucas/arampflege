import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StoreProvider } from "../../store/StoreProvider";
import { formTokenHandler, jsonResponse, mockApi } from "../../test/mockApi";
import { messages } from "../forms/messages";
import { ContactForm } from "./ContactForm";

const POST = "POST /api/contact-requests";

async function renderForm() {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <StoreProvider>
          <ContactForm />
        </StoreProvider>
      ),
    },
  ]);
  render(<Stub />);
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function submit() {
  fireEvent.click(screen.getByRole("button", { name: "Nachricht senden" }));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("ContactForm", () => {
  it("asks for a phone number or an e-mail address", async () => {
    const api = mockApi(formTokenHandler);
    await renderForm();
    fireEvent.change(screen.getByLabelText(/Ihr Name/), { target: { value: "Erika Muster" } });
    fireEvent.change(screen.getByLabelText(/Ihre Nachricht/), { target: { value: "Bitte melden Sie sich." } });
    fireEvent.click(screen.getByRole("checkbox"));

    submit();

    await waitFor(() => {
      expect(screen.getByLabelText(/Telefonnummer/)).toHaveAccessibleDescription(
        `Fehler: ${messages.phoneOrEmailRequired} Telefonnummer oder E-Mail-Adresse genügt.`,
      );
    });
    expect(api.count(POST)).toBe(0);
  });

  it("rejects an incomplete e-mail address", async () => {
    mockApi(formTokenHandler);
    await renderForm();
    fireEvent.change(screen.getByLabelText(/E-Mail-Adresse/), { target: { value: "erika@" } });

    submit();

    expect(await screen.findByRole("link", { name: messages.emailInvalid })).toHaveAttribute("href", "#kontakt-email");
  });

  it("sends a message with an e-mail address only and confirms it", async () => {
    const api = mockApi({ ...formTokenHandler, [POST]: () => jsonResponse(201) });
    await renderForm();
    fireEvent.change(screen.getByLabelText(/Ihr Name/), { target: { value: "Erika Muster" } });
    fireEvent.change(screen.getByLabelText(/E-Mail-Adresse/), { target: { value: "erika@beispiel.de" } });
    fireEvent.change(screen.getByLabelText(/Ihre Nachricht/), { target: { value: "Bitte rufen Sie zurück." } });
    fireEvent.click(screen.getByRole("checkbox"));

    submit();

    expect(await screen.findByRole("heading", { name: "Danke, wir haben Ihre Nachricht erhalten" })).toBeInTheDocument();
    expect(api.calls.find((call) => call.route === POST)?.body).toMatchObject({
      name: "Erika Muster",
      phone: "",
      email: "erika@beispiel.de",
      message: "Bitte rufen Sie zurück.",
      consent: true,
      formToken: "test-token",
    });
  });

  it("asks to reload when the server reports an expired form", async () => {
    const expired = "Das Formular ist abgelaufen. Bitte laden Sie die Seite neu und senden Sie es noch einmal.";
    mockApi({ ...formTokenHandler, [POST]: () => jsonResponse(400, { errors: { form: [expired] } }) });
    await renderForm();
    fireEvent.change(screen.getByLabelText(/Ihr Name/), { target: { value: "Erika Muster" } });
    fireEvent.change(screen.getByLabelText(/Telefonnummer/), { target: { value: "0521 123456" } });
    fireEvent.change(screen.getByLabelText(/Ihre Nachricht/), { target: { value: "Hallo" } });
    fireEvent.click(screen.getByRole("checkbox"));

    submit();

    expect(await screen.findByText(expired)).toBeInTheDocument();
  });
});
