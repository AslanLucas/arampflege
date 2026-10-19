using Microsoft.AspNetCore.Http.HttpResults;

namespace Pflege.Api.Features.Forms;

public sealed record FormTokenResponse(string Token);

public static class FormEndpoints
{
    public static IEndpointRouteBuilder MapFormEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGroup("/api/form-tokens")
            .WithTags("Forms")
            .MapGet("", IssueToken);

        return app;
    }

    private static Ok<FormTokenResponse> IssueToken(FormTokenService tokens, HttpContext context)
    {
        context.Response.Headers.CacheControl = "no-store";
        return TypedResults.Ok(new FormTokenResponse(tokens.Issue()));
    }

    /// <summary>
    /// Shared handling for all form submissions. Suspected spam gets the same response as a
    /// real submission but is not stored.
    /// </summary>
    public static async Task<Results<Created, ValidationProblem>> HandleSubmissionAsync(
        IFormSubmission submission,
        FormTokenService tokens,
        ILogger logger,
        Func<CancellationToken, Task<Guid>> store,
        CancellationToken cancellationToken)
    {
        switch (tokens.Check(submission.FormToken, submission.Website))
        {
            case SubmissionCheck.Invalid:
                return TypedResults.ValidationProblem(
                    new Dictionary<string, string[]> { ["form"] = [FormMessages.FormExpired] });
            case SubmissionCheck.Suspected:
                logger.LogInformation("Discarded suspected automated submission");
                return TypedResults.Created();
            default:
                var id = await store(cancellationToken);
                logger.LogInformation("Stored form submission {SubmissionId}", id);
                return TypedResults.Created();
        }
    }
}
