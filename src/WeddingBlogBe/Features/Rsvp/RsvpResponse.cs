namespace WeddingBlogBe.Features.Rsvp;

public sealed class RsvpResponse
{
    public int Id { get; set; }

    public required string GuestName { get; set; }

    public required string Attendance { get; set; }

    public int GuestsCount { get; set; }

    public string? DietaryNotes { get; set; }

    public string? Message { get; set; }

    public DateTime CreatedAtUtc { get; set; }
}
