import { site } from "../../content/site";

// Same wording as the backend (backend/src/Pflege.Api/Features/Forms/FormMessages.cs).
export const messages = {
  nameRequired: "Bitte geben Sie Ihren Namen an.",
  nameTooLong: "Bitte kürzen Sie Ihren Namen auf höchstens 100 Zeichen.",
  phoneRequired: "Bitte geben Sie Ihre Telefonnummer an.",
  phoneInvalid: "Bitte geben Sie eine Telefonnummer nur mit Ziffern an, zum Beispiel 0521 123456.",
  phoneOrEmailRequired: "Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.",
  emailInvalid: "Bitte geben Sie eine vollständige E-Mail-Adresse an, zum Beispiel name@beispiel.de.",
  locationRequired: "Bitte geben Sie Ihre Postleitzahl oder Ihren Ort an.",
  locationTooLong: "Bitte kürzen Sie die Angabe auf höchstens 100 Zeichen.",
  preferredTimeRequired: "Bitte wählen Sie, wann wir Sie anrufen dürfen.",
  messageRequired: "Bitte schreiben Sie uns kurz, worum es geht.",
  messageTooLong: "Bitte kürzen Sie Ihre Nachricht auf höchstens 2000 Zeichen.",
  consentRequired: "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.",
  notReady: "Das Formular wird noch geladen. Bitte senden Sie es in einem Moment noch einmal.",
  tooManyRequests: `Sie haben in kurzer Zeit mehrere Anfragen gesendet. Bitte versuchen Sie es später noch einmal oder rufen Sie uns an: ${site.phone.display}.`,
  failed: `Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es noch einmal oder rufen Sie uns an: ${site.phone.display}.`,
};

export const PHONE_PATTERN = /^\+?[0-9 ()/-]{6,30}$/;
// Deliberately simple; the backend has the final say.
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
