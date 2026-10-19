using System.Net;
using System.Net.Http.Json;
using System.Text.Json;

namespace Pflege.Api.Tests;

public static class ProblemDetailsAssertions
{
    /// <summary>Reads the field errors of a 400 response. Keys must match the camelCase JSON fields exactly.</summary>
    public static async Task<Dictionary<string, string[]>> ReadFieldErrorsAsync(HttpResponseMessage response)
    {
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("application/problem+json", response.Content.Headers.ContentType?.MediaType);

        var problem = await response.Content.ReadFromJsonAsync<JsonElement>(TestContext.Current.CancellationToken);
        Assert.Equal("Bitte prüfen Sie Ihre Angaben.", problem.GetProperty("title").GetString());
        return problem.GetProperty("errors")
            .EnumerateObject()
            .ToDictionary(
                property => property.Name,
                property => property.Value.EnumerateArray().Select(message => message.GetString()!).ToArray(),
                StringComparer.Ordinal);
    }
}
