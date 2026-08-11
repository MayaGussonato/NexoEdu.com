using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TorloniPoint.API.Data;
using TorloniPoint.API.DTOs;
using TorloniPoint.API.Helpers;
using TorloniPoint.API.Models;

namespace TorloniPoint.API.Controllers;

[ApiController]
[Route("api/registros")]
public class RegistrosController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _config;

    public RegistrosController(AppDbContext context, IConfiguration config)
    {
        _context = context;
        _config = config;
    }

    [HttpPost("entrada/{ra}")]
    public async Task<IActionResult> RegistrarEntrada(string ra, [FromBody] EntradaRequest? request)
    {
        if (request?.Latitude == null || request?.Longitude == null)
        {
            return BadRequest(new
            {
                mensagem = "Não foi possível confirmar sua localização. Ative o GPS e tente novamente."
            });
        }

        var latEscola = _config.GetValue<double>("Localizacao:Latitude");
        var lngEscola = _config.GetValue<double>("Localizacao:Longitude");
        var raioMetros = _config.GetValue<double>("Localizacao:RaioMetros");

        var distancia = CalcularDistanciaMetros(
            latEscola, lngEscola,
            request.Latitude.Value, request.Longitude.Value);

        if (distancia > raioMetros)
        {
            return StatusCode(403, new
            {
                mensagem = "Check-in permitido apenas dentro da escola."
            });
        }

        ra = ra.Replace("-", "").Replace(" ", "").ToUpper();

        var aluno = await _context.Alunos
            .FirstOrDefaultAsync(a => a.RA == ra && a.Ativo);

        if (aluno == null)
        {
            return NotFound(new
            {
                mensagem = "Aluno não encontrado."
            });
        }

        var agora = DateTime.Now;

        string situacao;

        if (RegrasFrequencia.EhDiaSenai(aluno.Turma, agora))
        {
            situacao = "SENAI";
        }
        else if (agora.DayOfWeek == DayOfWeek.Monday)
        {
            situacao = agora.TimeOfDay > new TimeSpan(8, 55, 0)
                ? "ATRASADO"
                : "PRESENTE";
        }
        else
        {
            situacao = agora.TimeOfDay >= new TimeSpan(7, 15, 0)
                ? "ATRASADO"
                : "PRESENTE";
        }

        bool jaEntrouHoje = await _context.RegistrosEntrada.AnyAsync(r =>
            r.AlunoId == aluno.Id &&
            r.DataHora.Date == agora.Date);

        if (jaEntrouHoje)
        {
            return Conflict(new
            {
                mensagem = "Entrada já registrada hoje."
            });
        }

        var registro = new RegistroEntrada
        {
            AlunoId = aluno.Id,
            DataHora = agora,
            Situacao = situacao
        };

        _context.RegistrosEntrada.Add(registro);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            aluno = aluno.Nome,
            ra = aluno.RA,
            turma = aluno.Turma,
            funcao = aluno.Funcao,
            horario = agora.ToString("HH:mm:ss"),
            data = agora.ToString("dd/MM/yyyy"),
            situacao
        });
    }

    private static double CalcularDistanciaMetros(double lat1, double lon1, double lat2, double lon2)
    {
        const double raioTerraKm = 6371;

        double DegreesToRadians(double graus) => graus * Math.PI / 180;

        var dLat = DegreesToRadians(lat2 - lat1);
        var dLon = DegreesToRadians(lon2 - lon1);

        var a = Math.Sin(dLat / 2) * Math.Sin(dLat / 2) +
                Math.Cos(DegreesToRadians(lat1)) * Math.Cos(DegreesToRadians(lat2)) *
                Math.Sin(dLon / 2) * Math.Sin(dLon / 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));

        var distanciaKm = raioTerraKm * c;

        return distanciaKm * 1000;
    }
}