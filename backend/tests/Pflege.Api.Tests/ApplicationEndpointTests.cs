using System.Net;
using System.Net.Http.Headers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pflege.Api.Features.Applications;
using Pflege.Api.Features.Forms;
using Pflege.Api.Infrastructure.Persistence;
using Pflege.Api.Infrastructure.Storage;

namespace Pflege.Api.Tests;

[Collection(ApiCollection.Name)]
public sealed class ApplicationEndpointTests(ApiFactory factory)
{
    private const string Path = "/api/applications";

    public static readonly byte[] Pdf = "%PDF-1.7\nLebenslauf Erika Muster\n%%EOF"u8.ToArray();
    private static readonly byte[] Jpeg = [0xFF, 0xD8, 0xFF, 0xE0, 0x00, 0x10, 0x4A, 0x46, 0x49, 0x46];
    private static readonly byte[] Png = [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00];

    public static MultipartFormDataContent Form(
        string token,
        string name,
        (byte[] Content, string FileName, string ContentType)? resume = null,
        string? website = null,
        string qualification = "pflegefachkraft")
    {
        var form = new MultipartFormDataContent
        {
            { new StringContent("initiativ"), "position" },
            { new StringContent(name), "name" },
            { new StringContent("0521 123456"), "phone" },
            { new StringContent(qualification), "qualification" },
            { new StringContent("true"), "consent" },
            { new StringContent(token), "formToken" },
        };
        if (website is not null)
        {
            form.Add(new StringContent(website), "website");
        }
        if (resume is { } file)
        {
            var content = new ByteArrayContent(file.Content);
            content.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
            form.Add(content, "resume", file.FileName);
        }
        return form;
    }

    private async Task<JobApplication?> FindAsync(string name)
    {
        await using var scope = factory.Services.CreateAsyncScope();
        return await scope.ServiceProvider.GetRequiredService<AppDbContext>().JobApplications
            .SingleOrDefaultAsync(application => application.Name == name, TestContext.Current.CancellationToken);
    }

    public static TheoryData<string, string, string> SupportedFiles => new()
    {
        { "pdf", "lebenslauf.pdf", "application/pdf" },
        { "jpeg", "lebenslauf.jpg", "image/jpeg" },
        { "png", "lebenslauf.png", "image/png" },
    };

