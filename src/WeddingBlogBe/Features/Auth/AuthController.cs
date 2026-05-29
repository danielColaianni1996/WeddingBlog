using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace WeddingBlogBe.Features.Auth;

[ApiController]
[Route("api/auth")]
public sealed class AuthController(
    SignInManager<IdentityUser> signInManager,
    UserManager<IdentityUser> userManager) : ControllerBase
{
    [HttpPost("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Username) || string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { error = "Username and password are required." });
        }

        var user = await userManager.FindByNameAsync(request.Username.Trim());

        if (user is null)
        {
            return Unauthorized();
        }

        var result = await signInManager.PasswordSignInAsync(
            user,
            request.Password,
            isPersistent: true,
            lockoutOnFailure: true);

        return result.Succeeded ? Ok(new LoginResponse(user.UserName ?? request.Username)) : Unauthorized();
    }

    [HttpPost("logout")]
    [Authorize]
    public async Task<IActionResult> Logout()
    {
        await signInManager.SignOutAsync();

        return NoContent();
    }

    [HttpGet("me")]
    [Authorize]
    public IActionResult Me() => Ok(new LoginResponse(User.Identity?.Name ?? string.Empty));
}
