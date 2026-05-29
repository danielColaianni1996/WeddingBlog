namespace WeddingBlogBe.Features.Rsvp;

public sealed record CreateRsvpResponseRequest(
    string? FirstName,
    string? LastName,
    int AdultsCount,
    int ChildrenCount,
    string? FoodNotes);

public sealed record RsvpResponseDto(
    int Id,
    string FirstName,
    string LastName,
    int AdultsCount,
    int ChildrenCount,
    string? FoodNotes,
    DateTime CreatedAtUtc);
