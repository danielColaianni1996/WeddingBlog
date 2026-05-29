namespace WeddingBlogBe.Features.Rsvp;

public sealed record CreateRsvpResponseRequest(
    string? GuestName,
    string? Attendance,
    int GuestsCount,
    string? DietaryNotes,
    string? Message);

public sealed record RsvpResponseDto(
    int Id,
    string GuestName,
    string Attendance,
    int GuestsCount,
    string? DietaryNotes,
    string? Message,
    DateTime CreatedAtUtc);
