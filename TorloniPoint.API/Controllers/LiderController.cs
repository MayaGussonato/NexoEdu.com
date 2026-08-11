using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TorloniPoint.API.Data;

namespace TorloniPoint.API.Controllers;

[ApiController]
[Route("api/lider")]
public class LiderController : ControllerBase
{
    private readonly AppDbContext _context;

    public LiderController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet("{turma}")]
    public async Task<IActionResult> Dashboard(string turma)
    {
        var hoje = DateTime.Today;

        var total = await _context.Alunos
            .CountAsync(a => a.Turma == turma);

        var presentes = await _context.RegistrosEntrada
            .Include(r => r.Aluno)
            .CountAsync(r =>
                r.Aluno.Turma == turma &&
                r.DataHora.Date == hoje);

        var atrasados = await _context.RegistrosEntrada
            .Include(r => r.Aluno)
            .CountAsync(r =>
                r.Aluno.Turma == turma &&
                r.DataHora.Date == hoje &&
                r.Situacao == "ATRASADO");

        var ultimas = await _context.RegistrosEntrada
            .Include(r => r.Aluno)
            .Where(r =>
                r.Aluno.Turma == turma &&
                r.DataHora.Date == hoje)
            .OrderByDescending(r => r.DataHora)
            .Take(10)
            .Select(r => new
            {
                horario = r.DataHora.ToString("HH:mm"),
                nome = r.Aluno.Nome,
                situacao = r.Situacao
            })
            .ToListAsync();

        return Ok(new
        {
            total,
            presentes,
            atrasados,
            naoChegaram = total - presentes,
            ultimas
        });
    }
}