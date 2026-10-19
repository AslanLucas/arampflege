using Microsoft.EntityFrameworkCore;
using Pflege.Api.Features.Callback;
using Pflege.Api.Features.Contact;

namespace Pflege.Api.Infrastructure.Persistence;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<CallbackRequest> CallbackRequests => Set<CallbackRequest>();
    public DbSet<ContactRequest> ContactRequests => Set<ContactRequest>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CallbackRequest>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(30);
            entity.Property(e => e.Location).HasMaxLength(100);
            entity.Property(e => e.PreferredTime).HasMaxLength(20);
            entity.Property(e => e.ConsentVersion).HasMaxLength(50);
            entity.HasIndex(e => e.CreatedAt);
            entity.HasIndex(e => e.NotifiedAt);
        });

        modelBuilder.Entity<ContactRequest>(entity =>
        {
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.Phone).HasMaxLength(30);
            entity.Property(e => e.Email).HasMaxLength(254);
            entity.Property(e => e.Message).HasMaxLength(2000);
            entity.Property(e => e.ConsentVersion).HasMaxLength(50);
            entity.HasIndex(e => e.CreatedAt);
            entity.HasIndex(e => e.NotifiedAt);
        });
    }
}
