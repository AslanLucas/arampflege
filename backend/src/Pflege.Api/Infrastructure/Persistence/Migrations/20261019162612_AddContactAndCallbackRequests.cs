using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Pflege.Api.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddContactAndCallbackRequests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "callback_requests",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    phone = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: false),
                    location = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    preferred_time = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    consent_version = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    consent_given_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    notified_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_callback_requests", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "contact_requests",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uuid", nullable: false),
                    name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    phone = table.Column<string>(type: "character varying(30)", maxLength: 30, nullable: true),
                    email = table.Column<string>(type: "character varying(254)", maxLength: 254, nullable: true),
                    message = table.Column<string>(type: "character varying(2000)", maxLength: 2000, nullable: false),
                    consent_version = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    consent_given_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    created_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false),
                    notified_at = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("pk_contact_requests", x => x.id);
                });

            migrationBuilder.CreateIndex(
                name: "ix_callback_requests_created_at",
                table: "callback_requests",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "ix_callback_requests_notified_at",
                table: "callback_requests",
                column: "notified_at");

            migrationBuilder.CreateIndex(
                name: "ix_contact_requests_created_at",
                table: "contact_requests",
                column: "created_at");

            migrationBuilder.CreateIndex(
                name: "ix_contact_requests_notified_at",
                table: "contact_requests",
                column: "notified_at");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "callback_requests");

            migrationBuilder.DropTable(
                name: "contact_requests");
        }
    }
}
