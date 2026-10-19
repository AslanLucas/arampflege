import { messages } from "./messages";

export type FieldErrors = Partial<Record<string, string>>;

export type SubmissionErrors = {
  fields: FieldErrors;
  /** Error that belongs to the whole form, not to a single field. */
  form?: string;
};

type ValidationProblem = {
  errors?: Record<string, string[] | undefined>;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

/** Maps an RTK Query error (ProblemDetails from the API) to field and form errors. */
export function toSubmissionErrors(error: unknown): SubmissionErrors {
  if (!isRecord(error)) {
    return { fields: {}, form: messages.failed };
  }

  if (error.status === 429) {
    return { fields: {}, form: messages.tooManyRequests };
  }

  if (error.status === 400 && isRecord(error.data)) {
    const { errors = {} } = error.data as ValidationProblem;
    const fields: FieldErrors = {};
    let form: string | undefined;
    for (const [key, values] of Object.entries(errors)) {
      const message = values?.[0];
      if (!message) {
        continue;
      }
      if (key === "form") {
        form = message;
      } else {
        fields[key] = message;
      }
    }
    if (Object.keys(fields).length > 0 || form) {
      return { fields, form };
    }
  }

  return { fields: {}, form: messages.failed };
}
