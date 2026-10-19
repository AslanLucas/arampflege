using Microsoft.Extensions.Options;

namespace Pflege.Api.Infrastructure.BackgroundJobs;

/// <summary>Runs a scoped job at startup and then at the job's interval.</summary>
public sealed class PeriodicJobService<TJob>(
    IServiceScopeFactory scopeFactory,
    IOptions<BackgroundJobOptions> options,
    ILogger<PeriodicJobService<TJob>> logger) : BackgroundService
    where TJob : IPeriodicJob
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        if (!options.Value.Enabled)
        {
            return;
        }

        using var timer = new PeriodicTimer(TJob.Interval);
        do
        {
            try
            {
                using var scope = scopeFactory.CreateScope();
                await scope.ServiceProvider.GetRequiredService<TJob>().RunAsync(stoppingToken);
            }
            catch (Exception exception) when (exception is not OperationCanceledException)
            {
                logger.LogError(exception, "Background job {Job} failed", typeof(TJob).Name);
            }
        }
        while (await timer.WaitForNextTickAsync(stoppingToken));
    }
}
