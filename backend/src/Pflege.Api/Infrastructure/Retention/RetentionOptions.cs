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
}
