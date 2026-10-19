import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import { afterEach, describe, expect, it, vi } from "vitest";
import { StoreProvider } from "../../store/StoreProvider";
import { formTokenHandler, jsonResponse, mockApi } from "../../test/mockApi";
import { messages } from "../forms/messages";
import { CallbackForm } from "./CallbackForm";

const POST = "POST /api/callback-requests";

async function renderForm() {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: () => (
        <StoreProvider>
          <CallbackForm />
        </StoreProvider>
      ),
    },
  ]);
  render(<Stub />);
  // Let the form token request settle.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
}

function fillValidForm() {
  fireEvent.change(screen.getByLabelText(/Ihr Name/), { target: { value: "  Erika Muster  " } });
  fireEvent.change(screen.getByLabelText(/Telefonnummer/), { target: { value: "0521 123456" } });
  fireEvent.change(screen.getByLabelText(/Postleitzahl oder Ort/), { target: { value: "33602 Bielefeld" } });
  fireEvent.click(screen.getByLabelText("Nachmittags"));
  fireEvent.click(screen.getByRole("checkbox"));
}

function submit() {
  fireEvent.click(screen.getByRole("button", { name: "Rückruf anfordern" }));
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CallbackForm", () => {
  it("shows a German error for every missing field and focuses the summary", async () => {
    const api = mockApi(formTokenHandler);
    await renderForm();

    submit();

    await waitFor(() => {
      expect(document.activeElement).toHaveTextContent("Bitte prüfen Sie Ihre Angaben");
    });
    expect(screen.getByLabelText(/Ihr Name/)).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByLabelText(/Ihr Name/)).toHaveAccessibleDescription(`Fehler: ${messages.nameRequired}`);
    expect(screen.getByLabelText(/Telefonnummer/)).toHaveAccessibleDescription(`Fehler: ${messages.phoneRequired}`);
    for (const message of [
      messages.locationRequired,
      messages.preferredTimeRequired,
      messages.consentRequired,
    ]) {
      expect(screen.getByRole("link", { name: message })).toHaveAttribute("href", expect.stringMatching(/^#rueckruf-/));
    }
    expect(api.count(POST)).toBe(0);
  });

  it("moves focus to the field when an error in the summary is activated", async () => {
    mockApi(formTokenHandler);
    await renderForm();
    submit();

    fireEvent.click(await screen.findByRole("link", { name: messages.phoneRequired }));

    expect(screen.getByLabelText(/Telefonnummer/)).toHaveFocus();
  });

  it("sends the trimmed values with the form token and confirms with the next step", async () => {
    const api = mockApi({ ...formTokenHandler, [POST]: () => jsonResponse(201) });
    await renderForm();
    fillValidForm();

    submit();

    const confirmation = await screen.findByRole("heading", { name: "Danke, wir haben Ihre Rückrufbitte erhalten" });
    await waitFor(() => {
      expect(confirmation).toHaveFocus();
    });
    expect(api.calls.find((call) => call.route === POST)?.body).toEqual({
      name: "Erika Muster",
      phone: "0521 123456",
      location: "33602 Bielefeld",
      preferredTime: "afternoon",
      consent: true,
      website: "",
      formToken: "test-token",
    });
  });

  it("shows field errors from the server at the field", async () => {
    mockApi({
      ...formTokenHandler,
      [POST]: () => jsonResponse(400, { errors: { phone: [messages.phoneInvalid] } }),
    });
    await renderForm();
    fillValidForm();

    submit();

    await waitFor(() => {
      expect(screen.getByLabelText(/Telefonnummer/)).toHaveAccessibleDescription(`Fehler: ${messages.phoneInvalid}`);
    });
    expect(document.activeElement).toHaveTextContent("Bitte prüfen Sie Ihre Angaben");
  });

  it("explains what to do when too many requests were sent", async () => {
    mockApi({ ...formTokenHandler, [POST]: () => jsonResponse(429, { title: "Zu viele Anfragen" }) });
    await renderForm();
    fillValidForm();

    submit();

    expect(await screen.findByText(messages.tooManyRequests)).toBeInTheDocument();
  });

  it("offers the phone number when the request fails for other reasons", async () => {
    mockApi({ ...formTokenHandler, [POST]: () => jsonResponse(500) });
    await renderForm();
    fillValidForm();

    submit();

    expect(await screen.findByText(messages.failed)).toBeInTheDocument();
  });

  it("sends only once when submitted twice in a row", async () => {
    const api = mockApi({ ...formTokenHandler, [POST]: () => jsonResponse(201) });
    await renderForm();
    fillValidForm();

    const form = screen.getByRole("button", { name: "Rückruf anfordern" }).closest("form");
    if (!form) throw new Error("form not found");
    fireEvent.submit(form);
    fireEvent.submit(form);

    await screen.findByRole("heading", { name: "Danke, wir haben Ihre Rückrufbitte erhalten" });
    expect(api.count(POST)).toBe(1);
  });

  it("hides the honeypot from people and assistive technology", async () => {
    mockApi(formTokenHandler);
    await renderForm();

    const honeypot = document.getElementById("website");
    expect(honeypot).toHaveAttribute("tabindex", "-1");
    expect(honeypot?.closest('[aria-hidden="true"]')).not.toBeNull();
    expect(screen.queryByRole("textbox", { name: "Bitte dieses Feld leer lassen" })).not.toBeInTheDocument();
  });
});
