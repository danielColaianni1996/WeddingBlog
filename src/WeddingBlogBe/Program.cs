using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using WeddingBlogBe.Data;
using WeddingBlogBe.Features.Auth;

var builder = WebApplication.CreateBuilder(args);

const string frontendCorsPolicy = "WeddingBlogApp";
var connectionString = builder.Configuration.GetConnectionString("WeddingBlogDb")
    ?? "Data Source=WeddingBlog.dev.db";

builder.Services.AddOpenApi();
builder.Services.AddDbContext<WeddingBlogDbContext>(options => options.UseSqlite(connectionString));
builder.Services.AddIdentity<IdentityUser, IdentityRole>(IdentityOptionsSetup.Configure)
    .AddEntityFrameworkStores<WeddingBlogDbContext>();
builder.Services.Configure<IdentitySeedOptions>(builder.Configuration.GetSection(IdentitySeedOptions.SectionName));
builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.Name = "WeddingBlog.Admin";
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
    options.Events.OnRedirectToAccessDenied = context =>
    {
        context.Response.StatusCode = StatusCodes.Status403Forbidden;
        return Task.CompletedTask;
    };
});
builder.Services.AddAuthorization();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsPolicy, policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(frontendCorsPolicy);
app.UseAuthentication();
app.UseAuthorization();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<WeddingBlogDbContext>();
    await dbContext.Database.EnsureCreatedAsync();
    await IdentitySeeder.SeedAdminAsync(scope.ServiceProvider);
}

app.MapControllers();

app.Run();
