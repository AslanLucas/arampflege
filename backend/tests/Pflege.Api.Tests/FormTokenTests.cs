using System.Net;

namespace Pflege.Api.Tests;

[Collection(ApiCollection.Name)]
public sealed class FormTokenTests(ApiFactory factory)
{
    [Fact]
    public async Task Issues_a_token_that_is_never_cached()
    {
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/form-tokens", TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.True(response.Headers.CacheControl?.NoStore);
        Assert.False(string.IsNullOrEmpty(await ApiFactory.GetFormTokenAsync(client)));
    }
}
