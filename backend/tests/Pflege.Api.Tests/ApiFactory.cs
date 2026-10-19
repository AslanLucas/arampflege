using System.Net.Http.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Time.Testing;
using Pflege.Api.Features.Forms;
using Pflege.Api.Infrastructure.Email;
using Testcontainers.PostgreSql;

namespace Pflege.Api.Tests;

public class ApiFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly PostgreSqlContainer _database = new PostgreSqlBuilder("postgres:18-alpine").Build();

    public FakeTimeProvider Time { get; } = new(DateTimeOffset.UtcNow);

    public FakeNotificationMailer Mailer { get; } = new();

    protected virtual int FormPermitLimit => 1000;

    public async ValueTask InitializeAsync() => await _database.StartAsync();

    public override async ValueTask DisposeAsync()
    {
        await _database.DisposeAsync();
        await base.DisposeAsync();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.UseEnvironment("Testing");
        builder.ConfigureAppConfiguration(configuration => configuration.AddInMemoryCollection(
            new Dictionary<string, string?>
            {
                ["ConnectionStrings:Default"] = _database.GetConnectionString(),
                ["Database:MigrateOnStartup"] = "true",
                ["BackgroundJobs:Enabled"] = "false",
                ["Retention:RequestRetentionDays"] = "30",
                ["RateLimiting:FormSubmissions:PermitLimit"] = FormPermitLimit.ToString(System.Globalization.CultureInfo.InvariantCulture),
                ["Smtp:Host"] = "localhost",
                ["Smtp:From"] = "webseite@pflegedienst.test",
                ["Smtp:To"] = "anfragen@pflegedienst.test",
            }));
        builder.ConfigureServices(services =>
        {
            services.RemoveAll<TimeProvider>();
            services.AddSingleton<TimeProvider>(Time);
            services.RemoveAll<INotificationMailer>();
            services.AddSingleton<INotificationMailer>(Mailer);
        });
    }

    /// <summary>Fetches a form token and lets the minimum fill time pass, like a person would.</summary>
    public async Task<string> GetValidFormTokenAsync(HttpClient client)
    {
        var token = await GetFormTokenAsync(client);
        Time.Advance(FormTokenService.MinimumFillTime + TimeSpan.FromSeconds(1));
        return token;
    }

    public static async Task<string> GetFormTokenAsync(HttpClient client)
    {
        var response = await client.GetFromJsonAsync<FormTokenResponse>("/api/form-tokens", TestContext.Current.CancellationToken);
        return response!.Token;
    }
}

[CollectionDefinition(Name)]
public sealed class ApiCollection : ICollectionFixture<ApiFactory>
{
    public const string Name = "api";
}
