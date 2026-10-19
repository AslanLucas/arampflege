using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pflege.Api.Features.Callback;
using Pflege.Api.Features.Contact;
using Pflege.Api.Infrastructure.Persistence;
using Pflege.Api.Infrastructure.Retention;

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
            db.CallbackRequests.AddRange(Callback($"expired {marker}", expired), Callback($"kept {marker}", kept));
            db.ContactRequests.AddRange(Contact($"expired {marker}", expired), Contact($"kept {marker}", kept));
            await db.SaveChangesAsync(cancellationToken);
        }

        await using (var scope = factory.Services.CreateAsyncScope())
        {
            await scope.ServiceProvider.GetRequiredService<RequestRetention>().PurgeExpiredAsync(cancellationToken);

            var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
            var callbacks = await db.CallbackRequests.Where(r => r.Name.EndsWith(marker)).Select(r => r.Name).ToListAsync(cancellationToken);
            var contacts = await db.ContactRequests.Where(r => r.Name.EndsWith(marker)).Select(r => r.Name).ToListAsync(cancellationToken);
            Assert.Equal([$"kept {marker}"], callbacks);
            Assert.Equal([$"kept {marker}"], contacts);
        }
    }

    private static CallbackRequest Callback(string name, DateTimeOffset createdAt) => new()
    {
        Name = name,
        Phone = "0521 123456",
        Location = "Bielefeld",
        PreferredTime = "anytime",
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
