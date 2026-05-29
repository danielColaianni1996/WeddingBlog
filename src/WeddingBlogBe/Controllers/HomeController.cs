using Microsoft.AspNetCore.Mvc;

namespace WeddingBlogBe.Controllers;

[ApiController]
[Route("")]
public sealed class HomeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get() => Ok(new { name = "WeddingBlog API" });
}
