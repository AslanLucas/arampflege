namespace Pflege.Api.Infrastructure.Notifications;

/// <summary>Anything submitted through the website that the care service gets notified about.</summary>
public interface INotifiableRequest
{
    Guid Id { get; }
    DateTimeOffset CreatedAt { get; }
    DateTimeOffset? NotifiedAt { get; set; }
}
