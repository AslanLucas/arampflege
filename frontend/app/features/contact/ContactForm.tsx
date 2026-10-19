import { useRef } from "react";
import { Checkbox } from "../../components/Form/Checkbox";
import { ErrorSummary, type SummaryEntry } from "../../components/Form/ErrorSummary";
import styles from "../../components/Form/Form.module.css";
import { Honeypot } from "../../components/Form/Honeypot";
import { SubmitButton } from "../../components/Form/SubmitButton";
import { TextArea } from "../../components/Form/TextArea";
import { TextField } from "../../components/Form/TextField";
import { site } from "../../content/site";
import { useHydrated } from "../../hooks/useHydrated";
import { useGetFormTokenQuery } from "../forms/formApi";
import { CONSENT_LABEL, NoScriptNotice, PrivacyNotice } from "../forms/FormNotices";
import { EMAIL_PATTERN, messages, PHONE_PATTERN } from "../forms/messages";
import { toSubmissionErrors, type FieldErrors } from "../forms/submissionErrors";
import { useForm } from "../forms/useForm";
import { useCreateContactRequestMutation } from "./contactApi";

const fieldIds = {
  name: "kontakt-name",
  phone: "kontakt-telefon",
  email: "kontakt-email",
  message: "kontakt-nachricht",
  consent: "kontakt-einwilligung",
} as const;

type Field = keyof typeof fieldIds;

const initialValues = {
  name: "",
  phone: "",
  email: "",
  message: "",
  consent: false,
  website: "",
};

type Values = typeof initialValues;

function validate(values: Values): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = messages.nameRequired;
  else if (name.length > 100) errors.name = messages.nameTooLong;
  if (!phone && !email) errors.phone = messages.phoneOrEmailRequired;
  if (phone && !PHONE_PATTERN.test(phone)) errors.phone = messages.phoneInvalid;
  if (email && !EMAIL_PATTERN.test(email)) errors.email = messages.emailInvalid;
  if (!message) errors.message = messages.messageRequired;
  else if (message.length > 2000) errors.message = messages.messageTooLong;
  if (!values.consent) errors.consent = messages.consentRequired;

  return errors;
}

export function ContactForm() {
  const hydrated = useHydrated();
  const {
    values,
    setValue,
    fieldErrors,
    formError,
    showErrors,
    clearErrors,
    submitted,
    markSubmitted,
    summaryRef,
    confirmationRef,
  } = useForm(initialValues);
  const { data: token, refetch: refetchToken } = useGetFormTokenQuery(undefined);
  const [createContactRequest, { isLoading }] = useCreateContactRequestMutation();
  const inFlight = useRef(false);

  async function submit() {
    if (inFlight.current) {
      return;
    }
    const errors = validate(values);
    if (Object.keys(errors).length > 0) {
      showErrors(errors);
      return;
    }
    if (!token) {
      showErrors({}, messages.notReady);
      void refetchToken();
      return;
    }

    inFlight.current = true;
    clearErrors();
    try {
      await createContactRequest({
        name: values.name.trim(),
        phone: values.phone.trim(),
        email: values.email.trim(),
        message: values.message.trim(),
        consent: values.consent,
        website: values.website,
        formToken: token.token,
      }).unwrap();
      markSubmitted();
    } catch (error) {
      const { fields, form: formMessage } = toSubmissionErrors(error);
      showErrors(fields, formMessage);
      void refetchToken();
    } finally {
      inFlight.current = false;
    }
  }

  if (submitted) {
    return (
      <div className={styles.confirmation}>
        <h2 ref={confirmationRef} tabIndex={-1}>
          Danke, wir haben Ihre Nachricht erhalten
        </h2>
        <p>Wir melden uns innerhalb von [[INHALT FEHLT: Antwortfrist]].</p>
        <p>
          Wenn es dringend ist, rufen Sie uns direkt an: <a href={site.phone.href}>{site.phone.display}</a>
        </p>
      </div>
    );
  }

  const summary: SummaryEntry[] = [
    ...(formError ? [{ message: formError }] : []),
    ...(Object.keys(fieldIds) as Field[]).flatMap((field) => {
      const message = fieldErrors[field];
      return message ? [{ fieldId: fieldIds[field], message }] : [];
    }),
  ];

  return (
    <form
      method="post"
      noValidate
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <NoScriptNotice />
      <ErrorSummary entries={summary} ref={summaryRef} />

      <TextField
        id={fieldIds.name}
        name="name"
        label="Ihr Name"
        requirement="required"
        autoComplete="name"
        maxLength={100}
        value={values.name}
        error={fieldErrors.name}
        onChange={(value) => {
          setValue("name", value);
        }}
      />
      <TextField
        id={fieldIds.phone}
        name="phone"
        label="Telefonnummer"
        requirement="none"
        hint="Telefonnummer oder E-Mail-Adresse genügt."
        type="tel"
        autoComplete="tel"
        maxLength={30}
        value={values.phone}
        error={fieldErrors.phone}
        onChange={(value) => {
          setValue("phone", value);
        }}
      />
      <TextField
        id={fieldIds.email}
        name="email"
        label="E-Mail-Adresse"
        requirement="none"
        type="email"
        autoComplete="email"
        maxLength={254}
        value={values.email}
        error={fieldErrors.email}
        onChange={(value) => {
          setValue("email", value);
        }}
      />
      <TextArea
        id={fieldIds.message}
        name="message"
        label="Ihre Nachricht"
        requirement="required"
        hint="Bitte schreiben Sie keine ausführlichen Angaben zu Diagnosen. Einzelheiten besprechen wir persönlich mit Ihnen."
        maxLength={2000}
        value={values.message}
        error={fieldErrors.message}
        onChange={(value) => {
          setValue("message", value);
        }}
      />
      <Checkbox
        id={fieldIds.consent}
        name="consent"
        checked={values.consent}
        error={fieldErrors.consent}
        onChange={(checked) => {
          setValue("consent", checked);
        }}
      >
        {CONSENT_LABEL} (Pflichtangabe)
      </Checkbox>
      <Honeypot
        value={values.website}
        onChange={(value) => {
          setValue("website", value);
        }}
      />

      <PrivacyNotice />
      <SubmitButton label="Nachricht senden" busy={isLoading} ready={hydrated} />
    </form>
  );
}
