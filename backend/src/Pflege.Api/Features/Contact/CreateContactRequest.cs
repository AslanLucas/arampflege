using System.ComponentModel.DataAnnotations;
using Pflege.Api.Features.Forms;

namespace Pflege.Api.Features.Contact;

public sealed record CreateContactRequest(
    [Required(ErrorMessage = FormMessages.NameRequired)]
    [MaxLength(100, ErrorMessage = FormMessages.NameTooLong)]
    string? Name,
    [RegularExpression(FormMessages.PhonePattern, ErrorMessage = FormMessages.PhoneInvalid)]
    string? Phone,
    [OptionalEmailAddress(ErrorMessage = FormMessages.EmailInvalid)]
    [MaxLength(254, ErrorMessage = FormMessages.EmailInvalid)]
    string? Email,
    // Optional; the values mirror the service slugs in frontend/app/content/services.ts.
    [AllowedValues(
        null,
        "",
        "grundpflege",
        "behandlungspflege",
        "hauswirtschaft",
        "betreuung-und-entlastung",
        "verhinderungspflege",
        "pflegeberatung",
        "sonstiges",
        ErrorMessage = FormMessages.TopicInvalid)]
    string? Topic,
    [Required(ErrorMessage = FormMessages.MessageRequired)]
    [MaxLength(2000, ErrorMessage = FormMessages.MessageTooLong)]
    string? Message,
    [Range(typeof(bool), "true", "true", ErrorMessage = FormMessages.ConsentRequired)]
    bool Consent,
    string? FormToken,
    string? Website) : IFormSubmission, IValidatableObject
{
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (string.IsNullOrWhiteSpace(Phone) && string.IsNullOrWhiteSpace(Email))
        {
            yield return new ValidationResult(FormMessages.PhoneOrEmailRequired, [nameof(Phone)]);
        }
    }
}
