using System.ComponentModel.DataAnnotations;

namespace Pflege.Api.Infrastructure.Retention;

public sealed class RetentionOptions
{
    public const string SectionName = "Retention";

    /// <summary>
    /// Days after which contact and callback requests are deleted. Has no default on purpose:
    /// the period must come from the client (docs/OFFENE-PUNKTE.md), so startup fails without it.
    /// </summary>
    [Range(1, 3650)]
    public int RequestRetentionDays { get; set; }

    /// <summary>
    /// Days after which job applications and their documents are deleted. Counted from receipt
    /// until there is a way to close an application; also has no default on purpose.
    /// </summary>
    [Range(1, 3650)]
    public int ApplicationRetentionDays { get; set; }
}
