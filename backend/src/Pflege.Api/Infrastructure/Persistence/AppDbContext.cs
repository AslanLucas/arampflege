using Microsoft.EntityFrameworkCore;

namespace Pflege.Api.Infrastructure.Persistence;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options);
