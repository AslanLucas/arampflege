using System.ComponentModel.DataAnnotations;
using Pflege.Api.Features.Forms;

namespace Pflege.Api.Features.Applications;

// A class with settable properties rather than a positional record: form binding treats every
// record constructor parameter as required and fails before validation can report German messages.
public sealed class CreateApplicationRequest : IFormSubmission
{
    [Required(ErrorMessage = ApplicationMessages.PositionRequired)]
    [RegularExpression(@"^[a-z0-9-]{1,80}$", ErrorMessage = ApplicationMessages.PositionRequired)]
    public string? Position { get; set; }

    [Required(ErrorMessage = ApplicationMessages.NameRequired)]
    [MaxLength(100, ErrorMessage = ApplicationMessages.NameTooLong)]
    public string? Name { get; set; }

    [Required(ErrorMessage = ApplicationMessages.PhoneRequired)]
    [RegularExpression(FormMessages.PhonePattern, ErrorMessage = ApplicationMessages.PhoneInvalid)]
    public string? Phone { get; set; }

    [OptionalEmailAddress(ErrorMessage = ApplicationMessages.EmailInvalid)]
    [MaxLength(254, ErrorMessage = ApplicationMessages.EmailInvalid)]
    public string? Email { get; set; }

    [Required(ErrorMessage = ApplicationMessages.QualificationRequired)]
    [AllowedValues("pflegefachkraft", "pflegehilfskraft", "hauswirtschaft-betreuung", "ausbildung", "andere", ErrorMessage = ApplicationMessages.QualificationRequired)]
    public string? Qualification { get; set; }

    [MaxLength(1000, ErrorMessage = ApplicationMessages.MessageTooLong)]
    public string? Message { get; set; }

    [Range(typeof(bool), "true", "true", ErrorMessage = ApplicationMessages.ConsentRequired)]
    public bool Consent { get; set; }

    public string? FormToken { get; set; }

    public string? Website { get; set; }
}
