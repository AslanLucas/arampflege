using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Pflege.Api.Features.Applications;
using Pflege.Api.Features.Callback;
using Pflege.Api.Features.Contact;
using Pflege.Api.Features.Forms;
using Pflege.Api.Infrastructure.BackgroundJobs;
using Pflege.Api.Infrastructure.Email;
using Pflege.Api.Infrastructure.Http;
using Pflege.Api.Infrastructure.Notifications;
using Pflege.Api.Infrastructure.Persistence;
using Pflege.Api.Infrastructure.Retention;
using Pflege.Api.Infrastructure.Storage;

var builder = WebApplication.CreateBuilder(args);
var configuration = builder.Configuration;

builder.Services.AddDbContext<AppDbContext>((services, options) =>
{
    var connectionString = services.GetRequiredService<IConfiguration>().GetConnectionString("Default")
        ?? throw new InvalidOperationException("Connection string 'Default' is not configured.");

    options.UseNpgsql(connectionString).UseSnakeCaseNamingConvention();
});

builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddProblemDetails(options => options.CustomizeProblemDetails = context =>
{
    if (context.ProblemDetails is HttpValidationProblemDetails validation)
    {
        validation.Title = "Bitte prüfen Sie Ihre Angaben.";
        // Field keys match the JSON property names the frontend sends (camelCase).
        var errors = validation.Errors.ToDictionary(
            entry => JsonNamingPolicy.CamelCase.ConvertName(entry.Key),
            entry => entry.Value);
        validation.Errors.Clear();
        foreach (var (key, messages) in errors)
        {
            validation.Errors[key] = messages;
        }
    }
});
builder.Services.AddValidation();
builder.Services.AddOpenApi();
builder.Services.AddHealthChecks().AddDbContextCheck<AppDbContext>();

var dataProtection = builder.Services.AddDataProtection().SetApplicationName("Pflege.Api");
if (configuration["DataProtection:KeysPath"] is { Length: > 0 } keysPath)
{
    dataProtection.PersistKeysToFileSystem(new DirectoryInfo(keysPath));
}
builder.Services.AddSingleton<FormTokenService>();

builder.Services.AddFormRateLimiting(configuration);
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    foreach (var proxy in configuration.GetSection("ForwardedHeaders:KnownProxies").Get<string[]>() ?? [])
    {
        options.KnownProxies.Add(IPAddress.Parse(proxy));
    }
});

builder.Services.AddOptions<SmtpOptions>()
    .BindConfiguration(SmtpOptions.SectionName)
    .ValidateDataAnnotations()
    .ValidateOnStart();
builder.Services.AddOptions<RetentionOptions>()
    .BindConfiguration(RetentionOptions.SectionName)
    .ValidateDataAnnotations()
    .ValidateOnStart();
builder.Services.AddOptions<StorageOptions>()
    .BindConfiguration(StorageOptions.SectionName)
    .PostConfigure<IHostEnvironment>((options, environment) =>
    {
        // Relative paths are resolved against the project, not the current working directory.
        if (options.ApplicationFilesPath.Length > 0 && !Path.IsPathRooted(options.ApplicationFilesPath))
        {
            options.ApplicationFilesPath = Path.GetFullPath(
                Path.Combine(environment.ContentRootPath, options.ApplicationFilesPath));
        }
    })
    .ValidateDataAnnotations()
    .ValidateOnStart();
builder.Services.AddSingleton<EncryptedFileStore>();
builder.Services.Configure<BackgroundJobOptions>(configuration.GetSection(BackgroundJobOptions.SectionName));

builder.Services.AddScoped<INotificationMailer, SmtpNotificationMailer>();
builder.Services.AddScoped<RequestNotifier>();
builder.Services.AddScoped<RequestRetention>();
builder.Services.AddHostedService<PeriodicJobService<RequestNotifier>>();
builder.Services.AddHostedService<PeriodicJobService<RequestRetention>>();

var app = builder.Build();

if (configuration.GetValue<bool>("Database:MigrateOnStartup"))
{
    await using var scope = app.Services.CreateAsyncScope();
    await scope.ServiceProvider.GetRequiredService<AppDbContext>().Database.MigrateAsync();
}

app.UseForwardedHeaders();
app.UseExceptionHandler(new ExceptionHandlerOptions
{
    // Development throws on malformed requests (ThrowOnBadRequest); keep them client errors there too.
    StatusCodeSelector = exception => exception is BadHttpRequestException badRequest
        ? badRequest.StatusCode
        : StatusCodes.Status500InternalServerError,
});
app.UseStatusCodePages();
if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}
app.UseSecurityHeaders();
app.UseRateLimiter();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapHealthChecks("/api/health");
app.MapFormEndpoints();
app.MapCallbackEndpoints();
app.MapContactEndpoints();
app.MapApplicationEndpoints();

await app.RunAsync();
