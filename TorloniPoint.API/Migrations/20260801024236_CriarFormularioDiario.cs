using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TorloniPoint.API.Migrations
{
    /// <inheritdoc />
    public partial class CriarFormularioDiario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FormulariosDiarios",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Turma = table.Column<string>(type: "TEXT", nullable: false),
                    Lider = table.Column<string>(type: "TEXT", nullable: false),
                    Data = table.Column<DateTime>(type: "TEXT", nullable: false),
                    SalaLimpa = table.Column<bool>(type: "INTEGER", nullable: false),
                    CarteirasOrganizadas = table.Column<bool>(type: "INTEGER", nullable: false),
                    Patrimonio = table.Column<bool>(type: "INTEGER", nullable: false),
                    Organizacao = table.Column<bool>(type: "INTEGER", nullable: false),
                    Participacao = table.Column<bool>(type: "INTEGER", nullable: false),
                    RespeitoCombinados = table.Column<bool>(type: "INTEGER", nullable: false),
                    Materiais = table.Column<bool>(type: "INTEGER", nullable: false),
                    RespeitoColegas = table.Column<bool>(type: "INTEGER", nullable: false),
                    RespeitoProfessores = table.Column<bool>(type: "INTEGER", nullable: false),
                    BoaConvivencia = table.Column<bool>(type: "INTEGER", nullable: false),
                    Colaboracao = table.Column<bool>(type: "INTEGER", nullable: false),
                    SemCelular = table.Column<bool>(type: "INTEGER", nullable: false),
                    Observacoes = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FormulariosDiarios", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FormulariosDiarios");
        }
    }
}
