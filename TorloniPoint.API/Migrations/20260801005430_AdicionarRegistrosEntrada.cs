using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TorloniPoint.API.Migrations
{
    /// <inheritdoc />
    public partial class AdicionarRegistrosEntrada : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Alunos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    RA = table.Column<string>(type: "TEXT", nullable: false),
                    Turma = table.Column<string>(type: "TEXT", nullable: false),
                    Funcao = table.Column<string>(type: "TEXT", nullable: false),
                    Ativo = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Alunos", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RegistrosEntrada",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AlunoId = table.Column<int>(type: "INTEGER", nullable: false),
                    DataHora = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Situacao = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegistrosEntrada", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RegistrosEntrada_Alunos_AlunoId",
                        column: x => x.AlunoId,
                        principalTable: "Alunos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Alunos_RA",
                table: "Alunos",
                column: "RA",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_RegistrosEntrada_AlunoId",
                table: "RegistrosEntrada",
                column: "AlunoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RegistrosEntrada");

            migrationBuilder.DropTable(
                name: "Alunos");
        }
    }
}
