using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

namespace Pflege.Api.Tests;

public sealed class RateLimitedApiFactory : ApiFactory
{
    public const int PermitLimit = 2;

    protected override int FormPermitLimit => PermitLimit;
}

public sealed class RateLimitTests(RateLimitedApiFactory factory) : IClassFixture<RateLimitedApiFactory>
{
    [Theory]
    [InlineData("/api/contact-requests")]
    [InlineData("/api/applications")]
    public async Task Rejects_too_many_submissions_with_a_german_problem(string path)
    {
        var cancellationToken = TestContext.Current.CancellationToken;
        using var client = factory.CreateClient();

        HttpResponseMessage? response = null;
        for (var attempt = 0; attempt <= RateLimitedApiFactory.PermitLimit; attempt++)
        {
            // The application endpoint only accepts multipart form data; routing rejects JSON before rate limiting.
            response = path == "/api/applications"
                ? await client.PostAsync(path, new MultipartFormDataContent(), cancellationToken)
                : await client.PostAsJsonAsync(path, new { }, cancellationToken);
        }

        Assert.Equal(HttpStatusCode.TooManyRequests, response!.StatusCode);
        var problem = await response.Content.ReadFromJsonAsync<JsonElement>(cancellationToken);
        Assert.Equal("Zu viele Anfragen", problem.GetProperty("title").GetString());
    }
}
