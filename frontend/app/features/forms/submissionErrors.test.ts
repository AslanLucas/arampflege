import { describe, expect, it } from "vitest";
import { messages } from "./messages";
import { toSubmissionErrors } from "./submissionErrors";

describe("toSubmissionErrors", () => {
  it("maps the first message of each field and keeps form errors apart", () => {
    expect(
      toSubmissionErrors({
        status: 400,
        data: { errors: { phone: ["A", "B"], form: ["Formular abgelaufen"] } },
      }),
    ).toEqual({ fields: { phone: "A" }, form: "Formular abgelaufen" });
  });

  it("explains rate limiting", () => {
    expect(toSubmissionErrors({ status: 429, data: {} })).toEqual({ fields: {}, form: messages.tooManyRequests });
  });

  it("falls back to the phone number for network and server errors", () => {
    expect(toSubmissionErrors({ status: "FETCH_ERROR", error: "offline" }).form).toBe(messages.failed);
    expect(toSubmissionErrors({ status: 500, data: null }).form).toBe(messages.failed);
    expect(toSubmissionErrors({ status: 400, data: { errors: {} } }).form).toBe(messages.failed);
  });
});
