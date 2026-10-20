using Microsoft.AspNetCore.DataProtection;
using Microsoft.Extensions.Options;

namespace Pflege.Api.Infrastructure.Storage;

/// <summary>
/// Stores application documents encrypted with ASP.NET Data Protection under random names.
/// Without the key ring the files on disk are unreadable.
/// </summary>
public sealed class EncryptedFileStore(IDataProtectionProvider dataProtection, IOptions<StorageOptions> options)
{
    private readonly IDataProtector _protector = dataProtection.CreateProtector("Pflege.Api.Resumes");

    private string Directory => options.Value.ApplicationFilesPath;

    public async Task<Guid> SaveAsync(Stream content, CancellationToken cancellationToken)
    {
        using var buffer = new MemoryStream();
        await content.CopyToAsync(buffer, cancellationToken);

        var id = Guid.NewGuid();
        System.IO.Directory.CreateDirectory(Directory);
        await File.WriteAllBytesAsync(PathFor(id), _protector.Protect(buffer.ToArray()), cancellationToken);
        return id;
    }

    public async Task<byte[]> ReadAsync(Guid id, CancellationToken cancellationToken) =>
        _protector.Unprotect(await File.ReadAllBytesAsync(PathFor(id), cancellationToken));

    public void Delete(Guid id) => File.Delete(PathFor(id));

    public string PathFor(Guid id) => Path.Combine(Directory, id.ToString("N"));
}
