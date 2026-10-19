namespace Pflege.Api.Infrastructure.Email;

public interface INotificationMailer
{
    Task SendAsync(string subject, string body, CancellationToken cancellationToken);
}
