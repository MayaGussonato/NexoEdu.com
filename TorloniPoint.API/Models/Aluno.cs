namespace TorloniPoint.API.Models;

public class Aluno
{
    public int Id { get; set; }

    public string Nome { get; set; } = string.Empty;

    public string RA { get; set; } = string.Empty;

    public string Turma { get; set; } = string.Empty;

    public string Funcao { get; set; } = "Aluno";

    public bool Ativo { get; set; } = true;
}