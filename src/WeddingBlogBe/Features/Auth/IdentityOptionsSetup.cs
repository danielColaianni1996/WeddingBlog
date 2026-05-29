using Microsoft.AspNetCore.Identity;

namespace WeddingBlogBe.Features.Auth;

public static class IdentityOptionsSetup
{
    public static void Configure(IdentityOptions options)
    {
        options.User.RequireUniqueEmail = false;

        options.Password.RequireDigit = false;
        options.Password.RequireLowercase = false;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = false;
        options.Password.RequiredLength = 8;

        options.Lockout.AllowedForNewUsers = true;
        options.Lockout.MaxFailedAccessAttempts = 5;
        options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(10);
    }
}
