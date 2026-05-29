namespace WeddingBlogBe.Features.Rsvp;

public static class RsvpMappings
{
    public static RsvpResponseDto ToDto(this RsvpResponse response) =>
        new(
            response.Id,
            response.GuestName,
            response.Attendance,
            response.GuestsCount,
            response.DietaryNotes,
            response.Message,
            response.CreatedAtUtc);
}
