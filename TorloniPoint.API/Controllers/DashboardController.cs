using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TorloniPoint.API.Data;
using TorloniPoint.API.Helpers;

namespace TorloniPoint.API.Controllers;

[ApiController]
[Route("api/dashboard")]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Obter()
    {
        var hoje = DateTime.Today;

        var turmasDistintas = await _context.Alunos
            .Where(a => a.Ativo)
            .Select(a => a.Turma)
            .Distinct()
            .OrderBy(t => t)
            .ToListAsync();

        var resultado = new List<object>();

        foreach (var turma in turmasDistintas)
        {
            var alunosDaTurma = await _context.Alunos
                .Where(a => a.Turma == turma && a.Ativo)
                .ToListAsync();

            var idsAlunos = alunosDaTurma.Select(a => a.Id).ToList();

            var registrosHoje = await _context.RegistrosEntrada
                .Where(r => idsAlunos.Contains(r.AlunoId) && r.DataHora.Date == hoje)
                .ToListAsync();

            var diaSenaiHoje = RegrasFrequencia.EhDiaSenai(turma, hoje);

            var presentes = registrosHoje.Count(r => r.Situacao == "PRESENTE");
            var atrasados = registrosHoje.Count(r => r.Situacao == "ATRASADO");
            var noSenai = registrosHoje.Count(r => r.Situacao == "SENAI");
            var naoRegistrados = diaSenaiHoje ? 0 : (alunosDaTurma.Count - registrosHoje.Count);

            var ultimasEntradas = registrosHoje
                .OrderByDescending(r => r.DataHora)
                .Take(10)
                .Select(r =>
                {
                    var aluno = alunosDaTurma.First(a => a.Id == r.AlunoId);
                    return new
                    {
                        horario = r.DataHora.ToString("HH:mm:ss"),
                        nome = aluno.Nome,
                        turma = aluno.Turma,
                        situacao = r.Situacao
                    };
                })
                .ToList();

            var formulario = await _context.FormulariosDiarios
                .Where(f => f.Turma == turma && f.Data.Date == hoje)
                .FirstOrDefaultAsync();

            resultado.Add(new
            {
                turma,
                totalAlunos = alunosDaTurma.Count,
                presentes,
                atrasados,
                noSenai,
                naoRegistrados,
                diaSenaiHoje,
                formularioRespondido = formulario != null,
                formulario = formulario == null ? null : new
                {
                    lider = formulario.Lider,
                    horario = formulario.Data.ToString("HH:mm"),
                    salaLimpa = formulario.SalaLimpa,
                    carteirasOrganizadas = formulario.CarteirasOrganizadas,
                    patrimonio = formulario.Patrimonio,
                    organizacao = formulario.Organizacao,
                    participacao = formulario.Participacao,
                    respeitoCombinados = formulario.RespeitoCombinados,
                    materiais = formulario.Materiais,
                    respeitoColegas = formulario.RespeitoColegas,
                    respeitoProfessores = formulario.RespeitoProfessores,
                    boaConvivencia = formulario.BoaConvivencia,
                    colaboracao = formulario.Colaboracao,
                    semCelular = formulario.SemCelular,
                    observacoes = formulario.Observacoes
                },
                ultimasEntradas
            });
        }

        return Ok(new { turmas = resultado });
    }

    [HttpGet("semana")]
    public async Task<IActionResult> ObterSemana(string turma, DateTime data)
    {
        var diferencaParaSegunda = ((int)data.DayOfWeek + 6) % 7;
        var segunda = data.Date.AddDays(-diferencaParaSegunda);
        var sexta = segunda.AddDays(4);
        var fimDoDia = sexta.AddDays(1).AddTicks(-1);

        var alunosDaTurma = await _context.Alunos
            .Where(a => a.Turma == turma && a.Ativo)
            .ToListAsync();

        var idsAlunos = alunosDaTurma.Select(a => a.Id).ToList();

        var registrosSemana = await _context.RegistrosEntrada
            .Where(r => idsAlunos.Contains(r.AlunoId) && r.DataHora >= segunda && r.DataHora <= fimDoDia)
            .ToListAsync();

        var atrasosPorAluno = alunosDaTurma
            .Select(a => new
            {
                aluno = a.Nome,
                ra = a.RA,
                totalAtrasos = registrosSemana.Count(r => r.AlunoId == a.Id && r.Situacao == "ATRASADO"),
                totalPresencas = registrosSemana.Count(r => r.AlunoId == a.Id && r.Situacao == "PRESENTE")
            })
            .Select(x => new
            {
                x.aluno,
                x.ra,
                x.totalAtrasos,
                x.totalPresencas,
                alertaAtraso = x.totalAtrasos > 3
            })
            .OrderBy(x => x.aluno)
            .ToList();

        var formulariosSemana = await _context.FormulariosDiarios
            .Where(f => f.Turma == turma && f.Data >= segunda && f.Data <= fimDoDia)
            .OrderBy(f => f.Data)
            .ToListAsync();

        var culturaPtBr = new System.Globalization.CultureInfo("pt-BR");

        return Ok(new
        {
            turma,
            inicioSemana = segunda.ToString("dd/MM/yyyy"),
            fimSemana = sexta.ToString("dd/MM/yyyy"),
            atrasos = atrasosPorAluno,
            formularios = formulariosSemana.Select(f => new
            {
                data = f.Data.ToString("dd/MM/yyyy"),
                diaSemana = culturaPtBr.TextInfo.ToTitleCase(f.Data.ToString("dddd", culturaPtBr)),
                lider = f.Lider,
                horario = f.Data.ToString("HH:mm"),
                observacoes = f.Observacoes
            })
        });
    }
}