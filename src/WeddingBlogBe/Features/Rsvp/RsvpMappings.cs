namespace WeddingBlogBe.Features.Rsvp;

public static class RsvpMappings
{
    public static RsvpResponseDto ToDto(this RsvpResponse response) =>
        new(
            response.Id,
            response.FirstName,
            response.LastName,
            response.AdultsCount,
            response.ChildrenCount,
            response.FoodNotes,
            response.CreatedAtUtc);
}
