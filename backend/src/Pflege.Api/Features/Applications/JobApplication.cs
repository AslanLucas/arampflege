using Pflege.Api.Infrastructure.Notifications;

namespace Pflege.Api.Features.Applications;

public sealed class JobApplication : INotifiableRequest
{
    public Guid Id { get; init; } = Guid.CreateVersion7();
    /// <summary>"initiativ" or the slug of a job posting from the website content.</summary>
    public required string Position { get; init; }
    public required string Name { get; init; }
    public required string Phone { get; init; }
    public string? Email { get; init; }
    public required string Qualification { get; init; }
    public string? Message { get; init; }
    /// <summary>Encrypted file in the application file store; the original file name is not kept.</summary>
    public Guid? ResumeFileId { get; init; }
    public string? ResumeContentType { get; init; }
    public required string ConsentVersion { get; init; }
    public required DateTimeOffset ConsentGivenAt { get; init; }
    public required DateTimeOffset CreatedAt { get; init; }
    public DateTimeOffset? NotifiedAt { get; set; }
}
