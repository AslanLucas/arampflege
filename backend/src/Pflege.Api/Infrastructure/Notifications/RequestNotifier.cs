using Microsoft.EntityFrameworkCore;
using Pflege.Api.Infrastructure.BackgroundJobs;
using Pflege.Api.Infrastructure.Email;
using Pflege.Api.Infrastructure.Persistence;

namespace Pflege.Api.Infrastructure.Notifications;

/// <summary>
/// Notifies the care service about new requests. Requests may contain health data, so the
/// e-mail only carries the reference number, never the content (backend/AGENTS.md).
/// Unsent notifications stay pending and are retried on the next run.
/// </summary>
public sealed class RequestNotifier(
    AppDbContext db,
    INotificationMailer mailer,
    TimeProvider time,
    ILogger<RequestNotifier> logger) : IPeriodicJob
{
    private const int BatchSize = 50;

    public static TimeSpan Interval => TimeSpan.FromMinutes(1);

    public Task RunAsync(CancellationToken cancellationToken) => NotifyPendingAsync(cancellationToken);

    public async Task<int> NotifyPendingAsync(CancellationToken cancellationToken)
    {
        var sent = 0;

        var callbacks = await db.CallbackRequests
            .Where(request => request.NotifiedAt == null)
            .OrderBy(request => request.CreatedAt)
            .Take(BatchSize)
            .ToListAsync(cancellationToken);
        foreach (var request in callbacks)
        {
            await mailer.SendAsync("Neue Rückrufbitte über die Webseite", Body("Rückrufbitte", request.Id), cancellationToken);
            request.NotifiedAt = time.GetUtcNow();
            await db.SaveChangesAsync(cancellationToken);
            sent++;
        }

        var contacts = await db.ContactRequests
            .Where(request => request.NotifiedAt == null)
            .OrderBy(request => request.CreatedAt)
            .Take(BatchSize)
            .ToListAsync(cancellationToken);
        foreach (var request in contacts)
        {
            await mailer.SendAsync("Neue Kontaktanfrage über die Webseite", Body("Kontaktanfrage", request.Id), cancellationToken);
            request.NotifiedAt = time.GetUtcNow();
            await db.SaveChangesAsync(cancellationToken);
            sent++;
        }

        if (sent > 0)
        {
            logger.LogInformation("Sent {Count} request notifications", sent);
        }
        return sent;
    }

    private static string Body(string kind, Guid id) =>
        $"""
        Über die Webseite ist eine neue {kind} eingegangen.

        Vorgangsnummer: {id}

        Aus Datenschutzgründen enthält diese E-Mail keine Angaben aus der Anfrage.
        """;
}
