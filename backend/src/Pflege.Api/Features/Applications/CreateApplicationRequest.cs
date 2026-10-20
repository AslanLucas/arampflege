using System.ComponentModel.DataAnnotations;
using Pflege.Api.Features.Forms;

namespace Pflege.Api.Features.Applications;

// A class with settable properties rather than a positional record: form binding treats every
// record constructor parameter as required and fails before validation can report German messages.
public sealed class CreateApplicationRequest : IFormSubmission
{
    [Required(ErrorMessage = FormMessages.PositionRequired)]
    [RegularExpression(@"^[a-z0-9-]{1,80}$", ErrorMessage = FormMessages.PositionRequired)]
    public string? Position { get; set; }

    [Required(ErrorMessage = FormMessages.NameRequired)]
    [MaxLength(100, ErrorMessage = FormMessages.NameTooLong)]
    public string? Name { get; set; }

    [Required(ErrorMessage = FormMessages.PhoneRequired)]
    [RegularExpression(FormMessages.PhonePattern, ErrorMessage = FormMessages.PhoneInvalid)]
    public string? Phone { get; set; }

    [OptionalEmailAddress(ErrorMessage = FormMessages.EmailInvalid)]
    [MaxLength(254, ErrorMessage = FormMessages.EmailInvalid)]
    public string? Email { get; set; }

    [Required(ErrorMessage = FormMessages.QualificationRequired)]
    [AllowedValues("pflegefachkraft", "pflegehilfskraft", "ausbildung", "andere", ErrorMessage = FormMessages.QualificationRequired)]
    public string? Qualification { get; set; }

    [MaxLength(1000, ErrorMessage = FormMessages.ApplicationMessageTooLong)]
    public string? Message { get; set; }

    [Range(typeof(bool), "true", "true", ErrorMessage = FormMessages.ConsentRequired)]
    public bool Consent { get; set; }

    public string? FormToken { get; set; }

    public string? Website { get; set; }
}
