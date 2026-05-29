using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace WeddingBlogBe.Features.Auth;

public static class IdentitySeeder
{
    public static async Task SeedAdminAsync(IServiceProvider services)
    {
        var options = services.GetRequiredService<IOptions<IdentitySeedOptions>>().Value;

        if (string.IsNullOrWhiteSpace(options.AdminUserName) || string.IsNullOrWhiteSpace(options.AdminPassword))
        {
            return;
        }

        var userManager = services.GetRequiredService<UserManager<IdentityUser>>();
        var adminUser = await userManager.FindByNameAsync(options.AdminUserName);

        if (adminUser is not null)
        {
            return;
        }

        adminUser = new IdentityUser
        {
            UserName = options.AdminUserName,
            EmailConfirmed = true
        };

        var result = await userManager.CreateAsync(adminUser, options.AdminPassword);

        if (!result.Succeeded)
        {
            var errors = string.Join(", ", result.Errors.Select(error => error.Description));
            throw new InvalidOperationException($"Unable to seed admin user: {errors}");
        }
    }
}
