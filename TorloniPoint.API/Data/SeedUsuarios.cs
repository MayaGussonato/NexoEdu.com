using TorloniPoint.API.Models;

namespace TorloniPoint.API.Data;

public static class SeedUsuarios
{
    public static List<Usuario> ObterUsuarios()
    {
        return new List<Usuario>
        {

            // ===========================
            // COORDENAÇÃO
            // ===========================

            new Usuario
            {
                Nome = "Milena Frare",
                RA = "",
                Email = "milenafrare@prof.educacao.sp.gov.br",
                Senha = "Coordenacao@2026",
                Perfil = "COORDENACAO",
                Turma = "TODAS"
            },

            new Usuario
            {
                Nome = "Francisca Jorge",
                RA = "",
                Email = "franciscajorge@prof.educacao.sp.gov.br",
                Senha = "Coordenacao@2026",
                Perfil = "COORDENACAO",
                Turma = "TODAS"
            },

            // ===========================
            // PROFESSORES
            // ===========================

            new Usuario { Nome = "ROSELI ANDRADE ROSSI", RA = "", Email = "roselirossi@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "MARIA CÉLIA PEREIRA DURAN", RA = "", Email = "mduran@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "SIMONE MALVESI DE POLI", RA = "", Email = "simonemalvesi@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "ADAIR FELIPE DE MEDEIROS DA SILVA", RA = "", Email = "adairfelipe@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "CÉLIA ANDRADE MATULEVICIUS", RA = "", Email = "celiamatulevicius@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "IVAN MOSSNYI", RA = "", Email = "mossnyi@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "ROGÉRIA CRISTINA DA SILVA", RA = "", Email = "rogerias@professor.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "ANA CLAUDIA NETTO", RA = "", Email = "ananetto@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "LINANDREIA CHAVES FARIAS", RA = "", Email = "linandreia@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "IVAN PAULO DE ARAUJO PIRES", RA = "", Email = "ivanpires@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "MÁRCIA ROSANA VASQUES GOMES", RA = "", Email = "marciavasques@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },
            new Usuario { Nome = "RENATA DAS NEVES RODRIGUES", RA = "", Email = "renatanrodrigues@prof.educacao.sp.gov.br", Senha = "Professor@2026", Perfil = "PROFESSOR", Turma = "" },

            // ===========================
            // 1A
            // ===========================

            new Usuario
            {
                Nome = "MARIA EDUARDA MACEDO DA SILVA",
                RA = "0001118294348SP",
                Email = "0001118294348SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "LIDER",
                Turma = "1A"
            },

            new Usuario
            {
                Nome = "DAVID VICTOR LIANDRO BRITO",
                RA = "0001128141577SP",
                Email = "0001128141577SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "VICE",
                Turma = "1A"
            },

            // ===========================
            // 1B
            // ===========================

            new Usuario
            {
                Nome = "STEFANY DA SILVA GOMES TEIXEIRA",
                RA = "0001141123599SP",
                Email = "0001141123599SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "LIDER",
                Turma = "1B"
            },

            new Usuario
            {
                Nome = "MONIQUE DIAS MENDES",
                RA = "0001117998332SP",
                Email = "0001117998332SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "VICE",
                Turma = "1B"
            },

            // ===========================
            // 1C
            // ===========================

            new Usuario
            {
                Nome = "MONICK THAILA DOS SANTOS LOPES",
                RA = "0001138803844SP",
                Email = "0001138803844SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "LIDER",
                Turma = "1C"
            },

            new Usuario
            {
                Nome = "EMMANUELLY SANTANA LOPES",
                RA = "0001133160190SP",
                Email = "0001133160190SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "VICE",
                Turma = "1C"
            },

            // ===========================
            // 2A
            // ===========================

            new Usuario
            {
                Nome = "CAMILA RODRIGUES DOS SANTOS",
                RA = "0001122335271SP",
                Email = "0001122335271SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "LIDER",
                Turma = "2A"
            },

            new Usuario
            {
                Nome = "ENZO PEREIRA SILVA",
                RA = "0001105961837SP",
                Email = "0001105961837SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "VICE",
                Turma = "2A"
            },

            // ===========================
            // 2B
            // ===========================

            new Usuario
            {
                Nome = "RAFAELLA LEMOS PORTO",
                RA = "0001128839878SP",
                Email = "0001128839878SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "LIDER",
                Turma = "2B"
            },

            new Usuario
            {
                Nome = "GABRIEL AGUIAR CAMPOS",
                RA = "0001111093118SP",
                Email = "0001111093118SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "VICE",
                Turma = "2B"
            },

            // ===========================
            // 3B
            // ===========================

            new Usuario
            {
                Nome = "ANA GIULIA DE SOUSA BEZERRA DA SILVA",
                RA = "0001128732166SP",
                Email = "0001128732166SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "LIDER",
                Turma = "3B"
            },

            new Usuario
            {
                Nome = "VIVIAN MICAELY FIGUEIREDO ROSENDO",
                RA = "0001098902440SP",
                Email = "0001098902440SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "VICE",
                Turma = "3B"
            },

            // ===========================
            // 3A
            // ===========================

            new Usuario
            {
                Nome = "LORENZO MANGILE FARIA",
                RA = "0001131312545SP",
                Email = "0001131312545SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "LIDER",
                Turma = "3A"
            },

            new Usuario
            {
                Nome = "LUIS FERNANDO DE SOUSA OLIVA",
                RA = "0001106229587SP",
                Email = "0001106229587SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "VICE",
                Turma = "3A"
            },

            // ===========================
            // 3C
            // ===========================

            new Usuario
            {
                Nome = "PATRICIA FERREIRA FRANCISCO",
                RA = "0001118486924SP",
                Email = "0001118486924SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "LIDER",
                Turma = "3C"
            },

            new Usuario
            {
                Nome = "RAFAELLY MESSIAS SOUTO",
                RA = "0001107357093SP",
                Email = "0001107357093SP@al.educacao.sp.gov.br",
                Senha = "Torloni@2026",
                Perfil = "VICE",
                Turma = "3C"
            },
        };
    }
}