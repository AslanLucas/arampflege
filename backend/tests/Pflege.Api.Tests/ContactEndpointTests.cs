using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pflege.Api.Features.Forms;
using Pflege.Api.Infrastructure.Persistence;

namespace Pflege.Api.Tests;

[Collection(ApiCollection.Name)]
public sealed class ContactEndpointTests(ApiFactory factory)
{
    private const string Path = "/api/contact-requests";

    [Theory]
    [InlineData("0521 123456", null)]
    [InlineData(null, "angehoerige@beispiel.de")]
    [InlineData("0521 123456", "angehoerige@beispiel.de")]
    public async Task Stores_a_request_with_phone_or_email(string? phone, string? email)
    {
        using var client = factory.CreateClient();
        var name = $"Test {Guid.NewGuid()}";
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, new
        {
            name,
            phone,
            email,
            message = "Meine Mutter braucht Hilfe beim Duschen.",
            consent = true,
            formToken = token,
        }, TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        await using var scope = factory.Services.CreateAsyncScope();
        var stored = await scope.ServiceProvider.GetRequiredService<AppDbContext>().ContactRequests
            .SingleAsync(request => request.Name == name, TestContext.Current.CancellationToken);
        Assert.Equal(phone, stored.Phone);
        Assert.Equal(email, stored.Email);
        Assert.Equal(Consent.CurrentVersion, stored.ConsentVersion);
    }

    [Fact]
    public async Task Accepts_empty_optional_fields_as_browsers_send_them()
    {
        using var client = factory.CreateClient();
        var name = $"Test {Guid.NewGuid()}";
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, new
        {
            name,
            phone = "0521 123456",
            email = "",
            message = "Bitte rufen Sie zurück.",
            consent = true,
            formToken = token,
            website = "",
        }, TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        await using var scope = factory.Services.CreateAsyncScope();
        var stored = await scope.ServiceProvider.GetRequiredService<AppDbContext>().ContactRequests
            .SingleAsync(request => request.Name == name, TestContext.Current.CancellationToken);
        Assert.Null(stored.Email);
    }

    [Theory]
    [InlineData("behandlungspflege", "behandlungspflege")]
    [InlineData("", null)]
    [InlineData(null, null)]
    public async Task Stores_the_optional_topic(string? topic, string? expected)
    {
        using var client = factory.CreateClient();
        var name = $"Test {Guid.NewGuid()}";
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, new
        {
            name,
            phone = "0521 123456",
            topic,
            message = "Mein Vater braucht Hilfe bei den Medikamenten.",
            consent = true,
            formToken = token,
        }, TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        await using var scope = factory.Services.CreateAsyncScope();
        var stored = await scope.ServiceProvider.GetRequiredService<AppDbContext>().ContactRequests
            .SingleAsync(request => request.Name == name, TestContext.Current.CancellationToken);
        Assert.Equal(expected, stored.Topic);
    }

    [Fact]
    public async Task Rejects_an_unknown_topic()
    {
        using var client = factory.CreateClient();
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, new
        {
            name = "Test",
            phone = "0521 123456",
            topic = "intensivpflege",
            message = "Bitte melden Sie sich.",
            consent = true,
            formToken = token,
        }, TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([FormMessages.TopicInvalid], errors["topic"]);
    }

    [Fact]
    public async Task Requires_phone_or_email()
    {
        using var client = factory.CreateClient();
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, new
        {
            name = "Test",
            message = "Bitte melden Sie sich.",
            consent = true,
            formToken = token,
        }, TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([FormMessages.PhoneOrEmailRequired], errors["phone"]);
    }

    [Fact]
    public async Task Returns_german_field_errors_for_invalid_input()
    {
        using var client = factory.CreateClient();
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, new
        {
            name = new string('x', 101),
            email = "keine-adresse",
            message = new string('x', 2001),
            consent = false,
            formToken = token,
        }, TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([FormMessages.NameTooLong], errors["name"]);
        Assert.Equal([FormMessages.EmailInvalid], errors["email"]);
        Assert.Equal([FormMessages.MessageTooLong], errors["message"]);
        Assert.Equal([FormMessages.ConsentRequired], errors["consent"]);
    }

    [Fact]
    public async Task Silently_discards_a_request_with_filled_honeypot()
    {
        using var client = factory.CreateClient();
        var name = $"Bot {Guid.NewGuid()}";
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, new
        {
            name,
            phone = "0521 123456",
            message = "Spam",
            consent = true,
            formToken = token,
            website = "https://spam.example",
        }, TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        await using var scope = factory.Services.CreateAsyncScope();
        Assert.False(await scope.ServiceProvider.GetRequiredService<AppDbContext>().ContactRequests
            .AnyAsync(request => request.Name == name, TestContext.Current.CancellationToken));
    }
}
