using System.ComponentModel.DataAnnotations;
using MailKit.Security;

namespace Pflege.Api.Infrastructure.Email;

public sealed class SmtpOptions
{
    public const string SectionName = "Smtp";

    [Required]
    public string Host { get; set; } = "";

    [Range(1, 65535)]
    public int Port { get; set; } = 587;

    public SecureSocketOptions Security { get; set; } = SecureSocketOptions.StartTls;

    public string? UserName { get; set; }

    public string? Password { get; set; }

    [Required, EmailAddress]
    public string From { get; set; } = "";

    /// <summary>Mailbox of the care service that receives the notifications.</summary>
    [Required, EmailAddress]
    public string To { get; set; } = "";
}
