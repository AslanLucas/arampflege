using System.ComponentModel.DataAnnotations;
using Pflege.Api.Features.Forms;

namespace Pflege.Api.Features.Contact;

public sealed record CreateContactRequest(
    [Required(ErrorMessage = FormMessages.NameRequired)]
    [MaxLength(100, ErrorMessage = FormMessages.NameTooLong)]
    string? Name,
    [RegularExpression(FormMessages.PhonePattern, ErrorMessage = FormMessages.PhoneInvalid)]
    string? Phone,
    [EmailAddress(ErrorMessage = FormMessages.EmailInvalid)]
    [MaxLength(254, ErrorMessage = FormMessages.EmailInvalid)]
    string? Email,
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
