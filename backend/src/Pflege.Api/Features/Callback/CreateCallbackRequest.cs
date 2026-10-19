using System.ComponentModel.DataAnnotations;
using Pflege.Api.Features.Forms;

namespace Pflege.Api.Features.Callback;

public sealed record CreateCallbackRequest(
    [Required(ErrorMessage = FormMessages.NameRequired)]
    [MaxLength(100, ErrorMessage = FormMessages.NameTooLong)]
    string? Name,
    [Required(ErrorMessage = FormMessages.PhoneRequired)]
    [RegularExpression(FormMessages.PhonePattern, ErrorMessage = FormMessages.PhoneInvalid)]
    string? Phone,
    [Required(ErrorMessage = FormMessages.LocationRequired)]
    [MaxLength(100, ErrorMessage = FormMessages.LocationTooLong)]
    string? Location,
    [Required(ErrorMessage = FormMessages.PreferredTimeRequired)]
    [AllowedValues("morning", "afternoon", "anytime", ErrorMessage = FormMessages.PreferredTimeRequired)]
    string? PreferredTime,
    [Range(typeof(bool), "true", "true", ErrorMessage = FormMessages.ConsentRequired)]
    bool Consent,
    string? FormToken,
    string? Website) : IFormSubmission;