    [Theory]
    [MemberData(nameof(SupportedFiles))]
    public async Task Stores_the_application_and_the_resume_encrypted(string kind, string fileName, string contentType)
    {
        var cancellationToken = TestContext.Current.CancellationToken;
        using var client = factory.CreateClient();
        var name = $"Bewerbung {Guid.NewGuid()}";
        var bytes = kind switch { "pdf" => Pdf, "jpeg" => Jpeg, _ => Png };
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsync(Path, Form(token, name, (bytes, fileName, contentType)), cancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var stored = await FindAsync(name);
        Assert.NotNull(stored);
        Assert.Equal("initiativ", stored.Position);
        Assert.Equal("pflegefachkraft", stored.Qualification);
        Assert.Equal(contentType, stored.ResumeContentType);
        Assert.Equal(Consent.CurrentVersion, stored.ConsentVersion);
        Assert.NotNull(stored.ResumeFileId);

        await using var scope = factory.Services.CreateAsyncScope();
        var store = scope.ServiceProvider.GetRequiredService<EncryptedFileStore>();
        var onDisk = await File.ReadAllBytesAsync(store.PathFor(stored.ResumeFileId.Value), cancellationToken);
        Assert.False(onDisk.AsSpan().StartsWith(bytes.AsSpan(0, 3)), "The file must not be stored in plain text.");
        Assert.DoesNotContain(fileName, Directory.GetFiles(factory.FilesPath).Select(System.IO.Path.GetFileName));
        Assert.Equal(bytes, await store.ReadAsync(stored.ResumeFileId.Value, cancellationToken));
    }

    [Fact]
    public async Task Stores_an_application_without_resume()
    {
        using var client = factory.CreateClient();
        var name = $"Bewerbung {Guid.NewGuid()}";
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsync(Path, Form(token, name), TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var stored = await FindAsync(name);
        Assert.NotNull(stored);
        Assert.Null(stored.ResumeFileId);
        Assert.Null(stored.ResumeContentType);
    }

    [Fact]
    public async Task Accepts_empty_optional_fields_as_browsers_send_them()
    {
        using var client = factory.CreateClient();
        var name = $"Bewerbung {Guid.NewGuid()}";
        var token = await factory.GetValidFormTokenAsync(client);
        using var form = Form(token, name);
        form.Add(new StringContent(""), "email");
        form.Add(new StringContent(""), "message");
        form.Add(new StringContent(""), "website");

        var response = await client.PostAsync(Path, form, TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        var stored = await FindAsync(name);
        Assert.NotNull(stored);
        Assert.Null(stored.Email);
        Assert.Null(stored.Message);
    }

    public static TheoryData<byte[], string, string> FakedFiles => new()
    {
        { "MZ\u0090\0\u0003\0\0\0"u8.ToArray(), "lebenslauf.pdf", "application/pdf" },
        { "Das ist kein Bild."u8.ToArray(), "foto.png", "image/png" },
        { "<script>alert(1)</script>"u8.ToArray(), "lebenslauf.jpg", "image/jpeg" },
    };

    [Theory]
    [MemberData(nameof(FakedFiles))]
    public async Task Rejects_files_whose_content_does_not_match_an_allowed_type(byte[] content, string fileName, string contentType)
    {
        using var client = factory.CreateClient();
        var name = $"Bewerbung {Guid.NewGuid()}";
        var filesBefore = factory.StoredFileCount;
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsync(Path, Form(token, name, (content, fileName, contentType)), TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([ApplicationMessages.ResumeType], errors["resume"]);
        Assert.Null(await FindAsync(name));
        Assert.Equal(filesBefore, factory.StoredFileCount);
    }

    [Fact]
    public async Task Rejects_files_larger_than_10_megabytes()
    {
        using var client = factory.CreateClient();
        var name = $"Bewerbung {Guid.NewGuid()}";
        var content = new byte[ResumeFileValidator.MaxBytes + 1];
        Pdf.CopyTo(content, 0);
        var token = await factory.GetValidFormTokenAsync(client);

        var response = await client.PostAsync(Path, Form(token, name, (content, "lebenslauf.pdf", "application/pdf")), TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([ApplicationMessages.ResumeTooLarge], errors["resume"]);
        Assert.Null(await FindAsync(name));
    }

    [Fact]
    public async Task Returns_german_field_errors_for_missing_fields()
    {
        using var client = factory.CreateClient();
        var token = await factory.GetValidFormTokenAsync(client);
        using var form = new MultipartFormDataContent { { new StringContent(token), "formToken" } };

        var response = await client.PostAsync(Path, form, TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([ApplicationMessages.PositionRequired], errors["position"]);
        Assert.Equal([ApplicationMessages.NameRequired], errors["name"]);
        Assert.Equal([ApplicationMessages.PhoneRequired], errors["phone"]);
        Assert.Equal([ApplicationMessages.QualificationRequired], errors["qualification"]);
        Assert.Equal([ApplicationMessages.ConsentRequired], errors["consent"]);
    }

    [Fact]
    public async Task Addresses_applicants_informally_when_the_form_expired()
    {
        using var client = factory.CreateClient();

        using var form = Form("abgelaufen", "Test");
        var response = await client.PostAsync(Path, form, TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([ApplicationMessages.FormExpired], errors["form"]);
    }

    [Theory]
    [InlineData("pflegefachkraft")]
    [InlineData("pflegehilfskraft")]
    [InlineData("hauswirtschaft-betreuung")]
    [InlineData("ausbildung")]
    [InlineData("andere")]
    public async Task Accepts_every_qualification_offered_in_the_form(string qualification)
    {
        var cancellationToken = TestContext.Current.CancellationToken;
        using var client = factory.CreateClient();
        var name = $"Bewerbung {Guid.NewGuid()}";
        var token = await factory.GetValidFormTokenAsync(client);

        using var form = Form(token, name, qualification: qualification);
        var response = await client.PostAsync(Path, form, cancellationToken);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.Equal(qualification, (await FindAsync(name))?.Qualification);
    }

    [Fact]
    public async Task Rejects_an_unknown_qualification()
    {
        using var client = factory.CreateClient();
        var token = await factory.GetValidFormTokenAsync(client);
        using var form = Form(token, "Test", qualification: "chefarzt");

        var response = await client.PostAsync(Path, form, TestContext.Current.CancellationToken);

        var errors = await ProblemDetailsAssertions.ReadFieldErrorsAsync(response);
        Assert.Equal([ApplicationMessages.QualificationRequired], errors["qualification"]);
    }

    [Fact]
    public async Task Writes_no_file_for_suspected_bots()
    {
        using var client = factory.CreateClient();
        var filesBefore = factory.StoredFileCount;
        var honeypotName = $"Bot {Guid.NewGuid()}";
        var tooFastName = $"Bot {Guid.NewGuid()}";
        var resume = (Pdf, "lebenslauf.pdf", "application/pdf");

        var honeypot = await client.PostAsync(
            Path,
            Form(await factory.GetValidFormTokenAsync(client), honeypotName, resume, website: "https://spam.example"),
            TestContext.Current.CancellationToken);
        var tooFast = await client.PostAsync(
            Path,
            Form(await ApiFactory.GetFormTokenAsync(client), tooFastName, resume),
            TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.Created, honeypot.StatusCode);
        Assert.Equal(HttpStatusCode.Created, tooFast.StatusCode);
        Assert.Null(await FindAsync(honeypotName));
        Assert.Null(await FindAsync(tooFastName));
        Assert.Equal(filesBefore, factory.StoredFileCount);
    }

    [Fact]
    public async Task Answers_malformed_form_data_with_a_client_error()
    {
        using var client = factory.CreateClient();
        var token = await factory.GetValidFormTokenAsync(client);
        using var form = new MultipartFormDataContent
        {
            { new StringContent("initiativ"), "position" },
            { new StringContent("Test"), "name" },
            { new StringContent("0521 123456"), "phone" },
            { new StringContent("pflegefachkraft"), "qualification" },
            { new StringContent("vielleicht"), "consent" },
            { new StringContent(token), "formToken" },
        };

        var response = await client.PostAsync(Path, form, TestContext.Current.CancellationToken);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }
}
