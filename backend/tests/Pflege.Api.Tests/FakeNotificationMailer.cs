using System.Collections.Concurrent;
using Pflege.Api.Infrastructure.Email;

namespace Pflege.Api.Tests;

public sealed record SentMail(string Subject, string Body);

public sealed class FakeNotificationMailer : INotificationMailer
{
    public ConcurrentQueue<SentMail> Sent { get; } = new();

    public Task SendAsync(string subject, string body, CancellationToken cancellationToken)
    {
        Sent.Enqueue(new SentMail(subject, body));
        return Task.CompletedTask;
    }
}
