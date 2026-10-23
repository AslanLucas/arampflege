using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Pflege.Api.Infrastructure.BackgroundJobs;
using Pflege.Api.Infrastructure.Persistence;
using Pflege.Api.Infrastructure.Storage;

namespace Pflege.Api.Infrastructure.Retention;

public sealed class RequestRetention(
    AppDbContext db,
    EncryptedFileStore files,
    IOptions<RetentionOptions> options,
    TimeProvider time,
    ILogger<RequestRetention> logger) : IPeriodicJob
{
    public static TimeSpan Interval => TimeSpan.FromHours(6);

    public Task RunAsync(CancellationToken cancellationToken) => PurgeExpiredAsync(cancellationToken);

    public async Task<int> PurgeExpiredAsync(CancellationToken cancellationToken)
    {
        var settings = options.Value;
        var now = time.GetUtcNow();
        var requestCutoff = now.AddDays(-settings.RequestRetentionDays);
        var applicationCutoff = now.AddDays(-settings.ApplicationRetentionDays);

        var deleted =
            await db.ContactRequests.Where(request => request.CreatedAt < requestCutoff).ExecuteDeleteAsync(cancellationToken);

        // Files first: a row without its file is harmless, a file without its row would be forgotten.
        var expiredFiles = await db.JobApplications
            .Where(application => application.CreatedAt < applicationCutoff && application.ResumeFileId != null)
            .Select(application => application.ResumeFileId!.Value)
            .ToListAsync(cancellationToken);
        foreach (var fileId in expiredFiles)
        {
            files.Delete(fileId);
        }
        deleted += await db.JobApplications
            .Where(application => application.CreatedAt < applicationCutoff)
            .ExecuteDeleteAsync(cancellationToken);

        if (deleted > 0)
        {
            logger.LogInformation("Deleted {Count} expired requests and applications", deleted);
        }
        return deleted;
    }
}
