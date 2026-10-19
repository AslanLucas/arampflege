using Microsoft.AspNetCore.Http.HttpResults;
using Pflege.Api.Features.Forms;
using Pflege.Api.Infrastructure.Http;
using Pflege.Api.Infrastructure.Persistence;

namespace Pflege.Api.Features.Callback;

public static class CallbackEndpoints
{
    public static IEndpointRouteBuilder MapCallbackEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGroup("/api/callback-requests")
            .WithTags("Callback")
            .MapPost("", CreateAsync)
            .RequireRateLimiting(RateLimiting.FormSubmissions);

        return app;
    }

    private static Task<Results<Created, ValidationProblem>> CreateAsync(
        CreateCallbackRequest request,
        FormTokenService tokens,
        AppDbContext db,
        TimeProvider time,
        ILogger<CallbackRequest> logger,
        CancellationToken cancellationToken) =>
        FormEndpoints.HandleSubmissionAsync(request, tokens, logger, async ct =>
        {
            var now = time.GetUtcNow();
            var entity = new CallbackRequest
            {
                Name = request.Name!.Trim(),
                Phone = request.Phone!.Trim(),
                Location = request.Location!.Trim(),
                PreferredTime = request.PreferredTime!,
                ConsentVersion = Consent.CurrentVersion,
                ConsentGivenAt = now,
                CreatedAt = now,
            };
            db.CallbackRequests.Add(entity);
            await db.SaveChangesAsync(ct);
            return entity.Id;
        }, cancellationToken);
}
