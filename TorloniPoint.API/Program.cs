using Microsoft.EntityFrameworkCore;
using TorloniPoint.API.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.OpenApiInfo
    {
        Title = "Torloni Point API",
        Version = "v1"
    });
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(
        builder.Configuration.GetConnectionString("DefaultConnection")
    )
);

builder.Services.AddCors(options =>
{
    options.AddPolicy("Frontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(options =>
{
    options.SwaggerEndpoint("/swagger/v1/swagger.json", "Torloni Point API v1");
});

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    db.Database.Migrate();

    // ==========================
    // ALUNOS
    // ==========================

    if (!db.Alunos.Any())
    {
        var alunos = SeedAlunos.ObterAlunos();

        db.Alunos.AddRange(alunos);

        db.SaveChanges();

        Console.WriteLine($"✅ {alunos.Count} alunos cadastrados.");
    }

    // ==========================
    // USUÁRIOS
    // ==========================

    if (!db.Usuarios.Any())
    {
        var usuarios = SeedUsuarios.ObterUsuarios();

        db.Usuarios.AddRange(usuarios);

        db.SaveChanges();

        Console.WriteLine($"✅ {usuarios.Count} usuários cadastrados.");
    }
}

app.UseCors("Frontend");

app.MapControllers();

app.Run();