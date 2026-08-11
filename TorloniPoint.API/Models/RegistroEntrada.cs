namespace TorloniPoint.API.Models;

public class RegistroEntrada
{
    public int Id { get; set; }

    public int AlunoId { get; set; }
    public Aluno Aluno { get; set; } = null!;

    public DateTime DataHora { get; set; }

    public string Situacao { get; set; } = "";
}