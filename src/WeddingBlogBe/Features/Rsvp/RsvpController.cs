using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WeddingBlogBe.Data;

namespace WeddingBlogBe.Features.Rsvp;

[ApiController]
[Route("api/rsvp")]
public sealed class RsvpController(WeddingBlogDbContext dbContext) : ControllerBase
{
    private static readonly string[] AllowedAttendanceValues = ["yes", "maybe", "no"];

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
            GuestName = request.GuestName!.Trim(),
            Attendance = request.Attendance!.Trim().ToLowerInvariant(),
            GuestsCount = request.GuestsCount,
            DietaryNotes = NormalizeOptionalText(request.DietaryNotes),
            Message = NormalizeOptionalText(request.Message),
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
                response.GuestName,
                response.Attendance,
                response.GuestsCount,
                response.DietaryNotes,
                response.Message,
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
        if (string.IsNullOrWhiteSpace(request.GuestName))
        {
            return "Guest name is required.";
        }

        if (string.IsNullOrWhiteSpace(request.Attendance))
        {
            return "Attendance is required.";
        }

        if (!AllowedAttendanceValues.Contains(request.Attendance.Trim().ToLowerInvariant()))
        {
            return "Attendance must be yes, maybe or no.";
        }

        if (request.GuestsCount < 0 || request.GuestsCount > 12)
        {
            return "Guests count must be between 0 and 12.";
        }

        return null;
    }

    private static string? NormalizeOptionalText(string? value)
    {
        var normalizedValue = value?.Trim();

        return string.IsNullOrWhiteSpace(normalizedValue) ? null : normalizedValue;
    }
}
