namespace TorloniPoint.API.Helpers;

public static class HorarioProfessores
{
    private static readonly Dictionary<DayOfWeek, Dictionary<string, string>> Grade = new()
    {
        [DayOfWeek.Monday] = new()
        {
            ["3A"] = "roselirossi@prof.educacao.sp.gov.br",
            ["3B"] = "mduran@prof.educacao.sp.gov.br",
            ["3C"] = "simonemalvesi@prof.educacao.sp.gov.br",
            ["2B"] = "adairfelipe@prof.educacao.sp.gov.br",
            ["2A"] = "celiamatulevicius@prof.educacao.sp.gov.br",
            ["1A"] = "mossnyi@prof.educacao.sp.gov.br",
            ["1B"] = "rogerias@professor.educacao.sp.gov.br",
            ["1C"] = "ananetto@prof.educacao.sp.gov.br",
        },
        [DayOfWeek.Tuesday] = new()
        {
            ["1A"] = "simonemalvesi@prof.educacao.sp.gov.br",
            ["1B"] = "linandreia@prof.educacao.sp.gov.br",
            ["1C"] = "rogerias@professor.educacao.sp.gov.br",
            ["2B"] = "celiamatulevicius@prof.educacao.sp.gov.br",
            ["3B"] = "mossnyi@prof.educacao.sp.gov.br",
            ["3C"] = "mduran@prof.educacao.sp.gov.br",
        },
        [DayOfWeek.Wednesday] = new()
        {
            ["1A"] = "ivanpires@prof.educacao.sp.gov.br",
            ["1B"] = "marciavasques@prof.educacao.sp.gov.br",
            ["1C"] = "celiamatulevicius@prof.educacao.sp.gov.br",
            ["2A"] = "simonemalvesi@prof.educacao.sp.gov.br",
            ["3A"] = "mduran@prof.educacao.sp.gov.br",
            ["3C"] = "roselirossi@prof.educacao.sp.gov.br",
        },
        [DayOfWeek.Thursday] = new()
        {
            ["1A"] = "ivanpires@prof.educacao.sp.gov.br",
            ["1B"] = "mossnyi@prof.educacao.sp.gov.br",
            ["1C"] = "celiamatulevicius@prof.educacao.sp.gov.br",
            ["2B"] = "rogerias@professor.educacao.sp.gov.br",
            ["3B"] = "mduran@prof.educacao.sp.gov.br",
            ["3C"] = "adairfelipe@prof.educacao.sp.gov.br",
        },
        [DayOfWeek.Friday] = new()
        {
            ["1A"] = "linandreia@prof.educacao.sp.gov.br",
            ["1B"] = "ivanpires@prof.educacao.sp.gov.br",
            ["1C"] = "mossnyi@prof.educacao.sp.gov.br",
            ["2A"] = "rogerias@professor.educacao.sp.gov.br",
            ["3A"] = "renatanrodrigues@prof.educacao.sp.gov.br",
            ["3C"] = "roselirossi@prof.educacao.sp.gov.br",
        },
    };

    public static List<string> ObterTurmasDoProfessor(string email, DateTime data)
    {
        var emailNormalizado = email.Trim().ToLower();

        if (!Grade.TryGetValue(data.DayOfWeek, out var turmasDoDia))
        {
            return new List<string>();
        }

        return turmasDoDia
            .Where(kv => kv.Value.ToLower() == emailNormalizado)
            .Select(kv => kv.Key)
            .ToList();
    }

    public static List<string> ObterTodasTurmasDoProfessor(string email)
    {
        var emailNormalizado = email.Trim().ToLower();

        return Grade
            .SelectMany(diaGrade => diaGrade.Value)
            .Where(kv => kv.Value.ToLower() == emailNormalizado)
            .Select(kv => kv.Key)
            .Distinct()
            .OrderBy(t => t)
            .ToList();
    }
}