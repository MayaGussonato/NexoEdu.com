using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TorloniPoint.API.Data;
using TorloniPoint.API.DTOs;
using TorloniPoint.API.Models;

namespace TorloniPoint.API.Controllers;

[ApiController]
[Route("api/formulario")]
public class FormularioController : ControllerBase
{
    private readonly AppDbContext _context;

    public FormularioController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public async Task<IActionResult> Salvar(FormularioRequest request)
    {
        bool respondeuHoje = await _context.FormulariosDiarios.AnyAsync(f =>
            f.Turma == request.Turma &&
            f.Data.Date == DateTime.Today);

        if (respondeuHoje)
        {
            return BadRequest(new
            {
                mensagem = "Esta turma já respondeu hoje."
            });
        }

        var formulario = new FormularioDiario
        {
            Turma = request.Turma,
            Lider = request.Lider,
            Data = DateTime.Now,

            SalaLimpa = request.SalaLimpa,
            CarteirasOrganizadas = request.CarteirasOrganizadas,
            Patrimonio = request.Patrimonio,
            Organizacao = request.Organizacao,
            Participacao = request.Participacao,
            RespeitoCombinados = request.RespeitoCombinados,
            Materiais = request.Materiais,
            RespeitoColegas = request.RespeitoColegas,
            RespeitoProfessores = request.RespeitoProfessores,
            BoaConvivencia = request.BoaConvivencia,
            Colaboracao = request.Colaboracao,
            SemCelular = request.SemCelular,
            Observacoes = request.Observacoes
        };

        _context.FormulariosDiarios.Add(formulario);

        await _context.SaveChangesAsync();

        return Ok(new
        {
            mensagem = "Formulário enviado com sucesso."
        });
    }
}