using Pflege.Api.Infrastructure.Notifications;

namespace Pflege.Api.Features.Contact;

public sealed class ContactRequest : INotifiableRequest
{
    public Guid Id { get; init; } = Guid.CreateVersion7();
    public required string Name { get; init; }
    public string? Phone { get; init; }
    public string? Email { get; init; }
    public string? Topic { get; init; }
    public required string Message { get; init; }
    public required string ConsentVersion { get; init; }
    public required DateTimeOffset ConsentGivenAt { get; init; }
    public required DateTimeOffset CreatedAt { get; init; }
    public DateTimeOffset? NotifiedAt { get; set; }
}
