using System.ComponentModel.DataAnnotations;

namespace Pflege.Api.Infrastructure.Storage;

public sealed class StorageOptions
{
    public const string SectionName = "Storage";

    /// <summary>Directory outside the web root; must survive restarts and be backed up securely.</summary>
    [Required]
    public string ApplicationFilesPath { get; set; } = "";
}
