using System.Globalization;
using System.Security.Cryptography;
using Microsoft.AspNetCore.DataProtection;

namespace Pflege.Api.Features.Forms;

public enum SubmissionCheck
{
    Valid,
    /// <summary>Looks automated: accept silently, store nothing.</summary>
    Suspected,
    /// <summary>Token missing, tampered or expired: ask the person to reload.</summary>
    Invalid,
}

/// <summary>
/// Issues signed timestamps when a form is opened, so the server can enforce a minimum
/// fill time without cookies or third-party captchas.
/// </summary>
public sealed class FormTokenService(IDataProtectionProvider dataProtection, TimeProvider time)
{
    public static readonly TimeSpan MinimumFillTime = TimeSpan.FromSeconds(3);
    private static readonly TimeSpan Lifetime = TimeSpan.FromHours(24);

    private readonly ITimeLimitedDataProtector _protector =
        dataProtection.CreateProtector("Pflege.Api.FormToken").ToTimeLimitedDataProtector();

    public string Issue()
    {
        var now = time.GetUtcNow();
        return _protector.Protect(now.ToUnixTimeMilliseconds().ToString(CultureInfo.InvariantCulture), now + Lifetime);
    }

    public SubmissionCheck Check(string? token, string? honeypot)
    {
        if (!string.IsNullOrEmpty(honeypot))
        {
            return SubmissionCheck.Suspected;
        }

        if (string.IsNullOrEmpty(token))
        {
            return SubmissionCheck.Invalid;
        }

        string issuedAt;
        try
        {
            issuedAt = _protector.Unprotect(token, out _);
        }
        catch (CryptographicException)
        {
            return SubmissionCheck.Invalid;
        }

        if (!long.TryParse(issuedAt, NumberStyles.Integer, CultureInfo.InvariantCulture, out var issuedAtMs))
        {
            return SubmissionCheck.Invalid;
        }

        var elapsed = time.GetUtcNow() - DateTimeOffset.FromUnixTimeMilliseconds(issuedAtMs);
        return elapsed < MinimumFillTime ? SubmissionCheck.Suspected : SubmissionCheck.Valid;
    }
}
