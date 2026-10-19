using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pflege.Api.Features.Forms;
using Pflege.Api.Infrastructure.Persistence;

namespace Pflege.Api.Tests;

[Collection(ApiCollection.Name)]
public sealed class CallbackEndpointTests(ApiFactory factory)
{
    private const string Path = "/api/callback-requests";

    private static object ValidRequest(string name, string token, string? website = null) => new
    {
        name,
        phone = "0521 123456",
        location = "33602 Bielefeld",
        preferredTime = "morning",
        consent = true,
        formToken = token,
        website,
    };

    private async Task<bool> ExistsAsync(string name)
    {
        await using var scope = factory.Services.CreateAsyncScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        return await db.CallbackRequests.AnyAsync(request => request.Name == name, TestContext.Current.CancellationToken);
    }

    [Fact]
    public async Task Stores_a_valid_request_with_consent_version_and_time()
    {
        using var client = factory.CreateClient();
        var name = $"Test {Guid.NewGuid()}";
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, ValidRequest(name, token), TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        await using var scope = factory.Services.CreateAsyncScope();
        var stored = await scope.ServiceProvider.GetRequiredService<AppDbContext>().CallbackRequests
            .SingleAsync(request => request.Name == name, TestContext.Current.CancellationToken);
        Assert.Equal("0521 123456", stored.Phone);
        Assert.Equal("33602 Bielefeld", stored.Location);
        Assert.Equal("morning", stored.PreferredTime);
        Assert.Equal(Consent.CurrentVersion, stored.ConsentVersion);
        Assert.Equal(factory.Time.GetUtcNow(), stored.ConsentGivenAt, TimeSpan.FromMilliseconds(1));
        Assert.Null(stored.NotifiedAt);
    }

    [Fact]
    public async Task Returns_german_field_errors_for_an_empty_request()
    {
        using var client = factory.CreateClient();
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, new { formToken = token }, TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([FormMessages.NameRequired], errors["name"]);
        Assert.Equal([FormMessages.PhoneRequired], errors["phone"]);
        Assert.Equal([FormMessages.LocationRequired], errors["location"]);
        Assert.Equal([FormMessages.PreferredTimeRequired], errors["preferredTime"]);
        Assert.Equal([FormMessages.ConsentRequired], errors["consent"]);
    }

    [Theory]
    [InlineData("abc")]
    [InlineData("12")]
    [InlineData("0521 123456; DROP")]
    public async Task Rejects_invalid_phone_numbers(string phone)
    {
        using var client = factory.CreateClient();
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, new
        {
            name = "Test",
            phone,
            location = "Bielefeld",
            preferredTime = "anytime",
            consent = true,
            formToken = token,
        }, TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([FormMessages.PhoneInvalid], errors["phone"]);
    }

    [Fact]
    public async Task Rejects_unknown_preferred_time()
    {
        using var client = factory.CreateClient();
        var token = await factory.GetValidFormTokenAsync(client);
        var request = new
        {
            name = "Test",
            phone = "0521 123456",
            location = "Bielefeld",
            preferredTime = "midnight",
            consent = true,
            formToken = token,
        };

        var response = await client.PostAsJsonAsync(Path, request, TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.True(errors.ContainsKey("preferredTime"));
    }

    [Fact]
    public async Task Silently_discards_a_request_with_filled_honeypot()
    {
        using var client = factory.CreateClient();
        var name = $"Bot {Guid.NewGuid()}";
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, ValidRequest(name, token, website: "https://spam.example"), TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.False(await ExistsAsync(name));
    }

    [Fact]
    public async Task Silently_discards_a_request_sent_faster_than_a_person_could_fill_it()
    {
        using var client = factory.CreateClient();
        var name = $"Bot {Guid.NewGuid()}";
        var token = await ApiFactory.GetFormTokenAsync(client);

        var response = await client.PostAsJsonAsync(Path, ValidRequest(name, token), TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.False(await ExistsAsync(name));
    }

    [Theory]
    [InlineData("")]
    [InlineData("not-a-valid-token")]
    public async Task Asks_to_reload_when_the_form_token_is_missing_or_invalid(string token)
    {
        using var client = factory.CreateClient();
        var name = $"Test {Guid.NewGuid()}";

        var response = await client.PostAsJsonAsync(Path, ValidRequest(name, token), TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([FormMessages.FormExpired], errors["form"]);
        Assert.False(await ExistsAsync(name));
    }
}
