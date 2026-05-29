namespace WeddingBlogBe.Features.Auth;

public sealed class IdentitySeedOptions
{
    public const string SectionName = "IdentitySeed";

    public string AdminUserName { get; init; } = string.Empty;

    public string AdminPassword { get; init; } = string.Empty;
}
