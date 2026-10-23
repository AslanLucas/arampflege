using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pflege.Api.Features.Applications;
using Pflege.Api.Features.Contact;
using Pflege.Api.Infrastructure.Persistence;
using Pflege.Api.Infrastructure.Retention;
using Pflege.Api.Infrastructure.Storage;

namespace Pflege.Api.Tests;

[Collection(ApiCollection.Name)]
public sealed class RequestRetentionTests(ApiFactory factory)
{
    private const int RetentionDays = 30;

    [Fact]
    public async Task Deletes_requests_older_than_the_retention_period_and_keeps_newer_ones()
    {
        var cancellationToken = TestContext.Current.CancellationToken;
        var now = factory.Time.GetUtcNow();
        var expired = now.AddDays(-RetentionDays).AddMinutes(-1);
        var kept = now.AddDays(-RetentionDays).AddMinutes(1);
        var marker = Guid.NewGuid().ToString();

        await using (var scope = factory.Services.CreateAsyncScope())
        {
            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.ContactRequests.AddRange(Contact($"expired {marker}", expired), Contact($"kept {marker}", kept));
            await db.SaveChangesAsync(cancellationToken);
        }

        await using (var scope = factory.Services.CreateAsyncScope())
        {
            await scope.ServiceProvider.GetRequiredService<RequestRetention>().PurgeExpiredAsync(cancellationToken);

            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var contacts = await db.ContactRequests.Where(r => r.Name.EndsWith(marker)).Select(r => r.Name).ToListAsync(cancellationToken);
            Assert.Equal([$"kept {marker}"], contacts);
        }
    }

    [Fact]
    public async Task Deletes_expired_applications_together_with_their_files()
    {
        const int applicationRetentionDays = 60;
        var cancellationToken = TestContext.Current.CancellationToken;
        var now = factory.Time.GetUtcNow();
        var marker = Guid.NewGuid().ToString();
        Guid expiredFile;
        Guid keptFile;

        await using (var scope = factory.Services.CreateAsyncScope())
        {
            var store = scope.ServiceProvider.GetRequiredService<EncryptedFileStore>();
            expiredFile = await store.SaveAsync(new MemoryStream(ApplicationEndpointTests.Pdf), cancellationToken);
            keptFile = await store.SaveAsync(new MemoryStream(ApplicationEndpointTests.Pdf), cancellationToken);

            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            db.JobApplications.AddRange(
                Application($"expired {marker}", now.AddDays(-applicationRetentionDays).AddMinutes(-1), expiredFile),
                Application($"kept {marker}", now.AddDays(-applicationRetentionDays).AddMinutes(1), keptFile));
            await db.SaveChangesAsync(cancellationToken);
        }

        await using (var scope = factory.Services.CreateAsyncScope())
        {
            await scope.ServiceProvider.GetRequiredService<RequestRetention>().PurgeExpiredAsync(cancellationToken);

            var names = await scope.ServiceProvider.GetRequiredService<AppDbContext>().JobApplications
                .Where(application => application.Name.EndsWith(marker))
                .Select(application => application.Name)
                .ToListAsync(cancellationToken);
            Assert.Equal([$"kept {marker}"], names);

            var store = scope.ServiceProvider.GetRequiredService<EncryptedFileStore>();
            Assert.False(File.Exists(store.PathFor(expiredFile)));
            Assert.True(File.Exists(store.PathFor(keptFile)));
        }
    }

    private static JobApplication Application(string name, DateTimeOffset createdAt, Guid fileId) => new()
    {
        Position = "initiativ",
        Name = name,
        Phone = "0521 123456",
        Qualification = "pflegehilfskraft",
        ResumeFileId = fileId,
        ResumeContentType = "application/pdf",
        ConsentVersion = "test",
        ConsentGivenAt = createdAt,
        CreatedAt = createdAt,
    };

    private static ContactRequest Contact(string name, DateTimeOffset createdAt) => new()
    {
        Name = name,
        Phone = "0521 123456",
        Message = "Test",
        ConsentVersion = "test",
        ConsentGivenAt = createdAt,
        CreatedAt = createdAt,
    };
}
