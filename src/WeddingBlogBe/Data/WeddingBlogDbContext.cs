using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WeddingBlogBe.Features.Rsvp;

namespace WeddingBlogBe.Data;

public sealed class WeddingBlogDbContext(DbContextOptions<WeddingBlogDbContext> options) : IdentityDbContext(options)
{
    public DbSet<RsvpResponse> RsvpResponses => Set<RsvpResponse>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<RsvpResponse>(entity =>
        {
            entity.HasKey(response => response.Id);
            entity.HasIndex(response => response.CreatedAtUtc);
            entity.Property(response => response.GuestName).HasMaxLength(160).IsRequired();
            entity.Property(response => response.Attendance).HasMaxLength(32).IsRequired();
            entity.Property(response => response.DietaryNotes).HasMaxLength(1000);
            entity.Property(response => response.Message).HasMaxLength(1000);
            entity.Property(response => response.CreatedAtUtc).IsRequired();
        });
    }
}
