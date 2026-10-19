using Microsoft.AspNetCore.Http.HttpResults;
using Pflege.Api.Features.Forms;
using Pflege.Api.Infrastructure.Http;
using Pflege.Api.Infrastructure.Persistence;

namespace Pflege.Api.Features.Contact;

public static class ContactEndpoints
{
    public static IEndpointRouteBuilder MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGroup("/api/contact-requests")
            .WithTags("Contact")
            .MapPost("", CreateAsync)
            .RequireRateLimiting(RateLimiting.FormSubmissions);

        return app;
    }

    private static Task<Results<Created, ValidationProblem>> CreateAsync(
        CreateContactRequest request,
        FormTokenService tokens,
        AppDbContext db,
        TimeProvider time,
        ILogger<ContactRequest> logger,
        CancellationToken cancellationToken) =>
        FormEndpoints.HandleSubmissionAsync(request, tokens, logger, async ct =>
        {
            var now = time.GetUtcNow();
            var entity = new ContactRequest
            {
                Name = request.Name!.Trim(),
                Phone = NullIfEmpty(request.Phone),
                Email = NullIfEmpty(request.Email),
                Message = request.Message!.Trim(),
                ConsentVersion = Consent.CurrentVersion,
                ConsentGivenAt = now,
                CreatedAt = now,
            };
            db.ContactRequests.Add(entity);
            await db.SaveChangesAsync(ct);
            return entity.Id;
        }, cancellationToken);

    private static string? NullIfEmpty(string? value) =>
        string.IsNullOrWhiteSpace(value) ? null : value.Trim();
}
