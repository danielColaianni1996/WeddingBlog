using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeddingBlogBe.Data;

namespace WeddingBlogBe.Features.Rsvp;

[ApiController]
[Route("api/rsvp")]
public sealed class RsvpController(WeddingBlogDbContext dbContext) : ControllerBase
{
    [HttpPost]
    [AllowAnonymous]
    public async Task<IActionResult> Create(CreateRsvpResponseRequest request)
    {
        var validationError = Validate(request);

        if (validationError is not null)
        {
            return BadRequest(new { error = validationError });
        }

        var response = new RsvpResponse
        {
            FirstName = request.FirstName!.Trim(),
            LastName = request.LastName!.Trim(),
            AdultsCount = request.AdultsCount,
            ChildrenCount = request.ChildrenCount,
            FoodNotes = NormalizeOptionalText(request.FoodNotes),
            CreatedAtUtc = DateTime.UtcNow
        };

        dbContext.RsvpResponses.Add(response);
        await dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = response.Id }, response.ToDto());
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IReadOnlyList<RsvpResponseDto>>> GetAll()
    {
        var responses = await dbContext.RsvpResponses
            .AsNoTracking()
            .OrderByDescending(response => response.CreatedAtUtc)
            .Select(response => new RsvpResponseDto(
                response.Id,
                response.FirstName,
                response.LastName,
                response.AdultsCount,
                response.ChildrenCount,
                response.FoodNotes,
                response.CreatedAtUtc))
            .ToListAsync();

        return Ok(responses);
    }

    [HttpGet("{id:int}")]
    [Authorize]
    public async Task<ActionResult<RsvpResponseDto>> GetById(int id)
    {
        var response = await dbContext.RsvpResponses
            .AsNoTracking()
            .FirstOrDefaultAsync(response => response.Id == id);

        return response is null ? NotFound() : Ok(response.ToDto());
    }

    private static string? Validate(CreateRsvpResponseRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.FirstName))
        {
            return "First name is required.";
        }

        if (string.IsNullOrWhiteSpace(request.LastName))
        {
            return "Last name is required.";
        }

        if (request.AdultsCount < 1 || request.AdultsCount > 12)
        {
            return "Adults count must be between 1 and 12.";
        }

        if (request.ChildrenCount < 0 || request.ChildrenCount > 12)
        {
            return "Children count must be between 0 and 12.";
        }

        if (request.AdultsCount + request.ChildrenCount > 12)
        {
            return "Total guests count cannot be greater than 12.";
        }

        return null;
    }

    private static string? NormalizeOptionalText(string? value)
    {
        var normalizedValue = value?.Trim();

        return string.IsNullOrWhiteSpace(normalizedValue) ? null : normalizedValue;
    }
}
