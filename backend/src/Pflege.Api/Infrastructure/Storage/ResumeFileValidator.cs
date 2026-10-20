namespace Pflege.Api.Infrastructure.Storage;

public static class ResumeFileValidator
{
    public const long MaxBytes = 10 * 1024 * 1024;

    private static readonly (string ContentType, byte[] Signature)[] Signatures =
    [
        ("application/pdf", "%PDF-"u8.ToArray()),
        ("image/jpeg", [0xFF, 0xD8, 0xFF]),
        ("image/png", [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]),
    ];

    /// <summary>
    /// Detects the real file type from its first bytes. File name and client-reported
    /// content type are ignored because both can be faked.
    /// </summary>
    public static async Task<string?> DetectContentTypeAsync(Stream content, CancellationToken cancellationToken)
    {
        var header = new byte[8];
        var read = await content.ReadAtLeastAsync(header, header.Length, throwOnEndOfStream: false, cancellationToken);

        foreach (var (contentType, signature) in Signatures)
        {
            if (read >= signature.Length && header.AsSpan(0, signature.Length).SequenceEqual(signature))
            {
                return contentType;
            }
        }
        return null;
    }
}
