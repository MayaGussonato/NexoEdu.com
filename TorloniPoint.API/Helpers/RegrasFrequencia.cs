namespace TorloniPoint.API.Helpers;

public static class RegrasFrequencia
{
    private static readonly Dictionary<string, DayOfWeek[]> DiasSenaiPorTurma = new()
    {
        { "2A", new[] { DayOfWeek.Tuesday, DayOfWeek.Thursday } },
        { "3A", new[] { DayOfWeek.Tuesday, DayOfWeek.Thursday } },
        { "2B", new[] { DayOfWeek.Wednesday, DayOfWeek.Friday } },
        { "3B", new[] { DayOfWeek.Wednesday, DayOfWeek.Friday } },
    };

    public static bool EhDiaSenai(string turma, DateTime data)
    {
        return DiasSenaiPorTurma.TryGetValue(turma, out var dias)
            && dias.Contains(data.DayOfWeek);
    }
}