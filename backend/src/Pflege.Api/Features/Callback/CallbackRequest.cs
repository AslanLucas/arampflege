using Pflege.Api.Infrastructure.Notifications;

namespace Pflege.Api.Features.Callback;

public sealed class CallbackRequest : INotifiableRequest
{
    public Guid Id { get; init; } = Guid.CreateVersion7();
    public required string Name { get; init; }
    public required string Phone { get; init; }
    public required string Location { get; init; }
    public required string PreferredTime { get; init; }
    public required string ConsentVersion { get; init; }
    public required DateTimeOffset ConsentGivenAt { get; init; }
    public required DateTimeOffset CreatedAt { get; init; }
    public DateTimeOffset? NotifiedAt { get; set; }
}
