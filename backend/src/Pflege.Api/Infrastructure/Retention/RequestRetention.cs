using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Pflege.Api.Infrastructure.BackgroundJobs;
using Pflege.Api.Infrastructure.Persistence;

namespace Pflege.Api.Infrastructure.Retention;

public sealed class RequestRetention(
    AppDbContext db,
    IOptions<RetentionOptions> options,
    TimeProvider time,
    ILogger<RequestRetention> logger) : IPeriodicJob
{
    public static TimeSpan Interval => TimeSpan.FromHours(6);

    public Task RunAsync(CancellationToken cancellationToken) => PurgeExpiredAsync(cancellationToken);

    public async Task<int> PurgeExpiredAsync(CancellationToken cancellationToken)
    {
        var cutoff = time.GetUtcNow().AddDays(-options.Value.RequestRetentionDays);

        var deleted =
            await db.CallbackRequests.Where(request => request.CreatedAt < cutoff).ExecuteDeleteAsync(cancellationToken) +
            await db.ContactRequests.Where(request => request.CreatedAt < cutoff).ExecuteDeleteAsync(cancellationToken);

        if (deleted > 0)
        {
            logger.LogInformation("Deleted {Count} requests older than {Days} days", deleted, options.Value.RequestRetentionDays);
        }
        return deleted;
    }
}
