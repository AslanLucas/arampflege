namespace Pflege.Api.Infrastructure.BackgroundJobs;

public interface IPeriodicJob
{
    static abstract TimeSpan Interval { get; }

    Task RunAsync(CancellationToken cancellationToken);
}
