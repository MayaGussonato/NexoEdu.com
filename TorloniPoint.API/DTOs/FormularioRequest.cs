namespace TorloniPoint.API.DTOs;

public class FormularioRequest
{
    public string Turma { get; set; } = "";

    public string Lider { get; set; } = "";

    public bool SalaLimpa { get; set; }

    public bool CarteirasOrganizadas { get; set; }

    public bool Patrimonio { get; set; }

    public bool Organizacao { get; set; }

    public bool Participacao { get; set; }

    public bool RespeitoCombinados { get; set; }

    public bool Materiais { get; set; }

    public bool RespeitoColegas { get; set; }

    public bool RespeitoProfessores { get; set; }

    public bool BoaConvivencia { get; set; }

    public bool Colaboracao { get; set; }

    public bool SemCelular { get; set; }

    public string Observacoes { get; set; } = "";
}