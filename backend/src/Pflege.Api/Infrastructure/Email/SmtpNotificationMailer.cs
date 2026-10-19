using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;

namespace Pflege.Api.Infrastructure.Email;

public sealed class SmtpNotificationMailer(IOptions<SmtpOptions> options) : INotificationMailer
{
    public async Task SendAsync(string subject, string body, CancellationToken cancellationToken)
    {
        var settings = options.Value;
        using var message = new MimeMessage();
        message.From.Add(MailboxAddress.Parse(settings.From));
        message.To.Add(MailboxAddress.Parse(settings.To));
        message.Subject = subject;
        message.Body = new TextPart("plain") { Text = body };

        using var client = new SmtpClient();
        await client.ConnectAsync(settings.Host, settings.Port, settings.Security, cancellationToken);
        if (!string.IsNullOrEmpty(settings.UserName))
        {
            await client.AuthenticateAsync(settings.UserName, settings.Password ?? "", cancellationToken);
        }
        await client.SendAsync(message, cancellationToken);
        await client.DisconnectAsync(true, cancellationToken);
    }
}
