var builder = WebApplication.CreateBuilder(args);

const string frontendCorsPolicy = "WeddingBlogApp";

builder.Services.AddOpenApi();
builder.Services.AddCors(options =>
{
    options.AddPolicy(frontendCorsPolicy, policy =>
    {
        policy
            .WithOrigins("http://localhost:5173", "https://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();
app.UseCors(frontendCorsPolicy);

app.MapGet("/", () => Results.Ok(new { name = "WeddingBlog API" }));
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));

app.Run();
