namespace Pflege.Api.Features.Forms;

public interface IFormSubmission
{
    string? FormToken { get; }

    /// <summary>Honeypot field; hidden from people, filled in by bots.</summary>
    string? Website { get; }
}
