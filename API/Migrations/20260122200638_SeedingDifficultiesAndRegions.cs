using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace API.Migrations
{
    /// <inheritdoc />
    public partial class SeedingDifficultiesAndRegions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Difficulties",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { "2a755f9c-9ee0-4865-b6fa-348bfa1959ba", "Easy" },
                    { "72b0281e-31ec-4c8f-a4ea-337a4b9a4a64", "Medium" },
                    { "7d633f68-0acf-482e-a1a3-7eb03689ec2f", "Hard" }
                });

            migrationBuilder.InsertData(
                table: "Region",
                columns: new[] { "Id", "Code", "ImageUrl", "Name" },
                values: new object[,]
                {
                    { "14ceba71-4b51-4777-9b17-46602cf66153", "BOP", null, "Bay Of Plenty" },
                    { "6884f7d7-ad1f-4101-8df3-7a6fa7387d81", "NTL", null, "Northland" },
                    { "906cb139-415a-4bbb-a174-1a1faf9fb1f6", "NSN", "https://images.pexels.com/photos/13918194/pexels-photo-13918194.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "Nelson" },
                    { "cfa06ed2-bf65-4b65-93ed-c9d286ddb0de", "WGN", "https://images.pexels.com/photos/4350631/pexels-photo-4350631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "Wellington" },
                    { "f077a22e-4248-4bf6-b564-c7cf4e250263", "STL", null, "Southland" },
                    { "f7248fc3-2585-4efb-8d1d-1c555f4087f6", "AKL", "https://images.pexels.com/photos/5169056/pexels-photo-5169056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", "Auckland" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Difficulties",
                keyColumn: "Id",
                keyValue: "2a755f9c-9ee0-4865-b6fa-348bfa1959ba");

            migrationBuilder.DeleteData(
                table: "Difficulties",
                keyColumn: "Id",
                keyValue: "72b0281e-31ec-4c8f-a4ea-337a4b9a4a64");

            migrationBuilder.DeleteData(
                table: "Difficulties",
                keyColumn: "Id",
                keyValue: "7d633f68-0acf-482e-a1a3-7eb03689ec2f");

            migrationBuilder.DeleteData(
                table: "Region",
                keyColumn: "Id",
                keyValue: "14ceba71-4b51-4777-9b17-46602cf66153");

            migrationBuilder.DeleteData(
                table: "Region",
                keyColumn: "Id",
                keyValue: "6884f7d7-ad1f-4101-8df3-7a6fa7387d81");

            migrationBuilder.DeleteData(
                table: "Region",
                keyColumn: "Id",
                keyValue: "906cb139-415a-4bbb-a174-1a1faf9fb1f6");

            migrationBuilder.DeleteData(
                table: "Region",
                keyColumn: "Id",
                keyValue: "cfa06ed2-bf65-4b65-93ed-c9d286ddb0de");

            migrationBuilder.DeleteData(
                table: "Region",
                keyColumn: "Id",
                keyValue: "f077a22e-4248-4bf6-b564-c7cf4e250263");

            migrationBuilder.DeleteData(
                table: "Region",
                keyColumn: "Id",
                keyValue: "f7248fc3-2585-4efb-8d1d-1c555f4087f6");
        }
    }
}
