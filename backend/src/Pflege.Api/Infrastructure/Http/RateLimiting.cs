using System.Threading.RateLimiting;
using Microsoft.Extensions.Options;

namespace Pflege.Api.Infrastructure.Http;

public sealed class FormRateLimitOptions
{
    public const string SectionName = "RateLimiting:FormSubmissions";

    public int PermitLimit { get; set; } = 5;

    public TimeSpan Window { get; set; } = TimeSpan.FromMinutes(10);
}

public static class RateLimiting
{
    public const string FormSubmissions = "form-submissions";

    public static IServiceCollection AddFormRateLimiting(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<FormRateLimitOptions>(configuration.GetSection(FormRateLimitOptions.SectionName));

        return services.AddRateLimiter(options =>
        {
            options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
            options.OnRejected = (context, _) => new ValueTask(
                TypedResults.Problem(
                    title: "Zu viele Anfragen",
                    detail: "Bitte versuchen Sie es später noch einmal oder rufen Sie uns an.",
                    statusCode: StatusCodes.Status429TooManyRequests)
                .ExecuteAsync(context.HttpContext));

            // The client IP is only used in memory as the partition key and never stored.
            options.AddPolicy(FormSubmissions, context =>
            {
                var limits = context.RequestServices.GetRequiredService<IOptions<FormRateLimitOptions>>().Value;
                return RateLimitPartition.GetFixedWindowLimiter(
                    context.Connection.RemoteIpAddress?.ToString() ?? "unknown",
                    _ => new FixedWindowRateLimiterOptions { PermitLimit = limits.PermitLimit, Window = limits.Window });
            });
        });
    }
}
