namespace TorloniPoint.API.Models;

public class Usuario
{
    public int Id { get; set; }

    public string Nome { get; set; } = "";

    public string RA { get; set; } = "";

    public string Email { get; set; } = "";

    public string Senha { get; set; } = "";

    public string Perfil { get; set; } = "";

    public string Turma { get; set; } = "";

    public bool Ativo { get; set; } = true;
}