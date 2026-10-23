using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pflege.Api.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RemoveCallbackRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "callback_requests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "callback_requests",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    consent_given_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    consent_version = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    location = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    notified_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true),
                    phone = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    preferred_time = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_callback_requests", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_callback_requests_created_at",
                table: "callback_requests",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "ix_callback_requests_notified_at",
                table: "callback_requests",
                column: "notified_at");
        }
    }
}
