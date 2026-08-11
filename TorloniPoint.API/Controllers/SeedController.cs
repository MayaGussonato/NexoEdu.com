using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TorloniPoint.API.Data;

namespace TorloniPoint.API.Controllers;

[ApiController]
[Route("api/seed")]
public class SeedController : ControllerBase
{
    private readonly AppDbContext _context;

    public SeedController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost("sincronizar-usuarios")]
    public async Task<IActionResult> SincronizarUsuarios()
    {
        var usuariosDoSeed = SeedUsuarios.ObterUsuarios();

        var inseridos = new List<string>();
        var atualizados = new List<string>();
        var semAlteracao = new List<string>();

        foreach (var usuarioSeed in usuariosDoSeed)
        {
            var existente = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.Email.ToLower() == usuarioSeed.Email.ToLower());

            if (existente == null)
            {
                _context.Usuarios.Add(usuarioSeed);
                inseridos.Add(usuarioSeed.Email);
                continue;
            }

            bool mudou = false;

            if (existente.Senha != usuarioSeed.Senha)
            {
                existente.Senha = usuarioSeed.Senha;
                mudou = true;
            }

            if (existente.Nome != usuarioSeed.Nome)
            {
                existente.Nome = usuarioSeed.Nome;
                mudou = true;
            }

            if (existente.Perfil != usuarioSeed.Perfil)
            {
                existente.Perfil = usuarioSeed.Perfil;
                mudou = true;
            }

            if (existente.Turma != usuarioSeed.Turma)
            {
                existente.Turma = usuarioSeed.Turma;
                mudou = true;
            }

            if (mudou)
            {
                atualizados.Add(usuarioSeed.Email);
            }
            else
            {
                semAlteracao.Add(usuarioSeed.Email);
            }
        }

        await _context.SaveChangesAsync();

        return Ok(new
        {
            totalInseridos = inseridos.Count,
            inseridos,
            totalAtualizados = atualizados.Count,
            atualizados,
            totalSemAlteracao = semAlteracao.Count
        });
    }
}