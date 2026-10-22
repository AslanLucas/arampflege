namespace Pflege.Api.Features.Applications;

/// <summary>
/// Error messages for the short application. The careers pages address applicants informally
/// ("du", docs/CONTENT.md); the same wording is in frontend/app/features/forms/messages.ts.
/// </summary>
public static class ApplicationMessages
{
    public const string PositionRequired = "Bitte wähle eine Stelle oder „Initiativbewerbung“.";
    public const string NameRequired = "Bitte gib deinen Namen an.";
    public const string NameTooLong = "Bitte kürze deinen Namen auf höchstens 100 Zeichen.";
    public const string PhoneRequired = "Bitte gib deine Telefonnummer an.";
    public const string PhoneInvalid = "Bitte gib eine Telefonnummer nur mit Ziffern an, zum Beispiel 0521 123456.";
    public const string EmailInvalid = "Bitte gib eine vollständige E-Mail-Adresse an, zum Beispiel name@beispiel.de.";
    public const string QualificationRequired = "Bitte wähle deine Qualifikation.";
    public const string MessageTooLong = "Bitte kürze deine Nachricht auf höchstens 1000 Zeichen.";
    public const string ResumeTooLarge = "Die Datei ist zu groß. Bitte wähle eine Datei mit höchstens 10 MB.";
    public const string ResumeType = "Bitte lade deinen Lebenslauf als PDF, JPG oder PNG hoch.";
    public const string ConsentRequired = "Bitte stimme der Verarbeitung deiner Angaben zu.";
    public const string FormExpired = "Das Formular ist abgelaufen. Bitte lade die Seite neu und sende es noch einmal.";
}
