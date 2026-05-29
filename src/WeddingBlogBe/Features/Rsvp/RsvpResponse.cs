namespace WeddingBlogBe.Features.Rsvp;

public sealed class RsvpResponse
{
    public int Id { get; set; }

    public required string FirstName { get; set; }

    public required string LastName { get; set; }

    public int AdultsCount { get; set; }

    public int ChildrenCount { get; set; }

    public string? FoodNotes { get; set; }

    public DateTime CreatedAtUtc { get; set; }
}
