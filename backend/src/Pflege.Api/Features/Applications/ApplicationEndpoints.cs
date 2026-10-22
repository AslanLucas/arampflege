using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Pflege.Api.Features.Forms;
using Pflege.Api.Infrastructure.Http;
using Pflege.Api.Infrastructure.Persistence;
using Pflege.Api.Infrastructure.Storage;

namespace Pflege.Api.Features.Applications;

public static class ApplicationEndpoints
{
    /// <summary>Upper bound for the whole multipart request: one 10 MB file plus the text fields.</summary>
    public const long MaxRequestBytes = ResumeFileValidator.MaxBytes + 1024 * 1024;

    public static IEndpointRouteBuilder MapApplicationEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGroup("/api/applications")
            .WithTags("Applications")
            .MapPost("", CreateAsync)
            .DisableAntiforgery()
            .WithMetadata(new RequestSizeLimitAttribute(MaxRequestBytes))
            .RequireRateLimiting(RateLimiting.FormSubmissions);

        return app;
    }

    private static async Task<Results<Created, ValidationProblem>> CreateAsync(
        [FromForm] CreateApplicationRequest request,
        IFormFile? resume,
        FormTokenService tokens,
        EncryptedFileStore files,
        AppDbContext db,
        TimeProvider time,
        ILogger<JobApplication> logger,
        CancellationToken cancellationToken)
    {
        string? resumeContentType = null;
        if (resume is not null)
        {
            if (resume.Length > ResumeFileValidator.MaxBytes)
            {
                return ResumeError(ApplicationMessages.ResumeTooLarge);
            }
            await using var header = resume.OpenReadStream();
            resumeContentType = await ResumeFileValidator.DetectContentTypeAsync(header, cancellationToken);
            if (resumeContentType is null)
            {
                return ResumeError(ApplicationMessages.ResumeType);
            }
        }

        return await FormEndpoints.HandleSubmissionAsync(request, tokens, logger, async ct =>
        {
            Guid? fileId = null;
            if (resume is not null)
            {
                await using var content = resume.OpenReadStream();
                fileId = await files.SaveAsync(content, ct);
            }

            var now = time.GetUtcNow();
            var entity = new JobApplication
            {
                Position = request.Position!,
                Name = request.Name!.Trim(),
                Phone = request.Phone!.Trim(),
                Email = string.IsNullOrWhiteSpace(request.Email) ? null : request.Email.Trim(),
                Qualification = request.Qualification!,
                Message = string.IsNullOrWhiteSpace(request.Message) ? null : request.Message.Trim(),
                ResumeFileId = fileId,
                ResumeContentType = resumeContentType,
                ConsentVersion = Consent.CurrentVersion,
                ConsentGivenAt = now,
                CreatedAt = now,
            };
            db.JobApplications.Add(entity);
            try
            {
                await db.SaveChangesAsync(ct);
            }
            catch when (fileId is not null)
            {
                files.Delete(fileId.Value);
                throw;
            }
            return entity.Id;
        }, cancellationToken, ApplicationMessages.FormExpired);
    }

    private static ValidationProblem ResumeError(string message) =>
        TypedResults.ValidationProblem(new Dictionary<string, string[]> { ["resume"] = [message] });
}
