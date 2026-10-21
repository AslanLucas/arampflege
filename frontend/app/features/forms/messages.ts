import { site } from "../../content/site";

// Same wording as the backend (backend/src/Pflege.Api/Features/Forms/FormMessages.cs).
export const messages = {
  nameRequired: "Bitte geben Sie Ihren Namen an.",
  nameTooLong: "Bitte kürzen Sie Ihren Namen auf höchstens 100 Zeichen.",
  phoneRequired: "Bitte geben Sie Ihre Telefonnummer an.",
  phoneInvalid: "Bitte geben Sie eine Telefonnummer nur mit Ziffern an, zum Beispiel 0521\u00a0123456.",
  phoneOrEmailRequired: "Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.",
  emailInvalid: "Bitte geben Sie eine vollständige E-Mail-Adresse an, zum Beispiel name@beispiel.de.",
  locationRequired: "Bitte geben Sie Ihre Postleitzahl oder Ihren Ort an.",
  locationTooLong: "Bitte kürzen Sie die Angabe auf höchstens 100 Zeichen.",
  preferredTimeRequired: "Bitte wählen Sie, wann wir Sie anrufen dürfen.",
  topicInvalid: "Bitte wählen Sie ein Thema aus der Liste.",
  messageRequired: "Bitte schreiben Sie uns kurz, worum es geht.",
  messageTooLong: "Bitte kürzen Sie Ihre Nachricht auf höchstens 2000 Zeichen.",
  positionRequired: "Bitte wählen Sie eine Stelle oder „Initiativbewerbung“.",
  qualificationRequired: "Bitte wählen Sie Ihre Qualifikation.",
  applicationMessageTooLong: "Bitte kürzen Sie Ihre Nachricht auf höchstens 1000 Zeichen.",
  resumeTooLarge: "Die Datei ist zu groß. Bitte wählen Sie eine Datei mit höchstens 10\u00a0MB.",
  resumeType: "Bitte laden Sie Ihren Lebenslauf als PDF, JPG oder PNG hoch.",
  consentRequired: "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.",
  notReady: "Das Formular wird noch geladen. Bitte senden Sie es in einem Moment noch einmal.",
  tooManyRequests: `Sie haben in kurzer Zeit mehrere Anfragen gesendet. Bitte versuchen Sie es später noch einmal oder rufen Sie uns an: ${site.phone.display}.`,
  failed: `Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es noch einmal oder rufen Sie uns an: ${site.phone.display}.`,
};

export const PHONE_PATTERN = /^\+?[0-9 ()/-]{6,30}$/;
// Deliberately simple; the backend has the final say.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const RESUME_MAX_BYTES = 10 * 1024 * 1024;
export const RESUME_ACCEPT = ".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png";

/** Comfort check only; the API verifies the real type from the file content. */
export function resumeError(file: File | null): string | undefined {
  if (!file) {
    return undefined;
  }
  if (file.size > RESUME_MAX_BYTES) {
    return messages.resumeTooLarge;
  }
  const knownType = ["application/pdf", "image/jpeg", "image/png"].includes(file.type);
  const knownExtension = /\.(pdf|jpe?g|png)$/i.test(file.name);
  return knownType || knownExtension ? undefined : messages.resumeType;
}
