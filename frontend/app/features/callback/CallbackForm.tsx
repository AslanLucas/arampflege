import { useRef } from "react";
import { Checkbox } from "../../components/Form/Checkbox";
import { ErrorSummary, type SummaryEntry } from "../../components/Form/ErrorSummary";
import styles from "../../components/Form/Form.module.css";
import { Honeypot } from "../../components/Form/Honeypot";
import { RadioGroup } from "../../components/Form/RadioGroup";
import { SubmitButton } from "../../components/Form/SubmitButton";
import { TextField } from "../../components/Form/TextField";
import { site } from "../../content/site";
import { useHydrated } from "../../hooks/useHydrated";
import { useGetFormTokenQuery } from "../forms/formApi";
import { CONSENT_LABEL, NoScriptNotice, PrivacyNotice } from "../forms/FormNotices";
import { messages, PHONE_PATTERN } from "../forms/messages";
import { toSubmissionErrors, type FieldErrors } from "../forms/submissionErrors";
import { useForm } from "../forms/useForm";
import { useCreateCallbackRequestMutation, type PreferredTime } from "./callbackApi";

const fieldIds = {
  name: "rueckruf-name",
  phone: "rueckruf-telefon",
  location: "rueckruf-ort",
  preferredTime: "rueckruf-zeit",
  consent: "rueckruf-einwilligung",
} as const;

type Field = keyof typeof fieldIds;

const preferredTimeOptions: { value: PreferredTime; label: string }[] = [
  { value: "morning", label: "Vormittags" },
  { value: "afternoon", label: "Nachmittags" },
  { value: "anytime", label: "Zu jeder Zeit" },
];

const initialValues = {
  name: "",
  phone: "",
  location: "",
  preferredTime: "" as PreferredTime | "",
  consent: false,
  website: "",
};

type Values = typeof initialValues;

function validate(values: Values): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();
  const location = values.location.trim();

  if (!name) errors.name = messages.nameRequired;
  else if (name.length > 100) errors.name = messages.nameTooLong;
  if (!phone) errors.phone = messages.phoneRequired;
  else if (!PHONE_PATTERN.test(phone)) errors.phone = messages.phoneInvalid;
  if (!location) errors.location = messages.locationRequired;
  else if (location.length > 100) errors.location = messages.locationTooLong;
  if (!values.preferredTime) errors.preferredTime = messages.preferredTimeRequired;
  if (!values.consent) errors.consent = messages.consentRequired;

  return errors;
}

export function CallbackForm() {
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
  const [createCallbackRequest, { isLoading }] = useCreateCallbackRequestMutation();
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
      await createCallbackRequest({
        name: values.name.trim(),
        phone: values.phone.trim(),
        location: values.location.trim(),
        preferredTime: values.preferredTime,
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
          Danke, wir haben Ihre Rückrufbitte erhalten
        </h2>
        <p>Wir rufen Sie innerhalb von [[INHALT FEHLT: Rückruffrist]] zurück.</p>
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
        requirement="required"
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
        id={fieldIds.location}
        name="location"
        label="Postleitzahl oder Ort"
        requirement="required"
        hint="Damit wir prüfen können, ob Sie in unserem Einsatzgebiet wohnen."
        autoComplete="postal-code"
        maxLength={100}
        value={values.location}
        error={fieldErrors.location}
        onChange={(value) => {
          setValue("location", value);
        }}
      />
      <RadioGroup
        id={fieldIds.preferredTime}
        name="preferredTime"
        legend="Wann dürfen wir Sie anrufen?"
        requirement="required"
        options={preferredTimeOptions}
        value={values.preferredTime}
        error={fieldErrors.preferredTime}
        onChange={(value) => {
          setValue("preferredTime", value);
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
      <SubmitButton label="Rückruf anfordern" busy={isLoading} ready={hydrated} />
    </form>
  );
}
