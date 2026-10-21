using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pflege.Api.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddContactTopic : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "topic",
                table: "contact_requests",
                type: "character varying(50)",
                maxLength: 50,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "topic",
                table: "contact_requests");
        }
    }
}
