namespace Pflege.Api.Infrastructure.BackgroundJobs;

public sealed class BackgroundJobOptions
{
    public const string SectionName = "BackgroundJobs";

    /// <summary>Tests switch the timers off and run the jobs directly.</summary>
    public bool Enabled { get; set; } = true;
}
