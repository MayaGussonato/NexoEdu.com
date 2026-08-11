using Microsoft.AspNetCore.Mvc;
using TorloniPoint.API.Helpers;

namespace TorloniPoint.API.Controllers;

[ApiController]
[Route("api/professores")]
public class ProfessoresController : ControllerBase
{
    [HttpGet("turmas-hoje")]
    public IActionResult ObterTurmasHoje(string email)
    {
        var turmas = HorarioProfessores.ObterTurmasDoProfessor(email, DateTime.Today);

        return Ok(new { turmas });
    }

    [HttpGet("turmas")]
    public IActionResult ObterTodasTurmas(string email)
    {
        var turmas = HorarioProfessores.ObterTodasTurmasDoProfessor(email);

        return Ok(new { turmas });
    }
}