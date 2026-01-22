using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class NewModelsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<TimeSpan>(
                name: "Duration",
                table: "Trails",
                type: "time",
                nullable: false,
                defaultValue: new TimeSpan(0, 0, 0, 0, 0),
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "DifficultyId",
                table: "Trails",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "Trails",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "RegionId",
                table: "Trails",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Region",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Region", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Trails_DifficultyId",
                table: "Trails",
                column: "DifficultyId");

            migrationBuilder.CreateIndex(
                name: "IX_Trails_RegionId",
                table: "Trails",
                column: "RegionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trails_Difficulties_DifficultyId",
                table: "Trails",
                column: "DifficultyId",
                principalTable: "Difficulties",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trails_Region_RegionId",
                table: "Trails",
                column: "RegionId",
                principalTable: "Region",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trails_Difficulties_DifficultyId",
                table: "Trails");

            migrationBuilder.DropForeignKey(
                name: "FK_Trails_Region_RegionId",
                table: "Trails");

            migrationBuilder.DropTable(
                name: "Region");

            migrationBuilder.DropIndex(
                name: "IX_Trails_DifficultyId",
                table: "Trails");

            migrationBuilder.DropIndex(
                name: "IX_Trails_RegionId",
                table: "Trails");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "Trails");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Trails");

            migrationBuilder.AlterColumn<string>(
                name: "Duration",
                table: "Trails",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(TimeSpan),
                oldType: "time");

            migrationBuilder.AlterColumn<string>(
                name: "DifficultyId",
                table: "Trails",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");
        }
    }
}
