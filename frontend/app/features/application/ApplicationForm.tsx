import { useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { Checkbox } from "../../components/Form/Checkbox";
import { ErrorSummary, type SummaryEntry } from "../../components/Form/ErrorSummary";
import { FileField } from "../../components/Form/FileField";
import styles from "../../components/Form/Form.module.css";
import { Honeypot } from "../../components/Form/Honeypot";
import { RadioGroup } from "../../components/Form/RadioGroup";
import { SubmitButton } from "../../components/Form/SubmitButton";
import { TextArea } from "../../components/Form/TextArea";
import { TextField } from "../../components/Form/TextField";
import { qualificationOptions, type Qualification } from "../../content/careers";
import { INITIATIVE, jobBySlug, jobs } from "../../content/jobs";
import { site } from "../../content/site";
import { useHydrated } from "../../hooks/useHydrated";
import { useGetFormTokenQuery } from "../forms/formApi";
import { CONSENT_LABEL, NoScriptNotice, PrivacyNotice } from "../forms/FormNotices";
import { applicationMessages as messages, EMAIL_PATTERN, PHONE_PATTERN, RESUME_ACCEPT, resumeError } from "../forms/messages";
import { toSubmissionErrors, type FieldErrors } from "../forms/submissionErrors";
import { useForm } from "../forms/useForm";
import { useCreateApplicationMutation } from "./applicationApi";

const fieldIds = {
  position: "bewerbung-stelle",
  name: "bewerbung-name",
  phone: "bewerbung-telefon",
  email: "bewerbung-email",
  qualification: "bewerbung-qualifikation",
  resume: "bewerbung-lebenslauf",
  message: "bewerbung-nachricht",
  consent: "bewerbung-einwilligung",
} as const;

type Field = keyof typeof fieldIds;

const positionOptions = [
  ...jobs.map((job) => ({ value: job.slug, label: `${job.title}, ${job.scope}` })),
  { value: INITIATIVE, label: "Initiativbewerbung" },
];

const initialValues = {
  position: "",
  name: "",
  phone: "",
  email: "",
  qualification: "" as Qualification | "",
  message: "",
  consent: false,
  website: "",
};

type Values = typeof initialValues;

function validate(values: Values, resume: File | null): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const phone = values.phone.trim();
  const email = values.email.trim();

  if (!name) errors.name = messages.nameRequired;
  else if (name.length > 100) errors.name = messages.nameTooLong;
  if (!phone) errors.phone = messages.phoneRequired;
  else if (!PHONE_PATTERN.test(phone)) errors.phone = messages.phoneInvalid;
  if (email && !EMAIL_PATTERN.test(email)) errors.email = messages.emailInvalid;
  if (!values.qualification) errors.qualification = messages.qualificationRequired;
  if (values.message.trim().length > 1000) errors.message = messages.messageTooLong;
  const fileError = resumeError(resume);
  if (fileError) errors.resume = fileError;
  if (!values.consent) errors.consent = messages.consentRequired;

  return errors;
}

export function ApplicationForm() {
  const hydrated = useHydrated();
  const [searchParams] = useSearchParams();
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
  const [resume, setResume] = useState<File | null>(null);
  const { data: token, refetch: refetchToken } = useGetFormTokenQuery(undefined);
  const [createApplication, { isLoading }] = useCreateApplicationMutation();
  const inFlight = useRef(false);

  // The prerendered page has no query string, so the link's preselection applies after hydration.
  const linkedJob = hydrated ? jobBySlug(searchParams.get("stelle")) : undefined;
  const position = values.position !== "" ? values.position : (linkedJob?.slug ?? INITIATIVE);

  async function submit() {
    if (inFlight.current) {
      return;
    }
    const errors = validate(values, resume);
    if (Object.keys(errors).length > 0) {
      showErrors(errors);
      return;
    }
    if (!token) {
      showErrors({}, messages.notReady);
      void refetchToken();
      return;
    }

    const body = new FormData();
    body.append("position", position);
    body.append("name", values.name.trim());
    body.append("phone", values.phone.trim());
    body.append("email", values.email.trim());
    body.append("qualification", values.qualification);
    body.append("message", values.message.trim());
    body.append("consent", String(values.consent));
    body.append("website", values.website);
    body.append("formToken", token.token);
    if (resume) {
      body.append("resume", resume);
    }

    inFlight.current = true;
    clearErrors();
    try {
      await createApplication(body).unwrap();
      markSubmitted();
    } catch (error) {
      const { fields, form: formMessage } = toSubmissionErrors(error, messages);
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
          Danke, wir haben deine Bewerbung erhalten
        </h2>
        <p>Wir melden uns bei dir innerhalb von [[INHALT FEHLT: Frist für Rückmeldung auf Bewerbungen]].</p>
        <p>
          Fragen beantworten wir dir gern am Telefon: <a href={site.phone.href}>{site.phone.display}</a>
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
      encType="multipart/form-data"
      noValidate
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
    >
      <NoScriptNotice address="du" />
      <ErrorSummary entries={summary} ref={summaryRef} />

      {jobs.length > 0 ? (
        <RadioGroup
          id={fieldIds.position}
          name="position"
          legend="Auf welche Stelle bewirbst du dich?"
          requirement="required"
          options={positionOptions}
          value={position}
          error={fieldErrors.position}
          onChange={(value) => {
            setValue("position", value);
          }}
        />
      ) : (
        <p id={fieldIds.position}>Du bewirbst dich ohne bestimmte Stellenanzeige (Initiativbewerbung).</p>
      )}

      <TextField
        id={fieldIds.name}
        name="name"
        label="Dein Name"
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
        hint="Wir melden uns zuerst telefonisch bei dir."
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
        requirement="optional"
        type="email"
        autoComplete="email"
        maxLength={254}
        value={values.email}
        error={fieldErrors.email}
        onChange={(value) => {
          setValue("email", value);
        }}
      />
      <RadioGroup
        id={fieldIds.qualification}
        name="qualification"
        legend="Deine Qualifikation"
        requirement="required"
        options={qualificationOptions}
        value={values.qualification}
        error={fieldErrors.qualification}
        onChange={(value) => {
          setValue("qualification", value);
        }}
      />
      <FileField
        id={fieldIds.resume}
        name="resume"
        label="Lebenslauf"
        requirement="optional"
        accept={RESUME_ACCEPT}
        hint={"PDF, JPG oder PNG, höchstens 10\u00a0MB. Ein Foto vom Lebenslauf auf Papier genügt."}
        file={resume}
        error={fieldErrors.resume}
        onChange={setResume}
      />
      <TextArea
        id={fieldIds.message}
        name="message"
        label="Nachricht"
        requirement="optional"
        hint="Zum Beispiel, ab wann du anfangen kannst."
        maxLength={1000}
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

      <PrivacyNotice address="du" />
      <SubmitButton label="Bewerbung senden" busy={isLoading} ready={hydrated} />
    </form>
  );
}
