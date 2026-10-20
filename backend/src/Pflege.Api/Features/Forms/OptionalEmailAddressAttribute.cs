using System.ComponentModel.DataAnnotations;

namespace Pflege.Api.Features.Forms;

/// <summary>
/// Like <see cref="EmailAddressAttribute"/>, but an empty field counts as "not given".
/// Browsers send empty optional inputs as "", which EmailAddressAttribute rejects.
/// </summary>
[AttributeUsage(AttributeTargets.Property | AttributeTargets.Parameter)]
public sealed class OptionalEmailAddressAttribute : ValidationAttribute
{
    private static readonly EmailAddressAttribute Inner = new();

    public override bool IsValid(object? value) =>
        value is not string text || string.IsNullOrWhiteSpace(text) || Inner.IsValid(text.Trim());
}
