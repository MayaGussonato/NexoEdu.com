using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TorloniPoint.API.Data;
using TorloniPoint.API.DTOs;

namespace TorloniPoint.API.Controllers;

[ApiController]
[Route("api/login")]
public class LoginController : ControllerBase
{
    private readonly AppDbContext _context;

    public LoginController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var usuario = await _context.Usuarios
            .FirstOrDefaultAsync(u =>
                u.Email.ToLower() == request.Email.ToLower() &&
                u.Senha == request.Senha &&
                u.Ativo);

        if (usuario == null)
        {
            return Unauthorized(new
            {
                mensagem = "E-mail ou senha inválidos."
            });
        }

        var turmas = usuario.Turma
            .Split(',', StringSplitOptions.RemoveEmptyEntries | StringSplitOptions.TrimEntries)
            .ToList();

        return Ok(new
        {
            nome = usuario.Nome,
            email = usuario.Email,
            perfil = usuario.Perfil,
            turma = usuario.Turma,
            turmas
        });
    }
}