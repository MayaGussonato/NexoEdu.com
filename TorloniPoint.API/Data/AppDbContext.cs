using Microsoft.EntityFrameworkCore;
using TorloniPoint.API.Models;

namespace TorloniPoint.API.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<Aluno> Alunos => Set<Aluno>();

    public DbSet<RegistroEntrada> RegistrosEntrada => Set<RegistroEntrada>();

    public DbSet<Usuario> Usuarios => Set<Usuario>();

    public DbSet<FormularioDiario> FormulariosDiarios => Set<FormularioDiario>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Aluno>()
            .HasIndex(a => a.RA)
            .IsUnique();

        modelBuilder.Entity<Usuario>()
            .HasIndex(u => u.Email)
            .IsUnique();
    }
}