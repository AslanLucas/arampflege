namespace Pflege.Api.Features.Forms;

/// <summary>User-facing validation messages, worded according to docs/CONTENT.md.</summary>
public static class FormMessages
{
    public const string NameRequired = "Bitte geben Sie Ihren Namen an.";
    public const string NameTooLong = "Bitte kürzen Sie Ihren Namen auf höchstens 100 Zeichen.";
    public const string PhoneRequired = "Bitte geben Sie Ihre Telefonnummer an.";
    public const string PhoneInvalid = "Bitte geben Sie eine Telefonnummer nur mit Ziffern an, zum Beispiel 0521 123456.";
    public const string PhoneOrEmailRequired = "Bitte geben Sie eine Telefonnummer oder eine E-Mail-Adresse an.";
    public const string EmailInvalid = "Bitte geben Sie eine vollständige E-Mail-Adresse an, zum Beispiel name@beispiel.de.";
    public const string LocationRequired = "Bitte geben Sie Ihre Postleitzahl oder Ihren Ort an.";
    public const string LocationTooLong = "Bitte kürzen Sie die Angabe auf höchstens 100 Zeichen.";
    public const string PreferredTimeRequired = "Bitte wählen Sie, wann wir Sie anrufen dürfen.";
    public const string MessageRequired = "Bitte schreiben Sie uns kurz, worum es geht.";
    public const string MessageTooLong = "Bitte kürzen Sie Ihre Nachricht auf höchstens 2000 Zeichen.";
    public const string PositionRequired = "Bitte wählen Sie eine Stelle oder „Initiativbewerbung“.";
    public const string QualificationRequired = "Bitte wählen Sie Ihre Qualifikation.";
    public const string ApplicationMessageTooLong = "Bitte kürzen Sie Ihre Nachricht auf höchstens 1000 Zeichen.";
    public const string ResumeTooLarge = "Die Datei ist zu groß. Bitte wählen Sie eine Datei mit höchstens 10 MB.";
    public const string ResumeType = "Bitte laden Sie Ihren Lebenslauf als PDF, JPG oder PNG hoch.";
    public const string ConsentRequired = "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu.";
    public const string FormExpired = "Das Formular ist abgelaufen. Bitte laden Sie die Seite neu und senden Sie es noch einmal.";

    public const string PhonePattern = @"^\+?[0-9 ()/\-]{6,30}$";
}
