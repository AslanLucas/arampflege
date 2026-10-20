using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pflege.Api.Infrastructure.Notifications;
using Pflege.Api.Infrastructure.Persistence;

namespace Pflege.Api.Tests;

[Collection(ApiCollection.Name)]
public sealed class RequestNotifierTests(ApiFactory factory)
{
    [Fact]
    public async Task Notifies_once_per_request_without_any_personal_data()
    {
        var cancellationToken = TestContext.Current.CancellationToken;
        using var client = factory.CreateClient();
        var name = $"Erika Mustermann {Guid.NewGuid()}";
        const string phone = "0521 987654";
        const string message = "Meine Mutter hat Diabetes und braucht Insulin.";

        await client.PostAsJsonAsync("/api/callback-requests", new
        {
            name,
            phone,
            location = "33602 Bielefeld",
            preferredTime = "afternoon",
            consent = true,
            formToken = await factory.GetValidFormTokenAsync(client),
        }, cancellationToken);
        await client.PostAsJsonAsync("/api/contact-requests", new
        {
            name,
            phone,
            message,
            consent = true,
            formToken = await factory.GetValidFormTokenAsync(client),
        }, cancellationToken);

        await using var scope = factory.Services.CreateAsyncScope();
        var notifier = scope.ServiceProvider.GetRequiredService<RequestNotifier>();
        await notifier.NotifyPendingAsync(cancellationToken);

        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        var callback = await db.CallbackRequests.SingleAsync(request => request.Name == name, cancellationToken);
        var contact = await db.ContactRequests.SingleAsync(request => request.Name == name, cancellationToken);
        Assert.NotNull(callback.NotifiedAt);
        Assert.NotNull(contact.NotifiedAt);

        var mails = factory.Mailer.Sent
            .Where(mail => mail.Body.Contains(callback.Id.ToString(), StringComparison.Ordinal)
                || mail.Body.Contains(contact.Id.ToString(), StringComparison.Ordinal))
            .ToList();
        Assert.Equal(2, mails.Count);
        foreach (var mail in mails)
        {
            Assert.DoesNotContain("Mustermann", mail.Subject + mail.Body, StringComparison.Ordinal);
            Assert.DoesNotContain(phone, mail.Body, StringComparison.Ordinal);
            Assert.DoesNotContain("Bielefeld", mail.Body, StringComparison.Ordinal);
            Assert.DoesNotContain("Diabetes", mail.Body, StringComparison.Ordinal);
        }

        var sentBefore = factory.Mailer.Sent.Count;
        await notifier.NotifyPendingAsync(cancellationToken);
        Assert.Equal(sentBefore, factory.Mailer.Sent.Count);
    }

    [Fact]
    public async Task Notifies_about_applications_without_name_or_file_name()
    {
        var cancellationToken = TestContext.Current.CancellationToken;
        using var client = factory.CreateClient();
        var name = $"Bewerberin {Guid.NewGuid()}";
        var token = await factory.GetValidFormTokenAsync(client);
        await client.PostAsync(
            "/api/applications",
            ApplicationEndpointTests.Form(token, name, (ApplicationEndpointTests.Pdf, "Lebenslauf-Muster.pdf", "application/pdf")),
            cancellationToken);

        await using var scope = factory.Services.CreateAsyncScope();
        await scope.ServiceProvider.GetRequiredService<RequestNotifier>().NotifyPendingAsync(cancellationToken);

        var application = await scope.ServiceProvider.GetRequiredService<AppDbContext>().JobApplications
            .SingleAsync(candidate => candidate.Name == name, cancellationToken);
        Assert.NotNull(application.NotifiedAt);
        var mail = Assert.Single(factory.Mailer.Sent, sent => sent.Body.Contains(application.Id.ToString(), StringComparison.Ordinal));
        Assert.Equal("Neue Bewerbung über die Webseite", mail.Subject);
        Assert.DoesNotContain("Bewerberin", mail.Body, StringComparison.Ordinal);
        Assert.DoesNotContain("Lebenslauf-Muster", mail.Body, StringComparison.Ordinal);
        Assert.DoesNotContain("0521", mail.Body, StringComparison.Ordinal);
    }
}
