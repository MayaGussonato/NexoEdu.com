using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TorloniPoint.API.Data;

namespace TorloniPoint.API.Controllers;

[ApiController]
[Route("api/alunos")]
public class AlunosController : ControllerBase
{
    private readonly AppDbContext _context;

    public AlunosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("ra/{ra}")]
    public async Task<IActionResult> BuscarPorRa(string ra)
    {
        // Remove hífen, espaços e deixa tudo maiúsculo
        var raLimpo = ra
            .Replace("-", "")
            .Replace(" ", "")
            .ToUpper();

        var aluno = await _context.Alunos
            .FirstOrDefaultAsync(a => a.RA == raLimpo && a.Ativo);

        if (aluno == null)
        {
            return NotFound(new
            {
                mensagem = "Aluno não encontrado"
            });
        }

        return Ok(new
        {
            aluno.Id,
            aluno.Nome,
            aluno.RA,
            aluno.Turma,
            aluno.Funcao,
            aluno.Ativo
        });
    }
}